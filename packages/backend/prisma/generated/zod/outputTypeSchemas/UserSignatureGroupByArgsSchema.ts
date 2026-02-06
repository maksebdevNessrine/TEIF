import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserSignatureWhereInputSchema } from '../inputTypeSchemas/UserSignatureWhereInputSchema'
import { UserSignatureOrderByWithAggregationInputSchema } from '../inputTypeSchemas/UserSignatureOrderByWithAggregationInputSchema'
import { UserSignatureScalarFieldEnumSchema } from '../inputTypeSchemas/UserSignatureScalarFieldEnumSchema'
import { UserSignatureScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/UserSignatureScalarWhereWithAggregatesInputSchema'

export const UserSignatureGroupByArgsSchema: z.ZodType<Prisma.UserSignatureGroupByArgs> = z.object({
  where: UserSignatureWhereInputSchema.optional(), 
  orderBy: z.union([ UserSignatureOrderByWithAggregationInputSchema.array(), UserSignatureOrderByWithAggregationInputSchema ]).optional(),
  by: UserSignatureScalarFieldEnumSchema.array(), 
  having: UserSignatureScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export default UserSignatureGroupByArgsSchema;
