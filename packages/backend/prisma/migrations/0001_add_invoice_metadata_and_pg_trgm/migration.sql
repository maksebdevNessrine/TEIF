-- Enable pg_trgm extension for full-text search with GIN indexes
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- CreateTable User
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable RefreshToken
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable Partner
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "idType" TEXT NOT NULL,
    "idValue" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addressDescription" TEXT,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "rc" TEXT,
    "capital" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "partnerType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable Invoice
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3),
    "deliveryDate" TIMESTAMP(3),
    "dispatchDate" TIMESTAMP(3),
    "paymentDate" TIMESTAMP(3),
    "signatureDate" TEXT,
    "otherDate" TIMESTAMP(3),
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),
    "operationNature" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TND',
    "orderReference" TEXT,
    "contractReference" TEXT,
    "deliveryNoteReference" TEXT,
    "userId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "globalDiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stampDuty" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "ttnReference" TEXT,
    "paymentMeans" TEXT NOT NULL,
    "bankName" TEXT,
    "bankCode" TEXT,
    "bankRib" TEXT,
    "bankAccountOwner" TEXT,
    "checkNumber" TEXT,
    "cardType" TEXT,
    "cardLast4" TEXT,
    "cardReference" TEXT,
    "postalAccountNumber" TEXT,
    "postalAccountOwner" TEXT,
    "postalBranchCode" TEXT,
    "postalServiceName" TEXT,
    "ePaymentGateway" TEXT,
    "ePaymentTransactionId" TEXT,
    "otherPaymentDescription" TEXT,
    "otherPaymentReference" TEXT,
    "ircRate" DOUBLE PRECISION,
    "ircAmount" DOUBLE PRECISION,
    "ircExemptionReason" TEXT,
    "qrCodeEnabled" BOOLEAN NOT NULL DEFAULT false,
    "qrCodeContent" TEXT,
    "amountDescriptionOverride" TEXT,
    "xmlContent" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "totalHT" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalTVA" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalTTC" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deletedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable InvoiceLine
CREATE TABLE "InvoiceLine" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "itemCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "discountRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxRate" DOUBLE PRECISION NOT NULL,
    "fodec" BOOLEAN NOT NULL DEFAULT false,
    "exemptionReason" TEXT,
    "lineAmount" DOUBLE PRECISION NOT NULL,
    "taxAmount" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvoiceLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable AllowanceCharge
CREATE TABLE "AllowanceCharge" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "basedOn" TEXT,
    "invoiceId" TEXT,
    "lineId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AllowanceCharge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex - User
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex - RefreshToken
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");
CREATE INDEX "RefreshToken_expiresAt_idx" ON "RefreshToken"("expiresAt");

-- CreateIndex - Partner
CREATE UNIQUE INDEX "Partner_idType_idValue_key" ON "Partner"("idType", "idValue");
CREATE INDEX "Partner_email_idx" ON "Partner"("email");
CREATE INDEX "Partner_name_gin_idx" ON "Partner" USING GIN ("name" gin_trgm_ops);

-- CreateIndex - Invoice
CREATE UNIQUE INDEX "Invoice_documentNumber_key" ON "Invoice"("documentNumber");
CREATE INDEX "Invoice_userId_idx" ON "Invoice"("userId");
CREATE INDEX "Invoice_supplierId_idx" ON "Invoice"("supplierId");
CREATE INDEX "Invoice_buyerId_idx" ON "Invoice"("buyerId");
CREATE INDEX "Invoice_invoiceDate_idx" ON "Invoice"("invoiceDate");
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");
CREATE INDEX "Invoice_totalTTC_idx" ON "Invoice"("totalTTC");
CREATE INDEX "Invoice_deletedAt_idx" ON "Invoice"("deletedAt");
CREATE INDEX "Invoice_documentType_idx" ON "Invoice"("documentType");
CREATE INDEX "Invoice_documentNumber_gin_idx" ON "Invoice" USING GIN ("documentNumber" gin_trgm_ops);

-- CreateIndex - InvoiceLine
CREATE INDEX "InvoiceLine_invoiceId_idx" ON "InvoiceLine"("invoiceId");
CREATE INDEX "InvoiceLine_description_gin_idx" ON "InvoiceLine" USING GIN ("description" gin_trgm_ops);

-- CreateIndex - AllowanceCharge
CREATE INDEX "AllowanceCharge_invoiceId_idx" ON "AllowanceCharge"("invoiceId");
CREATE INDEX "AllowanceCharge_lineId_idx" ON "AllowanceCharge"("lineId");
CREATE INDEX "AllowanceCharge_type_idx" ON "AllowanceCharge"("type");

-- AddForeignKey - RefreshToken
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey - Invoice
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey - InvoiceLine
ALTER TABLE "InvoiceLine" ADD CONSTRAINT "InvoiceLine_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey - AllowanceCharge
ALTER TABLE "AllowanceCharge" ADD CONSTRAINT "AllowanceCharge_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AllowanceCharge" ADD CONSTRAINT "AllowanceCharge_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES "InvoiceLine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
