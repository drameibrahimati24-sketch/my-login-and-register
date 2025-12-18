<?php
session_start();
require_once 'db.php';

// Get all articles for the home page
$articles = getAllArticles();
$currentUser = isset($_SESSION['user_id']) ? getUserById($_SESSION['user_id']) : null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>MultiBlog - Share Your Stories</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <header class="top-nav">
        <div class="nav-inner">
            <div class="nav-left">
                <a href="/" class="brand">MultiBlog</a>
                <a href="/" class="nav-link active">Home</a>
                <a href="/articles" class="nav-link">Articles</a>
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
        <div class="hero-section">
            <h1 class="hero-title">Welcome to MultiBlog</h1>
            <p class="hero-subtitle">Discover amazing stories and share your own with the community</p>
            <?php if (!$currentUser): ?>
                <div class="hero-actions">
                    <a href="/register" class="btn btn-primary btn-large">Start Writing</a>
                    <a href="/articles" class="btn btn-outline btn-large">Explore Articles</a>
                </div>
            <?php endif; ?>
        </div>

        <section class="articles-section">
            <h2 class="section-title">Latest Stories</h2>

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
        </section>
    </main>

<script>
document.addEventListener('DOMContentLoaded', ()=>{
  const msg = document.getElementById('message-area');
  function showMessage(text, type='error'){
    msg.textContent = text;
    msg.className = 'p-4 text-sm font-medium';
    msg.classList.add(type === 'success' ? 'bg-green-100' : 'bg-red-100','text-' + (type==='success'?'green':'red') + '-800');
    setTimeout(()=> msg.classList.add('hidden'),5000);
  }

  async function submitForm(form, endpoint, successText){
    const btn = form.querySelector('button');
    const span = btn.querySelector('span');
    const original = span.textContent;
    btn.disabled = true; span.textContent = 'Processing...';
    const data = new FormData(form);
    try {
      const res = await fetch(endpoint, { method:'POST', body:data });
      if (!res.ok) throw new Error('Network response not ok');
      const json = await res.json();
      if (json.success) {
        showMessage(successText, 'success');
        form.reset();
        if (json.redirect) {
          window.location.href = json.redirect;
          return;
        }
        if (endpoint.includes('register')) showForm('login');
      } else showMessage(json.message || 'Operation failed');
    } catch (e) {
      showMessage('Connection error: ensure XAMPP is running and files are in htdocs.');
      console.error(e);
    } finally { btn.disabled=false; span.textContent=original; }
  }

  document.getElementById('login-form').addEventListener('submit', e => { e.preventDefault(); submitForm(e.target,'login.php','Login successful'); });
  document.getElementById('register-form').addEventListener('submit', e => { e.preventDefault(); submitForm(e.target,'register.php','Registration successful'); });

  window.showForm = function(name){
    const isLogin = name === 'login';
    document.getElementById('login-form').classList.toggle('hidden', !isLogin);
    document.getElementById('register-form').classList.toggle('hidden', isLogin);
    document.getElementById('tab-login').classList.toggle('border-indigo-600', isLogin);
  }
});
</script>
</body>
</html>
