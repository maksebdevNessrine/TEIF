"use strict";
/**
 * Invoice Routes - Using Hono RPC + Auto-Generated Zod Schemas
 *
 * This router demonstrates the new architecture:
 * 1. Auto-generated Zod schemas from Prisma
 * 2. Hono Zod Validator middleware for validation
 * 3. Global error handling (no try-catch needed)
 * 4. Fully typed RPC for frontend
 */
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const invoice_service_1 = require("../services/invoice.service");
const pdf_service_1 = require("../services/pdf.service");
const auth_1 = require("../middleware/auth");
const invoice_dto_1 = require("../schemas/invoice-dto");
// Auto-generated schemas from Prisma (zod-prisma-types generator)
// Actual validation happens at runtime via zValidator middleware
const invoiceRoutes = new hono_1.Hono();
// Apply auth middleware to all invoice routes
invoiceRoutes.use('*', auth_1.authMiddleware);
/**
 * POST /api/invoices - Create a new invoice
 *
 * Validates against InvoiceCreateApiSchema which:
 * - Omits system fields (id, createdAt, etc)
 * - Accepts UI-friendly format (supplier/buyer objects, lines array)
 *
 * Service layer converts to database format
 */
invoiceRoutes.post('/', (0, zod_validator_1.zValidator)('json', invoice_dto_1.InvoiceCreateApiSchema), async (c) => {
    const user = c.get('user');
    const validatedData = c.req.valid('json');
    // Service handles conversion to Prisma format
    const invoice = await invoice_service_1.invoiceService.createInvoice(user.userId, validatedData);
    return c.json({ success: true, data: invoice }, 201);
});
/**
 * GET /api/invoices/:id - Get a single invoice
 */
invoiceRoutes.get('/:id', async (c) => {
    const user = c.get('user');
    const invoiceId = c.req.param('id');
    const invoice = await invoice_service_1.invoiceService.getInvoiceById(user.userId, invoiceId);
    return c.json({ success: true, data: invoice }, 200);
});
/**
 * PUT /api/invoices/:id - Update an invoice
 */
invoiceRoutes.put('/:id', (0, zod_validator_1.zValidator)('json', invoice_dto_1.InvoiceUpdateApiSchema), async (c) => {
    const user = c.get('user');
    const invoiceId = c.req.param('id');
    const validatedData = c.req.valid('json');
    const invoice = await invoice_service_1.invoiceService.updateInvoice(user.userId, invoiceId, validatedData);
    return c.json({ success: true, data: invoice }, 200);
});
/**
 * DELETE /api/invoices/:id - Soft delete an invoice
 */
invoiceRoutes.delete('/:id', async (c) => {
    const user = c.get('user');
    const invoiceId = c.req.param('id');
    await invoice_service_1.invoiceService.deleteInvoice(user.userId, invoiceId);
    return c.json({ success: true, message: 'Invoice deleted' }, 200);
});
/**
 * GET /api/invoices - List invoices with filtering
 */
invoiceRoutes.get('/', async (c) => {
    const user = c.get('user');
    const queryParams = {
        page: c.req.query('page') ? Number(c.req.query('page')) : 1,
        limit: c.req.query('limit') ? Number(c.req.query('limit')) : 20,
        search: c.req.query('search'),
        dateFrom: c.req.query('dateFrom'),
        dateTo: c.req.query('dateTo'),
        documentType: c.req.query('documentType'),
        minAmount: c.req.query('minAmount') ? Number(c.req.query('minAmount')) : undefined,
        maxAmount: c.req.query('maxAmount') ? Number(c.req.query('maxAmount')) : undefined,
        status: c.req.query('status'),
        sortBy: c.req.query('sortBy'),
        sortOrder: c.req.query('sortOrder'),
    };
    const result = await invoice_service_1.invoiceService.listInvoices(user.userId, queryParams);
    return c.json({ success: true, data: result }, 200);
});
/**
 * GET /api/invoices/:id/pdf - Generate and download invoice PDF
 */
invoiceRoutes.get('/:id/pdf', async (c) => {
    const user = c.get('user');
    const invoiceId = c.req.param('id');
    const language = (c.req.query('language') || 'fr');
    // Validate language parameter
    if (!['ar', 'fr', 'en'].includes(language)) {
        return c.json({ success: false, error: 'Invalid language' }, 400);
    }
    const { buffer, fromCache } = await pdf_service_1.pdfService.getOrGeneratePdf(invoiceId, user.userId, { language });
    c.header('Content-Type', 'application/pdf');
    c.header('Content-Disposition', `inline; filename="invoice-${invoiceId}.pdf"`);
    c.header('X-PDF-Cache', fromCache ? 'hit' : 'miss');
    return c.body(buffer);
});
exports.default = invoiceRoutes;
