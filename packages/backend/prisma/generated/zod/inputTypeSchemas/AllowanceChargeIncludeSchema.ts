import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceArgsSchema } from "../outputTypeSchemas/InvoiceArgsSchema"
import { InvoiceLineArgsSchema } from "../outputTypeSchemas/InvoiceLineArgsSchema"

export const AllowanceChargeIncludeSchema: z.ZodType<Prisma.AllowanceChargeInclude> = z.object({
  invoice: z.union([z.boolean(),z.lazy(() => InvoiceArgsSchema)]).optional(),
  line: z.union([z.boolean(),z.lazy(() => InvoiceLineArgsSchema)]).optional(),
}).strict();

export default AllowanceChargeIncludeSchema;
