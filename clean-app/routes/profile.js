var express = require('express');
var router = express.Router();

const profileController = require('../controllers/profileController');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth(), profileController.show);
router.post('/', requireAuth(), profileController.update);

module.exports = router;
