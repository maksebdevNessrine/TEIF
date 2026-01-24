import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InvoiceForm from '@/components/InvoiceForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/services/i18n';
import { useCreateInvoice } from '@/hooks/useInvoices';
import { ErrorMessage } from '@/components/ErrorDisplay';
import { validateInvoiceData, type FieldError } from '@/services/invoiceFormValidator';
import type { InvoiceData, DocTypeCode, PaymentMeansCode, OperationNature, IdType } from '@teif/shared/types';

const initialInvoiceData: InvoiceData = {
  documentType: 'I-11' as DocTypeCode,
  documentNumber: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  operationNature: 'OP-SUPPLY' as OperationNature,
  currency: 'TND',
  paymentMeans: 'I-114' as PaymentMeansCode,
  ttnReference: '',
  globalDiscount: 0,
  stampDuty: 0,
  supplier: {
    idType: 'I-01' as IdType,
    idValue: '',
    name: '',
    addressDescription: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  },
  buyer: {
    idType: 'I-01' as IdType,
    idValue: '',
    name: '',
    addressDescription: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  },
  lines: [
    {
      id: '1',
      itemCode: '',
      description: '',
      quantity: 1,
      unit: 'UNIT',
      unitPrice: 0,
      discountRate: 0,
      taxRate: 0.19,
      fodec: false,
    },
  ],
};

export function InvoiceNew() {
  const [data, setData] = useState<InvoiceData>(initialInvoiceData);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<FieldError[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<FieldError[]>([]);
  const { language } = useLanguage();
  const t = useTranslation(language);
  const navigate = useNavigate();
  const { mutate: createInvoice, isPending } = useCreateInvoice();
  const errorRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    setError(null);
    
    // Perform full form validation
    const validation = validateInvoiceData(data);
    
    if (!validation.isValid) {
      // Show validation errors and prevent submission
      setValidationErrors(validation.errors);
      setValidationWarnings(validation.warnings);
      
      // Scroll to error summary with immediate focus
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      return;
    }
    
    // Clear previous validation messages if form is valid
    setValidationErrors([]);
    setValidationWarnings([]);
    
    try {
      createInvoice(data, {
        onSuccess: (response: any) => {
          // Navigate to detail page of newly created invoice
          navigate(`/invoices/${response.data.id}`);
        },
        onError: (err: any) => {
          const message = err.response?.data?.message || t('failedToCreateInvoice');
          setError(message);
        },
      });
    } catch (err) {
      setError(t('anUnexpectedErrorOccurred'));
    }
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/invoices"
            className="text-emerald-500 hover:text-emerald-400 transition-colors text-sm font-medium"
          >
            ← {t('back')}
          </Link>
          <h1 className="text-2xl font-bold text-white">{t('createNewInvoice')}</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-500 transition-colors font-medium"
        >
          {isPending ? t('saving') : t('saveInvoice')}
        </button>
      </div>

      {/* API Error Message */}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => setError(null)}
        />
      )}

      {/* Validation Error Summary */}
      {validationErrors.length > 0 && (
        <div ref={errorRef} className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" tabIndex={-1}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-200 mb-2">
                ⚠️ {validationErrors.length === 1 ? t('pleaseFixValidationOne') : t('pleaseFixValidation').replace('{count}', String(validationErrors.length))}
              </h3>
              <ul className="text-sm text-red-300 space-y-1 list-disc list-inside">
                {validationErrors.slice(0, 10).map((err, idx) => (
                  <li key={idx}>
                    <span className="font-mono text-xs text-red-400">{err.field}</span>: {err.message}
                  </li>
                ))}
                {validationErrors.length > 10 && (
                  <li className="text-red-400 italic">... and {validationErrors.length - 10} more</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Form */}
      <InvoiceForm 
        data={data} 
        onChange={setData} 
        lang={language}
        onSave={handleSave}
        isSaving={isPending}
        validationErrors={validationErrors}
      />
    </div>
  );
}
