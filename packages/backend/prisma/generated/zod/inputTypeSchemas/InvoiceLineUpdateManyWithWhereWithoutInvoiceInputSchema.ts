import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineScalarWhereInputSchema } from './InvoiceLineScalarWhereInputSchema';
import { InvoiceLineUpdateManyMutationInputSchema } from './InvoiceLineUpdateManyMutationInputSchema';
import { InvoiceLineUncheckedUpdateManyWithoutInvoiceInputSchema } from './InvoiceLineUncheckedUpdateManyWithoutInvoiceInputSchema';

export const InvoiceLineUpdateManyWithWhereWithoutInvoiceInputSchema: z.ZodType<Prisma.InvoiceLineUpdateManyWithWhereWithoutInvoiceInput> = z.object({
  where: z.lazy(() => InvoiceLineScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvoiceLineUpdateManyMutationInputSchema), z.lazy(() => InvoiceLineUncheckedUpdateManyWithoutInvoiceInputSchema) ]),
}).strict();

export default InvoiceLineUpdateManyWithWhereWithoutInvoiceInputSchema;
