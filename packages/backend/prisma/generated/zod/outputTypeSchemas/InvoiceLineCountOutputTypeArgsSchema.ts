import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceLineCountOutputTypeSelectSchema } from './InvoiceLineCountOutputTypeSelectSchema';

export const InvoiceLineCountOutputTypeArgsSchema: z.ZodType<Prisma.InvoiceLineCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => InvoiceLineCountOutputTypeSelectSchema).nullish(),
}).strict();

export default InvoiceLineCountOutputTypeSelectSchema;
