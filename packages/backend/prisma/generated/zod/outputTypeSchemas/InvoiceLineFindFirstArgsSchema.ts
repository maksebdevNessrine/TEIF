import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceLineIncludeSchema } from '../inputTypeSchemas/InvoiceLineIncludeSchema'
import { InvoiceLineWhereInputSchema } from '../inputTypeSchemas/InvoiceLineWhereInputSchema'
import { InvoiceLineOrderByWithRelationInputSchema } from '../inputTypeSchemas/InvoiceLineOrderByWithRelationInputSchema'
import { InvoiceLineWhereUniqueInputSchema } from '../inputTypeSchemas/InvoiceLineWhereUniqueInputSchema'
import { InvoiceLineScalarFieldEnumSchema } from '../inputTypeSchemas/InvoiceLineScalarFieldEnumSchema'
import { InvoiceArgsSchema } from "../outputTypeSchemas/InvoiceArgsSchema"
import { AllowanceChargeFindManyArgsSchema } from "../outputTypeSchemas/AllowanceChargeFindManyArgsSchema"
import { InvoiceLineCountOutputTypeArgsSchema } from "../outputTypeSchemas/InvoiceLineCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const InvoiceLineSelectSchema: z.ZodType<Prisma.InvoiceLineSelect> = z.object({
  id: z.boolean().optional(),
  invoiceId: z.boolean().optional(),
  itemCode: z.boolean().optional(),
  description: z.boolean().optional(),
  quantity: z.boolean().optional(),
  unit: z.boolean().optional(),
  unitPrice: z.boolean().optional(),
  discountRate: z.boolean().optional(),
  taxRate: z.boolean().optional(),
  fodec: z.boolean().optional(),
  exemptionReason: z.boolean().optional(),
  lineAmount: z.boolean().optional(),
  taxAmount: z.boolean().optional(),
  totalAmount: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  invoice: z.union([z.boolean(),z.lazy(() => InvoiceArgsSchema)]).optional(),
  allowances: z.union([z.boolean(),z.lazy(() => AllowanceChargeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InvoiceLineCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const InvoiceLineFindFirstArgsSchema: z.ZodType<Prisma.InvoiceLineFindFirstArgs> = z.object({
  select: InvoiceLineSelectSchema.optional(),
  include: z.lazy(() => InvoiceLineIncludeSchema).optional(),
  where: InvoiceLineWhereInputSchema.optional(), 
  orderBy: z.union([ InvoiceLineOrderByWithRelationInputSchema.array(), InvoiceLineOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceLineWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoiceLineScalarFieldEnumSchema, InvoiceLineScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export default InvoiceLineFindFirstArgsSchema;
