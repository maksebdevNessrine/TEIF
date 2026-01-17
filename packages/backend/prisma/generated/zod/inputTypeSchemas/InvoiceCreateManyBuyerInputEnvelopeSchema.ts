import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateManyBuyerInputSchema } from './InvoiceCreateManyBuyerInputSchema';

export const InvoiceCreateManyBuyerInputEnvelopeSchema: z.ZodType<Prisma.InvoiceCreateManyBuyerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvoiceCreateManyBuyerInputSchema), z.lazy(() => InvoiceCreateManyBuyerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default InvoiceCreateManyBuyerInputEnvelopeSchema;
