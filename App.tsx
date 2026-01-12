
import React, { useState, useMemo, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';
import { InvoiceData, Language } from './types';
import { generateTeifXml } from './services/xmlGenerator';
import { useTranslation } from './services/i18n';

const initialData: InvoiceData = {
  documentType: 'I-11',
  documentNumber: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  operationNature: 'GOODS',
  currency: 'TND',
  supplier: {
    idType: 'I-01',
    idValue: '',
    name: '',
    addressDescription: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'TN',
    rc: '',
    capital: '',
    phone: '',
    email: '',
  },
  buyer: {
    idType: 'I-01',
    idValue: '',
    name: '',
    addressDescription: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'TN',
    phone: '',
    email: '',
  },
  lines: [],
  globalDiscount: 0,
  stampDuty: 1.000, 
  ttnReference: '',
  paymentMeans: 'I-131',
  bankName: '',
  bankCode: '',
  bankRib: '',
  amountDescriptionOverride: ''
};

const App: React.FC = () => {
  const [data, setData] = useState<InvoiceData>(initialData);
  const [lang, setLang] = useState<Language>('en');
  
  const t = useTranslation(lang);
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const xml = useMemo(() => generateTeifXml(data, false), [data]);

  const handleDownload = () => {
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teif_${data.documentNumber || 'invoice'}_${new Date().getTime()}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen bg-slate-950 ${isRtl ? 'font-arabic' : 'font-inter'}`}>
      <header className="bg-slate-900 border-b border-slate-800 px-8 py-5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-100">TEIF Invoice Generator</h1>
            <p className="text-xs text-slate-400">{t('appSubtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex bg-slate-800 p-1 rounded border border-slate-700">
            <button onClick={() => setLang('ar')} className={`px-4 py-2 rounded text-xs font-medium transition-all ${lang === 'ar' ? 'bg-slate-700 text-slate-100' : 'text-slate-400 hover:text-slate-200'}`}>AR</button>
            <button onClick={() => setLang('fr')} className={`px-4 py-2 rounded text-xs font-medium transition-all ${lang === 'fr' ? 'bg-slate-700 text-slate-100' : 'text-slate-400 hover:text-slate-200'}`}>FR</button>
            <button onClick={() => setLang('en')} className={`px-4 py-2 rounded text-xs font-medium transition-all ${lang === 'en' ? 'bg-slate-700 text-slate-100' : 'text-slate-400 hover:text-slate-200'}`}>EN</button>
          </div>
          <button 
            onClick={handleDownload}
            disabled={!data.lines.length}
            className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-6 py-2 rounded text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t('download')}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 lg:p-10">
        <InvoiceForm data={data} onChange={setData} lang={lang} onDownload={handleDownload} />
      </main>
    </div>
  );
};

export default App;
