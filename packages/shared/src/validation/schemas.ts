/**
 * Zod Validation Schemas for TEIF Invoice
 * Runtime validation with TypeScript type inference
 */

import { z } from 'zod';
import type {
  Language,
  IdType,
  DocTypeCode,
  PaymentMeansCode,
  OperationNature,
  PartnerFunction,
  AllowanceChargeCode,
  AllowanceChargeType,
  Partner,
  AllowanceCharge,
  InvoiceLine,
  InvoiceData
} from '../types/index';

// ============================================================================
// LITERALS & ENUMS
// ============================================================================

export const languageSchema = z.enum(['ar', 'fr', 'en'] as const);

export const idTypeSchema = z.enum(['I-01', 'I-02', 'I-03', 'I-04'] as const);

export const docTypeCodeSchema = z.enum([
  'I-11',
  'I-12',
  'I-13',
  'I-14',
  'I-15',
  'I-16',
  'I-30',
  'I-31',
  'I-32',
  'I-33',
  'I-34',
  'I-50',
  'I-51'
] as const);

export const paymentMeansCodeSchema = z.enum([
  'I-114',
  'I-115',
  'I-116',
  'I-117',
  'I-118',
  'I-119',
  'I-120',
  'I-131'
] as const);

export const operationNatureSchema = z.enum(['OP-SUPPLY', 'OP-DELIVERY', 'OP-IMPORT', 'OP-EXPORT', 'OP-CASH', 'OP-RECEIPT'] as const);

export const partnerFunctionSchema = z.enum([
  'I-61',
  'I-62',
  'I-63',
  'I-64',
  'I-65',
  'I-66',
  'I-67',
  'I-68',
  'I-69'
] as const);

export const allowanceChargeCodeSchema = z.enum([
  'I-151',
  'I-152',
  'I-153',
  'I-154',
  'I-155'
] as const);

export const allowanceChargeTypeSchema = z.enum(['allowance', 'charge'] as const);

// ============================================================================
// PARTNERS & ALLOWANCES
// ============================================================================

export const partnerSchema = z.object({
  idType: idTypeSchema,
  idValue: z.string().min(1, 'ID value is required'),
  name: z.string().min(1, 'Partner name is required'),
  addressDescription: z.string().min(1, 'Address description is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  rc: z.string().optional(),
  capital: z.string().optional(),
  phone: z.string().email().or(z.string().regex(/^\+?[\d\s-()]{6,}$/)).optional(),
  email: z.string().email().optional(),
  partnerType: partnerFunctionSchema.optional()
});

export const allowanceChargeSchema = z.object({
  id: z.string(),
  type: allowanceChargeTypeSchema,
  code: allowanceChargeCodeSchema,
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
  basedOn: z.enum(['line', 'invoice']).optional(),
  lineId: z.string().optional()
});

// ============================================================================
// INVOICE LINES
// ============================================================================

export const invoiceLineSchema = z.object({
  id: z.string(),
  itemCode: z.string().min(1, 'Item code is required'),
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().positive('Quantity must be positive'),
  unit: z.string().min(1, 'Unit is required'),
  unitPrice: z.number().nonnegative('Unit price cannot be negative'),
  discountRate: z.number().min(0).max(1, 'Discount rate must be between 0 and 1 (e.g., 0.1 for 10%)'),
  taxRate: z.number().min(0).max(1, 'Tax rate must be between 0 and 1 (e.g., 0.19 for 19% VAT)'),
  fodec: z.boolean(),
  exemptionReason: z.string().optional(),
  allowances: z.array(allowanceChargeSchema).optional()
});

// ============================================================================
// INVOICE DATA
// ============================================================================

export const invoiceDataSchema = z.object({
  documentType: docTypeCodeSchema,
  documentNumber: z.string().min(1, 'Document number is required'),
  invoiceDate: z.string().min(1, 'Invoice date is required'),
  dueDate: z.string().optional(),
  deliveryDate: z.string().optional(),
  dispatchDate: z.string().optional(),
  paymentDate: z.string().optional(),
  signatureDate: z.string().optional(),
  otherDate: z.string().optional(),
  periodStart: z.string().optional(),
  periodEnd: z.string().optional(),
  orderReference: z.string().optional(),
  contractReference: z.string().optional(),
  deliveryNoteReference: z.string().optional(),
  operationNature: operationNatureSchema,
  currency: z.string().length(3, 'Currency must be 3-letter code'),
  supplier: partnerSchema,
  buyer: partnerSchema,
  lines: z.array(invoiceLineSchema).min(1, 'At least one line is required'),
  allowances: z.array(allowanceChargeSchema).optional(),
  globalDiscount: z.number().nonnegative('Global discount must be non-negative').default(0),
  stampDuty: z.number().nonnegative('Stamp duty must be non-negative').default(0),
  ttnReference: z.string().default(''),
  paymentMeans: paymentMeansCodeSchema,
  // Wire Transfer (I-114) fields
  bankName: z.string().optional(),
  bankCode: z.string().optional(),
  bankRib: z.string().optional(),
  bankAccountOwner: z.string().optional(),
  // Check Payment (I-117) fields
  checkNumber: z.string().optional(),
  // Card Payment (I-118) fields
  cardType: z.string().optional(),
  cardLast4: z.string().optional(),
  cardReference: z.string().optional(),
  // Postal Payment (I-115) fields
  postalAccountNumber: z.string().optional(),
  postalAccountOwner: z.string().optional(),
  postalBranchCode: z.string().optional(),
  postalServiceName: z.string().optional(),
  // E-Payment (I-119) fields
  ePaymentGateway: z.string().optional(),
  ePaymentTransactionId: z.string().optional(),
  // Other Payment (I-120) fields
  otherPaymentDescription: z.string().optional(),
  otherPaymentReference: z.string().optional(),
  // General fields
  amountDescriptionOverride: z.string().optional(),
  ircRate: z.number().min(0).max(0.1, 'IRC rate must be between 0 and 0.1 (e.g., 0.01 for 1%)').optional(),
  ircAmount: z.number().nonnegative('IRC amount must be non-negative').optional(),
  ircExemptionReason: z.string().optional(),
  qrCodeEnabled: z.boolean().optional(),
  qrCodeContent: z.string().optional()
});

// ============================================================================
// INVOICE LIST QUERY PARAMETERS
// ============================================================================

export const invoiceListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  dateFrom: z.string().refine((val) => !val || /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.*)?$/.test(val), 'Invalid date format. Use YYYY-MM-DD or ISO 8601 datetime').or(z.literal('')).optional(),
  dateTo: z.string().refine((val) => !val || /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}.*)?$/.test(val), 'Invalid date format. Use YYYY-MM-DD or ISO 8601 datetime').or(z.literal('')).optional(),
  documentType: z.enum(['I-11', 'I-12', 'I-13', 'I-14', 'I-15', 'I-16']).or(z.literal('')).optional(),
  minAmount: z.coerce.number().min(0).optional(),
  maxAmount: z.coerce.number().min(0).optional(),
  status: z.enum(['draft', 'finalized', 'sent', 'paid', 'cancelled', 'voided']).or(z.literal('')).optional(),
  sortBy: z.enum(['date', 'amount', 'documentNumber']).default('date'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ============================================================================
// TYPE EXPORTS FOR TYPE INFERENCE
// ============================================================================

export type InvoiceDataType = z.infer<typeof invoiceDataSchema>;
export type PartnerType = z.infer<typeof partnerSchema>;
export type InvoiceLineType = z.infer<typeof invoiceLineSchema>;
export type AllowanceChargeSchemaType = z.infer<typeof allowanceChargeSchema>;
export type InvoiceListQueryType = z.infer<typeof invoiceListQuerySchema>;
