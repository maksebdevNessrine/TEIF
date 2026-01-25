import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInvoice, useUpdateInvoice, useDownloadPdf, useDownloadXml } from '@/hooks/useInvoices';
import InvoiceForm from '@/components/InvoiceForm';
import { InvoiceDetailSkeleton } from '@/components/SkeletonLoaders';
import { ErrorMessage, NotFound } from '@/components/ErrorDisplay';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation, getDocumentTypeLabel, getPaymentMeansLabel } from '@/services/i18n';
import { getTextAlignClass } from '@/utils/rtl';
import type { InvoiceData, DocTypeCode, PaymentMeansCode } from '@teif/shared/types';

export function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<InvoiceData | null>(null);

  const { data: invoice, isLoading, error, refetch } = useInvoice(id);
  const { mutate: updateInvoice, isPending: isUpdating } = useUpdateInvoice();
  const { mutate: downloadPdf, isPending: isDownloading } = useDownloadPdf();
  const { mutate: downloadXml, isPending: isDownloadingXml } = useDownloadXml();

  const handleEditClick = () => {
    if (invoice) {
      setEditData(invoice);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editData && id) {
      updateInvoice(
        { id, data: editData },
        {
          onSuccess: () => {
            setIsEditing(false);
            setEditData(null);
            refetch();
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleDownloadPdf = () => {
    if (id) {
      downloadPdf({ id, language: language as 'ar' | 'fr' | 'en' });
    }
  };

  const handleDownloadXml = () => {
    if (id) {
      downloadXml({ id });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/invoices"
            className="text-emerald-500 hover:text-emerald-400 transition-colors text-sm font-medium"
          >
            ← {t('back')}
          </Link>
          <h1 className="text-2xl font-bold text-white">{t('loading')}</h1>
        </div>
        <InvoiceDetailSkeleton />
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/invoices"
            className="text-emerald-500 hover:text-emerald-400 transition-colors text-sm font-medium"
          >
            ← {t('back')}
          </Link>
          <h1 className="text-2xl font-bold text-white">{t('invoice')}</h1>
        </div>
        {error ? (
          <ErrorMessage 
            message={t('failedToLoad')}
            onRetry={() => refetch()}
          />
        ) : (
          <NotFound 
            title={t('notFound')}
            message={t('invoiceNotFound')}
          />
        )}
      </div>
    );
  }

  if (isEditing && editData) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/invoices"
              className="text-emerald-500 hover:text-emerald-400 transition-colors text-sm font-medium"
            >
              ← {t('back')}
            </Link>
            <h1 className="text-2xl font-bold text-white">{t('edit')} {t('invoice')}</h1>
          </div>
          <button
            onClick={handleCancel}
            disabled={isUpdating}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 transition-colors font-medium"
          >
            {t('cancel')}
          </button>
        </div>
        <InvoiceForm
          data={editData}
          onChange={setEditData}
          lang={language}
          onSave={handleSave}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/invoices"
            className="text-emerald-500 hover:text-emerald-400 transition-colors text-sm font-medium"
          >
            ← {t('back')}
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{t('invoice')} {invoice.documentNumber}</h1>
            <p className="text-sm text-slate-400 mt-1">{invoice.documentType}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 transition-colors font-medium"
          >
            {isDownloading ? t('downloading') : t('downloadPdf')}
          </button>
          <button
            onClick={handleDownloadXml}
            disabled={isDownloadingXml}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 transition-colors font-medium"
          >
            {isDownloadingXml ? t('downloading') : t('downloadXml')}
          </button>
          <button
            onClick={handleEditClick}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            {t('edit')}
          </button>
        </div>
      </div>

      {/* Document Info - Full Width */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{t('documentDetails')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          <div>
            <span className="text-slate-400">{t('number')}:</span>
            <span className="ml-1 font-mono text-emerald-400">{invoice.documentNumber}</span>
          </div>
          <div>
            <span className="text-slate-400">{t('type')}:</span>
            <span className="ml-1">{getDocumentTypeLabel(invoice.documentType, language)}</span>
          </div>
          <div>
            <span className="text-slate-400">{t('date')}:</span>
            <span className="ml-1">{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="text-slate-400">{t('currency')}:</span>
            <span className="ml-1 font-mono">{invoice.currency}</span>
          </div>
        </div>
      </div>

      {/* Supplier & Buyer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Supplier Info */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-3">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{t('supplier')}</h3>
          <div className="space-y-2 text-sm">
            <div><span className="text-slate-400">{t('name')}:</span><span className="ml-1">{invoice.supplier?.name || invoice.supplierId || '-'}</span></div>
            <div><span className="text-slate-400">{t('id')}:</span> <span className="ml-1 font-mono">{invoice.supplier?.idValue || '-'}</span></div>
            <div><span className="text-slate-400">{t('city')}:</span><span className="ml-1">{invoice.supplier?.city || '-'}</span></div>
          </div>
        </div>

        {/* Buyer Info */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-3">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{t('buyer')}</h3>
          <div className="space-y-2 text-sm">
            <div><span className="text-slate-400">{t('name')}:</span><span className="ml-1">{invoice.buyer?.name || invoice.buyerId || '-'}</span></div>
            <div><span className="text-slate-400">{t('id')}:</span> <span className="ml-1 font-mono">{invoice.buyer?.idValue || '-'}</span></div>
            <div><span className="text-slate-400">{t('city')}:</span><span className="ml-1">{invoice.buyer?.city || '-'}</span></div>
          </div>
        </div>
      </div>

      {/* Line Items */}
      {invoice.lines && invoice.lines.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{t('lineItems')}</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-700 text-xs text-slate-400">
                <th className={`px-4 py-3 ${getTextAlignClass(language, 'text-right', 'text-left')}`}>{t('description')}</th>
                <th className="px-4 py-3 text-center">{t('qty')}</th>
                <th className={`px-4 py-3 ${getTextAlignClass(language, 'text-left', 'text-right')}`}>{t('unitPrice')}</th>
                <th className={`px-4 py-3 ${getTextAlignClass(language, 'text-left', 'text-right')}`}>{t('totalHt')}</th>
                <th className="px-4 py-3 text-center">{t('tax')}</th>
              </tr>
            </thead>
            <tbody>
              {invoice.lines.map((line, idx) => {
                const lineTotal = line.quantity * line.unitPrice;
                return (
                  <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/20">
                    <td className={`px-4 py-3 ${getTextAlignClass(language, 'text-right', 'text-left')}`}>{line.description}</td>
                    <td className="px-4 py-3 text-center">{line.quantity}</td>
                    <td className={`px-4 py-3 ${getTextAlignClass(language, 'text-left', 'text-right')}`}>{line.unitPrice.toFixed(3)}</td>
                    <td className={`px-4 py-3 font-medium ${getTextAlignClass(language, 'text-left', 'text-right')}`}>{lineTotal.toFixed(3)}</td>
                    <td className="px-4 py-3 text-center">{(line.taxRate * 100).toFixed(0)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Info */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{t('payment')}</h3>
        <div>
          <div className="mb-3"><span className="text-slate-400">{t('method')}:</span><span className="ml-1">{getPaymentMeansLabel(invoice.paymentMeans, language)}</span></div>
          <div className="border-t border-slate-600 pt-3 space-y-2 font-semibold">
            <div className="flex justify-between">
              <span className="text-slate-400">{t('totalHt')}:</span>
              <span className="text-emerald-400">{((invoice as any).totalHT || 0).toFixed(3)} {invoice.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{t('totalTVA')}:</span>
              <span className="text-orange-400">{((invoice as any).totalTVA || 0).toFixed(3)} {invoice.currency}</span>
            </div>
            <div className="flex justify-between text-lg border-t border-slate-600 pt-2">
              <span className="text-slate-300">{t('totalTTC')}:</span>
              <span className="text-emerald-300">{((invoice as any).totalTTC || 0).toFixed(3)} {invoice.currency}</span>
            </div>
          </div>
          {invoice.dueDate && <div className="border-t border-slate-600 pt-2 mt-2"><span className="text-slate-400">{t('dueDate')}:</span><span className="ml-1">{new Date(invoice.dueDate).toLocaleDateString()}</span></div>}
        </div>
      </div>
    </div>
  );
}
