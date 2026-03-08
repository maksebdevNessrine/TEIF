import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DocumentCategorySchema } from './DocumentCategorySchema';

export const EnumDocumentCategoryFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDocumentCategoryFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DocumentCategorySchema).optional(),
}).strict();

export default EnumDocumentCategoryFieldUpdateOperationsInputSchema;
