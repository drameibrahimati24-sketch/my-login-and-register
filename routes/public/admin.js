const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/AdminController');
const { checkAdmin } = require('../../middleware/viewAuth'); // Need to implement this

router.use(checkAdmin); // Protect all admin routes

router.get('/dashboard', AdminController.dashboard);
router.get('/users', AdminController.getUsers);
router.get('/vacancies', AdminController.getVacancies);

module.exports = router;
