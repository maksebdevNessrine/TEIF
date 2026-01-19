import { type InvoiceCreateApiDto, type InvoiceUpdateApiDto } from '../schemas/invoice-dto';
/**
 * Create a new invoice with related entities
 *
 * Architecture: "Validate once, Type everywhere"
 * - Validation happens at API boundary with zValidator (InvoiceCreateApiSchema)
 * - This function receives ONLY validated data (guaranteed by TypeScript type)
 * - No re-validation here - service is pure business logic
 * - If other entry points (crons, seeds, queues) call this, they MUST type-check first
 *
 * @param userId - User ID from auth context
 * @param invoiceData - Already validated against InvoiceCreateApiSchema
 */
export declare function createInvoice(userId: string, invoiceData: InvoiceCreateApiDto): Promise<any>;
/**
 * Get invoice by ID with all relations
 */
export declare function getInvoiceById(userId: string, invoiceId: string): Promise<any>;
/**
 * Update invoice
 *
 * Architecture: "Validate once, Type everywhere"
 * @param userId - User ID from auth context
 * @param invoiceId - Invoice ID to update
 * @param invoiceData - Already validated against InvoiceUpdateApiSchema
 */
export declare function updateInvoice(userId: string, invoiceId: string, invoiceData: InvoiceUpdateApiDto): Promise<any>;
/**
 * Soft delete invoice
 */
export declare function deleteInvoice(userId: string, invoiceId: string): Promise<void>;
/**
 * List invoices with advanced search and filtering
 */
export declare function listInvoices(userId: string, options: any): Promise<any>;
export declare const invoiceService: {
    createInvoice: typeof createInvoice;
    getInvoiceById: typeof getInvoiceById;
    updateInvoice: typeof updateInvoice;
    deleteInvoice: typeof deleteInvoice;
    listInvoices: typeof listInvoices;
};
