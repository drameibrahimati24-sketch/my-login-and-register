const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

exports.checkUser = (req, res, next) => {
  res.locals.user = null;
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (!err) {
        res.locals.user = decoded;
      }
      next();
    });
  } else {
    next();
  }
};

exports.checkAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/auth/login');
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.redirect('/auth/login');
    }

    if (decoded.role !== 'ADMIN') {
      return res.render('error', {
        title: 'Forbidden',
        message: 'You do not have permission to view this page',
        error: { status: 403 }
      });
    }

    next();
  });
};