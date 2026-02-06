import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutRefreshTokensInputSchema } from './UserCreateNestedOneWithoutRefreshTokensInputSchema';

export const RefreshTokenCreateInputSchema: z.ZodType<Prisma.RefreshTokenCreateInput> = z.object({
  id: z.cuid().optional(),
  tokenHash: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  revokedAt: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutRefreshTokensInputSchema),
}).strict();

export default RefreshTokenCreateInputSchema;
