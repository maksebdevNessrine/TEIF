/**
 * Signature Routes
 * Handle certificate upload, validation, and invoice signing
 * 
 * Endpoints:
 * - POST /upload - Upload user's PKCS#12 certificate
 * - POST /invoices/:invoiceId/sign - Sign invoice with certificate
 * - GET /status - Check certificate status
 * - DELETE / - Revoke certificate
 */

import { Hono } from 'hono';
import type { Context } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { requireAuth, type AuthUser } from '../middleware/auth';
import { createSigningLimiter, createCertificateUploadLimiter } from '../middleware/rateLimiter';
import SignatureService from '../services/signature.service';
import InvoiceSigningService from '../services/invoiceSigning.service';
import AuditLogService from '../services/auditLog.service';
import { prisma } from '../lib/prisma';

type SignatureContext = {
  Variables: {
    user: AuthUser;
  };
};

const signatureRoutes = new Hono<SignatureContext>();

// Initialize rate limiters
const signingLimiter = createSigningLimiter();
const certificateUploadLimiter = createCertificateUploadLimiter();

// Validation schemas
const uploadCertificateSchema = z.object({
  pin: z
    .string()
    .min(4, 'PIN must be at least 4 characters')
    .max(20, 'PIN cannot exceed 20 characters'),
});

const signInvoiceSchema = z.object({
  pin: z
    .string()
    .min(4, 'PIN must be at least 4 characters')
    .max(20, 'PIN cannot exceed 20 characters'),
});

/**
 * POST /upload
 * Upload user's PKCS#12 certificate
 */
signatureRoutes.post(
  '/upload',
  certificateUploadLimiter,
  requireAuth,
  zValidator('form', uploadCertificateSchema),
  async (c: Context) => {
    try {
      const user = c.get('user') as AuthUser;
      const formData = await c.req.formData();
      const pin = (c.req.valid as any)('form')?.pin;

      // Get certificate file
      const certificateFile = formData.get('certificate') as File | null;
      if (!certificateFile) {
        return c.json({
          success: false,
          error: 'Certificate file required',
          code: 'MISSING_FILE',
        });
      }

      // Validate file type
      const validMimeTypes = ['application/pkcs12', 'application/x-pkcs12', 'application/octet-stream'];
      if (!validMimeTypes.includes(certificateFile.type)) {
        // Allow by extension as fallback
        if (
          !certificateFile.name.endsWith('.p12') &&
          !certificateFile.name.endsWith('.pfx')
        ) {
          await AuditLogService.logSignatureAction({
            userId: user.userId,
            action: 'UPLOAD',
            status: 'FAILED',
            errorMessage: 'Invalid file type - must be .p12 or .pfx',
          });

          return c.json({
            success: false,
            error: 'Invalid file type - must be .p12 or .pfx certificate',
            code: 'INVALID_FILE_TYPE',
          });
        }
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (certificateFile.size > maxSize) {
        return c.json({
          success: false,
          error: 'Certificate file too large (max 10MB)',
          code: 'FILE_TOO_LARGE',
        });
      }

      // Read file into buffer
      const certificateBuffer = Buffer.from(await certificateFile.arrayBuffer());

      // Upload and validate certificate
      const storageData = await SignatureService.uploadCertificate(
        user.userId,
        certificateBuffer,
        pin,
        certificateFile.name
      );

      // Log successful upload
      await AuditLogService.logSignatureAction({
        userId: user.userId,
        action: 'UPLOAD',
        status: 'SUCCESS',
        certificateUsed: storageData.certificateSubject || undefined,
        ipAddress: c.req.header('X-Forwarded-For') || c.req.header('CF-Connecting-IP'),
        userAgent: c.req.header('User-Agent'),
      });

      return c.json({
        success: true,
        data: {
          certificateSubject: storageData.certificateSubject,
          certificateIssuer: storageData.certificateIssuer,
          validFrom: storageData.certificateValidFrom,
          validUntil: storageData.certificateValidUntil,
          status: storageData.status,
          message: 'Certificate uploaded successfully',
        },
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Certificate upload failed';

      // Log failed upload
      const user = c.get('user') as AuthUser;
      await AuditLogService.logSignatureAction({
        userId: user.userId,
        action: 'UPLOAD',
        status: 'FAILED',
        errorMessage,
        ipAddress: c.req.header('X-Forwarded-For') || c.req.header('CF-Connecting-IP'),
      });

      // Determine error code and status
      let code = 'UPLOAD_FAILED';
      if (errorMessage.includes('Invalid PIN')) {
        code = 'INVALID_PIN';
      } else if (errorMessage.includes('expired')) {
        code = 'CERTIFICATE_EXPIRED';
      } else if (errorMessage.includes('No certificate found')) {
        code = 'INVALID_CERTIFICATE_FILE';
      }

      return c.json({
        success: false,
        error: errorMessage,
        code,
      });
    }
  }
);

/**
 * POST /invoices/:invoiceId/sign
 * Sign invoice with user's certificate
 */
signatureRoutes.post(
  '/invoices/:invoiceId/sign',
  signingLimiter,
  requireAuth,
  zValidator('json', signInvoiceSchema),
  async (c: Context) => {
    try {
      const user = c.get('user') as AuthUser;
      const { invoiceId } = c.req.param();
      const { pin } = (c.req.valid as any)('json');

      // Verify invoice exists and belongs to user
      const invoice = await prisma.invoice.findFirst({
        where: {
          id: invoiceId,
          userId: user.userId,
        },
      });

      if (!invoice) {
        return c.json({
          success: false,
          error: 'Invoice not found',
          code: 'INVOICE_NOT_FOUND',
        });
      }

      // Sign invoice
      const result = await InvoiceSigningService.signInvoice({
        userId: user.userId,
        invoiceId,
        pin,
        xmlContent: invoice.xmlContent,
        invoiceDocumentNumber: invoice.documentNumber,
      });

      // Log successful signing
      await AuditLogService.logSignatureAction({
        userId: user.userId,
        action: 'SIGN',
        invoiceId,
        documentNumber: invoice.documentNumber,
        status: 'SUCCESS',
        ipAddress: c.req.header('X-Forwarded-For') || c.req.header('CF-Connecting-IP'),
        userAgent: c.req.header('User-Agent'),
      });

      return c.json({
        success: true,
        data: {
          signedXml: result.signedXml,
          signatureId: result.signatureId,
          timestamp: result.timestamp,
          filename: `invoice_${invoice.documentNumber}_signed.xml`,
        },
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Signing failed';
      const user = c.get('user') as AuthUser;

      // Log failed signing
      await AuditLogService.logSignatureAction({
        userId: user.userId,
        action: 'SIGN',
        invoiceId: c.req.param('invoiceId'),
        status: 'FAILED',
        errorMessage,
        ipAddress: c.req.header('X-Forwarded-For') || c.req.header('CF-Connecting-IP'),
      });

      let code = 'SIGNING_FAILED';
      if (errorMessage.includes('No certificate')) {
        code = 'NO_CERTIFICATE';
      } else if (errorMessage.includes('Invalid PIN')) {
        code = 'INVALID_PIN';
      } else if (errorMessage.includes('expired')) {
        code = 'CERTIFICATE_EXPIRED';
      }

      return c.json({
        success: false,
        error: errorMessage,
        code,
      });
    }
  }
);

/**
 * GET /status
 * Check certificate status
 */
signatureRoutes.get('/status', requireAuth, async (c: Context) => {
  try {
    const user = c.get('user') as AuthUser;

    const signature = await prisma.userSignature.findUnique({
      where: { userId: user.userId },
      select: {
        status: true,
        certificateSubject: true,
        certificateIssuer: true,
        certificateValidFrom: true,
        certificateValidUntil: true,
        uploadedAt: true,
        lastUsedAt: true,
      },
    });

    if (!signature) {
      return c.json({
        userId: user.userId,
        hasCertificate: false,
      });
    }

    // Calculate days remaining
    const daysRemaining =
      signature.certificateValidUntil && signature.certificateValidUntil > new Date()
        ? Math.ceil(
            (signature.certificateValidUntil.getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : null;

    return c.json({
      userId: user.userId,
      hasCertificate: true,
      status: signature.status,
      certificateSubject: signature.certificateSubject,
      certificateIssuer: signature.certificateIssuer,
      certificateValidFrom: signature.certificateValidFrom?.toISOString(),
      certificateValidUntil: signature.certificateValidUntil?.toISOString(),
      daysRemaining,
      uploadedAt: signature.uploadedAt?.toISOString(),
      lastUsedAt: signature.lastUsedAt?.toISOString() || null,
    });
  } catch (error: any) {
    return c.json({
      error: error.message || 'Failed to retrieve status',
      code: 'STATUS_CHECK_FAILED',
    }, 500);
  }
});

/**
 * DELETE /
 * Revoke user's certificate
 */
signatureRoutes.delete('/', requireAuth, async (c: Context) => {
  try {
    const user = c.get('user') as AuthUser;

    await SignatureService.deleteCertificate(user.userId);

    // Log revocation
    await AuditLogService.logSignatureAction({
      userId: user.userId,
      action: 'REVOKE',
      status: 'SUCCESS',
      ipAddress: c.req.header('X-Forwarded-For') || c.req.header('CF-Connecting-IP'),
    });

    return c.json({
      success: true,
      message: 'Certificate revoked successfully',
    });
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message || 'Revocation failed',
      code: 'REVOKE_FAILED',
    });
  }
});

export default signatureRoutes;
