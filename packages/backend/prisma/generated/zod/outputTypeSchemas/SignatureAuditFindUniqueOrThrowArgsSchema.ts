import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SignatureAuditWhereUniqueInputSchema } from '../inputTypeSchemas/SignatureAuditWhereUniqueInputSchema'
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

export const SignatureAuditFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SignatureAuditFindUniqueOrThrowArgs> = z.object({
  select: SignatureAuditSelectSchema.optional(),
  where: SignatureAuditWhereUniqueInputSchema, 
}).strict();

export default SignatureAuditFindUniqueOrThrowArgsSchema;
