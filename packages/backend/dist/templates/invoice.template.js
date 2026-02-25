import { amountToWords } from "@teif/shared/utils";
const translations = {
  fr: {
    invoice: "Facture",
    invoiceDate: "Date de la facture",
    dueDate: "\xC9ch\xE9ance",
    deliveryDate: "Date de livraison",
    supplier: "Fournisseur",
    buyer: "Acheteur",
    orderReference: "R\xE9f\xE9rence de commande",
    contractReference: "R\xE9f\xE9rence de contrat",
    deliveryNoteReference: "R\xE9f\xE9rence de bon de livraison",
    operationNature: "Nature de l'op\xE9ration",
    currency: "Devise",
    paymentMeans: "Mode de paiement",
    itemCode: "Code article",
    description: "Description",
    quantity: "Quantit\xE9",
    unit: "Unit\xE9",
    unitPrice: "Prix unitaire",
    discount: "Remise %",
    taxRate: "Taux TVA",
    fodec: "FODEC",
    amount: "Montant",
    lineTotal: "Total ligne",
    taxAmount: "Montant TVA",
    subtotal: "Sous-total HT",
    totalHT: "Total HT",
    totalTVA: "Total TVA",
    stampDuty: "Droit de timbre",
    irc: "Retenue d'IRC",
    totalTTC: "Total TTC",
    amountInWords: "Montant en toutes lettres",
    paymentDetails: "Modalit\xE9s de paiement",
    bankTransfer: "Virement bancaire",
    bankName: "Banque",
    rib: "RIB",
    accountOwner: "Titulaire du compte",
    postal: "Postal",
    cash: "Esp\xE8ces",
    check: "Ch\xE8que",
    checkNumber: "Num\xE9ro de ch\xE8que",
    card: "Carte",
    cardType: "Type de carte",
    ePayment: "Paiement \xE9lectronique",
    gateway: "Passerelle",
    transactionId: "ID de transaction",
    other: "Autre",
    reference: "R\xE9f\xE9rence",
    notes: "Notes",
    pageOf: "Page",
    generatedOn: "G\xE9n\xE9r\xE9 le"
  },
  en: {
    invoice: "Invoice",
    invoiceDate: "Invoice Date",
    dueDate: "Due Date",
    deliveryDate: "Delivery Date",
    supplier: "Supplier",
    buyer: "Buyer",
    orderReference: "Order Reference",
    contractReference: "Contract Reference",
    deliveryNoteReference: "Delivery Note Reference",
    operationNature: "Nature of Operation",
    currency: "Currency",
    paymentMeans: "Payment Method",
    itemCode: "Item Code",
    description: "Description",
    quantity: "Quantity",
    unit: "Unit",
    unitPrice: "Unit Price",
    discount: "Discount %",
    taxRate: "Tax Rate",
    fodec: "FODEC",
    amount: "Amount",
    lineTotal: "Line Total",
    taxAmount: "Tax Amount",
    subtotal: "Subtotal",
    totalHT: "Total (excl. tax)",
    totalTVA: "Total Tax",
    stampDuty: "Stamp Duty",
    irc: "IRC Withholding",
    totalTTC: "Total",
    amountInWords: "Amount in Words",
    paymentDetails: "Payment Details",
    bankTransfer: "Bank Transfer",
    bankName: "Bank Name",
    rib: "RIB",
    accountOwner: "Account Owner",
    postal: "Postal",
    cash: "Cash",
    check: "Check",
    checkNumber: "Check Number",
    card: "Card",
    cardType: "Card Type",
    ePayment: "E-Payment",
    gateway: "Gateway",
    transactionId: "Transaction ID",
    other: "Other",
    reference: "Reference",
    notes: "Notes",
    pageOf: "Page",
    generatedOn: "Generated on"
  },
  ar: {
    invoice: "\u0641\u0627\u062A\u0648\u0631\u0629",
    invoiceDate: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629",
    dueDate: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642",
    deliveryDate: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0633\u0644\u064A\u0645",
    supplier: "\u0627\u0644\u0645\u0648\u0631\u062F",
    buyer: "\u0627\u0644\u0645\u0634\u062A\u0631\u064A",
    orderReference: "\u0645\u0631\u062C\u0639 \u0627\u0644\u0637\u0644\u0628\u064A\u0629",
    contractReference: "\u0645\u0631\u062C\u0639 \u0627\u0644\u0639\u0642\u062F",
    deliveryNoteReference: "\u0645\u0631\u062C\u0639 \u0648\u062B\u064A\u0642\u0629 \u0627\u0644\u0634\u062D\u0646",
    operationNature: "\u0637\u0628\u064A\u0639\u0629 \u0627\u0644\u0639\u0645\u0644\u064A\u0629",
    currency: "\u0627\u0644\u0639\u0645\u0644\u0629",
    paymentMeans: "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639",
    itemCode: "\u0631\u0645\u0632 \u0627\u0644\u0639\u0646\u0635\u0631",
    description: "\u0627\u0644\u0648\u0635\u0641",
    quantity: "\u0627\u0644\u0643\u0645\u064A\u0629",
    unit: "\u0627\u0644\u0648\u062D\u062F\u0629",
    unitPrice: "\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629",
    discount: "\u062E\u0635\u0645 %",
    taxRate: "\u0645\u0639\u062F\u0644 \u0627\u0644\u0636\u0631\u064A\u0628\u0629",
    fodec: "FODEC",
    amount: "\u0627\u0644\u0645\u0628\u0644\u063A",
    lineTotal: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0633\u0637\u0631",
    taxAmount: "\u0645\u0628\u0644\u063A \u0627\u0644\u0636\u0631\u064A\u0628\u0629",
    subtotal: "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0641\u0631\u0639\u064A",
    totalHT: "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A (\u0628\u062F\u0648\u0646 \u0636\u0631\u064A\u0628\u0629)",
    totalTVA: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0636\u0631\u064A\u0628\u0629",
    stampDuty: "\u0631\u0633\u0645 \u0627\u0644\u0637\u0627\u0628\u0639",
    irc: "\u0627\u0633\u062A\u0642\u0637\u0627\u0639 IRC",
    totalTTC: "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0643\u0644\u064A",
    amountInWords: "\u0627\u0644\u0645\u0628\u0644\u063A \u0628\u0627\u0644\u0643\u0644\u0645\u0627\u062A",
    paymentDetails: "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0641\u0639",
    bankTransfer: "\u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u0643\u064A",
    bankName: "\u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u0643",
    rib: "RIB",
    accountOwner: "\u0635\u0627\u062D\u0628 \u0627\u0644\u062D\u0633\u0627\u0628",
    postal: "\u0628\u0631\u064A\u062F\u064A",
    cash: "\u0646\u0642\u062F\u0627",
    check: "\u0634\u064A\u0643",
    checkNumber: "\u0631\u0642\u0645 \u0627\u0644\u0634\u064A\u0643",
    card: "\u0628\u0637\u0627\u0642\u0629",
    cardType: "\u0646\u0648\u0639 \u0627\u0644\u0628\u0637\u0627\u0642\u0629",
    ePayment: "\u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
    gateway: "\u0627\u0644\u0628\u0648\u0627\u0628\u0629",
    transactionId: "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0639\u0645\u0644\u064A\u0629",
    other: "\u0622\u062E\u0631",
    reference: "\u0645\u0631\u062C\u0639",
    notes: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A",
    pageOf: "\u0635\u0641\u062D\u0629",
    generatedOn: "\u062A\u0645 \u0627\u0644\u0625\u0646\u0634\u0627\u0621 \u0641\u064A"
  }
};
function t(key, language) {
  return translations[language][key] || key;
}
function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}
function formatCurrency(amount, currency = "TND") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(amount);
}
function numberToWordsFr(num) {
  const ones = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
  const tens = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingts", "quatre-vingt-dix"];
  const scales = ["", "mille", "million", "milliard"];
  if (num === 0) return "z\xE9ro";
  if (num < 0) return "moins " + numberToWordsFr(-num);
  const parts = [];
  let scale = 0;
  while (num > 0) {
    const chunk = num % 1e3;
    if (chunk !== 0) {
      const chunkWords = convertHundreds(chunk, ones, tens);
      const scaleName = scales[scale] || "";
      parts.unshift((scaleName ? chunkWords + " " + scaleName : chunkWords).trim());
    }
    num = Math.floor(num / 1e3);
    scale++;
  }
  return parts.join(" ").trim();
  function convertHundreds(n, ones2, tens2) {
    const result = [];
    const hundreds = Math.floor(n / 100);
    const remainder = n % 100;
    if (hundreds > 0) {
      result.push(ones2[hundreds] + " cent" + (hundreds > 1 ? "s" : ""));
    }
    if (remainder > 0) {
      if (remainder < 10) {
        result.push(ones2[remainder]);
      } else if (remainder < 20) {
        result.push(["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"][remainder - 10]);
      } else {
        const t2 = Math.floor(remainder / 10);
        const o = remainder % 10;
        result.push(tens2[t2] + (o > 0 ? "-" + ones2[o] : ""));
      }
    }
    return result.join(" ");
  }
}
function getPaymentMethodLabel(code, language) {
  const paymentMethods = {
    "I-114": { fr: "Virement bancaire", en: "Bank Transfer", ar: "\u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u0643\u064A" },
    "I-115": { fr: "Postal", en: "Postal", ar: "\u0628\u0631\u064A\u062F\u064A" },
    "I-116": { fr: "Esp\xE8ces", en: "Cash", ar: "\u0646\u0642\u062F\u0627" },
    "I-117": { fr: "Ch\xE8que", en: "Check", ar: "\u0634\u064A\u0643" },
    "I-118": { fr: "Carte bancaire", en: "Card", ar: "\u0628\u0637\u0627\u0642\u0629" },
    "I-119": { fr: "Paiement \xE9lectronique", en: "E-Payment", ar: "\u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" },
    "I-120": { fr: "Autre", en: "Other", ar: "\u0622\u062E\u0631" }
  };
  return paymentMethods[code]?.[language] || code;
}
function generateInvoiceHtml(invoice, language, qrCodeDataUrl) {
  console.log("[PDF] generateInvoiceHtml: language param =", language, "invoice.amountLanguage =", invoice.amountLanguage);
  const isRTL = language === "ar";
  const dir = isRTL ? "rtl" : "ltr";
  const textAlign = isRTL ? "right" : "left";
  const getCurrency = () => invoice.currency || invoice.metadata?.currency || "TND";
  const currency = getCurrency();
  const orderReference = invoice.orderReference || invoice.internalNotes;
  const contractReference = invoice.contractReference;
  const deliveryDate = invoice.deliveryDate;
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
    description: invoice.otherPaymentDescription
  };
  const paymentDetailsValue = buildPaymentDetails();
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
      text-align: ${isRTL ? "left" : "right"};
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

    ${isRTL ? ".partners { direction: rtl; }" : ""}

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
        <div class="document-title">${t("invoice", language)}</div>
        <div class="document-number">#${invoice.documentNumber}</div>
      </div>
      <div class="header-right">
        ${qrCodeDataUrl ? `<img src="${qrCodeDataUrl}" class="qr-code" alt="QR Code">` : ""}
      </div>
    </div>

    <!-- Invoice Dates -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
      <div>
        <strong>${t("invoiceDate", language)}:</strong> ${formatDate(invoice.invoiceDate)}
      </div>
      ${invoice.dueDate ? `<div><strong>${t("dueDate", language)}:</strong> ${formatDate(invoice.dueDate)}</div>` : ""}
      ${deliveryDate ? `<div><strong>${t("deliveryDate", language)}:</strong> ${formatDate(deliveryDate)}</div>` : ""}
    </div>

    <!-- Partners -->
    <div class="partners">
      <div class="partner-block">
        <div class="partner-title">${t("supplier", language)}</div>
        <div class="partner-field">
          <span class="partner-label">${t("supplier", language)}:</span>
          <strong>${invoice.supplier?.name || ""}</strong>
        </div>
        ${invoice.supplier?.idType ? `
        <div class="partner-field">
          <span class="partner-label">ID:</span>
          ${invoice.supplier.idType} ${invoice.supplier.idValue || ""}
        </div>
        ` : ""}
        ${invoice.supplier?.rc ? `
        <div class="partner-field">
          <span class="partner-label">RC:</span>
          ${invoice.supplier.rc}
        </div>
        ` : ""}
        ${invoice.supplier?.street ? `
        <div class="partner-field">
          ${invoice.supplier.street}
          ${invoice.supplier.postalCode ? `, ${invoice.supplier.postalCode}` : ""}
          ${invoice.supplier.city ? `, ${invoice.supplier.city}` : ""}
          ${invoice.supplier.country ? `, ${invoice.supplier.country}` : ""}
        </div>
        ` : ""}
        ${invoice.supplier?.phone ? `<div class="partner-field"><span class="partner-label">Tel:</span> ${invoice.supplier.phone}</div>` : ""}
        ${invoice.supplier?.email ? `<div class="partner-field"><span class="partner-label">Email:</span> ${invoice.supplier.email}</div>` : ""}
      </div>

      <div class="partner-block">
        <div class="partner-title">${t("buyer", language)}</div>
        <div class="partner-field">
          <span class="partner-label">${t("buyer", language)}:</span>
          <strong>${invoice.buyer?.name || ""}</strong>
        </div>
        ${invoice.buyer?.idType ? `
        <div class="partner-field">
          <span class="partner-label">ID:</span>
          ${invoice.buyer.idType} ${invoice.buyer.idValue || ""}
        </div>
        ` : ""}
        ${invoice.buyer?.rc ? `
        <div class="partner-field">
          <span class="partner-label">RC:</span>
          ${invoice.buyer.rc}
        </div>
        ` : ""}
        ${invoice.buyer?.street ? `
        <div class="partner-field">
          ${invoice.buyer.street}
          ${invoice.buyer.postalCode ? `, ${invoice.buyer.postalCode}` : ""}
          ${invoice.buyer.city ? `, ${invoice.buyer.city}` : ""}
          ${invoice.buyer.country ? `, ${invoice.buyer.country}` : ""}
        </div>
        ` : ""}
        ${invoice.buyer?.phone ? `<div class="partner-field"><span class="partner-label">Tel:</span> ${invoice.buyer.phone}</div>` : ""}
        ${invoice.buyer?.email ? `<div class="partner-field"><span class="partner-label">Email:</span> ${invoice.buyer.email}</div>` : ""}
      </div>
    </div>

    <!-- Line Items Table -->
    <div class="lines-section">
      <table>
        <thead>
          <tr>
            <th style="width: 10%;">${t("itemCode", language)}</th>
            <th style="width: 25%;">${t("description", language)}</th>
            <th style="width: 8%;" class="number">${t("quantity", language)}</th>
            <th style="width: 8%;" class="number">${t("unit", language)}</th>
            <th style="width: 12%;" class="currencyValue">${t("unitPrice", language)}</th>
            <th style="width: 8%;" class="number">${t("discount", language)}</th>
            <th style="width: 8%;" class="number">${t("taxRate", language)}</th>
            <th style="width: 6%;" class="number">FODEC</th>
            <th style="width: 15%;" class="currencyValue">${t("lineTotal", language)}</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.lines.map(
    (line) => `
            <tr>
              <td>${line.itemCode || ""}</td>
              <td>${line.description || ""}</td>
              <td class="number">${line.quantity.toFixed(3)}</td>
              <td class="number">${line.unit || ""}</td>
              <td class="currencyValue">${formatCurrency(line.unitPrice, currency)}</td>
              <td class="number">${line.discountRate?.toFixed(2) || "0.00"}%</td>
              <td class="number">${(line.taxRate * 100).toFixed(2)}%</td>
              <td class="number">${line.fodec ? "X" : ""}</td>
              <td class="currencyValue">${formatCurrency(line.lineAmount, currency)}</td>
            </tr>
          `
  ).join("")}
        </tbody>
      </table>
    </div>

    <!-- Totals Section -->
    <div class="totals-section">
      <!-- Allowances -->
      ${invoice.allowances && invoice.allowances.length > 0 ? `
        <div class="allowances">
          <div style="font-weight: bold; margin-bottom: 10px;">${t("amount", language)}</div>
          ${invoice.allowances.map(
    (alc) => `
            <div class="allowance-row">
              <div>${alc.description || ""}</div>
              <div class="total-amount">${alc.type === "charge" ? "+" : "-"} ${formatCurrency(alc.amount, currency)}</div>
            </div>
          `
  ).join("")}
        </div>
      ` : "<div></div>"}

      <!-- Totals -->
      <div class="totals-box">
        <div class="total-row">
          <div class="total-label">${t("totalHT", language)}</div>
          <div class="total-amount">${formatCurrency(displayTotalHT, currency)}</div>
        </div>
        <div class="total-row">
          <div class="total-label">${t("totalTVA", language)}</div>
          <div class="total-amount">${formatCurrency(displayTotalTax, currency)}</div>
        </div>
        ${displayStampDuty > 0 ? `
          <div class="total-row">
            <div class="total-label">${t("stampDuty", language)}</div>
            <div class="total-amount">${formatCurrency(displayStampDuty, currency)}</div>
          </div>
        ` : ""}
        ${displayIrcWithheld > 0 ? `
          <div class="total-row">
            <div class="total-label">${t("irc", language)}</div>
            <div class="total-amount">-${formatCurrency(displayIrcWithheld, currency)}</div>
          </div>
        ` : ""}
        <div class="total-row grand-total">
          <div class="total-label">${t("totalTTC", language)}</div>
          <div class="total-amount">${formatCurrency(displayTotalTTC, currency)}</div>
        </div>
      </div>
    </div>

    <!-- Amount in Words -->
    <div class="amount-in-words">
      <div class="amount-label">${t("amountInWords", language)}:</div>
      <div class="amount-text">${amountToWords(displayTotalTTC, invoice.amountLanguage || "fr")} ${currency || "TND"}</div>
    </div>

    <!-- Payment Details -->
    ${invoice.paymentMeans ? `
    <div class="payment-section">
      <div class="payment-title">${t("paymentDetails", language)}</div>
      
      ${invoice.paymentMeans === "I-114" ? `
        <div class="payment-detail">
          <strong>${t("bankTransfer", language)}:</strong><br />
          ${paymentDetailsValue?.bankName ? `${t("bankName", language)}: ${paymentDetailsValue.bankName}<br />` : ""}
          ${paymentDetailsValue?.rib ? `RIB: ${paymentDetailsValue.rib}<br />` : ""}
          ${paymentDetailsValue?.accountOwner ? `${t("accountOwner", language)}: ${paymentDetailsValue.accountOwner}<br />` : ""}
        </div>
      ` : ""}

      ${invoice.paymentMeans === "I-115" ? `
        <div class="payment-detail">
          <strong>${t("postal", language)}:</strong><br />
          ${paymentDetailsValue?.accountNumber ? `${t("reference", language)}: ${paymentDetailsValue.accountNumber}<br />` : ""}
          ${paymentDetailsValue?.accountOwner ? `${t("accountOwner", language)}: ${paymentDetailsValue.accountOwner}<br />` : ""}
        </div>
      ` : ""}

      ${invoice.paymentMeans === "I-116" ? `
        <div class="payment-detail">
          <strong>${t("cash", language)}</strong>
        </div>
      ` : ""}

      ${invoice.paymentMeans === "I-117" ? `
        <div class="payment-detail">
          <strong>${t("check", language)}:</strong><br />
          ${paymentDetailsValue?.checkNumber ? `${t("checkNumber", language)}: ${paymentDetailsValue.checkNumber}<br />` : ""}
        </div>
      ` : ""}

      ${invoice.paymentMeans === "I-118" ? `
        <div class="payment-detail">
          <strong>${t("card", language)}:</strong><br />
          ${paymentDetailsValue?.cardType ? `${t("cardType", language)}: ${paymentDetailsValue.cardType}<br />` : ""}
          ${paymentDetailsValue?.reference ? `${t("reference", language)}: ${paymentDetailsValue.reference}<br />` : ""}
        </div>
      ` : ""}

      ${invoice.paymentMeans === "I-119" ? `
        <div class="payment-detail">
          <strong>${t("ePayment", language)}:</strong><br />
          ${paymentDetailsValue?.gateway ? `${t("gateway", language)}: ${paymentDetailsValue.gateway}<br />` : ""}
          ${paymentDetailsValue?.transactionId ? `${t("transactionId", language)}: ${paymentDetailsValue.transactionId}<br />` : ""}
        </div>
      ` : ""}

      ${invoice.paymentMeans === "I-120" ? `
        <div class="payment-detail">
          <strong>${t("other", language)}:</strong><br />
          ${paymentDetailsValue?.description ? `${paymentDetailsValue.description}<br />` : ""}
          ${paymentDetailsValue?.reference ? `${t("reference", language)}: ${paymentDetailsValue.reference}<br />` : ""}
        </div>
      ` : ""}
    </div>
    ` : ""}

    <!-- Order/Contract/Delivery References -->
    ${orderReference || contractReference || deliveryDate ? `
    <div class="references">
      ${orderReference ? `
      <div class="reference-item">
        <div class="reference-label">${t("orderReference", language)}:</div>
        <div>${orderReference}</div>
      </div>
      ` : ""}
      ${contractReference ? `
      <div class="reference-item">
        <div class="reference-label">${t("contractReference", language)}:</div>
        <div>${contractReference}</div>
      </div>
      ` : ""}
      ${invoice.externalNotes ? `
      <div class="reference-item">
        <div class="reference-label">${t("deliveryNoteReference", language)}:</div>
        <div>${invoice.externalNotes}</div>
      </div>
      ` : ""}
    </div>
    ` : ""}

    <!-- Footer -->
    <div class="footer">
      <p>${t("generatedOn", language)}: ${formatDate(/* @__PURE__ */ new Date())}</p>
    </div>
  </div>
</body>
</html>
  `;
}
const invoiceTemplateService = {
  generateInvoiceHtml
};
export {
  generateInvoiceHtml,
  invoiceTemplateService
};
