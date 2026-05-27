<?php
$allowed = $_ENV['CORS_ORIGIN'] ?? 'http://localhost:5173';

header("Access-Control-Allow-Origin: $allowed");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function json_ok(mixed $data = null, int $code = 200): never {
    http_response_code($code);
    echo json_encode(['ok' => true, 'data' => $data]);
    exit;
}

function json_err(string $message, int $code = 400): never {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

function body(): array {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}