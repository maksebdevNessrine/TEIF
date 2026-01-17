import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { FloatWithAggregatesFilterSchema } from './FloatWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const InvoiceLineScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InvoiceLineScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InvoiceLineScalarWhereWithAggregatesInputSchema), z.lazy(() => InvoiceLineScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceLineScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceLineScalarWhereWithAggregatesInputSchema), z.lazy(() => InvoiceLineScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  invoiceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  itemCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  unitPrice: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  discountRate: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  taxRate: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  fodec: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  exemptionReason: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  lineAmount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  taxAmount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  totalAmount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
}).strict();

export default InvoiceLineScalarWhereWithAggregatesInputSchema;
