import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SignatureAuditWhereInputSchema } from '../inputTypeSchemas/SignatureAuditWhereInputSchema'
import { SignatureAuditOrderByWithRelationInputSchema } from '../inputTypeSchemas/SignatureAuditOrderByWithRelationInputSchema'
import { SignatureAuditWhereUniqueInputSchema } from '../inputTypeSchemas/SignatureAuditWhereUniqueInputSchema'
import { SignatureAuditScalarFieldEnumSchema } from '../inputTypeSchemas/SignatureAuditScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SignatureAuditSelectSchema: z.ZodType<Prisma.SignatureAuditSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  action: z.boolean().optional(),
  invoiceId: z.boolean().optional(),
  documentNumber: z.boolean().optional(),
  status: z.boolean().optional(),
  errorMessage: z.boolean().optional(),
  certificateUsed: z.boolean().optional(),
  ipAddress: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  createdAt: z.boolean().optional(),
}).strict()

export const SignatureAuditFindManyArgsSchema: z.ZodType<Prisma.SignatureAuditFindManyArgs> = z.object({
  select: SignatureAuditSelectSchema.optional(),
  where: SignatureAuditWhereInputSchema.optional(), 
  orderBy: z.union([ SignatureAuditOrderByWithRelationInputSchema.array(), SignatureAuditOrderByWithRelationInputSchema ]).optional(),
  cursor: SignatureAuditWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SignatureAuditScalarFieldEnumSchema, SignatureAuditScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export default SignatureAuditFindManyArgsSchema;
