const adminService = require('../services/adminService');

async function dashboard(req, res, next) {
  try {
    const users = await adminService.listUsersWithStats();
    res.render('admin/dashboard', { users });
  } catch (err) {
    next(err);
  }
}

async function updateUserRole(req, res, next) {
  const { role } = req.body;
  const { id } = req.params;
  if (!['ADMIN', 'MEMBER'].includes(role)) {
    return res.redirect('/admin');
  }
  try {
    await adminService.setUserRole(id, role);
    res.redirect('/admin');
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  const { id } = req.params;
  // Prevent deleting yourself
  if (req.currentUser.id === Number(id)) {
    return res.status(400).send('Cannot delete yourself');
  }
  try {
    await adminService.deleteUser(id);
    res.redirect('/admin');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  dashboard,
  updateUserRole,
  deleteUser,
};


