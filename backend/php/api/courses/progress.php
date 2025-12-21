<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header('Access-Control-Allow-Origin: ' . $origin);
header('Vary: Origin');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $userId = $_GET['user_id'] ?? null;
        $courseId = $_GET['course_id'] ?? null;
        if (!$userId || !$courseId) bad_request('user_id and course_id are required');

        $stmt = $pdo->prepare('SELECT item_key, completed FROM course_progress WHERE user_id = :u AND course_id = :c');
        $stmt->execute([':u' => $userId, ':c' => $courseId]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $progress = [];
        foreach ($rows as $row) {
            $progress[$row['item_key']] = (bool) $row['completed'];
        }
        echo json_encode(['progress' => $progress]);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $userId = $input['user_id'] ?? null;
        $courseId = $input['course_id'] ?? null;
        $itemKey = $input['item_key'] ?? null;
        $completed = isset($input['completed']) ? (bool)$input['completed'] : true;
        if (!$userId || !$courseId || !$itemKey) bad_request('user_id, course_id, item_key are required');

        $stmt = $pdo->prepare(
            'INSERT INTO course_progress (user_id, course_id, item_key, completed)
             VALUES (:u, :c, :k, :completed)
             ON CONFLICT (user_id, course_id, item_key)
             DO UPDATE SET completed = EXCLUDED.completed, updated_at = NOW()'
        );
        $stmt->execute([
            ':u' => $userId,
            ':c' => $courseId,
            ':k' => $itemKey,
            ':completed' => $completed,
        ]);

        echo json_encode(['status' => 'saved']);
        exit;
    }

    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to handle progress', 'message' => $e->getMessage()]);
}
