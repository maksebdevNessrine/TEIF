import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SignatureAuditWhereInputSchema } from '../inputTypeSchemas/SignatureAuditWhereInputSchema'
import { SignatureAuditOrderByWithRelationInputSchema } from '../inputTypeSchemas/SignatureAuditOrderByWithRelationInputSchema'
import { SignatureAuditWhereUniqueInputSchema } from '../inputTypeSchemas/SignatureAuditWhereUniqueInputSchema'

export const SignatureAuditAggregateArgsSchema: z.ZodType<Prisma.SignatureAuditAggregateArgs> = z.object({
  where: SignatureAuditWhereInputSchema.optional(), 
  orderBy: z.union([ SignatureAuditOrderByWithRelationInputSchema.array(), SignatureAuditOrderByWithRelationInputSchema ]).optional(),
  cursor: SignatureAuditWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export default SignatureAuditAggregateArgsSchema;
