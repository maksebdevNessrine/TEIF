import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateNestedManyWithoutSupplierInputSchema } from './InvoiceCreateNestedManyWithoutSupplierInputSchema';

export const PartnerCreateWithoutBuyerInvoicesInputSchema: z.ZodType<Prisma.PartnerCreateWithoutBuyerInvoicesInput> = z.object({
  id: z.string().cuid().optional(),
  idType: z.string(),
  idValue: z.string(),
  name: z.string(),
  addressDescription: z.string().optional().nullable(),
  street: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  rc: z.string().optional().nullable(),
  capital: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  partnerType: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  supplierInvoices: z.lazy(() => InvoiceCreateNestedManyWithoutSupplierInputSchema).optional(),
}).strict();

export default PartnerCreateWithoutBuyerInvoicesInputSchema;
