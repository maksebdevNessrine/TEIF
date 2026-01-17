import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PartnerIncludeSchema } from '../inputTypeSchemas/PartnerIncludeSchema'
import { PartnerWhereInputSchema } from '../inputTypeSchemas/PartnerWhereInputSchema'
import { PartnerOrderByWithRelationInputSchema } from '../inputTypeSchemas/PartnerOrderByWithRelationInputSchema'
import { PartnerWhereUniqueInputSchema } from '../inputTypeSchemas/PartnerWhereUniqueInputSchema'
import { PartnerScalarFieldEnumSchema } from '../inputTypeSchemas/PartnerScalarFieldEnumSchema'
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

export const PartnerFindManyArgsSchema: z.ZodType<Prisma.PartnerFindManyArgs> = z.object({
  select: PartnerSelectSchema.optional(),
  include: z.lazy(() => PartnerIncludeSchema).optional(),
  where: PartnerWhereInputSchema.optional(), 
  orderBy: z.union([ PartnerOrderByWithRelationInputSchema.array(), PartnerOrderByWithRelationInputSchema ]).optional(),
  cursor: PartnerWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PartnerScalarFieldEnumSchema, PartnerScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export default PartnerFindManyArgsSchema;
