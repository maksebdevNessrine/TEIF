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
    orderReference: z.ZodOptional<z.ZodString>;
    currency: z.ZodOptional<z.ZodString>;
    paymentMeans: z.ZodDefault<z.ZodString>;
    operationNature: z.ZodDefault<z.ZodString>;
    ttnReference: z.ZodOptional<z.ZodString>;
    globalDiscount: z.ZodDefault<z.ZodNumber>;
    stampDuty: z.ZodDefault<z.ZodNumber>;
    ircRate: z.ZodOptional<z.ZodNumber>;
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
        name: string;
        idType: string;
        idValue: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }, {
        name: string;
        idType: string;
        idValue: string;
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
        name: string;
        idType: string;
        idValue: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }, {
        name: string;
        idType: string;
        idValue: string;
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
        exemptionReason: z.ZodOptional<z.ZodString>;
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
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discount?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        discountRate?: number | undefined;
        taxPercentage?: number | undefined;
        exemptionReason?: string | undefined;
    }, {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discount?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        discountRate?: number | undefined;
        taxPercentage?: number | undefined;
        exemptionReason?: string | undefined;
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
    invoiceDate: string;
    documentType: string;
    globalDiscount: number;
    stampDuty: number;
    supplier: {
        name: string;
        idType: string;
        idValue: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    };
    buyer: {
        name: string;
        idType: string;
        idValue: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    };
    operationNature: string;
    paymentMeans: string;
    dueDate?: string | undefined;
    allowances?: {
        type: string;
        amount: number;
        code?: string | undefined;
        description?: string | undefined;
        basedOn?: "invoice" | "line" | undefined;
    }[] | undefined;
    xmlContent?: string | undefined;
    deliveryDate?: string | undefined;
    orderReference?: string | undefined;
    currency?: string | undefined;
    invoiceNumber?: string | undefined;
    ttnReference?: string | undefined;
    ircRate?: number | undefined;
    paymentDate?: string | undefined;
    otherDate?: string | undefined;
    lines?: {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discount?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        discountRate?: number | undefined;
        taxPercentage?: number | undefined;
        exemptionReason?: string | undefined;
    }[] | undefined;
}, {
    documentType: string;
    supplier: {
        name: string;
        idType: string;
        idValue: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    };
    buyer: {
        name: string;
        idType: string;
        idValue: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    };
    documentNumber?: string | undefined;
    invoiceDate?: any;
    dueDate?: any;
    globalDiscount?: number | undefined;
    stampDuty?: number | undefined;
    allowances?: {
        type: string;
        amount: number;
        code?: string | undefined;
        description?: string | undefined;
        basedOn?: "invoice" | "line" | undefined;
    }[] | undefined;
    xmlContent?: string | undefined;
    operationNature?: string | undefined;
    deliveryDate?: any;
    orderReference?: string | undefined;
    currency?: string | undefined;
    paymentMeans?: string | undefined;
    invoiceNumber?: string | undefined;
    ttnReference?: string | undefined;
    ircRate?: number | undefined;
    paymentDate?: any;
    otherDate?: any;
    lines?: {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discount?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        discountRate?: number | undefined;
        taxPercentage?: number | undefined;
        exemptionReason?: string | undefined;
    }[] | undefined;
}>;
export type InvoiceCreateApiDto = z.infer<typeof InvoiceCreateApiSchema>;
/**
 * Update invoice schema (partial)
 */
export declare const InvoiceUpdateApiSchema: z.ZodObject<{
    documentType: z.ZodOptional<z.ZodString>;
    documentNumber: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    invoiceNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    orderReference: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    currency: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    paymentMeans: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    operationNature: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    ttnReference: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    globalDiscount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    stampDuty: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    ircRate: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
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
        name: string;
        idType: string;
        idValue: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }, {
        name: string;
        idType: string;
        idValue: string;
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
        name: string;
        idType: string;
        idValue: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    }, {
        name: string;
        idType: string;
        idValue: string;
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
        exemptionReason: z.ZodOptional<z.ZodString>;
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
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discount?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        discountRate?: number | undefined;
        taxPercentage?: number | undefined;
        exemptionReason?: string | undefined;
    }, {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discount?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        discountRate?: number | undefined;
        taxPercentage?: number | undefined;
        exemptionReason?: string | undefined;
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
    invoiceDate?: string | undefined;
    dueDate?: string | undefined;
    documentType?: string | undefined;
    globalDiscount?: number | undefined;
    stampDuty?: number | undefined;
    supplier?: {
        name: string;
        idType: string;
        idValue: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
    buyer?: {
        name: string;
        idType: string;
        idValue: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
    allowances?: {
        type: string;
        amount: number;
        code?: string | undefined;
        description?: string | undefined;
        basedOn?: "invoice" | "line" | undefined;
    }[] | undefined;
    xmlContent?: string | undefined;
    operationNature?: string | undefined;
    deliveryDate?: string | undefined;
    orderReference?: string | undefined;
    currency?: string | undefined;
    paymentMeans?: string | undefined;
    invoiceNumber?: string | undefined;
    ttnReference?: string | undefined;
    ircRate?: number | undefined;
    paymentDate?: string | undefined;
    otherDate?: string | undefined;
    lines?: {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discount?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        discountRate?: number | undefined;
        taxPercentage?: number | undefined;
        exemptionReason?: string | undefined;
    }[] | undefined;
}, {
    documentNumber?: string | undefined;
    invoiceDate?: any;
    dueDate?: any;
    documentType?: string | undefined;
    globalDiscount?: number | undefined;
    stampDuty?: number | undefined;
    supplier?: {
        name: string;
        idType: string;
        idValue: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
    buyer?: {
        name: string;
        idType: string;
        idValue: string;
        addressDescription?: string | undefined;
        street?: string | undefined;
        city?: string | undefined;
        postalCode?: string | undefined;
        country?: string | undefined;
    } | undefined;
    allowances?: {
        type: string;
        amount: number;
        code?: string | undefined;
        description?: string | undefined;
        basedOn?: "invoice" | "line" | undefined;
    }[] | undefined;
    xmlContent?: string | undefined;
    operationNature?: string | undefined;
    deliveryDate?: any;
    orderReference?: string | undefined;
    currency?: string | undefined;
    paymentMeans?: string | undefined;
    invoiceNumber?: string | undefined;
    ttnReference?: string | undefined;
    ircRate?: number | undefined;
    paymentDate?: any;
    otherDate?: any;
    lines?: {
        description: string;
        quantity: number;
        unitPrice: number;
        id?: string | undefined;
        allowances?: {
            type: string;
            amount: number;
            code?: string | undefined;
            description?: string | undefined;
        }[] | undefined;
        itemCode?: string | undefined;
        unit?: string | undefined;
        discount?: number | undefined;
        taxRate?: number | undefined;
        fodec?: boolean | undefined;
        discountRate?: number | undefined;
        taxPercentage?: number | undefined;
        exemptionReason?: string | undefined;
    }[] | undefined;
}>;
export type InvoiceUpdateApiDto = z.infer<typeof InvoiceUpdateApiSchema>;
