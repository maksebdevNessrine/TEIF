import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PartnerIdTypeIdValueCompoundUniqueInputSchema } from './PartnerIdTypeIdValueCompoundUniqueInputSchema';
import { PartnerWhereInputSchema } from './PartnerWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { InvoiceListRelationFilterSchema } from './InvoiceListRelationFilterSchema';

export const PartnerWhereUniqueInputSchema: z.ZodType<Prisma.PartnerWhereUniqueInput> = z.union([
  z.object({
    id: z.cuid(),
    idType_idValue: z.lazy(() => PartnerIdTypeIdValueCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.cuid(),
  }),
  z.object({
    idType_idValue: z.lazy(() => PartnerIdTypeIdValueCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.cuid().optional(),
  idType_idValue: z.lazy(() => PartnerIdTypeIdValueCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PartnerWhereInputSchema), z.lazy(() => PartnerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PartnerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PartnerWhereInputSchema), z.lazy(() => PartnerWhereInputSchema).array() ]).optional(),
  idType: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  idValue: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  addressDescription: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  street: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  postalCode: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  rc: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  capital: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  partnerType: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  supplierInvoices: z.lazy(() => InvoiceListRelationFilterSchema).optional(),
  buyerInvoices: z.lazy(() => InvoiceListRelationFilterSchema).optional(),
}).strict());

export default PartnerWhereUniqueInputSchema;
