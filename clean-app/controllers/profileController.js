const prisma = require('../prisma/client');

async function show(req, res, next) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.currentUser.id },
        });
        res.render('users/profile', { user, error: null, success: null });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    const { name, email, bio } = req.body;
    try {
        // Check if email is taken by another user
        if (email !== req.currentUser.email) {
            const existing = await prisma.user.findUnique({ where: { email } });
            if (existing) {
                return res.render('users/profile', {
                    user: { ...req.currentUser, name, email, bio },
                    error: 'Email is already in use',
                    success: null
                });
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: req.currentUser.id },
            data: { name, email, bio },
        });

        // Update session/locals if needed (depends on how auth middleware works)
        req.currentUser = updatedUser;

        res.render('users/profile', {
            user: updatedUser,
            error: null,
            success: 'Profile updated successfully'
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    show,
    update,
};
