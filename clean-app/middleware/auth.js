const prisma = require('../prisma/client');

function attachCurrentUser() {
  return async function (req, res, next) {
    res.locals.currentUser = null;
    if (!req.session || !req.session.userId) {
      return next();
    }
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.session.userId },
      });
      if (user) {
        req.currentUser = user;
        res.locals.currentUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      } else {
        req.session.userId = null;
      }
    } catch (err) {
      console.error('attachCurrentUser error', err);
    }
    next();
  };
}

function requireAuth() {
  return function (req, res, next) {
    if (!req.currentUser) {
      return res.redirect('/auth/login?next=' + encodeURIComponent(req.originalUrl));
    }
    next();
  };
}

function requireRole(...roles) {
  return function (req, res, next) {
    if (!req.currentUser) {
      return res.redirect('/auth/login?next=' + encodeURIComponent(req.originalUrl));
    }
    if (!roles.includes(req.currentUser.role)) {
      return res.status(403).render('error', { message: 'Forbidden', error: {} });
    }
    next();
  };
}

function requireOwnershipOrRole({ fetchResource, ownerField = 'authorId', allowedRoles = ['ADMIN'] }) {
  return async function (req, res, next) {
    if (!req.currentUser) {
      return res.redirect('/auth/login?next=' + encodeURIComponent(req.originalUrl));
    }
    try {
      const resource = await fetchResource(req);
      if (!resource) {
        return res.status(404).render('error', { message: 'Not found', error: {} });
      }
      const isAdmin = allowedRoles.includes(req.currentUser.role);
      const isOwner = resource[ownerField] === req.currentUser.id;
      if (!isAdmin && !isOwner) {
        return res.status(403).render('error', { message: 'Forbidden', error: {} });
      }
      req.resource = resource;
      next();
    } catch (err) {
      console.error('requireOwnershipOrRole error', err);
      next(err);
    }
  };
}

module.exports = {
  attachCurrentUser,
  requireAuth,
  requireRole,
  requireOwnershipOrRole,
};


