# Naming Convention Reference Guide

**Quick Reference for TEIF Visibility & Field Naming**

---

## 🎯 Three-Layer Naming Pattern

### Layer 1: Data (InvoiceData Interface)
**Location:** [types.ts](types.ts)  
**Pattern:** Direct field names (no prefix)  
**Examples:**
```typescript
data.bankRib              // Wire transfer - Account number
data.bankCode             // Wire transfer - Bank code
data.bankName             // Wire transfer - Bank name
data.checkNumber          // Check payment - Check number
data.cardType             // Card payment - Card type
data.orderReference       // Document reference - PO reference
data.contractReference    // Document reference - Contract reference
data.creditReason         // Credit notes - Reason
data.stampDuty            // Tax fields - Stamp duty amount
```

---

### Layer 2: Strategy (ConditionalFieldsStrategy)
**Location:** [services/ConditionalFieldsStrategy.ts](services/ConditionalFieldsStrategy.ts)  
**Pattern:** Unprefixed visibility keys (internal)  
**Returns:**
```typescript
{
  dueDate: boolean,
  deliveryDate: boolean,
  dispatchDate: boolean,
  servicePeriod: boolean,
  bankingDetails: boolean,
  rib: boolean,
  bankCode: boolean,
  checkNumber: boolean,
  orderReference: boolean,
  // ... etc (no "show" prefix)
}
```

**Internal Use:** Validation, rule checking, business logic

---

### Layer 3: Hook (useConditionalFields)
**Location:** [services/useConditionalFields.ts](services/useConditionalFields.ts)  
**Pattern:** Prefixed "show" keys (presentation ready)  
**Returns:**
```typescript
{
  showDueDate: boolean,              // Maps from: dueDate
  showDeliveryDate: boolean,         // Maps from: deliveryDate
  showDispatchDate: boolean,         // Maps from: dispatchDate
  showServicePeriod: boolean,        // Maps from: servicePeriod
  showBankingDetails: boolean,       // Maps from: bankingDetails
  showCheckNumber: boolean,          // Maps from: checkNumber
  showOrderReference: boolean,       // Maps from: orderReference
  showContractReference: boolean,    // Maps from: contractReference
  // ... etc (all prefixed with "show")
}
```

**Usage:** JSX conditional rendering in components

---

## ✅ Component Usage Pattern

### Correct Way (InvoiceForm.tsx)

```typescript
// ✅ CORRECT: Use visibility object with "show" prefix
const visibility = useConditionalFields(data, expandedSections);

// Conditional rendering
{visibility.showDueDate && (
  <FormInput 
    label="Due Date" 
    value={data.dueDate}  // Access data directly
    onChange={(e) => updateField('dueDate', e.target.value)}
  />
)}

{visibility.showDeliveryDate && (
  <FormInput 
    label="Delivery Date" 
    value={data.deliveryDate}  // Access data directly
    onChange={(e) => updateField('deliveryDate', e.target.value)}
  />
)}

{visibility.showBankingDetails && (
  <>
    <FormInput 
      label="Bank RIB"
      value={data.bankRib}  // Access data property name directly
      onChange={(e) => updateField('bankRib', e.target.value)}
    />
    <FormInput 
      label="Bank Code"
      value={data.bankCode}
      onChange={(e) => updateField('bankCode', e.target.value)}
    />
  </>
)}
```

### ❌ Incorrect Ways

```typescript
// ❌ WRONG: Using unprefixed visibility keys
{visibility.dueDate && (...)}        // Missing "show" prefix
{visibility.deliveryDate && (...)}   // Missing "show" prefix

// ❌ WRONG: Using wrong data properties
updateField('bankingDetails', ...)   // Should be 'bankRib', 'bankCode', etc.
updateField('rib', ...)              // Should be 'bankRib'

// ❌ WRONG: Nesting data in visibility object
visibility.showBankingDetails.bankRib  // Hook only returns boolean!
```

---

## 🔄 Adding New Conditional Fields

**Checklist for adding a new conditional field:**

1. **Add to InvoiceData interface** ([types.ts](types.ts))
   ```typescript
   interface InvoiceData {
     myNewField?: string;  // Add with actual name
   }
   ```

2. **Add visibility rule** ([services/ConditionalFieldsStrategy.ts](services/ConditionalFieldsStrategy.ts))
   ```typescript
   showMyNewField: (data) => {
     return data.documentType === 'I-XX';  // Your rule
   }
   ```

3. **Update hook mapping** ([services/useConditionalFields.ts](services/useConditionalFields.ts))
   ```typescript
   showMyNewField: raw.myNewField,  // Map to prefixed
   ```

4. **Use in component** ([components/InvoiceForm.tsx](components/InvoiceForm.tsx))
   ```typescript
   {visibility.showMyNewField && (
     <FormInput
       label="My New Field"
       value={data.myNewField}
       onChange={(e) => updateField('myNewField', e.target.value)}
     />
   )}
   ```

5. **Add test** ([__tests__/conditional-fields/ConditionalFields.test.ts](__tests__/conditional-fields/ConditionalFields.test.ts))
   ```typescript
   it('should show myNewField when...', () => {
     const visibility = getConditionalFieldsVisibility(testData);
     expect(visibility.myNewField).toBe(true);
   });
   ```

---

## 📋 Complete Visibility Mapping

**All 30+ visibility keys with their sources:**

| Visibility Key (Hook Return) | Strategy Key (Internal) | Form Property | Condition |
|------|------|------|------|
| `showDueDate` | `dueDate` | `data.dueDate` | Hide for PO (I-16) |
| `showDeliveryDate` | `deliveryDate` | `data.deliveryDate` | GOODS/MIXED only |
| `showDispatchDate` | `dispatchDate` | `data.dispatchDate` | GOODS/MIXED only |
| `showServicePeriod` | `servicePeriod` | `data.periodStart/End` | SERVICES/MIXED only |
| `showPaymentDate` | `paymentDate` | `data.paymentDate` | When payment means set |
| `showBankingDetails` | `bankingDetails` | Multiple fields | Wire transfer (I-114) |
| `showRib` | `rib` | `data.bankRib` | Wire transfer (I-114) |
| `showBankCode` | `bankCode` | `data.bankCode` | Wire transfer (I-114) |
| `showBankName` | `bankName` | `data.bankName` | Wire transfer (I-114) |
| `showCheckNumber` | `checkNumber` | `data.checkNumber` | Check payment (I-117) |
| `showCardDetails` | `cardDetails` | Multiple fields | Card payment (I-118) |
| `showPostalDetails` | `postalDetails` | Multiple fields | Postal payment (I-115) |
| `showOrderReference` | `orderReference` | `data.orderReference` | PO (I-16) or Contract (I-14) |
| `showContractReference` | `contractReference` | `data.contractReference` | Décompte (I-14) only |
| `showDeliveryNoteReference` | `deliveryNoteReference` | `data.deliveryNoteReference` | Except credit note (I-12) |
| `showCreditReason` | `creditReason` | `data.creditReason` | Credit note (I-12) only |
| `showStampDuty` | `stampDuty` | `data.stampDuty` | Invoices/Credit notes only |
| `showGlobalDiscount` | `globalDiscount` | `data.globalDiscount` | Multiple line items |
| `showSupplierRC` | `supplierRC` | `data.supplier.rc` | Business ID types (I-01, I-04) |
| `showSupplierCapital` | `supplierCapital` | `data.supplier.capital` | Business ID types only |
| `showBuyerRC` | `buyerRC` | `data.buyer.rc` | Business ID types only |
| `showBuyerCapital` | `buyerCapital` | `data.buyer.capital` | Business ID types only |
| `showAllowancesSection` | `allowancesSection` | Allowances UI | When allowances exist |
| `showOptionalDatesSection` | `optionalDatesSection` | Optional dates | When expanded |

---

## 🧪 Testing Visibility Rules

### Unit Test Pattern

```typescript
import { getConditionalFieldsVisibility } from '@/services/ConditionalFieldsStrategy';

describe('Conditional Fields', () => {
  it('should show delivery date for GOODS', () => {
    const visibility = getConditionalFieldsVisibility({
      operationNature: 'GOODS',  // ← Test input
      // ... other required fields
    });
    
    // Test unprefixed key (internal)
    expect(visibility.deliveryDate).toBe(true);
  });

  it('should hide delivery date for SERVICES', () => {
    const visibility = getConditionalFieldsVisibility({
      operationNature: 'SERVICES',  // ← Test input
    });
    
    expect(visibility.deliveryDate).toBe(false);
  });
});
```

### Hook Test Pattern

```typescript
import { useConditionalFields } from '@/services/useConditionalFields';

describe('useConditionalFields', () => {
  it('should map unprefixed to prefixed keys', () => {
    const testData = { operationNature: 'GOODS', /* ... */ };
    const visibility = useConditionalFields(testData);
    
    // Test prefixed key (presentation)
    expect(visibility.showDeliveryDate).toBe(true);
    expect(visibility.showServicePeriod).toBe(false);
  });
});
```

---

## 🐛 Common Mistakes to Avoid

### ❌ Mistake 1: Wrong Visibility Key in JSX
```typescript
// WRONG
{visibility.deliveryDate && (...)}      // Missing "show" prefix

// CORRECT
{visibility.showDeliveryDate && (...)}  // Has "show" prefix
```

### ❌ Mistake 2: Wrong Data Property Access
```typescript
// WRONG
value={visibility.bankRib}             // Visibility object has booleans only!

// CORRECT
value={data.bankRib}                   // Access from data object
```

### ❌ Mistake 3: Nesting Wrong Objects
```typescript
// WRONG
updateField('bankingDetails', value)   // Not a direct field name

// CORRECT
updateField('bankRib', value)          // Direct field from InvoiceData
updateField('bankCode', value)
updateField('bankName', value)
```

### ❌ Mistake 4: Forgetting Mapping
```typescript
// WRONG: Strategy returns unprefixed...
return { dueDate: true, ... }

// CORRECT: Hook maps to prefixed
return { 
  showDueDate: raw.dueDate,
  // ... etc
}
```

---

## 🔗 References

- **Full Audit Report:** [AUDIT_NAMING_CONSISTENCY_COMPLETE.md](AUDIT_NAMING_CONSISTENCY_COMPLETE.md)
- **Conditional Fields Strategy:** [services/ConditionalFieldsStrategy.ts](services/ConditionalFieldsStrategy.ts)
- **Conditional Fields Hook:** [services/useConditionalFields.ts](services/useConditionalFields.ts)
- **Invoice Form Component:** [components/InvoiceForm.tsx](components/InvoiceForm.tsx)
- **Type Definitions:** [types.ts](types.ts)
- **Test Suite:** [__tests__/conditional-fields/ConditionalFields.test.ts](__tests__/conditional-fields/ConditionalFields.test.ts)

---

**Last Updated:** January 2025  
**Status:** ✅ All 202 tests passing, 0 regressions
