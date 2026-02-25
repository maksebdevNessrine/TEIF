import { PrismaClient, Prisma } from "@prisma/client";
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log("\u2705 Database connected successfully");
  } catch (error) {
    console.error("\u274C Database connection failed:", error);
    throw error;
  }
}
async function disconnectDatabase() {
  await prisma.$disconnect();
}
export {
  Prisma,
  connectDatabase,
  disconnectDatabase,
  prisma
};
