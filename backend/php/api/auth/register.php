<?php
declare(strict_types=1);

// Enable verbose error logging (not displaying) for diagnostics
error_reporting(E_ALL);
ini_set('log_errors', '1');
// Optional: set a log file if desired
// ini_set('error_log', __DIR__ . '/../../error.log');

require __DIR__ . '/../cors.php';
require __DIR__ . '/../bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}

$name = trim((string)($data['username'] ?? $data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$password = (string)($data['password'] ?? '');
$incomingRole = strtolower(trim((string)($data['role'] ?? 'student')));
$gender = strtolower(trim((string)($data['gender'] ?? '')));
$phone = preg_replace('/[^0-9+]/', '', (string)($data['phone'] ?? ''));
$country = trim((string)($data['country'] ?? ''));
$skills = $data['skills'] ?? [];

if ($name === '' || $email === '' || $password === '' || $gender === '' || $phone === '' || $country === '') {
    http_response_code(422);
    echo json_encode(['error' => 'All required fields must be provided.']);
    exit;
}

if (strlen($phone) < 6) {
    http_response_code(422);
    echo json_encode(['error' => 'Phone number looks invalid.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['error' => 'Invalid email address.']);
    exit;
}

if (strlen($password) < 6) {
    http_response_code(422);
    echo json_encode(['error' => 'Password must be at least 6 characters.']);
    exit;
}

if (!is_array($skills) || count($skills) === 0) {
    http_response_code(422);
    echo json_encode(['error' => 'Select at least one skill.']);
    exit;
}

// Normalize skills list (unique, trimmed strings)
$skills = array_values(array_filter(array_map(static function ($skill) {
    return is_string($skill) ? trim($skill) : '';
}, $skills), static fn($skill) => $skill !== ''));

if (count($skills) === 0) {
    http_response_code(422);
    echo json_encode(['error' => 'Select at least one valid skill.']);
    exit;
}

// Map UI role values into canonical roles
switch ($incomingRole) {
    case 'female':
        $role = 'instructor';
        break;
    case 'male':
        $role = 'student';
        break;
    case 'instructor':
    case 'student':
        $role = $incomingRole;
        break;
    default:
        $role = 'student';
}

// Validate role and gender
$allowedRoles = ['student', 'instructor'];
if (!in_array($role, $allowedRoles, true)) {
    http_response_code(422);
    echo json_encode(['error' => 'Invalid role.']);
    exit;
}

$allowedGenders = ['female', 'male', 'prefer-not'];
if ($gender !== '' && !in_array($gender, $allowedGenders, true)) {
    http_response_code(422);
    echo json_encode(['error' => 'Invalid gender value.']);
    exit;
}

try {
    $pdo = get_pdo();

    // PostgreSQL-compatible schema (extended fields to match current UI)
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(190) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student','instructor')),
        gender TEXT DEFAULT NULL,
        phone VARCHAR(32) DEFAULT NULL,
        country VARCHAR(80) DEFAULT NULL,
        skills JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )");

    // Backfill columns for older databases
    $pdo->exec("ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'student'");
    $pdo->exec("ALTER TABLE users ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT NULL");
    $pdo->exec("ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(32) DEFAULT NULL");
    $pdo->exec("ALTER TABLE users ADD COLUMN IF NOT EXISTS country VARCHAR(80) DEFAULT NULL");
    $pdo->exec("ALTER TABLE users ADD COLUMN IF NOT EXISTS skills JSONB NOT NULL DEFAULT '[]'::jsonb");

    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['error' => 'Email already registered.']);
        exit;
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $skillsJson = json_encode($skills, JSON_UNESCAPED_UNICODE);
    if ($skillsJson === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Unable to encode skills list.']);
        exit;
    }

    $insert = $pdo->prepare('INSERT INTO users (name, email, password_hash, role, gender, phone, country, skills) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING id');
    $insert->execute([$name, $email, $hash, $role, $gender !== '' ? $gender : null, $phone, $country, $skillsJson]);
    $userId = (int)$insert->fetchColumn();
    http_response_code(201);
    echo json_encode([
        'id' => $userId,
        'name' => $name,
        'email' => $email,
        'role' => $role,
        'gender' => $gender,
        'phone' => $phone,
        'country' => $country,
        'skills' => $skills,
    ]);
} catch (Throwable $e) {
    // Log the detailed error
    error_log('REGISTER_ERROR: ' . $e->getMessage());
    if (isset($_GET['debug']) && $_GET['debug'] === '1') {
        http_response_code(500);
        echo json_encode(['error' => 'Server error', 'detail' => $e->getMessage()]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Server error. Please try again later.']);
    }
}
