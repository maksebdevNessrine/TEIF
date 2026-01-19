import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RefreshTokenWhereInputSchema } from './RefreshTokenWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const RefreshTokenWhereUniqueInputSchema: z.ZodType<Prisma.RefreshTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    tokenHash: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    tokenHash: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  tokenHash: z.string().optional(),
  AND: z.union([ z.lazy(() => RefreshTokenWhereInputSchema), z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokenWhereInputSchema), z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  revokedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export default RefreshTokenWhereUniqueInputSchema;
