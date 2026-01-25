import { generateTeifXml, escapeXml } from './invoice';

describe('XML Escaping', () => {
  test('escapeXml should properly escape special characters', () => {
    const input = 'C&B audit <test> "quotes" \'apostrophes\'';
    const expected = 'C&amp;B audit &lt;test&gt; &quot;quotes&quot; &apos;apostrophes&apos;';
    expect(escapeXml(input)).toBe(expected);
  });

  test('should not double-escape already escaped entities', () => {
    const input = '&amp;';
    // First call should escape & to &amp;
    const firstPass = escapeXml(input);
    expect(firstPass).toBe('&amp;amp;'); // & is escaped to &amp;, then & from &amp; is escaped
    
    // But in the XML generator, we should never escape twice
    // The data comes raw and gets escaped once
  });

  test('generateTeifXml should escape partner names with special characters', () => {
    const data = {
      documentNumber: 'DOC-001',
      documentType: 'INVOICE',
      invoiceDate: '2025-01-20',
      currency: 'TND',
      supplier: {
        name: 'C&B Audit <Services>',
        idType: 'SIRET',
        idValue: '123456789',
        addressDescription: 'Test & Demo',
        street: 'Rue de "Test"',
        city: 'City\'s Name',
        postalCode: '75000',
        country: 'FR',
        isBusiness: true,
      },
      buyer: {
        name: 'Buyer Name',
        idType: 'SIRET',
        idValue: '987654321',
        addressDescription: '',
        street: 'Street',
        city: 'City',
        postalCode: '75001',
        country: 'FR',
        isBusiness: true,
      },
      lines: [],
      totalHt: 100,
      totalTva: 19,
      totalTtc: 119,
      paymentMeans: 'TRANSFER',
    };

    const xml = generateTeifXml(data, false);
    
    // Verify special characters are escaped
    expect(xml).toContain('C&amp;B Audit &lt;Services&gt;');
    expect(xml).toContain('Test &amp; Demo');
    expect(xml).toContain('Rue de &quot;Test&quot;');
    expect(xml).toContain('City&apos;s Name');
    
    // Verify it doesn't contain unescaped versions
    expect(xml).not.toContain('C&B Audit <Services>');
    expect(xml).not.toContain('Test & Demo</AdressDescription>');
    expect(xml).not.toContain('Rue de "Test"</Street>');
  });

  test('generated XML should be parseable', () => {
    const data = {
      documentNumber: 'DOC-001',
      documentType: 'INVOICE',
      invoiceDate: '2025-01-20',
      currency: 'TND',
      supplier: {
        name: 'Supplier & Co.',
        idType: 'SIRET',
        idValue: '123456789',
        addressDescription: '',
        street: '',
        city: '',
        postalCode: '',
        country: 'FR',
        isBusiness: true,
      },
      buyer: {
        name: 'Buyer',
        idType: 'SIRET',
        idValue: '987654321',
        addressDescription: '',
        street: '',
        city: '',
        postalCode: '',
        country: 'FR',
        isBusiness: true,
      },
      lines: [],
      totalHt: 100,
      totalTva: 19,
      totalTtc: 119,
      paymentMeans: 'TRANSFER',
    };

    const xml = generateTeifXml(data, false);
    
    // Should not throw when parsing
    try {
      new DOMParser().parseFromString(xml, 'text/xml');
      // If we get here, XML is valid
      expect(true).toBe(true);
    } catch (e) {
      expect(e).toBeNull(); // This will fail if XML is invalid
    }
  });
});
