import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceFindManyArgsSchema } from "../outputTypeSchemas/InvoiceFindManyArgsSchema"
import { PartnerCountOutputTypeArgsSchema } from "../outputTypeSchemas/PartnerCountOutputTypeArgsSchema"

export const PartnerSelectSchema: z.ZodType<Prisma.PartnerSelect> = z.object({
  id: z.boolean().optional(),
  idType: z.boolean().optional(),
  idValue: z.boolean().optional(),
  name: z.boolean().optional(),
  addressDescription: z.boolean().optional(),
  street: z.boolean().optional(),
  city: z.boolean().optional(),
  postalCode: z.boolean().optional(),
  country: z.boolean().optional(),
  rc: z.boolean().optional(),
  capital: z.boolean().optional(),
  phone: z.boolean().optional(),
  email: z.boolean().optional(),
  partnerType: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  supplierInvoices: z.union([z.boolean(),z.lazy(() => InvoiceFindManyArgsSchema)]).optional(),
  buyerInvoices: z.union([z.boolean(),z.lazy(() => InvoiceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PartnerCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default PartnerSelectSchema;
