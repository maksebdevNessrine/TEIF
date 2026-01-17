import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceScalarWhereInputSchema } from './InvoiceScalarWhereInputSchema';
import { InvoiceUpdateManyMutationInputSchema } from './InvoiceUpdateManyMutationInputSchema';
import { InvoiceUncheckedUpdateManyWithoutBuyerInputSchema } from './InvoiceUncheckedUpdateManyWithoutBuyerInputSchema';

export const InvoiceUpdateManyWithWhereWithoutBuyerInputSchema: z.ZodType<Prisma.InvoiceUpdateManyWithWhereWithoutBuyerInput> = z.object({
  where: z.lazy(() => InvoiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvoiceUpdateManyMutationInputSchema), z.lazy(() => InvoiceUncheckedUpdateManyWithoutBuyerInputSchema) ]),
}).strict();

export default InvoiceUpdateManyWithWhereWithoutBuyerInputSchema;
