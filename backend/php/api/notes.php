<?php
declare(strict_types=1);

require __DIR__ . '/cors.php';
require __DIR__ . '/bootstrap.php';
session_start();

$pdo = get_pdo();
$method = $_SERVER['REQUEST_METHOD'];
$raw = file_get_contents('php://input');
$body = $raw ? json_decode($raw, true) : null;
$driver = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);
if ($driver !== 'pgsql') {
    http_response_code(500);
    echo json_encode(['error' => 'PostgreSQL is required for this endpoint']);
    exit;
}

$pdo->exec("CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    markdown TEXT NOT NULL,
    tag_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    course_id TEXT DEFAULT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)");

function gen_id(): string {
    return bin2hex(random_bytes(16));
}
try {
    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Authentication required']);
        exit;
    }
    $current_user_id = $_SESSION['user_id'];
    
    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare('SELECT * FROM notes WHERE id = ? AND user_id = ? LIMIT 1');
            $stmt->execute([$_GET['id'], $current_user_id]);
            $note = $stmt->fetch();
            if (!$note) {
                http_response_code(404);
                echo json_encode(['error' => 'Not found']);
                exit;
            }
            if (isset($note['tag_ids']) && is_string($note['tag_ids'])) {
                $note['tag_ids'] = json_decode($note['tag_ids'], true) ?: [];
            }
            echo json_encode($note);
            exit;
        } else {
            if (isset($_GET['course'])) {
                $stmt = $pdo->prepare('SELECT * FROM notes WHERE course_id = ? AND user_id = ? ORDER BY created_at DESC');
                $stmt->execute([$_GET['course'], $current_user_id]);
            } else {
                $stmt = $pdo->prepare('SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC');
                $stmt->execute([$current_user_id]);
            }
            $notes = $stmt->fetchAll();
            foreach ($notes as &$n) {
                if (isset($n['tag_ids']) && is_string($n['tag_ids'])) {
                    $n['tag_ids'] = json_decode($n['tag_ids'], true) ?: [];
                }
            }
            unset($n);
            echo json_encode($notes);
            exit;
        }
    }
    if ($method === 'POST') {
        if (!is_array($body)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON']);
            exit;
        }
        $id = $body['id'] ?? gen_id();
        $title = trim((string)($body['title'] ?? ''));
        $markdown = (string)($body['markdown'] ?? '');
        $tagIds = $body['tagIds'] ?? $body['tags'] ?? [];
        if (!is_array($tagIds)) $tagIds = [];
        $courseId = isset($body['courseId']) ? (string)$body['courseId'] : null;
        if ($title === '' || $markdown === '') {
            http_response_code(422);
            echo json_encode(['error' => 'Title and markdown required']);
            exit;
        }
        $stmt = $pdo->prepare('INSERT INTO notes (id, title, markdown, tag_ids, course_id, user_id) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([$id, $title, $markdown, json_encode(array_values($tagIds)), $courseId, $current_user_id]);
        http_response_code(201);
        echo json_encode(['id' => $id]);
        exit;
    }
    if ($method === 'PUT') {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing id']);
            exit;
        }
        if (!is_array($body)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON']);
            exit;
        }
        $id = $_GET['id'];
        $title = trim((string)($body['title'] ?? ''));
        $markdown = (string)($body['markdown'] ?? '');
        $tagIds = $body['tagIds'] ?? $body['tags'] ?? [];
        if (!is_array($tagIds)) $tagIds = [];
        $courseId = isset($body['courseId']) ? (string)$body['courseId'] : null;
        if ($title === '' || $markdown === '') {
            http_response_code(422);
            echo json_encode(['error' => 'Title and markdown required']);
            exit;
        }
        $stmt = $pdo->prepare('UPDATE notes SET title = ?, markdown = ?, tag_ids = ?, course_id = ? WHERE id = ? AND user_id = ?');
        $stmt->execute([$title, $markdown, json_encode(array_values($tagIds)), $courseId, $id, $current_user_id]);
        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Note not found or you do not have permission']);
            exit;
        }
        echo json_encode(['ok' => true]);
        exit;
    }
    if ($method === 'DELETE') {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing id']);
            exit;
        }
        $stmt = $pdo->prepare('DELETE FROM notes WHERE id = ? AND user_id = ?');
        $stmt->execute([$_GET['id'], $current_user_id]);
        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Note not found or you do not have permission']);
            exit;
        }
        echo json_encode(['ok' => true]);
        exit;
    }
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
} catch (Throwable $e) {
    error_log('NOTES_API_ERROR: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
}