import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserSignatureWhereInputSchema } from '../inputTypeSchemas/UserSignatureWhereInputSchema'

export const UserSignatureDeleteManyArgsSchema: z.ZodType<Prisma.UserSignatureDeleteManyArgs> = z.object({
  where: UserSignatureWhereInputSchema.optional(), 
}).strict();

export default UserSignatureDeleteManyArgsSchema;
