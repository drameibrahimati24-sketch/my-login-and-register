const prisma = require('../prisma/client');

async function listUsersWithStats() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { articles: true } },
    },
  });
}

async function setUserRole(id, role) {
  return prisma.user.update({
    where: { id: Number(id) },
    data: { role },
  });
}

async function deleteUser(id) {
  // Option: delete articles first or Cascade? Prisma usually handles cascade if defined,
  // but here we might want to be explicit or just let Prisma handle it if configured.
  // Schema says nothing about OnDelete, so we might need to delete articles first.
  // Let's wrapping in transaction or delete articles first.
  const deleteArticles = prisma.article.deleteMany({
    where: { authorId: Number(id) },
  });
  const deleteUser = prisma.user.delete({
    where: { id: Number(id) },
  });
  return prisma.$transaction([deleteArticles, deleteUser]);
}

module.exports = {
  listUsersWithStats,
  setUserRole,
  deleteUser,
};


