const mockDb = require('../services/mockDb');

exports.dashboard = async (req, res) => {
    const jobCount = (await mockDb.jobVacancy.findMany()).length;
    // const userCount = (await mockDb.user.findMany()).length; // Need to implement findMany for users in mockDb
    const userCount = 2; // Placeholder

    res.render('admin/dashboard', {
        title: 'Admin Dashboard',
        stats: { jobs: jobCount, users: userCount }
    });
};

exports.getUsers = async (req, res) => {
    // Mock users list
    const users = [
        { id: 1, name: 'Admin User', email: 'admin@jobnexus.com', role: 'ADMIN' },
        { id: 2, name: 'John Doe', email: 'john@example.com', role: 'USER' }
    ];
    res.render('admin/users', { title: 'User Management', users });
};

exports.getVacancies = async (req, res) => {
    const jobs = await mockDb.jobVacancy.findMany();
    res.render('admin/vacancies', { title: 'Vacancy Management', jobs });
};
