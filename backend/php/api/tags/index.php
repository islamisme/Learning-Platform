<?php
declare(strict_types=1);

require __DIR__ . '/../cors.php';
require __DIR__ . '/../bootstrap.php';
require __DIR__ . '/../notes/helpers.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = notes_pdo();
    $userId = notes_require_user_id();

    switch ($method) {
        case 'GET':
            echo json_encode(['tags' => notes_fetch_tags($pdo, $userId)]);
            break;

        case 'POST':
            $payload = json_decode(file_get_contents('php://input'), true) ?? [];
            $label = trim((string)($payload['label'] ?? ''));
            if ($label === '') {
                throw new InvalidArgumentException('Tag label is required.');
            }
            if (mb_strlen($label) > 120) {
                throw new InvalidArgumentException('Tag label must be 120 characters or less.');
            }

            $tagId = notes_create_or_get_tag($pdo, $userId, $label);
            $stmt = $pdo->prepare('SELECT id, label FROM tags WHERE id = :id AND user_id = :user');
            $stmt->execute([':id' => $tagId, ':user' => $userId]);
            $tag = $stmt->fetch(PDO::FETCH_ASSOC);

            http_response_code(201);
            echo json_encode(['tag' => $tag]);
            break;

        case 'PUT':
            $payload = json_decode(file_get_contents('php://input'), true) ?? [];
            $tagId = isset($_GET['id']) ? trim((string)$_GET['id']) : trim((string)($payload['id'] ?? ''));
            $label = trim((string)($payload['label'] ?? ''));

            if ($tagId === '') {
                throw new InvalidArgumentException('Tag id is required.');
            }
            if ($label === '') {
                throw new InvalidArgumentException('Tag label is required.');
            }
            if (mb_strlen($label) > 120) {
                throw new InvalidArgumentException('Tag label must be 120 characters or less.');
            }

            $stmt = $pdo->prepare(
                'UPDATE tags SET label = :label, updated_at = NOW()
                 WHERE id = :id AND user_id = :user'
            );
            $stmt->execute([
                ':label' => $label,
                ':id' => $tagId,
                ':user' => $userId,
            ]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Tag not found.']);
                break;
            }

            $stmt = $pdo->prepare('SELECT id, label FROM tags WHERE id = :id AND user_id = :user');
            $stmt->execute([':id' => $tagId, ':user' => $userId]);
            $tag = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['tag' => $tag]);
            break;

        case 'DELETE':
            $tagId = isset($_GET['id']) ? trim((string)$_GET['id']) : '';
            if ($tagId === '') {
                throw new InvalidArgumentException('Tag id is required.');
            }

            $stmt = $pdo->prepare('DELETE FROM tags WHERE id = :id AND user_id = :user');
            $stmt->execute([':id' => $tagId, ':user' => $userId]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Tag not found.']);
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
    error_log('TAGS_INDEX_ERROR: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error.']);
}
