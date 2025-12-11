var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', userController.getAllUsers);
router.get('/register', userController.formUser);
router.post('/submit', userController.submitUser);

module.exports = router;
