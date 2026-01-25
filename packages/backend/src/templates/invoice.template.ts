/**
 * Invoice HTML template generator for PDF rendering
 * Supports TEIF compliance with multi-language support (FR, EN, AR)
 */

import type { InvoiceResponse, InvoiceLine, AllowanceCharge } from '@teif/shared/types';

type Language = 'ar' | 'fr' | 'en';

interface InvoiceWithRelations extends Omit<InvoiceResponse, 'documentNumber' | 'invoiceDate' | 'dueDate'> {
  supplier: any;
  buyer: any;
  lines: (InvoiceLine & { allowances: AllowanceCharge[] })[];
  allowances: AllowanceCharge[];
  // Override required fields
  documentNumber: string;
  invoiceDate?: string | Date;
  dueDate?: string | Date;
  // Database fields that might not be in InvoiceResponse
  deliveryDate?: string | Date;
  currency?: string;
  ircAmount?: number;
  paymentMeans?: string;
  internalNotes?: string;
  contractReference?: string;
  orderReference?: string; // alias for internalNotes
  // Payment details (from individual fields)
  bankName?: string;
  bankCode?: string;
  bankRib?: string;
  bankAccountOwner?: string;
  checkNumber?: string;
  cardType?: string;
  cardReference?: string;
  postalAccountNumber?: string;
  postalAccountOwner?: string;
  ePaymentGateway?: string;
  ePaymentTransactionId?: string;
  otherPaymentDescription?: string;
  otherPaymentReference?: string;
  // Helper for payment details object
  paymentDetails?: {
    bankName?: string;
    rib?: string;
    accountOwner?: string;
    accountNumber?: string;
    gateway?: string;
    transactionId?: string;
    checkNumber?: string;
    cardType?: string;
    reference?: string;
    description?: string;
  };
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    invoice: 'Facture',
    invoiceDate: 'Date de la facture',
    dueDate: 'Échéance',
    deliveryDate: 'Date de livraison',
    supplier: 'Fournisseur',
    buyer: 'Acheteur',
    orderReference: 'Référence de commande',
    contractReference: 'Référence de contrat',
    deliveryNoteReference: 'Référence de bon de livraison',
    operationNature: 'Nature de l\'opération',
    currency: 'Devise',
    paymentMeans: 'Mode de paiement',
    itemCode: 'Code article',
    description: 'Description',
    quantity: 'Quantité',
    unit: 'Unité',
    unitPrice: 'Prix unitaire',
    discount: 'Remise %',
    taxRate: 'Taux TVA',
    fodec: 'FODEC',
    amount: 'Montant',
    lineTotal: 'Total ligne',
    taxAmount: 'Montant TVA',
    subtotal: 'Sous-total HT',
    totalHT: 'Total HT',
    totalTVA: 'Total TVA',
    stampDuty: 'Droit de timbre',
    irc: 'Retenue d\'IRC',
    totalTTC: 'Total TTC',
    amountInWords: 'Montant en toutes lettres',
    paymentDetails: 'Modalités de paiement',
    bankTransfer: 'Virement bancaire',
    bankName: 'Banque',
    rib: 'RIB',
    accountOwner: 'Titulaire du compte',
    postal: 'Postal',
    cash: 'Espèces',
    check: 'Chèque',
    checkNumber: 'Numéro de chèque',
    card: 'Carte',
    cardType: 'Type de carte',
    ePayment: 'Paiement électronique',
    gateway: 'Passerelle',
    transactionId: 'ID de transaction',
    other: 'Autre',
    reference: 'Référence',
    notes: 'Notes',
    pageOf: 'Page',
    generatedOn: 'Généré le',
  },
  en: {
    invoice: 'Invoice',
    invoiceDate: 'Invoice Date',
    dueDate: 'Due Date',
    deliveryDate: 'Delivery Date',
    supplier: 'Supplier',
    buyer: 'Buyer',
    orderReference: 'Order Reference',
    contractReference: 'Contract Reference',
    deliveryNoteReference: 'Delivery Note Reference',
    operationNature: 'Nature of Operation',
    currency: 'Currency',
    paymentMeans: 'Payment Method',
    itemCode: 'Item Code',
    description: 'Description',
    quantity: 'Quantity',
    unit: 'Unit',
    unitPrice: 'Unit Price',
    discount: 'Discount %',
    taxRate: 'Tax Rate',
    fodec: 'FODEC',
    amount: 'Amount',
    lineTotal: 'Line Total',
    taxAmount: 'Tax Amount',
    subtotal: 'Subtotal',
    totalHT: 'Total (excl. tax)',
    totalTVA: 'Total Tax',
    stampDuty: 'Stamp Duty',
    irc: 'IRC Withholding',
    totalTTC: 'Total',
    amountInWords: 'Amount in Words',
    paymentDetails: 'Payment Details',
    bankTransfer: 'Bank Transfer',
    bankName: 'Bank Name',
    rib: 'RIB',
    accountOwner: 'Account Owner',
    postal: 'Postal',
    cash: 'Cash',
    check: 'Check',
    checkNumber: 'Check Number',
    card: 'Card',
    cardType: 'Card Type',
    ePayment: 'E-Payment',
    gateway: 'Gateway',
    transactionId: 'Transaction ID',
    other: 'Other',
    reference: 'Reference',
    notes: 'Notes',
    pageOf: 'Page',
    generatedOn: 'Generated on',
  },
  ar: {
    invoice: 'فاتورة',
    invoiceDate: 'تاريخ الفاتورة',
    dueDate: 'تاريخ الاستحقاق',
    deliveryDate: 'تاريخ التسليم',
    supplier: 'المورد',
    buyer: 'المشتري',
    orderReference: 'مرجع الطلبية',
    contractReference: 'مرجع العقد',
    deliveryNoteReference: 'مرجع وثيقة الشحن',
    operationNature: 'طبيعة العملية',
    currency: 'العملة',
    paymentMeans: 'طريقة الدفع',
    itemCode: 'رمز العنصر',
    description: 'الوصف',
    quantity: 'الكمية',
    unit: 'الوحدة',
    unitPrice: 'سعر الوحدة',
    discount: 'خصم %',
    taxRate: 'معدل الضريبة',
    fodec: 'FODEC',
    amount: 'المبلغ',
    lineTotal: 'إجمالي السطر',
    taxAmount: 'مبلغ الضريبة',
    subtotal: 'الإجمالي الفرعي',
    totalHT: 'الإجمالي (بدون ضريبة)',
    totalTVA: 'إجمالي الضريبة',
    stampDuty: 'رسم الطابع',
    irc: 'استقطاع IRC',
    totalTTC: 'الإجمالي الكلي',
    amountInWords: 'المبلغ بالكلمات',
    paymentDetails: 'تفاصيل الدفع',
    bankTransfer: 'تحويل بنكي',
    bankName: 'اسم البنك',
    rib: 'RIB',
    accountOwner: 'صاحب الحساب',
    postal: 'بريدي',
    cash: 'نقدا',
    check: 'شيك',
    checkNumber: 'رقم الشيك',
    card: 'بطاقة',
    cardType: 'نوع البطاقة',
    ePayment: 'الدفع الإلكتروني',
    gateway: 'البوابة',
    transactionId: 'معرّف العملية',
    other: 'آخر',
    reference: 'مرجع',
    notes: 'ملاحظات',
    pageOf: 'صفحة',
    generatedOn: 'تم الإنشاء في',
  },
};

function t(key: string, language: Language): string {
  return translations[language][key] || key;
}

function formatDate(date: string | Date | undefined): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function formatCurrency(amount: number, currency: string = 'TND'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(amount);
}

/**
 * Convert number to French words (for amount in words section)
 * Handles numbers up to billions
 */
function numberToWordsFr(num: number): string {
  const ones = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix'];
  const scales = ['', 'mille', 'million', 'milliard'];

  if (num === 0) return 'zéro';
  if (num < 0) return 'moins ' + numberToWordsFr(-num);

  const parts: string[] = [];
  let scale = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      const chunkWords = convertHundreds(chunk, ones, tens);
      const scaleName = scales[scale] || '';
      parts.unshift((scaleName ? chunkWords + ' ' + scaleName : chunkWords).trim());
    }
    num = Math.floor(num / 1000);
    scale++;
  }

  return parts.join(' ').trim();

  function convertHundreds(n: number, ones: string[], tens: string[]): string {
    const result: string[] = [];
    const hundreds = Math.floor(n / 100);
    const remainder = n % 100;

    if (hundreds > 0) {
      result.push(ones[hundreds] + ' cent' + (hundreds > 1 ? 's' : ''));
    }

    if (remainder > 0) {
      if (remainder < 10) {
        result.push(ones[remainder]);
      } else if (remainder < 20) {
        result.push(['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'][remainder - 10]);
      } else {
        const t = Math.floor(remainder / 10);
        const o = remainder % 10;
        result.push(tens[t] + (o > 0 ? '-' + ones[o] : ''));
      }
    }

    return result.join(' ');
  }
}

function getPaymentMethodLabel(code: string, language: Language): string {
  const paymentMethods: Record<string, Record<Language, string>> = {
    'I-114': { fr: 'Virement bancaire', en: 'Bank Transfer', ar: 'تحويل بنكي' },
    'I-115': { fr: 'Postal', en: 'Postal', ar: 'بريدي' },
    'I-116': { fr: 'Espèces', en: 'Cash', ar: 'نقدا' },
    'I-117': { fr: 'Chèque', en: 'Check', ar: 'شيك' },
    'I-118': { fr: 'Carte bancaire', en: 'Card', ar: 'بطاقة' },
    'I-119': { fr: 'Paiement électronique', en: 'E-Payment', ar: 'الدفع الإلكتروني' },
    'I-120': { fr: 'Autre', en: 'Other', ar: 'آخر' },
  };

  return paymentMethods[code]?.[language] || code;
}

export function generateInvoiceHtml(
  invoice: InvoiceWithRelations,
  language: Language,
  qrCodeDataUrl: string
): string {
  const isRTL = language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';

  // Helper to get currency with fallback
  const getCurrency = (): string => invoice.currency || invoice.metadata?.currency || 'TND';
  const currency = getCurrency();
  const orderReference = invoice.orderReference || invoice.internalNotes;
  const contractReference = invoice.contractReference;
  const deliveryDate = invoice.deliveryDate;

  // Build payment details object from individual fields
  const buildPaymentDetails = () => invoice.paymentDetails || {
    bankName: invoice.bankName,
    rib: invoice.bankRib,
    accountOwner: invoice.bankAccountOwner || invoice.postalAccountOwner,
    accountNumber: invoice.postalAccountNumber,
    gateway: invoice.ePaymentGateway,
    transactionId: invoice.ePaymentTransactionId,
    checkNumber: invoice.checkNumber,
    cardType: invoice.cardType,
    reference: invoice.cardReference || invoice.otherPaymentReference,
    description: invoice.otherPaymentDescription,
  };

  const paymentDetailsValue = buildPaymentDetails();

  // Use ONLY stored totals from invoice record - NO CALCULATIONS
  const displayTotalHT = invoice.totalHT;
  const displayTotalTax = invoice.totalTVA;
  const displayTotalTTC = invoice.totalTTC;
  const displayStampDuty = invoice.stampDuty || 0;
  const displayIrcWithheld = invoice.ircAmount || 0;

  return `
<!DOCTYPE html>
<html dir="${dir}" lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${invoice.documentNumber}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    @page {
      size: A4;
      margin: 20mm 15mm;
    }

    body {
      font-family: Arial, sans-serif;
      font-size: 11px;
      line-height: 1.4;
      color: #333;
      direction: ${dir};
      text-align: ${textAlign};
    }

    .container {
      max-width: 210mm;
      margin: 0 auto;
      position: relative;
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
      border-bottom: 2px solid #333;
      padding-bottom: 15px;
    }

    .header-left {
      flex: 1;
    }

    .header-right {
      text-align: ${isRTL ? 'left' : 'right'};
      position: relative;
    }

    .qr-code {
      width: 60px;
      height: 60px;
    }

    .document-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .document-number {
      font-size: 16px;
      color: #666;
    }

    /* Partners Section */
    .partners {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
      page-break-inside: avoid;
    }

    ${isRTL ? '.partners { direction: rtl; }' : ''}

    .partner-block {
      border: 1px solid #ccc;
      padding: 10px;
      background-color: #f9f9f9;
    }

    .partner-title {
      font-weight: bold;
      margin-bottom: 8px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }

    .partner-field {
      margin-bottom: 4px;
      font-size: 10px;
    }

    .partner-label {
      font-weight: bold;
      display: inline-block;
      width: 80px;
    }

    /* References */
    .references {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      margin-bottom: 15px;
      page-break-inside: avoid;
    }

    .reference-item {
      border: 1px solid #ddd;
      padding: 8px;
      font-size: 10px;
    }

    .reference-label {
      font-weight: bold;
      color: #666;
    }

    /* Line Items Table */
    .lines-section {
      margin-bottom: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
    }

    th {
      background-color: #333;
      color: white;
      padding: 8px;
      text-align: ${textAlign};
      font-weight: bold;
      border: 1px solid #333;
    }

    td {
      padding: 8px;
      border: 1px solid #ddd;
      text-align: ${textAlign};
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    .number {
      text-align: right;
      direction: ltr;
    }

    .currency {
      text-align: right;
      direction: ltr;
      font-family: 'Courier New', monospace;
    }

    /* Totals Section */
    .totals-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
      page-break-inside: avoid;
    }

    .allowances {
      border: 1px solid #ddd;
      padding: 10px;
    }

    .allowance-row {
      display: grid;
      grid-template-columns: 1fr 150px;
      gap: 10px;
      padding: 5px;
      border-bottom: 1px solid #eee;
    }

    .totals-box {
      border: 2px solid #333;
      padding: 10px;
    }

    .total-row {
      display: grid;
      grid-template-columns: 1fr 150px;
      gap: 10px;
      padding: 5px;
      border-bottom: 1px solid #ddd;
    }

    .total-row.grand-total {
      border-top: 2px solid #333;
      border-bottom: 2px solid #333;
      font-weight: bold;
      font-size: 12px;
      background-color: #f0f0f0;
    }

    .total-label {
      font-weight: bold;
    }

    .total-amount {
      text-align: right;
      direction: ltr;
      font-family: 'Courier New', monospace;
    }

    /* Amount in Words */
    .amount-in-words {
      background-color: #f0f0f0;
      border: 1px solid #ddd;
      padding: 10px;
      margin-bottom: 15px;
      font-size: 11px;
      page-break-inside: avoid;
    }

    .amount-label {
      font-weight: bold;
      color: #666;
    }

    .amount-text {
      margin-top: 5px;
      text-transform: uppercase;
      font-weight: bold;
    }

    /* Payment Details */
    .payment-section {
      border: 1px solid #ddd;
      padding: 10px;
      margin-bottom: 15px;
      page-break-inside: avoid;
    }

    .payment-title {
      font-weight: bold;
      margin-bottom: 8px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }

    .payment-detail {
      margin-bottom: 5px;
      font-size: 10px;
    }

    /* Footer */
    .footer {
      border-top: 1px solid #ddd;
      padding-top: 10px;
      font-size: 9px;
      color: #666;
      text-align: center;
      margin-top: 20px;
    }

    /* Print styles */
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      .container {
        margin: 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <div class="document-title">${t('invoice', language)}</div>
        <div class="document-number">#${invoice.documentNumber}</div>
      </div>
      <div class="header-right">
        ${qrCodeDataUrl ? `<img src="${qrCodeDataUrl}" class="qr-code" alt="QR Code">` : ''}
      </div>
    </div>

    <!-- Invoice Dates -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
      <div>
        <strong>${t('invoiceDate', language)}:</strong> ${formatDate(invoice.invoiceDate)}
      </div>
      ${invoice.dueDate ? `<div><strong>${t('dueDate', language)}:</strong> ${formatDate(invoice.dueDate)}</div>` : ''}
      ${deliveryDate ? `<div><strong>${t('deliveryDate', language)}:</strong> ${formatDate(deliveryDate)}</div>` : ''}
    </div>

    <!-- Partners -->
    <div class="partners">
      <div class="partner-block">
        <div class="partner-title">${t('supplier', language)}</div>
        <div class="partner-field">
          <span class="partner-label">${t('supplier', language)}:</span>
          <strong>${invoice.supplier?.name || ''}</strong>
        </div>
        ${invoice.supplier?.idType ? `
        <div class="partner-field">
          <span class="partner-label">ID:</span>
          ${invoice.supplier.idType} ${invoice.supplier.idValue || ''}
        </div>
        ` : ''}
        ${invoice.supplier?.rc ? `
        <div class="partner-field">
          <span class="partner-label">RC:</span>
          ${invoice.supplier.rc}
        </div>
        ` : ''}
        ${invoice.supplier?.street ? `
        <div class="partner-field">
          ${invoice.supplier.street}
          ${invoice.supplier.postalCode ? `, ${invoice.supplier.postalCode}` : ''}
          ${invoice.supplier.city ? `, ${invoice.supplier.city}` : ''}
          ${invoice.supplier.country ? `, ${invoice.supplier.country}` : ''}
        </div>
        ` : ''}
        ${invoice.supplier?.phone ? `<div class="partner-field"><span class="partner-label">Tel:</span> ${invoice.supplier.phone}</div>` : ''}
        ${invoice.supplier?.email ? `<div class="partner-field"><span class="partner-label">Email:</span> ${invoice.supplier.email}</div>` : ''}
      </div>

      <div class="partner-block">
        <div class="partner-title">${t('buyer', language)}</div>
        <div class="partner-field">
          <span class="partner-label">${t('buyer', language)}:</span>
          <strong>${invoice.buyer?.name || ''}</strong>
        </div>
        ${invoice.buyer?.idType ? `
        <div class="partner-field">
          <span class="partner-label">ID:</span>
          ${invoice.buyer.idType} ${invoice.buyer.idValue || ''}
        </div>
        ` : ''}
        ${invoice.buyer?.rc ? `
        <div class="partner-field">
          <span class="partner-label">RC:</span>
          ${invoice.buyer.rc}
        </div>
        ` : ''}
        ${invoice.buyer?.street ? `
        <div class="partner-field">
          ${invoice.buyer.street}
          ${invoice.buyer.postalCode ? `, ${invoice.buyer.postalCode}` : ''}
          ${invoice.buyer.city ? `, ${invoice.buyer.city}` : ''}
          ${invoice.buyer.country ? `, ${invoice.buyer.country}` : ''}
        </div>
        ` : ''}
        ${invoice.buyer?.phone ? `<div class="partner-field"><span class="partner-label">Tel:</span> ${invoice.buyer.phone}</div>` : ''}
        ${invoice.buyer?.email ? `<div class="partner-field"><span class="partner-label">Email:</span> ${invoice.buyer.email}</div>` : ''}
      </div>
    </div>

    <!-- Line Items Table -->
    <div class="lines-section">
      <table>
        <thead>
          <tr>
            <th style="width: 10%;">${t('itemCode', language)}</th>
            <th style="width: 25%;">${t('description', language)}</th>
            <th style="width: 8%;" class="number">${t('quantity', language)}</th>
            <th style="width: 8%;" class="number">${t('unit', language)}</th>
            <th style="width: 12%;" class="currencyValue">${t('unitPrice', language)}</th>
            <th style="width: 8%;" class="number">${t('discount', language)}</th>
            <th style="width: 8%;" class="number">${t('taxRate', language)}</th>
            <th style="width: 6%;" class="number">FODEC</th>
            <th style="width: 15%;" class="currencyValue">${t('lineTotal', language)}</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.lines
            .map(
              (line) => `
            <tr>
              <td>${line.itemCode || ''}</td>
              <td>${line.description || ''}</td>
              <td class="number">${line.quantity.toFixed(3)}</td>
              <td class="number">${line.unit || ''}</td>
              <td class="currencyValue">${formatCurrency(line.unitPrice, currency)}</td>
              <td class="number">${line.discountRate?.toFixed(2) || '0.00'}%</td>
              <td class="number">${(line.taxRate * 100).toFixed(2)}%</td>
              <td class="number">${line.fodec ? 'X' : ''}</td>
              <td class="currencyValue">${formatCurrency(line.lineAmount, currency)}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>

    <!-- Totals Section -->
    <div class="totals-section">
      <!-- Allowances -->
      ${invoice.allowances && invoice.allowances.length > 0
        ? `
        <div class="allowances">
          <div style="font-weight: bold; margin-bottom: 10px;">${t('amount', language)}</div>
          ${invoice.allowances
            .map(
              (alc) => `
            <div class="allowance-row">
              <div>${alc.description || ''}</div>
              <div class="total-amount">${alc.type === 'charge' ? '+' : '-'} ${formatCurrency(alc.amount, currency)}</div>
            </div>
          `
            )
            .join('')}
        </div>
      `
        : '<div></div>'
      }

      <!-- Totals -->
      <div class="totals-box">
        <div class="total-row">
          <div class="total-label">${t('totalHT', language)}</div>
          <div class="total-amount">${formatCurrency(displayTotalHT, currency)}</div>
        </div>
        <div class="total-row">
          <div class="total-label">${t('totalTVA', language)}</div>
          <div class="total-amount">${formatCurrency(displayTotalTax, currency)}</div>
        </div>
        ${displayStampDuty > 0
          ? `
          <div class="total-row">
            <div class="total-label">${t('stampDuty', language)}</div>
            <div class="total-amount">${formatCurrency(displayStampDuty, currency)}</div>
          </div>
        `
          : ''
        }
        ${displayIrcWithheld > 0
          ? `
          <div class="total-row">
            <div class="total-label">${t('irc', language)}</div>
            <div class="total-amount">-${formatCurrency(displayIrcWithheld, currency)}</div>
          </div>
        `
          : ''
        }
        <div class="total-row grand-total">
          <div class="total-label">${t('totalTTC', language)}</div>
          <div class="total-amount">${formatCurrency(displayTotalTTC, currency)}</div>
        </div>
      </div>
    </div>

    <!-- Amount in Words -->
    <div class="amount-in-words">
      <div class="amount-label">${t('amountInWords', language)}:</div>
      <div class="amount-text">${numberToWordsFr(displayTotalTTC)} ${currency || 'TND'}</div>
    </div>

    <!-- Payment Details -->
    ${invoice.paymentMeans ? `
    <div class="payment-section">
      <div class="payment-title">${t('paymentDetails', language)}</div>
      
      ${invoice.paymentMeans === 'I-114' ? `
        <div class="payment-detail">
          <strong>${t('bankTransfer', language)}:</strong><br />
          ${paymentDetailsValue?.bankName ? `${t('bankName', language)}: ${paymentDetailsValue.bankName}<br />` : ''}
          ${paymentDetailsValue?.rib ? `RIB: ${paymentDetailsValue.rib}<br />` : ''}
          ${paymentDetailsValue?.accountOwner ? `${t('accountOwner', language)}: ${paymentDetailsValue.accountOwner}<br />` : ''}
        </div>
      ` : ''}

      ${invoice.paymentMeans === 'I-115' ? `
        <div class="payment-detail">
          <strong>${t('postal', language)}:</strong><br />
          ${paymentDetailsValue?.accountNumber ? `${t('reference', language)}: ${paymentDetailsValue.accountNumber}<br />` : ''}
          ${paymentDetailsValue?.accountOwner ? `${t('accountOwner', language)}: ${paymentDetailsValue.accountOwner}<br />` : ''}
        </div>
      ` : ''}

      ${invoice.paymentMeans === 'I-116' ? `
        <div class="payment-detail">
          <strong>${t('cash', language)}</strong>
        </div>
      ` : ''}

      ${invoice.paymentMeans === 'I-117' ? `
        <div class="payment-detail">
          <strong>${t('check', language)}:</strong><br />
          ${paymentDetailsValue?.checkNumber ? `${t('checkNumber', language)}: ${paymentDetailsValue.checkNumber}<br />` : ''}
        </div>
      ` : ''}

      ${invoice.paymentMeans === 'I-118' ? `
        <div class="payment-detail">
          <strong>${t('card', language)}:</strong><br />
          ${paymentDetailsValue?.cardType ? `${t('cardType', language)}: ${paymentDetailsValue.cardType}<br />` : ''}
          ${paymentDetailsValue?.reference ? `${t('reference', language)}: ${paymentDetailsValue.reference}<br />` : ''}
        </div>
      ` : ''}

      ${invoice.paymentMeans === 'I-119' ? `
        <div class="payment-detail">
          <strong>${t('ePayment', language)}:</strong><br />
          ${paymentDetailsValue?.gateway ? `${t('gateway', language)}: ${paymentDetailsValue.gateway}<br />` : ''}
          ${paymentDetailsValue?.transactionId ? `${t('transactionId', language)}: ${paymentDetailsValue.transactionId}<br />` : ''}
        </div>
      ` : ''}

      ${invoice.paymentMeans === 'I-120' ? `
        <div class="payment-detail">
          <strong>${t('other', language)}:</strong><br />
          ${paymentDetailsValue?.description ? `${paymentDetailsValue.description}<br />` : ''}
          ${paymentDetailsValue?.reference ? `${t('reference', language)}: ${paymentDetailsValue.reference}<br />` : ''}
        </div>
      ` : ''}
    </div>
    ` : ''}

    <!-- Order/Contract/Delivery References -->
    ${(orderReference || contractReference || deliveryDate) ? `
    <div class="references">
      ${orderReference ? `
      <div class="reference-item">
        <div class="reference-label">${t('orderReference', language)}:</div>
        <div>${orderReference}</div>
      </div>
      ` : ''}
      ${contractReference ? `
      <div class="reference-item">
        <div class="reference-label">${t('contractReference', language)}:</div>
        <div>${contractReference}</div>
      </div>
      ` : ''}
      ${invoice.externalNotes ? `
      <div class="reference-item">
        <div class="reference-label">${t('deliveryNoteReference', language)}:</div>
        <div>${invoice.externalNotes}</div>
      </div>
      ` : ''}
    </div>
    ` : ''}

    <!-- Footer -->
    <div class="footer">
      <p>${t('generatedOn', language)}: ${formatDate(new Date())}</p>
    </div>
  </div>
</body>
</html>
  `;
}

export const invoiceTemplateService = {
  generateInvoiceHtml,
};

