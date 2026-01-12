# TEIF 1.8.8 Implementation Plan - Detailed

**Date Created:** January 10, 2026  
**Status:** PLANNING PHASE  
**Overall Scope:** 15 features across 4 phases  
**Total Estimated Effort:** 15-20 hours  

---

## PHASE 0: Critical Fixes (Already Completed) ✅
**Status:** DONE  
**Time:** 45 minutes  

✅ 1. Payment method codes: I-131→I-114 (types.ts)
✅ 2. Email communication code: I-102→I-103 (xmlGenerator.ts)  
✅ 3. Buyer partner code: I-61→I-64 (xmlGenerator.ts)
✅ 4. Service period format: I-34,I-35→I-36 range (xmlGenerator.ts)
✅ 5. Unit codes: PCE/KGM/etc→UNIT/KG/H/TON (types.ts)

---

## PHASE 1: Core Data Model Enhancements
**Priority:** 🔴 HIGH  
**Estimated Time:** 2-3 hours  
**Dependencies:** None  

### Task 1.1: Extend Partner Types
**File:** types.ts  
**Changes:**
- Add PartnerFunction type: 'I-61' | 'I-62' | 'I-63' | 'I-64' | 'I-65' | 'I-66' | 'I-67' | 'I-68' | 'I-69'
- Add optional `partnerType` field to Partner interface
- Keep default I-62 (supplier) and I-64 (buyer) for backward compatibility

**Complexity:** LOW  
**Test:** Verify XML generates with different partner codes

### Task 1.2: Add Optional Date Fields
**File:** types.ts (InvoiceData interface)  
**Changes:**
- Add `deliveryDate?: string` (I-33)
- Add `dispatchDate?: string` (I-34)
- Add `paymentDate?: string` (I-35)
- Add `signatureDate?: string` (I-37, format: ddMMyyHHmm)
- Add `otherDate?: string` (I-38)

**Complexity:** LOW  
**Test:** Verify optional fields don't break when empty

### Task 1.3: Add Allowance/Charge Support
**File:** types.ts  
**Changes:**
- Create AllowanceCharge interface:
  ```typescript
  interface AllowanceCharge {
    id: string;
    type: 'allowance' | 'charge'; // -/+
    code: 'I-151' | 'I-152' | 'I-153' | 'I-154' | 'I-155';
    description: string;
    amount: number;
    basedOn?: 'line' | 'invoice';
    lineId?: string;
  }
  ```
- Add `allowances: AllowanceCharge[]` to InvoiceData
- Add `allowances: AllowanceCharge[]` to InvoiceLine

**Complexity:** MEDIUM  
**Test:** Verify calculation order (line allowances → subtotal → invoice allowances)

### Task 1.4: Add IRC Withholding Tax Support
**File:** types.ts  
**Changes:**
- Add `ircRate?: number` to InvoiceData (0-10%)
- Add `ircAmount?: number` to InvoiceData
- Add `ircExemptionReason?: string` for exemptions

**Complexity:** LOW  
**Test:** Verify IRC calculation and XML output

### Task 1.5: Add QR Code Support
**File:** types.ts  
**Changes:**
- Add `qrCodeEnabled?: boolean` to InvoiceData
- Add optional `qrCodeContent?: string` (base64)

**Complexity:** LOW  
**Test:** Verify field structure

---

## PHASE 2: Form Components Enhancement
**Priority:** 🟡 MEDIUM  
**Estimated Time:** 3-4 hours  
**Dependencies:** Phase 1 completion  

### Task 2.1: Optional Date Fields in Form
**File:** components/InvoiceForm.tsx  
**Changes:**
- Add date inputs for: deliveryDate, dispatchDate, paymentDate, signatureDate, otherDate
- Place in collapsible "Optional Dates" section
- Add date formatting validation
- Ensure signature timestamp uses correct format (ddMMyyHHmm)

**Complexity:** MEDIUM  
**Test:** Verify date inputs render and save correctly

### Task 2.2: Allowance/Charge Line Items
**File:** components/InvoiceForm.tsx  
**Changes:**
- Add section for invoice-level allowances
- Add allowance/charge button to line item rows
- Create modal/panel for allowance details
- Display calculated totals showing impact

**Complexity:** MEDIUM-HIGH  
**Test:** Verify calculations reflect in totals

### Task 2.3: Partner Type Selection
**File:** components/InvoiceForm.tsx  
**Changes:**
- Keep supplier as I-62 (hidden)
- Change buyer to dropdown: I-64, I-61, I-63, I-65-I-69
- Add informational labels explaining each type

**Complexity:** LOW  
**Test:** Verify partner type appears in XML

### Task 2.4: Input Validation
**File:** components/InvoiceForm.tsx  
**Changes:**
- Identifier format validation:
  - I-01: 13-character, numeric start, pattern check
  - I-02: 8 digits
  - I-03: 9 digits
- Date validation:
  - Invoice date not in future
  - Due date ≥ Invoice date
  - Delivery date ≥ Invoice date
  - Dispatch date ≥ Delivery date
- Amount validation:
  - Positive values only
  - Decimal precision max 5 places
- Quantity validation:
  - > 0
  - Max 2 decimal places

**Complexity:** MEDIUM  
**Test:** Try invalid inputs, verify error messages

---

## PHASE 3: XML Generator Updates
**Priority:** 🔴 HIGH  
**Estimated Time:** 4-5 hours  
**Dependencies:** Phase 1 completion  

### Task 3.1: Update Partner Rendering
**File:** services/xmlGenerator.ts - renderPartner()  
**Changes:**
- Accept partnerFunction parameter instead of hardcoding
- Update function signature to use dynamic role parameter
- Ensure all 9 partner types render correctly
- Add comments explaining each type

**Complexity:** LOW  
**Test:** Generate XML with each partner type

### Task 3.2: Implement Optional Dates
**File:** services/xmlGenerator.ts - generateTeifXml()  
**Changes:**
- Add conditional rendering for each optional date:
  - I-33: deliveryDate (ddMMyy)
  - I-34: dispatchDate (ddMMyy)
  - I-35: paymentDate (ddMMyy)
  - I-37: signatureDate (ddMMyyHHmm)
  - I-38: otherDate (ddMMyy)
- Maintain I-36 service period range

**Complexity:** LOW  
**Test:** Verify dates appear/disappear based on input

### Task 3.3: Implement Allowances Section
**File:** services/xmlGenerator.ts  
**Changes:**
- Create InvoiceAlc section structure
- Render allowance for global discount with code I-153
- Add line-level allowances (LinAlc) if present
- Calculate impact on totals correctly

**Complexity:** MEDIUM-HIGH  
**Test:** Verify allowance calculations in XML

### Task 3.4: Implement IRC Withholding Tax
**File:** services/xmlGenerator.ts - generateTeifXml()  
**Changes:**
- Add InvoiceTax element for I-1604 when ircRate > 0
- Calculate IRC amount correctly
- Update total calculation to include IRC as deduction

**Complexity:** LOW  
**Test:** Verify IRC reduces final amount due

### Task 3.5: Implement QR Code Generation
**File:** services/xmlGenerator.ts - generateQrString()  
**Changes:**
- Keep QR string generation function
- Add base64 encoding (use btoa())
- Add ReferenceCEV element to RefTtnVal section
- Make QR code optional based on flag

**Complexity:** MEDIUM  
**Test:** Verify QR code appears in XML when enabled

### Task 3.6: Multi-language Amount Descriptions
**File:** services/xmlGenerator.ts - numberToLettersFr()  
**Changes:**
- Rename to `numberToLetters(language: 'fr' | 'ar' | 'en')`
- Implement English translation
- Implement Arabic translation
- Generate AmountDescription for each language in data

**Complexity:** MEDIUM-HIGH  
**Test:** Verify text for multiple languages

### Task 3.7: Update Amount Type Codes
**File:** services/xmlGenerator.ts  
**Changes:**
- Add missing amount codes where applicable:
  - I-179: Invoice line net
  - I-181: Prepaid
  - I-182: VAT amount
  - I-172-I-175: Line allowances
  - I-184-I-188: Various

**Complexity:** MEDIUM  
**Test:** Verify all amount codes present where needed

---

## PHASE 4: Validation & Quality Assurance
**Priority:** 🟡 MEDIUM  
**Estimated Time:** 3-4 hours  
**Dependencies:** Phases 1-3 completion  

### Task 4.1: XSD Schema Validation
**File:** New: services/xsdValidator.ts  
**Changes:**
- Create validator utility that checks XML against XSD
- Implement pre-download validation
- Display validation errors in UI
- Support both signed/unsigned schemas

**Complexity:** MEDIUM-HIGH  
**Effort:** 2-3 hours  
**Test:** Validate sample invoices against XSD

### Task 4.2: Client-side Validation Enhancement
**File:** components/InvoiceForm.tsx  
**Changes:**
- Real-time format validation with visual feedback
- Show validation errors inline
- Disable download until form is valid
- Display compliance warnings

**Complexity:** MEDIUM  
**Test:** Fill form with invalid data, verify messages

### Task 4.3: Add Compliance Checker
**File:** New: services/complianceChecker.ts  
**Changes:**
- Create function to verify against SPECS
- Check all required fields
- Check all codes are valid
- Check calculations are correct
- Report any deviations

**Complexity:** LOW-MEDIUM  
**Effort:** 1-2 hours  
**Test:** Run against sample data

### Task 4.4: XML Preview Enhancement
**File:** components/XmlPreview.tsx  
**Changes:**
- Add syntax highlighting
- Add validation indicator
- Show compliance status
- Allow copy-to-clipboard
- Add line wrapping toggle

**Complexity:** LOW  
**Test:** Verify preview displays correctly

### Task 4.5: Testing & Documentation
**Changes:**
- Update SPECS.md with new features
- Update types.ts JSDoc comments
- Create test cases for edge cases
- Document validation rules
- Add usage examples

**Complexity:** LOW-MEDIUM  
**Test:** Verify documentation accuracy

---

## DEPENDENCY GRAPH

```
Phase 1 (Data Model)
    ├─→ Phase 2 (Forms) ─→ Phase 3 (XML) ─→ Phase 4 (QA)
    └─→ Phase 3 (XML) ─────────────────────→ Phase 4 (QA)
```

No circular dependencies. Execution can proceed linearly Phase 1 → 2 → 3 → 4.

---

## RISK ASSESSMENT

### High Risk Items
1. **Multi-language translations:** Error in translation → incorrect invoice
   - Mitigation: Test each language thoroughly, use native speaker review
   
2. **Complex allowance calculations:** Order of operations critical
   - Mitigation: Create detailed test cases, verify against examples

3. **XSD validation:** False positives/negatives
   - Mitigation: Test against provided XSD files and examples

### Medium Risk Items
4. Partner type changes: Could break existing invoices
   - Mitigation: Default to existing types, add migration warnings

5. Date format changes: Subtle formatting issues
   - Mitigation: Add comprehensive date formatting tests

---

## SUCCESS CRITERIA

✅ All 15 features implemented and tested  
✅ Zero validation errors on sample invoices  
✅ XML passes XSD schema validation  
✅ All optional fields work correctly  
✅ Multi-language output verified  
✅ Compliance audit shows 85%+ completion  
✅ No breaking changes to existing functionality  
✅ App remains production-ready after changes  

---

## TIMELINE ESTIMATE

| Phase | Task Count | Est. Hours | Risk | Status |
|-------|-----------|----------|------|--------|
| Phase 1 | 5 | 2-3 | LOW | Planning |
| Phase 2 | 4 | 3-4 | MED | Planning |
| Phase 3 | 7 | 4-5 | MED | Planning |
| Phase 4 | 5 | 3-4 | HIGH | Planning |
| **Total** | **21** | **15-20** | **MEDIUM** | **Ready to Execute** |

---

## EXECUTION CHECKLIST

- [ ] Phase 1 tasks complete and tested
- [ ] Phase 2 tasks complete and tested
- [ ] Phase 3 tasks complete and tested
- [ ] Phase 4 tasks complete and tested
- [ ] All XML samples validate against XSD
- [ ] Compliance audit updated
- [ ] Documentation updated
- [ ] App tested end-to-end
- [ ] Ready for production deployment

