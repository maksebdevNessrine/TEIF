import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DocumentCategorySchema } from './DocumentCategorySchema';

export const NestedEnumDocumentCategoryFilterSchema: z.ZodType<Prisma.NestedEnumDocumentCategoryFilter> = z.object({
  equals: z.lazy(() => DocumentCategorySchema).optional(),
  in: z.lazy(() => DocumentCategorySchema).array().optional(),
  notIn: z.lazy(() => DocumentCategorySchema).array().optional(),
  not: z.union([ z.lazy(() => DocumentCategorySchema), z.lazy(() => NestedEnumDocumentCategoryFilterSchema) ]).optional(),
}).strict();

export default NestedEnumDocumentCategoryFilterSchema;
