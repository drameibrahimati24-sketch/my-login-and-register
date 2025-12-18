<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}
echo "Welcome, " . htmlentities($_SESSION['username']) . "! You are logged in.";
?>
