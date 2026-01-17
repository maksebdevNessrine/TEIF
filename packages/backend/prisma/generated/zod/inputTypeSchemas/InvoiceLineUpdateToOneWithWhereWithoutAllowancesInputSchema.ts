import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineWhereInputSchema } from './InvoiceLineWhereInputSchema';
import { InvoiceLineUpdateWithoutAllowancesInputSchema } from './InvoiceLineUpdateWithoutAllowancesInputSchema';
import { InvoiceLineUncheckedUpdateWithoutAllowancesInputSchema } from './InvoiceLineUncheckedUpdateWithoutAllowancesInputSchema';

export const InvoiceLineUpdateToOneWithWhereWithoutAllowancesInputSchema: z.ZodType<Prisma.InvoiceLineUpdateToOneWithWhereWithoutAllowancesInput> = z.object({
  where: z.lazy(() => InvoiceLineWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InvoiceLineUpdateWithoutAllowancesInputSchema), z.lazy(() => InvoiceLineUncheckedUpdateWithoutAllowancesInputSchema) ]),
}).strict();

export default InvoiceLineUpdateToOneWithWhereWithoutAllowancesInputSchema;
