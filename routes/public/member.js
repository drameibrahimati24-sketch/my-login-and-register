const express = require('express');
const router = express.Router();
const memberController = require('../../controllers/MemberController');
const viewAuthMiddleware = require('../../middleware/viewAuth');

router.use(viewAuthMiddleware.checkUser); // Ensure user is logged in for all member routes

// Middleware to ensure we have a user object in req (handled by viewAuth usually puts in res.locals, let's allow accessing via req.user too if needed, or rely on res.locals)
// Actually, viewAuth puts it in res.locals.user. 
// Let's make a quick middleware to bridge if necessary, or update controller to use res.locals.user.
// BUT, my controller code used `req.user`. 
// Let's add a small middleware here to be safe and explicit.
router.use((req, res, next) => {
    if (res.locals.user) {
        req.user = res.locals.user;
        next();
    } else {
        res.redirect('/auth/login');
    }
});

router.get('/dashboard', memberController.dashboard);
router.get('/profile', memberController.getProfile);
router.post('/profile', memberController.updateProfile);
router.post('/apply', memberController.applyJob);

module.exports = router;
