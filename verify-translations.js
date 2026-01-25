#!/usr/bin/env node
/**
 * Verification script to check if all translation keys used in InvoiceDetail.tsx
 * are available in all three languages (ar, fr, en)
 */

const fs = require('fs');
const path = require('path');

// Read the i18n translations file
const i18nPath = path.join(__dirname, 'packages/frontend/src/services/i18n.ts');
const i18nContent = fs.readFileSync(i18nPath, 'utf-8');

// Extract all translation keys from the file
const extractKeys = (content, language) => {
  const regex = new RegExp(`${language}:\\s*\\{([\\s\\S]*?)\\s*\\}`, 'g');
  const match = regex.exec(content);
  if (!match) return new Set();
  
  const keysRegex = /(\w+):\s*['"`]/g;
  const keys = new Set();
  let keyMatch;
  
  // Find the language section and extract its content
  const langStart = content.indexOf(`${language}: {`);
  if (langStart === -1) return keys;
  
  let braceCount = 0;
  let inSection = false;
  let langContent = '';
  
  for (let i = langStart; i < content.length; i++) {
    if (content[i] === '{') {
      if (!inSection) inSection = true;
      braceCount++;
    } else if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0 && inSection) {
        langContent = content.substring(langStart, i);
        break;
      }
    }
  }
  
  while ((keyMatch = keysRegex.exec(langContent)) !== null) {
    keys.add(keyMatch[1]);
  }
  
  return keys;
};

// Keys used in InvoiceDetail.tsx (extracted from grep search results)
const requiredKeys = [
  'back', 'loading', 'invoice', 'failedToLoad', 'notFound', 'invoiceNotFound',
  'edit', 'cancel', 'downloading', 'downloadPdf', 'downloadXml',
  'documentDetails', 'number', 'type', 'date', 'currency',
  'supplier', 'buyer', 'name', 'id', 'city',
  'lineItems', 'description', 'qty', 'unitPrice', 'totalHt', 'tax',
  'payment', 'method', 'totalTVA', 'totalTTC', 'dueDate'
];

console.log('📋 Verifying Translation Coverage\n');
console.log('Required keys:', requiredKeys.length);
console.log(`${requiredKeys.join(', ')}\n`);

const arKeys = extractKeys(i18nContent, 'ar');
const frKeys = extractKeys(i18nContent, 'fr');
const enKeys = extractKeys(i18nContent, 'en');

console.log(`Arabic keys: ${arKeys.size}`);
console.log(`French keys: ${frKeys.size}`);
console.log(`English keys: ${enKeys.size}\n`);

let missingInAr = [];
let missingInFr = [];
let missingInEn = [];

requiredKeys.forEach(key => {
  if (!arKeys.has(key)) missingInAr.push(key);
  if (!frKeys.has(key)) missingInFr.push(key);
  if (!enKeys.has(key)) missingInEn.push(key);
});

console.log('🔍 Missing Keys Analysis:\n');

if (missingInAr.length === 0) {
  console.log('✅ Arabic: All required keys present');
} else {
  console.log(`❌ Arabic: Missing ${missingInAr.length} keys:`, missingInAr.join(', '));
}

if (missingInFr.length === 0) {
  console.log('✅ French: All required keys present');
} else {
  console.log(`❌ French: Missing ${missingInFr.length} keys:`, missingInFr.join(', '));
}

if (missingInEn.length === 0) {
  console.log('✅ English: All required keys present');
} else {
  console.log(`❌ English: Missing ${missingInEn.length} keys:`, missingInEn.join(', '));
}

const allMissing = missingInAr.length + missingInFr.length + missingInEn.length;
if (allMissing === 0) {
  console.log('\n✨ All translation keys are properly covered in all three languages!');
  process.exit(0);
} else {
  console.log(`\n⚠️  Total missing keys: ${allMissing}`);
  process.exit(1);
}
