<?php
// PostgreSQL configuration - update for your local env
const DB_HOST = '127.0.0.1';
const DB_PORT = '5432';
const DB_NAME = 'learning_platform';
const DB_USER = 'postgres';
const DB_PASS = 'islam';

function get_pdo(): PDO {
    // For Postgres, DSN starts with pgsql and charset is negotiated via client_encoding
    $dsn = 'pgsql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME;
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    return new PDO($dsn, DB_USER, DB_PASS, $options);
}
