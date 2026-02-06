import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SignatureAuditWhereInputSchema } from '../inputTypeSchemas/SignatureAuditWhereInputSchema'
import { SignatureAuditOrderByWithAggregationInputSchema } from '../inputTypeSchemas/SignatureAuditOrderByWithAggregationInputSchema'
import { SignatureAuditScalarFieldEnumSchema } from '../inputTypeSchemas/SignatureAuditScalarFieldEnumSchema'
import { SignatureAuditScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/SignatureAuditScalarWhereWithAggregatesInputSchema'

export const SignatureAuditGroupByArgsSchema: z.ZodType<Prisma.SignatureAuditGroupByArgs> = z.object({
  where: SignatureAuditWhereInputSchema.optional(), 
  orderBy: z.union([ SignatureAuditOrderByWithAggregationInputSchema.array(), SignatureAuditOrderByWithAggregationInputSchema ]).optional(),
  by: SignatureAuditScalarFieldEnumSchema.array(), 
  having: SignatureAuditScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export default SignatureAuditGroupByArgsSchema;
