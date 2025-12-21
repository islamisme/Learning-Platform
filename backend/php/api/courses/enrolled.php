<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header('Access-Control-Allow-Origin: ' . $origin);
header('Vary: Origin');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
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
    $userId = $_GET['user_id'] ?? null;
    if (!$userId) {
        bad_request('user_id is required');
    }

    $stmt = $pdo->prepare(
        'SELECT c.id,
                c.slug,
                c.title,
                c.provider,
                c.url,
                c.role_id,
                r.title AS role_title
         FROM course_enrollments e
         JOIN courses c ON c.id = e.course_id
         JOIN career_roles r ON r.id = c.role_id
         WHERE e.user_id = :user_id
         ORDER BY e.enrolled_at DESC'
    );
    $stmt->execute([':user_id' => $userId]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['courses' => $rows], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load enrolled courses', 'message' => $e->getMessage()]);
}
