var express = require('express');
var router = express.Router();

const articleController = require('../controllers/articleController');

/* Home redirects to articles list */
router.get('/', articleController.list);

module.exports = router;
