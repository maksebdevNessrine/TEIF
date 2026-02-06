/**
 * Signature Upload Component
 * Allows users to upload their PKCS#12 certificate from Tunisia TradeNet
 */

'use client';

import { useState } from 'react';
import type { SignatureUploadResponse, UserSignatureProfile } from '@teif/shared/types';

interface SignatureUploadProps {
  onSuccess?: (profile: UserSignatureProfile) => void;
  onError?: (error: string) => void;
}

export function SignatureUpload({ onSuccess, onError }: SignatureUploadProps) {
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState('');
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.name.endsWith('.p12') && !file.name.endsWith('.pfx')) {
        setError('Invalid file type. Please upload a .p12 or .pfx certificate file.');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File too large. Maximum size is 10MB.');
        return;
      }

      setCertificateFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!pin) {
      setError('PIN is required');
      return;
    }

    if (!certificateFile) {
      setError('Certificate file is required');
      return;
    }

    if (pin.length < 4) {
      setError('PIN must be at least 4 characters');
      return;
    }

    setLoading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('certificate', certificateFile);
      formData.append('pin', pin);

      // Upload certificate
      const response = await fetch('/api/signature/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data: SignatureUploadResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload certificate');
      }

      setSuccess('Certificate uploaded successfully!');
      setCertificateFile(null);
      setPin('');

      if (data.data) {
        onSuccess?.({
          userId: '',
          hasCertificate: true,
          status: data.data.status,
          certificateSubject: data.data.certificateSubject,
          certificateIssuer: data.data.certificateIssuer,
          certificateValidFrom: data.data.validFrom,
          certificateValidUntil: data.data.validUntil,
          daysRemaining: Math.ceil(
            (new Date(data.data.validUntil).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          ),
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Digital Certificate</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* File Input */}
        <div>
          <label htmlFor="certificate" className="block text-sm font-medium text-gray-700 mb-2">
            Certificate File (.p12 or .pfx)
          </label>
          <input
            type="file"
            id="certificate"
            accept=".p12,.pfx"
            onChange={handleFileChange}
            disabled={loading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {certificateFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {certificateFile.name}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Download your certificate from Tunisia TradeNet and upload it here.
          </p>
        </div>

        {/* PIN Input */}
        <div>
          <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
            Certificate PIN
          </label>
          <input
            type="password"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            disabled={loading}
            placeholder="Enter your certificate PIN"
            className="w-full px-3 py-2 border border-gray-300 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-500">
            The PIN protects your private key. It will be hashed and secured.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !certificateFile || !pin}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400
            text-white font-semibold py-2 px-4 rounded-md
            transition-colors duration-200
            disabled:cursor-not-allowed"
        >
          {loading ? 'Uploading...' : 'Upload Certificate'}
        </button>
      </form>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-semibold text-blue-900 mb-2">About Digital Certificates</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Your certificate is encrypted and stored securely</li>
          <li>Your PIN is hashed and never stored in plaintext</li>
          <li>Signing is performed on the server using your private key</li>
          <li>All signing operations are audited for compliance</li>
        </ul>
      </div>
    </div>
  );
}
