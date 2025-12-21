<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header('Access-Control-Allow-Origin: ' . $origin);
header('Vary: Origin');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../bootstrap.php';

function bad_request(string $msg): void
{
    http_response_code(400);
    echo json_encode(['error' => $msg]);
    exit;
}

try {
    $pdo = get_pdo();

    $input = json_decode(file_get_contents('php://input'), true);
    $courseId = $input['course_id'] ?? null;
    $userId = $input['user_id'] ?? null;

    if (!$courseId) {
        bad_request('course_id is required');
    }
    if (!$userId) {
        // In a real app, derive from session/auth; for now require explicit user_id
        bad_request('user_id is required');
    }

    // Ensure course exists
    $exists = $pdo->prepare('SELECT id FROM courses WHERE id = :id');
    $exists->execute([':id' => $courseId]);
    if (!$exists->fetchColumn()) {
        http_response_code(404);
        echo json_encode(['error' => 'Course not found']);
        exit;
    }

    // Insert enrollment (idempotent via PK)
    $insert = $pdo->prepare('INSERT INTO course_enrollments (user_id, course_id) VALUES (:user_id, :course_id) ON CONFLICT DO NOTHING');
    $insert->execute([':user_id' => $userId, ':course_id' => $courseId]);

    echo json_encode(['status' => 'enrolled']);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to enroll', 'message' => $e->getMessage()]);
}
