<?php
session_start();
require_once 'db.php';

$currentUser = isset($_SESSION['user_id']) ? getUserById($_SESSION['user_id']) : null;

// Check admin access
if (!$currentUser || $currentUser['role'] !== 'ADMIN') {
    header('Location: /');
    exit;
}

// Handle role updates
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'] ?? '', $_POST['csrf_token'])) {
        $error = 'Invalid request';
    } else {
        $userId = (int)($_POST['user_id'] ?? 0);
        $action = $_POST['action'];

        if ($action === 'update_role' && isset($_POST['role'])) {
            $newRole = $_POST['role'];
            if (in_array($newRole, ['ADMIN', 'MEMBER'])) {
                updateUserRole($userId, $newRole);
                $success = 'User role updated successfully';
            }
        }
    }
}

$users = getAllUsers();

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
    <title>Admin Dashboard - MultiBlog</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <header class="top-nav">
        <div class="nav-inner">
            <div class="nav-left">
                <a href="/" class="brand">MultiBlog</a>
                <a href="/" class="nav-link">Home</a>
                <a href="/articles" class="nav-link">Articles</a>
                <a href="/admin" class="nav-link active">Admin</a>
            </div>
            <div class="nav-right">
                <span class="nav-user">Welcome, <strong><?php echo htmlspecialchars($currentUser['name'] ?: $currentUser['email']); ?></strong> (<?php echo $currentUser['role']; ?>)</span>
                <a href="/logout" class="btn btn-outline">Logout</a>
            </div>
        </div>
    </header>

    <main class="page-container">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2rem;">
            <h1 class="section-title">Admin Dashboard</h1>
            <div>
                <span style="color: var(--text-secondary); margin-right: 1rem;">
                    Total Users: <?php echo count($users); ?>
                </span>
                <span style="color: var(--text-secondary);">
                    Total Articles: <?php echo array_sum(array_column($users, 'article_count')); ?>
                </span>
            </div>
        </div>

        <?php if (isset($success)): ?>
            <div style="margin-bottom: 1rem; padding: 0.75rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; color: #166534;">
                <?php echo htmlspecialchars($success); ?>
            </div>
        <?php endif; ?>

        <?php if (isset($error)): ?>
            <div style="margin-bottom: 1rem; padding: 0.75rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; color: #dc2626;">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>

        <div style="background: var(--background); border-radius: var(--border-radius-lg); padding: 2rem; box-shadow: var(--shadow);">
            <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--text-primary);">User Management</h2>

            <div class="admin-table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Articles</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $user): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($user['name'] ?: 'No name'); ?></td>
                                <td><?php echo htmlspecialchars($user['email']); ?></td>
                                <td>
                                    <span style="padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 500;
                                        <?php if ($user['role'] === 'ADMIN'): ?>
                                            background: #fef3c7; color: #92400e;
                                        <?php else: ?>
                                            background: #e0e7ff; color: #3730a3;
                                        <?php endif; ?>">
                                        <?php echo $user['role']; ?>
                                    </span>
                                </td>
                                <td><?php echo $user['article_count']; ?></td>
                                <td><?php echo date('M j, Y', strtotime($user['created_at'])); ?></td>
                                <td>
                                    <?php if ($user['id'] !== $currentUser['id']): ?>
                                        <form method="POST" style="display: inline;">
                                            <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
                                            <input type="hidden" name="user_id" value="<?php echo $user['id']; ?>">
                                            <input type="hidden" name="action" value="update_role">
                                            <select name="role" style="margin-right: 0.5rem; padding: 0.25rem; border: 1px solid var(--border-color); border-radius: 4px;">
                                                <option value="MEMBER" <?php echo $user['role'] === 'MEMBER' ? 'selected' : ''; ?>>MEMBER</option>
                                                <option value="ADMIN" <?php echo $user['role'] === 'ADMIN' ? 'selected' : ''; ?>>ADMIN</option>
                                            </select>
                                            <button type="submit" class="btn btn-primary btn-small">Update</button>
                                        </form>
                                    <?php else: ?>
                                        <span style="color: var(--text-secondary); font-size: 0.875rem;">(You)</span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>

        <div style="margin-top: 2rem; background: var(--background); border-radius: var(--border-radius-lg); padding: 2rem; box-shadow: var(--shadow);">
            <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--text-primary);">Quick Stats</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div style="text-align: center; padding: 1rem; background: var(--background-secondary); border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-color);"><?php echo count($users); ?></div>
                    <div style="color: var(--text-secondary);">Total Users</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: var(--background-secondary); border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-color);"><?php echo array_sum(array_column($users, 'article_count')); ?></div>
                    <div style="color: var(--text-secondary);">Total Articles</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: var(--background-secondary); border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-color);"><?php echo count(array_filter($users, fn($u) => $u['role'] === 'ADMIN')); ?></div>
                    <div style="color: var(--text-secondary);">Admin Users</div>
                </div>
            </div>
        </div>
    </main>

    <style>
        .admin-table-container {
            overflow-x: auto;
        }

        .btn-small {
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
        }

        @media (max-width: 768px) {
            .admin-table th,
            .admin-table td {
                padding: 0.5rem;
                font-size: 0.875rem;
            }
        }
    </style>
</body>
</html>
