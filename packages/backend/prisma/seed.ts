import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Utility function to generate realistic test data
const generateRandomReference = (prefix: string): string => {
  return `${prefix}-2024-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`;
};

const generateRandomIban = (): string => {
  return Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 10)
  ).join('');
};

const generateRandomRib = (): string => {
  return Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 10)
  ).join('');
};

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean up existing data (optional - comment out to preserve data)
  console.log('🗑️  Cleaning up existing data...');
  await prisma.allowanceCharge.deleteMany({});
  await prisma.invoiceLine.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.refreshToken.deleteMany({});
  await prisma.partner.deleteMany({});
  await prisma.user.deleteMany({});

  // ============================================
  // 1. CREATE USERS
  // ============================================
  console.log('👤 Creating test users...');

  const hashedPassword1 = await bcrypt.hash('Test123!', 12);
  const hashedPassword2 = await bcrypt.hash('Demo123!', 12);

  const user1 = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      passwordHash: hashedPassword1,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      name: 'Demo User',
      passwordHash: hashedPassword2,
    },
  });

  console.log(`✅ Created users: ${user1.email}, ${user2.email}`);

  // ============================================
  // 2. CREATE PARTNERS (Suppliers & Buyers)
  // ============================================
  console.log('🏢 Creating test partners...');

  // Suppliers
  const supplier1 = await prisma.partner.create({
    data: {
      idType: 'I-01',
      idValue: '1234567XAM000',
      name: 'Global Tech Solutions',
      street: '123 Tech Street',
      city: 'Tunis',
      postalCode: '1002',
      country: 'TN',
      rc: 'B1234567890',
      capital: '50.000,000 TND',
      phone: '+216 71 123 456',
      email: 'contact@globaltech.tn',
    },
  });

  const supplier2 = await prisma.partner.create({
    data: {
      idType: 'I-04',
      idValue: '7654321XAM000',
      name: 'International Export Co.',
      street: '456 Export Avenue',
      city: 'Sfax',
      postalCode: '3000',
      country: 'TN',
      rc: 'B9876543210',
      capital: '100.000,000 TND',
      phone: '+216 74 456 789',
      email: 'sales@intlexport.tn',
    },
  });

  // Buyers
  const buyer1 = await prisma.partner.create({
    data: {
      idType: 'I-02',
      idValue: '01234567',
      name: 'Ahmed Ben Ali',
      street: '789 Business Plaza',
      city: 'Sousse',
      postalCode: '4000',
      country: 'TN',
      phone: '+216 73 789 012',
      email: 'ahmed@business.tn',
    },
  });

  const buyer2 = await prisma.partner.create({
    data: {
      idType: 'I-03',
      idValue: 'AA123456',
      name: 'Fatima Khaled',
      street: '321 Commerce Street',
      city: 'Gabès',
      postalCode: '6000',
      country: 'TN',
      phone: '+216 75 321 654',
      email: 'fatima@merchant.tn',
    },
  });

  console.log(`✅ Created 2 suppliers and 2 buyers`);

  // ============================================
  // 3. CREATE INVOICES WITH LINES & ALLOWANCES
  // ============================================
  console.log('📄 Creating test invoices...');

  const invoiceData = [];
  const documentTypes = ['I-11', 'I-12', 'I-13', 'I-15'];
  const paymentMethods = [
    'I-114', // Wire transfer
    'I-116', // Cash
    'I-117', // Check
    'I-118', // Card
  ];

  for (let i = 0; i < 15; i++) {
    const invoiceDate = new Date();
    invoiceDate.setDate(invoiceDate.getDate() - Math.random() * 180); // Last 6 months

    const documentType =
      documentTypes[Math.floor(Math.random() * documentTypes.length)];
    const paymentMeans =
      paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const isSupplier1 = Math.random() > 0.5;
    const user = i < 8 ? user1 : user2;

    const invoice = await prisma.invoice.create({
      data: {
        documentType,
        documentNumber: `INV-2024-${(i + 1).toString().padStart(5, '0')}`,
        invoiceDate,
        dueDate: new Date(invoiceDate.getTime() + 30 * 24 * 60 * 60 * 1000),
        deliveryDate: new Date(invoiceDate.getTime() - 2 * 24 * 60 * 60 * 1000),
        dispatchDate: new Date(invoiceDate.getTime() - 3 * 24 * 60 * 60 * 1000),
        paymentDate:
          Math.random() > 0.7
            ? new Date(invoiceDate.getTime() + 15 * 24 * 60 * 60 * 1000)
            : null,
        signatureDate: `${invoiceDate
          .getDate()
          .toString()
          .padStart(2, '0')}${(invoiceDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}${invoiceDate
          .getFullYear()
          .toString()
          .slice(-2)}1430`,
        otherDate:
          Math.random() > 0.8
            ? new Date(invoiceDate.getTime() + 7 * 24 * 60 * 60 * 1000)
            : null,
        periodStart:
          Math.random() > 0.7
            ? invoiceDate
            : null,
        periodEnd:
          Math.random() > 0.7
            ? new Date(invoiceDate.getTime() + 30 * 24 * 60 * 60 * 1000)
            : null,
        operationNature: ['OP-SUPPLY', 'OP-DELIVERY', 'OP-IMPORT', 'OP-EXPORT', 'OP-CASH', 'OP-RECEIPT'][
          Math.floor(Math.random() * 6)
        ],
        currency: 'TND',
        userId: user.id,
        supplierId: isSupplier1 ? supplier1.id : supplier2.id,
        buyerId: Math.random() > 0.5 ? buyer1.id : buyer2.id,
        paymentMeans,
        orderReference:
          Math.random() > 0.6 ? generateRandomReference('PO') : null,
        contractReference:
          Math.random() > 0.7 ? generateRandomReference('CTR') : null,
        deliveryNoteReference:
          Math.random() > 0.8 ? generateRandomReference('DN') : null,
        ttnReference: Math.random() > 0.9 ? generateRandomReference('TTN') : null,
        globalDiscount: Math.random() > 0.8 ? Math.random() * 100 : 0,
        stampDuty: Math.random() > 0.7 ? 1.0 : 0.5,
        status: ['draft', 'finalized', 'sent', 'paid'][
          Math.floor(Math.random() * 4)
        ],
        // Payment details
        bankName:
          paymentMeans === 'I-114' ? 'Banque de Tunisie' : null,
        bankCode: paymentMeans === 'I-114' ? '01' : null,
        bankRib: paymentMeans === 'I-114' ? generateRandomRib() : null,
        bankAccountOwner:
          paymentMeans === 'I-114' ? isSupplier1 ? supplier1.name : supplier2.name : null,
        checkNumber:
          paymentMeans === 'I-117'
            ? `CHK-${Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, '0')}`
            : null,
        cardType:
          paymentMeans === 'I-118'
            ? ['VISA', 'MASTERCARD', 'AMEX'][Math.floor(Math.random() * 3)]
            : null,
        cardLast4:
          paymentMeans === 'I-118'
            ? Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, '0')
            : null,
        cardReference:
          paymentMeans === 'I-118'
            ? `AUTH${Math.random().toString(36).substring(7).toUpperCase()}`
            : null,
        // IRC
        ircRate: Math.random() > 0.7 ? Math.random() * 0.1 : null,
        ircAmount: null, // Calculated after creation
        // QR Code
        qrCodeEnabled: Math.random() > 0.7,
        // Totals (will be calculated)
        totalHT: 0,
        totalTVA: 0,
        totalTTC: 0,
        xmlContent: '<xml></xml>',
        // Metadata JSON
        metadata: {
          createdBy: user.email,
          notes: `Invoice for ${isSupplier1 ? supplier1.name : supplier2.name}`,
          tags: Math.random() > 0.5 ? ['important'] : [],
          internalReference: `INT-REF-${i + 1}`,
          customFields: {
            department: 'Sales',
            project: `Project-${Math.floor(Math.random() * 5) + 1}`,
          },
        },
      },
    });

    invoiceData.push({
      invoice,
      user,
      supplier: isSupplier1 ? supplier1 : supplier2,
    });
  }

  console.log(`✅ Created 15 invoices`);

  // ============================================
  // 4. CREATE INVOICE LINES
  // ============================================
  console.log('📋 Creating invoice lines...');

  const units = [
    'UNIT',
    'KG',
    'H',
    'M2',
    'M',
    'M3',
    'L',
    'TON',
    'KWH',
  ];
  const descriptions = [
    'Software Development Services',
    'Hardware Components',
    'Consulting Services',
    'Training Materials',
    'Installation Labor',
    'Maintenance Services',
    'Support Services',
    'Licensing Fees',
    'Materials & Supplies',
    'IT Equipment',
  ];

  let lineCount = 0;
  for (const { invoice } of invoiceData) {
    const lineCount_ = Math.floor(Math.random() * 4) + 2; // 2-5 lines per invoice

    let invoiceTotal = 0;
    let invoiceTVA = 0;

    for (let j = 0; j < lineCount_; j++) {
      const quantity = Math.floor(Math.random() * 100) + 1;
      const unitPrice = Math.random() * 1000 + 50;
      const discountRate = Math.random() > 0.8 ? Math.random() * 20 : 0;
      const taxRates = [0, 0.07, 0.13, 0.19];
      const taxRate =
        taxRates[Math.floor(Math.random() * taxRates.length)];
      const fodec = Math.random() > 0.7;

      const lineAmount = quantity * unitPrice * (1 - discountRate / 100);
      const fodecAmount = fodec ? lineAmount * 0.01 : 0;
      const taxAmount =
        (lineAmount + fodecAmount) * taxRate;
      const totalAmount = lineAmount + fodecAmount + taxAmount;

      invoiceTotal += lineAmount;
      invoiceTVA += taxAmount;

      await prisma.invoiceLine.create({
        data: {
          invoiceId: invoice.id,
          itemCode: `ITEM-${j + 1}`,
          description:
            descriptions[
              Math.floor(Math.random() * descriptions.length)
            ],
          quantity,
          unit: units[Math.floor(Math.random() * units.length)],
          unitPrice,
          discountRate,
          taxRate,
          fodec,
          exemptionReason:
            taxRate === 0 ? 'Non-taxable service' : null,
          lineAmount,
          taxAmount,
          totalAmount,
        },
      });

      // Add line-level allowances/charges (0-1 per line)
      if (Math.random() > 0.7) {
        const lineAllowanceCodes = ['I-151', 'I-152', 'I-153', 'I-154', 'I-155'];
        const selectedLine = await prisma.invoiceLine.findFirst({
          where: { invoiceId: invoice.id },
          orderBy: { createdAt: 'desc' },
        });

        if (selectedLine) {
          await prisma.allowanceCharge.create({
            data: {
              lineId: selectedLine.id,
              type: Math.random() > 0.6 ? 'allowance' : 'charge',
              code: lineAllowanceCodes[Math.floor(Math.random() * lineAllowanceCodes.length)],
              description: Math.random() > 0.5 ? 'Line-level discount' : 'Additional handling charge',
              amount: Math.random() * 25,
              basedOn: 'line',
            },
          });
        }
      }

      lineCount++;
    }

    // Create 1-2 allowances/charges per invoice
    if (Math.random() > 0.6) {
      await prisma.allowanceCharge.create({
        data: {
          invoiceId: invoice.id,
          type: 'allowance',
          code: 'I-153',
          description: 'Discount for bulk purchase',
          amount: Math.random() * 50,
          basedOn: 'invoice',
        },
      });
    }

    // Update invoice totals
    const globalDiscount = invoice.globalDiscount || 0;
    const netTotal = invoiceTotal - globalDiscount;
    const totalTTC = netTotal + invoiceTVA + invoice.stampDuty;

    await prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        totalHT: invoiceTotal,
        totalTVA: invoiceTVA,
        totalTTC,
      },
    });
  }

  console.log(`✅ Created ${lineCount} invoice lines`);

  // ============================================
  // 5. SUMMARY
  // ============================================
  console.log('\n✨ Database seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Users: 2`);
  console.log(`   - Partners: 4 (2 suppliers, 2 buyers)`);
  console.log(`   - Invoices: 15`);
  console.log(`   - Invoice Lines: ${lineCount}`);
  console.log(`   - Allowances/Charges: Several`);
  console.log('\n🔐 Test Credentials:');
  console.log(`   - Email: test@example.com, Password: Test123!`);
  console.log(`   - Email: demo@example.com, Password: Demo123!`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
