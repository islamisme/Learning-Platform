<?php
declare(strict_types=1);

session_start();
require __DIR__ . '/../cors.php';
require __DIR__ . '/../bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['authenticated' => false]);
    exit;
}

try {
    $pdo = get_pdo();
    $stmt = $pdo->prepare('SELECT id, name, email, role, gender, phone, country, skills, created_at FROM users WHERE id = ? LIMIT 1');
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch();
    if (!$user) {
        // Session refers to non-existing user
        session_unset();
        http_response_code(401);
        echo json_encode(['authenticated' => false]);
        exit;
    }
    $skills = [];
    if (isset($user['skills'])) {
        $decoded = json_decode((string)$user['skills'], true);
        $skills = is_array($decoded) ? $decoded : [];
    }
    http_response_code(200);
    echo json_encode([
        'authenticated' => true,
        'id' => (int)$user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'role' => $user['role'],
        'gender' => $user['gender'],
        'phone' => $user['phone'],
        'country' => $user['country'],
        'skills' => $skills,
        'createdAt' => $user['created_at'],
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
}
