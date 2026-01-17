import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AllowanceChargeIncludeSchema } from '../inputTypeSchemas/AllowanceChargeIncludeSchema'
import { AllowanceChargeWhereUniqueInputSchema } from '../inputTypeSchemas/AllowanceChargeWhereUniqueInputSchema'
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

export const AllowanceChargeFindUniqueArgsSchema: z.ZodType<Prisma.AllowanceChargeFindUniqueArgs> = z.object({
  select: AllowanceChargeSelectSchema.optional(),
  include: z.lazy(() => AllowanceChargeIncludeSchema).optional(),
  where: AllowanceChargeWhereUniqueInputSchema, 
}).strict();

export default AllowanceChargeFindUniqueArgsSchema;
