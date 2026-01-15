const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');

// Import Middleware
const viewAuthMiddleware = require('./middleware/viewAuth');

// Import Routes
const publicJobsRouter = require('./routes/public/jobs');
// const authApiRouter = require('./routes/api/auth'); // Placeholder

const app = express();

// View engine setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Global Middleware for Views
app.use(viewAuthMiddleware.checkUser);

// Routes
const authRouter = require('./routes/public/auth');
app.use('/auth', authRouter);
const adminRouter = require('./routes/public/admin');
app.use('/admin', adminRouter);
const memberRouter = require('./routes/public/member');
app.use('/member', memberRouter);
app.use('/', publicJobsRouter);
// app.use('/api/auth', authApiRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { title: 'Error' }); // You might need an error view
});

module.exports = app;