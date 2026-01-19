"use strict";
/**
 * Invoice Input DTO Schemas
 *
 * Standalone Zod schema (not extending auto-generated Prisma schema)
 * because the auto-generated schema is a ZodType without .omit()/.extend() methods.
 * This keeps the schema maintainable and simple.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceUpdateApiSchema = exports.InvoiceCreateApiSchema = void 0;
const zod_1 = require("zod");
/**
 * API Input Schema for creating invoices
 */
exports.InvoiceCreateApiSchema = zod_1.z.object({
    // Basic invoice fields
    documentType: zod_1.z.string(),
    documentNumber: zod_1.z.string().default(''),
    invoiceNumber: zod_1.z.string().optional(),
    orderReference: zod_1.z.string().optional(),
    currency: zod_1.z.string().optional(),
    paymentMeans: zod_1.z.string().default(''),
    // Operational fields
    operationNature: zod_1.z.string().default(''),
    ttnReference: zod_1.z.string().optional(),
    // Financial fields
    globalDiscount: zod_1.z.number().default(0),
    stampDuty: zod_1.z.number().default(0),
    ircRate: zod_1.z.number().optional(),
    // Date fields: transform Date objects to ISO strings
    invoiceDate: zod_1.z.any().transform((val) => {
        if (val instanceof Date)
            return val.toISOString();
        if (typeof val === 'string' && val)
            return val;
        return new Date().toISOString(); // Default to today if not provided
    }).default(new Date().toISOString()),
    dueDate: zod_1.z.any().transform((val) => {
        if (val instanceof Date)
            return val.toISOString();
        if (typeof val === 'string')
            return val;
        return undefined;
    }).optional(),
    deliveryDate: zod_1.z.any().transform((val) => {
        if (val instanceof Date)
            return val.toISOString();
        if (typeof val === 'string')
            return val;
        return undefined;
    }).optional(),
    paymentDate: zod_1.z.any().transform((val) => {
        if (val instanceof Date)
            return val.toISOString();
        if (typeof val === 'string')
            return val;
        return undefined;
    }).optional(),
    otherDate: zod_1.z.any().transform((val) => {
        if (val instanceof Date)
            return val.toISOString();
        if (typeof val === 'string')
            return val;
        return undefined;
    }).optional(),
    // Partner objects - cast to IdType enum (backend will validate)
    supplier: zod_1.z.object({
        idType: zod_1.z.string(), // Will be cast to IdType at service level
        idValue: zod_1.z.string(),
        name: zod_1.z.string(),
        addressDescription: zod_1.z.string().optional(),
        street: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        postalCode: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
    }), // Required
    buyer: zod_1.z.object({
        idType: zod_1.z.string(), // Will be cast to IdType at service level
        idValue: zod_1.z.string(),
        name: zod_1.z.string(),
        addressDescription: zod_1.z.string().optional(),
        street: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        postalCode: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
    }), // Required
    // Invoice lines in frontend format
    lines: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().optional(), // Client-provided line ID for mapping
        description: zod_1.z.string(),
        quantity: zod_1.z.number(),
        unitPrice: zod_1.z.number(),
        discount: zod_1.z.number().optional(),
        discountRate: zod_1.z.number().optional(),
        taxPercentage: zod_1.z.number().optional(),
        taxRate: zod_1.z.number().optional(),
        fodec: zod_1.z.boolean().optional(),
        itemCode: zod_1.z.string().optional(),
        unit: zod_1.z.string().optional(),
        exemptionReason: zod_1.z.string().optional(),
        allowances: zod_1.z.array(zod_1.z.object({
            type: zod_1.z.string(),
            code: zod_1.z.string().optional(),
            description: zod_1.z.string().optional(),
            amount: zod_1.z.number(),
        })).optional(),
    })).optional(),
    // Invoice-level allowances/charges
    allowances: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.string(),
        code: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        amount: zod_1.z.number(),
        basedOn: zod_1.z.enum(['invoice', 'line']).optional(),
    })).optional(),
    // XML content
    xmlContent: zod_1.z.string().optional(),
});
/**
 * Update invoice schema (partial)
 */
exports.InvoiceUpdateApiSchema = exports.InvoiceCreateApiSchema.partial();
