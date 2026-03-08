import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { useTranslation } from '@/services/i18n';
import { SignatureUpload } from '@/components/SignatureUpload';
import { useSignatureStatus, useRevokeSignature } from '@/hooks/useSignature';
import type { UserSignatureProfile } from '@teif/shared/types';

export function Settings() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Use TanStack Query hooks for signature management
  const { data: signatureStatus, isLoading: loading, error: signatureError } = useSignatureStatus();
  const [error, setError] = useState<string | null>(null);
  const revokeMutation = useRevokeSignature();

  const handleSignatureUploadSuccess = (profile: UserSignatureProfile) => {
    // The hook automatically updates the cache, no manual state update needed
    console.log('Signature uploaded successfully:', profile);
  };

  const handleRevokeCertificate = async () => {
    if (!confirm(t('confirmRevokeSignature') || 'Are you sure you want to revoke your certificate?')) {
      return;
    }

    try {
      await revokeMutation.mutateAsync();
    } catch (err) {
      // Error is handled by the hook
      console.error('Failed to revoke certificate:', err);
    }
  };

  const daysUntilExpiry = signatureStatus?.daysRemaining ?? 0;
  const isExpiringSoon = daysUntilExpiry < 30 && daysUntilExpiry > 0;
  const isExpired = daysUntilExpiry <= 0;

  return (
    <div className="space-y-6">
      {/* User Information */}
      <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-emerald-400 mb-4">
          {t('accountInfo') || 'Account Information'}
        </h2>
        <div className="space-y-3">
          <p className="text-gray-300">
            <span className="font-medium text-slate-200">{t('name') || 'Name'}:</span>{' '}
            <span className="text-gray-400">{user?.name || '-'}</span>
          </p>
          <p className="text-gray-300">
            <span className="font-medium text-slate-200">{t('email') || 'Email'}:</span>{' '}
            <span className="text-gray-400">{user?.email || '-'}</span>
          </p>
          <p className="text-gray-300">
            <span className="font-medium text-slate-200">{t('userId') || 'User ID'}:</span>{' '}
            <span className="text-gray-400 font-mono text-sm">{user?.id || '-'}</span>
          </p>
        </div>
      </div>

      {/* Digital Signature Section */}
      <div className="rounded-lg bg-slate-800/50 border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-emerald-400 mb-6">
          {t('digitalSignature') || 'Digital Signature Certificate'}
        </h2>

        {/* Loading State */}
        {loading ? (
          <div className="space-y-4">
            <div className="animate-pulse space-y-3">
              <div className="h-8 bg-slate-700 rounded w-1/3"></div>
              <div className="h-4 bg-slate-700 rounded w-2/3"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            </div>
          </div>
        ) : signatureStatus && signatureStatus.hasCertificate ? (
          <div className="space-y-6">
            {/* Certificate Status */}
            <div className="bg-slate-900/50 border border-emerald-900/30 rounded-lg p-4">
              <h3 className="font-semibold text-emerald-300 mb-3">
                {t('certificateStatus') || 'Certificate Status'}
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <span className="font-medium text-slate-200">{t('status') || 'Status'}:</span>{' '}
                  <span className={`inline-block ml-2 px-2 py-1 rounded text-xs font-medium ${
                    isExpired
                      ? 'bg-red-900/30 text-red-300 border border-red-700'
                      : isExpiringSoon
                        ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700'
                        : 'bg-green-900/30 text-green-300 border border-green-700'
                  }`}>
                    {isExpired
                      ? t('expired') || 'Expired'
                      : isExpiringSoon
                        ? t('expiringSoon') || 'Expiring Soon'
                        : t('active') || 'Active'}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-slate-200">{t('subject') || 'Subject'}:</span>{' '}
                  <span className="text-gray-400">{signatureStatus?.certificateSubject}</span>
                </p>
                <p>
                  <span className="font-medium text-slate-200">{t('issuer') || 'Issuer'}:</span>{' '}
                  <span className="text-gray-400">{signatureStatus?.certificateIssuer}</span>
                </p>
                <p>
                  <span className="font-medium text-slate-200">{t('validFrom') || 'Valid From'}:</span>{' '}
                  <span className="text-gray-400">{signatureStatus?.certificateValidFrom ? new Date(signatureStatus.certificateValidFrom).toLocaleDateString() : '-'}</span>
                </p>
                <p>
                  <span className="font-medium text-slate-200">{t('validUntil') || 'Valid Until'}:</span>{' '}
                  <span className="text-gray-400">{signatureStatus?.certificateValidUntil ? new Date(signatureStatus.certificateValidUntil).toLocaleDateString() : '-'}</span>
                </p>
                {!isExpired && (
                  <p>
                    <span className="font-medium text-slate-200">{t('daysRemaining') || 'Days Remaining'}:</span>{' '}
                    <span className="text-gray-400">{daysUntilExpiry} {t('days') || 'days'}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Revoke Button */}
            <div>
              <button
                onClick={handleRevokeCertificate}
                className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-medium"
              >
                {t('revokeCertificate') || 'Revoke Certificate'}
              </button>
              <p className="text-xs text-gray-400 mt-2">
                {t('revokeInfo') || 'Revoking will remove your certificate. You can upload a new one anytime.'}
              </p>
            </div>

            {/* Update Certificate */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="font-semibold text-emerald-300 mb-4">
                {t('uploadNewCertificate') || 'Upload New Certificate'}
              </h3>
              <SignatureUpload
                onSuccess={handleSignatureUploadSuccess}
                onError={(err) => setError(err)}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400">
              {t('noCertificateMsg') || 'You haven\'t uploaded a digital signature certificate yet. Upload one to start signing invoices.'}
            </p>
            <SignatureUpload
              onSuccess={handleSignatureUploadSuccess}
              onError={(err) => setError(err)}
            />
          </div>
        )}
      </div>

      {/* Error Alert */}
      {(error || signatureError) && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
          <p className="text-red-300 text-sm">{error || String(signatureError)}</p>
        </div>
      )}
    </div>
  );
}
