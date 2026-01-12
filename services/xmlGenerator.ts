
import { InvoiceData, Partner, DOCUMENT_TYPES, PAYMENT_MEANS } from '../types';

const formatTtnDate = (dateStr: string | undefined): string => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}${month}${year.slice(-2)}`;
};

/**
 * Validates Tunisian RIB using MOD 97 Checksum
 */
export const validateRib = (rib: string): boolean => {
  if (!/^\d{20}$/.test(rib)) return false;
  const bigNum = BigInt(rib.substring(0, 18)) * 100n;
  const remainder = Number(bigNum % 97n);
  const calculatedKey = 97 - remainder;
  const key = parseInt(rib.substring(18, 20));
  return calculatedKey === key || (calculatedKey === 97 && key === 0);
};

export const generateQrString = (data: InvoiceData, totalTtc: number, totalTva: number): string => {
  const date = data.invoiceDate.replace(/-/g, '');
  return `${data.supplier.idValue}|${data.documentNumber}|${date}|${totalTtc.toFixed(3)}|${totalTva.toFixed(3)}`;
};

/**
 * Converts a number to French words specifically for Tunisian Dinars (3 decimals)
 */
export const numberToLettersFr = (total: number): string => {
  const units = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
  const teens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
  const tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];

  const convertBase = (n: number): string => {
    if (n === 0) return "";
    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) {
      const q = Math.floor(n / 10);
      const r = n % 10;
      if (r === 0) return tens[q];
      if (r === 1 && q < 8) return tens[q] + " et un";
      return tens[q] + "-" + units[r];
    }
    if (n < 1000) {
      const q = Math.floor(n / 100);
      const r = n % 100;
      if (q === 1) return "cent " + convertBase(r);
      return units[q] + " cent " + convertBase(r);
    }
    return "";
  };

  const convertLarge = (n: number): string => {
    if (n === 0) return "zéro";
    const billions = Math.floor(n / 1000000000);
    const millions = Math.floor((n % 1000000000) / 1000000);
    const thousands = Math.floor((n % 1000000) / 1000);
    const remainder = Math.floor(n % 1000);

    let res = "";
    if (billions > 0) res += convertBase(billions) + " milliard" + (billions > 1 ? "s " : " ");
    if (millions > 0) res += convertBase(millions) + " million" + (millions > 1 ? "s " : " ");
    if (thousands > 0) {
      if (thousands === 1) res += "mille ";
      else res += convertBase(thousands) + " mille ";
    }
    if (remainder > 0) res += convertBase(remainder);
    return res.trim();
  };

  const integerPart = Math.floor(total);
  const decimalPart = Math.round((total - integerPart) * 1000);

  let result = convertLarge(integerPart) + " dinar" + (integerPart > 1 ? "s" : "");
  if (decimalPart > 0) {
    result += " et " + convertLarge(decimalPart) + " millime" + (decimalPart > 1 ? "s" : "");
  }

  return "ARRÊTÉ LA PRÉSENTE FACTURE À LA SOMME DE : " + result.toUpperCase();
};

const renderPartner = (partner: Partner, role: string) => {
  const isBusiness = partner.idType === 'I-01' || partner.idType === 'I-04';
  return `
      <PartnerDetails functionCode="${role}">
        <Nad>
          <PartnerIdentifier type="${partner.idType}">${partner.idValue}</PartnerIdentifier>
          <PartnerName nameType="Qualification">${partner.name}</PartnerName>
          <PartnerAdresses lang="fr">
            <AdressDescription>${partner.addressDescription || ''}</AdressDescription>
            <Street>${partner.street || ''}</Street>
            <CityName>${partner.city || ''}</CityName>
            <PostalCode>${partner.postalCode || ''}</PostalCode>
            <Country codeList="ISO_3166-1">${partner.country}</Country>
          </PartnerAdresses>
        </Nad>
        ${isBusiness && partner.rc ? `<RffSection><Reference refID="I-815">${partner.rc}</Reference></RffSection>` : ''}
        ${isBusiness && partner.capital ? `<RffSection><Reference refID="I-816">${partner.capital}</Reference></RffSection>` : ''}
        <CtaSection>
          <Contact functionCode="I-94"><ContactName>${partner.name}</ContactName></Contact>
          ${partner.phone ? `<Communication><ComMeansType>I-101</ComMeansType><ComAdress>${partner.phone}</ComAdress></Communication>` : ''}
          ${partner.email ? `<Communication><ComMeansType>I-103</ComMeansType><ComAdress>${partner.email}</ComAdress></Communication>` : ''}
        </CtaSection>
      </PartnerDetails>`;
};

export const generateTeifXml = (data: InvoiceData, minify: boolean = false): string => {
  const lineDetails = data.lines.map(line => {
    const grossHt = line.quantity * line.unitPrice;
    const discount = grossHt * (line.discountRate / 100);
    const netHt = grossHt - discount;
    const fodec = line.fodec ? netHt * 0.01 : 0;
    const tvaBase = netHt + fodec;
    const tva = tvaBase * line.taxRate;
    return { ...line, netHt, discount, fodec, tva, tvaBase };
  });

  const subtotalNetHt = lineDetails.reduce((s, l) => s + l.netHt, 0);
  
  // Calculate global discount (can be rendered as I-153 allowance)
  const globalAllowanceAmount = data.globalDiscount || 0;
  
  // Calculate invoice-level allowances impact
  const invoiceLevelAllowances = data.allowances?.filter(a => a.basedOn !== 'line') || [];
  const invoiceAllowancesAmount = invoiceLevelAllowances
    .filter(a => a.type === 'allowance')
    .reduce((s, a) => s + a.amount, 0);
  const invoiceChargesAmount = invoiceLevelAllowances
    .filter(a => a.type === 'charge')
    .reduce((s, a) => s + a.amount, 0);
  
  // Calculate net amount after all allowances
  const totalNetHt = subtotalNetHt - globalAllowanceAmount - invoiceAllowancesAmount + invoiceChargesAmount;
  const totalFodec = lineDetails.reduce((s, l) => s + l.fodec, 0);
  
  const taxSummaries = lineDetails.reduce((acc, l) => {
    const rate = l.taxRate;
    if (!acc[rate]) acc[rate] = { base: 0, amount: 0, justification: l.exemptionReason };
    acc[rate].base += l.tvaBase;
    acc[rate].amount += l.tva;
    return acc;
  }, {} as Record<number, { base: number, amount: number, justification?: string }>);

  const totalTva = Object.values(taxSummaries).reduce((s, t) => s + t.amount, 0);
  const totalIrc = data.ircRate && data.ircRate > 0 ? (totalNetHt + totalFodec + totalTva) * (data.ircRate / 100) : 0;
  const totalTtc = totalNetHt + totalFodec + totalTva + (data.stampDuty || 0) - totalIrc;
  
  const amountLetters = data.amountDescriptionOverride || numberToLettersFr(totalTtc);

  const linesXml = lineDetails.map((l, index) => `
      <Lin>
        <ItemIdentifier>${index + 1}</ItemIdentifier>
        <LinImd lang="fr">
          <ItemCode>${l.itemCode}</ItemCode>
          <ItemDescription>${l.description}</ItemDescription>
        </LinImd>
        <LinQty>
          <Quantity measurementUnit="${l.unit}">${l.quantity.toFixed(3)}</Quantity>
        </LinQty>
        <LinTax>
          <TaxTypeName code="I-1602">TVA</TaxTypeName>
          <TaxDetails><TaxRate>${(l.taxRate * 100).toFixed(1)}</TaxRate></TaxDetails>
          ${l.taxRate === 0 && l.exemptionReason ? `<TaxExemptionReference>${l.exemptionReason}</TaxExemptionReference>` : ''}
        </LinTax>
        ${l.fodec ? `<LinTax><TaxTypeName code="I-162">FODEC</TaxTypeName><TaxDetails><TaxRate>1.0</TaxRate></TaxDetails></LinTax>` : ''}
        <LinMoa>
          <MoaDetails><Moa amountTypeCode="I-183" currencyCodeList="ISO_4217"><Amount currencyIdentifier="${data.currency}">${l.unitPrice.toFixed(3)}</Amount></Moa></MoaDetails>
          <MoaDetails><Moa amountTypeCode="I-171" currencyCodeList="ISO_4217"><Amount currencyIdentifier="${data.currency}">${l.netHt.toFixed(3)}</Amount></Moa></MoaDetails>
        </LinMoa>
      </Lin>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<TEIF controlingAgency="TTN" version="1.8.8">
  <InvoiceHeader>
    <MessageSenderIdentifier type="${data.supplier.idType}">${data.supplier.idValue}</MessageSenderIdentifier>
    <MessageRecieverIdentifier type="${data.buyer.idType}">${data.buyer.idValue}</MessageRecieverIdentifier>
  </InvoiceHeader>
  <InvoiceBody>
    <Bgm>
      <DocumentIdentifier>${data.documentNumber}</DocumentIdentifier>
      <DocumentType code="${data.documentType}">${DOCUMENT_TYPES[data.documentType]}</DocumentType>
    </Bgm>
    <Dtm>
      <DateText format="ddMMyy" functionCode="I-31">${formatTtnDate(data.invoiceDate)}</DateText>
      ${data.dueDate ? `<DateText format="ddMMyy" functionCode="I-32">${formatTtnDate(data.dueDate)}</DateText>` : ''}
      ${data.deliveryDate ? `<DateText format="ddMMyy" functionCode="I-33">${formatTtnDate(data.deliveryDate)}</DateText>` : ''}
      ${data.dispatchDate ? `<DateText format="ddMMyy" functionCode="I-34">${formatTtnDate(data.dispatchDate)}</DateText>` : ''}
      ${data.paymentDate ? `<DateText format="ddMMyy" functionCode="I-35">${formatTtnDate(data.paymentDate)}</DateText>` : ''}
      ${data.periodStart && data.periodEnd ? `<DateText format="ddMMyy-ddMMyy" functionCode="I-36">${formatTtnDate(data.periodStart)}-${formatTtnDate(data.periodEnd)}</DateText>` : ''}
      ${data.signatureDate ? `<DateText format="ddMMyyHHmm" functionCode="I-37">${data.signatureDate}</DateText>` : ''}
      ${data.otherDate ? `<DateText format="ddMMyy" functionCode="I-38">${formatTtnDate(data.otherDate)}</DateText>` : ''}
    </Dtm>
    <PartnerSection>
      ${renderPartner(data.supplier, 'I-62')}
      ${renderPartner(data.buyer, 'I-64')}
    </PartnerSection>
    <PytSection>
      <PytSectionDetails>
        <Pyt>
          <PaymentTearmsTypeCode>${data.paymentMeans}</PaymentTearmsTypeCode>
          <PaymentTearmsDescription>${PAYMENT_MEANS[data.paymentMeans]}</PaymentTearmsDescription>
        </Pyt>
        ${data.bankRib ? `
        <PytFii functionCode="I-141">
          <AccountHolder><AccountNumber>${data.bankRib}</AccountNumber></AccountHolder>
          <InstitutionIdentification>
            ${data.bankCode ? `<InstitutionIdentifier>${data.bankCode}</InstitutionIdentifier>` : ''}
            <InstitutionName>${data.bankName || 'BANK'}</InstitutionName>
          </InstitutionIdentification>
        </PytFii>` : ''}
      </PytSectionDetails>
    </PytSection>
    <RffSection>
      ${data.orderReference ? `<Reference refID="I-81">${data.orderReference}</Reference>` : ''}
      ${data.contractReference ? `<Reference refID="I-82">${data.contractReference}</Reference>` : ''}
      ${data.deliveryNoteReference ? `<Reference refID="I-83">${data.deliveryNoteReference}</Reference>` : ''}
    </RffSection>
    <LinSection>${linesXml}</LinSection>
    ${globalAllowanceAmount > 0 || invoiceLevelAllowances.length > 0 ? `<InvoiceAlc>
      ${globalAllowanceAmount > 0 ? `<Alc><AlcDetails><AllowanceChargeCode>I-153</AllowanceChargeCode><AllowanceChargeReasonCode>Discount</AllowanceChargeReasonCode></AlcDetails><AlcMonetaryAmount currencyCodeList="ISO_4217"><Moa amountTypeCode="I-176" currencyCodeList="ISO_4217"><Amount currencyIdentifier="${data.currency}">${globalAllowanceAmount.toFixed(3)}</Amount></Moa></AlcMonetaryAmount></Alc>` : ''}
      ${invoiceLevelAllowances.map(alc => `<Alc><AlcDetails><AllowanceChargeCode>${alc.code}</AllowanceChargeCode><AllowanceChargeReasonCode>${alc.description}</AllowanceChargeReasonCode></AlcDetails><AlcMonetaryAmount currencyCodeList="ISO_4217"><Moa amountTypeCode="${alc.type === 'allowance' ? 'I-176' : 'I-174'}" currencyCodeList="ISO_4217"><Amount currencyIdentifier="${data.currency}">${alc.amount.toFixed(3)}</Amount></Moa></AlcMonetaryAmount></Alc>`).join('')}
    </InvoiceAlc>` : ''}
    <InvoiceMoa>
      <AmountDetails><Moa amountTypeCode="I-176" currencyCodeList="ISO_4217"><Amount currencyIdentifier="${data.currency}">${totalNetHt.toFixed(3)}</Amount></Moa></AmountDetails>
      <AmountDetails><Moa amountTypeCode="I-180" currencyCodeList="ISO_4217"><Amount currencyIdentifier="${data.currency}">${totalTtc.toFixed(3)}</Amount><AmountDescription lang="fr">${amountLetters}</AmountDescription></Moa></AmountDetails>
    </InvoiceMoa>
    <InvoiceTax>
      <InvoiceTaxDetails><Tax><TaxTypeName code="I-1601">droit de timbre</TaxTypeName><TaxDetails><TaxRate>0.0</TaxRate></TaxDetails></Tax><AmountDetails><Moa amountTypeCode="I-178" currencyCodeList="ISO_4217"><Amount currencyIdentifier="${data.currency}">${data.stampDuty.toFixed(3)}</Amount></Moa></AmountDetails></InvoiceTaxDetails>
      ${totalFodec > 0 ? `<InvoiceTaxDetails><Tax><TaxTypeName code="I-1603">FODEC</TaxTypeName><TaxDetails><TaxRate>1.0</TaxRate></TaxDetails></Tax><AmountDetails><Moa amountTypeCode="I-178" currencyCodeList="ISO_4217"><Amount currencyIdentifier="${data.currency}">${totalFodec.toFixed(3)}</Amount></Moa></AmountDetails></InvoiceTaxDetails>` : ''}
      ${totalIrc > 0 ? `<InvoiceTaxDetails><Tax><TaxTypeName code="I-1604">IRC Withholding</TaxTypeName><TaxDetails><TaxRate>${(data.ircRate || 0).toFixed(1)}</TaxRate></TaxDetails></Tax><AmountDetails><Moa amountTypeCode="I-178" currencyCodeList="ISO_4217"><Amount currencyIdentifier="${data.currency}">${totalIrc.toFixed(3)}</Amount></Moa></AmountDetails></InvoiceTaxDetails>` : ''}
      ${Object.entries(taxSummaries).map(([rate, s]) => `
      <InvoiceTaxDetails>
        <Tax><TaxTypeName code="I-1602">TVA</TaxTypeName><TaxDetails><TaxRate>${(parseFloat(rate) * 100).toFixed(1)}</TaxRate></TaxDetails>${parseFloat(rate) === 0 && s.justification ? `<TaxExemptionReference>${s.justification}</TaxExemptionReference>` : ''}</Tax>
        <AmountDetails><Moa amountTypeCode="I-177" currencyCodeList="ISO_4217"><Amount currencyIdentifier="${data.currency}">${s.base.toFixed(3)}</Amount></Moa></AmountDetails>
        <AmountDetails><Moa amountTypeCode="I-178" currencyCodeList="ISO_4217"><Amount currencyIdentifier="${data.currency}">${s.amount.toFixed(3)}</Amount></Moa></AmountDetails>
      </InvoiceTaxDetails>`).join('')}
    </InvoiceTax>
  </InvoiceBody>
  <RefTtnVal>
    <ReferenceTTN refID="I-88">${data.ttnReference}</ReferenceTTN>
    ${data.qrCodeEnabled && totalTtc > 0 ? (() => {
      const qrString = generateQrString(data, totalTtc, totalTva);
      const qrBase64 = btoa(qrString);
      return `<ReferenceCEV>${qrBase64}</ReferenceCEV>`;
    })() : ''}
  </RefTtnVal>
  <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Id="SigFrs"></ds:Signature>
</TEIF>`;

  return minify ? xml.replace(/>\s+</g, '><').trim() : xml;
};
