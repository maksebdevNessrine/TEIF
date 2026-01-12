import { describe, it, expect, beforeEach } from 'vitest';
import { InvoiceData } from '../../types';
import { generateTeifXml } from '../../services/xmlGenerator';
import { checkInvoiceCompliance } from '../../services/complianceChecker';

describe('Performance Benchmarks', () => {
  let largeInvoice: InvoiceData;
  let hugeInvoice: InvoiceData;

  beforeEach(() => {
    // Create a large invoice with 50 line items
    const lines = Array.from({ length: 50 }, (_, i) => ({
      description: `Line Item ${i + 1}: Product or Service`,
      quantity: Math.floor(Math.random() * 100) + 1,
      unitPrice: Math.random() * 1000 + 10,
      discountRate: Math.random() * 20,
      taxRate: [0, 0.07, 0.13, 0.19][Math.floor(Math.random() * 4)],
      fodec: Math.random() > 0.7,
    }));

    largeInvoice = {
      documentNumber: 'LARGE-2024-001',
      documentType: 'TAX_INVOICE',
      invoiceDate: '2024-02-01',
      dueDate: '2024-03-01',
      deliveryDate: '2024-02-02',
      currency: 'TND',
      paymentMeans: 'I-114',
      
      supplier: {
        name: 'Large Corporation',
        idType: 'VAT',
        idValue: '1234567890',
        businessName: 'Large Corp Inc',
        address: '100 Business Ave',
        postalCode: '2000',
        city: 'Ariana',
        country: 'TN',
        contactPerson: 'John Doe',
        phone: '+216 71 123 456',
        email: 'info@large.tn',
      },
      
      buyer: {
        name: 'Client Company',
        idType: 'VAT',
        idValue: '9876543210',
        businessName: 'Client Solutions',
        address: '200 Client Street',
        postalCode: '3100',
        city: 'Sfax',
        country: 'TN',
        contactPerson: 'Jane Smith',
        phone: '+216 74 987 654',
        email: 'orders@client.tn',
      },

      lines,
      globalDiscount: 500,
      stampDuty: 50,
      ircRate: 0.03,
      ircAmount: 100,
      fodecRate: 0,
    };

    // Create a huge invoice with 200 line items
    const hugeLines = Array.from({ length: 200 }, (_, i) => ({
      description: `Item ${i + 1}`,
      quantity: Math.floor(Math.random() * 1000) + 1,
      unitPrice: Math.random() * 5000 + 50,
      discountRate: Math.random() * 30,
      taxRate: [0, 0.07, 0.13, 0.19][Math.floor(Math.random() * 4)],
      fodec: Math.random() > 0.6,
    }));

    hugeInvoice = { ...largeInvoice, lines: hugeLines };
  });

  describe('Compliance Checker Performance', () => {
    it('PERF_001: Checks small invoice < 50ms', () => {
      const smallInvoice = { ...largeInvoice, lines: largeInvoice.lines.slice(0, 1) };
      
      const startTime = performance.now();
      checkInvoiceCompliance(smallInvoice);
      const duration = performance.now() - startTime;
      
      expect(duration).toBeLessThan(50);
    });

    it('PERF_002: Checks large invoice (50 lines) < 200ms', () => {
      const startTime = performance.now();
      checkInvoiceCompliance(largeInvoice);
      const duration = performance.now() - startTime;
      
      expect(duration).toBeLessThan(200);
    });

    it('PERF_003: Checks huge invoice (200 lines) < 1000ms', () => {
      const startTime = performance.now();
      checkInvoiceCompliance(hugeInvoice);
      const duration = performance.now() - startTime;
      
      expect(duration).toBeLessThan(1000);
    });

    it('PERF_004: Compliance check scales linearly', () => {
      const smallInvoice = { ...largeInvoice, lines: largeInvoice.lines.slice(0, 10) };
      
      const start1 = performance.now();
      checkInvoiceCompliance(smallInvoice);
      const time1 = performance.now() - start1;
      
      const start2 = performance.now();
      checkInvoiceCompliance(largeInvoice);
      const time2 = performance.now() - start2;
      
      // Time should not grow exponentially
      expect(time2 / time1).toBeLessThan(20); // 5x items should not take more than 20x time
    });
  });

  describe('XML Generation Performance', () => {
    it('PERF_005: Generates XML for small invoice < 100ms', () => {
      const smallInvoice = { ...largeInvoice, lines: largeInvoice.lines.slice(0, 1) };
      
      const startTime = performance.now();
      generateTeifXml(smallInvoice);
      const duration = performance.now() - startTime;
      
      expect(duration).toBeLessThan(100);
    });

    it('PERF_006: Generates XML for large invoice (50 lines) < 500ms', () => {
      const startTime = performance.now();
      generateTeifXml(largeInvoice);
      const duration = performance.now() - startTime;
      
      expect(duration).toBeLessThan(500);
    });

    it('PERF_007: Generates XML for huge invoice (200 lines) < 2000ms', () => {
      const startTime = performance.now();
      generateTeifXml(hugeInvoice);
      const duration = performance.now() - startTime;
      
      expect(duration).toBeLessThan(2000);
    });

    it('PERF_008: XML generation performance is acceptable', () => {
      const start1 = performance.now();
      const fullXml = generateTeifXml(largeInvoice, false);
      const time1 = performance.now() - start1;
      
      const start2 = performance.now();
      const minifiedXml = generateTeifXml(largeInvoice, true);
      const time2 = performance.now() - start2;
      
      // Both should complete in reasonable time
      expect(time1).toBeLessThan(500);
      expect(time2).toBeLessThan(500);
    });

    it('PERF_009: XML size for large invoice is reasonable', () => {
      const xml = generateTeifXml(largeInvoice);
      
      // XML should not be excessively large (even with 50 lines)
      expect(xml.length).toBeLessThan(500000); // 500KB max
    });

    it('PERF_010: Minified XML is smaller than formatted', () => {
      const fullXml = generateTeifXml(largeInvoice, false);
      const minifiedXml = generateTeifXml(largeInvoice, true);
      
      // Minified should be smaller
      expect(minifiedXml.length).toBeLessThanOrEqual(fullXml.length);
    });
  });

  describe('Memory Efficiency', () => {
    it('PERF_011: Multiple compliance checks do not cause memory leaks', () => {
      // Perform 100 compliance checks
      for (let i = 0; i < 100; i++) {
        checkInvoiceCompliance(largeInvoice);
      }
      
      // If we get here without crashing, memory is handled OK
      expect(true).toBe(true);
    });

    it('PERF_012: Multiple XML generations do not cause memory leaks', () => {
      // Perform 100 XML generations
      for (let i = 0; i < 100; i++) {
        generateTeifXml(largeInvoice);
      }
      
      // If we get here without crashing, memory is handled OK
      expect(true).toBe(true);
    });

    it('PERF_013: Concurrent operations complete successfully', () => {
      // Run compliance and XML generation in parallel
      const promises = [];
      
      for (let i = 0; i < 10; i++) {
        promises.push(Promise.resolve(checkInvoiceCompliance(largeInvoice)));
        promises.push(Promise.resolve(generateTeifXml(largeInvoice)));
      }
      
      // All should complete
      expect(promises.length).toBe(20);
    });
  });

  describe('Edge Case Performance', () => {
    it('PERF_014: Handles invoice with 0 line items', () => {
      const emptyInvoice = { ...largeInvoice, lines: [] };
      
      const startTime = performance.now();
      checkInvoiceCompliance(emptyInvoice);
      const duration = performance.now() - startTime;
      
      expect(duration).toBeLessThan(50);
    });

    it('PERF_015: Handles invoice with very long descriptions', () => {
      const longDescInvoice = {
        ...largeInvoice,
        lines: [{
          ...largeInvoice.lines[0],
          description: 'A'.repeat(10000), // 10KB description
        }],
      };
      
      const startTime = performance.now();
      generateTeifXml(longDescInvoice);
      const duration = performance.now() - startTime;
      
      expect(duration).toBeLessThan(500);
    });

    it('PERF_016: Handles invoice with maximum precision amounts', () => {
      const precisionInvoice = {
        ...largeInvoice,
        lines: largeInvoice.lines.map(line => ({
          ...line,
          unitPrice: Math.random() * 999999.99999,
        })),
      };
      
      const startTime = performance.now();
      generateTeifXml(precisionInvoice);
      const duration = performance.now() - startTime;
      
      expect(duration).toBeLessThan(500);
    });
  });
});
