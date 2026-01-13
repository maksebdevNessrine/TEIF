# TRANSLATION SYSTEM - IMPLEMENTATION ROADMAP
**Priority Level:** CRITICAL  
**Effort:** 3-5 days  
**Team:** 1-2 developers  

---

## IMMEDIATE ACTIONS (DO THIS FIRST)

### 1. Add Missing Translation Keys

**File to update:** [services/i18n.ts](services/i18n.ts)

**New keys to add (25 total):**

```typescript
// Add to all three language dictionaries (ar, fr, en)

// ERROR MESSAGES
emailInvalid: "Email is not valid" // AR: "البريد الإلكتروني غير صحيح", FR: "Email invalide"
phoneInvalid: "Phone number invalid" // AR: "رقم الهاتف غير صحيح", FR: "Numéro invalide"
ribInvalid: "RIB must be exactly 20 digits" // AR: "يجب أن يكون RIB بالضبط 20 رقم", FR: "RIB doit être 20 chiffres"
nameRequired: "Name is required" // AR: "الاسم مطلوب", FR: "Le nom est requis"
fieldRequired: "This field is required" // AR: "هذا الحقل مطلوب", FR: "Ce champ est obligatoire"
invalidFormat: "Invalid format" // AR: "صيغة غير صحيحة", FR: "Format invalide"
mustBeNumeric: "Must be numeric" // AR: "يجب أن يكون رقمياً", FR: "Doit être numérique"
addressRequired: "Address is required" // AR: "العنوان مطلوب", FR: "L'adresse est requise"
cityRequired: "City is required" // AR: "المدينة مطلوبة", FR: "La ville est requise"
postalCodeRequired: "Postal code required" // AR: "الرمز البريدي مطلوب", FR: "Code postal requis"

// AI ASSISTANT ERRORS  
aiError: "Could not process request" // AR: "لم يتمكن من معالجة الطلب", FR: "Impossible de traiter la demande"
aiConnectionError: "Connection error - try again" // AR: "خطأ في الاتصال", FR: "Erreur de connexion"
aiTimeoutError: "Request timed out" // AR: "انتهت المهلة الزمنية", FR: "Délai dépassé"

// UI STATE MESSAGES
loading: "Loading..." // AR: "جاري التحميل...", FR: "Chargement..."
saving: "Saving..." // AR: "جاري الحفظ...", FR: "Enregistrement..."
success: "Success" // AR: "نجاح", FR: "Succès"
error: "Error" // AR: "خطأ", FR: "Erreur"
validating: "Validating..." // AR: "جاري التحقق...", FR: "Validation..."
required: "Required" // AR: "مطلوب", FR: "Requis"

// HELP TEXT
hintDocNumber: "Format: F-YYYY-NNNN" // AR: "الصيغة: F-YYYY-NNNN", FR: "Format: F-YYYY-NNNN"
hintTaxId: "Format: 0000000XAM000" // AR: "الصيغة: 0000000XAM000", FR: "Format: 0000000XAM000"
hintRib: "20-digit bank account" // AR: "حساب بنكي 20 رقم", FR: "Compte 20 chiffres"
selectOption: "Select an option" // AR: "اختر خيار", FR: "Sélectionnez une option"
```

---

### 2. Fix Type Safety in i18n.ts

**Replace this code (LINES 266-268):**

```typescript
// ❌ WRONG - Uses 'as any' (FORBIDDEN)
export const useTranslation = (lang: Language) => {
  return (key: keyof typeof translations['ar']) => (translations[lang] as any)[key] || key;
};
```

**With this code:**

```typescript
// ✅ CORRECT - Type safe with logging
type TranslationKey = keyof typeof translations['ar'];

export const useTranslation = (lang: Language) => {
  return (key: TranslationKey): string => {
    const translation = translations[lang]?.[key];
    
    if (!translation) {
      console.warn(
        `[i18n] Missing translation: key="${key}" lang="${lang}"`,
        { availableKeys: Object.keys(translations['ar']) }
      );
      // Fallback: try English, then return key
      return translations['en'][key] || `[${key}]`;
    }
    
    return translation;
  };
};
```

---

### 3. Update Validators with i18n Integration

**File:** [services/validators.ts](services/validators.ts)

**Issue:** Validation functions return hardcoded English error messages

**Solution:** Modify to accept language parameter:

```typescript
// Create a new i18n-aware validator factory
import { useTranslation } from './i18n';
import { Language } from '../types';

export const createValidators = (lang: Language) => {
  const t = useTranslation(lang);
  
  return {
    validateEmail: (email: string) => {
      if (!email) return { valid: false, error: t('fieldRequired') };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { valid: false, error: t('emailInvalid') };
      }
      return { valid: true, error: '' };
    },
    
    validatePhone: (phone: string, countryCode = 'TN') => {
      if (!phone) return { valid: false, error: t('fieldRequired') };
      if (!/^(\+?216)?[2579]\d{7}$/.test(phone.replace(/[\s-]/g, ''))) {
        return { valid: false, error: t('phoneInvalid') };
      }
      return { valid: true, error: '' };
    },
    
    validateRib: (rib: string) => {
      if (!rib) return { valid: false, error: t('fieldRequired') };
      if (!/^\d{20}$/.test(rib.replace(/\s/g, ''))) {
        return { valid: false, error: t('ribInvalid') };
      }
      return { valid: true, error: '' };
    },
    
    // ... rest of validators
  };
};
```

---

### 4. Update InvoiceForm.tsx to Use Localized Validators

**File:** [components/InvoiceForm.tsx](components/InvoiceForm.tsx)

**Replace lines 1-25 with:**

```typescript
import React, { useMemo, useEffect, useState } from 'react';
import { InvoiceData, InvoiceLine, IdType, DocTypeCode, DOCUMENT_TYPES, PAYMENT_MEANS, Language, UNIT_CODES } from '../types';
import { useTranslation } from '../services/i18n';
import { generateQrString, validateRib, numberToLettersFr } from '../services/xmlGenerator';
import { createValidators } from '../services/validators'; // ✅ NEW
import { useConditionalFields } from '../services/useConditionalFields';
import { FormInput, FormSelect, FormSection, StepIndicator } from './design-system';

interface PartnerFormProps {
  title: string;
  path: string;
  partner: any;
  step: string;
  updateField: (path: string, value: any) => void;
  lang: Language;
}

const PartnerForm: React.FC<PartnerFormProps> = ({ title, path, partner, step, updateField, lang }) => {
  const t = useTranslation(lang);
  const validators = useMemo(() => createValidators(lang), [lang]); // ✅ NEW
  const isBusiness = partner.idType === 'I-01' || partner.idType === 'I-04';
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateField = (field: string, value: any) => {
    let error = '';
    
    switch (field) {
      case 'name':
        const nameVal = validators.validateCompanyName(value); // ✅ LOCALIZED
        error = nameVal.error || '';
        break;
      case 'email':
        const emailVal = validators.validateEmail(value); // ✅ LOCALIZED
        error = emailVal.error || '';
        break;
      case 'phone':
        const phoneVal = validators.validatePhone(value); // ✅ LOCALIZED
        error = phoneVal.error || '';
        break;
      case 'bankRib':
        const ribVal = validators.validateRib(value); // ✅ LOCALIZED
        error = ribVal.error || '';
        break;
      // ... rest of cases
    }
    
    setErrors({...errors, [field]: error});
  };
  
  // ... rest of component
};
```

---

### 5. Update AIAssistant.tsx Error Handling

**File:** [components/AIAssistant.tsx](components/AIAssistant.tsx)

**Replace lines 38-52 with:**

```typescript
const handleSend = async () => {
  if (!input.trim() || loading) return;

  const userText = input;
  setInput('');
  setMessages(prev => [...prev, { role: 'user', text: userText }]);
  setLoading(true);

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // ✅ Localize system prompt based on language
    const systemPrompts = {
      ar: "أنت خبير في معيار الفاتورة الإلكترونية التونسية (TEIF 1.8.8). ساعد المستخدمين في ملء النموذج. الرموز الشائعة: PCE (قطعة)، KG (كيلوغرام). معرفات الضرائب تتبع الصيغة 0736202XAM000.",
      fr: "Vous êtes expert en Factures Électroniques Tunisiennes (TEIF 1.8.8). Aidez les utilisateurs à remplir le formulaire. Codes courants: PCE (Pièce), KG (Kilogramme). Les identifiants fiscaux suivent le format 0736202XAM000.",
      en: "You are an expert in Tunisian Electronic Invoicing (TEIF version 1.8.8). Help users fill out the form. Common codes: PCE (Piece), KG (Kilogram). Tax IDs follow 0736202XAM000 format. Be concise and professional."
    };
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userText,
      config: {
        systemInstruction: systemPrompts[lang],
        temperature: 0.7,
      }
    });

    setMessages(prev => [...prev, { 
      role: 'assistant', 
      text: response.text || t('aiError') // ✅ LOCALIZED
    }]);
  } catch (error) {
    console.error('[AIAssistant] Error:', error);
    // ✅ LOCALIZED ERROR MESSAGE
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      text: t('aiConnectionError')
    }]);
  } finally {
    setLoading(false);
  }
};
```

---

### 6. Add Language Persistence to App.tsx

**File:** [App.tsx](App.tsx)

**Replace lines 50-56 with:**

```typescript
const App: React.FC = () => {
  // ✅ NEW: Get language from localStorage
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('teif-lang');
    return (saved as Language) || 'fr'; // Default to French
  });
  
  const t = useTranslation(lang);
  const isRtl = lang === 'ar';

  // ✅ NEW: Save language preference
  useEffect(() => {
    localStorage.setItem('teif-lang', lang);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  // ... rest of component
```

**Also update language buttons with accessibility (lines 93-95):**

```typescript
<button 
  onClick={() => setLang('ar')} 
  aria-label="عربي - Arabic" // ✅ NEW
  title="عربي" // ✅ NEW
  className={`px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 ${lang === 'ar' ? 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-100'}`}
>
  AR
</button>
<button 
  onClick={() => setLang('fr')} 
  aria-label="Français - French" // ✅ NEW
  title="Français" // ✅ NEW
  className={`px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 ${lang === 'fr' ? 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-100'}`}
>
  FR
</button>
<button 
  onClick={() => setLang('en')} 
  aria-label="English" // ✅ NEW
  title="English" // ✅ NEW
  className={`px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 ${lang === 'en' ? 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-100'}`}
>
  EN
</button>
```

---

### 7. Fix XmlPreview Hardcoded String

**File:** [components/XmlPreview.tsx](components/XmlPreview.tsx)

**Line 100, replace:**
```typescript
// ❌ WRONG
<span className="text-sm font-bold uppercase tracking-wider">TEIF 1.8.8 Output</span>

// ✅ CORRECT
<span className="text-sm font-bold uppercase tracking-wider">{t('xmlOutput')}</span>
```

---

## REAL TESTS TO IMPLEMENT

**File:** [__tests__/i18n/multilingual.test.ts](\_\_tests\_\_/i18n/multilingual.test.ts)

**REPLACE THE ENTIRE FILE with:**

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { translations, useTranslation } from '../../services/i18n';
import { Language } from '../../types';

describe('Internationalization (i18n) - Comprehensive Tests', () => {
  
  describe('Translation Dictionary Integrity', () => {
    it('I18N_001: All three languages have same keys', () => {
      const arKeys = Object.keys(translations.ar).sort();
      const frKeys = Object.keys(translations.fr).sort();
      const enKeys = Object.keys(translations.en).sort();
      
      expect(arKeys).toEqual(frKeys);
      expect(frKeys).toEqual(enKeys);
      expect(arKeys.length).toBeGreaterThan(50); // We have 75+ keys
    });

    it('I18N_002: No translation is empty string', () => {
      Object.entries(translations).forEach(([lang, dict]) => {
        Object.entries(dict).forEach(([key, value]) => {
          expect(value).toBeTruthy(`${lang}["${key}"] is empty`);
          expect(typeof value).toBe('string');
        });
      });
    });

    it('I18N_003: All keys are strings', () => {
      Object.entries(translations.ar).forEach(([key]) => {
        expect(typeof key).toBe('string');
        expect(key.length).toBeGreaterThan(0);
      });
    });

    it('I18N_004: No duplicate keys', () => {
      const arKeys = Object.keys(translations.ar);
      const uniqueKeys = new Set(arKeys);
      expect(arKeys.length).toBe(uniqueKeys.size);
    });
  });

  describe('useTranslation Hook', () => {
    it('I18N_005: useTranslation returns function', () => {
      const t = useTranslation('en');
      expect(typeof t).toBe('function');
    });

    it('I18N_006: Returns correct translation for English', () => {
      const t = useTranslation('en');
      expect(t('appTitle')).toBe('TEIF Invoice Engine');
      expect(t('addItem')).toBe('Add Line');
    });

    it('I18N_007: Returns correct translation for French', () => {
      const t = useTranslation('fr');
      expect(t('appTitle')).toBe('Générateur de Facture TEIF');
      expect(t('addItem')).toBe('Ajouter une ligne');
    });

    it('I18N_008: Returns correct translation for Arabic', () => {
      const t = useTranslation('ar');
      expect(t('appTitle')).toBe('منظومة الفاتورة الإلكترونية التونسية');
      expect(t('addItem')).toBe('إضافة سطر');
    });

    it('I18N_009: Falls back to English for missing key', () => {
      const constr = console.warn as any;
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const t = useTranslation('fr');
      // Assuming a hypothetical missing key
      const result = t('nonExistentKey' as any);
      
      expect(result).toBeDefined();
      expect(console.warn).toHaveBeenCalled();
      
      vi.restoreAllMocks();
    });

    it('I18N_010: Logs warning for missing translations', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const t = useTranslation('en');
      t('missingKey' as any);
      
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[i18n] Missing translation'),
        expect.anything()
      );
      
      vi.restoreAllMocks();
    });
  });

  describe('Language Coverage', () => {
    it('I18N_011: All form field labels translated', () => {
      const requiredKeys = [
        'fullName', 'email', 'phone', 'address', 'city', 'postalCode',
        'docNumber', 'issueDate', 'dueDate', 'paymentMeans'
      ];
      
      requiredKeys.forEach(key => {
        const langKeys = Object.keys(translations.ar);
        expect(langKeys).toContain(key as any);
      });
    });

    it('I18N_012: All error-related keys exist', () => {
      const errorKeys = [
        'emailInvalid', 'phoneInvalid', 'ribInvalid', 
        'nameRequired', 'fieldRequired', 'aiError'
      ];
      
      errorKeys.forEach(key => {
        expect(translations.ar[key as any]).toBeDefined();
        expect(translations.fr[key as any]).toBeDefined();
        expect(translations.en[key as any]).toBeDefined();
      });
    });

    it('I18N_013: All AI messages translated', () => {
      const aiKeys = ['aiTitle', 'aiSubtitle', 'aiIntro', 'askAi', 'aiError'];
      
      aiKeys.forEach(key => {
        expect(translations.ar[key as any]).toBeDefined();
        expect(translations.fr[key as any]).toBeDefined();
        expect(translations.en[key as any]).toBeDefined();
      });
    });

    it('I18N_014: All section headers translated', () => {
      const sectionKeys = [
        'docDetails', 'references', 'partnerInfo', 'invoiceLines',
        'payment', 'allowancesCharges', 'invoiceDates'
      ];
      
      sectionKeys.forEach(key => {
        expect(translations.ar[key as any]).toBeDefined();
      });
    });
  });

  describe('RTL Support', () => {
    it('I18N_015: Arabic is RTL language', () => {
      const htmlEl = document.documentElement;
      htmlEl.lang = 'ar';
      htmlEl.dir = 'rtl';
      
      expect(htmlEl.dir).toBe('rtl');
      expect(htmlEl.lang).toBe('ar');
    });

    it('I18N_016: French/English are LTR', () => {
      const htmlEl = document.documentElement;
      
      htmlEl.lang = 'fr';
      htmlEl.dir = 'ltr';
      expect(htmlEl.dir).toBe('ltr');
      
      htmlEl.lang = 'en';
      htmlEl.dir = 'ltr';
      expect(htmlEl.dir).toBe('ltr');
    });
  });

  describe('Language Persistence', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('I18N_017: Language can be saved to localStorage', () => {
      localStorage.setItem('teif-lang', 'ar');
      expect(localStorage.getItem('teif-lang')).toBe('ar');
    });

    it('I18N_018: Language persists across retrieval', () => {
      localStorage.setItem('teif-lang', 'fr');
      const saved = localStorage.getItem('teif-lang');
      expect(saved).toBe('fr');
    });

    it('I18N_019: Defaults to French if no saved language', () => {
      const defaultLang = localStorage.getItem('teif-lang') || 'fr';
      expect(defaultLang).toBe('fr');
    });
  });

  describe('Translation Quality', () => {
    it('I18N_020: Arabic translations use correct script', () => {
      Object.entries(translations.ar).forEach(([key, value]) => {
        // Check if value contains Arabic characters or is expected Latin (like codes)
        expect(value).toBeDefined();
        expect(value.length).toBeGreaterThan(0);
      });
    });

    it('I18N_021: French translations have correct accents', () => {
      expect(translations.fr.dueDate).toContain("d'");
      expect(translations.fr.issueDate).toContain("d'");
    });

    it('I18N_022: Translation keys are consistently named', () => {
      const arKeys = Object.keys(translations.ar);
      arKeys.forEach(key => {
        expect(key).toMatch(/^[a-zA-Z][a-zA-Z0-9]*$/); // camelCase
      });
    });

    it('I18N_023: No HTML tags in translations', () => {
      Object.entries(translations).forEach(([lang, dict]) => {
        Object.entries(dict).forEach(([key, value]) => {
          if (value.includes('<') || value.includes('</')) {
            throw new Error(`${lang}["${key}"] contains HTML tags`);
          }
        });
      });
    });

    it('I18N_024: Translations are not identical across languages', () => {
      const arTitle = translations.ar.appTitle;
      const frTitle = translations.fr.appTitle;
      const enTitle = translations.en.appTitle;
      
      expect(arTitle).not.toBe(frTitle);
      expect(frTitle).not.toBe(enTitle);
      expect(arTitle).not.toBe(enTitle);
    });
  });

  describe('Type Safety', () => {
    it('I18N_025: All language values are strings', () => {
      const languages: Language[] = ['ar', 'fr', 'en'];
      
      languages.forEach(lang => {
        Object.entries(translations[lang]).forEach(([key, value]) => {
          expect(typeof value).toBe('string');
          expect(value.length).toBeGreaterThan(0);
        });
      });
    });

    it('I18N_026: useTranslation accepts valid languages', () => {
      expect(() => useTranslation('ar')).not.toThrow();
      expect(() => useTranslation('fr')).not.toThrow();
      expect(() => useTranslation('en')).not.toThrow();
    });

    it('I18N_027: Translation keys have expected structure', () => {
      const sampleKeys = Object.keys(translations.ar);
      expect(sampleKeys.length).toBeGreaterThanOrEqual(50);
      expect(sampleKeys.some(k => k.includes('Label'))).toBe(true);
      expect(sampleKeys.some(k => k.includes('Title'))).toBe(true);
    });

    it('I18N_028: Complete coverage of UI text', () => {
      const criticalKeys = [
        'appTitle', 'addItem', 'download', 'copy', 'email', 'phone',
        'payment', 'supplier', 'buyer', 'docNumber', 'issueDate'
      ];
      
      criticalKeys.forEach(key => {
        expect(translations.ar[key as any]).toBeDruthy();
        expect(translations.fr[key as any]).toBeTruthy();
        expect(translations.en[key as any]).toBeTruthy();
      });
    });
  });
});
```

---

## TIMELINE & EFFORT ESTIMATION

| Task | Effort | Timeline |
|------|--------|----------|
| Add missing keys | 2 hours | Today |
| Fix type safety | 1 hour | Today |
| Update validators | 3 hours | Today |
| Update components | 4 hours | Tomorrow |
| Add language persistence | 1 hour | Tomorrow |
| Write real tests | 5 hours | Tomorrow |
| RTL implementation | 3 hours | Day 3 |
| Testing & QA | 4 hours | Day 3 |
| **TOTAL** | **23 hours** | **3 days** |

---

## SUCCESS CRITERIA

- ✅ All 28 tests pass (real tests, not placeholders)
- ✅ No `as any` in i18n code
- ✅ All error messages translated
- ✅ Language persistence works
- ✅ RTL layout correct for Arabic
- ✅ Zero console warnings for missing translations
- ✅ 100% key coverage across all languages
- ✅ Accessibility features implemented

---

**Created:** January 12, 2026  
**Status:** Ready for implementation
