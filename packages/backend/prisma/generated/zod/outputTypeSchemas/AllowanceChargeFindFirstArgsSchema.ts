import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AllowanceChargeIncludeSchema } from '../inputTypeSchemas/AllowanceChargeIncludeSchema'
import { AllowanceChargeWhereInputSchema } from '../inputTypeSchemas/AllowanceChargeWhereInputSchema'
import { AllowanceChargeOrderByWithRelationInputSchema } from '../inputTypeSchemas/AllowanceChargeOrderByWithRelationInputSchema'
import { AllowanceChargeWhereUniqueInputSchema } from '../inputTypeSchemas/AllowanceChargeWhereUniqueInputSchema'
import { AllowanceChargeScalarFieldEnumSchema } from '../inputTypeSchemas/AllowanceChargeScalarFieldEnumSchema'
import { InvoiceArgsSchema } from "../outputTypeSchemas/InvoiceArgsSchema"
import { InvoiceLineArgsSchema } from "../outputTypeSchemas/InvoiceLineArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AllowanceChargeSelectSchema: z.ZodType<Prisma.AllowanceChargeSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  code: z.boolean().optional(),
  description: z.boolean().optional(),
  amount: z.boolean().optional(),
  basedOn: z.boolean().optional(),
  invoiceId: z.boolean().optional(),
  lineId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  invoice: z.union([z.boolean(),z.lazy(() => InvoiceArgsSchema)]).optional(),
  line: z.union([z.boolean(),z.lazy(() => InvoiceLineArgsSchema)]).optional(),
}).strict()

export const AllowanceChargeFindFirstArgsSchema: z.ZodType<Prisma.AllowanceChargeFindFirstArgs> = z.object({
  select: AllowanceChargeSelectSchema.optional(),
  include: z.lazy(() => AllowanceChargeIncludeSchema).optional(),
  where: AllowanceChargeWhereInputSchema.optional(), 
  orderBy: z.union([ AllowanceChargeOrderByWithRelationInputSchema.array(), AllowanceChargeOrderByWithRelationInputSchema ]).optional(),
  cursor: AllowanceChargeWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AllowanceChargeScalarFieldEnumSchema, AllowanceChargeScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export default AllowanceChargeFindFirstArgsSchema;
