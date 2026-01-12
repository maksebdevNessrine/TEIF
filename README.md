# TEIF Pro - Tunisian Electronic Invoice Generator v1.8.8

Professional invoice generation platform for TEIF (Tunisian Electronic Invoice Format) 1.8.8 standard compliance.

## 📋 Overview

TEIF Pro is a React-based application that generates fully compliant TEIF 1.8.8 XML invoices. The application provides:

- ✅ **Full TEIF 1.8.8 Specification Compliance**
- 🔒 **Real-time Validation & Compliance Checking**
- 📅 **Optional Date Fields** (Delivery, Dispatch, Payment, Service Period, Signature, Other)
- 💰 **Allowances & Charges Management**
- 🏦 **IRC Withholding Tax Support**
- 🎯 **QR Code Generation** (Base64 encoded)
- 🌍 **Multilingual UI** (Arabic, French, English)
- 📊 **Live Compliance Score & Reporting**

## 🚀 Quick Start

### Installation

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## 📖 Field Reference (TEIF I-XX Codes)

### Mandatory Fields
- **I-31**: Invoice Date (required) - Format: ddMMyy or YYYY-MM-DD in form
- **I-BBN**: Invoice Number - Alphanumeric, max 30 chars
- **I-01 to I-04**: Partner ID Types (Matricule Fiscal, C.I.N, Passport, MF Non-Tunisien)
- **I-62**: Supplier Partner Code (default)
- **I-64**: Buyer Partner Code (default)

### Optional Dates (Collapsible Section)
| Code | Field | Format | Required |
|------|-------|--------|----------|
| I-31 | Issue Date | ddMMyy | ✅ Yes |
| I-32 | Due Date | ddMMyy | ❌ No |
| I-33 | Delivery Date | ddMMyy | ❌ No |
| I-34 | Dispatch Date | ddMMyy | ❌ No |
| I-35 | Payment Date | ddMMyy | ❌ No |
| I-36 | Service Period | ddMMyy-ddMMyy | ❌ No |
| I-37 | Signature Date/Time | ddMMyyHHmm | ❌ No |
| I-38 | Other Date | ddMMyy | ❌ No |

### Allowances & Charges (I-151 through I-155)
- **I-151**: General Discount
- **I-152**: Freight Charge
- **I-153**: Standard Discount (global discount)
- **I-154**: Insurance
- **I-155**: Handling Charges

### Partner Function Codes (I-61 through I-69)
| Code | Role | Usage |
|------|------|-------|
| I-61 | Previous Partner | Optional |
| I-62 | Supplier | Default for supplier |
| I-63 | Ship-to Party | Optional |
| I-64 | Buyer | Default for buyer |
| I-65 | Payment Receiver | Optional |
| I-66 | Delivery Party | Optional |
| I-67 | Ultimate Customer | Optional |
| I-68 | Goods Recipient | Optional |
| I-69 | Bill Recipient | Optional |

### Payment Methods (I-114 through I-120)
| Code | Method |
|------|--------|
| I-114 | Bank Transfer (Virement) |
| I-115 | Postal Mail |
| I-116 | Cash |
| I-117 | Check |
| I-118 | Credit Card |
| I-119 | Electronic Payment |
| I-120 | Other |

### Unit Codes
UNIT, KG, H, TON, L, M, M2, M3, KWH

### Tax Information
- **I-1603**: FODEC Tax (1%)
- **I-1604**: IRC Withholding Tax (0-10%, optional)
- **I-162**: VAT Rate (0%, 7%, 13%, or 19%)
- **I-176**: Allowance Amount
- **I-178**: Stamp Duty
- **I-180**: Total Invoice Amount (TTC)

## ✅ Validation Rules

### Input Validation
- **RIB**: MOD 97 checksum validation (20 digits)
- **Tax ID**: 8-10 digits for Tunisia
- **Email**: Standard email format validation
- **Phone**: Minimum 8 digits
- **Dates**: YYYY-MM-DD format validation
- **Signature Date**: ddMMyyHHmm format (e.g., 1012241430 = 10/12/24 14:30)
- **Amounts**: 0 to 9,999,999,999.99999 with max 5 decimal places
- **Tax Rate**: Must be 0, 0.07, 0.13, or 0.19
- **IRC Rate**: 0 to 10%

### Business Rules (Compliance Checker)
- At least one line item required
- Total TTC must be ≥ 0
- Global discount cannot exceed subtotal
- IRC rate between 0-10%
- Partner identifiers valid format
- Decimal precision max 5 places
- Line quantities > 0
- Line unit prices ≥ 0

## 🔧 Features

### Real-Time Validation
- Inline error messages in partner forms
- Compliance scoring (0-100%)
- Error and warning categorization
- Detailed validation reports

### Collapsible Sections
- Optional Dates (I-33 through I-38)
- Allowances & Charges (I-151 through I-155)
- Partner Type selection (I-61 through I-69)

### IRC Withholding Tax
For professional services in Tunisia:
- Enter IRC Rate (0-10%)
- Automatically deducted from TTC
- Reason for exemption (optional)

### QR Code
Automatic generation containing:
- Supplier ID | Invoice Number | Date | Total TTC | Total VAT
- Base64 encoded for XML embedding

## 📁 Project Files

- **components/InvoiceForm.tsx**: Main form with collapsible sections
- **components/XmlPreview.tsx**: XML display with compliance indicators
- **services/xmlGenerator.ts**: Core XML generation (TEIF 1.8.8)
- **services/validators.ts**: Input validation rules
- **services/complianceChecker.ts**: Business rules validation
- **services/i18n.ts**: Translation system
- **types.ts**: TypeScript interfaces
- **App.tsx**: Main application container

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run tsc

# Preview build
npm run preview
```

### Technologies
- React 19.2.3
- TypeScript 5.8.2
- Vite 6.4.1
- Tailwind CSS

## 📊 Compliance Scoring

The app displays real-time compliance status:
- **✅ Compliant**: All mandatory fields valid
- **⚠️ Warnings**: Recommendations (e.g., bank details for transfers)
- **❌ Errors**: Blocking issues
- **Score**: Percentage based on completeness & validation

## 🌐 Languages

- 🇫🇷 Français (French)
- 🇦🇪 العربية (Arabic)
- 🇬🇧 English

## 📝 Example Usage

### Minimal Invoice

```json
{
  "documentType": "I-11",
  "documentNumber": "INV/2024/001",
  "invoiceDate": "2024-12-10",
  "operationNature": "GOODS",
  "currency": "TND",
  "supplier": {
    "idType": "I-01",
    "idValue": "1234567890",
    "name": "Supplier Inc.",
    "addressDescription": "123 Main St",
    "city": "Tunis",
    "postalCode": "1000",
    "country": "TN"
  },
  "buyer": {
    "idType": "I-01",
    "idValue": "9876543210",
    "name": "Buyer Corp.",
    "addressDescription": "456 Oak Ave",
    "city": "Sfax",
    "postalCode": "3000",
    "country": "TN"
  },
  "lines": [{
    "id": "L001",
    "description": "Product A",
    "quantity": 100,
    "unit": "UNIT",
    "unitPrice": 50.000,
    "taxRate": 0.19,
    "fodec": false,
    "discountRate": 0
  }],
  "globalDiscount": 0,
  "stampDuty": 1.000,
  "paymentMeans": "I-114",
  "bankName": "BANK ABC",
  "bankRib": "10654006954321300000000"
}
```

### With Optional Features

```json
{
  "// ... base fields ...": "",
  "deliveryDate": "2024-12-12",
  "dispatchDate": "2024-12-11",
  "paymentDate": "2024-12-20",
  "periodStart": "2024-12-01",
  "periodEnd": "2024-12-15",
  "signatureDate": "1012241430",
  "ircRate": 0.05,
  "allowances": [{
    "id": "alc-1",
    "type": "allowance",
    "code": "I-153",
    "description": "Volume discount",
    "amount": 500.000,
    "basedOn": "invoice"
  }],
  "qrCodeEnabled": true
}
```

## 🎯 Common Tasks

### Adding Optional Dates
1. Click "📅 Optional Dates" button to expand section
2. Fill in any or all of: I-33, I-34, I-35, I-36 (range), I-37, I-38
3. Dates automatically included in XML when provided

### Adding Allowances
1. Click "💰 Allowances, Charges & Partner Types" button
2. Select type (Allowance or Charge)
3. Select code (I-151 to I-155)
4. Enter amount
5. Click "+ Add Allowance" to add more

### Changing Partner Types
1. Expand "💰 Allowances..." section
2. Select partner type from dropdowns
3. Default: Supplier (I-62), Buyer (I-64)

### Enabling IRC Tax
1. Go to Payment section
2. Enter IRC Rate (%)
3. Amount automatically calculated

## 📞 Support

### TEIF 1.8.8 Reference
- Unsigned XML format (no digital signature)
- DOT decimal separator only (.)
- Max 5 decimal places
- ddMMyy date format (or ddMMyyHHmm for signature)

### Troubleshooting

**Q: Can't download invoice**
- Check Compliance Score in XML Preview
- All errors in red must be fixed
- All mandatory fields required

**Q: RIB validation fails**
- Verify 20-digit format
- Check checksum: MOD 97 validation
- Example valid: `10654006954321300000000`

**Q: Signature date format wrong**
- Use: ddMMyyHHmm (10 digits exactly)
- Example: `1012241430` = 10/12/24 14:30
- Validate: dd (01-31), MM (01-12), HH (00-23), mm (00-59)

**Q: Why decimal only 3 places in output?**
- TEIF standard uses `toFixed(3)` for display
- Precision maintained internally (up to 5 decimals)
- Amounts truncated for XML output

---

**TEIF Standard**: 1.8.8  
**Last Updated**: December 2024  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
