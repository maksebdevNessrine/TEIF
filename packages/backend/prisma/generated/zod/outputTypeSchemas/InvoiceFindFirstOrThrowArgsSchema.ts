import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvoiceIncludeSchema } from '../inputTypeSchemas/InvoiceIncludeSchema'
import { InvoiceWhereInputSchema } from '../inputTypeSchemas/InvoiceWhereInputSchema'
import { InvoiceOrderByWithRelationInputSchema } from '../inputTypeSchemas/InvoiceOrderByWithRelationInputSchema'
import { InvoiceWhereUniqueInputSchema } from '../inputTypeSchemas/InvoiceWhereUniqueInputSchema'
import { InvoiceScalarFieldEnumSchema } from '../inputTypeSchemas/InvoiceScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { PartnerArgsSchema } from "../outputTypeSchemas/PartnerArgsSchema"
import { InvoiceLineFindManyArgsSchema } from "../outputTypeSchemas/InvoiceLineFindManyArgsSchema"
import { AllowanceChargeFindManyArgsSchema } from "../outputTypeSchemas/AllowanceChargeFindManyArgsSchema"
import { InvoiceCountOutputTypeArgsSchema } from "../outputTypeSchemas/InvoiceCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const InvoiceSelectSchema: z.ZodType<Prisma.InvoiceSelect> = z.object({
  id: z.boolean().optional(),
  documentType: z.boolean().optional(),
  documentNumber: z.boolean().optional(),
  invoiceDate: z.boolean().optional(),
  dueDate: z.boolean().optional(),
  deliveryDate: z.boolean().optional(),
  dispatchDate: z.boolean().optional(),
  paymentDate: z.boolean().optional(),
  signatureDate: z.boolean().optional(),
  otherDate: z.boolean().optional(),
  periodStart: z.boolean().optional(),
  periodEnd: z.boolean().optional(),
  operationNature: z.boolean().optional(),
  currency: z.boolean().optional(),
  orderReference: z.boolean().optional(),
  contractReference: z.boolean().optional(),
  deliveryNoteReference: z.boolean().optional(),
  userId: z.boolean().optional(),
  supplierId: z.boolean().optional(),
  buyerId: z.boolean().optional(),
  globalDiscount: z.boolean().optional(),
  stampDuty: z.boolean().optional(),
  ttnReference: z.boolean().optional(),
  paymentMeans: z.boolean().optional(),
  bankName: z.boolean().optional(),
  bankCode: z.boolean().optional(),
  bankRib: z.boolean().optional(),
  bankAccountOwner: z.boolean().optional(),
  checkNumber: z.boolean().optional(),
  cardType: z.boolean().optional(),
  cardLast4: z.boolean().optional(),
  cardReference: z.boolean().optional(),
  postalAccountNumber: z.boolean().optional(),
  postalAccountOwner: z.boolean().optional(),
  postalBranchCode: z.boolean().optional(),
  postalServiceName: z.boolean().optional(),
  ePaymentGateway: z.boolean().optional(),
  ePaymentTransactionId: z.boolean().optional(),
  otherPaymentDescription: z.boolean().optional(),
  otherPaymentReference: z.boolean().optional(),
  ircRate: z.boolean().optional(),
  ircAmount: z.boolean().optional(),
  ircExemptionReason: z.boolean().optional(),
  qrCodeEnabled: z.boolean().optional(),
  qrCodeContent: z.boolean().optional(),
  amountDescriptionOverride: z.boolean().optional(),
  xmlContent: z.boolean().optional(),
  status: z.boolean().optional(),
  totalHT: z.boolean().optional(),
  totalTVA: z.boolean().optional(),
  totalTTC: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  supplier: z.union([z.boolean(),z.lazy(() => PartnerArgsSchema)]).optional(),
  buyer: z.union([z.boolean(),z.lazy(() => PartnerArgsSchema)]).optional(),
  lines: z.union([z.boolean(),z.lazy(() => InvoiceLineFindManyArgsSchema)]).optional(),
  allowances: z.union([z.boolean(),z.lazy(() => AllowanceChargeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InvoiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const InvoiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InvoiceFindFirstOrThrowArgs> = z.object({
  select: InvoiceSelectSchema.optional(),
  include: z.lazy(() => InvoiceIncludeSchema).optional(),
  where: InvoiceWhereInputSchema.optional(), 
  orderBy: z.union([ InvoiceOrderByWithRelationInputSchema.array(), InvoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: InvoiceWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvoiceScalarFieldEnumSchema, InvoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export default InvoiceFindFirstOrThrowArgsSchema;
