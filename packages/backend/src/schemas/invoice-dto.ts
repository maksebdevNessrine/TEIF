/**
 * Invoice Input DTO Schemas
 * 
 * Standalone Zod schema (not extending auto-generated Prisma schema)
 * because the auto-generated schema is a ZodType without .omit()/.extend() methods.
 * This keeps the schema maintainable and simple.
 */

import { z } from 'zod';

/**
 * API Input Schema for creating invoices
 */
export const InvoiceCreateApiSchema = z.object({
  // Basic invoice fields
  documentType: z.string(),
  documentNumber: z.string().default(''),
  invoiceNumber: z.string().optional(),
  orderReference: z.string().optional(),
  currency: z.string().optional(),
  paymentMeans: z.string().default(''),

  // Operational fields
  operationNature: z.string().default(''),
  ttnReference: z.string().optional(),

  // Financial fields
  globalDiscount: z.number().default(0),
  stampDuty: z.number().default(0),
  ircRate: z.number().optional(),

  // Date fields: transform Date objects to ISO strings
  invoiceDate: z.any().transform((val) => {
    if (val instanceof Date) return val.toISOString();
    if (typeof val === 'string' && val) return val;
    return new Date().toISOString(); // Default to today if not provided
  }).default(new Date().toISOString()),
  dueDate: z.any().transform((val) => {
    if (val instanceof Date) return val.toISOString();
    if (typeof val === 'string') return val;
    return undefined;
  }).optional(),
  deliveryDate: z.any().transform((val) => {
    if (val instanceof Date) return val.toISOString();
    if (typeof val === 'string') return val;
    return undefined;
  }).optional(),
  paymentDate: z.any().transform((val) => {
    if (val instanceof Date) return val.toISOString();
    if (typeof val === 'string') return val;
    return undefined;
  }).optional(),
  otherDate: z.any().transform((val) => {
    if (val instanceof Date) return val.toISOString();
    if (typeof val === 'string') return val;
    return undefined;
  }).optional(),

  // Partner objects - cast to IdType enum (backend will validate)
  supplier: z.object({
    idType: z.string(), // Will be cast to IdType at service level
    idValue: z.string(),
    name: z.string(),
    addressDescription: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }), // Required

  buyer: z.object({
    idType: z.string(), // Will be cast to IdType at service level
    idValue: z.string(),
    name: z.string(),
    addressDescription: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }), // Required

  // Invoice lines in frontend format
  lines: z.array(
    z.object({
      id: z.string().optional(), // Client-provided line ID for mapping
      description: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      discount: z.number().optional(),
      discountRate: z.number().optional(),
      taxPercentage: z.number().optional(),
      taxRate: z.number().optional(),
      fodec: z.boolean().optional(),
      itemCode: z.string().optional(),
      unit: z.string().optional(),
      exemptionReason: z.string().optional(),
      allowances: z.array(z.object({
        type: z.string(),
        code: z.string().optional(),
        description: z.string().optional(),
        amount: z.number(),
      })).optional(),
    })
  ).optional(),

  // Invoice-level allowances/charges
  allowances: z.array(
    z.object({
      type: z.string(),
      code: z.string().optional(),
      description: z.string().optional(),
      amount: z.number(),
      basedOn: z.enum(['invoice', 'line']).optional(),
    })
  ).optional(),

  // XML content
  xmlContent: z.string().optional(),
});


export type InvoiceCreateApiDto = z.infer<typeof InvoiceCreateApiSchema>;

/**
 * Update invoice schema (partial)
 */
export const InvoiceUpdateApiSchema = InvoiceCreateApiSchema.partial();

export type InvoiceUpdateApiDto = z.infer<typeof InvoiceUpdateApiSchema>;
