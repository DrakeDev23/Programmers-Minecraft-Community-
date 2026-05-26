<?php
require_once __DIR__ . '/../includes/cors.php';
require_once __DIR__ . '/../includes/auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo    = getDB();

if ($method !== 'GET') requireAuth();

if ($method === 'GET') {
    $status = $_GET['status'] ?? 'pending';
    if ($status === 'all') {
        $stmt = $pdo->query(
            'SELECT id, username, note, status, applied_at FROM whitelist_applications ORDER BY applied_at DESC'
        );
    } else {
        $stmt = $pdo->prepare(
            'SELECT id, username, note, status, applied_at FROM whitelist_applications WHERE status = ? ORDER BY applied_at DESC'
        );
        $stmt->execute(['pending']);
    }
    $rows = $stmt->fetchAll();

    $items = array_map(fn($r) => [
        'id'     => (int) $r['id'],
        'name'   => $r['username'],
        'note'   => $r['note'],
        'status' => $r['status'],
        'date'   => date('Y-m-d', strtotime($r['applied_at'])),
    ], $rows);

    json_ok($items);
}

if ($method === 'POST') {
    $b        = body();
    $username = trim($b['username'] ?? '');
    $note     = trim($b['note']     ?? '');

    if (!$username)           json_err('Username is required.');
    if (strlen($username) > 64) json_err('Username too long.');
    if (strlen($note) > 1000)   json_err('Note too long.');

    $check = $pdo->prepare(
        'SELECT id FROM whitelist_applications WHERE username = ? AND status = "pending" LIMIT 1'
    );
    $check->execute([$username]);
    if ($check->fetch()) json_err('An application for this username is already pending.');

    $pdo->prepare(
        'INSERT INTO whitelist_applications (username, note) VALUES (?, ?)'
    )->execute([$username, $note]);

    json_ok('Application submitted.', 201);
}

if ($method === 'PUT') {
    requireAuth();
    $id     = (int) ($_GET['id']     ?? 0);
    $action = $_GET['action'] ?? '';

    if (!$id)                              json_err('ID required.');
    if (!in_array($action, ['accept', 'deny'])) json_err('Action must be accept or deny.');

    $stmt = $pdo->prepare('SELECT id, username, status FROM whitelist_applications WHERE id = ?');
    $stmt->execute([$id]);
    $app = $stmt->fetch();

    if (!$app)                       json_err('Application not found.', 404);
    if ($app['status'] !== 'pending') json_err('Application already resolved.');

    $newStatus = $action === 'accept' ? 'accepted' : 'denied';
    $pdo->prepare('UPDATE whitelist_applications SET status = ?, resolved_at = NOW() WHERE id = ?')
        ->execute([$newStatus, $id]);

    if ($action === 'accept') {
        $pdo->prepare(
            'INSERT IGNORE INTO members (username, role, joined_at) VALUES (?, "Member", NOW())'
        )->execute([$app['username']]);
    }

    json_ok(['status' => $newStatus]);
}

if ($method === 'DELETE') {
    $id = (int) ($_GET['id'] ?? 0);
    if (!$id) json_err('ID required.');
    $pdo->prepare('DELETE FROM whitelist_applications WHERE id = ?')->execute([$id]);
    json_ok('Deleted.');
}

json_err('Method not allowed.', 405);