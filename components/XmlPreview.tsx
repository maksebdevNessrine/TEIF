
import React, { useState, useMemo } from 'react';
import { Language, InvoiceData } from '../types';
import { useTranslation } from '../services/i18n';
import { checkInvoiceCompliance, ComplianceReport } from '../services/complianceChecker';

interface Props {
  xml: string;
  minifiedXml: string;
  lang: Language;
  invoiceData?: InvoiceData;
}

const XmlPreview: React.FC<Props> = ({ xml, minifiedXml, lang, invoiceData }) => {
  const t = useTranslation(lang);
  const [copied, setCopied] = useState(false);
  const [showMinified, setShowMinified] = useState(false);
  const [showValidationDetails, setShowValidationDetails] = useState(false);

  const activeXml = showMinified ? minifiedXml : xml;

  // Run compliance check if invoice data is available
  const complianceReport: ComplianceReport | null = useMemo(() => {
    return invoiceData ? checkInvoiceCompliance(invoiceData) : null;
  }, [invoiceData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teif_invoice_${new Date().getTime()}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getComplianceColor = () => {
    if (!complianceReport) return 'bg-slate-700';
    if (complianceReport.isCompliant) return 'bg-emerald-900';
    if (complianceReport.errors.length > 0) return 'bg-red-900';
    if (complianceReport.warnings.length > 0) return 'bg-amber-900';
    return 'bg-slate-700';
  };

  const getComplianceTextColor = () => {
    if (!complianceReport) return 'text-slate-400';
    if (complianceReport.isCompliant) return 'text-emerald-400';
    if (complianceReport.errors.length > 0) return 'text-red-400';
    if (complianceReport.warnings.length > 0) return 'text-amber-400';
    return 'text-slate-400';
  };

  return (
    <div className="h-full flex flex-col">
      <div className={`${getComplianceColor()} ${getComplianceTextColor()} text-slate-400 border-b border-slate-700 space-y-3 p-4`}>
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="text-sm font-bold uppercase tracking-wider">TEIF 1.8.8 Output</span>
            </div>
            <label className="flex items-center gap-2 text-xs cursor-pointer bg-slate-700 px-3 py-1 rounded-full border border-slate-600 hover:bg-slate-600 transition-colors">
              <input 
                type="checkbox" 
                checked={showMinified} 
                onChange={(e) => setShowMinified(e.target.checked)}
                className="accent-blue-500"
              />
              <span>{t('minify')}</span>
            </label>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleCopy}
              className="text-xs hover:text-white transition-colors bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg flex items-center gap-2"
            >
              {copied ? t('copied') : t('copy')}
            </button>
            <button 
              onClick={handleDownload}
              className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
            >
              {t('download')}
            </button>
          </div>
        </div>

        {/* Compliance Status */}
        {complianceReport && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-600/50">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${complianceReport.isCompliant ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                <span className="text-xs font-bold uppercase">
                  {complianceReport.isCompliant ? t('compliant') : t('nonCompliant')}
                </span>
              </div>
              <div className="text-xs">
                <span className="font-bold">{t('complianceScore')}: {complianceReport.score}%</span>
              </div>
              {complianceReport.totalIssues > 0 && (
                <div className="text-xs">
                  <span className="font-bold">Issues: </span>
                  <span className="text-red-400">{complianceReport.errors.length} {t('errors')}</span>
                  {complianceReport.warnings.length > 0 && (
                    <span> · <span className="text-amber-400">{complianceReport.warnings.length} {t('warnings')}</span></span>
                  )}
                </div>
              )}
            </div>

            {complianceReport.totalIssues > 0 && (
              <button
                onClick={() => setShowValidationDetails(!showValidationDetails)}
                className="text-xs px-3 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                {showValidationDetails ? 'Hide' : 'Show'} Details
              </button>
            )}
          </div>
        )}

        {/* Validation Details */}
        {complianceReport && showValidationDetails && complianceReport.totalIssues > 0 && (
          <div className="pt-2 border-t border-slate-600/50 space-y-2 max-h-48 overflow-y-auto">
            {complianceReport.errors.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs font-bold text-red-400">❌ {t('errors').toUpperCase()} ({complianceReport.errors.length})</div>
                {complianceReport.errors.map((err, idx) => (
                  <div key={idx} className="text-xs pl-4 text-red-300">
                    • [{err.code}] {err.message}
                  </div>
                ))}
              </div>
            )}
            {complianceReport.warnings.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs font-bold text-amber-400">⚠️ {t('warnings').toUpperCase()} ({complianceReport.warnings.length})</div>
                {complianceReport.warnings.map((warn, idx) => (
                  <div key={idx} className="text-xs pl-4 text-amber-300">
                    • [{warn.code}] {warn.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* XML Preview */}
      <div className="flex-1 overflow-auto bg-slate-900 p-6">
        {showMinified ? (
          <code className="text-sm font-mono text-emerald-400 break-all">{activeXml}</code>
        ) : (
          <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap break-all leading-relaxed ltr">
            {activeXml.split('\n').map((line, i) => (
              <div key={i} className="hover:bg-slate-800/50 rounded transition-colors px-1">
                <span className="text-slate-600 select-none mr-4 inline-block w-4 text-right">{i + 1}</span>
                {line}
              </div>
            ))}
          </pre>
        )}
      </div>
    </div>
  );
};

export default XmlPreview;
