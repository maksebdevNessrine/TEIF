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
export declare const InvoiceCreateApiSchema: z.ZodObject<{
    documentType: z.ZodString;
    documentNumber: z.ZodDefault<z.ZodString>;
    invoiceNumber: z.ZodOptional<z.ZodString>;
    orderReference: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodOptional<z.ZodString>;
    paymentMeans: z.ZodDefault<z.ZodString>;
    operationNature: z.ZodDefault<z.ZodString>;
    ttnReference: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    amountLanguage: z.ZodDefault<z.ZodOptional<z.ZodEnum<["fr", "ar", "en"]>>>;
    globalDiscount: z.ZodDefault<z.ZodNumber>;
    stampDuty: z.ZodDefault<z.ZodNumber>;
    ircRate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    invoiceDate: z.ZodDefault<z.ZodEffects<z.ZodAny, string, any>>;
    dueDate: z.ZodOptional<z.ZodEffects<z.ZodAny, string | undefined, any>>;
    deliveryDate: z.ZodOptional<z.ZodEffects<z.ZodAny, string | undefined, any>>;
    paymentDate: z.ZodOptional<z.ZodEffects<z.ZodAny, string | undefined, any>>;
    otherDate: z.ZodOptional<z.ZodEffects<z.ZodAny, string | undefined, any>>;
    supplier: z.ZodObject<{
        idType: z.ZodString;
        idValue: z.ZodString;
        name: z.ZodString;
        addressDescription: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }, {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }>;
    buyer: z.ZodObject<{
        idType: z.ZodString;
        idValue: z.ZodString;
        name: z.ZodString;
        addressDescription: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }, {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }>;
    lines: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        discount: z.ZodOptional<z.ZodNumber>;
        discountRate: z.ZodOptional<z.ZodNumber>;
        taxPercentage: z.ZodOptional<z.ZodNumber>;
        taxRate: z.ZodOptional<z.ZodNumber>;
        fodec: z.ZodOptional<z.ZodBoolean>;
        itemCode: z.ZodOptional<z.ZodString>;
        unit: z.ZodOptional<z.ZodString>;
        exemptionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        allowances: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            amount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }, {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discountRate?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        exemptionReason?: string | null | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        discount?: number | undefined;
        taxPercentage?: number | undefined;
    }, {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discountRate?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        exemptionReason?: string | null | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        discount?: number | undefined;
        taxPercentage?: number | undefined;
    }>, "many">>;
    allowances: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        code: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        amount: z.ZodNumber;
        basedOn: z.ZodOptional<z.ZodEnum<["invoice", "line"]>>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        amount: number;
        code?: string | undefined;
        description?: string | undefined;
        basedOn?: "invoice" | "line" | undefined;
    }, {
        type: string;
        amount: number;
        code?: string | undefined;
        description?: string | undefined;
        basedOn?: "invoice" | "line" | undefined;
    }>, "many">>;
    xmlContent: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    documentNumber: string;
    documentType: string;
    invoiceDate: string;
    operationNature: string;
    supplier: {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    };
    buyer: {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    };
    globalDiscount: number;
    stampDuty: number;
    paymentMeans: string;
    amountLanguage: "ar" | "fr" | "en";
    allowances?: {
        type: string;
        amount: number;
        code?: string | undefined;
        description?: string | undefined;
        basedOn?: "invoice" | "line" | undefined;
    }[] | undefined;
    dueDate?: string | undefined;
    deliveryDate?: string | undefined;
    paymentDate?: string | undefined;
    otherDate?: string | undefined;
    orderReference?: string | null | undefined;
    currency?: string | undefined;
    lines?: {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discountRate?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        exemptionReason?: string | null | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        discount?: number | undefined;
        taxPercentage?: number | undefined;
    }[] | undefined;
    ttnReference?: string | null | undefined;
    ircRate?: number | null | undefined;
    xmlContent?: string | undefined;
    invoiceNumber?: string | undefined;
}, {
    documentType: string;
    supplier: {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    };
    buyer: {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    };
    documentNumber?: string | undefined;
    allowances?: {
        type: string;
        amount: number;
        code?: string | undefined;
        description?: string | undefined;
        basedOn?: "invoice" | "line" | undefined;
    }[] | undefined;
    invoiceDate?: any;
    dueDate?: any;
    deliveryDate?: any;
    paymentDate?: any;
    otherDate?: any;
    orderReference?: string | null | undefined;
    operationNature?: string | undefined;
    currency?: string | undefined;
    lines?: {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discountRate?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        exemptionReason?: string | null | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        discount?: number | undefined;
        taxPercentage?: number | undefined;
    }[] | undefined;
    globalDiscount?: number | undefined;
    stampDuty?: number | undefined;
    ttnReference?: string | null | undefined;
    paymentMeans?: string | undefined;
    ircRate?: number | null | undefined;
    xmlContent?: string | undefined;
    invoiceNumber?: string | undefined;
    amountLanguage?: "ar" | "fr" | "en" | undefined;
}>;
export type InvoiceCreateApiDto = z.infer<typeof InvoiceCreateApiSchema>;
/**
 * Update invoice schema (partial)
 */
export declare const InvoiceUpdateApiSchema: z.ZodObject<{
    documentType: z.ZodOptional<z.ZodString>;
    documentNumber: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    invoiceNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    orderReference: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    currency: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    paymentMeans: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    operationNature: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    ttnReference: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    amountLanguage: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodEnum<["fr", "ar", "en"]>>>>;
    globalDiscount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    stampDuty: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    ircRate: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    invoiceDate: z.ZodOptional<z.ZodDefault<z.ZodEffects<z.ZodAny, string, any>>>;
    dueDate: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodAny, string | undefined, any>>>;
    deliveryDate: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodAny, string | undefined, any>>>;
    paymentDate: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodAny, string | undefined, any>>>;
    otherDate: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodAny, string | undefined, any>>>;
    supplier: z.ZodOptional<z.ZodObject<{
        idType: z.ZodString;
        idValue: z.ZodString;
        name: z.ZodString;
        addressDescription: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }, {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }>>;
    buyer: z.ZodOptional<z.ZodObject<{
        idType: z.ZodString;
        idValue: z.ZodString;
        name: z.ZodString;
        addressDescription: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }, {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }>>;
    lines: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        discount: z.ZodOptional<z.ZodNumber>;
        discountRate: z.ZodOptional<z.ZodNumber>;
        taxPercentage: z.ZodOptional<z.ZodNumber>;
        taxRate: z.ZodOptional<z.ZodNumber>;
        fodec: z.ZodOptional<z.ZodBoolean>;
        itemCode: z.ZodOptional<z.ZodString>;
        unit: z.ZodOptional<z.ZodString>;
        exemptionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        allowances: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            amount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }, {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discountRate?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        exemptionReason?: string | null | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        discount?: number | undefined;
        taxPercentage?: number | undefined;
    }, {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discountRate?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        exemptionReason?: string | null | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        discount?: number | undefined;
        taxPercentage?: number | undefined;
    }>, "many">>>;
    allowances: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        code: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        amount: z.ZodNumber;
        basedOn: z.ZodOptional<z.ZodEnum<["invoice", "line"]>>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        amount: number;
        code?: string | undefined;
        description?: string | undefined;
        basedOn?: "invoice" | "line" | undefined;
    }, {
        type: string;
        amount: number;
        code?: string | undefined;
        description?: string | undefined;
        basedOn?: "invoice" | "line" | undefined;
    }>, "many">>>;
    xmlContent: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    documentNumber?: string | undefined;
    allowances?: {
        type: string;
        amount: number;
        code?: string | undefined;
        description?: string | undefined;
        basedOn?: "invoice" | "line" | undefined;
    }[] | undefined;
    documentType?: string | undefined;
    invoiceDate?: string | undefined;
    dueDate?: string | undefined;
    deliveryDate?: string | undefined;
    paymentDate?: string | undefined;
    otherDate?: string | undefined;
    orderReference?: string | null | undefined;
    operationNature?: string | undefined;
    currency?: string | undefined;
    supplier?: {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
    buyer?: {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
    lines?: {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discountRate?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        exemptionReason?: string | null | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        discount?: number | undefined;
        taxPercentage?: number | undefined;
    }[] | undefined;
    globalDiscount?: number | undefined;
    stampDuty?: number | undefined;
    ttnReference?: string | null | undefined;
    paymentMeans?: string | undefined;
    ircRate?: number | null | undefined;
    xmlContent?: string | undefined;
    invoiceNumber?: string | undefined;
    amountLanguage?: "ar" | "fr" | "en" | undefined;
}, {
    documentNumber?: string | undefined;
    allowances?: {
        type: string;
        amount: number;
        code?: string | undefined;
        description?: string | undefined;
        basedOn?: "invoice" | "line" | undefined;
    }[] | undefined;
    documentType?: string | undefined;
    invoiceDate?: any;
    dueDate?: any;
    deliveryDate?: any;
    paymentDate?: any;
    otherDate?: any;
    orderReference?: string | null | undefined;
    operationNature?: string | undefined;
    currency?: string | undefined;
    supplier?: {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
    buyer?: {
        idType: string;
        idValue: string;
        name: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
    lines?: {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discountRate?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        exemptionReason?: string | null | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        discount?: number | undefined;
        taxPercentage?: number | undefined;
    }[] | undefined;
    globalDiscount?: number | undefined;
    stampDuty?: number | undefined;
    ttnReference?: string | null | undefined;
    paymentMeans?: string | undefined;
    ircRate?: number | null | undefined;
    xmlContent?: string | undefined;
    invoiceNumber?: string | undefined;
    amountLanguage?: "ar" | "fr" | "en" | undefined;
}>;
export type InvoiceUpdateApiDto = z.infer<typeof InvoiceUpdateApiSchema>;
