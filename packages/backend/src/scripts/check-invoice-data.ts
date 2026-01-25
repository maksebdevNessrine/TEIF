import { prisma } from '../lib/prisma';

/**
 * Check and fix invoices that might be missing proper supplier/buyer relations
 * This script helps diagnose and repair data integrity issues
 */
async function checkInvoiceData() {
  console.log('📋 Checking invoice data integrity...\n');

  // Check the specific invoice
  const specificInvoice = await prisma.invoice.findFirst({
    where: {
      id: 'cmktzzyqe000adn38q8tfn2l4'
    },
    include: {
      supplier: true,
      buyer: true
    }
  });

  if (specificInvoice) {
    console.log('=== SPECIFIC INVOICE ===');
    console.log('Invoice ID:', specificInvoice.id);
    console.log('Document Number:', specificInvoice.documentNumber);
    console.log('Supplier ID:', specificInvoice.supplierId);
    console.log('Supplier Full Object:', JSON.stringify(specificInvoice.supplier, null, 2));
    console.log('Buyer ID:', specificInvoice.buyerId);
    console.log('Buyer Full Object:', JSON.stringify(specificInvoice.buyer, null, 2));
  } else {
    console.log('⚠️ Invoice not found!');
  }

  console.log('\n=== ALL INVOICES ===');
  const invoices = await prisma.invoice.findMany({
    include: {
      supplier: true,
      buyer: true,
      user: {
        select: { email: true }
      }
    },
    take: 5
  });

  for (const invoice of invoices) {
    console.log(`\nInvoice: ${invoice.documentNumber} (${invoice.id})`);
    console.log(`  User: ${invoice.user?.email}`);
    console.log(`  Supplier: ${invoice.supplier?.name} (ID: ${invoice.supplierId})`);
    console.log(`  Buyer: ${invoice.buyer?.name} (ID: ${invoice.buyerId})`);
  }
}

checkInvoiceData()
  .catch(console.error)
  .finally(() => process.exit(0));
