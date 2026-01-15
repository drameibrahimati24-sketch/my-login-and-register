const jwt = require('jsonwebtoken');
const mockDb = require('../services/mockDb');

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await mockDb.user.findUnique({ where: { email } });

        if (!user) {
            return res.render('auth/login', {
                title: 'Login',
                error: 'Invalid credentials'
            });
        }

        // Direct string comparison for mock environment
        const valid = password === user.password;

        if (!valid) {
            return res.render('auth/login', {
                title: 'Login',
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, name: user.name },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('auth/login', { title: 'Login', error: 'Something went wrong' });
    }
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await mockDb.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.render('auth/register', {
                title: 'Register',
                error: 'Email already currently in use'
            });
        }

        await mockDb.user.create({
            data: {
                name,
                email,
                password, // Storing plain text for mock demo only
                role: 'USER'
            }
        });

        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.render('auth/register', { title: 'Register', error: 'Registration failed' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};
