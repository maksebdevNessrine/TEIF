import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceWhereInputSchema } from './InvoiceWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { FloatNullableFilterSchema } from './FloatNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { PartnerRelationFilterSchema } from './PartnerRelationFilterSchema';
import { PartnerWhereInputSchema } from './PartnerWhereInputSchema';
import { InvoiceLineListRelationFilterSchema } from './InvoiceLineListRelationFilterSchema';
import { AllowanceChargeListRelationFilterSchema } from './AllowanceChargeListRelationFilterSchema';

export const InvoiceWhereUniqueInputSchema: z.ZodType<Prisma.InvoiceWhereUniqueInput> = z.union([
  z.object({
    id: z.cuid(),
    documentNumber: z.string(),
  }),
  z.object({
    id: z.cuid(),
  }),
  z.object({
    documentNumber: z.string(),
  }),
])
.and(z.object({
  id: z.cuid().optional(),
  documentNumber: z.string().optional(),
  AND: z.union([ z.lazy(() => InvoiceWhereInputSchema), z.lazy(() => InvoiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvoiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvoiceWhereInputSchema), z.lazy(() => InvoiceWhereInputSchema).array() ]).optional(),
  documentType: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
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
  xmlContent: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  totalHT: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  totalTVA: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  totalTTC: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  supplier: z.union([ z.lazy(() => PartnerRelationFilterSchema), z.lazy(() => PartnerWhereInputSchema) ]).optional(),
  buyer: z.union([ z.lazy(() => PartnerRelationFilterSchema), z.lazy(() => PartnerWhereInputSchema) ]).optional(),
  lines: z.lazy(() => InvoiceLineListRelationFilterSchema).optional(),
  allowances: z.lazy(() => AllowanceChargeListRelationFilterSchema).optional(),
}).strict());

export default InvoiceWhereUniqueInputSchema;
