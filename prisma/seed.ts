import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.roles.createMany({
    data: [
      { role_name: 'Admin' },
      { role_name: 'Customer' },
    ],
    skipDuplicates: true, // avoids duplicate insert errors
  });
}

main()
  .then(() => {
    console.log('Seeding completed');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());