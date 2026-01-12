# TEIF 1.8.8 Electronic Invoice Generator - Complete Technical Specifications

**Based on:** Guide-Implementation-TEIF_V2.0 Official PDF  
**Compliance Level:** TEIF 1.8.8  
**Last Updated:** January 2026

---

## Table of Contents

1. [Overview](#overview)
2. [TEIF Standard Compliance](#teif-standard-compliance)
3. [XML Structure & Components](#xml-structure--components)
4. [Invoice Header Section](#invoice-header-section)
5. [Invoice Body Section](#invoice-body-section)
6. [Identifier Types & Validation](#identifier-types--validation)
7. [Document Types](#document-types)
8. [Date/Time Formats](#datetime-formats)
9. [Partner Details](#partner-details)
10. [Payment Information](#payment-information)
11. [Invoice Line Items](#invoice-line-items)
12. [Amounts & Currency](#amounts--currency)
13. [Taxes](#taxes)
14. [Allowances & Charges](#allowances--charges)
15. [XML Amount Type Codes](#xml-amount-type-codes)
16. [Reference Type Codes](#reference-type-codes)
17. [Contact & Communication Types](#contact--communication-types)
18. [Signature & Validation](#signature--validation)
19. [Amount Description Text Rules](#amount-description-text-rules)
20. [Error Handling & Validation](#error-handling--validation)

---

## Overview

The TEIF (Tunisian Electronic Invoice Format) version 1.8.8 is the official standard for electronic invoicing in Tunisia. This specification defines the complete structure, validation rules, and XML schema for generating compliant electronic invoices accepted by the Tunisian Tax Authority (TTN) and TradeNet platform.

**Key Standards:**
- **Version:** 1.8.8 (with MF - Monitoring Functionality control)
- **Controlling Agency:** TTN (Tunisie TradeNet)
- **Format:** XML (UTF-8)
- **Decimal Separator:** COMMA (,) - NOT dot (.)
- **Character Direction:** RTL for Arabic, LTR for French/English
- **Legal Framework:** Tunisian Tax Code + TradeNet Requirements

---

## TEIF Standard Compliance

### Supported Versions
- 1.8.1
- 1.8.2
- 1.8.3
- 1.8.4
- 1.8.5
- 1.8.6
- 1.8.7
- 1.8.8 (current)

### Controlling Agencies
- **TTN** - Primary designation
- **Tunisie TradeNet** - Alternative designation

---

## XML Structure & Components

### Root Element Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<TEIF controlingAgency="TTN" version="1.8.8">
  <InvoiceHeader>
    <!-- Sender and Receiver Information -->
  </InvoiceHeader>
  <InvoiceBody>
    <!-- Invoice Details -->
  </InvoiceBody>
  <AdditionnalDocuments>
    <!-- Optional: Supporting documents -->
  </AdditionnalDocuments>
  <RefTtnVal>
    <!-- Optional: TTN Reference and validation data -->
  </RefTtnVal>
  <!-- Optional: Digital Signatures (only in signed version) -->
</TEIF>
```

### Root Element Attributes

| Attribute | Type | Required | Values | Description |
|-----------|------|----------|--------|-------------|
| `version` | String(6) | **Yes** | 1.8.1-1.8.8 | TEIF version number |
| `controlingAgency` | String(20) | **Yes** | TTN, Tunisie TradeNet | Controlling authority |

---

## Invoice Header Section

### Purpose
The header contains the sender and receiver identification information.

### Structure

```xml
<InvoiceHeader>
  <MessageSenderIdentifier type="I-01">0736202XAM000</MessageSenderIdentifier>
  <MessageRecieverIdentifier type="I-01">0914089JAM000</MessageRecieverIdentifier>
</InvoiceHeader>
```

### Elements

#### MessageSenderIdentifier (Supplier/Issuer)
- **Type:** PartnerIdentifierTestType
- **Required:** Yes
- **Attribute:** `type` (required - I-01, I-02, I-03, I-04)
- **Max Length:** 35 characters
- **Constraints:** Not nullable, must match identifier type format

#### MessageRecieverIdentifier (Buyer)
- **Type:** NotNullDataStringType_35
- **Required:** Yes
- **Attribute:** `type` (required - I-01, I-02, I-03, I-04)
- **Max Length:** 35 characters
- **Constraints:** Not nullable, must match identifier type format

---

## Invoice Body Section

### Main Elements

```xml
<InvoiceBody>
  <Bgm><!-- Document metadata --></Bgm>
  <Dtm><!-- Dates and times --></Dtm>
  <PartnerSection><!-- Supplier, buyer, and other partners --></PartnerSection>
  <LocSection><!-- Optional: Locations --></LocSection>
  <PytSection><!-- Optional: Payment terms --></PytSection>
  <Ftx><!-- Optional: Free text and notes --></Ftx>
  <SpecialConditions><!-- Optional: Special conditions --></SpecialConditions>
  <LinSection><!-- Line items --></LinSection>
  <InvoiceMoa><!-- Amount details --></InvoiceMoa>
  <InvoiceTax><!-- Tax information --></InvoiceTax>
  <InvoiceAlc><!-- Optional: Allowances and charges --></InvoiceAlc>
</InvoiceBody>
```

---

## Bgm (Business Data) Section

### Structure

```xml
<Bgm>
  <DocumentIdentifier>INV-2024-001</DocumentIdentifier>
  <DocumentType code="I-11">Facture</DocumentType>
  <DocumentReferences>
    <!-- Optional: References to other documents -->
  </DocumentReferences>
</Bgm>
```

### Elements

#### DocumentIdentifier
- **Type:** NotNullDataStringType_70
- **Required:** Yes
- **Max Length:** 70 characters
- **Description:** Unique invoice reference number

#### DocumentType
- **Type:** NotNullDataStringType_35
- **Required:** Yes
- **Max Length:** 35 characters
- **Attribute:** `code` (required)

### Document Type Codes

| Code | Description (FR/EN) | Usage |
|------|-------------|-------|
| **I-11** | Facture / Invoice | Standard commercial invoice |
| **I-12** | Avoir / Credit Note | Adjustment reducing buyer's debt |
| **I-13** | Facture d'Avoir / Debit Note | Adjustment increasing buyer's debt |
| **I-14** | Facture Rectificative / Corrective Invoice | Correction of a previous invoice |
| **I-15** | Facture Proforma / Proforma Invoice | Non-binding price quote |
| **I-16** | Facture d'Acompte / Advance Invoice | Payment request for future delivery |

---

## Dtm (Date/Time) Section

### Structure

```xml
<Dtm>
  <DateText format="ddMMyy" functionCode="I-31">100124</DateText>
  <DateText format="ddMMyy-ddMMyy" functionCode="I-36">100124-100124</DateText>
  <DateText format="ddMMyy" functionCode="I-32">100224</DateText>
</Dtm>
```

### Date Function Codes (All Required)

| Code | Name (FR/EN) | Format | Description | Constraints |
|------|------|--------|-------------|-------------|
| **I-31** | Date de Facture / Invoice Date | ddMMyy | When invoice was issued | Not future, after previous invoice |
| **I-32** | Date d'Échéance / Due Date | ddMMyy | Payment due date | >= Invoice date, <= 90 days future |
| **I-33** | Date de Livraison / Delivery Date | ddMMyy | Goods/services delivery | >= Invoice date |
| **I-34** | Date d'Expédition / Dispatch Date | ddMMyy | Shipment date | >= Invoice date |
| **I-35** | Date de Paiement / Payment Date | ddMMyy | When payment made | Can be before/after invoice date |
| **I-36** | Période / Service Period | ddMMyy-ddMMyy | Start-end date range | End >= Start |
| **I-37** | Date/Heure de Signature / Signature Date/Time | ddMMyyHHmm | When document signed | Required for signed invoices |
| **I-38** | Autre / Other Date | ddMMyy | Any other significant date | Variable use |

### Supported Date Formats

| Format | Example | Description |
|--------|---------|-------------|
| **ddMMyy** | 100124 | Day-Month-Year (2 digit year) |
| **ddMMyyHHmm** | 0706121200 | Day-Month-Year-Hour(24h)-Minute |
| **ddMMyy-ddMMyy** | 010524-310524 | Date range (period start-end) |

---

## Partner Details

### Partner Section Structure

```xml
<PartnerSection>
  <PartnerDetails functionCode="I-62">
    <!-- Supplier (Seller) Details -->
  </PartnerDetails>
  <PartnerDetails functionCode="I-64">
    <!-- Buyer Details -->
  </PartnerDetails>
</PartnerSection>
```

### Partner Function Codes

| Code | Description (FR/EN) | Required | Role | Details |
|------|-------------|----------|------|---------| 
| **I-61** | Partie Précédente / Previous Partner | No | Previous transaction party | Reference only |
| **I-62** | Fournisseur / Supplier/Seller | **Yes** | Issuing company | The vendor - MUST be present |
| **I-63** | Représentant de l'Acheteur / Buyer's Agent | No | Buyer's representative | Agent/broker acting for buyer |
| **I-64** | Acheteur / Buyer/Customer | **Yes** | Invoice recipient | The purchaser - MUST be present |
| **I-65** | Partie de Livraison / Delivery Party | No | Delivery responsibility | Different from buyer if applicable |
| **I-66** | Destinataire de Facture / Invoice Recipient | No | Invoice copy recipient | If different from buyer |
| **I-67** | Partie Payante / Paying Party | No | Payment responsibility | If different from buyer |
| **I-68** | Commissionnaire / Customs Broker | No | Customs clearance agent | Import/export transactions |
| **I-69** | Livreur / Logistics Provider | No | Final delivery service | Courier or delivery company |

### Partner NAD (Address) Structure

```xml
<PartnerDetails functionCode="I-62">
  <Nad>
    <PartnerIdentifier type="I-01">0736202XAM000</PartnerIdentifier>
    <PartnerName nameType="Qualification">Company Name</PartnerName>
    <PartnerAdresses lang="fr">
      <AdressDescription>Rue du Lac Malaren</AdressDescription>
      <Street>Rue du Lac Malaren</Street>
      <CityName>Tunis</CityName>
      <PostalCode>1053</PostalCode>
      <Country codeList="ISO_3166-1">TN</Country>
    </PartnerAdresses>
  </Nad>
</PartnerDetails>
```

### Address Components

| Element | Type | Required | Max Length | Description |
|---------|------|----------|-----------|-------------|
| **AdressDescription** | String | Yes | 500 | Full address description |
| **Street** | String | No | 35 | Street name and number |
| **CityName** | String | No | 35 | City name |
| **PostalCode** | String | No | 17 | Postal/ZIP code |
| **Country** | String(6) | Yes | 6 | ISO 3166-1 country code (TN for Tunisia) |

---

## Identifier Types & Validation

### I-01: Tunisian Tax Registration Number (Matricule Fiscal)

**Format:** `[0-9]{7}[A-Z][ABDNP][CMNPE][0-9]{3}`

**Example:** `0736202XAM000`

**Structure:**
- Positions 1-7: Sequential number (7 digits)
- Position 8: Single letter (A-Z except I, O, U, Y, Z)
- Position 9: Letter (A, B, D, N, or P)
- Position 10: Letter (C, M, N, P, or E)
- Positions 11-13: Trailing code (3 characters, typically 000)

**Validation Rules:**
- Total length: exactly 13 characters
- No spaces or special characters
- Positions 1-7: numeric only
- Positions 8-10: specific character sets
- Must follow regional structure (position 9-10 indicate region)

**Usage:** Primary identifier for Tunisian companies

### I-02: National Identification Card (Carte d'Identité Nationale)

**Format:** `[0-9]{8}` (8 digits)

**Example:** `12345678`

**Validation Rules:**
- Exactly 8 numeric characters
- No letters or special characters
- All zeros allowed

**Usage:** Individual identification (Tunisian citizens)

### I-03: Residence Card (Carte de Séjour)

**Format:** `[0-9]{9}` (9 digits)

**Example:** `123456789`

**Validation Rules:**
- Exactly 9 numeric characters
- No letters or special characters
- All zeros allowed

**Usage:** Foreign resident identification

### I-04: Other/Unknown Identifier

**Format:** Free text (max 35 characters)

**Validation Rules:**
- Maximum 35 characters
- No format validation applied
- Used for unidentified or future identifier types

---

## Payment Information Section

### Structure

```xml
<PytSection>
  <PytSectionDetails>
    <Pyt>
      <PaymentTearmsTypeCode>I-114</PaymentTearmsTypeCode>
      <PaymentTearmsDescription>Bank transfer details...</PaymentTearmsDescription>
    </Pyt>
  </PytSectionDetails>
  
  <PytSectionDetails>
    <Pyt>
      <PaymentTearmsTypeCode>I-115</PaymentTearmsTypeCode>
      <PaymentTearmsDescription>Postal payment details...</PaymentTearmsDescription>
    </Pyt>
    <PytFii functionCode="I-141">
      <AccountHolder>
        <AccountNumber>0120021241115530</AccountNumber>
        <OwnerIdentifier>Account Owner</OwnerIdentifier>
      </AccountHolder>
      <InstitutionIdentification nameCode="0760">
        <BranchIdentifier>0760</BranchIdentifier>
        <InstitutionName>La Poste</InstitutionName>
      </InstitutionIdentification>
    </PytFii>
  </PytSectionDetails>
</PytSection>
```

### Payment Terms Type Codes

| Code | Description (FR/EN) | Usage |
|------|-------------|-------|
| **I-114** | Virement bancaire / Bank Transfer | Payment via bank account |
| **I-115** | Paiement postal / Postal Payment | Payment through postal service |
| **I-116** | Espèces / Cash | Direct cash payment |
| **I-117** | Chèque / Check | Check payment |
| **I-118** | Carte / Card | Credit/debit card payment |
| **I-119** | Paiement électronique / E-Payment | Electronic payment (online) |
| **I-120** | Autre / Other | Any other payment method |

---

## Invoice Line Items

### Structure

```xml
<LinSection>
  <Lin>
    <ItemIdentifier>1</ItemIdentifier>
    <LinImd lang="fr">
      <ItemCode>PROD001</ItemCode>
      <ItemDescription>Product Description</ItemDescription>
    </LinImd>
    <LinQty>
      <Quantity measurementUnit="UNIT">10,00</Quantity>
    </LinQty>
    <LinTax>
      <TaxTypeName code="I-1602">TVA</TaxTypeName>
      <TaxDetails>
        <TaxRate>19,00</TaxRate>
      </TaxDetails>
    </LinTax>
    <LinMoa>
      <MoaDetails>
        <Moa amountTypeCode="I-183" currencyCodeList="ISO_4217">
          <Amount currencyIdentifier="TND">100,00</Amount>
        </Moa>
      </MoaDetails>
      <MoaDetails>
        <Moa amountTypeCode="I-171" currencyCodeList="ISO_4217">
          <Amount currencyIdentifier="TND">1000,00</Amount>
        </Moa>
      </MoaDetails>
    </LinMoa>
  </Lin>
</LinSection>
```

### Line Item Elements

| Element | Type | Required | Description |
|---------|------|----------|-------------|
| **ItemIdentifier** | String(35) | **Yes** | Unique line number (1, 2, 3...) |
| **LinImd** | Structure | **Yes** | Item description and code |
| **LinQty** | Structure | **Yes** | Quantity and unit |
| **LinTax** | Structure | **Yes** | Tax information for line |
| **LinMoa** | Structure | **Yes** | Line amounts |
| **LinApi** | Structure | No | Additional product identifiers |
| **LinDtm** | Structure | No | Line-specific dates |
| **LinAlc** | Structure | No | Line-level allowances/charges |
| **LinFtx** | Structure | No | Line notes |
| **SubLin** | Structure | No | Sub-line items (nested) |

### Measurement Units

| Unit | Description |
|------|-------------|
| **UNIT** | Individual units/pieces |
| **KG** | Kilograms |
| **L** | Liters |
| **M** | Meters |
| **M2** | Square meters |
| **M3** | Cubic meters |
| **H** | Hours |
| **KWH** | Kilowatt-hours |
| **TON** | Metric tons |

---

## Amounts & Currency

### 📌 Decimal Format Requirements

**Pattern:** `-?[0-9]{1,15}([.][0-9]{1,5})?` (Unsigned invoices)  
**Pattern:** `-?[0-9]{1,15}([,.][0-9]{1,5})?` (Signed invoices - allows both)

**Decimal Separator:** DOT (.) for unsigned invoices (which is what we generate)  
**Decimal Places:** 1-5 decimal places (3 decimals recommended for precision)

### Structure

```xml
<InvoiceMoa>
  <AmountDetails>
    <Moa amountTypeCode="I-179" currencyCodeList="ISO_4217">
      <Amount currencyIdentifier="TND">2000000.000</Amount>
    </Moa>
  </AmountDetails>
  <AmountDetails>
    <Moa amountTypeCode="I-180" currencyCodeList="ISO_4217">
      <Amount currencyIdentifier="TND">2.540</Amount>
      <AmountDescription lang="fr">DEUX DINARS ET CINQ CENT QUARANTE MILLIMES</AmountDescription>
    </Moa>
  </AmountDetails>
</InvoiceMoa>
```

### Amount Format Constraints

| Aspect | Requirement |
|--------|-------------|
| **Decimal Separator** | DOT (.) for unsigned invoices (current schema) |
| **Max Integer Digits** | 15 |
| **Min Decimal Places** | 1 |
| **Max Decimal Places** | 5 |
| **Negative Values** | Allowed (with minus sign prefix) |
| **Thousand Separators** | NOT ALLOWED |
| **Currency Symbols** | NOT ALLOWED |
| **Range** | -999,999,999,999,999 to 999,999,999,999,999 |

### ✅ CORRECT Examples
- `2000000.000` - Two million (3 decimals)
- `2.540` - Two point fifty-four
- `-100.500` - Negative amount
- `150.12345` - Five decimal places
- `0.000` - Zero

### ❌ INCORRECT Examples
- `2,54` - Comma separator (invalid for unsigned)
- `100` - No decimals (needs at least 1)
- `2 000 000.000` - Thousand separators (INVALID)
- `2USD.50` - Currency symbol (INVALID)

### Currency Codes (ISO 4217)

| Code | Currency | Country |
|------|----------|---------|
| **TND** | Tunisian Dinar | Tunisia (Standard) |
| **EUR** | Euro | Eurozone |
| **USD** | US Dollar | USA |
| **GBP** | British Pound | UK |
| **CHF** | Swiss Franc | Switzerland |
| **AED** | UAE Dirham | UAE |
| **SAR** | Saudi Riyal | Saudi Arabia |

---

## Taxes

### Tax Structure

```xml
<InvoiceTax>
  <InvoiceTaxDetails>
    <Tax>
      <TaxTypeName code="I-1602">TVA</TaxTypeName>
      <TaxDetails>
        <TaxRate>19.00</TaxRate>
      </TaxDetails>
    </Tax>
    <AmountDetails>
      <Moa amountTypeCode="I-177" currencyCodeList="ISO_4217">
        <Amount currencyIdentifier="TND">1000.000</Amount>
      </Moa>
    </AmountDetails>
    <AmountDetails>
      <Moa amountTypeCode="I-178" currencyCodeList="ISO_4217">
        <Amount currencyIdentifier="TND">190.000</Amount>
      </Moa>
    </AmountDetails>
  </InvoiceTaxDetails>
</InvoiceTax>
```

### Tax Type Codes

| Code | Name (FR/EN) | Rate Range | Description | Tunisian Use |
|------|------|-----------|-------------|--------------|
| **I-1601** | Droit de Timbre / Stamp Duty | 0% | Fixed fee per invoice | Always applied |
| **I-1602** | TVA / Value Added Tax | 0%, 6%, 13%, 19% | Primary tax - Applies to most goods/services | Usually applied |
| **I-1603** | FODEC / Environmental Fund | 0.5%-1% | Environmental/sustainability fund | Conditional |
| **I-1604** | Impôt sur le Revenu / Withholding Tax (IRC) | 1%-10% | B2B transaction withholding | Conditional |

### Tax Rate Format

- **Type:** String (max 5 characters)
- **Format:** Decimal number with COMMA separator (e.g., `19,00`, `6,5`, `0,00`)
- **Range:** 0.00 to 100.00
- **Decimals:** 0-2 decimal places for precision

### Standard Tunisian Tax Rates

| Rate | Type | Usage | Description |
|------|------|-------|-------------|
| **0,00** | Exemption | Exports, medical, education | Critical sectors |
| **6,00** | Reduced | Basic goods, agriculture | Essentials |
| **13,00** | Reduced | Services, supplies | General supplies |
| **19,00** | Standard | Most goods and services | Default rate |

---

## Allowances & Charges

### Structure

```xml
<InvoiceAlc>
  <AllowanceDetails>
    <Alc allowanceCode="I-151">
      <AllowanceIdentifier>PROMO2024</AllowanceIdentifier>
      <SpecialServices lang="fr">Large order discount</SpecialServices>
    </Alc>
    <Moa amountTypeCode="I-176" currencyCodeList="ISO_4217">
      <Amount currencyIdentifier="TND">50.000</Amount>
    </Moa>
  </AllowanceDetails>
</InvoiceAlc>
```

### Allowance Codes

| Code | Type (FR/EN) | Impact | Usage |
|------|------|--------|-------|
| **I-151** | Rabais / Discount | Decreases | Standard discount |
| **I-152** | Majoration / Charge | Increases | Additional charges |
| **I-153** | Service particulier / Special Service | Variable | Extra services |
| **I-154** | Marchandise gratuite / Free Goods | Decreases | Promotional gifts |
| **I-155** | Retour / Return | Decreases | Customer returns |

---

## XML Amount Type Codes

### Amount Type Codes with Descriptions

| Code | Description (FR/EN) | Context | Amount Type | Calculation |
|------|-------------|---------|-------------|-------------|
| **I-171** | Montant net ligne / Line Net Amount | Line Item | Total line | Qty × Unit Price |
| **I-172** | Frais de port / Freight Amount | Shipping | Charge | Calculated separately |
| **I-173** | Assurance / Insurance Amount | Insurance | Charge | Calculated separately |
| **I-174** | Frais de manutention / Handling Amount | Handling | Charge | Calculated separately |
| **I-175** | Rabais ligne / Allowance Amount (Line) | Line Discount | Deduction | Line × Discount % |
| **I-176** | Rabais total / Total Allowance | Invoice Discount | Deduction | Sum of all discounts |
| **I-177** | Base fiscale / Tax Base Amount | Taxable Base | Subtotal | Amount before tax |
| **I-178** | Montant taxes / Tax Amount | Tax Calculation | Tax | Base × Tax Rate |
| **I-179** | Montant net facture / Invoice Line Net | Line Summary | Total line | Used for summary |
| **I-180** | Montant dû / Amount Due | Final Amount | Total | Net + Taxes |
| **I-181** | Acompte / Prepaid Amount | Paid Portion | Payment | Already paid |
| **I-182** | Montant TVA / VAT Amount | VAT | Tax | Base × VAT Rate |
| **I-183** | Prix ligne / Line Item Price | Unit Price | Price | Unit cost |
| **I-184** | Base remise / Discount Base | Discount Base | Base | Amount before % |
| **I-185** | Majoration ligne / Surcharge (Line) | Line Surcharge | Addition | Line additions |
| **I-186** | Majoration totale / Total Surcharge | Invoice Surcharge | Addition | Total additions |
| **I-187** | Net rabais/majoration / Net Allowance/Surcharge | Combined Effect | Net | Discount - Surcharge |
| **I-188** | Arrondi / Rounding Amount | Rounding | Adjustment | Final penny rounding |

---

## Reference Type Codes

### Reference Code Reference (refID values)

| Code | Description (FR/EN) | Category | Usage | Examples |
|------|-------------|----------|-------|----------|
| **I-80** | Autre / Other Reference | General | Miscellaneous reference | Various uses |
| **I-81** | Référence interne / Internal Reference | Internal | Same company | Internal PO ID |
| **I-82** | Référence externe / External Reference | External | Third party | Supplier order |
| **I-83** | Référence client / Customer Reference | Customer | Customer PO | Customer purchase order |
| **I-84** | Référence livraison / Delivery Reference | Shipping | Delivery note | BL (Bon de Livraison) |
| **I-85** | Référence facture / Invoice Reference | Invoice | Corrected invoice | Previous invoice # |
| **I-86** | Référence avoir / Credit Note Reference | Adjustment | Credit memo | Credit memo # |
| **I-87** | Référence facture d'avoir / Debit Note Ref | Adjustment | Debit memo | Debit memo # |
| **I-88** | Référence TTN / TTN Reference | Government | TTN validation | TTN unique ID |
| **I-89** | Référence douane / Customs Reference | International | Import/Export | Customs # |
| **I-811** | Numéro d'enregistrement / Registration | Partner ID | Business ID | RCCM number |
| **I-812** | Code forme juridique / Legal Form | Entity Type | Business structure | SARL, EIRL, SA |
| **I-813** | Type lieu activité / Location Type | Location | Premises | Bureau/Usine |
| **I-814** | Informations bancaires / Banking | Payment | Account reference | Bank account # |
| **I-815** | Certificat enregistrement / Certificate | Official | Tax license | Certificate ID |
| **I-816** | Code activité / Activity Code | Business Type | Industry | NAF code |
| **I-817** | Autre référence document / Other Ref | General | Miscellaneous | Any other document |
| **I-818** | Convention collective / Collective Agreement | Employment | Labor agreement | CCP number |

---

## Contact & Communication Types

### Contact Function Codes

| Code | Description (FR/EN) | Purpose | Role |
|------|-------------|---------|------|
| **I-91** | Contact général / General Contact | Default contact | Primary point of contact |
| **I-92** | Contact technique / Technical Contact | Technical issues | Technical support |
| **I-93** | Contact facturation / Billing Contact | Invoice/payment questions | Billing information |
| **I-94** | Contact entreprise / Company Contact | Main company | General inquiries |

### Communication Type Codes

| Code | Method (FR/EN) | Description | Format | Validation |
|------|--------|-------------|--------|-----------|
| **I-101** | Téléphone / Phone | Telephone number | 8-15 digits | Numbers only |
| **I-102** | Télécopie / Fax | Facsimile number | 8-15 digits | Numbers only |
| **I-103** | Email / Electronic Mail | Email address | RFC 5322 | Standard email format |
| **I-104** | Web / Website | Website URL | HTTPS URL | Valid URL format |

---

## Signature & Validation

### Signed vs Unsigned Invoices

#### Unsigned Invoices
- **Schema:** `facture_INVOIC_V1.8.8_withoutSig.xsd`
- **Use Case:** Draft, internal use, preliminary
- **Structure:** TEIF root without Signature elements

#### Signed Invoices (Recommended)
- **Schema:** `facture_INVOIC_V1.8.8_withSig.xsd`
- **Use Case:** Official submission, legal requirement, audit trail
- **Digital Signature:** XML-DSig format with X.509 certificates
- **Signatures:** Two-tier (Supplier + TTN counter-signature)

### TTN Reference Validation (RefTtnVal)

```xml
<RefTtnVal>
  <ReferenceTTN refID="I-88">073620200053562920196810312</ReferenceTTN>
  <ReferenceCEV>iVBORw0KGgoAAAANSUhEUgAA...</ReferenceCEV>
  <ReferenceDate>
    <DateText format="ddMMyyHHmm" functionCode="I-37">1609201239</DateText>
  </ReferenceDate>
</RefTtnVal>
```

#### ReferenceTTN
- **refID:** Always "I-88"
- **Format:** TTN validation code (typically 27 characters)
- **Purpose:** Unique invoice identifier from TTN

#### ReferenceCEV
- **Content:** Base64-encoded QR code or barcode image
- **Max Length:** 4000 characters
- **Purpose:** Machine-readable verification code

---

## Amount Description Text Rules

### Purpose
Human-readable text representation of amounts for printing/display

### Formatting Rules

1. **Language:** Must match `lang` attribute (fr, en, ar, or)
2. **Case:** UPPERCASE only
3. **Format:** Full words with spaces
4. **Decimals:** Spelled out completely
5. **Separator:** Use "ET" (and) between units

### Examples by Language

#### French
- `2,00` → "DEUX DINARS"
- `2,54` → "DEUX DINARS ET CINQUANTE-QUATRE CENTIMES"
- `100,00` → "CENT DINARS"
- `1000,50` → "MILLE DINARS ET CINQUANTE CENTIMES"

#### English
- `2,00` → "TWO DINARS"
- `2,54` → "TWO DINARS AND FIFTY-FOUR CENTS"
- `100,00` → "ONE HUNDRED DINARS"
- `1000,50` → "ONE THOUSAND DINARS AND FIFTY CENTS"

---

## Error Handling & Validation

### Validation Layers

#### 1. Schema Validation (XSD)
- XML structure compliance
- Element/attribute constraints
- Type restrictions
- Mandatory fields

#### 2. Business Rule Validation

**Identifier Validation:**
- Tax number format (I-01): Pattern matching
- ID card format (I-02): Length verification
- Strict format compliance

**Date Validation:**
- Invoice date not in future
- Due date >= Invoice date
- Delivery period: Start <= End
- Chronological ordering

**Amount Validation:**
- COMMA decimal separator ONLY
- 2-5 decimal places mandatory
- No negative totals (except credits)
- Tax rate 0-100

**Currency Validation:**
- ISO 4217 compliance
- Consistent currency throughout

#### 3. Cross-Field Validation

**Amount Calculations:**
- Line Total = Quantity × Unit Price
- Invoice Total = Sum(Lines) + Taxes - Discounts
- Tax Amount = Taxable Base × Tax Rate (with comma decimals)

**Partner Validation:**
- Supplier != Buyer
- Both I-62 and I-64 present
- Valid identifier formats

### Compliance Checklist

#### Essential Requirements
- [ ] TEIF version 1.8.8
- [ ] Controlling agency: TTN
- [ ] Valid UTF-8 encoding
- [ ] Unique document identifier
- [ ] Invoice date (not future)
- [ ] Supplier details (I-62) with valid tax ID
- [ ] Buyer details (I-64) with valid identifier
- [ ] At least one line item
- [ ] Quantity > 0 with unit
- [ ] Item code and description
- [ ] Line amounts in correct format (COMMA decimals, 2-5 places)
- [ ] Tax applied to each line
- [ ] Invoice total amounts calculated
- [ ] Currency: TND for domestic
- [ ] All decimal amounts use COMMA separator
- [ ] All amounts have 2-5 decimal places

#### Pre-Submission Checklist
1. Validate against XSD schema
2. Check all mandatory fields populated
3. Verify decimal format (COMMA only, 2-5 places minimum)
4. Confirm amount calculations
5. Test with TTN validator
6. Generate digital signature if required

---

## References

- **TEIF Standard:** Guide-Implementation-TEIF_V2.0.pdf
- **XML Schema:** facture_INVOIC_V1.8.8_withoutSig.xsd, facture_INVOIC_V1.8.8_withSig.xsd
- **XSD Validation:** https://www.w3.org/XML/Schema
- **ISO 4217:** Currency Codes
- **ISO 3166-1:** Country Codes
- **ISO 8601:** Date/Time Formats
- **XML Signature (XML-DSig):** https://www.w3.org/TR/xmldsig-core/
- **TradeNet Portal:** https://www.tradenet.com.tn

---

**Document Version:** 2.0  
**Date:** January 2026  
**Status:** Final - TEIF V2.0 Compliant  
**Compliance Level:** TEIF 1.8.8  
**Last Validated:** Based on Guide-Implementation-TEIF_V2.0.pdf
