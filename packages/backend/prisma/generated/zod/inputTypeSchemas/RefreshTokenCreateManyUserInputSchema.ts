import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const RefreshTokenCreateManyUserInputSchema: z.ZodType<Prisma.RefreshTokenCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  tokenHash: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  revokedAt: z.coerce.date().optional().nullable(),
}).strict();

export default RefreshTokenCreateManyUserInputSchema;
