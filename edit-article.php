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

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'])) {
        $error = 'Invalid request';
    } else {
        $title = trim($_POST['title'] ?? '');
        $content = trim($_POST['content'] ?? '');

        if (!$title || !$content) {
            $error = 'Title and content are required';
        } elseif (strlen($title) > 500) {
            $error = 'Title must be less than 500 characters';
        } elseif (strlen($content) < 10) {
            $error = 'Content must be at least 10 characters';
        } else {
            try {
                updateArticle($articleId, $title, $content);
                header('Location: /article/' . $articleId);
                exit;
            } catch (Exception $e) {
                error_log($e->getMessage());
                $error = 'Failed to update article. Please try again.';
            }
        }
    }
}

// Generate CSRF token
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Edit Article - MultiBlog</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <header class="top-nav">
        <div class="nav-inner">
            <div class="nav-left">
                <a href="/" class="brand">MultiBlog</a>
                <a href="/" class="nav-link">Home</a>
                <a href="/articles" class="nav-link">Articles</a>
                <?php if ($currentUser && $currentUser['role'] === 'ADMIN'): ?>
                    <a href="/admin" class="nav-link">Admin</a>
                <?php endif; ?>
            </div>
            <div class="nav-right">
                <span class="nav-user">Welcome, <strong><?php echo htmlspecialchars($currentUser['name'] ?: $currentUser['email']); ?></strong> (<?php echo $currentUser['role']; ?>)</span>
                <a href="/my-articles" class="btn btn-outline">My Articles</a>
                <a href="/logout" class="btn btn-outline">Logout</a>
            </div>
        </div>
    </header>

    <main class="page-container">
        <div class="form-container" style="max-width: 800px;">
            <h1 class="form-title">Edit Article</h1>

            <?php if ($error): ?>
                <div class="form-error" style="margin-bottom: 1rem; padding: 0.75rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px;">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="/edit-article/<?php echo $article['id']; ?>">
                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">

                <div class="form-group">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" id="title" name="title" required maxlength="500"
                           value="<?php echo htmlspecialchars($_POST['title'] ?? $article['title']); ?>"
                           class="form-input">
                </div>

                <div class="form-group">
                    <label for="content" class="form-label">Content</label>
                    <textarea id="content" name="content" required rows="15"
                              class="form-input"><?php echo htmlspecialchars($_POST['content'] ?? $article['content']); ?></textarea>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button type="submit" class="btn btn-primary" style="flex: 1;">Update Article</button>
                    <a href="/article/<?php echo $article['id']; ?>" class="btn btn-outline">Cancel</a>
                </div>
            </form>
        </div>
    </main>
</body>
</html>
