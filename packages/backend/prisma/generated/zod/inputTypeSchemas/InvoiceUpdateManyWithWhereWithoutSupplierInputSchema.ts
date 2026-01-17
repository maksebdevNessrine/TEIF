import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceScalarWhereInputSchema } from './InvoiceScalarWhereInputSchema';
import { InvoiceUpdateManyMutationInputSchema } from './InvoiceUpdateManyMutationInputSchema';
import { InvoiceUncheckedUpdateManyWithoutSupplierInputSchema } from './InvoiceUncheckedUpdateManyWithoutSupplierInputSchema';

export const InvoiceUpdateManyWithWhereWithoutSupplierInputSchema: z.ZodType<Prisma.InvoiceUpdateManyWithWhereWithoutSupplierInput> = z.object({
  where: z.lazy(() => InvoiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvoiceUpdateManyMutationInputSchema), z.lazy(() => InvoiceUncheckedUpdateManyWithoutSupplierInputSchema) ]),
}).strict();

export default InvoiceUpdateManyWithWhereWithoutSupplierInputSchema;
