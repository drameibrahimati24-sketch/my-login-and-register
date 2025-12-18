var express = require('express');
var router = express.Router();

const articleController = require('../controllers/articleController');
const { requireAuth, requireOwnershipOrRole } = require('../middleware/auth');
const articleService = require('../services/articleService');

// Public read-only
router.get('/', articleController.list);

const upload = require('../middleware/upload');

// Authenticated create and own list
router.get('/new', requireAuth(), articleController.newForm);
router.get('/mine', requireAuth(), articleController.listMine);
router.post('/', requireAuth(), upload.single('image'), articleController.create);

// Public detail view (must be after /new so /new doesn't match :id)
router.get('/:id', articleController.detail);

// Edit / delete: owner or admin
router.get(
  '/:id/edit',
  requireOwnershipOrRole({
    fetchResource: (req) => articleService.getArticleById(req.params.id),
    ownerField: 'authorId',
    allowedRoles: ['ADMIN'],
  }),
  articleController.editForm
);

router.post(
  '/:id/edit',
  requireOwnershipOrRole({
    fetchResource: (req) => articleService.getArticleById(req.params.id),
    ownerField: 'authorId',
    allowedRoles: ['ADMIN'],
  }),
  upload.single('image'),
  articleController.update
);

router.post(
  '/:id/delete',
  requireOwnershipOrRole({
    fetchResource: (req) => articleService.getArticleById(req.params.id),
    ownerField: 'authorId',
    allowedRoles: ['ADMIN'],
  }),
  articleController.remove
);

module.exports = router;


