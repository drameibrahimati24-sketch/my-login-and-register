var express = require('express');
var router = express.Router();

const adminController = require('../controllers/adminController');
const { requireRole } = require('../middleware/auth');

router.get('/', requireRole('ADMIN'), adminController.dashboard);

router.post('/users/:id/role', requireRole('ADMIN'), adminController.updateUserRole);
router.post('/users/:id/delete', requireRole('ADMIN'), adminController.deleteUser);

module.exports = router;


