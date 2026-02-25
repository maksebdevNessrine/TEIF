import { prisma, Prisma } from "../lib/prisma.js";
import { partnerService } from "./partner.service.js";
import { invoiceCalculationsService } from "./invoice-calculations.service.js";
import { xmlGeneratorService } from "./xmlGenerator.service.js";
import { invalidatePdfCache } from "./pdf.service.js";
class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}
async function createInvoice(userId, invoiceData) {
  console.log("[SERVICE] createInvoice: amountLanguage from request =", invoiceData.amountLanguage);
  const validatedData = invoiceData;
  const invoice = await prisma.$transaction(async (tx) => {
    const supplierData = {
      ...validatedData.supplier,
      idType: validatedData.supplier.idType
      // Cast string to IdType
    };
    const supplierId = await partnerService.findOrCreatePartner(supplierData);
    const buyerData = {
      ...validatedData.buyer,
      idType: validatedData.buyer.idType
      // Cast string to IdType
    };
    const buyerId = await partnerService.findOrCreatePartner(buyerData);
    const linesWithTotals = (validatedData.lines || []).map((line) => ({
      ...line,
      ...invoiceCalculationsService.calculateLineTotals(line)
    }));
    const invoiceTotals = invoiceCalculationsService.calculateInvoiceTotals(
      linesWithTotals,
      validatedData.globalDiscount || 0,
      validatedData.stampDuty || 0,
      validatedData.ircRate || void 0
    );
    const xmlContent = xmlGeneratorService.generateInvoiceXml(validatedData);
    const createdInvoice = await tx.invoice.create({
      data: {
        userId,
        documentType: validatedData.documentType,
        documentNumber: validatedData.documentNumber || "",
        invoiceDate: new Date(validatedData.invoiceDate || /* @__PURE__ */ new Date()),
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : void 0,
        supplierId,
        buyerId,
        status: "draft",
        totalHT: invoiceTotals.totalHT,
        totalTVA: invoiceTotals.totalTVA,
        totalTTC: invoiceTotals.totalTTC,
        globalDiscount: validatedData.globalDiscount || 0,
        stampDuty: validatedData.stampDuty || 0,
        ircRate: validatedData.ircRate,
        paymentMeans: validatedData.paymentMeans || "",
        orderReference: validatedData.orderReference,
        operationNature: validatedData.operationNature || "",
        amountLanguage: validatedData.amountLanguage || "fr",
        xmlContent,
        metadata: validatedData.currency ? { currency: validatedData.currency } : void 0
      },
      include: {
        supplier: true,
        buyer: true
      }
    });
    const lineIdMapping = {};
    const createdLines = await Promise.all(
      linesWithTotals.map(
        (line) => tx.invoiceLine.create({
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
            totalAmount: line.totalAmount
          }
        }).then((createdLine) => {
          if (line.id) {
            lineIdMapping[line.id] = createdLine.id;
          }
          return createdLine;
        })
      )
    );
    const allowances = [];
    if (validatedData.allowances && validatedData.allowances.length > 0) {
      for (const allowance of validatedData.allowances) {
        if (allowance.basedOn === "invoice" || !allowance.basedOn) {
          const created = await tx.allowanceCharge.create({
            data: {
              type: allowance.type,
              code: allowance.code || "",
              description: allowance.description || "",
              amount: allowance.amount,
              basedOn: "invoice",
              invoiceId: createdInvoice.id
            }
          });
          allowances.push(created);
        }
      }
    }
    const allLineAllowances = [];
    for (let i = 0; i < createdLines.length; i++) {
      const line = validatedData.lines?.[i];
      if (line?.allowances && line.allowances.length > 0) {
        for (const lineAllowance of line.allowances) {
          const created = await tx.allowanceCharge.create({
            data: {
              type: lineAllowance.type,
              code: lineAllowance.code || "",
              description: lineAllowance.description || "",
              amount: lineAllowance.amount,
              basedOn: "line",
              lineId: createdLines[i].id
            }
          });
          allLineAllowances.push(created);
        }
      }
    }
    const linesWithAllowances = createdLines.map((createdLine) => ({
      ...createdLine,
      allowances: allLineAllowances.filter((a) => a.lineId === createdLine.id)
    }));
    return {
      ...createdInvoice,
      lines: linesWithAllowances,
      allowances
    };
  });
  return invoice;
}
async function getInvoiceById(userId, invoiceId) {
  const invoice = await prisma.invoice.findFirst({
    where: {
      id: invoiceId,
      userId,
      deletedAt: null
    },
    include: {
      supplier: true,
      buyer: true,
      lines: {
        include: {
          allowances: true
        }
      },
      allowances: true
    }
  });
  if (!invoice) {
    throw new AppError(404, "Invoice not found");
  }
  return invoice;
}
async function updateInvoice(userId, invoiceId, invoiceData) {
  const validatedData = invoiceData;
  const existingInvoice = await prisma.invoice.findFirst({
    where: {
      id: invoiceId,
      userId,
      deletedAt: null
    }
  });
  if (!existingInvoice) {
    throw new AppError(404, "Invoice not found");
  }
  const updatedInvoice = await prisma.$transaction(async (tx) => {
    let supplierId;
    if (validatedData.supplier) {
      const supplierData = {
        ...validatedData.supplier,
        idType: validatedData.supplier.idType
        // Cast string to IdType
      };
      supplierId = await partnerService.findOrCreatePartner(supplierData);
    }
    let buyerId;
    if (validatedData.buyer) {
      const buyerData = {
        ...validatedData.buyer,
        idType: validatedData.buyer.idType
        // Cast string to IdType
      };
      buyerId = await partnerService.findOrCreatePartner(buyerData);
    }
    const linesWithTotals = (validatedData.lines || []).map((line) => ({
      ...line,
      ...invoiceCalculationsService.calculateLineTotals(line)
    }));
    const invoiceTotals = invoiceCalculationsService.calculateInvoiceTotals(
      linesWithTotals,
      validatedData.globalDiscount || 0,
      validatedData.stampDuty || 0,
      validatedData.ircRate || void 0
    );
    const xmlContent = xmlGeneratorService.generateInvoiceXml(validatedData);
    const updated = await tx.invoice.update({
      where: { id: invoiceId },
      data: {
        ...validatedData.documentType && { documentType: validatedData.documentType },
        ...validatedData.documentNumber !== void 0 && { documentNumber: validatedData.documentNumber || "" },
        ...validatedData.invoiceDate && { invoiceDate: new Date(validatedData.invoiceDate) },
        ...validatedData.dueDate && { dueDate: new Date(validatedData.dueDate) },
        ...supplierId && { supplierId },
        ...buyerId && { buyerId },
        ...validatedData.globalDiscount !== void 0 && { globalDiscount: validatedData.globalDiscount || 0 },
        ...validatedData.stampDuty !== void 0 && { stampDuty: validatedData.stampDuty || 0 },
        ...validatedData.ircRate !== void 0 && { ircRate: validatedData.ircRate },
        ...validatedData.paymentMeans && { paymentMeans: validatedData.paymentMeans },
        ...validatedData.orderReference !== void 0 && { orderReference: validatedData.orderReference },
        ...validatedData.operationNature !== void 0 && { operationNature: validatedData.operationNature || "" },
        ...validatedData.amountLanguage && { amountLanguage: validatedData.amountLanguage },
        ...validatedData.currency && { metadata: { currency: validatedData.currency } },
        // Always recalculate and update totals when lines/discounts/taxes change
        totalHT: invoiceTotals.totalHT,
        totalTVA: invoiceTotals.totalTVA,
        totalTTC: invoiceTotals.totalTTC
      },
      include: {
        supplier: true,
        buyer: true
      }
    });
    await tx.invoiceLine.deleteMany({
      where: { invoiceId }
    });
    await tx.allowanceCharge.deleteMany({
      where: {
        invoiceId,
        basedOn: { not: "line" }
      }
    });
    const lineIdMapping = {};
    const createdLines = await Promise.all(
      linesWithTotals.map(
        (line) => tx.invoiceLine.create({
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
            totalAmount: line.totalAmount
          }
        }).then((createdLine) => {
          if (line.id) {
            lineIdMapping[line.id] = createdLine.id;
          }
          return createdLine;
        })
      )
    );
    const allowances = [];
    if (validatedData.allowances && validatedData.allowances.length > 0) {
      for (const allowance of validatedData.allowances) {
        if (allowance.basedOn === "invoice" || !allowance.basedOn) {
          const created = await tx.allowanceCharge.create({
            data: {
              type: allowance.type,
              code: allowance.code || "",
              description: allowance.description || "",
              amount: allowance.amount,
              basedOn: "invoice",
              invoiceId: updated.id
            }
          });
          allowances.push(created);
        }
      }
    }
    const allLineAllowances = [];
    for (let i = 0; i < createdLines.length; i++) {
      const line = validatedData.lines?.[i];
      if (line?.allowances && line.allowances.length > 0) {
        for (const lineAllowance of line.allowances) {
          const created = await tx.allowanceCharge.create({
            data: {
              type: lineAllowance.type,
              code: lineAllowance.code || "",
              description: lineAllowance.description || "",
              amount: lineAllowance.amount,
              basedOn: "line",
              lineId: createdLines[i].id
            }
          });
          allLineAllowances.push(created);
        }
      }
    }
    const linesWithAllowances = createdLines.map((createdLine) => ({
      ...createdLine,
      allowances: allLineAllowances.filter((a) => a.lineId === createdLine.id)
    }));
    return {
      ...updated,
      lines: linesWithAllowances,
      allowances
    };
  });
  await invalidatePdfCache(invoiceId, userId);
  return updatedInvoice;
}
async function deleteInvoice(userId, invoiceId) {
  const invoice = await prisma.invoice.findFirst({
    where: {
      id: invoiceId,
      userId,
      deletedAt: null
    }
  });
  if (!invoice) {
    throw new AppError(404, "Invoice not found");
  }
  await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
  await invalidatePdfCache(invoiceId, userId);
}
function buildOrderByClause(sortBy, sortOrder, hasSearch) {
  if (hasSearch) {
    return void 0;
  }
  let orderField = "invoiceDate";
  if (sortBy === "amount") orderField = "totalTTC";
  if (sortBy === "documentNumber") orderField = "documentNumber";
  const direction = sortOrder === "asc" ? "asc" : "desc";
  return { [orderField]: direction };
}
async function searchInvoices(userId, search, filters) {
  const similarity_threshold = 0.3;
  try {
    let whereConditions = [
      Prisma.sql`i."userId" = ${userId}`,
      Prisma.sql`i."deletedAt" IS NULL`,
      Prisma.sql`(
        similarity(i."documentNumber", ${search}) > ${similarity_threshold}
        OR similarity(s.name, ${search}) > ${similarity_threshold}
        OR similarity(b.name, ${search}) > ${similarity_threshold}
        OR similarity(il.description, ${search}) > ${similarity_threshold}
      )`
    ];
    if (filters.status) {
      whereConditions.push(Prisma.sql`i."status" = ${filters.status}`);
    }
    if (filters.documentType) {
      whereConditions.push(Prisma.sql`i."documentType" = ${filters.documentType}`);
    }
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
    if (filters.totalTTC?.gte !== void 0) {
      whereConditions.push(
        Prisma.sql`i."totalTTC" >= ${filters.totalTTC.gte}`
      );
    }
    if (filters.totalTTC?.lte !== void 0) {
      whereConditions.push(
        Prisma.sql`i."totalTTC" <= ${filters.totalTTC.lte}`
      );
    }
    const whereClause = Prisma.sql`WHERE ${Prisma.join(
      whereConditions,
      " AND "
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
    return searchResults.map((r) => r.id);
  } catch (error) {
    console.error("Search query error:", error);
    return [];
  }
}
async function listInvoices(userId, options) {
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
    sortBy = "date",
    sortOrder = "desc"
  } = options;
  if (page < 1 || limit < 1 || limit > 100) {
    throw new AppError(400, "Invalid pagination parameters");
  }
  const skip = (page - 1) * limit;
  const normalizeDate = (dateStr, isEnd = false) => {
    if (!dateStr) return void 0;
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const date = new Date(dateStr);
      if (isEnd) {
        date.setUTCHours(23, 59, 59, 999);
      } else {
        date.setUTCHours(0, 0, 0, 0);
      }
      return date;
    }
    return new Date(dateStr);
  };
  const where = {
    userId,
    deletedAt: null
  };
  if (status) {
    where.status = status;
  }
  if (documentType) {
    where.documentType = documentType;
  }
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
  if (minAmount !== void 0 || maxAmount !== void 0) {
    where.totalTTC = {};
    if (minAmount !== void 0) {
      where.totalTTC.gte = minAmount;
    }
    if (maxAmount !== void 0) {
      where.totalTTC.lte = maxAmount;
    }
  }
  let idOrderMap = null;
  if (search && search.trim()) {
    const matchingInvoiceIds = await searchInvoices(userId, search.trim(), where);
    if (matchingInvoiceIds.length === 0) {
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
          status
        },
        sorting: {
          sortBy,
          sortOrder
        }
      };
    }
    idOrderMap = new Map(matchingInvoiceIds.map((id, index) => [id, index]));
    where.id = { in: matchingInvoiceIds };
  }
  const orderBy = buildOrderByClause(sortBy, sortOrder, !!search);
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
            allowances: true
          }
        },
        allowances: true
      }
    }),
    prisma.invoice.count({ where })
  ]);
  if (idOrderMap) {
    invoices = invoices.sort(
      (a, b) => (idOrderMap.get(a.id) ?? Infinity) - (idOrderMap.get(b.id) ?? Infinity)
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
      status
    },
    sorting: {
      sortBy,
      sortOrder
    }
  };
}
const invoiceService = {
  createInvoice,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  listInvoices
};
export {
  createInvoice,
  deleteInvoice,
  getInvoiceById,
  invoiceService,
  listInvoices,
  updateInvoice
};

