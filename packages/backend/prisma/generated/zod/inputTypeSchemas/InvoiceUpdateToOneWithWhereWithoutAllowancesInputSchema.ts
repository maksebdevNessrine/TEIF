import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereInputSchema } from './InvoiceWhereInputSchema';
import { InvoiceUpdateWithoutAllowancesInputSchema } from './InvoiceUpdateWithoutAllowancesInputSchema';
import { InvoiceUncheckedUpdateWithoutAllowancesInputSchema } from './InvoiceUncheckedUpdateWithoutAllowancesInputSchema';

export const InvoiceUpdateToOneWithWhereWithoutAllowancesInputSchema: z.ZodType<Prisma.InvoiceUpdateToOneWithWhereWithoutAllowancesInput> = z.object({
  where: z.lazy(() => InvoiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InvoiceUpdateWithoutAllowancesInputSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutAllowancesInputSchema) ]),
}).strict();

export default InvoiceUpdateToOneWithWhereWithoutAllowancesInputSchema;
