import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    console.log(`\n📊 Total users in database: ${users.length}\n`);
    
    if (users.length === 0) {
      console.log('❌ No users found in database');
      console.log('   You need to register a new user first.\n');
    } else {
      console.log('📋 Users:');
      users.forEach((user, i) => {
        console.log(`\n${i + 1}. ${user.name || '(no name)'}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Verified: ${user.emailVerified ? '✅' : '❌'}`);
        console.log(`   Created: ${user.createdAt.toISOString()}`);
      });
    }
  } catch (error) {
    console.error('❌ Error querying database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
