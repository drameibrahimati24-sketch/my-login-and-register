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
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'])) {
        $error = 'Invalid request';
    } else {
        $name = trim($_POST['name'] ?? '');
        $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
        $password = $_POST['password'] ?? '';
        $confirmPassword = $_POST['confirm_password'] ?? '';

        if (!$name || !$email || strlen($password) < 8) {
            $error = 'Please fill in all fields. Password must be at least 8 characters.';
        } elseif ($password !== $confirmPassword) {
            $error = 'Passwords do not match.';
        } else {
            try {
                // Check if email already exists
                $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
                $stmt->execute([$email]);
                if ($stmt->fetch()) {
                    $error = 'Email already registered. Try signing in instead.';
                } else {
                    // Create new user
                    $hash = password_hash($password, PASSWORD_DEFAULT);
                    $insert = $pdo->prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)');
                    $insert->execute([$name, $email, $hash, 'MEMBER']);

                    $success = 'Account created successfully! You can now sign in.';
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
    <title>Sign Up - MultiBlog</title>
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
                <a href="/login" class="btn btn-outline">Sign in</a>
            </div>
        </div>
    </header>

    <main class="page-container">
        <div class="form-container">
            <h1 class="form-title">Join MultiBlog</h1>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 2rem;">
                Share your stories with the community
            </p>

            <?php if ($error): ?>
                <div class="form-error" style="margin-bottom: 1rem; padding: 0.75rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px;">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <?php if ($success): ?>
                <div style="margin-bottom: 1rem; padding: 0.75rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; color: #166534;">
                    <?php echo htmlspecialchars($success); ?>
                    <br><a href="/login" style="color: var(--accent-color); text-decoration: none; font-weight: 500;">Sign in now →</a>
                </div>
            <?php endif; ?>

            <form method="POST" action="/register">
                <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">

                <div class="form-group">
                    <label for="name" class="form-label">Full Name</label>
                    <input type="text" id="name" name="name" required
                           value="<?php echo htmlspecialchars($_POST['name'] ?? ''); ?>"
                           class="form-input">
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" name="email" required
                           value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>"
                           class="form-input">
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" name="password" required minlength="8" class="form-input">
                    <small style="color: var(--text-secondary); font-size: 0.75rem;">Must be at least 8 characters</small>
                </div>

                <div class="form-group">
                    <label for="confirm_password" class="form-label">Confirm Password</label>
                    <input type="password" id="confirm_password" name="confirm_password" required class="form-input">
                </div>

                <button type="submit" class="btn-submit">Create account</button>
            </form>

            <div style="text-align: center; margin-top: 2rem;">
                <p style="color: var(--text-secondary);">
                    Already have an account?
                    <a href="/login" style="color: var(--accent-color); text-decoration: none; font-weight: 500;">Sign in</a>
                </p>
            </div>
        </div>
    </main>
</body>
</html>