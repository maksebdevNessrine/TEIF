import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { FloatNullableFilterSchema } from './FloatNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';

export const InvoiceScalarWhereInputSchema: z.ZodType<Prisma.InvoiceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvoiceScalarWhereInputSchema), z.lazy(() => InvoiceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceScalarWhereInputSchema), z.lazy(() => InvoiceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  documentType: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  documentNumber: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  invoiceDate: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  deliveryDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  dispatchDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  paymentDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  signatureDate: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  otherDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  periodStart: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  periodEnd: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  operationNature: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  currency: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  orderReference: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  contractReference: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  deliveryNoteReference: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  supplierId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  buyerId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  globalDiscount: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  stampDuty: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  ttnReference: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  paymentMeans: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  bankName: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  bankCode: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  bankRib: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  bankAccountOwner: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  checkNumber: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cardType: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cardLast4: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  cardReference: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  postalAccountNumber: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  postalAccountOwner: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  postalBranchCode: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  postalServiceName: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ePaymentGateway: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ePaymentTransactionId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  otherPaymentDescription: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  otherPaymentReference: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ircRate: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  ircAmount: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  ircExemptionReason: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  qrCodeEnabled: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  qrCodeContent: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  amountDescriptionOverride: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  amountLanguage: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  xmlContent: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  totalHT: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  totalTVA: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  totalTTC: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
}).strict();

export default InvoiceScalarWhereInputSchema;
