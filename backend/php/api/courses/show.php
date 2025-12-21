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

function badRequest(string $message): void
{
    http_response_code(400);
    echo json_encode(['error' => $message]);
    exit;
}

try {
    $id = $_GET['id'] ?? null;
    if ($id === null || $id === '') {
        badRequest('Missing course id');
    }

    $pdo = get_pdo();

    $courseStmt = $pdo->prepare(
        'SELECT c.id,
                c.slug,
                c.title,
                c.provider,
                c.url,
                c.role_id,
                r.title  AS role_title,
                r.description AS role_description,
                r.image AS role_image
         FROM courses c
         JOIN career_roles r ON r.id = c.role_id
         WHERE c.id = :id'
    );
    $courseStmt->execute([':id' => $id]);
    $course = $courseStmt->fetch(PDO::FETCH_ASSOC);

    if (!$course) {
        http_response_code(404);
        echo json_encode(['error' => 'Course not found']);
        exit;
    }

    $sectionsStmt = $pdo->prepare(
        'SELECT title, items, lectures
         FROM course_sections
         WHERE role_id = :role_id
         ORDER BY id'
    );
    $sectionsStmt->execute([':role_id' => $course['role_id']]);
    $sections = [];
    while ($row = $sectionsStmt->fetch(PDO::FETCH_ASSOC)) {
        $row['items'] = json_decode($row['items'] ?? '[]', true) ?: [];
        $row['lectures'] = json_decode($row['lectures'] ?? '[]', true) ?: [];
        $sections[] = $row;
    }

    $course['sections'] = $sections;

    echo json_encode($course, JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to load course',
        'message' => $e->getMessage(),
    ]);
}
