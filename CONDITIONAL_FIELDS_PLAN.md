# Conditional Fields Implementation Plan
## TEIF 1.8.8 Invoice Generator - Field Visibility & Dependency Management

**Purpose:** Implement intelligent conditional field visibility across the invoice form based on business rules and user selections.

---

## 📋 COMPREHENSIVE TODO LIST

### Phase 1: Analysis & Documentation (3 tasks)

- [ ] **1.1** Create ConditionalFieldsStrategy.ts utility to manage field visibility rules
- [ ] **1.2** Document all conditional field rules based on TEIF specifications
- [ ] **1.3** Create FormVisibilityManager.ts for state management of field visibility

### Phase 2: Date Fields Conditional Logic (5 tasks)

- [ ] **2.1** Show periodStart/periodEnd (I-36 Range) ONLY when operationNature = "SERVICES" or "MIXED"
- [ ] **2.2** Show dueDate (I-32) ONLY when documentType is NOT "I-16" (Bon de commande)
- [ ] **2.3** Show deliveryDate (I-33) ONLY when operationNature includes "GOODS"
- [ ] **2.4** Show dispatchDate (I-34) ONLY when operationNature includes "GOODS"
- [ ] **2.5** Add visual indicators for conditional vs mandatory vs optional fields

### Phase 3: Payment & Banking Conditional Logic (6 tasks)

- [ ] **3.1** Show bankRib (RIB), bankCode, bankName ONLY when paymentMeans = "I-114" (Virement bancaire)
- [ ] **3.2** Show checkNumber field ONLY when paymentMeans = "I-117" (Chèque)
- [ ] **3.3** Show cardDetails field ONLY when paymentMeans = "I-118" (Carte bancaire)
- [ ] **3.4** Show wireTransferDetails ONLY when paymentMeans = "I-114"
- [ ] **3.5** Show paymentDate (I-35) ONLY when paymentMeans is selected
- [ ] **3.6** Add payment method-specific validation rules

### Phase 4: Partner Information Conditional Logic (4 tasks)

- [ ] **4.1** Show RC (Registre Commerce) field ONLY when partner.idType = "I-01" (Matricule Fiscal)
- [ ] **4.2** Show Capital field ONLY when partner.idType = "I-01"
- [ ] **4.3** Show partnerType dropdowns ONLY when available for specific roles
- [ ] **4.4** Make email/phone mandatory only for specific partner types

### Phase 5: Line Item Conditional Logic (5 tasks)

- [ ] **5.1** Show exemptionReason (I-110) ONLY when taxRate = 0%
- [ ] **5.2** Show FODEC checkbox ONLY when operationNature includes "GOODS"
- [ ] **5.3** Show itemCode field as mandatory ONLY for GOODS, optional for SERVICES
- [ ] **5.4** Show discount fields ONLY when discountRate > 0
- [ ] **5.5** Validate line unit selection based on operationNature

### Phase 6: Tax & Fiscal Conditional Logic (4 tasks)

- [ ] **6.1** Show IRCExemption fields ONLY when IRC tax applies
- [ ] **6.2** Show stampDuty field ONLY when documentType requires it
- [ ] **6.3** Disable FODEC for services (operationNature = "SERVICES")
- [ ] **6.4** Show globalDiscount field ONLY when multiple items exist

### Phase 7: Document Type Specific Logic (5 tasks)

- [ ] **7.1** Hide orderReference when documentType = "I-11" (Facture)
- [ ] **7.2** Make contractReference mandatory when documentType = "I-14" (Décompte)
- [ ] **7.3** Show deliveryNoteReference ONLY for documentType "I-11", "I-12", "I-15"
- [ ] **7.4** Show creditReason (I-114) ONLY when documentType = "I-12" (Facture d'avoir)
- [ ] **7.5** Adjust required fields based on document type

### Phase 8: Reference Fields Conditional Logic (4 tasks)

- [ ] **8.1** Show orderReference (I-121) ONLY when documentType supports purchase orders
- [ ] **8.2** Show contractReference (I-120) ONLY when documentType = "I-14" (Décompte)
- [ ] **8.3** Show deliveryNoteReference (I-122) ONLY for goods-based invoices
- [ ] **8.4** Add validation for reference field formats based on type

### Phase 9: UI/UX Enhancements (6 tasks)

- [ ] **9.1** Add field dependency badges/icons to show conditions
- [ ] **9.2** Show "Available when..." tooltips for disabled fields
- [ ] **9.3** Add smooth animations for field show/hide transitions
- [ ] **9.4** Group conditional fields with visual separators (colored borders/backgrounds)
- [ ] **9.5** Create a "Field Visibility Matrix" table showing all conditions
- [ ] **9.6** Add accessibility ARIA labels for conditional fields

### Phase 10: Validation & Compliance (5 tasks)

- [ ] **10.1** Update complianceChecker.ts to validate only visible fields
- [ ] **10.2** Skip validation for hidden conditional fields
- [ ] **10.3** Create conditional validation rules engine
- [ ] **10.4** Add warnings for incomplete conditional sections
- [ ] **10.5** Test all conditional validation paths

### Phase 11: Testing (7 tasks)

- [ ] **11.1** Create ConditionalFields.test.ts unit tests
- [ ] **11.2** Test all operationNature combinations (GOODS, SERVICES, MIXED)
- [ ] **11.3** Test all documentType combinations
- [ ] **11.4** Test all paymentMeans combinations
- [ ] **11.5** Test partner idType conditions
- [ ] **11.6** Create E2E tests for conditional workflows
- [ ] **11.7** Test edge cases and validation compliance

### Phase 12: Documentation & Finalization (4 tasks)

- [ ] **12.1** Create CONDITIONAL_FIELDS_GUIDE.md documentation
- [ ] **12.2** Document all conditional rules with examples
- [ ] **12.3** Add JSDoc comments to all conditional functions
- [ ] **12.4** Update README with new form behavior

---

## 🎯 CONDITIONAL FIELD RULES MATRIX

### Operation Nature (operationNature)
| Field | GOODS | SERVICES | MIXED | Notes |
|-------|-------|----------|-------|-------|
| deliveryDate | ✅ | ❌ | ✅ | Delivery only for physical goods |
| dispatchDate | ✅ | ❌ | ✅ | Shipping info only for goods |
| periodStart/End | ❌ | ✅ | ✅ | Service period for services/mixed |
| itemCode | ✅ (Mandatory) | ✅ (Optional) | ✅ | Product code for goods |
| FODEC | ✅ | ❌ | ✅ | Only for physical products |

### Document Type (documentType)
| Field | I-11 | I-12 | I-13 | I-14 | I-15 | I-16 | Notes |
|-------|------|------|------|------|------|------|-------|
| dueDate | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | PO has no due date |
| deliveryNoteRef | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | PO-related only |
| orderReference | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ | Purchase reference |
| contractReference | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | Public contract only |
| creditReason | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | Credit note only |

### Payment Means (paymentMeans)
| Field | I-114 (Wire) | I-115 (Mail) | I-116 (Cash) | I-117 (Check) | I-118 (Card) | I-119 (E-Pay) | I-120 (Other) |
|-------|--------------|-------------|------------|---------------|-------------|--------------|--------------|
| bankRib | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| bankCode | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| checkNumber | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| cardDetails | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| bankName | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Partner ID Type (partner.idType)
| Field | I-01 (MF) | I-02 (CIN) | I-03 (Passport) | I-04 (MF Non-Tunis) |
|-------|-----------|-----------|-----------------|------------------|
| RC | ✅ | ❌ | ❌ | ❌ |
| Capital | ✅ | ❌ | ❌ | ❌ |
| SIREN | ✅ | ❌ | ❌ | ❌ |

### Tax Rate (line.taxRate)
| Field | 0% | 7% | 13% | 19% | Notes |
|-------|-----|-----|------|------|-------|
| exemptionReason | ✅ | ❌ | ❌ | ❌ | I-110: Required for 0% rate |
| FODEC | ❌ | ✅ | ✅ | ✅ | Only non-exempt items |

---

## 🔧 IMPLEMENTATION STRATEGY

### Step 1: Create Utility File - ConditionalFieldsStrategy.ts
Define all conditional field rules in a centralized configuration object

### Step 2: Create State Manager - FormVisibilityManager.ts
Manage which fields should be visible based on current form state

### Step 3: Create Helper Hook - useConditionalFields.ts
React hook to easily determine if a field should be visible

### Step 4: Update InvoiceForm.tsx
- Wrap conditional sections with visibility checks
- Add visual indicators for conditional fields
- Add animations for show/hide transitions

### Step 5: Update Validators & Compliance Checker
- Skip validation for hidden fields
- Add conditional validation rules

### Step 6: Add Tests
- Unit tests for conditional logic
- E2E tests for user workflows
- Validation compliance tests

### Step 7: Documentation
- Create comprehensive guide
- Add code comments
- Update README

---

## 📊 ESTIMATED IMPACT

**Total Tasks:** 48  
**Phases:** 12  
**Estimated Effort:** 6-8 hours  
**Files to Create:** 5-7 new utility files  
**Files to Modify:** 4-5 existing files  
**Test Files:** 3-4 new test files  

---

## ✅ SUCCESS CRITERIA

- [ ] All conditional fields show/hide correctly based on selections
- [ ] No validation errors for hidden fields
- [ ] User experience is intuitive with clear visual cues
- [ ] 100% test coverage of conditional logic
- [ ] No performance degradation
- [ ] Full documentation of all rules
- [ ] Accessibility compliance maintained

---

**Status:** Ready for Implementation  
**Priority:** High (Core Feature)  
**Complexity:** Medium (State Management + UI Logic)

