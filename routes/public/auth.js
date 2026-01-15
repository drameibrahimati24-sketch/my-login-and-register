const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/AuthController');

router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login', error: null });
});

router.post('/login', AuthController.login);

router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register', error: null });
});

router.post('/register', AuthController.register);

router.get('/logout', AuthController.logout);

module.exports = router;
