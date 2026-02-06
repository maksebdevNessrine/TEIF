import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const RefreshTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateWithoutUserInput> = z.object({
  id: z.cuid().optional(),
  tokenHash: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  revokedAt: z.coerce.date().optional().nullable(),
}).strict();

export default RefreshTokenUncheckedCreateWithoutUserInputSchema;
