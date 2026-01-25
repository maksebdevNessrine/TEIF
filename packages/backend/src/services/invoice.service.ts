import { prisma, Prisma } from '../lib/prisma';
import { partnerService } from './partner.service';
import { invoiceCalculationsService } from './invoice-calculations.service';
import { xmlGeneratorService } from './xmlGenerator.service';
import { invalidatePdfCache } from './pdf.service';
import { InvoiceCreateApiSchema, InvoiceUpdateApiSchema, type InvoiceCreateApiDto, type InvoiceUpdateApiDto } from '../schemas/invoice-dto';

class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'AppError';
  }
}

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
export async function createInvoice(
  userId: string,
  invoiceData: InvoiceCreateApiDto
): Promise<any> {
  // Data is guaranteed to match InvoiceCreateApiSchema
  // TypeScript ensures type safety; no runtime validation needed
  const validatedData = invoiceData;

  // Use transaction for atomicity
  const invoice = await prisma.$transaction(async (tx) => {
    // Find or create supplier partner (cast string idType to IdType)
    const supplierData = {
      ...validatedData.supplier,
      idType: validatedData.supplier.idType as any, // Cast string to IdType
    };
    const supplierId = await partnerService.findOrCreatePartner(supplierData as any);

    // Find or create buyer partner (cast string idType to IdType)
    const buyerData = {
      ...validatedData.buyer,
      idType: validatedData.buyer.idType as any, // Cast string to IdType
    };
    const buyerId = await partnerService.findOrCreatePartner(buyerData as any);

    // Calculate line totals
    const linesWithTotals = (validatedData.lines || []).map((line: any) => ({
      ...line,
      ...invoiceCalculationsService.calculateLineTotals(line),
    }));

    // Calculate invoice totals
    const invoiceTotals = invoiceCalculationsService.calculateInvoiceTotals(
      linesWithTotals,
      validatedData.globalDiscount || 0,
      validatedData.stampDuty || 0,
      validatedData.ircRate || undefined
    );

    // Generate XML content (cast DTO to InvoiceData format)
    const xmlContent = xmlGeneratorService.generateInvoiceXml(validatedData as any);

    // Create invoice record
    const createdInvoice = await tx.invoice.create({
      data: {
        userId,
        documentType: validatedData.documentType,
        documentNumber: validatedData.documentNumber || '',
        invoiceDate: new Date(validatedData.invoiceDate || new Date()),
        dueDate: validatedData.dueDate
          ? new Date(validatedData.dueDate)
          : undefined,
        supplierId,
        buyerId,
        status: 'draft',
        totalHT: invoiceTotals.totalHT,
        totalTVA: invoiceTotals.totalTVA,
        totalTTC: invoiceTotals.totalTTC,
        globalDiscount: validatedData.globalDiscount || 0,
        stampDuty: validatedData.stampDuty || 0,
        ircRate: validatedData.ircRate,
        paymentMeans: validatedData.paymentMeans || '',
        orderReference: validatedData.orderReference,
        operationNature: validatedData.operationNature || '',
        xmlContent,
        metadata: validatedData.currency ? { currency: validatedData.currency } : undefined,
      },
      include: {
        supplier: true,
        buyer: true,
      },
    });

    // Create invoice lines and build mapping from client line ids to created line ids
    const lineIdMapping: Record<string, string> = {};
    const createdLines = await Promise.all(
      linesWithTotals.map((line) =>
        tx.invoiceLine.create({
          data: {
            invoiceId: createdInvoice.id,
            itemCode: line.itemCode,
            description: line.description,
            quantity: line.quantity,
            unit: line.unit,
            unitPrice: line.unitPrice,
            discountRate: line.discountRate || 0,
            taxRate: line.taxRate || 0,
            fodec: line.fodec || false,
            exemptionReason: line.exemptionReason,
            lineAmount: line.lineAmount,
            taxAmount: line.taxAmount,
            totalAmount: line.totalAmount,
          },
        }).then((createdLine) => {
          // Map client-provided line id to newly created line id
          if (line.id) {
            lineIdMapping[line.id] = createdLine.id;
          }
          return createdLine;
        })
      )
    );

    // Create invoice-level allowances/charges
    const allowances = [];
    if (validatedData.allowances && validatedData.allowances.length > 0) {
      for (const allowance of validatedData.allowances) {
        // For invoice-level allowances
        if (allowance.basedOn === 'invoice' || !allowance.basedOn) {
          const created = await tx.allowanceCharge.create({
            data: {
              type: allowance.type,
              code: allowance.code || '',
              description: allowance.description || '',
              amount: allowance.amount,
              basedOn: 'invoice',
              invoiceId: createdInvoice.id,
            },
          });
          allowances.push(created);
        }
      }
    }

    // Create line-level allowances from each line's allowances array
    const allLineAllowances: any[] = [];
    for (let i = 0; i < createdLines.length; i++) {
      const line: any = validatedData.lines?.[i];
      if (line?.allowances && line.allowances.length > 0) {
        for (const lineAllowance of line.allowances) {
          const created = await tx.allowanceCharge.create({
            data: {
              type: lineAllowance.type,
              code: lineAllowance.code || '',
              description: lineAllowance.description || '',
              amount: lineAllowance.amount,
              basedOn: 'line',
              lineId: createdLines[i].id,
            },
          });
          allLineAllowances.push(created);
        }
      }
    }

    // Return full invoice with relations (lines include their allowances)
    const linesWithAllowances = createdLines.map((createdLine: any) => ({
      ...createdLine,
      allowances: allLineAllowances.filter((a) => a.lineId === createdLine.id),
    }));

    return {
      ...createdInvoice,
      lines: linesWithAllowances,
      allowances,
    };
  });

  return invoice;
}

/**
 * Get invoice by ID with all relations
 */
export async function getInvoiceById(
  userId: string,
  invoiceId: string
): Promise<any> {
  const invoice = await prisma.invoice.findFirst({
    where: {
      id: invoiceId,
      userId,
      deletedAt: null,
    },
    include: {
      supplier: true,
      buyer: true,
      lines: {
        include: {
          allowances: true,
        },
      },
      allowances: true,
    },
  });

  if (!invoice) {
    throw new AppError(404, 'Invoice not found');
  }

  return invoice;
}

/**
 * Update invoice
 * 
 * Architecture: "Validate once, Type everywhere"
 * @param userId - User ID from auth context
 * @param invoiceId - Invoice ID to update
 * @param invoiceData - Already validated against InvoiceUpdateApiSchema
 */
export async function updateInvoice(
  userId: string,
  invoiceId: string,
  invoiceData: InvoiceUpdateApiDto
): Promise<any> {
  // Data is guaranteed to match InvoiceUpdateApiSchema
  const validatedData = invoiceData;

  // Check invoice exists and belongs to user
  const existingInvoice = await prisma.invoice.findFirst({
    where: {
      id: invoiceId,
      userId,
      deletedAt: null,
    },
  });

  if (!existingInvoice) {
    throw new AppError(404, 'Invoice not found');
  }

  // Use transaction for atomicity
  const updatedInvoice = await prisma.$transaction(async (tx) => {
    // Find or create supplier partner (cast string idType to IdType) - only if provided
    let supplierId: string | undefined;
    if (validatedData.supplier) {
      const supplierData = {
        ...validatedData.supplier,
        idType: validatedData.supplier.idType as any, // Cast string to IdType
      };
      supplierId = await partnerService.findOrCreatePartner(supplierData as any);
    }

    // Find or create buyer partner (cast string idType to IdType) - only if provided
    let buyerId: string | undefined;
    if (validatedData.buyer) {
      const buyerData = {
        ...validatedData.buyer,
        idType: validatedData.buyer.idType as any, // Cast string to IdType
      };
      buyerId = await partnerService.findOrCreatePartner(buyerData as any);
    }

    // Calculate line totals (handle optional lines)
    const linesWithTotals = (validatedData.lines || []).map((line: any) => ({
      ...line,
      ...invoiceCalculationsService.calculateLineTotals(line),
    }));

    // Calculate invoice totals
    const invoiceTotals = invoiceCalculationsService.calculateInvoiceTotals(
      linesWithTotals,
      validatedData.globalDiscount || 0,
      validatedData.stampDuty || 0,
      validatedData.ircRate || undefined
    );

    // Generate XML content (cast DTO to InvoiceData format)
    const xmlContent = xmlGeneratorService.generateInvoiceXml(validatedData as any);

    // Update invoice record
    const updated = await tx.invoice.update({
      where: { id: invoiceId },
      data: {
        ...(validatedData.documentType && { documentType: validatedData.documentType }),
        ...(validatedData.documentNumber !== undefined && { documentNumber: validatedData.documentNumber || '' }),
        ...(validatedData.invoiceDate && { invoiceDate: new Date(validatedData.invoiceDate) }),
        ...(validatedData.dueDate && { dueDate: new Date(validatedData.dueDate) }),
        ...(supplierId && { supplierId }),
        ...(buyerId && { buyerId }),
        ...(validatedData.globalDiscount !== undefined && { globalDiscount: validatedData.globalDiscount || 0 }),
        ...(validatedData.stampDuty !== undefined && { stampDuty: validatedData.stampDuty || 0 }),
        ...(validatedData.ircRate !== undefined && { ircRate: validatedData.ircRate }),
        ...(validatedData.paymentMeans && { paymentMeans: validatedData.paymentMeans }),
        ...(validatedData.orderReference !== undefined && { orderReference: validatedData.orderReference }),
        ...(validatedData.operationNature !== undefined && { operationNature: validatedData.operationNature || '' }),
        ...(validatedData.currency && { metadata: { currency: validatedData.currency } }),
        // Always recalculate and update totals when lines/discounts/taxes change
        totalHT: invoiceTotals.totalHT,
        totalTVA: invoiceTotals.totalTVA,
        totalTTC: invoiceTotals.totalTTC,
      },
      include: {
        supplier: true,
        buyer: true,
      },
    });

    // Delete existing lines and allowances (cascade will handle line allowances)
    await tx.invoiceLine.deleteMany({
      where: { invoiceId },
    });

    // Delete existing invoice-level allowances
    await tx.allowanceCharge.deleteMany({
      where: {
        invoiceId,
        basedOn: { not: 'line' },
      },
    });

    // Create invoice lines and build mapping from client line ids to created line ids
    const lineIdMapping: Record<string, string> = {};
    const createdLines = await Promise.all(
      linesWithTotals.map((line: any) =>
        tx.invoiceLine.create({
          data: {
            invoiceId: updated.id,
            itemCode: line.itemCode,
            description: line.description,
            quantity: line.quantity,
            unit: line.unit,
            unitPrice: line.unitPrice,
            discountRate: line.discountRate || 0,
            taxRate: line.taxRate || 0,
            fodec: line.fodec || false,
            exemptionReason: line.exemptionReason,
            lineAmount: line.lineAmount,
            taxAmount: line.taxAmount,
            totalAmount: line.totalAmount,
          },
        }).then((createdLine) => {
          // Map client-provided line id to newly created line id
          if (line.id) {
            lineIdMapping[line.id] = createdLine.id;
          }
          return createdLine;
        })
      )
    );

    // Create invoice-level allowances/charges
    const allowances = [];
    if (validatedData.allowances && validatedData.allowances.length > 0) {
      for (const allowance of validatedData.allowances) {
        // For invoice-level allowances
        if (allowance.basedOn === 'invoice' || !allowance.basedOn) {
          const created = await tx.allowanceCharge.create({
            data: {
              type: allowance.type,
              code: allowance.code || '',
              description: allowance.description || '',
              amount: allowance.amount,
              basedOn: 'invoice',
              invoiceId: updated.id,
            },
          });
          allowances.push(created);
        }
      }
    }

    // Create line-level allowances from each line's allowances array using fresh line IDs
    const allLineAllowances: any[] = [];
    for (let i = 0; i < createdLines.length; i++) {
      const line: any = validatedData.lines?.[i];
      if (line?.allowances && line.allowances.length > 0) {
        for (const lineAllowance of line.allowances) {
          const created = await tx.allowanceCharge.create({
            data: {
              type: lineAllowance.type,
              code: lineAllowance.code || '',
              description: lineAllowance.description || '',
              amount: lineAllowance.amount,
              basedOn: 'line',
              lineId: createdLines[i].id,
            },
          });
          allLineAllowances.push(created);
        }
      }
    }

    // Return full invoice with relations (lines include their allowances)
    const linesWithAllowances = createdLines.map((createdLine: any) => ({
      ...createdLine,
      allowances: allLineAllowances.filter((a) => a.lineId === createdLine.id),
    }));

    return {
      ...updated,
      lines: linesWithAllowances,
      allowances,
    };
  });

  // Invalidate PDF cache on successful update
  await invalidatePdfCache(invoiceId, userId);

  return updatedInvoice;
}

/**
 * Soft delete invoice
 */
export async function deleteInvoice(
  userId: string,
  invoiceId: string
): Promise<void> {
  const invoice = await prisma.invoice.findFirst({
    where: {
      id: invoiceId,
      userId,
      deletedAt: null,
    },
  });

  if (!invoice) {
    throw new AppError(404, 'Invoice not found');
  }

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      deletedAt: new Date(),
    },
  });

  // Invalidate PDF cache on successful delete
  await invalidatePdfCache(invoiceId, userId);
}

/**
 * List invoices with pagination and optional status filter
 */
/**
 * Build orderBy clause based on sort parameters and search state
 */
/**
 * Build orderBy clause based on sort field and search state
 * When search is active, preserve relevance ordering from searchInvoices()
 */
function buildOrderByClause(
  sortBy: string,
  sortOrder: string,
  hasSearch: boolean
): any {
  // If search is active, results are already ordered by relevance from searchInvoices()
  // Return empty orderBy to preserve that order
  if (hasSearch) {
    return undefined;
  }

  // Map sortBy to Prisma field names for non-search queries
  let orderField = 'invoiceDate';
  if (sortBy === 'amount') orderField = 'totalTTC';
  if (sortBy === 'documentNumber') orderField = 'documentNumber';

  const direction = sortOrder === 'asc' ? 'asc' : 'desc';

  return { [orderField]: direction };
}

/**
 * Search invoices using trigram similarity with filter pushdown
 */
async function searchInvoices(
  userId: string,
  search: string,
  filters: any
): Promise<string[]> {
  const similarity_threshold = 0.3;

  try {
    // Build dynamic WHERE conditions for filters
    let whereConditions = [
      Prisma.sql`i."userId" = ${userId}`,
      Prisma.sql`i."deletedAt" IS NULL`,
      Prisma.sql`(
        similarity(i."documentNumber", ${search}) > ${similarity_threshold}
        OR similarity(s.name, ${search}) > ${similarity_threshold}
        OR similarity(b.name, ${search}) > ${similarity_threshold}
        OR similarity(il.description, ${search}) > ${similarity_threshold}
      )`,
    ];

    // Add status filter
    if (filters.status) {
      whereConditions.push(Prisma.sql`i."status" = ${filters.status}`);
    }

    // Add document type filter
    if (filters.documentType) {
      whereConditions.push(Prisma.sql`i."documentType" = ${filters.documentType}`);
    }

    // Add invoice date range filter
    if (filters.invoiceDate?.gte) {
      whereConditions.push(
        Prisma.sql`i."invoiceDate" >= ${filters.invoiceDate.gte}`
      );
    }
    if (filters.invoiceDate?.lte) {
      whereConditions.push(
        Prisma.sql`i."invoiceDate" <= ${filters.invoiceDate.lte}`
      );
    }

    // Add total amount range filter
    if (filters.totalTTC?.gte !== undefined) {
      whereConditions.push(
        Prisma.sql`i."totalTTC" >= ${filters.totalTTC.gte}`
      );
    }
    if (filters.totalTTC?.lte !== undefined) {
      whereConditions.push(
        Prisma.sql`i."totalTTC" <= ${filters.totalTTC.lte}`
      );
    }

    // Combine WHERE conditions
    const whereClause = Prisma.sql`WHERE ${Prisma.join(
      whereConditions,
      ' AND '
    )}`;

    const searchResults = await prisma.$queryRaw`
      SELECT DISTINCT i.id,
        GREATEST(
          similarity(i."documentNumber", ${search}),
          COALESCE(MAX(similarity(s.name, ${search})), 0),
          COALESCE(MAX(similarity(b.name, ${search})), 0),
          COALESCE(MAX(similarity(il.description, ${search})), 0)
        ) AS relevance_score
      FROM "Invoice" i
      LEFT JOIN "Partner" s ON i."supplierId" = s.id
      LEFT JOIN "Partner" b ON i."buyerId" = b.id
      LEFT JOIN "InvoiceLine" il ON i.id = il."invoiceId"
      ${whereClause}
      GROUP BY i.id
      ORDER BY relevance_score DESC
    `;

    return (searchResults as any[]).map((r: any) => r.id);
  } catch (error) {
    console.error('Search query error:', error);
    return [];
  }
}

/**
 * List invoices with advanced search and filtering
 */
export async function listInvoices(
  userId: string,
  options: any
): Promise<any> {
  const {
    page = 1,
    limit = 20,
    search,
    dateFrom,
    dateTo,
    documentType,
    minAmount,
    maxAmount,
    status,
    sortBy = 'date',
    sortOrder = 'desc',
  } = options;

  // Validate pagination
  if (page < 1 || limit < 1 || limit > 100) {
    throw new AppError(400, 'Invalid pagination parameters');
  }

  const skip = (page - 1) * limit;

  // Helper function to normalize date strings
  const normalizeDate = (dateStr: string | undefined, isEnd: boolean = false): Date | undefined => {
    if (!dateStr) return undefined;
    
    // Check if it's a date-only string (YYYY-MM-DD)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const date = new Date(dateStr);
      if (isEnd) {
        // For end date, set to 23:59:59.999Z
        date.setUTCHours(23, 59, 59, 999);
      } else {
        // For start date, set to 00:00:00.000Z
        date.setUTCHours(0, 0, 0, 0);
      }
      return date;
    }
    
    // Otherwise it's a full datetime string
    return new Date(dateStr);
  };

  // Build base where clause
  const where: any = {
    userId,
    deletedAt: null,
  };

  // Add basic filters
  if (status) {
    where.status = status;
  }

  if (documentType) {
    where.documentType = documentType;
  }

  // Add date range filtering with normalized dates
  const normalizedDateFrom = normalizeDate(dateFrom, false);
  const normalizedDateTo = normalizeDate(dateTo, true);

  if (normalizedDateFrom || normalizedDateTo) {
    where.invoiceDate = {};
    if (normalizedDateFrom) {
      where.invoiceDate.gte = normalizedDateFrom;
    }
    if (normalizedDateTo) {
      where.invoiceDate.lte = normalizedDateTo;
    }
  }

  // Add amount range filtering
  if (minAmount !== undefined || maxAmount !== undefined) {
    where.totalTTC = {};
    if (minAmount !== undefined) {
      where.totalTTC.gte = minAmount;
    }
    if (maxAmount !== undefined) {
      where.totalTTC.lte = maxAmount;
    }
  }

  // Handle search with trigram similarity
  let idOrderMap: Map<string, number> | null = null;
  
  if (search && search.trim()) {
    const matchingInvoiceIds = await searchInvoices(userId, search.trim(), where);
    if (matchingInvoiceIds.length === 0) {
      // No results matching search
      return {
        invoices: [],
        total: 0,
        page,
        limit,
        totalPages: 0,
        filters: {
          search,
          dateFrom,
          dateTo,
          documentType,
          minAmount,
          maxAmount,
          status,
        },
        sorting: {
          sortBy,
          sortOrder,
        },
      };
    }
    // Create map of ID to position to preserve search relevance order
    idOrderMap = new Map(matchingInvoiceIds.map((id, index) => [id, index]));
    where.id = { in: matchingInvoiceIds };
  }

  // Build orderBy clause
  const orderBy = buildOrderByClause(sortBy, sortOrder, !!search);

  // Execute parallel queries
  let [invoices, total] = await Promise.all([
    prisma.invoice.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        supplier: true,
        buyer: true,
        lines: {
          include: {
            allowances: true,
          },
        },
        allowances: true,
      },
    }),
    prisma.invoice.count({ where }),
  ]);

  // Restore search relevance order if search was active
  if (idOrderMap) {
    invoices = invoices.sort((a, b) => 
      (idOrderMap.get(a.id) ?? Infinity) - (idOrderMap.get(b.id) ?? Infinity)
    );
  }

  return {
    invoices,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    filters: {
      search,
      dateFrom,
      dateTo,
      documentType,
      minAmount,
      maxAmount,
      status,
    },
    sorting: {
      sortBy,
      sortOrder,
    },
  };
}

export const invoiceService = {
  createInvoice,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  listInvoices,
};
