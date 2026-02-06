-- CreateTable
CREATE TABLE "UserSignature" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "certificateFilename" TEXT NOT NULL,
    "encryptedContent" TEXT NOT NULL,
    "signaturePinHash" TEXT NOT NULL,
    "certificateSubject" TEXT,
    "certificateIssuer" TEXT,
    "certificateSerialNumber" TEXT,
    "certificateValidFrom" TIMESTAMP(3),
    "certificateValidUntil" TIMESTAMP(3),
    "keyAlgorithm" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending_verification',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSignature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignatureAudit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "invoiceId" TEXT,
    "documentNumber" TEXT,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT,
    "certificateUsed" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SignatureAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSignature_userId_key" ON "UserSignature"("userId");

-- CreateIndex
CREATE INDEX "UserSignature_status_idx" ON "UserSignature"("status");

-- CreateIndex
CREATE INDEX "UserSignature_certificateValidUntil_idx" ON "UserSignature"("certificateValidUntil");

-- CreateIndex
CREATE INDEX "SignatureAudit_userId_idx" ON "SignatureAudit"("userId");

-- CreateIndex
CREATE INDEX "SignatureAudit_action_idx" ON "SignatureAudit"("action");

-- CreateIndex
CREATE INDEX "SignatureAudit_invoiceId_idx" ON "SignatureAudit"("invoiceId");

-- CreateIndex
CREATE INDEX "SignatureAudit_status_idx" ON "SignatureAudit"("status");

-- CreateIndex
CREATE INDEX "SignatureAudit_createdAt_idx" ON "SignatureAudit"("createdAt");

-- AddForeignKey
ALTER TABLE "UserSignature" ADD CONSTRAINT "UserSignature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
