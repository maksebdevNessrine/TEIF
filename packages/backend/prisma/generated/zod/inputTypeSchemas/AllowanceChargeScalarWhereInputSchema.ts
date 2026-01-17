import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const AllowanceChargeScalarWhereInputSchema: z.ZodType<Prisma.AllowanceChargeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AllowanceChargeScalarWhereInputSchema), z.lazy(() => AllowanceChargeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AllowanceChargeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AllowanceChargeScalarWhereInputSchema), z.lazy(() => AllowanceChargeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  basedOn: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  invoiceId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  lineId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
}).strict();

export default AllowanceChargeScalarWhereInputSchema;
