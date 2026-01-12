
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
  const [lang, setLang] = useState<Language>('fr');
  
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
    <div className={`min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 ${isRtl ? 'font-arabic' : 'font-inter'}`}>
      <header className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800/50 border-b border-slate-800/50 backdrop-blur px-8 py-6 flex items-center justify-between sticky top-0 z-50 shadow-lg shadow-slate-900/20">
        <div className="flex items-center gap-4 group">
          <div className="w-11 h-11 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:shadow-emerald-600/50 transition-all duration-300">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">TEIF Invoice Generator</h1>
            <p className="text-xs text-slate-400 font-medium">{t('appSubtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex bg-slate-800/50 backdrop-blur p-1 rounded-lg border border-slate-700/50">
            <button onClick={() => setLang('ar')} className={`px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 ${lang === 'ar' ? 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-100'}`}>AR</button>
            <button onClick={() => setLang('fr')} className={`px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 ${lang === 'fr' ? 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-100'}`}>FR</button>
            <button onClick={() => setLang('en')} className={`px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 ${lang === 'en' ? 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-slate-100'}`}>EN</button>
          </div>
          <button 
            onClick={handleDownload}
            disabled={!data.lines.length}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-7 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
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
