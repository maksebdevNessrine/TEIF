// Prisma expects a seed file at `prisma/seed.ts`.
// We keep the real seed logic in `src/scripts/seed.ts` (built to `dist/scripts/seed.js`).
// This bridge supports both local dev (tsx/TS) and prod (built JS).

let seedDatabase: () => Promise<void>;

try {
  // In production image, the compiled JS exists at dist/scripts/seed.js
  ({ seedDatabase } = await import('../src/scripts/seed.js'));
} catch {
  // In local dev, tsx will resolve the TS file directly
  ({ seedDatabase } = await import('../src/scripts/seed.ts'));
}

await seedDatabase();
