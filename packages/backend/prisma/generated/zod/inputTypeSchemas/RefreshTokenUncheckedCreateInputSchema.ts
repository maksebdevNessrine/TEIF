import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const RefreshTokenUncheckedCreateInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  tokenHash: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  revokedAt: z.coerce.date().optional().nullable(),
}).strict();

export default RefreshTokenUncheckedCreateInputSchema;
