/**
 * Script to regenerate XML for all invoices
 * This is useful when XML generation logic changes
 * Run with: npx ts-node src/scripts/regenerate-xml.ts
 */

import { prisma } from '../lib/prisma';
import { xmlGeneratorService } from '../services/xmlGenerator.service';
import { invoiceCalculationsService } from '../services/invoiceCalculations.service';

async function regenerateXml() {
  try {
    console.log('Starting XML regeneration...');

    // Get all invoices
    const invoices = await prisma.invoice.findMany({
      include: {
        lines: true,
        supplier: true,
        buyer: true,
        allowances: true,
      },
    });

    console.log(`Found ${invoices.length} invoices to process`);

    for (const invoice of invoices) {
      try {
        // Prepare data for XML generation
        const invoiceData = {
          documentNumber: invoice.documentNumber,
          documentType: invoice.documentType,
          invoiceDate: invoice.invoiceDate.toISOString().split('T')[0],
          dueDate: invoice.dueDate?.toISOString().split('T')[0],
          deliveryDate: invoice.deliveryDate?.toISOString().split('T')[0],
          dispatchDate: invoice.dispatchDate?.toISOString().split('T')[0],
          paymentDate: invoice.paymentDate?.toISOString().split('T')[0],
          signatureDate: invoice.signatureDate,
          periodStart: invoice.periodStart?.toISOString().split('T')[0],
          periodEnd: invoice.periodEnd?.toISOString().split('T')[0],
          currency: invoice.currency,
          supplier: invoice.supplier,
          buyer: invoice.buyer,
          lines: invoice.lines,
          globalDiscount: invoice.globalDiscount || 0,
          stampDuty: invoice.stampDuty || 0,
          paymentMeans: invoice.paymentMeans,
          totalHt: invoice.totalHT,
          totalTva: invoice.totalTVA,
          totalTtc: invoice.totalTTC,
          orderReference: invoice.orderReference,
          contractReference: invoice.contractReference,
          deliveryNoteReference: invoice.deliveryNoteReference,
          ttnReference: invoice.ttnReference,
          bankName: invoice.bankName,
          bankCode: invoice.bankCode,
          bankRib: invoice.bankRib,
          bankAccountOwner: invoice.bankAccountOwner,
          checkNumber: invoice.checkNumber,
          cardType: invoice.cardType,
          cardLast4: invoice.cardLast4,
          cardReference: invoice.cardReference,
          postalAccountNumber: invoice.postalAccountNumber,
          postalAccountOwner: invoice.postalAccountOwner,
          postalBranchCode: invoice.postalBranchCode,
          postalServiceName: invoice.postalServiceName,
          ePaymentGateway: invoice.ePaymentGateway,
          ePaymentTransactionId: invoice.ePaymentTransactionId,
          otherPaymentDescription: invoice.otherPaymentDescription,
          otherPaymentReference: invoice.otherPaymentReference,
          ircRate: invoice.ircRate,
          qrCodeEnabled: invoice.qrCodeEnabled,
          qrCodeContent: invoice.qrCodeContent,
        };

        // Generate new XML with escaping
        const newXml = xmlGeneratorService.generateInvoiceXml(invoiceData as any);

        // Update invoice
        await prisma.invoice.update({
          where: { id: invoice.id },
          data: { xmlContent: newXml },
        });

        console.log(`✓ Regenerated XML for invoice ${invoice.id}`);
      } catch (error) {
        console.error(`✗ Error regenerating XML for invoice ${invoice.id}:`, error);
      }
    }

    console.log('XML regeneration completed!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

regenerateXml();
