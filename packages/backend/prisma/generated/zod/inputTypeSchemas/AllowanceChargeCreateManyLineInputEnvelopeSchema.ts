import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AllowanceChargeCreateManyLineInputSchema } from './AllowanceChargeCreateManyLineInputSchema';

export const AllowanceChargeCreateManyLineInputEnvelopeSchema: z.ZodType<Prisma.AllowanceChargeCreateManyLineInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AllowanceChargeCreateManyLineInputSchema), z.lazy(() => AllowanceChargeCreateManyLineInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default AllowanceChargeCreateManyLineInputEnvelopeSchema;
