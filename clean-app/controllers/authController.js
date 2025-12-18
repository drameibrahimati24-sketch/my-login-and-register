const authService = require('../services/authService');

async function showLogin(req, res) {
  res.render('auth/login', { error: null });
}

async function showRegister(req, res) {
  res.render('auth/register', { error: null });
}

async function register(req, res) {
  const { email, name, password } = req.body;
  if (!email || !password) {
    return res.status(400).render('auth/register', { error: 'Email and password are required' });
  }
  try {
    const existing = await authService.findUserByEmail(email);
    if (existing) {
      return res.render('auth/register', { error: 'Email already registered' });
    }
    await authService.createUser({ email, name, password, role: 'MEMBER' });
    res.redirect('/auth/login');
  } catch (err) {
    console.error('register error', err);
    res.status(500).render('auth/register', { error: 'Server error' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render('auth/login', { error: 'Email and password are required' });
  }
  try {
    const user = await authService.validateUser(email, password);
    if (!user) {
      return res.render('auth/login', { error: 'Invalid credentials' });
    }
    req.session.userId = user.id;
    const next = req.query.next || '/articles';
    res.redirect(next);
  } catch (err) {
    console.error('login error', err);
    res.status(500).render('auth/login', { error: 'Server error' });
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
}

module.exports = {
  showLogin,
  showRegister,
  register,
  login,
  logout,
};


