/**
 * Signature Service
 * Handles certificate validation, encryption/decryption, and metadata extraction
 * for user-uploaded PKCS#12 certificates from Tunisia TradeNet
 */

import crypto from 'crypto';
import forge from 'node-forge';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { getSignatureEncryptionKey } from '../config/env';

interface CertificateValidationResult {
  isValid: boolean;
  subject?: string;
  issuer?: string;
  serialNumber?: string;
  validFrom?: Date;
  validUntil?: Date;
  algorithm?: string;
  error?: string;
}

interface StorageCertificateData {
  certificateFilename: string;
  encryptedContent: string;
  signaturePinHash: string;
  certificateSubject: string | null;
  certificateIssuer: string | null;
  certificateSerialNumber: string | null;
  certificateValidFrom: Date | null;
  certificateValidUntil: Date | null;
  keyAlgorithm: string | null;
  status: string;
}

class SignatureService {
  /**
   * Validate PKCS#12 certificate file and extract metadata
   * @param certificateBuffer Raw PKCS#12 file bytes
   * @param pin User's PIN to unlock the certificate
   * @returns Validation result with metadata or error
   */
  async validateCertificate(
    certificateBuffer: Buffer,
    pin: string
  ): Promise<CertificateValidationResult> {
    try {
      // Parse PKCS#12
      const pkcs12Asn1 = forge.asn1.fromDer(certificateBuffer.toString('binary'));
      const pkcs12 = forge.pkcs12.pkcs12FromAsn1(pkcs12Asn1, pin);

      // Extract certificate from PKCS#12
      const certBags = pkcs12.getBags({ bagType: forge.pki.oids.certBag });
      const cert = certBags.certBag?.[0]?.cert;

      if (!cert) {
        return {
          isValid: false,
          error: 'No certificate found in PKCS#12 file',
        };
      }

      // Validate certificate is not expired
      const now = new Date();
      const validFrom = new Date(cert.validity.notBefore);
      const validUntil = new Date(cert.validity.notAfter);

      if (validFrom > now) {
        return {
          isValid: false,
          error: 'Certificate is not yet valid',
        };
      }

      if (validUntil < now) {
        return {
          isValid: false,
          error: 'Certificate has expired',
        };
      }

      // Extract certificate metadata
      const subject = cert.subject.attributes
        .map((attr: any) => `${attr.name}=${attr.value}`)
        .join(', ');

      const issuer = cert.issuer.attributes
        .map((attr: any) => `${attr.name}=${attr.value}`)
        .join(', ');

      return {
        isValid: true,
        subject,
        issuer,
        serialNumber: (cert.serialNumber as any).toString(16),
        validFrom,
        validUntil,
        algorithm: cert.signatureOid || 'RSA-SHA256',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        isValid: false,
        error: `Certificate validation failed: ${errorMessage}`,
      };
    }
  }

  /**
   * Encrypt certificate buffer with AES-256-GCM
   * @param certificateBuffer Raw certificate bytes
   * @returns Base64-encoded encrypted content with IV and auth tag
   */
  encryptCertificate(certificateBuffer: Buffer): string {
    const iv = crypto.randomBytes(16);
    const encryptionKeyBuffer = getSignatureEncryptionKey();

    const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKeyBuffer, iv);
    let encrypted = cipher.update(certificateBuffer);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    const authTag = cipher.getAuthTag();

    // Combine: IV (16 bytes) + Auth Tag (16 bytes) + Encrypted Data
    const combined = Buffer.concat([iv, authTag, encrypted]);
    return combined.toString('base64');
  }

  /**
   * Decrypt certificate from encrypted storage
   * @param encryptedData Base64-encoded encrypted content
   * @returns Decrypted certificate buffer
   * @throws Error if decryption fails (tampered data or wrong key)
   */
  decryptCertificate(encryptedData: string): Buffer {
    try {
      const combined = Buffer.from(encryptedData, 'base64');
      const iv = combined.slice(0, 16);
      const authTag = combined.slice(16, 32);
      const encrypted = combined.slice(32);

      const encryptionKeyBuffer = getSignatureEncryptionKey();
      const decipher = crypto.createDecipheriv('aes-256-gcm', encryptionKeyBuffer, iv);
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encrypted);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      return decrypted;
    } catch (error) {
      throw new Error(
        `Decryption failed - certificate may be corrupted or key is invalid: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Hash user's PIN with bcrypt (12 salt rounds for higher security than passwords)
   * @param pin User's PIN
   * @returns Bcrypt hash
   */
  async hashPin(pin: string): Promise<string> {
    return await bcrypt.hash(pin, 12);
  }

  /**
   * Verify PIN against stored hash
   * @param pin User's provided PIN
   * @param hash Stored bcrypt hash
   * @returns True if PIN matches
   */
  async verifyPin(pin: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(pin, hash);
  }

  /**
   * Upload and store user's certificate
   * - Validates the certificate
   * - Encrypts it at rest
   * - Stores metadata in database
   * @param userId User ID
   * @param certificateBuffer Raw PKCS#12 file bytes
   * @param pin User's PIN
   * @param filename Original filename
   * @returns Stored certificate data
   * @throws Error if validation fails
   */
  async uploadCertificate(
    userId: string,
    certificateBuffer: Buffer,
    pin: string,
    filename: string
  ): Promise<StorageCertificateData> {
    // 1. Validate certificate
    const validation = await this.validateCertificate(certificateBuffer, pin);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Invalid certificate');
    }

    // 2. Encrypt certificate
    const encryptedContent = this.encryptCertificate(certificateBuffer);

    // 3. Hash PIN
    const signaturePinHash = await this.hashPin(pin);

    // 4. Prepare data for storage
    const storageData: StorageCertificateData = {
      certificateFilename: filename,
      encryptedContent,
      signaturePinHash,
      certificateSubject: validation.subject || null,
      certificateIssuer: validation.issuer || null,
      certificateSerialNumber: validation.serialNumber || null,
      certificateValidFrom: validation.validFrom || null,
      certificateValidUntil: validation.validUntil || null,
      keyAlgorithm: validation.algorithm || null,
      status: 'verified',
    };

    // 5. Store or update in database
    await prisma.userSignature.upsert({
      where: { userId },
      create: {
        userId,
        ...storageData,
      },
      update: storageData,
    });

    return storageData;
  }

  /**
   * Get decrypted certificate for signing
   * - Retrieves encrypted certificate from database
   * - Verifies user's PIN
   * - Decrypts certificate
   * - Validates certificate is not expired
   * @param userId User ID
   * @param pin User's PIN
   * @returns Decrypted certificate buffer
   * @throws Error if PIN incorrect or certificate expired
   */
  async getDecryptedCertificate(userId: string, pin: string): Promise<Buffer> {
    // 1. Retrieve stored certificate
    const signature = await prisma.userSignature.findUnique({
      where: { userId },
    });

    if (!signature) {
      throw new Error('No certificate found for user');
    }

    // 2. Verify PIN
    const pinMatches = await this.verifyPin(pin, signature.signaturePinHash);
    if (!pinMatches) {
      throw new Error('Invalid PIN');
    }

    // 3. Check certificate expiry
    if (signature.certificateValidUntil && signature.certificateValidUntil < new Date()) {
      throw new Error('Certificate has expired');
    }

    // 4. Decrypt certificate
    const decryptedCertificate = this.decryptCertificate(signature.encryptedContent);

    // 5. Update last used timestamp
    await prisma.userSignature.update({
      where: { userId },
      data: { lastUsedAt: new Date() },
    });

    return decryptedCertificate;
  }

  /**
   * Check certificate expiry status
   * @param userId User ID
   * @returns Days remaining until expiry, or null if no certificate
   */
  async getCertificateExpiryStatus(userId: string): Promise<{
    daysRemaining: number | null;
    isExpired: boolean;
    expiryDate: Date | null;
  }> {
    const signature = await prisma.userSignature.findUnique({
      where: { userId },
    });

    if (!signature || !signature.certificateValidUntil) {
      return {
        daysRemaining: null,
        isExpired: false,
        expiryDate: null,
      };
    }

    const now = new Date();
    const expiryDate = signature.certificateValidUntil;
    const isExpired = expiryDate < now;

    const daysRemaining = isExpired
      ? null
      : Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      daysRemaining,
      isExpired,
      expiryDate,
    };
  }

  /**
   * Delete user's certificate (revocation)
   * @param userId User ID
   */
  async deleteCertificate(userId: string): Promise<void> {
    await prisma.userSignature.update({
      where: { userId },
      data: {
        status: 'revoked',
        encryptedContent: '', // Clear sensitive data
      },
    });
  }
}

export default new SignatureService();
