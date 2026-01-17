import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const PartnerCountOutputTypeSelectSchema: z.ZodType<Prisma.PartnerCountOutputTypeSelect> = z.object({
  supplierInvoices: z.boolean().optional(),
  buyerInvoices: z.boolean().optional(),
}).strict();

export default PartnerCountOutputTypeSelectSchema;
