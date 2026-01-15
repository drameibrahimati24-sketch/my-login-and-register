const express = require('express');
const router = express.Router();

// API Auth Endpoints (Skeleton)
router.post('/login', (req, res) => { res.json({ message: 'Login API' }) });
router.post('/register', (req, res) => { res.json({ message: 'Register API' }) });

module.exports = router;
