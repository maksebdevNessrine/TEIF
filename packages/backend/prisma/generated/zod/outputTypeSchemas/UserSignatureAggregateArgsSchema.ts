import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserSignatureWhereInputSchema } from '../inputTypeSchemas/UserSignatureWhereInputSchema'
import { UserSignatureOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserSignatureOrderByWithRelationInputSchema'
import { UserSignatureWhereUniqueInputSchema } from '../inputTypeSchemas/UserSignatureWhereUniqueInputSchema'

export const UserSignatureAggregateArgsSchema: z.ZodType<Prisma.UserSignatureAggregateArgs> = z.object({
  where: UserSignatureWhereInputSchema.optional(), 
  orderBy: z.union([ UserSignatureOrderByWithRelationInputSchema.array(), UserSignatureOrderByWithRelationInputSchema ]).optional(),
  cursor: UserSignatureWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export default UserSignatureAggregateArgsSchema;
