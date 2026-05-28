<?php
require_once __DIR__ . '/../includes/cors.php';
require_once __DIR__ . '/../includes/auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo    = getDB();

if ($method !== 'GET') requireAuth();

if ($method === 'GET') {
    $rows = $pdo->query(
        'SELECT id, title, message, tag, is_edited, created_at FROM announcements ORDER BY created_at DESC'
    )->fetchAll();

    $items = array_map(fn($r) => [
        'id'     => (int) $r['id'],
        'title'  => $r['title'],
        'msg'    => $r['message'],
        'tag'    => $r['tag'],
        'edited' => (bool) $r['is_edited'],
        'date'   => date('M j, Y g:i A', strtotime($r['created_at'])),
    ], $rows);

    json_ok($items);
}

if ($method === 'POST') {
    $b     = body();
    $title = trim($b['title'] ?? 'Untitled');
    $msg   = trim($b['msg']   ?? '');
    $tag   = $b['tag'] ?? 'general';

    $allowed_tags = ['general', 'update', 'maintenance', 'event', 'urgent'];

    if (!$msg)                          json_err('Message is required.');
    if (!in_array($tag, $allowed_tags)) json_err('Invalid tag.');
    if (strlen($title) > 200)           json_err('Title too long.');
    if (strlen($msg)   > 5000)          json_err('Message too long.');

    $stmt = $pdo->prepare(
        'INSERT INTO announcements (title, message, tag, admin_id) VALUES (?, ?, ?, ?)'
    );
    $stmt->execute([$title, $msg, $tag, $_SESSION['admin_id']]);

    json_ok(['id' => (int) $pdo->lastInsertId(), 'date' => date('M j, Y g:i A')], 201);
}

if ($method === 'PUT') {
    $id    = (int) ($_GET['id'] ?? 0);
    $b     = body();
    $title = trim($b['title'] ?? '');
    $msg   = trim($b['msg']   ?? '');

    if (!$id)  json_err('ID required.');
    if (!$msg) json_err('Message is required.');
    if (strlen($title) > 200) json_err('Title too long.');
    if (strlen($msg) > 5000)  json_err('Message too long.');

    $stmt = $pdo->prepare('SELECT id, admin_id FROM announcements WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();

    if (!$row) json_err('Not found.', 404);
    if ((int) $row['admin_id'] !== (int) $_SESSION['admin_id']) {
        json_err('Forbidden.', 403);
    }

    $pdo->prepare(
        'UPDATE announcements SET title = ?, message = ?, is_edited = 1 WHERE id = ?'
    )->execute([$title ?: 'Untitled', $msg, $id]);

    json_ok('Updated.');
}

if ($method === 'DELETE') {
    $id = (int) ($_GET['id'] ?? 0);
    if (!$id) json_err('ID required.');

    $stmt = $pdo->prepare('SELECT admin_id FROM announcements WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();

    if (!$row) json_err('Not found.', 404);
    if ((int) $row['admin_id'] !== (int) $_SESSION['admin_id']) {
        json_err('Forbidden.', 403);
    }

    $pdo->prepare('DELETE FROM announcements WHERE id = ?')->execute([$id]);
    json_ok('Deleted.');
}

json_err('Method not allowed.', 405);