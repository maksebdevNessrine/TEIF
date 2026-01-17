-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "metadata" SET DATA TYPE JSON;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationCode" TEXT,
ADD COLUMN     "verificationCodeExpires" TIMESTAMP(3);

-- RenameIndex
ALTER INDEX "Invoice_documentNumber_gin_idx" RENAME TO "Invoice_documentNumber_idx";

-- RenameIndex
ALTER INDEX "InvoiceLine_description_gin_idx" RENAME TO "InvoiceLine_description_idx";

-- RenameIndex
ALTER INDEX "Partner_name_gin_idx" RENAME TO "Partner_name_idx";
