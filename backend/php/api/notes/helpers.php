<?php
declare(strict_types=1);

require_once __DIR__ . '/../bootstrap.php';

/**
 * Ensures the requester is authenticated and returns their user id.
 */
function notes_require_user_id(): int
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }

    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Authentication required.']);
        exit;
    }

    return (int)$_SESSION['user_id'];
}

/**
 * Returns a PDO instance with the notes schema ready for use.
 */
function notes_pdo(): PDO
{
    static $initialized = false;
    $pdo = get_pdo();

    if (!$initialized) {
        notes_ensure_schema($pdo);
        $initialized = true;
    }

    return $pdo;
}

/**
 * Creates the notes/tags tables when they do not yet exist.
 */
function notes_ensure_schema(PDO $pdo): void
{
    // Dedicated notes table scoped per user
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS notes (
            id TEXT PRIMARY KEY,
            user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            markdown TEXT NOT NULL,
            course_id TEXT DEFAULT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )"
    );

    // Tags are scoped per user and deduplicated by label
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS tags (
            id TEXT PRIMARY KEY,
            user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            label VARCHAR(120) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            UNIQUE (user_id, label)
        )"
    );

    // Join table linking notes and tags
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS note_tags (
            note_id TEXT NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
            tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
            PRIMARY KEY (note_id, tag_id)
        )"
    );
}

/**
 * Creates RFC4122 compliant UUID v4.
 */
function notes_uuid(): string
{
    $data = random_bytes(16);
    $data[6] = chr((ord($data[6]) & 0x0f) | 0x40);
    $data[8] = chr((ord($data[8]) & 0x3f) | 0x80);

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

/**
 * Validates incoming note data and returns a tuple of [title, markdown, courseId|null, tagsArray].
 */
function notes_validate_payload(array $payload): array
{
    $title = trim((string)($payload['title'] ?? ''));
    if ($title === '') {
        throw new InvalidArgumentException('Title is required.');
    }

    $markdown = trim((string)($payload['markdown'] ?? ''));
    if ($markdown === '') {
        throw new InvalidArgumentException('Content body is required.');
    }

    $courseIdRaw = $payload['courseId'] ?? null;
    $courseId = $courseIdRaw === null ? null : trim((string)$courseIdRaw);
    if ($courseId === '') {
        $courseId = null;
    }

    $tags = [];
    if (isset($payload['tags']) && is_array($payload['tags'])) {
        foreach ($payload['tags'] as $tag) {
            if (is_array($tag)) {
                $tags[] = $tag;
            }
        }
    }

    return [$title, $markdown, $courseId, $tags];
}

/**
 * Returns all tags owned by the authenticated user.
 */
function notes_fetch_tags(PDO $pdo, int $userId): array
{
    $stmt = $pdo->prepare('SELECT id, label FROM tags WHERE user_id = :user ORDER BY label ASC');
    $stmt->execute([':user' => $userId]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return array_map(static function (array $row): array {
        return ['id' => $row['id'], 'label' => $row['label']];
    }, $rows);
}

/**
 * Fetches a single note (with tags) that belongs to the user.
 */
function notes_fetch_note(PDO $pdo, string $noteId, int $userId): ?array
{
    $stmt = $pdo->prepare('SELECT id, title, markdown, course_id, created_at, updated_at FROM notes WHERE id = :id AND user_id = :user LIMIT 1');
    $stmt->execute([':id' => $noteId, ':user' => $userId]);
    $note = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$note) {
        return null;
    }

    $note['tags'] = notes_fetch_note_tags($pdo, $noteId, $userId);
    $note['courseId'] = $note['course_id'] ?? null;
    unset($note['course_id']);

    return [
        'id' => $note['id'],
        'title' => $note['title'],
        'markdown' => $note['markdown'],
        'courseId' => $note['courseId'],
        'createdAt' => $note['created_at'],
        'updatedAt' => $note['updated_at'],
        'tags' => $note['tags'],
    ];
}

/**
 * Returns the tags assigned to a particular note for the user.
 */
function notes_fetch_note_tags(PDO $pdo, string $noteId, int $userId): array
{
    $stmt = $pdo->prepare(
        'SELECT t.id, t.label
         FROM note_tags nt
         INNER JOIN tags t ON t.id = nt.tag_id
         WHERE nt.note_id = :note AND t.user_id = :user
         ORDER BY t.label ASC'
    );
    $stmt->execute([':note' => $noteId, ':user' => $userId]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return array_map(static function (array $row): array {
        return ['id' => $row['id'], 'label' => $row['label']];
    }, $rows);
}

/**
 * Produces a list of note dictionaries (including tags) for the user.
 */
function notes_fetch_all(PDO $pdo, int $userId): array
{
    $stmt = $pdo->prepare(
        'SELECT n.id,
                n.title,
                n.markdown,
                n.course_id,
                n.created_at,
                n.updated_at,
                t.id AS tag_id,
                t.label AS tag_label
         FROM notes n
         LEFT JOIN note_tags nt ON nt.note_id = n.id
         LEFT JOIN tags t ON t.id = nt.tag_id
         WHERE n.user_id = :user
         ORDER BY n.created_at DESC'
    );
    $stmt->execute([':user' => $userId]);

    $notes = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $id = $row['id'];
        if (!isset($notes[$id])) {
            $notes[$id] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'markdown' => $row['markdown'],
                'courseId' => $row['course_id'] ?? null,
                'createdAt' => $row['created_at'],
                'updatedAt' => $row['updated_at'],
                'tags' => [],
            ];
        }

        if ($row['tag_id']) {
            $notes[$id]['tags'][] = [
                'id' => $row['tag_id'],
                'label' => $row['tag_label'],
            ];
        }
    }

    return array_values($notes);
}

/**
 * Ensures provided tags exist for the user and returns their IDs.
 */
function notes_resolve_tag_ids(PDO $pdo, int $userId, array $tags): array
{
    $tagIds = [];
    foreach ($tags as $tag) {
        $tagId = isset($tag['id']) ? trim((string)$tag['id']) : '';
        $label = trim((string)($tag['label'] ?? ''));

        if ($tagId !== '') {
            $stmt = $pdo->prepare('SELECT id FROM tags WHERE id = :id AND user_id = :user LIMIT 1');
            $stmt->execute([':id' => $tagId, ':user' => $userId]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$row) {
                throw new InvalidArgumentException('Invalid tag reference provided.');
            }
            $tagIds[] = $row['id'];
        } elseif ($label !== '') {
            if (mb_strlen($label) > 120) {
                throw new InvalidArgumentException('Tag label must be 120 characters or less.');
            }
            $tagIds[] = notes_create_or_get_tag($pdo, $userId, $label);
        }
    }

    return array_values(array_unique($tagIds));
}

/**
 * Creates the tag if it does not already exist for the user and returns its id.
 */
function notes_create_or_get_tag(PDO $pdo, int $userId, string $label): string
{
    $id = notes_uuid();
    $stmt = $pdo->prepare(
        'INSERT INTO tags (id, user_id, label)
         VALUES (:id, :user, :label)
         ON CONFLICT (user_id, label) DO UPDATE SET updated_at = NOW()
         RETURNING id'
    );
    $stmt->execute([
        ':id' => $id,
        ':user' => $userId,
        ':label' => $label,
    ]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    return $row['id'];
}

/**
 * Replaces the tag associations for a note.
 */
function notes_replace_note_tags(PDO $pdo, string $noteId, array $tagIds): void
{
    $pdo->prepare('DELETE FROM note_tags WHERE note_id = :note')
        ->execute([':note' => $noteId]);

    if (count($tagIds) === 0) {
        return;
    }

    $stmt = $pdo->prepare('INSERT INTO note_tags (note_id, tag_id) VALUES (:note, :tag)');
    foreach ($tagIds as $tagId) {
        $stmt->execute([':note' => $noteId, ':tag' => $tagId]);
    }
}
