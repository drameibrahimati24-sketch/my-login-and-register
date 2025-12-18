const prisma = require('../prisma/client');

function listAllArticles() {
  return prisma.article.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });
}

function listArticlesByAuthor(authorId) {
  return prisma.article.findMany({
    where: { authorId: Number(authorId) },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });
}

function getArticleById(id) {
  const numericId = Number(id);
  if (!id || Number.isNaN(numericId)) {
    return Promise.resolve(null);
  }
  return prisma.article.findUnique({
    where: { id: numericId },
    include: { author: true },
  });
}

function createArticle({ title, content, image, authorId }) {
  return prisma.article.create({
    data: {
      title,
      content,
      image,
      authorId,
    },
  });
}

function updateArticle(id, { title, content, image }) {
  const data = { title, content };
  if (image) {
    data.image = image;
  }
  return prisma.article.update({
    where: { id: Number(id) },
    data,
  });
}

function deleteArticle(id) {
  return prisma.article.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  listAllArticles,
  listArticlesByAuthor,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};


