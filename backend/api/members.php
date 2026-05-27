<?php
require_once __DIR__ . '/../includes/cors.php';
require_once __DIR__ . '/../includes/auth.php';

requireAuth();

$method = $_SERVER['REQUEST_METHOD'];
$pdo    = getDB();

if ($method === 'GET') {
    $rows = $pdo->query(
        'SELECT id, username, role, joined_at, is_active FROM members ORDER BY joined_at ASC'
    )->fetchAll();

    $members = array_map(fn($r) => [
        'id'     => $r['id'],
        'name'   => $r['username'],
        'role'   => $r['role'],
        'joined' => date('Y-m-d', strtotime($r['joined_at'])),
        'active' => (bool) $r['is_active'],
    ], $rows);

    json_ok($members);
}

if ($method === 'PUT') {
    $action = $_GET['action'] ?? '';
    $id     = (int) ($_GET['id'] ?? 0);

    if ($action === 'toggle' && $id) {
        $stmt = $pdo->prepare('SELECT is_active, role FROM members WHERE id = ?');
        $stmt->execute([$id]);
        $member = $stmt->fetch();

        if (!$member) json_err('Member not found.', 404);
        if ($member['role'] === 'Owner') json_err('Cannot deactivate the owner.', 403);

        $newStatus = $member['is_active'] ? 0 : 1;
        $pdo->prepare('UPDATE members SET is_active = ? WHERE id = ?')
            ->execute([$newStatus, $id]);

        json_ok(['active' => (bool) $newStatus]);
    }
}

if ($method === 'DELETE') {
    $id = (int) ($_GET['id'] ?? 0);
    if (!$id) json_err('Member ID required.');

    $stmt = $pdo->prepare('SELECT role FROM members WHERE id = ?');
    $stmt->execute([$id]);
    $member = $stmt->fetch();

    if (!$member) json_err('Member not found.', 404);
    if ($member['role'] === 'Owner') json_err('Cannot remove the owner.', 403);

    $pdo->prepare('DELETE FROM members WHERE id = ?')->execute([$id]);
    json_ok('Member removed.');
}

json_err('Method not allowed.', 405);