import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceScalarWhereInputSchema } from './InvoiceScalarWhereInputSchema';
import { InvoiceUpdateManyMutationInputSchema } from './InvoiceUpdateManyMutationInputSchema';
import { InvoiceUncheckedUpdateManyWithoutUserInputSchema } from './InvoiceUncheckedUpdateManyWithoutUserInputSchema';

export const InvoiceUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.InvoiceUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => InvoiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvoiceUpdateManyMutationInputSchema), z.lazy(() => InvoiceUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default InvoiceUpdateManyWithWhereWithoutUserInputSchema;
