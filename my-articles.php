<?php
session_start();
require_once 'db.php';

$currentUser = isset($_SESSION['user_id']) ? getUserById($_SESSION['user_id']) : null;

// Redirect if not logged in
if (!$currentUser) {
    header('Location: /login?redirect=/my-articles');
    exit;
}

$articles = getArticlesByUser($currentUser['id']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>My Articles - MultiBlog</title>
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
                <a href="/new-article" class="btn btn-primary">Write a story</a>
                <a href="/logout" class="btn btn-outline">Logout</a>
            </div>
        </div>
    </header>

    <main class="page-container">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2rem;">
            <h1 class="section-title">My Articles</h1>
            <a href="/new-article" class="btn btn-primary">Write a story</a>
        </div>

        <?php if (empty($articles)): ?>
            <div class="empty-state">
                <h3>You haven't written any articles yet</h3>
                <p>Share your first story with the community!</p>
                <a href="/new-article" class="btn btn-primary">Write Your First Article</a>
            </div>
        <?php else: ?>
            <div style="background: var(--background); border-radius: var(--border-radius-lg); padding: 2rem; box-shadow: var(--shadow);">
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                    You have written <strong><?php echo count($articles); ?></strong> article(s).
                    Total views: Coming soon.
                </p>

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
                                    <span class="article-date">
                                        <?php echo date('M j, Y', strtotime($article['created_at'])); ?>
                                    </span>
                                    <span>·</span>
                                    <span class="article-read-time">
                                        <?php echo calculateReadingTime($article['content']); ?> min read
                                    </span>
                                </div>
                            </div>
                            <div class="article-content">
                                <p><?php
                                    $content = strip_tags($article['content']);
                                    echo htmlspecialchars(substr($content, 0, 150) . (strlen($content) > 150 ? '...' : ''));
                                ?></p>
                            </div>
                            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                                <a href="/article/<?php echo $article['id']; ?>" class="btn btn-outline btn-small">Read</a>
                                <a href="/edit-article/<?php echo $article['id']; ?>" class="btn btn-primary btn-small">Edit</a>
                                <form method="POST" action="/delete-article/<?php echo $article['id']; ?>" style="display: inline;" onsubmit="return confirm('Are you sure you want to delete this article?');">
                                    <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token'] ?? ''); ?>">
                                    <button type="submit" class="btn btn-outline btn-small" style="color: #dc2626; border-color: #dc2626;">Delete</button>
                                </form>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </main>

    <style>
        .btn-small {
            padding: 0.375rem 0.75rem;
            font-size: 0.75rem;
        }
    </style>
</body>
</html>
