import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  prisma.challenge.deleteMany;
  await prisma.challenge.createMany({
    data: [
      {
        title: 'Sum of Two Numbers',
        description: 'Return the sum of two integers.',
        topic: 'Math',
        difficulty: 'EASY',
        solution: '7',
      },
      {
        title: 'Find Max',
        description: 'Given an array, return the maximum number.',
        topic: 'Arrays',
        difficulty: 'MEDIUM',
        solution: '91',
      },
      {
        title: 'Palindrome Check',
        description: 'Return true if a string is a palindrome.',
        topic: 'Strings',
        difficulty: 'HARD',
        solution: 'true',
      },
    ],
  });
}

main().then(() => {
  console.log('Seeded challenges');
  prisma.$disconnect();
});
