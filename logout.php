<?php
session_start();

// Clear all session variables
$_SESSION = [];

// Delete the session cookie
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

// Destroy the session
session_destroy();

// Redirect to home page
header('Location: /');
exit;
