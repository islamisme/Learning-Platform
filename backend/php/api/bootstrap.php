<?php
declare(strict_types=1);

$configPath = __DIR__ . '/config.php';
$dbSettings = [];

if (file_exists($configPath)) {
	$result = require $configPath;
	if (is_array($result)) {
		$dbSettings = $result;
	}
} else {
	error_log('BOOTSTRAP: config.php missing at ' . $configPath . ' - using fallback env values');
}

$dbHost = $dbSettings['DB_HOST'] ?? getenv('DB_HOST') ?: 'localhost';
$dbPort = $dbSettings['DB_PORT'] ?? getenv('DB_PORT') ?: '5432';
$dbName = $dbSettings['DB_NAME'] ?? getenv('DB_NAME') ?: 'postgres';
$dbUser = $dbSettings['DB_USER'] ?? getenv('DB_USER') ?: 'postgres';
$dbPass = $dbSettings['DB_PASS'] ?? getenv('DB_PASS') ?: '';

if (!function_exists('get_pdo')) {
	/**
	 * Returns the PDO connection using the resolved configuration.
	 */
	function get_pdo(): PDO
	{
		static $cached;
		if ($cached instanceof PDO) {
			return $cached;
		}

		$dsn = sprintf('pgsql:host=%s;port=%s;dbname=%s', $GLOBALS['dbHost'], $GLOBALS['dbPort'], $GLOBALS['dbName']);
		$options = [
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES => false,
		];

		try {
			$cached = new PDO($dsn, $GLOBALS['dbUser'], $GLOBALS['dbPass'], $options);
			return $cached;
		} catch (Throwable $e) {
			error_log('BOOTSTRAP: PDO initialization failed - ' . $e->getMessage());
			throw $e;
		}
	}
}

