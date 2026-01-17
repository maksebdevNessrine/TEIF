import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { InvoiceRelationFilterSchema } from './InvoiceRelationFilterSchema';
import { InvoiceWhereInputSchema } from './InvoiceWhereInputSchema';
import { AllowanceChargeListRelationFilterSchema } from './AllowanceChargeListRelationFilterSchema';

export const InvoiceLineWhereInputSchema: z.ZodType<Prisma.InvoiceLineWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvoiceLineWhereInputSchema), z.lazy(() => InvoiceLineWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceLineWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceLineWhereInputSchema), z.lazy(() => InvoiceLineWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  invoiceId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  itemCode: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  unitPrice: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  discountRate: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  taxRate: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  fodec: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  exemptionReason: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  lineAmount: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  taxAmount: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  totalAmount: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  invoice: z.union([ z.lazy(() => InvoiceRelationFilterSchema), z.lazy(() => InvoiceWhereInputSchema) ]).optional(),
  allowances: z.lazy(() => AllowanceChargeListRelationFilterSchema).optional(),
}).strict();

export default InvoiceLineWhereInputSchema;
