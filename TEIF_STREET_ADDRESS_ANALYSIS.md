# TEIF Street Address Analysis - VERIFIED AGAINST OFFICIAL SPECS

## TEIF 1.8.8 Official Specification Findings

### XSD Schema Definition (facture_INVOIC_V1.8.8_withSig.xsd, Line 273-279)

```xml
<xs:complexType name="AdressesType">
  <xs:sequence>
    <xs:element name="AdressDescription" type="DataStringType_500"/>
    <xs:element name="Street" type="DataStringType_35" minOccurs="0"/>
    <xs:element name="CityName" type="DataStringType_35" minOccurs="0"/>
    <xs:element name="PostalCode" type="DataStringType_17" minOccurs="0"/>
    <xs:element name="Country">
```

**Key Finding**: `<xs:element name="Street" type="DataStringType_35" minOccurs="0"/>`
- **minOccurs="0"** = Street is **OPTIONAL** per TEIF specification
- Max length: 35 characters (DataStringType_35)

---

## Real-World Examples from TEIF

### Example 1: WITH Street (ligne 19-24)
**File**: exemple_signe_elfatoora.xml (Supplier: Tunisie TradeNet)
```xml
<PartnerAdresses lang="fr">
  <AdressDescription>Lotissement El Khalij Les Berges du Lac</AdressDescription>
  <Street>Rue du Lac Malaren</Street>
  <CityName>Tunis</CityName>
  <PostalCode>1053</PostalCode>
  <Country codeList="ISO_3166-1">TN</Country>
</PartnerAdresses>
```
✅ Street populated

### Example 2: WITHOUT Street (ligne 65-73)
**File**: exemple_signe_elfatoora.xml (Buyer: STE FRERE ET MOSAIQUE)
```xml
<PartnerAdresses lang="fr">
  <AdressDescription/>
  <Street/>
  <CityName>Salle publique Tunis</CityName>
  <PostalCode>1000</PostalCode>
  <Country codeList="ISO_3166-1">TN</Country>
</PartnerAdresses>
```
❌ Street is EMPTY (but City is populated)

### Example 3: TEIF Template (modele_teif_vide.xml, ligne 29)
```xml
<Street></Street>
```
✅ Street field exists but shown as empty in template

---

## Current Implementation Issues

### Problem 1: Validation Requirement (INCORRECT)
**File**: packages/frontend/src/services/complianceChecker.ts (OLD)
```typescript
if (!data.supplier.street?.trim()) {
  issues.push({ level: 'error', code: 'E009', 
    message: 'Supplier street address is required', 
    field: 'supplier.street' 
  });
}
```
❌ **VIOLATES TEIF SPEC**: Street marked as ERROR (required)
- TEIF spec says Street is minOccurs="0" (optional)

### Problem 2: Missing Form Field (INCONSISTENT)
**File**: packages/frontend/src/components/InvoiceForm.tsx
- ✅ Has: addressDescription, city, postalCode, country
- ❌ Missing: street input field

### Problem 3: Inconsistent Address Handling
- addressDescription is present and optional in form ✅
- street is missing from form but validated as required ❌
- city/postalCode are validated as required ✅

---

## TEIF Address Field Semantics

Based on official TEIF examples:

| Field | Required? | Purpose | Example |
|-------|-----------|---------|---------|
| **AdressDescription** | ✅ YES | Complete address in text | "Lotissement El Khalij Les Berges du Lac" |
| **Street** | ❌ NO | Street name/number | "Rue du Lac Malaren" |
| **CityName** | ❌ NO (technically) | City name | "Tunis" |
| **PostalCode** | ❌ NO (technically) | Postal code | "1053" |
| **Country** | ✅ YES | Country code (ISO) | "TN" |

**Practical Standard**: 
- At minimum: AdressDescription + Country + one location identifier (city or street)
- Street ALONE is not sufficient
- Street WITH city is better than street alone

---

## Fix Required

### Solution: Make Street OPTIONAL and ADD to Form

**Status**: ✅ PARTIALLY DONE

✅ Validation changed from ERROR to WARNING (matches TEIF spec)
❌ Still need to: Add street input field to form

---

## Implementation Recommendation

1. **Validation Level**: Optional (warning if invalid format)
   - Street is minOccurs="0" in XSD ✓
   - Only validate IF provided
   
2. **Form Level**: Add street input field
   - Position: Between addressDescription and city
   - Label: "Street Address (I-162)" 
   - Placeholder: "Rue du Lac Malaren"
   - Max length: 35 characters
   - Required: NO
   - Error: NONE
   - Warning: Only if invalid format when provided

3. **Consistency**:
   - addressDescription: Full address text (optional in form)
   - street: Street name/number (optional in form)
   - city: City name (optional in form, but best practice)
   - postalCode: ZIP code (optional in form, but best practice)
   - country: ISO code (required)

---

## TEIF Compliance Checklist

✅ Street element exists in TEIF schema
✅ Street is marked minOccurs="0" (optional)
✅ Real examples show street can be empty
✅ Validation changed from error to warning
❌ Form field still missing (needs implementation)

---

## Next Step

Add street input field to PartnerForm component in InvoiceForm.tsx between addressDescription and city fields.
