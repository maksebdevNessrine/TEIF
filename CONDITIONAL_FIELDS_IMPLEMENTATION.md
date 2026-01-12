# Conditional Fields Implementation Guide

## 📋 Overview

This guide explains how to implement conditional field visibility throughout the TEIF invoice form based on business rules and user selections.

---

## 🏗️ Architecture

### Three-Layer Implementation

```
1. STRATEGY LAYER (ConditionalFieldsStrategy.ts)
   ↓
   Defines all conditional visibility rules
   Functions return boolean based on form state
   
2. VALIDATION LAYER (ConditionalValidation.ts)
   ↓
   Applies validation rules respecting visibility
   Skips validation for hidden fields
   
3. HOOK/COMPONENT LAYER (useConditionalFields.ts)
   ↓
   React hooks for easy access to visibility state
   Provides memoized computed values
   Used in components for rendering decisions
```

---

## 📁 Files Created

### Service Files
- **ConditionalFieldsStrategy.ts** - Core visibility rules
- **ConditionalValidation.ts** - Validation logic with visibility respect
- **useConditionalFields.ts** - React hooks for components

### Test Files
- **__tests__/conditional-fields/ConditionalFields.test.ts** - Comprehensive tests

---

## 🎯 Implementation Steps

### Step 1: Update InvoiceForm Component

Use the `useConditionalFields` hook to control field visibility:

```tsx
import { useConditionalFields } from '../services/useConditionalFields';

export function InvoiceForm() {
  const [data, setData] = useState<InvoiceData>(initialData);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  // Get field visibility rules
  const visibility = useConditionalFields(data, expandedSections);

  return (
    <>
      {/* Due Date - Conditional */}
      {visibility.showDueDate && (
        <div>
          <label>Due Date (I-32)</label>
          <input 
            type="date" 
            value={data.dueDate || ''} 
            onChange={(e) => updateField('dueDate', e.target.value)} 
          />
        </div>
      )}

      {/* Service Period - Conditional */}
      {visibility.showServicePeriod && (
        <div className="service-period-section">
          <label>Period Start (I-36 Range Start)</label>
          <input type="date" value={data.periodStart || ''} />
          <label>Period End (I-36 Range End)</label>
          <input type="date" value={data.periodEnd || ''} />
        </div>
      )}

      {/* Banking Details - Conditional */}
      {visibility.showBankingDetails && (
        <div className="banking-section">
          <label>Bank Code</label>
          <input type="text" value={data.bankCode || ''} />
          <label>RIB</label>
          <input type="text" value={data.bankRib || ''} />
          <label>Bank Name</label>
          <input type="text" value={data.bankName || ''} />
        </div>
      )}
    </>
  );
}
```

### Step 2: Add Visual Indicators

Distinguish conditional from mandatory/optional fields:

```tsx
// Helper component for field labels
function ConditionalFieldLabel({ 
  label, 
  fieldName, 
  data,
  required = false 
}: Props) {
  const reason = getFieldHiddenReason(fieldName, data);

  return (
    <label className="flex items-center gap-2">
      <span>{label}</span>
      
      {required && <span className="text-red-500">*</span>}
      
      {/* Show "conditional" indicator */}
      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
        Conditional
      </span>
      
      {/* Tooltip for why it's hidden */}
      {reason && (
        <span 
          title={reason}
          className="text-gray-400 cursor-help"
        >
          ℹ️
        </span>
      )}
    </label>
  );
}

// Usage
{visibility.showDueDate && (
  <div>
    <ConditionalFieldLabel 
      label="Due Date (I-32)" 
      fieldName="dueDate"
      data={data}
    />
    <input type="date" {...props} />
  </div>
)}
```

### Step 3: Update Validation Logic

Modify compliance checker to respect visibility:

```tsx
import { getConditionalValidationErrors } from '../services/ConditionalValidation';

export function checkInvoiceCompliance(data: InvoiceData): ComplianceReport {
  const issues: ComplianceIssue[] = [];
  
  // Get conditional validation errors only
  const conditionalErrors = getConditionalValidationErrors(data);
  issues.push(...conditionalErrors.map(e => ({
    level: 'error' as const,
    code: 'COND_VAL',
    message: e.error,
    field: e.field
  })));

  // ... rest of validation
  
  return {
    isCompliant: issues.length === 0,
    totalIssues: issues.length,
    errors: issues,
    warnings: [],
    score: 100 - (issues.length * 5)
  };
}
```

### Step 4: Handle Line Items Conditionally

```tsx
// In line items table
{data.lines.map((line) => (
  <tr key={line.id}>
    {/* Item Code - Conditional Mandatory */}
    <td>
      <input 
        type="text"
        value={line.itemCode}
        required={isItemCodeMandatory(data)}
        placeholder={isItemCodeMandatory(data) ? "Required" : "Optional"}
      />
    </td>

    {/* FODEC - Conditional Visible */}
    {visibility.showFodec && (
      <td>
        <input 
          type="checkbox" 
          checked={line.fodec}
          onChange={handleFodecChange}
        />
      </td>
    )}

    {/* Exemption Reason - Conditional */}
    {line.taxRate === 0 && (
      <td>
        <input 
          type="text"
          placeholder="Exemption reason (I-110)"
          value={line.exemptionReason || ''}
          required
        />
      </td>
    )}
  </tr>
))}
```

### Step 5: Add Animations

Make field show/hide smooth and user-friendly:

```tsx
import { motion } from 'framer-motion';

{/* With Framer Motion */}
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: visibility.showDueDate ? 1 : 0, y: visibility.showDueDate ? 0 : -10 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.3 }}
  className={visibility.showDueDate ? '' : 'hidden'}
>
  <label>Due Date (I-32)</label>
  <input type="date" />
</motion.div>

{/* Or with CSS classes */}
<div className={cn(
  'transition-all duration-300',
  visibility.showDueDate ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
)}>
  <label>Due Date (I-32)</label>
  <input type="date" />
</div>
```

### Step 6: Test Conditional Logic

Run the tests to verify all scenarios:

```bash
npm test -- ConditionalFields.test.ts
```

Expected output:
```
✓ Conditional Fields - Operation Nature Rules (4 tests)
✓ Conditional Fields - Document Type Rules (4 tests)
✓ Conditional Fields - Payment Method Rules (3 tests)
✓ Conditional Fields - Partner ID Type Rules (2 tests)
✓ Conditional Validation - Hidden Fields (3 tests)
✓ Conditional Validation - Service Period (3 tests)
✓ Conditional Fields - Complex Scenarios (4 tests)
```

---

## 📋 All Conditional Field Rules

### Operation Nature Dependencies

| Condition | Fields |
|-----------|--------|
| operationNature = GOODS | Show: deliveryDate, dispatchDate, FODEC |
| operationNature = SERVICES | Show: servicePeriod (periodStart/End), Make itemCode optional |
| operationNature = MIXED | Show: All of the above |

### Document Type Dependencies

| Type | Show | Hide |
|------|------|------|
| I-11 (Facture) | | orderReference |
| I-12 (Credit Note) | creditReason | |
| I-14 (Décompte) | contractReference, orderReference | |
| I-16 (PO) | | dueDate |

### Payment Method Dependencies

| Method | Show | Hide |
|--------|------|------|
| I-114 (Wire) | bankRib, bankCode, bankName | checkNumber, cardDetails |
| I-117 (Check) | checkNumber | bankRib, bankCode, cardDetails |
| I-118 (Card) | cardDetails | bankRib, checkNumber |

### Partner ID Type Dependencies

| ID Type | Show |
|---------|------|
| I-01 (MF) | RC, Capital |
| I-04 (MF Non-Tunis) | RC, Capital |
| I-02, I-03 | — |

---

## 🧪 Testing Scenarios

### Test Case 1: Service Invoice
```
operationNature = SERVICES
documentType = I-11

Expected Visibility:
✓ servicePeriod (periodStart, periodEnd)
✗ deliveryDate
✗ dispatchDate
✗ FODEC
```

### Test Case 2: Purchase Order
```
documentType = I-16

Expected Visibility:
✗ dueDate
✓ orderReference
```

### Test Case 3: Wire Transfer
```
paymentMeans = I-114

Expected Visibility:
✓ bankRib, bankCode, bankName
✗ checkNumber, cardDetails
```

### Test Case 4: Credit Note with MF Supplier
```
documentType = I-12
supplier.idType = I-01

Expected Visibility:
✓ creditReason
✓ supplier.rc, supplier.capital
```

---

## 🎨 UI/UX Enhancements

### Field Label Indicators

```tsx
// Show field type badges
<label>
  Due Date (I-32)
  <Badge variant="conditional">Conditional</Badge>
  <Badge variant="mandatory">Mandatory</Badge>
  <Badge variant="optional">Optional</Badge>
</label>
```

### Contextual Help

```tsx
// Show why field is hidden
{!visibility.showDueDate && (
  <Alert type="info">
    Due Date is not applicable for Purchase Orders
  </Alert>
)}
```

### Field Grouping

```tsx
// Group related conditional fields
<ConditionalFieldsGroup
  title="Banking Details"
  visible={visibility.showBankingDetails}
  info="These fields appear only for wire transfer payments"
>
  {/* Fields inside */}
</ConditionalFieldsGroup>
```

---

## 🔧 Customization

### Add New Conditional Rule

1. Add to `ConditionalFieldsRules` in ConditionalFieldsStrategy.ts:
```tsx
showCustomField: (data: InvoiceData): boolean => {
  // Your condition here
  return data.someField === 'someValue';
}
```

2. Add to visibility return in `getConditionalFieldsVisibility`:
```tsx
customField: ConditionalFieldsRules.showCustomField(data),
```

3. Add to `ConditionalFieldsState` interface in useConditionalFields.ts

4. Add test cases in ConditionalFields.test.ts

---

## ✅ Implementation Checklist

- [ ] Copy utility files to services/
- [ ] Update InvoiceForm component with useConditionalFields hook
- [ ] Add visual indicators for conditional fields
- [ ] Update validation logic to respect visibility
- [ ] Run tests: `npm test -- ConditionalFields.test.ts`
- [ ] Test all scenarios in browser
- [ ] Verify no validation errors for hidden fields
- [ ] Update documentation
- [ ] Deploy to production

---

## 🚀 Usage Example - Complete Implementation

```tsx
import { useConditionalFields } from '../services/useConditionalFields';
import { getConditionalValidationErrors } from '../services/ConditionalValidation';

export function InvoiceForm({ data, onChange }: Props) {
  const visibility = useConditionalFields(data);

  const handleValidation = () => {
    const errors = getConditionalValidationErrors(data);
    // Only show errors for visible fields
    setErrors(errors);
    return errors.length === 0;
  };

  return (
    <form onSubmit={handleValidation}>
      {/* Always visible sections */}
      <OperationSection data={data} onChange={onChange} />
      
      {/* Conditional sections */}
      {visibility.showServicePeriod && (
        <ServicePeriodSection data={data} onChange={onChange} />
      )}
      
      {visibility.showBankingDetails && (
        <BankingDetailsSection data={data} onChange={onChange} />
      )}
      
      {/* Line items with inline conditionals */}
      <LineItemsSection 
        data={data} 
        onChange={onChange}
        visibility={visibility}
      />
      
      <button type="submit">Validate & Generate</button>
    </form>
  );
}
```

---

## 📚 Additional Resources

- [TEIF 1.8.8 Specification](./SPECS.md)
- [Form Structure](./PHASE_6_CHECKLIST.md)
- [Validation Rules](./services/validators.ts)
- [Test Coverage](../__tests__/conditional-fields/ConditionalFields.test.ts)

---

**Status:** Ready for Implementation  
**Last Updated:** January 2025
