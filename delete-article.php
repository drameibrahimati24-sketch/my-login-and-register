<?php
session_start();
require_once 'db.php';

$currentUser = isset($_SESSION['user_id']) ? getUserById($_SESSION['user_id']) : null;

// Get article ID from URL
$articleId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$article = getArticleById($articleId);

// Check permissions
if (!$article || !$currentUser || !canUserEditArticle($currentUser['id'], $currentUser['role'], $article['author_id'])) {
    header('Location: /articles');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'])) {
        header('Location: /article/' . $articleId);
        exit;
    }

    try {
        deleteArticle($articleId);
        header('Location: /my-articles');
        exit;
    } catch (Exception $e) {
        error_log($e->getMessage());
        header('Location: /article/' . $articleId);
        exit;
    }
}

// If not POST request, redirect back
header('Location: /article/' . $articleId);
exit;

