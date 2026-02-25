import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { invoiceService } from "../services/invoice.service.js";
import { pdfService } from "../services/pdf.service.js";
import { authMiddleware } from "../middleware/auth.js";
import { InvoiceCreateApiSchema, InvoiceUpdateApiSchema } from "../schemas/invoice-dto.js";
const invoiceRoutes = new Hono();
invoiceRoutes.use("*", authMiddleware);
invoiceRoutes.post(
  "/",
  zValidator("json", InvoiceCreateApiSchema),
  async (c) => {
    const user = c.get("user");
    const validatedData = c.req.valid("json");
    const invoice = await invoiceService.createInvoice(user.userId, validatedData);
    return c.json({ success: true, data: invoice }, 201);
  }
);
invoiceRoutes.get("/:id", async (c) => {
  const user = c.get("user");
  const invoiceId = c.req.param("id");
  const invoice = await invoiceService.getInvoiceById(user.userId, invoiceId);
  console.log("\u{1F4E6} API Response for invoice", invoiceId, {
    supplierId: invoice.supplierId,
    supplierName: invoice.supplier?.name,
    buyerId: invoice.buyerId,
    buyerName: invoice.buyer?.name
  });
  return c.json({ success: true, data: invoice }, 200);
});
invoiceRoutes.put(
  "/:id",
  zValidator("json", InvoiceUpdateApiSchema),
  async (c) => {
    const user = c.get("user");
    const invoiceId = c.req.param("id");
    const validatedData = c.req.valid("json");
    const invoice = await invoiceService.updateInvoice(user.userId, invoiceId, validatedData);
    return c.json({ success: true, data: invoice }, 200);
  }
);
invoiceRoutes.delete("/:id", async (c) => {
  const user = c.get("user");
  const invoiceId = c.req.param("id");
  await invoiceService.deleteInvoice(user.userId, invoiceId);
  return c.json({ success: true, message: "Invoice deleted" }, 200);
});
invoiceRoutes.get("/", async (c) => {
  const user = c.get("user");
  const queryParams = {
    page: c.req.query("page") ? Number(c.req.query("page")) : 1,
    limit: c.req.query("limit") ? Number(c.req.query("limit")) : 20,
    search: c.req.query("search"),
    dateFrom: c.req.query("dateFrom"),
    dateTo: c.req.query("dateTo"),
    documentType: c.req.query("documentType"),
    minAmount: c.req.query("minAmount") ? Number(c.req.query("minAmount")) : void 0,
    maxAmount: c.req.query("maxAmount") ? Number(c.req.query("maxAmount")) : void 0,
    status: c.req.query("status"),
    sortBy: c.req.query("sortBy"),
    sortOrder: c.req.query("sortOrder")
  };
  const result = await invoiceService.listInvoices(user.userId, queryParams);
  return c.json({ success: true, data: result }, 200);
});
invoiceRoutes.get("/:id/pdf", async (c) => {
  const user = c.get("user");
  const invoiceId = c.req.param("id");
  const language = c.req.query("language") || "fr";
  if (!["ar", "fr", "en"].includes(language)) {
    return c.json(
      { success: false, error: "Invalid language" },
      400
    );
  }
  const { buffer, fromCache } = await pdfService.getOrGeneratePdf(
    invoiceId,
    user.userId,
    { language }
  );
  c.header("Content-Type", "application/pdf");
  c.header("Content-Disposition", `inline; filename="invoice-${invoiceId}.pdf"`);
  c.header("X-PDF-Cache", fromCache ? "hit" : "miss");
  return c.body(buffer);
});
invoiceRoutes.get("/:id/xml", async (c) => {
  const user = c.get("user");
  const invoiceId = c.req.param("id");
  const invoice = await invoiceService.getInvoiceById(user.userId, invoiceId);
  c.header("Content-Type", "application/xml; charset=utf-8");
  c.header("Content-Disposition", `attachment; filename="invoice-${invoiceId}.xml"`);
  return c.body(invoice.xmlContent);
});
var invoices_default = invoiceRoutes;
export {
  invoices_default as default
};

