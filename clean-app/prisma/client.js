const fs = require('fs');
const path = require('path');

if (!process.env.DATABASE_URL) {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^DATABASE_URL=(.+)$/);
      if (match) {
        process.env.DATABASE_URL = match[1].trim();
        break;
      }
    }
  }
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'file:./db.sqlite';
  }
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;

