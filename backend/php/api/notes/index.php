<?php
declare(strict_types=1);

require __DIR__ . '/../cors.php';
require __DIR__ . '/../bootstrap.php';
require __DIR__ . '/helpers.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = notes_pdo();
    $userId = notes_require_user_id();

    switch ($method) {
        case 'GET':
            $notes = notes_fetch_all($pdo, $userId);
            $tags = notes_fetch_tags($pdo, $userId);
            echo json_encode(['notes' => $notes, 'tags' => $tags]);
            break;

        case 'POST':
            $payload = json_decode(file_get_contents('php://input'), true) ?? [];
            [$title, $markdown, $courseId, $tagsPayload] = notes_validate_payload($payload);

            $noteId = notes_uuid();
            $stmt = $pdo->prepare(
                'INSERT INTO notes (id, user_id, title, markdown, course_id)
                 VALUES (:id, :user, :title, :markdown, :course)'
            );
            $stmt->execute([
                ':id' => $noteId,
                ':user' => $userId,
                ':title' => $title,
                ':markdown' => $markdown,
                ':course' => $courseId,
            ]);

            $tagIds = notes_resolve_tag_ids($pdo, $userId, $tagsPayload);
            notes_replace_note_tags($pdo, $noteId, $tagIds);

            $note = notes_fetch_note($pdo, $noteId, $userId);
            http_response_code(201);
            echo json_encode([
                'note' => $note,
                'tags' => notes_fetch_tags($pdo, $userId),
            ]);
            break;

        case 'PUT':
            $payload = json_decode(file_get_contents('php://input'), true) ?? [];
            $noteId = isset($_GET['id']) ? trim((string)$_GET['id']) : trim((string)($payload['id'] ?? ''));
            if ($noteId === '') {
                throw new InvalidArgumentException('Note id is required.');
            }

            [$title, $markdown, $courseId, $tagsPayload] = notes_validate_payload($payload);

            $stmt = $pdo->prepare(
                'UPDATE notes
                 SET title = :title,
                     markdown = :markdown,
                     course_id = :course,
                     updated_at = NOW()
                 WHERE id = :id AND user_id = :user'
            );
            $stmt->execute([
                ':title' => $title,
                ':markdown' => $markdown,
                ':course' => $courseId,
                ':id' => $noteId,
                ':user' => $userId,
            ]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Note not found.']);
                break;
            }

            $tagIds = notes_resolve_tag_ids($pdo, $userId, $tagsPayload);
            notes_replace_note_tags($pdo, $noteId, $tagIds);

            $note = notes_fetch_note($pdo, $noteId, $userId);
            echo json_encode([
                'note' => $note,
                'tags' => notes_fetch_tags($pdo, $userId),
            ]);
            break;

        case 'DELETE':
            $noteId = isset($_GET['id']) ? trim((string)$_GET['id']) : '';
            if ($noteId === '') {
                throw new InvalidArgumentException('Note id is required.');
            }

            $stmt = $pdo->prepare('DELETE FROM notes WHERE id = :id AND user_id = :user');
            $stmt->execute([':id' => $noteId, ':user' => $userId]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Note not found.']);
                break;
            }

            echo json_encode(['ok' => true]);
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
    }
} catch (InvalidArgumentException $e) {
    http_response_code(422);
    echo json_encode(['error' => $e->getMessage()]);
} catch (Throwable $e) {
    error_log('NOTES_INDEX_ERROR: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error.']);
}
