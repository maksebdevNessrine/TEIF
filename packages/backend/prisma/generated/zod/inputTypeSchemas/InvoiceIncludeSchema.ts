import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { PartnerArgsSchema } from "../outputTypeSchemas/PartnerArgsSchema"
import { InvoiceLineFindManyArgsSchema } from "../outputTypeSchemas/InvoiceLineFindManyArgsSchema"
import { AllowanceChargeFindManyArgsSchema } from "../outputTypeSchemas/AllowanceChargeFindManyArgsSchema"
import { InvoiceCountOutputTypeArgsSchema } from "../outputTypeSchemas/InvoiceCountOutputTypeArgsSchema"

export const InvoiceIncludeSchema: z.ZodType<Prisma.InvoiceInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  supplier: z.union([z.boolean(),z.lazy(() => PartnerArgsSchema)]).optional(),
  buyer: z.union([z.boolean(),z.lazy(() => PartnerArgsSchema)]).optional(),
  lines: z.union([z.boolean(),z.lazy(() => InvoiceLineFindManyArgsSchema)]).optional(),
  allowances: z.union([z.boolean(),z.lazy(() => AllowanceChargeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InvoiceCountOutputTypeArgsSchema)]).optional(),
}).strict();

export default InvoiceIncludeSchema;
