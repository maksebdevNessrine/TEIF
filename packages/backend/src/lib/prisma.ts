import { PrismaClient } from '@prisma/client';
// Import Prisma namespace for type definitions - removed 'type' to make it available at runtime
import { Prisma } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { Prisma };

// Test database connection
export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    // Don't exit - let app continue and retry
    throw error;
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}

