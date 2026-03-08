import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DocumentCategorySchema } from './DocumentCategorySchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumDocumentCategoryFilterSchema } from './NestedEnumDocumentCategoryFilterSchema';

export const NestedEnumDocumentCategoryWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDocumentCategoryWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DocumentCategorySchema).optional(),
  in: z.lazy(() => DocumentCategorySchema).array().optional(),
  notIn: z.lazy(() => DocumentCategorySchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentCategorySchema), z.lazy(() => NestedEnumDocumentCategoryWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDocumentCategoryFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDocumentCategoryFilterSchema).optional(),
}).strict();

export default NestedEnumDocumentCategoryWithAggregatesFilterSchema;
