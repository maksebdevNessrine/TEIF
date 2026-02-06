import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserSignatureWhereInputSchema } from './UserSignatureWhereInputSchema';

export const UserSignatureNullableRelationFilterSchema: z.ZodType<Prisma.UserSignatureNullableRelationFilter> = z.object({
  is: z.lazy(() => UserSignatureWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserSignatureWhereInputSchema).optional().nullable(),
}).strict();

export default UserSignatureNullableRelationFilterSchema;
