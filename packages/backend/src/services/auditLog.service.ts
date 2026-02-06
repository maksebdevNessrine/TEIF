/**
 * Audit Log Service
 * Tracks all signature operations for compliance and security auditing
 */

import { prisma } from '../lib/prisma';

interface LogSignatureActionParams {
  userId: string;
  action: 'UPLOAD' | 'SIGN' | 'VALIDATE_FAILED' | 'EXPIRY_WARNING' | 'REVOKE';
  invoiceId?: string;
  documentNumber?: string;
  status: 'SUCCESS' | 'FAILED';
  errorMessage?: string;
  certificateUsed?: string;
  ipAddress?: string;
  userAgent?: string;
}

class AuditLogService {
  /**
   * Log a signature-related action
   */
  async logSignatureAction(params: LogSignatureActionParams): Promise<void> {
    try {
      await prisma.signatureAudit.create({
        data: {
          userId: params.userId,
          action: params.action,
          invoiceId: params.invoiceId,
          documentNumber: params.documentNumber,
          status: params.status,
          errorMessage: params.errorMessage,
          certificateUsed: params.certificateUsed,
          ipAddress: params.ipAddress,
          userAgent: params.userAgent,
        },
      });
    } catch (error) {
      // Log to console but don't throw - auditing shouldn't break the main flow
      console.error('Audit logging failed:', error);
    }
  }

  /**
   * Get audit logs for a user
   */
  async getUserAuditLogs(
    userId: string,
    options: { limit?: number; offset?: number; action?: string } = {}
  ) {
    const { limit = 50, offset = 0, action } = options;

    const where: any = { userId };
    if (action) {
      where.action = action;
    }

    const [logs, total] = await Promise.all([
      prisma.signatureAudit.findMany({
        where,
        select: {
          id: true,
          action: true,
          invoiceId: true,
          documentNumber: true,
          status: true,
          errorMessage: true,
          certificateUsed: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.signatureAudit.count({ where }),
    ]);

    return {
      logs,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  }

  /**
   * Get audit logs for an invoice (all signings)
   */
  async getInvoiceSigningHistory(invoiceId: string) {
    return await prisma.signatureAudit.findMany({
      where: {
        invoiceId,
        action: 'SIGN',
      },
      select: {
        userId: true,
        status: true,
        certificateUsed: true,
        errorMessage: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get suspicious activity (failed attempts)
   */
  async getFailedAttempts(
    userId: string,
    options: { timeWindowMinutes?: number; limit?: number } = {}
  ) {
    const { timeWindowMinutes = 60, limit = 10 } = options;

    const since = new Date(Date.now() - timeWindowMinutes * 60 * 1000);

    return await prisma.signatureAudit.findMany({
      where: {
        userId,
        status: 'FAILED',
        createdAt: { gte: since },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}

export default new AuditLogService();
