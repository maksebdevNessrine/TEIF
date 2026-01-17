import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceUpdateWithoutUserInputSchema } from './InvoiceUpdateWithoutUserInputSchema';
import { InvoiceUncheckedUpdateWithoutUserInputSchema } from './InvoiceUncheckedUpdateWithoutUserInputSchema';

export const InvoiceUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.InvoiceUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => InvoiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvoiceUpdateWithoutUserInputSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default InvoiceUpdateWithWhereUniqueWithoutUserInputSchema;
