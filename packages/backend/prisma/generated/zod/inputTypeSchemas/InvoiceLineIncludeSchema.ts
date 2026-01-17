import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceArgsSchema } from "../outputTypeSchemas/InvoiceArgsSchema"
import { AllowanceChargeFindManyArgsSchema } from "../outputTypeSchemas/AllowanceChargeFindManyArgsSchema"
import { InvoiceLineCountOutputTypeArgsSchema } from "../outputTypeSchemas/InvoiceLineCountOutputTypeArgsSchema"

export const InvoiceLineIncludeSchema: z.ZodType<Prisma.InvoiceLineInclude> = z.object({
  invoice: z.union([z.boolean(),z.lazy(() => InvoiceArgsSchema)]).optional(),
  allowances: z.union([z.boolean(),z.lazy(() => AllowanceChargeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InvoiceLineCountOutputTypeArgsSchema)]).optional(),
}).strict();

export default InvoiceLineIncludeSchema;
