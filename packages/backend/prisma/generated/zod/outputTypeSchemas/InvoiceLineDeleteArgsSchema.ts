import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceLineIncludeSchema } from '../inputTypeSchemas/InvoiceLineIncludeSchema'
import { InvoiceLineWhereUniqueInputSchema } from '../inputTypeSchemas/InvoiceLineWhereUniqueInputSchema'
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

export const InvoiceLineDeleteArgsSchema: z.ZodType<Prisma.InvoiceLineDeleteArgs> = z.object({
  select: InvoiceLineSelectSchema.optional(),
  include: z.lazy(() => InvoiceLineIncludeSchema).optional(),
  where: InvoiceLineWhereUniqueInputSchema, 
}).strict();

export default InvoiceLineDeleteArgsSchema;
