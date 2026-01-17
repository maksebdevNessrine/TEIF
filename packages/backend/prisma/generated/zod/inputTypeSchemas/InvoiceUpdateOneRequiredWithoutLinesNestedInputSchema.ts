import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateWithoutLinesInputSchema } from './InvoiceCreateWithoutLinesInputSchema';
import { InvoiceUncheckedCreateWithoutLinesInputSchema } from './InvoiceUncheckedCreateWithoutLinesInputSchema';
import { InvoiceCreateOrConnectWithoutLinesInputSchema } from './InvoiceCreateOrConnectWithoutLinesInputSchema';
import { InvoiceUpsertWithoutLinesInputSchema } from './InvoiceUpsertWithoutLinesInputSchema';
import { InvoiceWhereUniqueInputSchema } from './InvoiceWhereUniqueInputSchema';
import { InvoiceUpdateToOneWithWhereWithoutLinesInputSchema } from './InvoiceUpdateToOneWithWhereWithoutLinesInputSchema';
import { InvoiceUpdateWithoutLinesInputSchema } from './InvoiceUpdateWithoutLinesInputSchema';
import { InvoiceUncheckedUpdateWithoutLinesInputSchema } from './InvoiceUncheckedUpdateWithoutLinesInputSchema';

export const InvoiceUpdateOneRequiredWithoutLinesNestedInputSchema: z.ZodType<Prisma.InvoiceUpdateOneRequiredWithoutLinesNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvoiceCreateWithoutLinesInputSchema), z.lazy(() => InvoiceUncheckedCreateWithoutLinesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InvoiceCreateOrConnectWithoutLinesInputSchema).optional(),
  upsert: z.lazy(() => InvoiceUpsertWithoutLinesInputSchema).optional(),
  connect: z.lazy(() => InvoiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InvoiceUpdateToOneWithWhereWithoutLinesInputSchema), z.lazy(() => InvoiceUpdateWithoutLinesInputSchema), z.lazy(() => InvoiceUncheckedUpdateWithoutLinesInputSchema) ]).optional(),
}).strict();

export default InvoiceUpdateOneRequiredWithoutLinesNestedInputSchema;
