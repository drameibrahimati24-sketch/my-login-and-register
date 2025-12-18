<?php
session_start();
require_once 'db.php';

$currentUser = isset($_SESSION['user_id']) ? getUserById($_SESSION['user_id']) : null;
$articles = getAllArticles();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>All Articles - MultiBlog</title>
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
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2rem;">
            <h1 class="section-title">All Articles</h1>
            <?php if ($currentUser): ?>
                <a href="/new-article" class="btn btn-primary">Write a story</a>
            <?php endif; ?>
        </div>

        <?php if (empty($articles)): ?>
            <div class="empty-state">
                <h3>No articles yet</h3>
                <p>Be the first to share your story with the community!</p>
                <?php if ($currentUser): ?>
                    <a href="/new-article" class="btn btn-primary">Write Your First Article</a>
                <?php else: ?>
                    <a href="/register" class="btn btn-primary">Join to Start Writing</a>
                <?php endif; ?>
            </div>
        <?php else: ?>
            <div class="articles-grid">
                <?php foreach ($articles as $article): ?>
                    <article class="article-card">
                        <div class="article-header">
                            <h3 class="article-title">
                                <a href="/article/<?php echo $article['id']; ?>">
                                    <?php echo htmlspecialchars($article['title']); ?>
                                </a>
                            </h3>
                            <div class="article-meta">
                                <span class="article-author">
                                    <?php echo htmlspecialchars($article['author_name'] ?: $article['author_email']); ?>
                                </span>
                                <span class="article-date">
                                    <?php echo date('M j, Y', strtotime($article['created_at'])); ?>
                                </span>
                                <span class="article-read-time">
                                    <?php echo calculateReadingTime($article['content']); ?> min read
                                </span>
                            </div>
                        </div>
                        <div class="article-content">
                            <p><?php
                                $content = strip_tags($article['content']);
                                echo htmlspecialchars(substr($content, 0, 200) . (strlen($content) > 200 ? '...' : ''));
                            ?></p>
                        </div>
                        <a href="/article/<?php echo $article['id']; ?>" class="article-read-more">
                            Read more →
                        </a>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </main>
</body>
</html>
