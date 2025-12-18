<?php
session_start();
require_once 'db.php';

$currentUser = isset($_SESSION['user_id']) ? getUserById($_SESSION['user_id']) : null;

// Get article ID from URL
$articleId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$article = getArticleById($articleId);

if (!$article) {
    header('Location: /articles');
    exit;
}

// Check if user can edit this article
$canEdit = $currentUser && canUserEditArticle($currentUser['id'], $currentUser['role'], $article['author_id']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title><?php echo htmlspecialchars($article['title']); ?> - MultiBlog</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <header class="top-nav">
        <div class="nav-inner">
            <div class="nav-left">
                <a href="/" class="brand">MultiBlog</a>
                <a href="/" class="nav-link">Home</a>
                <a href="/articles" class="nav-link active">Articles</a>
                <?php if ($currentUser && $currentUser['role'] === 'ADMIN'): ?>
                    <a href="/admin" class="nav-link">Admin</a>
                <?php endif; ?>
            </div>
            <div class="nav-right">
                <?php if ($currentUser): ?>
                    <span class="nav-user">Welcome, <strong><?php echo htmlspecialchars($currentUser['name'] ?: $currentUser['email']); ?></strong> (<?php echo $currentUser['role']; ?>)</span>
                    <a href="/my-articles" class="btn btn-outline">My Articles</a>
                    <a href="/new-article" class="btn btn-primary">Write a story</a>
                    <a href="/logout" class="btn btn-outline">Logout</a>
                <?php else: ?>
                    <a href="/login" class="btn btn-outline">Sign in</a>
                    <a href="/register" class="btn btn-primary">Get started</a>
                <?php endif; ?>
            </div>
        </div>
    </header>

    <main class="page-container">
        <article class="article-detail">
            <header style="margin-bottom: 2rem;">
                <h1 class="article-detail-title"><?php echo htmlspecialchars($article['title']); ?></h1>
                <div class="article-detail-meta">
                    <span class="article-detail-author">
                        <?php echo htmlspecialchars($article['author_name'] ?: $article['author_email']); ?>
                    </span>
                    <span>·</span>
                    <span><?php echo date('F j, Y', strtotime($article['created_at'])); ?></span>
                    <span>·</span>
                    <span><?php echo calculateReadingTime($article['content']); ?> min read</span>
                </div>
            </header>

            <div class="article-detail-content">
                <?php
                // Convert line breaks to paragraphs for better formatting
                $content = nl2br(htmlspecialchars($article['content']));
                echo $content;
                ?>
            </div>

            <?php if ($canEdit): ?>
                <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
                    <div style="display: flex; gap: 1rem;">
                        <a href="/edit-article/<?php echo $article['id']; ?>" class="btn btn-primary">Edit Article</a>
                        <form method="POST" action="/delete-article/<?php echo $article['id']; ?>" style="display: inline;" onsubmit="return confirm('Are you sure you want to delete this article?');">
                            <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token'] ?? ''); ?>">
                            <button type="submit" class="btn btn-outline" style="color: #dc2626; border-color: #dc2626;">Delete Article</button>
                        </form>
                    </div>
                </div>
            <?php endif; ?>
        </article>
    </main>
</body>
</html>
