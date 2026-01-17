import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceUpdateWithoutBuyerInputSchema } from './InvoiceUpdateWithoutBuyerInputSchema';
import { InvoiceUncheckedUpdateWithoutBuyerInputSchema } from './InvoiceUncheckedUpdateWithoutBuyerInputSchema';

export const InvoiceUpdateWithWhereUniqueWithoutBuyerInputSchema: z.ZodType<Prisma.InvoiceUpdateWithWhereUniqueWithoutBuyerInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvoiceUpdateWithoutBuyerInputSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutBuyerInputSchema) ]),
}).strict();

export default InvoiceUpdateWithWhereUniqueWithoutBuyerInputSchema;
