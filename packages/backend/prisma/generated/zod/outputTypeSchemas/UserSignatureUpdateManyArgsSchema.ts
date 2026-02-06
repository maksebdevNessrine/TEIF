import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserSignatureUpdateManyMutationInputSchema } from '../inputTypeSchemas/UserSignatureUpdateManyMutationInputSchema'
import { UserSignatureUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/UserSignatureUncheckedUpdateManyInputSchema'
import { UserSignatureWhereInputSchema } from '../inputTypeSchemas/UserSignatureWhereInputSchema'

export const UserSignatureUpdateManyArgsSchema: z.ZodType<Prisma.UserSignatureUpdateManyArgs> = z.object({
  data: z.union([ UserSignatureUpdateManyMutationInputSchema, UserSignatureUncheckedUpdateManyInputSchema ]),
  where: UserSignatureWhereInputSchema.optional(), 
}).strict();

export default UserSignatureUpdateManyArgsSchema;
