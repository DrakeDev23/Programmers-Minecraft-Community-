<?php
require_once __DIR__ . '/db.php';

$secure = ($_ENV['APP_ENV'] ?? 'production') !== 'development';

ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_samesite', 'Lax');
ini_set('session.use_strict_mode', 1);
ini_set('session.cookie_secure', $secure ? 1 : 0);

const MAX_ATTEMPTS     = 5;
const LOCKOUT_SECONDS  = 300;
const SESSION_LIFETIME = 3600;

function startSecureSession(): void {
    if (session_status() === PHP_SESSION_NONE) {
        session_name('nullsmp_session');
        session_start();
    }
    if (isset($_SESSION['_last_activity']) &&
        (time() - $_SESSION['_last_activity']) > SESSION_LIFETIME) {
        session_unset();
        session_destroy();
        session_start();
    }
    $_SESSION['_last_activity'] = time();
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
}

function verifyCsrf(): void {
    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!hash_equals($_SESSION['csrf_token'] ?? '', $token)) {
        json_err('Invalid CSRF token.', 403);
    }
}

function isLoggedIn(): bool {
    startSecureSession();
    return !empty($_SESSION['admin_id']);
}

function requireAuth(): void {
    if (!isLoggedIn()) {
        json_err('Unauthorized', 401);
    }
    verifyCsrf();
}

function rlKey(string $ip, string $username): string {
    return sys_get_temp_dir() . '/nullsmp_rl_' . md5($ip . '|' . $username) . '.json';
}

function checkRateLimit(string $ip, string $username): bool {
    $f = rlKey($ip, $username);
    if (!file_exists($f)) return true;
    $d = json_decode(file_get_contents($f), true);
    if (!$d) return true;
    if (time() - $d['first'] > LOCKOUT_SECONDS) { unlink($f); return true; }
    return $d['attempts'] < MAX_ATTEMPTS;
}

function recordFail(string $ip, string $username): void {
    $f = rlKey($ip, $username);
    $d = file_exists($f)
        ? json_decode(file_get_contents($f), true)
        : ['attempts' => 0, 'first' => time()];
    $d['attempts']++;
    file_put_contents($f, json_encode($d), LOCK_EX);
}

function clearRL(string $ip, string $username): void {
    $f = rlKey($ip, $username);
    if (file_exists($f)) unlink($f);
}

function attemptLogin(string $username, string $password): array {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';

    if (!checkRateLimit($ip, $username)) {
        return ['ok' => false, 'error' => 'Too many attempts. Wait 5 minutes.'];
    }

    if (strlen($username) > 64 || strlen($password) > 128) {
        return ['ok' => false, 'error' => 'Invalid credentials.'];
    }

    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT id, username, password, display_name, is_active FROM admin_users WHERE username = ? LIMIT 1'
    );
    $stmt->execute([$username]);
    $admin = $stmt->fetch();

    $hash  = $admin['password'] ?? '$2y$12$invalidsaltinvalidsaltinvalidsal.';
    $valid = password_verify($password, $hash);

    if (!$admin || !$valid || !$admin['is_active']) {
        recordFail($ip, $username);
        return ['ok' => false, 'error' => 'Invalid credentials.'];
    }
    clearRL($ip, $username);
    startSecureSession();
    session_regenerate_id(true);

    $_SESSION['admin_id']       = $admin['id'];
    $_SESSION['admin_username'] = $admin['username'];
    $_SESSION['admin_name']     = $admin['display_name'];

    $pdo->prepare('UPDATE admin_users SET last_login = NOW() WHERE id = ?')
        ->execute([$admin['id']]);

    if (password_needs_rehash($hash, PASSWORD_BCRYPT, ['cost' => 12])) {
        $pdo->prepare('UPDATE admin_users SET password = ? WHERE id = ?')
            ->execute([password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]), $admin['id']]);
    }

    return [
        'ok'       => true,
        'name'     => $admin['display_name'],
        'username' => $admin['username'],
        'csrf'     => $_SESSION['csrf_token'],
    ];
}