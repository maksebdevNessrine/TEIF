
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
    <div className={`min-h-screen bg-slate-50 ${isRtl ? 'font-arabic' : 'font-inter'}`}>
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 text-white p-2 rounded-lg shadow-sm">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 uppercase tracking-tight">TEIF Pro</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t('appSubtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setLang('ar')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${lang === 'ar' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>AR</button>
            <button onClick={() => setLang('fr')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${lang === 'fr' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>FR</button>
            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${lang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>EN</button>
          </div>
          <button 
            onClick={handleDownload}
            disabled={!data.lines.length}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
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
