
import { InvoiceData, Partner, DOCUMENT_TYPES, PAYMENT_MEANS } from '../types';

const formatTtnDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}${month}${year.slice(-2)}`;
};

const numberToFrenchLetters = (num: number): string => {
  const integerPart = Math.floor(num);
  const decimalPart = Math.round((num - integerPart) * 1000);
  return `${integerPart} DINARS ET ${decimalPart.toString().padStart(3, '0')} MILLIMES`.toUpperCase();
};

const renderPartner = (partner: Partner, role: string) => {
  const hasRC = partner.rc && partner.rc.trim() !== '';
  const hasCapital = partner.capital && partner.capital.trim() !== '';

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
        ${hasRC ? `<RffSection><Reference refID="I-815">${partner.rc}</Reference></RffSection>` : ''}
        ${hasCapital ? `<RffSection><Reference refID="I-816">${partner.capital}</Reference></RffSection>` : ''}
        
        <CtaSection>
          <Contact functionCode="I-94"><ContactName>${partner.name}</ContactName></Contact>
          ${partner.phone ? `<Communication><ComMeansType>I-101</ComMeansType><ComAdress>${partner.phone}</ComAdress></Communication>` : ''}
        </CtaSection>
      </PartnerDetails>`;
};

export const generateTeifXml = (data: InvoiceData, minify: boolean = false): string => {
  const totalHt = data.lines.reduce((sum, line) => sum + (line.quantity * line.unitPrice), 0);
  const totalTva = data.lines.reduce((sum, line) => sum + ((line.quantity * line.unitPrice) * line.taxRate), 0);
  const totalTtc = totalHt + totalTva + data.stampDuty;
  
  const amountLetters = data.amountDescriptionOverride || numberToFrenchLetters(totalTtc);
  const docTypeLabel = DOCUMENT_TYPES[data.documentType];

  const linesXml = data.lines.map((line, index) => `
      <Lin>
        <ItemIdentifier>${index + 1}</ItemIdentifier>
        <LinImd lang="fr">
          <ItemCode>${line.itemCode}</ItemCode>
          <ItemDescription>${line.description}</ItemDescription>
        </LinImd>
        <LinQty>
          <Quantity measurementUnit="${line.unit}">${line.quantity.toFixed(1)}</Quantity>
        </LinQty>
        <LinTax>
          <TaxTypeName code="I-1602">TVA</TaxTypeName>
          <TaxDetails><TaxRate>${(line.taxRate * 100).toFixed(1)}</TaxRate></TaxDetails>
        </LinTax>
        <LinMoa>
          <MoaDetails>
            <Moa amountTypeCode="I-183" currencyCodeList="ISO_4217">
              <Amount currencyIdentifier="TND">${line.unitPrice.toFixed(3)}</Amount>
            </Moa>
          </MoaDetails>
          <MoaDetails>
            <Moa amountTypeCode="I-171" currencyCodeList="ISO_4217">
              <Amount currencyIdentifier="TND">${(line.quantity * line.unitPrice).toFixed(3)}</Amount>
            </Moa>
          </MoaDetails>
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
      <DocumentType code="${data.documentType}">${docTypeLabel}</DocumentType>
    </Bgm>

    <Dtm>
      <DateText format="ddMMyy" functionCode="I-31">${formatTtnDate(data.invoiceDate)}</DateText>
      <DateText format="ddMMyy" functionCode="I-32">${formatTtnDate(data.dueDate || data.invoiceDate)}</DateText>
    </Dtm>

    <PartnerSection>
      ${renderPartner(data.supplier, 'I-62')}
      ${renderPartner(data.buyer, 'I-61')}
    </PartnerSection>

    <PytSection>
      <PytSectionDetails>
        <Pyt>
          <PaymentTearmsTypeCode>I-111</PaymentTearmsTypeCode>
          <PaymentTearmsDescription>Paiement via ${PAYMENT_MEANS[data.paymentMeans]}</PaymentTearmsDescription>
        </Pyt>
        ${data.bankRib ? `
        <PytFii functionCode="I-141">
          <AccountHolder><AccountNumber>${data.bankRib}</AccountNumber></AccountHolder>
          <InstitutionIdentification>
            <InstitutionName>${data.bankName || 'Banque'}</InstitutionName>
          </InstitutionIdentification>
        </PytFii>` : ''}
      </PytSectionDetails>
    </PytSection>

    <LinSection>
      ${linesXml}
    </LinSection>

    <InvoiceMoa>
      <AmountDetails>
        <Moa amountTypeCode="I-176" currencyCodeList="ISO_4217">
          <Amount currencyIdentifier="TND">${totalHt.toFixed(3)}</Amount>
        </Moa>
      </AmountDetails>
      <AmountDetails>
        <Moa amountTypeCode="I-180" currencyCodeList="ISO_4217">
          <Amount currencyIdentifier="TND">${totalTtc.toFixed(3)}</Amount>
          <AmountDescription lang="fr">${amountLetters}</AmountDescription>
        </Moa>
      </AmountDetails>
    </InvoiceMoa>

    <InvoiceTax>
      <InvoiceTaxDetails>
        <Tax>
          <TaxTypeName code="I-1601">droit de timbre</TaxTypeName>
          <TaxDetails><TaxRate>0</TaxRate></TaxDetails>
        </Tax>
        <AmountDetails>
          <Moa amountTypeCode="I-178" currencyCodeList="ISO_4217">
            <Amount currencyIdentifier="TND">${data.stampDuty.toFixed(3)}</Amount>
          </Moa>
        </AmountDetails>
      </InvoiceTaxDetails>
      
      <InvoiceTaxDetails>
        <Tax>
          <TaxTypeName code="I-1602">TVA</TaxTypeName>
          <TaxDetails><TaxRate>Global</TaxRate></TaxDetails>
        </Tax>
        <AmountDetails>
          <Moa amountTypeCode="I-178" currencyCodeList="ISO_4217">
            <Amount currencyIdentifier="TND">${totalTva.toFixed(3)}</Amount>
          </Moa>
        </AmountDetails>
      </InvoiceTaxDetails>
    </InvoiceTax>
  </InvoiceBody>

  <RefTtnVal>
    <ReferenceTTN refID="I-88">${data.ttnReference}</ReferenceTTN>
  </RefTtnVal>

  <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Id="SigFrs">
    <!-- Signature placeholder -->
  </ds:Signature>
</TEIF>`;

  return minify ? xml.replace(/>\s+</g, '><').trim() : xml;
};
