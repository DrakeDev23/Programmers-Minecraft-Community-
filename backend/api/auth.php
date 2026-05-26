<?php
require_once __DIR__ . '/../includes/cors.php';
require_once __DIR__ . '/../includes/auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

if ($method === 'POST' && $action === 'login') {
    $body     = body();
    $username = trim($body['username'] ?? '');
    $password = $body['password'] ?? '';

    if (!$username || !$password) {
        json_err('Username and password are required.');
    }

    $result = attemptLogin($username, $password);
    if (!$result['ok']) {
        json_err($result['error'], 401);
    }

    json_ok(['name' => $result['name'], 'username' => $result['username']]);
}

if ($method === 'POST' && $action === 'logout') {
    startSecureSession();
    session_unset();
    session_destroy();
    json_ok('Logged out.');
}

if ($method === 'GET' && $action === 'me') {
    if (!isLoggedIn()) json_err('Not authenticated', 401);
    json_ok([
        'id'       => $_SESSION['admin_id'],
        'username' => $_SESSION['admin_username'],
        'name'     => $_SESSION['admin_name'],
    ]);
}

json_err('Invalid action.', 404);