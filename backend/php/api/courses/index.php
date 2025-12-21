<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../bootstrap.php';

/**
 * Ensure tables exist for career roles, courses, and course sections.
 */
function ensureSchema(PDO $pdo): void
{
	$pdo->exec(
		<<<SQL
		CREATE TABLE IF NOT EXISTS career_roles (
			id TEXT PRIMARY KEY,
			title TEXT NOT NULL,
			description TEXT,
			likes TEXT,
			credentials JSONB,
			image TEXT,
			created_at TIMESTAMPTZ DEFAULT NOW()
		);

		CREATE TABLE IF NOT EXISTS courses (
			id BIGSERIAL PRIMARY KEY,
			role_id TEXT NOT NULL REFERENCES career_roles(id) ON DELETE CASCADE,
			slug TEXT NOT NULL,
			title TEXT NOT NULL,
			provider TEXT,
			url TEXT,
			created_at TIMESTAMPTZ DEFAULT NOW(),
			CONSTRAINT uq_courses_slug UNIQUE(slug)
		);

		CREATE TABLE IF NOT EXISTS course_sections (
			id BIGSERIAL PRIMARY KEY,
			role_id TEXT NOT NULL REFERENCES career_roles(id) ON DELETE CASCADE,
			title TEXT NOT NULL,
			items JSONB,
			lectures JSONB,
			created_at TIMESTAMPTZ DEFAULT NOW()
		);

		CREATE TABLE IF NOT EXISTS course_enrollments (
			user_id BIGINT NOT NULL,
			course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
			enrolled_at TIMESTAMPTZ DEFAULT NOW(),
			PRIMARY KEY (user_id, course_id)
		);

		CREATE TABLE IF NOT EXISTS course_progress (
			user_id BIGINT NOT NULL,
			course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
			item_key TEXT NOT NULL,
			completed BOOLEAN NOT NULL DEFAULT TRUE,
			updated_at TIMESTAMPTZ DEFAULT NOW(),
			PRIMARY KEY (user_id, course_id, item_key)
		);
		SQL
	);
}

/**
 * Seed database from the generated JSON snapshot of CareerRoles.js
 * (backend/php/api/courses/career_roles.json) if empty.
 */
function seedIfEmpty(PDO $pdo): void
{
	$count = (int) $pdo->query('SELECT COUNT(*) FROM career_roles')->fetchColumn();
	if ($count > 0) {
		return; // already seeded
	}

	$jsonPath = __DIR__ . '/career_roles.json';
	if (!file_exists($jsonPath)) {
		throw new RuntimeException('Seed file not found: ' . $jsonPath);
	}

	$data = json_decode(file_get_contents($jsonPath), true);
	if (!is_array($data)) {
		throw new RuntimeException('Invalid JSON in seed file');
	}

	$pdo->beginTransaction();
	try {
		$insertRole = $pdo->prepare(
			'INSERT INTO career_roles (id, title, description, likes, credentials, image) VALUES (:id, :title, :description, :likes, CAST(:credentials AS JSONB), :image)'
		);
		$insertCourse = $pdo->prepare(
			'INSERT INTO courses (role_id, slug, title, provider, url) VALUES (:role_id, :slug, :title, :provider, :url)'
		);
		$insertSection = $pdo->prepare(
			'INSERT INTO course_sections (role_id, title, items, lectures) VALUES (:role_id, :title, CAST(:items AS JSONB), CAST(:lectures AS JSONB))'
		);

		foreach ($data as $role) {
			$insertRole->execute([
				':id' => $role['id'],
				':title' => $role['title'] ?? null,
				':description' => $role['description'] ?? null,
				':likes' => $role['likes'] ?? null,
				':credentials' => json_encode($role['credentials'] ?? []),
				':image' => $role['image'] ?? null,
			]);

			foreach ($role['courses'] ?? [] as $course) {
				$insertCourse->execute([
					':role_id' => $role['id'],
					':slug' => $course['id'] ?? $course['title'],
					':title' => $course['title'] ?? null,
					':provider' => $course['provider'] ?? null,
					':url' => $course['url'] ?? null,
				]);
			}

			foreach ($role['courseSections'] ?? [] as $section) {
				$insertSection->execute([
					':role_id' => $role['id'],
					':title' => $section['title'] ?? null,
					':items' => json_encode($section['items'] ?? []),
					':lectures' => json_encode($section['lectures'] ?? []),
				]);
			}
		}

		$pdo->commit();
	} catch (Throwable $e) {
		$pdo->rollBack();
		throw $e;
	}
}

try {
	$pdo = get_pdo();
	ensureSchema($pdo);
	seedIfEmpty($pdo);

	$stmt = $pdo->query(
		'SELECT c.id,
				c.slug,
				c.title,
				c.provider,
				c.url,
				r.id   AS role_id,
				r.title AS role_title,
				r.description AS role_description,
				r.image AS role_image
		 FROM courses c
		 JOIN career_roles r ON r.id = c.role_id
		 ORDER BY c.id'
	);

	$courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode([
		'courses' => $courses,
	], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
	http_response_code(500);
	echo json_encode([
		'error' => 'Failed to load courses',
		'message' => $e->getMessage(),
	]);
}

