import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { InvoiceListRelationFilterSchema } from './InvoiceListRelationFilterSchema';

export const PartnerWhereInputSchema: z.ZodType<Prisma.PartnerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PartnerWhereInputSchema), z.lazy(() => PartnerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PartnerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PartnerWhereInputSchema), z.lazy(() => PartnerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
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
}).strict();

export default PartnerWhereInputSchema;
