import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeCreateManyInvoiceInputSchema } from './AllowanceChargeCreateManyInvoiceInputSchema';

export const AllowanceChargeCreateManyInvoiceInputEnvelopeSchema: z.ZodType<Prisma.AllowanceChargeCreateManyInvoiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AllowanceChargeCreateManyInvoiceInputSchema), z.lazy(() => AllowanceChargeCreateManyInvoiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default AllowanceChargeCreateManyInvoiceInputEnvelopeSchema;
