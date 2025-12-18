const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client');

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function createUser({ email, name, password, role = 'MEMBER' }) {
  const passwordHash = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      role,
    },
  });
}

async function validateUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return user;
}

async function ensureAdminSeed() {
  const existing = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  });
  if (existing) return existing;
  // Default admin for demo purposes
  return createUser({
    email: 'admin@example.com',
    name: 'Admin',
    password: 'Admin123!',
    role: 'ADMIN',
  });
}

module.exports = {
  findUserByEmail,
  createUser,
  validateUser,
  ensureAdminSeed,
};


