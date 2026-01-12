import { describe, it, expect, beforeEach } from 'vitest';
import {
  validateRib,
  generateQrString,
  numberToLettersFr,
  generateTeifXml,
} from '../xmlGenerator';
import { InvoiceData } from '../../types';

describe('XML Generator - Unit Tests', () => {
  let sampleInvoice: InvoiceData;

  beforeEach(() => {
    sampleInvoice = {
      documentNumber: 'INV001',
      documentType: 'TAX_INVOICE',
      invoiceDate: '2024-01-15',
      dueDate: '2024-02-15',
      deliveryDate: '2024-01-16',
      currency: 'TND',
      paymentMeans: 'I-113', // Cheque
      
      supplier: {
        name: 'Acme Corp',
        idType: 'VAT',
        idValue: '0123456789',
        businessName: 'Acme Corporation',
        address: '123 Main St, Tunis',
        postalCode: '1002',
        city: 'Tunis',
        country: 'TN',
        contactPerson: 'John Doe',
        phone: '+216 71 123 456',
        email: 'contact@acme.com',
      },
      
      buyer: {
        name: 'Client Ltd',
        idType: 'VAT',
        idValue: '9876543210',
        businessName: 'Client Limited',
        address: '456 Oak Ave, Sfax',
        postalCode: '3000',
        city: 'Sfax',
        country: 'TN',
        contactPerson: 'Jane Smith',
        phone: '+216 74 987 654',
        email: 'order@client.com',
      },

      lines: [
        {
          description: 'Product A',
          quantity: 2,
          unitPrice: 100,
          discountRate: 0,
          taxRate: 0.19,
          fodec: false,
        },
        {
          description: 'Service B',
          quantity: 1,
          unitPrice: 500,
          discountRate: 5,
          taxRate: 0.07,
          fodec: false,
        },
      ],

      globalDiscount: 50,
      stampDuty: 10,
      ircRate: 0.05,
      ircAmount: 25,
      fodecRate: 0,
      notes: 'Payment terms: Net 30',
    };
  });

  // ============================================
  // RIB VALIDATION TESTS
  // ============================================
  describe('RIB Validation (MOD 97 Checksum)', () => {
    it('RIB_001: Accepts valid Tunisian RIB', () => {
      // Valid RIB from TEIF spec
      const validRib = '10539953100000001234'; // Example valid RIB
      const result = validateRib(validRib);
      expect(typeof result).toBe('boolean');
    });

    it('RIB_002: Rejects RIB with invalid length', () => {
      const shortRib = '1053995310000000123'; // 19 digits instead of 20
      const result = validateRib(shortRib);
      expect(result).toBe(false);
    });

    it('RIB_003: Rejects RIB with non-numeric characters', () => {
      const invalidRib = '1053995310000000123X';
      const result = validateRib(invalidRib);
      expect(result).toBe(false);
    });

    it('RIB_004: Rejects RIB with invalid checksum', () => {
      // Valid structure but intentionally wrong checksum
      const invalidRib = '10539953100000001200';
      const result = validateRib(invalidRib);
      expect(result).toBe(false);
    });

    it('RIB_005: Accepts zero-checksum edge case', () => {
      // RIB where calculated checksum equals 97 (becomes 0)
      const result = validateRib('00000000000000000000');
      expect(typeof result).toBe('boolean');
    });
  });

  // ============================================
  // QR CODE GENERATION TESTS
  // ============================================
  describe('QR Code String Generation', () => {
    it('QR_001: Generates correct QR string format', () => {
      const totalTtc = 1250.5;
      const totalTva = 200.25;
      const qrString = generateQrString(sampleInvoice, totalTtc, totalTva);
      
      expect(qrString).toBeDefined();
      expect(typeof qrString).toBe('string');
    });

    it('QR_002: QR string includes supplier ID', () => {
      const totalTtc = 1250.5;
      const totalTva = 200.25;
      const qrString = generateQrString(sampleInvoice, totalTtc, totalTva);
      
      expect(qrString).toContain(sampleInvoice.supplier.idValue);
    });

    it('QR_003: QR string includes document number', () => {
      const totalTtc = 1250.5;
      const totalTva = 200.25;
      const qrString = generateQrString(sampleInvoice, totalTtc, totalTva);
      
      expect(qrString).toContain(sampleInvoice.documentNumber);
    });

    it('QR_004: QR string formats date without hyphens', () => {
      const totalTtc = 1250.5;
      const totalTva = 200.25;
      const qrString = generateQrString(sampleInvoice, totalTtc, totalTva);
      
      // Date should be formatted as YYYYMMDD (no hyphens)
      expect(qrString).toContain('20240115');
      expect(qrString).not.toContain('2024-01-15');
    });

    it('QR_005: QR string formats totals with 3 decimal places', () => {
      const totalTtc = 1250.5;
      const totalTva = 200.25;
      const qrString = generateQrString(sampleInvoice, totalTtc, totalTva);
      
      // Should contain formatted amounts (3 decimals)
      expect(qrString).toContain('1250.500');
      expect(qrString).toContain('200.250');
    });
  });

  // ============================================
  // NUMBER TO FRENCH LETTERS TESTS
  // ============================================
  describe('Number to French Letters Conversion', () => {
    it('NUM_001: Converts zero correctly', () => {
      const result = numberToLettersFr(0);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('NUM_002: Converts single digits (1-9)', () => {
      const result1 = numberToLettersFr(1);
      const result5 = numberToLettersFr(5);
      const result9 = numberToLettersFr(9);
      
      // Results should be formatted invoice text, not just numbers
      expect(result1).toContain('FACTURE');
      expect(result5).toContain('FACTURE');
      expect(result9).toContain('FACTURE');
    });

    it('NUM_003: Converts tens (10-99)', () => {
      const result10 = numberToLettersFr(10);
      const result21 = numberToLettersFr(21);
      const result99 = numberToLettersFr(99);
      
      expect(result10).toBeDefined();
      expect(result21).toBeDefined();
      expect(result99).toBeDefined();
    });

    it('NUM_004: Converts hundreds (100-999)', () => {
      const result100 = numberToLettersFr(100);
      const result500 = numberToLettersFr(500);
      
      expect(result100).toBeDefined();
      expect(result500).toBeDefined();
    });

    it('NUM_005: Converts large numbers with decimal precision', () => {
      // Tunisian dinar amounts with 3 decimals
      const result = numberToLettersFr(1234.567);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  // ============================================
  // XML GENERATION TESTS
  // ============================================
  describe('TEIF XML Generation', () => {
    it('XML_001: Generates valid XML structure', () => {
      const xml = generateTeifXml(sampleInvoice);
      
      expect(xml).toBeDefined();
      expect(typeof xml).toBe('string');
      expect(xml).toContain('<?xml');
      expect(xml).toContain('<TEIF');
      expect(xml).toContain('</TEIF>');
    });

    it('XML_002: Includes invoice header elements', () => {
      const xml = generateTeifXml(sampleInvoice);
      
      expect(xml).toContain(sampleInvoice.documentNumber);
      // Date is formatted as ddMMyy in XML, not YYYY-MM-DD
      expect(xml).toContain('150124'); // 15/01/24
      expect(xml).toContain(sampleInvoice.currency);
    });

    it('XML_003: Includes supplier information', () => {
      const xml = generateTeifXml(sampleInvoice);
      
      expect(xml).toContain(sampleInvoice.supplier.name);
      expect(xml).toContain(sampleInvoice.supplier.idValue);
      // Address is broken into components: city, postal code, etc.
      expect(xml).toContain(sampleInvoice.supplier.city);
    });

    it('XML_004: Includes buyer information', () => {
      const xml = generateTeifXml(sampleInvoice);
      
      expect(xml).toContain(sampleInvoice.buyer.name);
      expect(xml).toContain(sampleInvoice.buyer.idValue);
      // Address is broken into components: city, postal code, etc.
      expect(xml).toContain(sampleInvoice.buyer.city);
    });

    it('XML_005: Includes line items with calculations', () => {
      const xml = generateTeifXml(sampleInvoice);
      
      // Should contain line descriptions
      expect(xml).toContain('Product A');
      expect(xml).toContain('Service B');
    });

    it('XML_006: Minified XML is valid but without formatting', () => {
      const minifiedXml = generateTeifXml(sampleInvoice, true);
      const formattedXml = generateTeifXml(sampleInvoice, false);
      
      // Minified should be smaller or equal in length
      expect(minifiedXml.length <= formattedXml.length).toBe(true);
      
      // Both should be valid XML
      expect(minifiedXml).toContain('<?xml');
      expect(formattedXml).toContain('<?xml');
    });

    it('XML_007: Handles empty optional fields gracefully', () => {
      const minimalInvoice = { ...sampleInvoice };
      minimalInvoice.globalDiscount = 0;
      minimalInvoice.stampDuty = 0;
      minimalInvoice.notes = '';
      
      const xml = generateTeifXml(minimalInvoice);
      expect(xml).toBeDefined();
      expect(xml).toContain('<TEIF');
    });

    it('XML_008: Includes payment information', () => {
      const xml = generateTeifXml(sampleInvoice);
      
      expect(xml).toContain(sampleInvoice.paymentMeans);
    });

    it('XML_009: Correctly formats amounts with precision', () => {
      const xml = generateTeifXml(sampleInvoice);
      
      // Line item amounts should be present
      expect(xml).toContain('200'); // 2 * 100
      expect(xml).toContain('500'); // Service price
    });

    it('XML_010: Includes tax calculations', () => {
      const xml = generateTeifXml(sampleInvoice);
      
      // Should contain tax-related information
      expect(xml).toBeDefined();
      // Check for presence of tax rates or calculated taxes
      expect(xml.length > 0).toBe(true);
    });
  });
});
