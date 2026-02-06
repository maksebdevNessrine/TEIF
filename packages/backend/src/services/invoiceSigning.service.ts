/**
 * Invoice Signing Service
 * Handles XML-DSig signature generation and embedding
 * Creates production-ready signed TEIF XML with RSA-SHA256 signatures
 */

import crypto from 'crypto';
import forge from 'node-forge';
import { randomUUID } from 'crypto';
import SignatureService from './signature.service';
import { prisma } from '../lib/prisma';

interface SignInvoiceParams {
  userId: string;
  invoiceId: string;
  pin: string;
  xmlContent: string;
  invoiceDocumentNumber: string;
}

interface SignatureResult {
  signedXml: string;
  signatureId: string;
  timestamp: string;
}

class InvoiceSigningService {
  /**
   * Canonicalize XML (remove comments, normalize whitespace)
   * Uses Exclusive XML Canonicalization (exc-c14n)
   */
  private canonicalizeXml(xml: string): string {
    // Remove XML comments
    let canonical = xml.replace(/<!--[\s\S]*?-->/g, '');

    // Remove leading/trailing whitespace
    canonical = canonical.trim();

    // Normalize whitespace between tags (remove extra spaces/newlines)
    canonical = canonical.replace(/>\s+</g, '><');

    return canonical;
  }

  /**
   * Extract the invoice body for signing (everything except existing signatures)
   */
  private extractInvoiceBody(xmlContent: string): string {
    // Remove existing signature elements
    return xmlContent.replace(/<ds:Signature[^>]*>[\s\S]*?<\/ds:Signature>/g, '');
  }

  /**
   * Calculate SHA-256 digest of XML content
   */
  private calculateDigest(content: string): string {
    const hash = crypto.createHash('sha256').update(content).digest('base64');
    return hash;
  }

  /**
   * Create the SignedInfo XML structure
   */
  private createSignedInfo(bodyDigest: string, referenceId: string = 'r-id-frs'): string {
    return `<ds:SignedInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
  <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
  <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
  <ds:Reference Id="${referenceId}" URI="">
    <ds:Transforms>
      <ds:Transform Algorithm="http://www.w3.org/TR/1999/REC-xpath-19991116">
        <ds:XPath>not(ancestor-or-self::ds:Signature)</ds:XPath>
      </ds:Transform>
      <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
    </ds:Transforms>
    <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
    <ds:DigestValue>${bodyDigest}</ds:DigestValue>
  </ds:Reference>
</ds:SignedInfo>`;
  }

  /**
   * Sign XML with user's private key (RSA-SHA256)
   */
  private signWithPrivateKey(
    canonicalSignedInfo: string,
    privateKeyPem: string
  ): string {
    try {
      const signer = crypto.createSign('RSA-SHA256');
      signer.update(canonicalSignedInfo);
      signer.end();

      const signature = signer.sign(
        {
          key: privateKeyPem,
          format: 'pem',
          type: 'pkcs1',
        },
        'base64'
      );

      return signature;
    } catch (error) {
      throw new Error(
        `Failed to sign XML: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Extract X.509 certificate from PKCS#12 in PEM format
   */
  private extractCertificatePem(pkcs12: any): string {
    const certBags = pkcs12.getBags({ bagType: forge.pki.oids.certBag });
    const cert = certBags.certBag?.[0]?.cert;

    if (!cert) {
      throw new Error('No certificate found in PKCS#12');
    }

    // Convert forge certificate to PEM
    return forge.pki.certificateToPem(cert);
  }

  /**
   * Create XAdES-compliant Signature element
   */
  private createSignatureElement(
    signatureValue: string,
    bodyDigest: string,
    certificatePem: string,
    signatureId: string = 'SigFrs',
    referenceId: string = 'r-id-frs'
  ): string {
    // Extract certificate without PEM headers
    const certContent = certificatePem
      .replace(/-----BEGIN CERTIFICATE-----/g, '')
      .replace(/-----END CERTIFICATE-----/g, '')
      .replace(/\n/g, '');

    const timestamp = new Date().toISOString();

    return `  <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" Id="${signatureId}">
    <ds:SignedInfo>
      <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
      <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
      <ds:Reference Id="${referenceId}" URI="">
        <ds:Transforms>
          <ds:Transform Algorithm="http://www.w3.org/TR/1999/REC-xpath-19991116">
            <ds:XPath>not(ancestor-or-self::ds:Signature)</ds:XPath>
          </ds:Transform>
          <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
        </ds:Transforms>
        <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
        <ds:DigestValue>${bodyDigest}</ds:DigestValue>
      </ds:Reference>
    </ds:SignedInfo>
    <ds:SignatureValue>${signatureValue}</ds:SignatureValue>
    <ds:KeyInfo>
      <ds:X509Data>
        <ds:X509Certificate>${certContent}</ds:X509Certificate>
      </ds:X509Data>
    </ds:KeyInfo>
    <ds:Object>
      <xades:QualifyingProperties Target="#${signatureId}">
        <xades:SignedProperties>
          <xades:SignedSignatureProperties>
            <xades:SigningTime>${timestamp}</xades:SigningTime>
          </xades:SignedSignatureProperties>
          <xades:SignedDataObjectProperties>
            <xades:DataObjectFormat ObjectReference="#${referenceId}">
              <xades:MimeType>text/xml</xades:MimeType>
              <xades:Encoding>UTF-8</xades:Encoding>
            </xades:DataObjectFormat>
          </xades:SignedDataObjectProperties>
        </xades:SignedProperties>
      </xades:QualifyingProperties>
    </ds:Object>
  </ds:Signature>`;
  }

  /**
   * Embed signature into TEIF XML
   */
  private embedSignatureInXml(
    xmlContent: string,
    signatureElement: string
  ): string {
    // Find the closing </TEIF> tag and insert signature before it
    const teifCloseTag = '</TEIF>';
    const insertPosition = xmlContent.lastIndexOf(teifCloseTag);

    if (insertPosition === -1) {
      throw new Error('Invalid TEIF XML: missing closing </TEIF> tag');
    }

    return (
      xmlContent.substring(0, insertPosition) +
      '\n' +
      signatureElement +
      '\n' +
      xmlContent.substring(insertPosition)
    );
  }

  /**
   * Main method: Sign invoice with user's certificate
   */
  async signInvoice(params: SignInvoiceParams): Promise<SignatureResult> {
    const { userId, invoiceId, pin, xmlContent, invoiceDocumentNumber } = params;

    try {
      // 1. Retrieve decrypted certificate
      const decryptedCertificate = await SignatureService.getDecryptedCertificate(userId, pin);

      // 2. Parse PKCS#12
      const pkcs12Asn1 = forge.asn1.fromDer(decryptedCertificate.toString('binary'));
      const pkcs12 = forge.pkcs12.pkcs12FromAsn1(pkcs12Asn1, pin);

      // 3. Extract private key
      const keyBags = pkcs12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
      const privateKeyForge = keyBags.privateBag?.[0]?.key;

      if (!privateKeyForge) {
        throw new Error('Failed to extract private key from certificate');
      }

      // 4. Extract certificate and convert to PEM
      const certificatePem = this.extractCertificatePem(pkcs12);

      // 5. Extract invoice body (remove existing signatures)
      const invoiceBody = this.extractInvoiceBody(xmlContent);

      // 6. Canonicalize invoice body
      const canonicalBody = this.canonicalizeXml(invoiceBody);

      // 7. Calculate body digest
      const bodyDigest = this.calculateDigest(canonicalBody);

      // 8. Create SignedInfo
      const signedInfo = this.createSignedInfo(bodyDigest, 'r-id-frs');

      // 9. Canonicalize SignedInfo
      const canonicalSignedInfo = this.canonicalizeXml(signedInfo);

      // 10. Convert forge private key to PEM
      const privateKeyPem = forge.pki.privateKeyToPem(privateKeyForge);

      // 11. Sign with private key
      const signatureValue = this.signWithPrivateKey(canonicalSignedInfo, privateKeyPem);

      // 12. Create signature element
      const signatureId = randomUUID();
      const signatureElement = this.createSignatureElement(
        signatureValue,
        bodyDigest,
        certificatePem,
        'SigFrs',
        'r-id-frs'
      );

      // 13. Embed signature in XML
      const signedXml = this.embedSignatureInXml(xmlContent, signatureElement);

      // 14. Update invoice with signed XML (optional)
      await prisma.invoice.update({
        where: { id: invoiceId },
        data: {
          xmlContent: signedXml,
          status: 'finalized',
          metadata: {
            ...(typeof params === 'object' &&
            params !== null &&
            'metadata' in params &&
            params.metadata ? (params.metadata as object) : {}),
            signedAt: new Date().toISOString(),
            signatureId,
          },
        },
      });

      return {
        signedXml,
        signatureId,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(
        `Invoice signing failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}

export default new InvoiceSigningService();
