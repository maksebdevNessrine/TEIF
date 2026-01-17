import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateWithoutAllowancesInputSchema } from './InvoiceCreateWithoutAllowancesInputSchema';
import { InvoiceUncheckedCreateWithoutAllowancesInputSchema } from './InvoiceUncheckedCreateWithoutAllowancesInputSchema';
import { InvoiceCreateOrConnectWithoutAllowancesInputSchema } from './InvoiceCreateOrConnectWithoutAllowancesInputSchema';
import { InvoiceUpsertWithoutAllowancesInputSchema } from './InvoiceUpsertWithoutAllowancesInputSchema';
import { InvoiceWhereInputSchema } from './InvoiceWhereInputSchema';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceUpdateToOneWithWhereWithoutAllowancesInputSchema } from './InvoiceUpdateToOneWithWhereWithoutAllowancesInputSchema';
import { InvoiceUpdateWithoutAllowancesInputSchema } from './InvoiceUpdateWithoutAllowancesInputSchema';
import { InvoiceUncheckedUpdateWithoutAllowancesInputSchema } from './InvoiceUncheckedUpdateWithoutAllowancesInputSchema';

export const InvoiceUpdateOneWithoutAllowancesNestedInputSchema: z.ZodType<Prisma.InvoiceUpdateOneWithoutAllowancesNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutAllowancesInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutAllowancesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCreateOrConnectWithoutAllowancesInputSchema).optional(),
  upsert: z.lazy(() => InvoiceUpsertWithoutAllowancesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => InvoiceWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => InvoiceWhereInputSchema) ]).optional(),
  connect: z.lazy(() => InvoiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InvoiceUpdateToOneWithWhereWithoutAllowancesInputSchema), z.lazy(() => InvoiceUpdateWithoutAllowancesInputSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutAllowancesInputSchema) ]).optional(),
}).strict();

export default InvoiceUpdateOneWithoutAllowancesNestedInputSchema;
