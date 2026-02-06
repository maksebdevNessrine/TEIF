import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeWhereInputSchema } from './AllowanceChargeWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { InvoiceNullableRelationFilterSchema } from './InvoiceNullableRelationFilterSchema';
import { InvoiceWhereInputSchema } from './InvoiceWhereInputSchema';
import { InvoiceLineNullableRelationFilterSchema } from './InvoiceLineNullableRelationFilterSchema';
import { InvoiceLineWhereInputSchema } from './InvoiceLineWhereInputSchema';

export const AllowanceChargeWhereUniqueInputSchema: z.ZodType<Prisma.AllowanceChargeWhereUniqueInput> = z.object({
  id: z.cuid(),
})
.and(z.object({
  id: z.cuid().optional(),
  AND: z.union([ z.lazy(() => AllowanceChargeWhereInputSchema), z.lazy(() => AllowanceChargeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AllowanceChargeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AllowanceChargeWhereInputSchema), z.lazy(() => AllowanceChargeWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  basedOn: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  invoiceId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  lineId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  invoice: z.union([ z.lazy(() => InvoiceNullableRelationFilterSchema), z.lazy(() => InvoiceWhereInputSchema) ]).optional().nullable(),
  line: z.union([ z.lazy(() => InvoiceLineNullableRelationFilterSchema), z.lazy(() => InvoiceLineWhereInputSchema) ]).optional().nullable(),
}).strict());

export default AllowanceChargeWhereUniqueInputSchema;
