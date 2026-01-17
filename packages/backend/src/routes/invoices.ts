/**
 * Invoice Routes - Using Hono RPC + Auto-Generated Zod Schemas
 * 
 * This router demonstrates the new architecture:
 * 1. Auto-generated Zod schemas from Prisma
 * 2. Hono Zod Validator middleware for validation
 * 3. Global error handling (no try-catch needed)
 * 4. Fully typed RPC for frontend
 */

import { Hono } from 'hono';
import { Context } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { invoiceService } from '../services/invoice.service';
import { pdfService } from '../services/pdf.service';
import { authMiddleware } from '../middleware/auth';
import { InvoiceCreateApiSchema, InvoiceUpdateApiSchema } from '../schemas/invoice-dto';

// Auto-generated schemas from Prisma (zod-prisma-types generator)
// Actual validation happens at runtime via zValidator middleware

const invoiceRoutes = new Hono();

// Apply auth middleware to all invoice routes
invoiceRoutes.use('*', authMiddleware);


/**
 * POST /api/invoices - Create a new invoice
 * 
 * Validates against InvoiceCreateApiSchema which:
 * - Omits system fields (id, createdAt, etc)
 * - Accepts UI-friendly format (supplier/buyer objects, lines array)
 * 
 * Service layer converts to database format
 */
invoiceRoutes.post(
  '/',
  zValidator('json', InvoiceCreateApiSchema),
  async (c: Context) => {
    const user = c.get('user') as any;
    const validatedData = (c.req.valid as any)('json');

    // Service handles conversion to Prisma format
    const invoice = await invoiceService.createInvoice(user.userId, validatedData);

    return c.json({ success: true, data: invoice }, 201);
  }
);


/**
 * GET /api/invoices/:id - Get a single invoice
 */
invoiceRoutes.get('/:id', async (c: Context) => {
  const user = c.get('user') as any;
  const invoiceId = c.req.param('id');

  const invoice = await invoiceService.getInvoiceById(user.userId, invoiceId);

  return c.json({ success: true, data: invoice }, 200);
});


/**
 * PUT /api/invoices/:id - Update an invoice
 */
invoiceRoutes.put(
  '/:id',
  zValidator('json', InvoiceUpdateApiSchema),
  async (c: Context) => {
    const user = c.get('user') as any;
    const invoiceId = c.req.param('id');
    const validatedData = (c.req.valid as any)('json');

    const invoice = await invoiceService.updateInvoice(user.userId, invoiceId, validatedData);

    return c.json({ success: true, data: invoice }, 200);
  }
);


/**
 * DELETE /api/invoices/:id - Soft delete an invoice
 */
invoiceRoutes.delete('/:id', async (c: Context) => {
  const user = c.get('user') as any;
  const invoiceId = c.req.param('id');

  await invoiceService.deleteInvoice(user.userId, invoiceId);

  return c.json({ success: true, message: 'Invoice deleted' }, 200);
});


/**
 * GET /api/invoices - List invoices with filtering
 */
invoiceRoutes.get('/', async (c: Context) => {
  const user = c.get('user') as any;
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
    sortOrder: c.req.query('sortOrder') as 'asc' | 'desc' | undefined,
  };

  const result = await invoiceService.listInvoices(user.userId, queryParams);

  return c.json({ success: true, data: result }, 200);
});


/**
 * GET /api/invoices/:id/pdf - Generate and download invoice PDF
 */
invoiceRoutes.get('/:id/pdf', async (c: Context) => {
  const user = c.get('user') as any;
  const invoiceId = c.req.param('id');
  const language = (c.req.query('language') || 'fr') as 'ar' | 'fr' | 'en';

  // Validate language parameter
  if (!['ar', 'fr', 'en'].includes(language)) {
    return c.json(
      { success: false, error: 'Invalid language' },
      400
    );
  }

  const { buffer, fromCache } = await pdfService.getOrGeneratePdf(
    invoiceId,
    user.userId,
    { language }
  );

  c.header('Content-Type', 'application/pdf');
  c.header('Content-Disposition', `inline; filename="invoice-${invoiceId}.pdf"`);
  c.header('X-PDF-Cache', fromCache ? 'hit' : 'miss');

  return c.body(buffer as any);
});

export default invoiceRoutes;
