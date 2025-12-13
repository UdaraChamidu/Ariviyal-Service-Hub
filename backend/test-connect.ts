import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  console.log('Keys on instance:', Object.keys(prisma));
  console.log('Has $connect:', '$connect' in prisma);
  console.log('Type of $connect:', typeof (prisma as any).$connect);
  
  try {
    if ((prisma as any).$connect) {
      console.log('Calling $connect...');
      // await prisma.$connect(); // Don't actually connect, just check existence
      console.log('Call successful (mock)');
    } else {
      console.error('$connect is missing!');
    }
  } catch (e) {
    console.error(e);
  }
}

main();
