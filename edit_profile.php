<?php
// Redirect old edit_profile.php to new system
// Profile editing is now handled through the admin dashboard for admins
// or through article management for regular users
header('Location: /my-articles');
exit;
