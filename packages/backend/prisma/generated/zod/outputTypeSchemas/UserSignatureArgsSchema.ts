import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserSignatureSelectSchema } from '../inputTypeSchemas/UserSignatureSelectSchema';
import { UserSignatureIncludeSchema } from '../inputTypeSchemas/UserSignatureIncludeSchema';

export const UserSignatureArgsSchema: z.ZodType<Prisma.UserSignatureDefaultArgs> = z.object({
  select: z.lazy(() => UserSignatureSelectSchema).optional(),
  include: z.lazy(() => UserSignatureIncludeSchema).optional(),
}).strict();

export default UserSignatureArgsSchema;
