import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceLineCreateWithoutAllowancesInputSchema } from './InvoiceLineCreateWithoutAllowancesInputSchema';
import { InvoiceLineUncheckedCreateWithoutAllowancesInputSchema } from './InvoiceLineUncheckedCreateWithoutAllowancesInputSchema';
import { InvoiceLineCreateOrConnectWithoutAllowancesInputSchema } from './InvoiceLineCreateOrConnectWithoutAllowancesInputSchema';
import { InvoiceLineUpsertWithoutAllowancesInputSchema } from './InvoiceLineUpsertWithoutAllowancesInputSchema';
import { InvoiceLineWhereInputSchema } from './InvoiceLineWhereInputSchema';
import { InvoiceLineWhereUniqueInputSchema } from './InvoiceLineWhereUniqueInputSchema';
import { InvoiceLineUpdateToOneWithWhereWithoutAllowancesInputSchema } from './InvoiceLineUpdateToOneWithWhereWithoutAllowancesInputSchema';
import { InvoiceLineUpdateWithoutAllowancesInputSchema } from './InvoiceLineUpdateWithoutAllowancesInputSchema';
import { InvoiceLineUncheckedUpdateWithoutAllowancesInputSchema } from './InvoiceLineUncheckedUpdateWithoutAllowancesInputSchema';

export const InvoiceLineUpdateOneWithoutAllowancesNestedInputSchema: z.ZodType<Prisma.InvoiceLineUpdateOneWithoutAllowancesNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceLineCreateWithoutAllowancesInputSchema), z.lazy(() => InvoiceLineUncheckedCreateWithoutAllowancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoiceLineCreateOrConnectWithoutAllowancesInputSchema).optional(),
  upsert: z.lazy(() => InvoiceLineUpsertWithoutAllowancesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => InvoiceLineWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => InvoiceLineWhereInputSchema) ]).optional(),
  connect: z.lazy(() => InvoiceLineWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InvoiceLineUpdateToOneWithWhereWithoutAllowancesInputSchema), z.lazy(() => InvoiceLineUpdateWithoutAllowancesInputSchema), z.lazy(() => InvoiceLineUncheckedUpdateWithoutAllowancesInputSchema) ]).optional(),
}).strict();

export default InvoiceLineUpdateOneWithoutAllowancesNestedInputSchema;
