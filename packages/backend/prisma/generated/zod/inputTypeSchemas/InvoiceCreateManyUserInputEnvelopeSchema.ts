import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateManyUserInputSchema } from './InvoiceCreateManyUserInputSchema';

export const InvoiceCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.InvoiceCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvoiceCreateManyUserInputSchema), z.lazy(() => InvoiceCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default InvoiceCreateManyUserInputEnvelopeSchema;
