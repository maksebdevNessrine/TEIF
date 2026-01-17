import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceLineSelectSchema } from '../inputTypeSchemas/InvoiceLineSelectSchema';
import { InvoiceLineIncludeSchema } from '../inputTypeSchemas/InvoiceLineIncludeSchema';

export const InvoiceLineArgsSchema: z.ZodType<Prisma.InvoiceLineDefaultArgs> = z.object({
  select: z.lazy(() => InvoiceLineSelectSchema).optional(),
  include: z.lazy(() => InvoiceLineIncludeSchema).optional(),
}).strict();

export default InvoiceLineArgsSchema;
