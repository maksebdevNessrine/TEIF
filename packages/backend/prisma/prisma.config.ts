// Prisma 7+ configuration
// Connect URLs are now passed via PrismaClient constructor
// See: https://pris.ly/d/prisma7-client-config

import { defineConfig } from '@prisma/internals';

export default defineConfig({
  // Prisma 7+ uses datasourceUrl in PrismaClient constructor
  // instead of env in schema.prisma
});
