<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

// In a real app, destroy session / revoke token. Here we just respond OK.
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
session_destroy();
echo json_encode(['status' => 'logged_out']);
