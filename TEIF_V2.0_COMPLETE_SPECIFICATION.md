# TEIF V2.0 XML SPECIFICATION - COMPLETE EXTRACTION AND ANALYSIS

## DOCUMENT INFORMATION
- **Title**: Guide d'Implémentation - TEIF V2.0
- **Copyright**: © 2018 Tunisie TradeNet
- **Total Pages**: 83
- **Document Type**: Technical Implementation Guide

---

## 1. IDENTIFIER TYPES (Référentiel I0 - Partner Identifier Types)

### Partner Identifier Type Codes:
| Code | Type | Description |
|------|------|-------------|
| **I-01** | Matricule Fiscal Tunisien | Tunisian Tax Identification Number |
| **I-02** | Carte d'identité nationale | National Identity Card |
| **I-03** | Carte de séjour | Residence Card |
| **I-04** | Matricule Fiscal non tunisien | Non-Tunisian Tax Identification Number |

---

## 2. DOCUMENT TYPE CODES (Référentiel I1 - Document Types)

| Code | Type | Description |
|------|------|-------------|
| **I-11** | Facture | Invoice |
| **I-12** | Facture d'avoir | Credit Note / Debit Note |
| **I-13** | Note d'honoraire | Professional Fee Note |
| **I-14** | Décompte (marché public) | Statement (Public Procurement) |
| **I-15** | Facture Export | Export Invoice |
| **I-16** | Bon de commande | Purchase Order |

---

## 3. LANGUAGE CODES (Référentiel I2 - Language Codes)

| Code | Language |
|------|----------|
| **ar** | Arabic (Arabe) |
| **fr** | French (Français) |
| **en** | English (Anglais) |
| **or** | Other (Autre) |

---

## 4. DATE/TIME SPECIFICATIONS (Référentiel I3 - Date Functions)

### Date Function Codes:
| Code | Date Function | Description |
|------|---------------|-------------|
| **I-31** | Date d'émission du document | Document Issue Date |
| **I-32** | Date limite de paiement | Payment Due Date |
| **I-33** | Date de confirmation | Confirmation Date |
| **I-34** | Date d'expiration | Expiration Date |
| **I-35** | Date du fichier joint | Attached File Date |
| **I-36** | Période de facturation | Invoice Period |
| **I-37** | Date de la génération de la réference | Reference Generation Date |
| **I-38** | Autre | Other |

### Date/Time Format Specifications:
- **Date Type**: Element `DateText` (simple type)
- **Time Format**: Required by `DtmType` complex type containing `DateText` element
- **Date Elements**: Used in all date-related contexts (billing period dates, reference dates, etc.)

---

## 5. AMOUNT AND CURRENCY SPECIFICATIONS

### Currency Codes (Enumeration):
- **TND** - Tunisian Dinar (Primary)
- **EUR** - Euro
- **USD** - US Dollar

### Amount Type Codes (Référentiel I17 - Amount Types)

| Code | Amount Type | Description |
|------|------------|-------------|
| **I-171** | Montant total HT de l'article | Total Item Amount Excluding Tax |
| **I-172** | Montant total HT des articles | Total Articles Amount Excluding Tax |
| **I-173** | Montant payé | Amount Paid |
| **I-174** | Montant HT de la charge/Service | Service Amount Excluding Tax |
| **I-175** | Montant total HT des charges/Services | Total Services Amount Excluding Tax |
| **I-176** | Montant total HT facture | Invoice Total Excluding Tax |
| **I-177** | Montant base taxe | Tax Base Amount |
| **I-178** | Montant Taxe | Tax Amount |
| **I-179** | Capital de l'entreprise | Company Capital |
| **I-180** | Montant Total TTC facture | Invoice Total Including Tax |
| **I-181** | Montant total Taxe | Total Tax Amount |
| **I-182** | Montant total base taxe | Total Tax Base |
| **I-183** | Montant HT article unitaire | Unit Item Amount Excluding Tax |
| **I-184** | Montant total TTC des charges/Services | Total Services Amount Including Tax |
| **I-185** | Montant total exonéré | Total Exempted Amount |
| **I-186** | Montant de crédit | Credit Amount |
| **I-187** | Montant objet de suspension de la TVA | Amount Subject to VAT Suspension |
| **I-188** | Montant net de l'article | Net Item Amount |
| **I-189** | Montant total HT toutes charges(services) comprises | Total Amount Excluding All Services |

### Monetary Amount Format:

**Regex Pattern**: `-?[0-9]{1,15}(,[0-9]{2,5})?`

**Specifications**:
- Type: `MonetaryAmountType` (restriction of xs:token)
- Sign: Optional minus sign for negative amounts
- Integer Part: 1-15 digits required
- Decimal Part: 2-5 digits after comma (optional)
- Decimal Separator: **Comma (,)** - not period
- Max Length: 35 characters
- Attributes:
  - `currencyIdentifier`: Required (TND, EUR, USD enumeration)
  - `currencyCodeList`: ISO-4217 enumeration

---

## 6. TAX SPECIFICATIONS

### Tax Type Codes (Référentiel I16 - Tax Types)

| Code | Tax Type |
|------|----------|
| **I-161** | Droit de consommation - Consumption Tax |
| **I-162** | Taxe professionnelle de compétitivité FODEC - Competitiveness Tax |
| **I-163** | Taxe sur les emballages métalliques - Metallic Packaging Tax |
| **I-164** | Taxe pour la protection de l'environnement TPE - Environmental Protection Tax |
| **I-165** | FODET - Tourism Competitiveness Development Tax |
| **I-166** | Taxe sur les climatiseurs - Air Conditioning Tax |
| **I-167** | Taxes sur les lampes et les tubes - Lamps and Tubes Tax |
| **I-168** | TFL - Fruits and Vegetables Tax (non-VAT) |
| **I-169** | Taxes sur les produits de la pèche - Fishing Products Tax (non-VAT) |
| **I-160** | Taxes RB (non-VAT) |
| **I-1601** | Droit de timbre - Stamp Duty |
| **I-1602** | TVA - Value Added Tax (Main) |
| **I-1603** | Autre - Other |
| **I-1604** | Retenu à la source - Withholding Tax |

### Tax Structure Requirements:

**Element**: `TaxType` (ComplexType)
**Children Elements**:
- `TaxTypeName` (Required)
  - Type: NotNullTaxTypeNameDataStringType_200
  - Max Length: 35
  - Attribute: `code` (DataStringType_6, required) - Reference I16
- `TaxCategory` (Optional)
  - Type: DataStringType_6
  - Max Length: 6
- `TaxDetails` (Required)
  - Type: TaxRateDetailType
  - Contains:
    - `TaxRate`: Tax rate value
    - `NotNullDataStringType_5`: Basis descriptor
    - `TaxRateBasis`: DataStringType_5

**Tax Details Validation**:
- Must specify tax type code from Reference I16
- Tax rate must be included
- Tax basis must be defined
- Multiple tax types supported in single invoice

---

## 7. PARTNER SECTION REQUIREMENTS

### Partner Function Codes (Référentiel I6 - Partner Functions)

| Code | Function | Role |
|------|----------|------|
| **I-61** | Acheteur | Buyer |
| **I-62** | Fournisseur | Supplier |
| **I-63** | Vendeur | Seller |
| **I-64** | Client | Customer |
| **I-65** | Receveur de la facture | Invoice Receiver |
| **I-66** | Emetteur de la facture | Invoice Issuer |
| **I-67** | Exportateur | Exporter |
| **I-68** | Importateur | Importer |
| **I-69** | Inspecteur | Inspector |

### Contact Function Codes (Référentiel I9 - Contact Functions)

| Code | Function |
|------|----------|
| **I-91** | Contact Technique - Technical Contact |
| **I-92** | Contact juridique - Legal Contact |
| **I-93** | Contact Commercial - Commercial Contact |
| **I-94** | Autre - Other |

### Communication Means Codes (Référentiel I10 - Communication Means)

| Code | Means |
|------|-------|
| **I-101** | Téléphone - Telephone |
| **I-102** | Fax |
| **I-103** | Email |
| **I-104** | Autre - Other |

### Location Function Codes (Référentiel I5 - Location Functions)

| Code | Location Type |
|------|---------------|
| **I-51** | Adresse de livraison - Delivery Address |
| **I-52** | Adresse de paiement - Payment Address |
| **I-53** | Pays de provenance - Country of Origin |
| **I-54** | Pays d'achat - Purchasing Country |
| **I-55** | Pays - Country |
| **I-56** | Ville - City |
| **I-57** | Adresse de courrier - Mailing Address |
| **I-58** | Pays première destination - First Destination Country |
| **I-59** | Pays destination définitive - Final Destination Country |

### Party Name Format Codes (Référentiel I7 - Party Name Formats)

| Code | Format |
|------|--------|
| **I-71** | Nom et prénom - Name and First Name (Individual) |
| **I-72** | Raison sociale - Business Name (Company) |

---

## 8. LINE ITEM STRUCTURE REQUIREMENTS

### Line Item Element Structure (LinSegType):

**Parent**: `TEIF/InvoiceBody/LinSection`
**Occurrence**: minOcc=1, maxOcc=n

**Main Element**: `LinSegType/Lin` (Complex Type)
**Required Properties**:
- minOcc: 1
- maxOcc: n

**Required Child Elements**:
1. `ItemIdentifier`
   - Type: DataStringType_35
   - Max Length: 35
   - Description: Item identifier assigned by supplier

2. `LinImd` (Line Item Details)
   - Type: ImdType (Complex)
   - Children:
     - `ItemCode` (Required, NotNullDataStringType_35, max 35)
     - `ItemDescription` (Optional, DataStringType_500, max 500)
   - Attribute: `lang` (LangEnumType: ar, fr, en, or)

3. `LinQty` (Line Quantity)
   - Type: QtyType (Complex)
   - Child: `Quantity` (NotNullDataStringType_35, max 35)
   - Required Attribute: `measurementUnit` (DataStringType_8, max 8, MANDATORY)

4. `LinDtm` (Line Date)
   - Type: DtmType (Complex)
   - Child: `DateText`

5. `LinTax` (Line Tax)
   - Type: TaxType (Complex)
   - Children:
     - `TaxTypeName` (code attribute from I16, required)
     - `TaxCategory` (optional)
     - `TaxDetails` (required)

6. `LinMoa` (Line Monetary Amount)
   - Type: MoaLinType (Complex)
   - Child: `MoaDetails` (1 to n occurrences)
   - Sub-structure:
     - `Moa` (MoaType)
       - Attributes:
         - `currencyCodeList`: ISO-4217 (required)
         - `amountTypeCode`: DataStringType_6 from I17 (required)
       - Children:
         - `Amount` (with `currencyIdentifier` attribute: TND/EUR/USD)
         - `AmountDescription` (optional, max 500, with `lang` attribute)
     - `RffDtm` (Optional, RefGrpType)

**Optional Child Elements**:

7. `LinApi` (Line Additional Product Information)
   - Type: ApiSegType (Complex)
   - Min Occ: 0, Max Occ: 1
   - Contains: ApiDetails (multiple ApiType elements)
   - ApiType Structure:
     - `ApiCode` (DataStringType_50, max 50)
     - `ApiDescription` (DataStringType_500, max 500)
     - Attribute: `lang` (LangEnumType)

8. `LinAlc` (Line Allowance/Charge)
   - Type: LinAlcDetailsType (Complex)
   - Min Occ: 0, Max Occ: 1
   - Children:
     - `Alc` (AlcType with `allowanceCode` attribute from I15)
       - `AllowanceIdentifier` (optional, DataStringType_35)
       - `SpecialServices` (optional, DataStringType_200, with `lang` attribute)
     - `Pcd` (Percentage)
     - `Ftx` (Free Text, optional)

9. `LinFtx` (Line Free Text)
   - Type: FtxType (Complex)
   - Min Occ: 0, Max Occ: 1
   - Child: `FreeTextDetail`

10. `SubLin` (Sub-Line Items)
    - Type: LinType (Recursive, same as parent Lin)
    - Min Occ: 0, Max Occ: unbounded
    - Can contain all line elements recursively

---

## 9. ALLOWANCE TYPE CODES (Référentiel I15 - Allowance Types)

| Code | Type |
|------|------|
| **I-151** | Réduction - Discount |
| **I-152** | Ristourne - Rebate |
| **I-153** | Rabais - Price Reduction |
| **I-154** | Redevance sur les télécommunications - Telecom Fee |
| **I-155** | Autre - Other |

---

## 10. FREE TEXT SUBJECTS (Référentiel I4 - Free Text Subjects)

| Code | Subject |
|------|---------|
| **I-41** | Description marchandise / service - Product/Service Description |
| **I-42** | Description acquittement - Payment Acknowledgement Description |
| **I-43** | Conditions du prix - Price Conditions |
| **I-44** | Description de l'erreur - Error Description |
| **I-45** | Période de temps - Time Period |
| **I-46** | Formule de calcul du prix - Price Calculation Formula |
| **I-47** | Code incoterme livraison - Incoterms Delivery Code |
| **I-48** | Observation - Note/Observation |

---

## 11. REFERENCE QUALIFIERS (Référentiel I8 - Reference Qualifiers)

| Code | Reference Type |
|------|-----------------|
| **I-81** | Identifiant du compte client - Customer Account ID |
| **I-811** | Mode de connexion client - Customer Connection Mode |
| **I-812** | Rang du compte client - Customer Account Rank |
| **I-813** | Profil du compte client - Customer Account Profile |
| **I-814** | Code du client - Customer Code |
| **I-815** | Registre de commerce - Trade Register |
| **I-816** | Catégorie de l'entreprise - Company Category |
| **I-817** | Objet de la facture - Invoice Purpose |
| **I-818** | Numéro CNSS - CNSS Number |
| **I-82** | Référence Banque - Bank Reference |
| **I-83** | Numéro bon de commande - Purchase Order Number |
| **I-84** | Numéro bon de livraison - Delivery Note Number |
| **I-85** | Numéro de l'autorisation de suspension de la TVA - VAT Suspension Authorization |
| **I-86** | Numéro de décompte - Statement Number |
| **I-87** | Numéro de marché public - Public Procurement Number |
| **I-871** | Nom marché public - Public Procurement Name |
| **I-88** | Référence TTN de la facture - TTN Reference |
| **I-89** | Numéro de la facture référenciée - Referenced Invoice Number |
| **I-80** | Autre - Other |

---

## 12. PAYMENT SPECIFICATIONS

### Payment Terms Codes (Référentiel I11 - Payment Terms)

| Code | Term |
|------|------|
| **I-111** | Basic |
| **I-112** | À une date fixe - Fixed Date |
| **I-113** | Avec une période de grâce - With Grace Period |
| **I-114** | Par virement bancaire - Bank Transfer |
| **I-115** | Exclusivement aux bureaux postaux - Postal Office Only |
| **I-116** | Autre - Other |
| **I-117** | Par facilité - Payment Facility |

### Payment Condition Codes (Référentiel I12 - Payment Conditions)

| Code | Condition |
|------|-----------|
| **I-121** | Paiement directe - Direct Payment |
| **I-122** | À travers une institution financière spécifique - Through Specific Financial Institution |
| **I-123** | Quelle que soit la banque - Any Bank |
| **I-124** | Autre - Other |

### Payment Means Codes (Référentiel I13 - Payment Means)

| Code | Means |
|------|-------|
| **I-131** | Espèce - Cash |
| **I-132** | Chèque - Check |
| **I-133** | Chèque certifié - Certified Check |
| **I-134** | Prélèvement bancaire - Bank Debit |
| **I-135** | Virement bancaire - Bank Transfer |
| **I-136** | Swift |
| **I-137** | Autre - Other |

### Financial Institution Codes (Référentiel I14 - Financial Institutions)

| Code | Institution |
|------|------------|
| **I-141** | Poste - Postal Service |
| **I-142** | Banque - Bank |
| **I-143** | Autre - Other |

---

## 13. SIGNATURE AND DIGITAL CERTIFICATION

### Signature Element Structure:

**Element**: `TEIF/ds:Signature`
**Namespace**: http://www.w3.org/2000/09/xmldsig#
**Type**: ds:SignatureType (W3C XMLDSIG)
**Max Occurrences**: Multiple (identified by `id` attribute)

### Signature Types by ID Attribute:

1. **Id="SigFrs"**
   - Electronic Signature by Supplier
   - Signs the entire message
   - Indicates supplier authorization

2. **Id="SigCEv"**
   - Electronic Signature of Visible Electronic Seal (QR Code)
   - Digital certification of the visible seal
   - TTN generated

3. **Id="SigTTN"**
   - Electronic Signature by TTN
   - Validates message by TTN
   - Confirms TTN processing completion

### Signature Children Elements (W3C XMLDSIG Standard):
- `ds:SignedInfo` - Information about what is signed
- `ds:SignatureValue` - Signature value
- `ds:KeyInfo` - Key information
- `ds:Object` - Additional objects (optional)

### Reference TTN Value Structure:

**Element**: `TEIF/RefTtnVal`
**Min Occ**: 0, Max Occ: 1
**Type**: RefTtnType (Complex)

**Children**:
1. `Reference`
   - Type: ReferenceType (Complex)
   - Max Length: 70
   - Attribute: `refID` (DataStringType_6, required) - Code from I8
   - Description: TTN reference value returned by TTN system

2. `ReferenceDate`
   - Type: DtmType (Complex)
   - Child: `DateText`
   - Description: Reference generation date

3. `ReferenceCev`
   - Type: DataStringType_4000
   - Max Length: 4000
   - Content: Base64-encoded QR code (visible electronic seal)
   - Description: Digital representation of invoice's visible seal

---

## 14. INVOICE BODY SECTIONS

### Invoice Header Information:

**Element**: `TEIF/InvoiceHeader`

**Key Components**:
- `Partner` Sections (Multiple, different functions):
  - Buyer (I-61)
  - Seller/Supplier (I-62, I-63)
  - Invoice Receiver (I-65)
  - Invoice Issuer (I-66)
  
- `Location` Sections (Multiple, different functions):
  - Delivery Address (I-51)
  - Payment Address (I-52)
  - Country of origin/purchase (I-53, I-54)

- `Reference` Section:
  - Related documents/orders
  - Reference qualifiers from I8

- `DateInfo` Sections:
  - Issue date (I-31)
  - Payment due date (I-32)
  - Billing period (I-36)

- `PaymentTermsAndMeans`:
  - Terms from I11
  - Conditions from I12
  - Means from I13
  - Financial institution from I14

### Invoice Body Structure:

**Element**: `TEIF/InvoiceBody`

**Required Children**:
1. `LinSection` - Line items container
   - Multiple `LinSegType/Lin` elements (1 to n)
   - Each line must have all required fields

2. `InvoiceMoa` - Invoice amounts
   - Type: MoaInvoiceType (Complex)
   - Min Occ: 1, Max Occ: unbounded
   - Contains `AmountDetails` with multiple `Moa` elements
   - Amount type codes from I17
   - Must include:
     - Total HT (Excluding Tax)
     - Tax amounts by type
     - Total TTC (Including Tax)

3. `InvoiceTax` - Invoice taxes
   - Type: TaxInvoiceType (Complex)
   - Min Occ: 1, Max Occ: 1
   - Contains `InvoiceTaxDetails` (1 to n)
   - Each detail includes:
     - `Tax` element with code from I16
     - `Moa` for amount and description

**Optional Children**:
4. `InvoiceAlc` - Invoice allowances/charges
   - Type: AlcInvoiceType (Complex)
   - Min Occ: 0, Max Occ: 1
   - Contains `AllowanceDetails` with code from I15

5. `SpecialConditions` - Special business conditions
   - Type: SpecialConditionsType (Complex)
   - Example: "Sales with tax suspension", "Export sales"
   - Max Length: 200 per condition

### Additional Documents Section:

**Element**: `TEIF/AdditionalDocuments`
**Type**: AdRefType (Complex)
**Min Occ**: 0, Max Occ: 1

**Children**:
1. `AdditionnalDocumentIdentifier` (DataStringType_35, max 35)
2. `AdditionnalDocumentName` (DataStringType_50, max 50)
3. `AdditionnalDocumentDate` (DtmType)

---

## 15. VALIDATION RULES AND CONSTRAINTS

### Mandatory Field Requirements:

1. **Partner Information**:
   - At least Supplier/Seller (I-62, I-63)
   - At least Buyer/Customer (I-61, I-64)
   - Each partner must have:
     - Identifier with type code (I-01 to I-04)
     - Name
     - At least one location (I-51 or I-52)

2. **Invoice Identification**:
   - Document type from I11 (mandatory)
   - Invoice number (unique)
   - Invoice date (I-31, mandatory)
   - Currency identifier (TND, EUR, or USD)

3. **Line Items**:
   - Minimum 1 line item required
   - Each line MUST have:
     - ItemIdentifier (max 35 chars)
     - ItemCode (in LinImd, max 35 chars)
     - Quantity with measurementUnit (max 8 chars)
     - Tax type code (from I16)
     - Amount with currencyIdentifier

4. **Amounts**:
   - Must follow monetary pattern: `-?[0-9]{1,15}(,[0-9]{2,5})?`
   - Decimal separator MUST be comma (,), not period
   - Currencies must be: TND, EUR, or USD
   - Amount type codes from I17

5. **Taxes**:
   - Each tax line must have:
     - Tax type code from I16
     - Tax rate value
     - Tax basis
     - Tax amount (monetary)
   - Multiple tax types allowed per line

6. **Date Format**:
   - All dates in `DateText` element (DtmType)
   - Date function codes from I3
   - ISO 8601 format implied for internal processing

### String Length Constraints:

| Field Type | Max Length | Usage |
|------------|-----------|--------|
| DataStringType_5 | 5 | Codes, tax basis |
| DataStringType_6 | 6 | Reference qualifiers, type codes |
| DataStringType_8 | 8 | Measurement units |
| DataStringType_20 | 20 | Currency codes |
| DataStringType_35 | 35 | Identifiers, item codes, names |
| DataStringType_50 | 50 | API codes, document names |
| DataStringType_200 | 200 | Descriptions, special services |
| DataStringType_500 | 500 | Item descriptions, amount text |
| DataStringType_4000 | 4000 | QR Code (Base64) |

### Recursive Structure Validation:

**SubLin Elements**:
- Can nest recursively
- Same structure as parent Lin
- Min Occ: 0, Max Occ: unbounded
- All validation rules apply to sub-lines

### Language Requirements:

- `lang` attribute enumerations: **ar**, **fr**, **en**, **or** (Other)
- Multiple language versions allowed for:
  - Item descriptions
  - Amount descriptions
  - API information
  - Special services

---

## 16. DIFFERENCES FROM TEIF 1.8.8 STANDARD

### Key Changes in TEIF V2.0:

1. **Enhanced Tax Support**:
   - More tax type codes (I16 expanded)
   - Added withholding tax (I-1604)
   - Added stamp duty (I-1601)
   - Better differentiation of special taxes

2. **Digital Certification**:
   - Integration with TTN (Tunisie TradeNet)
   - Three-tier signature system:
     - Supplier signature (SigFrs)
     - Visible seal signature (SigCEv)
     - TTN validation signature (SigTTN)
   - QR Code integration (ReferenceCev)

3. **Reference System**:
   - Expanded reference qualifiers (I8)
   - TTN reference tracking (I-88)
   - Support for multiple reference types

4. **Improved Amount Handling**:
   - Explicit amount type codes (I17)
   - Better currency handling (TND, EUR, USD)
   - Amount description in multiple languages

5. **Additional Documents**:
   - Support for attached/referenced documents
   - Document identification and dating

6. **Special Conditions**:
   - Explicit support for Tunisian business rules
   - VAT suspension scenarios
   - Export invoice differentiation

7. **Allowance/Charge Details**:
   - Enhanced allowance type codes (I15)
   - Percentage and special services support
   - Per-line and invoice-level allowances

---

## 17. TUNISIAN COMPLIANCE REQUIREMENTS

### Tax Identification Requirements:
- **Supplier/Seller**: Must provide Matricule Fiscal Tunisien (I-01) or approved alternative
- **Buyer**: Must provide valid identifier (I-01 to I-04 per business type)
- CNSS number for certain suppliers (I-818 reference qualifier)

### Currency Regulations:
- **Primary Currency**: Tunisian Dinar (TND)
- **Alternative Currencies**: EUR, USD allowed
- Must specify currencyIdentifier in all monetary amounts

### Tax Treatment:
- **Standard Taxes** supported: TVA (I-1602), FODEC (I-162), FODET (I-165)
- **VAT Suspension**: Referenced via amount code I-187
- **Export Invoices**: Document type I-15 for compliance
- **Tax-Exempt Goods**: Can be specified with appropriate tax codes

### Special Business Rules:
1. **Public Procurement**:
   - Document type I-14 (Décompte)
   - Reference I-87 (Public procurement number)
   - Reference I-871 (Public procurement name)

2. **Professional Fees**:
   - Document type I-13 (Note d'honoraire)
   - Specific partner and amount structure

3. **Export Operations**:
   - Document type I-15 (Facture Export)
   - Destination countries (I-59)
   - Incoterms code (I-47)

4. **Payment Requirements**:
   - Support for postal office payments (I-115)
   - Bank-specific conditions (I-122, I-123)
   - Payment facilities (I-117)

### Digital Signature Requirements:
- **Mandatory**: All invoices must be signed by issuer (SigFrs)
- **TTN Validation**: TTN adds validation signature (SigTTN)
- **Visible Seal**: QR Code generated and signed (SigCEv)
- **XMLDSIG Compliance**: W3C standard required

### Document Preservation:
- All invoices submitted through TTN system
- Reference maintained (I-88)
- Generated QR Code (Base64) stored
- Three-signature validation trail required

---

## 18. SPECIFIC BUSINESS RULES

### Line Item Requirements:
1. Each line must represent distinct item/service
2. Sub-lines (SubLin) allowed for grouped items
3. Quantity and measurement unit always required
4. Item code uniqueness per supplier recommended

### Allowance/Charge Rules:
1. Can be applied at line level (LinAlc) or invoice level (InvoiceAlc)
2. Must specify code from I15 (allowance type)
3. Can include percentage and description
4. Multiple allowances per line allowed

### Amount Calculation Rules:
1. **Total HT Formula**: Sum of all line items HT
2. **Tax Calculation**: (Line/Invoice Total HT) × Tax Rate
3. **Total TTC**: Total HT + Total Tax
4. **Allowances**: Reduce either HT or TTC based on application

### Reference Management:
1. Can reference:
   - Purchase orders (I-83)
   - Delivery notes (I-84)
   - Previous invoices (I-89)
   - Public procurement (I-87, I-871)
   - Customer account details (I-81)

2. Multiple references allowed per invoice
3. Each reference must have refID code (I8)

### Payment Terms:
1. Payment due date (I-32) preferred over general terms
2. If terms used, must be from I11 enumeration
3. Payment condition (I12) must be compatible with means (I13)
4. Financial institution (I14) required for bank-based payments

---

## 19. FILE STRUCTURE OVERVIEW

### Root Element:
**TEIF** (Main container)

### Direct Children (in order):
1. `InvoiceHeader` - Header information
2. `InvoiceBody` - Line items and amounts
3. `AdditionalDocuments` (Optional) - Supplementary documents
4. `RefTtnVal` (Optional) - TTN generated reference and QR code
5. `ds:Signature` (Multiple) - Three digital signatures

### Namespace Declaration:
```xml
<TEIF xmlns="..." xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
```

---

## 20. MAXIMUM OCCURRENCES AND MULTIPLICITY

| Element | Min Occ | Max Occ | Notes |
|---------|---------|---------|-------|
| Partner | 1 | n | Multiple partners with different roles |
| Location | 0 | n | Multiple locations for different purposes |
| Reference | 0 | n | Multiple reference types allowed |
| DateInfo | 1 | n | Multiple dates with different functions |
| LinSegType/Lin | 1 | n | At least one line item required |
| LinAlc (line level) | 0 | 1 | Max one allowance group per line |
| LinApi | 0 | 1 | Max one API details group per line |
| SubLin | 0 | unbounded | Recursive nesting allowed |
| InvoiceMoa | 1 | n | Multiple amount types required |
| InvoiceTax | 1 | 1 | One container, multiple tax details |
| InvoiceAlc | 0 | 1 | Optional invoice-level allowances |
| SpecialConditions | 0 | n | Multiple special conditions allowed |
| ds:Signature | 1 | 3 | Min 1 (supplier), typically 3 (including TTN) |

---

## SUMMARY OF CRITICAL IMPLEMENTATION POINTS

1. ✅ **Mandatory Fields**: Partner identifiers, invoice type, line items with tax
2. ✅ **Amount Format**: Regex pattern with comma decimals, max 35 chars
3. ✅ **Currencies**: TND primary, EUR/USD alternatives
4. ✅ **Tax Codes**: 14+ tax types from I16, each line must specify
5. ✅ **Signatures**: Three-tier system (Supplier, TTN, Seal)
6. ✅ **References**: 20+ reference types from I8 for flexibility
7. ✅ **Recursion**: SubLin elements support nested items
8. ✅ **Languages**: ar, fr, en, or supported on multiple elements
9. ✅ **Tunisian Compliance**: Specific business rules for public procurement, exports, professional fees
10. ✅ **Date Functions**: 8 date function types (I-31 to I-38)
11. ✅ **Allowances**: 5 types (I15) at line and invoice levels
12. ✅ **Partners**: 9 function types (I6) and multiple locations (I5)

---

**Document Generated From**: Guide d'Implémentation - TEIF V2.0 (© 2018 Tunisie TradeNet)
**Extraction Date**: January 10, 2026
**Total Specification Pages**: 83
