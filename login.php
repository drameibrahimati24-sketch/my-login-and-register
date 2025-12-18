<?php
session_start();
require_once 'db.php';

$currentUser = isset($_SESSION['user_id']) ? getUserById($_SESSION['user_id']) : null;

// If user is already logged in, redirect to home
if ($currentUser) {
    header('Location: /');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'])) {
        $error = 'Invalid request';
    } else {
        $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
        $password = $_POST['password'] ?? '';

        if (!$email || !$password) {
            $error = 'Please fill in all fields';
        } else {
            try {
                $stmt = $pdo->prepare('SELECT id, password_hash, name, email, role FROM users WHERE email = ? LIMIT 1');
                $stmt->execute([$email]);
                $user = $stmt->fetch();

                if (!$user || !password_verify($password, $user['password_hash'])) {
                    $error = 'Invalid email or password';
                } else {
                    // Successful login
                    session_regenerate_id(true);
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['user_email'] = $user['email'];
                    $_SESSION['user_role'] = $user['role'];

                    // Redirect based on user role
                    $redirect = isset($_GET['redirect']) ? $_GET['redirect'] : '/';
                    header('Location: ' . $redirect);
                    exit;
                }
            } catch (Exception $e) {
                error_log($e->getMessage());
                $error = 'Server error. Please try again.';
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
    <title>Sign In - MultiBlog</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <header class="top-nav">
        <div class="nav-inner">
            <div class="nav-left">
                <a href="/" class="brand">MultiBlog</a>
                <a href="/" class="nav-link">Home</a>
                <a href="/articles" class="nav-link">Articles</a>
            </div>
            <div class="nav-right">
                <a href="/register" class="btn btn-primary">Get started</a>
            </div>
        </div>
    </header>

    <main class="page-container">
        <div class="form-container">
            <h1 class="form-title">Welcome back</h1>

            <?php if ($error): ?>
                <div class="form-error" style="margin-bottom: 1rem; padding: 0.75rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px;">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="/login">
                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">

                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" name="email" required
                           value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>"
                           class="form-input">
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" name="password" required class="form-input">
                </div>

                <button type="submit" class="btn-submit">Sign in</button>
            </form>

            <div style="text-align: center; margin-top: 2rem;">
                <p style="color: var(--text-secondary);">
                    Don't have an account?
                    <a href="/register" style="color: var(--accent-color); text-decoration: none; font-weight: 500;">Sign up</a>
                </p>
            </div>
        </div>
    </main>
</body>
</html>