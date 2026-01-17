import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PartnerIncludeSchema } from '../inputTypeSchemas/PartnerIncludeSchema'
import { PartnerWhereUniqueInputSchema } from '../inputTypeSchemas/PartnerWhereUniqueInputSchema'
import { InvoiceFindManyArgsSchema } from "../outputTypeSchemas/InvoiceFindManyArgsSchema"
import { PartnerCountOutputTypeArgsSchema } from "../outputTypeSchemas/PartnerCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

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

export const PartnerFindUniqueArgsSchema: z.ZodType<Prisma.PartnerFindUniqueArgs> = z.object({
  select: PartnerSelectSchema.optional(),
  include: z.lazy(() => PartnerIncludeSchema).optional(),
  where: PartnerWhereUniqueInputSchema, 
}).strict();

export default PartnerFindUniqueArgsSchema;
