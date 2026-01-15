const mockDb = require('../services/mockDb');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

exports.dashboard = async (req, res) => {
    try {
        const applications = await mockDb.application.findMany({ where: { userId: req.user.id } });
        // Fetch full job details for each application
        const jobs = await Promise.all(applications.map(async app => {
            const job = await mockDb.jobVacancy.findUnique({ where: { id: app.jobId } });
            return { ...job, appliedAt: app.appliedAt };
        }));

        res.render('member/dashboard', {
            title: 'Member Dashboard',
            user: req.user,
            jobs
        });
    } catch (error) {
        console.error(error);
        res.render('member/dashboard', { title: 'Member Dashboard', user: req.user, jobs: [], error: 'Failed to load dashboard' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await mockDb.user.findUnique({ where: { id: req.user.id } });
        res.render('member/profile', { title: 'My Profile', user: user || req.user });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};

exports.applyJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        await mockDb.application.create({
            data: {
                userId: req.user.id,
                jobId: parseInt(jobId)
            }
        });
        res.redirect('/member/dashboard');
    } catch (error) {
        console.error(error);
        res.redirect('/jobs/' + req.body.jobId);
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email, password, bio, location } = req.body;

        const updateData = { name, email, bio, location };
        if (password && password.trim() !== '') {
            updateData.password = password;
        }

        const updatedUser = await mockDb.user.update({
            where: { id: req.user.id },
            data: updateData
        });

        // Re-issue token with updated info
        const token = jwt.sign(
            { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role, name: updatedUser.name, bio: updatedUser.bio, location: updatedUser.location },
            JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.cookie('token', token, { httpOnly: true });

        res.render('member/profile', {
            title: 'My Profile',
            user: updatedUser,
            success: 'Profile updated successfully'
        });

    } catch (error) {
        console.error(error);
        res.render('member/profile', {
            title: 'My Profile',
            user: req.user,
            error: 'Failed to update profile'
        });
    }
};
