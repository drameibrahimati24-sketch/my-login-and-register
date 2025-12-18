const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

app.use(cors());
app.use(express.json());

// Middleware to check JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

// Register
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || password.length < 8) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({ data: { username, email, password: hash } });
    res.json({ message: 'Registered', user: { id: user.id, username: user.username, email: user.email } });
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in', token });
});

// Get current user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
    const user = await prisma.users.findUnique({ where: { id: req.user.id }, select: { id: true, username: true, email: true, created_at: true } });
    res.json({ user });
});

// Edit profile
app.put('/api/profile', authenticateToken, async (req, res) => {
    const { username, email, password } = req.body;
    const data = { username, email };
    if (password && password.length >= 8) {
        data.password = await bcrypt.hash(password, 10);
    }
    await prisma.users.update({ where: { id: req.user.id }, data });
    res.json({ message: 'Profile updated' });
});

// List users
app.get('/api/users', authenticateToken, async (req, res) => {
    const users = await prisma.users.findMany({ select: { id: true, username: true, email: true, created_at: true } });
    res.json({ users });
});

// User detail
app.get('/api/users/:id', authenticateToken, async (req, res) => {
    const user = await prisma.users.findUnique({ where: { id: Number(req.params.id) }, select: { id: true, username: true, email: true, created_at: true } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
});

// Root route
app.get('/', (req, res) => {
    res.send('API is running!');
});

app.listen(PORT, () => console.log(`Node.js API running on http://localhost:${PORT}`));
