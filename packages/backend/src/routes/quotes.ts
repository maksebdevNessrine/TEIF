/**
 * Quote Routes - Uses the same Invoice service but filters by documentCategory = 'quote'
 */

import { Hono } from 'hono';
import type { Context } from 'hono';
import { invoiceService } from '../services/invoice.service.js';
import { pdfService } from '../services/pdf.service.js';
import { authMiddleware } from '../middleware/auth.js';
import { InvoiceCreateApiSchema, InvoiceUpdateApiSchema } from '../schemas/invoice-dto.js';

const quoteRoutes = new Hono();

// Apply auth middleware to all quote routes
quoteRoutes.use('*', authMiddleware);

class NotFoundError extends Error {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

function ensureQuote(document: any) {
  if (!document || (document.documentCategory || '').toString().toUpperCase() !== 'QUOTE') {
    throw new NotFoundError('Quote not found');
  }
  return document;
}

/**
 * POST /api/quotes - Create a new quote
 */
quoteRoutes.post('/', async (c: any) => {
  const user = c.get('user') as any;
  const body = await c.req.json();
  const validatedData = InvoiceCreateApiSchema.parse(body);

  // Force document category to quote
  validatedData.documentCategory = 'quote';

  const quote = await invoiceService.createInvoice(user.userId, validatedData);

  return c.json({ success: true, data: quote }, 201);
});

/**
 * GET /api/quotes/:id - Get a single quote
 */
quoteRoutes.get('/:id', async (c: Context) => {
  const user = c.get('user') as any;
  const quoteId = c.req.param('id')!;

  const quote = await invoiceService.getInvoiceById(user.userId, quoteId);
  ensureQuote(quote);

  return c.json({ success: true, data: quote }, 200);
});

/**
 * PUT /api/quotes/:id - Update a quote
 */
quoteRoutes.put('/:id', async (c: any) => {
  const user = c.get('user') as any;
  const quoteId = c.req.param('id')!;
  const body = await c.req.json();
  const validatedData = InvoiceUpdateApiSchema.parse(body);

  // Ensure the quote stays a quote
  validatedData.documentCategory = 'quote';

  const quote = await invoiceService.updateInvoice(user.userId, quoteId, validatedData);
  ensureQuote(quote);

  return c.json({ success: true, data: quote }, 200);
});

/**
 * POST /api/quotes/:id/convert - Convert a quote into an invoice
 */
quoteRoutes.post('/:id/convert', async (c: any) => {
  const user = c.get('user') as any;
  const quoteId = c.req.param('id')!;

  const quote = await invoiceService.getInvoiceById(user.userId, quoteId);
  ensureQuote(quote);

  const invoice = await invoiceService.convertQuoteToInvoice(user.userId, quoteId);

  return c.json({ success: true, data: invoice }, 200);
});

/**
 * DELETE /api/quotes/:id - Soft delete a quote
 */
quoteRoutes.delete('/:id', async (c: Context) => {
  const user = c.get('user') as any;
  const quoteId = c.req.param('id')!;

  // Confirm it is a quote before deleting (prevents deleting invoices via this route)
  const quote = await invoiceService.getInvoiceById(user.userId, quoteId);
  ensureQuote(quote);

  await invoiceService.deleteInvoice(user.userId, quoteId);

  return c.json({ success: true, message: 'Quote deleted' }, 200);
});

/**
 * GET /api/quotes - List quotes with filtering
 */
quoteRoutes.get('/', async (c: Context) => {
  const user = c.get('user') as any;
  const queryParams = {
    page: c.req.query('page') ? Number(c.req.query('page')) : 1,
    limit: c.req.query('limit') ? Number(c.req.query('limit')) : 20,
    search: c.req.query('search'),
    dateFrom: c.req.query('dateFrom'),
    dateTo: c.req.query('dateTo'),
    documentType: c.req.query('documentType'),
    documentCategory: 'quote',
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
 * GET /api/quotes/:id/pdf - Generate and download quote PDF
 */
quoteRoutes.get('/:id/pdf', async (c: Context) => {
  const user = c.get('user') as any;
  const quoteId = c.req.param('id')!;
  const language = (c.req.query('language') || 'fr') as 'ar' | 'fr' | 'en';

  // Validate language parameter
  if (!['ar', 'fr', 'en'].includes(language)) {
    return c.json(
      { success: false, error: 'Invalid language' },
      400
    );
  }

  const quote = await invoiceService.getInvoiceById(user.userId, quoteId);
  ensureQuote(quote);

  const { buffer, fromCache } = await pdfService.getOrGeneratePdf(
    quoteId,
    user.userId,
    { language }
  );

  c.header('Content-Type', 'application/pdf');
  c.header('Content-Disposition', `inline; filename="quote-${quoteId}.pdf"`);
  c.header('X-PDF-Cache', fromCache ? 'hit' : 'miss');

  return c.body(buffer as any);
});

/**
 * GET /api/quotes/:id/xml - Get quote as XML
 */
quoteRoutes.get('/:id/xml', async (c: Context) => {
  const user = c.get('user') as any;
  const quoteId = c.req.param('id')!;

  const quote = await invoiceService.getInvoiceById(user.userId, quoteId);
  ensureQuote(quote);

  c.header('Content-Type', 'application/xml; charset=utf-8');
  c.header('Content-Disposition', `attachment; filename="quote-${quoteId}.xml"`);

  return c.body(quote.xmlContent);
});

export default quoteRoutes;
