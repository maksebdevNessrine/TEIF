import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InvoiceForm from '@/components/InvoiceForm';
import { useLanguage } from '@/contexts/LanguageContext';
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
  const navigate = useNavigate();
  const { mutate: createInvoice, isPending } = useCreateInvoice();

  const handleSave = () => {
    setError(null);
    
    // Perform full form validation
    const validation = validateInvoiceData(data);
    
    if (!validation.isValid) {
      // Show validation errors and prevent submission
      setValidationErrors(validation.errors);
      setValidationWarnings(validation.warnings);
      
      // Scroll to top to show validation summary
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      
      return;
    }
    
    // Clear previous validation messages if form is valid
    setValidationErrors([]);
    setValidationWarnings([]);
    
    try {
      createInvoice(data, {
        onSuccess: (response) => {
          // Navigate to detail page of newly created invoice
          navigate(`/invoices/${response.data.id}`);
        },
        onError: (err: any) => {
          const message = err.response?.data?.message || 'Failed to create invoice';
          setError(message);
        },
      });
    } catch (err) {
      setError('An unexpected error occurred');
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
            ← Back to Invoices
          </Link>
          <h1 className="text-2xl font-bold text-white">Create New Invoice</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-500 transition-colors font-medium"
        >
          {isPending ? 'Saving...' : 'Save Invoice'}
        </button>
      </div>

      {/* API Error Message */}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => setError(null)}
        />
      )}

      {/* Invoice Form */}
      <InvoiceForm 
        data={data} 
        onChange={setData} 
        lang={language}
        onSave={handleSave}
        validationErrors={validationErrors}
      />
    </div>
  );
}
