const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@jobnexus.com' },
    update: {},
    create: {
      email: 'admin@jobnexus.com',
      name: 'Admin User',
      password: '$2a$10$X7.1/2.3.4.5.6.7.8.9.0', // Placeholder hash
      role: 'ADMIN',
    },
  });

  // Create Jobs
  const job1 = await prisma.jobVacancy.create({
    data: {
      title: 'Senior Frontend Engineer',
      company: 'TechCorp',
      location: 'Remote',
      description: 'Lead frontend development using React and TypeScript. We are looking for an experienced Senior Frontend Engineer to build scalable web applications.',
      requirements: '5+ years React, TypeScript expert, Tailwind CSS, Performance optimization',
      salary: '$120k - $160k',
      createdBy: admin.id,
      status: 'ACTIVE'
    },
  });

  const job2 = await prisma.jobVacancy.create({
    data: {
      title: 'Product Manager',
      company: 'Innovate Inc',
      location: 'New York, NY',
      description: 'Drive product vision and strategy for our core platform.',
      requirements: '4+ years PM experience, Agile methodology, Data-driven decision making',
      salary: '$130k - $170k',
      createdBy: admin.id,
      status: 'ACTIVE'
    },
  });

  console.log({ admin, job1, job2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });