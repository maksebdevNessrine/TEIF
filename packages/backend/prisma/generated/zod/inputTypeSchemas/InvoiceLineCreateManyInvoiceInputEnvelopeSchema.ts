import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineCreateManyInvoiceInputSchema } from './InvoiceLineCreateManyInvoiceInputSchema';

export const InvoiceLineCreateManyInvoiceInputEnvelopeSchema: z.ZodType<Prisma.InvoiceLineCreateManyInvoiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvoiceLineCreateManyInvoiceInputSchema), z.lazy(() => InvoiceLineCreateManyInvoiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default InvoiceLineCreateManyInvoiceInputEnvelopeSchema;
