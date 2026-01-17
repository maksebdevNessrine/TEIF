import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateManySupplierInputSchema } from './InvoiceCreateManySupplierInputSchema';

export const InvoiceCreateManySupplierInputEnvelopeSchema: z.ZodType<Prisma.InvoiceCreateManySupplierInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvoiceCreateManySupplierInputSchema), z.lazy(() => InvoiceCreateManySupplierInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default InvoiceCreateManySupplierInputEnvelopeSchema;
