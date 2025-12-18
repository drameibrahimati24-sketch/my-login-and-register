const articleService = require('../services/articleService');

async function list(req, res, next) {
  try {
    const articles = await articleService.listAllArticles();
    res.render('articles/index', { articles, title: 'Latest articles' });
  } catch (err) {
    next(err);
  }
}

async function listMine(req, res, next) {
  try {
    const articles = await articleService.listArticlesByAuthor(req.currentUser.id);
    res.render('articles/index', { articles, title: 'My articles' });
  } catch (err) {
    next(err);
  }
}

async function detail(req, res, next) {
  try {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) {
      return res.status(404).render('error', { message: 'Article not found', error: {} });
    }
    res.render('articles/detail', { article });
  } catch (err) {
    next(err);
  }
}

function newForm(req, res) {
  res.render('articles/new', { error: null });
}

async function create(req, res, next) {
  const { title, content } = req.body;
  const image = req.file ? '/uploads/' + req.file.filename : null;

  if (!title || !content) {
    return res.status(400).render('articles/new', { error: 'Title and content are required' });
  }
  try {
    await articleService.createArticle({
      title,
      content,
      image,
      authorId: req.currentUser.id,
    });
    res.redirect('/articles');
  } catch (err) {
    next(err);
  }
}

function editForm(req, res) {
  const article = req.resource;
  res.render('articles/edit', { article, error: null });
}

async function update(req, res, next) {
  const { title, content } = req.body;
  const image = req.file ? '/uploads/' + req.file.filename : undefined;

  if (!title || !content) {
    return res.status(400).render('articles/edit', { article: req.resource, error: 'Title and content are required' });
  }
  try {
    await articleService.updateArticle(req.params.id, { title, content, image });
    res.redirect('/articles/' + req.params.id);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await articleService.deleteArticle(req.params.id);
    res.redirect('/articles');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list,
  listMine,
  detail,
  newForm,
  create,
  editForm,
  update,
  remove,
};


