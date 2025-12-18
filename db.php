<?php
$DB_HOST = '127.0.0.1';
$DB_NAME = 'auth_demo'; // Change to your database name if different
$DB_USER = 'root';
$DB_PASS = '';

try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4", $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (Exception $e) {
    die('Database connection failed: ' . $e->getMessage());
}

// Utility functions for enhanced functionality

// Calculate reading time (words per minute)
function calculateReadingTime($content) {
    $wordCount = str_word_count(strip_tags($content));
    $wordsPerMinute = 200; // Average reading speed
    $minutes = ceil($wordCount / $wordsPerMinute);
    return $minutes;
}

// Get user by ID with article count
function getUserById($userId) {
    global $pdo;
    $stmt = $pdo->prepare("
        SELECT u.*, COUNT(a.id) as article_count
        FROM users u
        LEFT JOIN articles a ON u.id = a.author_id
        WHERE u.id = ?
        GROUP BY u.id
    ");
    $stmt->execute([$userId]);
    return $stmt->fetch();
}

// Get all users with article counts (for admin)
function getAllUsers() {
    global $pdo;
    $stmt = $pdo->query("
        SELECT u.*, COUNT(a.id) as article_count
        FROM users u
        LEFT JOIN articles a ON u.id = a.author_id
        GROUP BY u.id
        ORDER BY u.created_at DESC
    ");
    return $stmt->fetchAll();
}

// Update user role (admin function)
function updateUserRole($userId, $role) {
    global $pdo;
    $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
    return $stmt->execute([$role, $userId]);
}

// Get all articles with author info
function getAllArticles() {
    global $pdo;
    $stmt = $pdo->query("
        SELECT a.*, u.name as author_name, u.email as author_email
        FROM articles a
        JOIN users u ON a.author_id = u.id
        ORDER BY a.created_at DESC
    ");
    return $stmt->fetchAll();
}

// Get articles by user
function getArticlesByUser($userId) {
    global $pdo;
    $stmt = $pdo->prepare("
        SELECT a.*, u.name as author_name, u.email as author_email
        FROM articles a
        JOIN users u ON a.author_id = u.id
        WHERE a.author_id = ?
        ORDER BY a.created_at DESC
    ");
    $stmt->execute([$userId]);
    return $stmt->fetchAll();
}

// Get article by ID with author
function getArticleById($articleId) {
    global $pdo;
    $stmt = $pdo->prepare("
        SELECT a.*, u.name as author_name, u.email as author_email, u.role as author_role
        FROM articles a
        JOIN users u ON a.author_id = u.id
        WHERE a.id = ?
    ");
    $stmt->execute([$articleId]);
    return $stmt->fetch();
}

// Create new article
function createArticle($title, $content, $authorId) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)");
    $stmt->execute([$title, $content, $authorId]);
    return $pdo->lastInsertId();
}

// Update article
function updateArticle($articleId, $title, $content) {
    global $pdo;
    $stmt = $pdo->prepare("UPDATE articles SET title = ?, content = ?, updated_at = NOW() WHERE id = ?");
    return $stmt->execute([$title, $content, $articleId]);
}

// Delete article
function deleteArticle($articleId) {
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM articles WHERE id = ?");
    return $stmt->execute([$articleId]);
}

// Check if user can edit article
function canUserEditArticle($userId, $userRole, $articleAuthorId) {
    return $userRole === 'ADMIN' || $userId == $articleAuthorId;
}

// Get user statistics
function getUserStats($userId) {
    global $pdo;
    $stmt = $pdo->prepare("
        SELECT
            COUNT(a.id) as total_articles,
            MAX(a.created_at) as last_article_date
        FROM articles a
        WHERE a.author_id = ?
    ");
    $stmt->execute([$userId]);
    return $stmt->fetch();
}
?>
