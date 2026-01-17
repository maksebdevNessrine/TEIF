import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const RefreshTokenCreateManyInputSchema: z.ZodType<Prisma.RefreshTokenCreateManyInput> = z.object({
  id: z.cuid().optional(),
  userId: z.string(),
  tokenHash: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  revokedAt: z.coerce.date().optional().nullable(),
}).strict();

export default RefreshTokenCreateManyInputSchema;
