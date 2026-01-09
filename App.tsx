
import React, { useState, useMemo } from 'react';
import InvoiceForm from './components/InvoiceForm';
import XmlPreview from './components/XmlPreview';
import AIAssistant from './components/AIAssistant';
import { InvoiceData } from './types';
import { generateTeifXml } from './services/xmlGenerator';

const initialData: InvoiceData = {
  documentType: 'I-11',
  documentNumber: '50',
  invoiceDate: '2015-03-04',
  dueDate: '2015-04-03',
  supplier: {
    idType: 'I-01',
    idValue: '736202XAM000',
    name: 'TUNISIE TRADENET (TTN)',
    addressDescription: 'Lotissement El Khalij',
    street: 'Rue du Lac Malaren',
    city: 'Tunis',
    postalCode: '1053',
    country: 'TN',
    rc: 'B112602000',
    capital: '2.000.000 DT',
    phone: '71 86 17 12',
  },
  buyer: {
    idType: 'I-01',
    idValue: '0513287HPM000',
    name: 'OFFICE NATIONAL DES POSTES (ONP)',
    addressDescription: 'Centre Informatique',
    street: 'Complexe Hached',
    city: 'Tunis',
    postalCode: '1049',
    country: 'TN',
    phone: '71 00 00 00',
  },
  lines: [
    {
      id: '1',
      itemCode: 'SMTP. P',
      description: 'C. SMTP principal',
      quantity: 1.0,
      unit: 'PCE',
      unitPrice: 50.000,
      taxRate: 0.12,
      fodec: false
    },
    {
      id: '2',
      itemCode: 'TCEAP',
      description: 'Dossier TCEAP',
      quantity: 2.0,
      unit: 'PCE',
      unitPrice: 4.500,
      taxRate: 0.12,
      fodec: false
    },
    {
      id: '3',
      itemCode: 'FDE',
      description: 'Dossier FDE',
      quantity: 17.0,
      unit: 'PCE',
      unitPrice: 4.500,
      taxRate: 0.12,
      fodec: false
    }
  ],
  stampDuty: 0.500,
  ttnReference: '88812500089016077795819135',
  paymentMeans: 'I-131',
  bankName: 'La Poste',
  bankRib: '0760 0000000000000000'
};

const App: React.FC = () => {
  const [data, setData] = useState<InvoiceData>(initialData);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  const xml = useMemo(() => generateTeifXml(data, false), [data]);
  const minifiedXml = useMemo(() => generateTeifXml(data, true), [data]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="hidden lg:flex flex-col w-80 border-r bg-white">
        <AIAssistant />
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white p-2 rounded-lg shadow-sm">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">TEIF 1.8.8 Compliance</h1>
              <p className="text-xs text-slate-500 font-medium">Standardized Electronic Message Generator</p>
            </div>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setActiveTab('form')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'form' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Editor</button>
            <button onClick={() => setActiveTab('preview')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>XML Output</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
          <div className="max-w-7xl mx-auto h-full">
            {activeTab === 'form' ? (
              <InvoiceForm data={data} onChange={setData} />
            ) : (
              <div className="h-[calc(100vh-200px)] rounded-xl overflow-hidden border shadow-xl">
                <XmlPreview xml={xml} minifiedXml={minifiedXml} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
