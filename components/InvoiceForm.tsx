
import React, { useMemo, useEffect, useState } from 'react';
import { InvoiceData, InvoiceLine, IdType, DocTypeCode, DOCUMENT_TYPES, PAYMENT_MEANS, Language, UNIT_CODES } from '../types';
import { useTranslation } from '../services/i18n';
import { generateQrString, validateRib, numberToLettersFr } from '../services/xmlGenerator';
import * as Validators from '../services/validators';
import { useConditionalFields } from '../services/useConditionalFields';

interface PartnerFormProps {
  title: string;
  path: string;
  partner: any;
  step: string;
  updateField: (path: string, value: any) => void;
  lang: Language;
}

const PartnerForm: React.FC<PartnerFormProps> = ({ title, path, partner, step, updateField, lang }) => {
  const t = useTranslation(lang);
  const isBusiness = partner.idType === 'I-01' || partner.idType === 'I-04';
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateField = (field: string, value: any) => {
    let error = '';
    
    switch (field) {
      case 'name':
        const nameVal = Validators.validateCompanyName(value);
        error = nameVal.error || '';
        break;
      case 'idValue':
        const idVal = Validators.validateIdentifier(value, partner.idType);
        error = idVal.error || '';
        break;
      case 'street':
        const streetVal = Validators.validateStreetAddress(value);
        error = streetVal.error || '';
        break;
      case 'city':
        const cityVal = Validators.validateCity(value);
        error = cityVal.error || '';
        break;
      case 'postalCode':
        const postalVal = Validators.validatePostalCode(value);
        error = postalVal.error || '';
        break;
      case 'email':
        const emailVal = Validators.validateEmail(value);
        error = emailVal.error || '';
        break;
      case 'phone':
        const phoneVal = Validators.validatePhone(value);
        error = phoneVal.error || '';
        break;
      case 'bankRib':
        const ribVal = Validators.validateRib(value);
        error = ribVal.error || '';
        break;
    }
    
    setErrors({...errors, [field]: error});
  };

  return (
    <section className="bg-slate-800 p-6 border border-slate-700 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-3">
          <span className="w-8 h-8 rounded bg-slate-700 border border-slate-600 text-slate-200 flex items-center justify-center text-xs font-mono">{step}</span>
          {title}
        </h2>
        <span className={`text-xs font-medium px-3 py-1 rounded border ${isBusiness ? 'bg-slate-700 text-slate-200 border-slate-600' : 'bg-slate-700 text-slate-200 border-slate-600'}`}>
          {isBusiness ? t('business') : t('person')}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-slate-700 pb-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-2">{t('fullName')}</label>
          <input 
            type="text" 
            placeholder="Ex: Company Name..."
            value={partner.name} 
            onChange={(e) => {
              updateField(`${path}.name`, e.target.value);
              validateField('name', e.target.value);
            }} 
            className={`w-full p-3 border rounded font-medium text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors bg-slate-900 ${errors.name ? 'border-red-600 focus:border-red-500' : 'border-slate-700 focus:border-slate-600'}`} 
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">{t('idType')}</label>
          <select 
            value={partner.idType} 
            onChange={(e) => updateField(`${path}.idType`, e.target.value as IdType)} 
            className="w-full p-3 border border-slate-700 rounded bg-slate-900 text-sm font-medium text-slate-100 appearance-none cursor-pointer focus:outline-none focus:border-slate-600 transition-colors"
          >
            <option value="I-01">I-01: Matricule Fiscal</option>
            <option value="I-02">I-02: C.I.N</option>
            <option value="I-03">I-03: Passeport</option>
            <option value="I-04">I-04: MF Non-Tunisien</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">{t('idValue')}</label>
          <input 
            type="text" 
            placeholder="0000000XAM000"
            value={partner.idValue} 
            onChange={(e) => {
              updateField(`${path}.idValue`, e.target.value.toUpperCase());
              validateField('idValue', e.target.value.toUpperCase());
            }} 
            className={`w-full p-3 border rounded font-mono text-sm font-medium tracking-wider focus:outline-none transition-colors bg-slate-900 text-slate-100 placeholder-slate-600 ${errors.idValue ? 'border-red-600 focus:border-red-500' : 'border-slate-700 focus:border-slate-600'}`} 
          />
          {errors.idValue && <p className="text-xs text-red-400 mt-1">{errors.idValue}</p>}
        </div>
        {isBusiness && (
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">{t('rc')}</label>
              <input type="text" placeholder="B123452024" value={partner.rc || ''} onChange={(e) => updateField(`${path}.rc`, e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-900 font-mono text-xs font-medium focus:outline-none focus:border-slate-600 transition-colors text-slate-100" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">{t('capital')}</label>
              <input type="text" placeholder="10.000,000" value={partner.capital || ''} onChange={(e) => updateField(`${path}.capital`, e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-900 text-xs font-medium focus:outline-none focus:border-slate-600 transition-colors text-slate-100" />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-2">{t('address')}</label>
          <input type="text" placeholder="Complete address..." value={partner.addressDescription} onChange={(e) => updateField(`${path}.addressDescription`, e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-900 text-sm font-medium focus:outline-none focus:border-slate-600 transition-colors text-slate-100 placeholder-slate-600" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">{t('city')}</label>
          <input 
            type="text" 
            value={partner.city} 
            onChange={(e) => {
              updateField(`${path}.city`, e.target.value);
              validateField('city', e.target.value);
            }} 
            className={`w-full p-3 border rounded text-sm font-medium focus:outline-none transition-colors bg-slate-900 text-slate-100 placeholder-slate-600 ${errors.city ? 'border-red-600 focus:border-red-500' : 'border-slate-700 focus:border-slate-600'}`} 
          />
          {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Country</label>
            <input type="text" maxLength={2} value={partner.country} onChange={(e) => updateField(`${path}.country`, e.target.value.toUpperCase())} className="w-full p-3 border border-slate-700 rounded bg-slate-900 font-mono text-center text-sm font-medium focus:outline-none focus:border-slate-600 transition-colors text-slate-100" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">{t('postalCode')}</label>
            <input 
              type="text" 
              value={partner.postalCode || ''} 
              onChange={(e) => {
                updateField(`${path}.postalCode`, e.target.value);
                validateField('postalCode', e.target.value);
              }} 
              className={`w-full p-3 border rounded font-mono text-center text-sm font-medium focus:outline-none transition-colors bg-slate-900 text-slate-100 placeholder-slate-600 ${errors.postalCode ? 'border-red-600 focus:border-red-500' : 'border-slate-700 focus:border-slate-600'}`} 
            />
            {errors.postalCode && <p className="text-xs text-red-400 mt-1">{errors.postalCode}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

interface Props {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
  lang: Language;
}

const InvoiceForm: React.FC<Props> = ({ data, onChange, lang }) => {
  const t = useTranslation(lang);
  
  const updateField = (path: string, value: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    const parts = path.split('.');
    let current: any = newData;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    onChange(newData);
  };

  const totals = useMemo(() => {
    const lineTotals = data.lines.reduce((acc, l) => {
      const lineGross = l.quantity * l.unitPrice;
      const lineDiscount = lineGross * (l.discountRate / 100);
      const lineNetHt = lineGross - lineDiscount;
      const lineFodec = l.fodec ? lineNetHt * 0.01 : 0;
      const tvaBase = lineNetHt + lineFodec;
      const lineTva = tvaBase * l.taxRate;
      
      acc.ht += lineNetHt;
      acc.discount += lineDiscount;
      acc.fodec += lineFodec;
      acc.tva += lineTva;
      return acc;
    }, { ht: 0, discount: 0, fodec: 0, tva: 0 });

    const netTotalHt = lineTotals.ht - (data.globalDiscount || 0);
    const totalTtc = netTotalHt + lineTotals.fodec + lineTotals.tva + data.stampDuty;

    return { ...lineTotals, netTotalHt, totalTtc };
  }, [data.lines, data.globalDiscount, data.stampDuty]);

  const qrString = useMemo(() => generateQrString(data, totals.totalTtc, totals.tva), [data, totals]);
  const isRibValid = data.bankRib ? validateRib(data.bankRib) : true;
  const calculatedLetters = useMemo(() => numberToLettersFr(totals.totalTtc), [totals.totalTtc]);
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    optionalDates: false,
    allowances: false,
  });

  // Get conditional field visibility
  const visibility = useConditionalFields(data, expandedSections);

  return (
    <div className="space-y-8">

      {/* SECTION 1: DOCUMENT METADATA (Bgm - Document Identification) */}
      <section className="bg-slate-900 p-8 border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
          <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded flex items-center justify-center text-slate-300 font-mono text-lg">01</div>
            <div className="flex flex-col">
              <span className="tracking-tight">Document Details</span>
              <span className="text-xs text-slate-400 font-normal tracking-wide">TEIF 1.8.8 Standard</span>
            </div>
          </h2>
          <div className="flex items-center gap-4 bg-slate-800 p-3 rounded border border-slate-700">
            <span className="text-xs font-medium text-slate-300 px-2">Currency (ISO-4217)</span>
            <select value={data.currency} onChange={(e) => updateField('currency', e.target.value)} className="bg-slate-700 border border-slate-600 rounded px-4 py-2 text-sm font-medium text-slate-100 focus:outline-none focus:border-slate-500 transition-colors">
              <option value="TND">TND</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-400 mb-2">Document Type</label>
            <select value={data.documentType} onChange={(e) => updateField('documentType', e.target.value as DocTypeCode)} className="w-full p-3 border border-slate-700 rounded bg-slate-800 font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors">
              {Object.entries(DOCUMENT_TYPES).map(([c, l]) => (<option key={c} value={c}>{c} — {l.toUpperCase()}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Operation Nature</label>
            <select value={data.operationNature} onChange={(e) => updateField('operationNature', e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-800 font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors">
              <option value="GOODS">{t('opGoods')}</option>
              <option value="SERVICES">{t('opServices')}</option>
              <option value="MIXED">{t('opMixed')}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Document Number</label>
            <input type="text" placeholder="F-2024-0001" value={data.documentNumber} onChange={(e) => updateField('documentNumber', e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-800 font-mono font-medium text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors" />
          </div>
        </div>
      </section>

      {/* SECTION 2: DATES (Dtm - All date information I-31 through I-38) */}
      <section className="bg-slate-900 p-8 border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
          <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded flex items-center justify-center text-slate-300 font-mono text-lg">02</div>
            <div className="flex flex-col">
              <span className="tracking-tight">Invoice Dates</span>
              <span className="text-xs text-slate-400 font-normal tracking-wide">TEIF 1.8.8 Standard</span>
            </div>
          </h2>
        </div>

        {/* Required Dates */}
        <div className={`grid gap-6 ${visibility.showDeliveryDate ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Issue Date (I-31) *</label>
            <input type="date" value={data.invoiceDate} onChange={(e) => updateField('invoiceDate', e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-800 font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" required />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Due Date (I-32)</label>
            <input type="date" value={data.dueDate || ''} onChange={(e) => updateField('dueDate', e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-800 font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" />
          </div>
          {visibility.showDeliveryDate && (
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Delivery Date (I-33)</label>
            <input type="date" value={data.deliveryDate || ''} onChange={(e) => updateField('deliveryDate', e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-800 font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" />
          </div>
          )}
        </div>

        {/* Service Period (I-36) */}
        {visibility.showServicePeriod && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-800 rounded border border-slate-700">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Period Start (I-36)</label>
            <input type="date" value={data.periodStart || ''} onChange={(e) => updateField('periodStart', e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-900 font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Period End (I-36)</label>
            <input type="date" value={data.periodEnd || ''} onChange={(e) => updateField('periodEnd', e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-900 font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" />
          </div>
        </div>
        )}

        {/* Optional Dates Collapsible Section */}
        <button
          onClick={() => setExpandedSections({...expandedSections, optionalDates: !expandedSections.optionalDates})}
          className="w-full flex justify-between items-center p-4 bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 transition-colors"
        >
          <span className="text-sm font-medium text-slate-300 flex items-center gap-3">
            <svg className={`w-4 h-4 transition-transform duration-300 ${expandedSections.optionalDates ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            Optional Dates (I-34, I-35, I-37, I-38)
          </span>
          <span className="text-xs font-medium text-slate-400">{expandedSections.optionalDates ? 'Hide' : 'Show'}</span>
        </button>

        {expandedSections.optionalDates && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-800 border border-slate-700 rounded">
            {visibility.showDispatchDate && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Dispatch Date (I-34)</label>
              <input type="date" value={data.dispatchDate || ''} onChange={(e) => updateField('dispatchDate', e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-900 font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" />
              <p className="text-xs text-slate-500 mt-1">When goods are dispatched</p>
            </div>
            )}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Payment Date (I-35)</label>
              <input type="date" value={data.paymentDate || ''} onChange={(e) => updateField('paymentDate', e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-900 font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" />
              <p className="text-xs text-slate-500 mt-1">Expected payment date</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Signature Date & Time (I-37)</label>
              <input type="text" placeholder="DDMMYYHHmm" maxLength={10} value={data.signatureDate || ''} onChange={(e) => updateField('signatureDate', e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-900 font-mono font-medium text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors" />
              <p className="text-xs text-slate-500 mt-1">Format: DDMMYYHHmm</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Other Date (I-38)</label>
              <input type="date" value={data.otherDate || ''} onChange={(e) => updateField('otherDate', e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-900 font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" />
              <p className="text-xs text-slate-500 mt-1">Any other relevant date</p>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 3: PARTNER INFORMATION (Rff - Party Information) */}
      <section className="bg-slate-900 p-8 border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
          <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded flex items-center justify-center text-slate-300 font-mono text-lg">03</div>
            <div className="flex flex-col">
              <span className="tracking-tight">Partner Information</span>
              <span className="text-xs text-slate-400 font-normal tracking-wide">TEIF 1.8.8 Standard</span>
            </div>
          </h2>
        </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-0">
          <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 border border-slate-700 rounded flex items-center justify-center text-slate-300 font-mono text-sm">A</div>
            {t('supplier')}
          </h3>
          <PartnerForm title={t('supplier')} path="supplier" partner={data.supplier} step="03a" updateField={updateField} lang={lang} />
        </div>
        <div className="space-y-0">
          <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 border border-slate-700 rounded flex items-center justify-center text-slate-300 font-mono text-sm">B</div>
            {t('buyer')}
          </h3>
          <PartnerForm title={t('buyer')} path="buyer" partner={data.buyer} step="03b" updateField={updateField} lang={lang} />
        </div>
      </div>
      </section>

      {/* SECTION 4: LINE ITEMS (Lin - Invoice Line Items) */}
      <section className="bg-slate-900 p-8 border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
          <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded flex items-center justify-center text-slate-300 font-mono text-lg">04</div>
            <div className="flex flex-col">
              <span className="tracking-tight">Invoice Line Items</span>
              <span className="text-xs text-slate-400 font-normal tracking-wide">TEIF 1.8.8 Standard</span>
            </div>
          </h2>
          <button 
            onClick={() => {
              const newLine: InvoiceLine = { id: Math.random().toString(36).substr(2, 9), itemCode: '', description: '', quantity: 1, unit: 'PCE', unitPrice: 0, discountRate: 0, taxRate: 0.19, fodec: false };
              onChange({ ...data, lines: [...data.lines, newLine] });
            }} 
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded text-sm font-medium transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            {t('addItem')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-medium text-slate-300 border-b border-slate-700">
                <th className="pb-4 w-36">{t('code')}</th>
                <th className="pb-4">{t('description')}</th>
                <th className="pb-4 w-24 text-center">{t('unit')}</th>
                <th className="pb-4 w-24 text-center">{t('qty')}</th>
                <th className="pb-4 w-40 text-right">{t('price')} HT</th>
                <th className="pb-4 w-20 text-center">{t('fodec')}</th>
                <th className="pb-4 w-28 text-center">{t('tax')}</th>
                <th className="pb-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {data.lines.map((line) => (
                <React.Fragment key={line.id}>
                  <tr className="group hover:bg-slate-800/50 transition-all duration-200">
                    <td className="py-4 pr-3"><input type="text" value={line.itemCode} onChange={(e) => {
                      const lines = data.lines.map(l => l.id === line.id ? {...l, itemCode: e.target.value} : l);
                      onChange({...data, lines});
                    }} className="w-full p-2 border border-slate-700 rounded bg-slate-900 text-xs font-mono text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" /></td>
                    <td className="py-4 px-3"><input type="text" value={line.description} onChange={(e) => {
                      const lines = data.lines.map(l => l.id === line.id ? {...l, description: e.target.value} : l);
                      onChange({...data, lines});
                    }} className="w-full p-2 border border-slate-700 rounded bg-slate-900 text-sm font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" /></td>
                    <td className="py-4 px-3">
                      <select value={line.unit} onChange={(e) => {
                        const lines = data.lines.map(l => l.id === line.id ? {...l, unit: e.target.value} : l);
                        onChange({...data, lines});
                      }} className="w-full p-2 border border-slate-700 rounded bg-slate-900 text-xs font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors cursor-pointer">
                        {UNIT_CODES.map(u => <option key={u.code} value={u.code}>{u.code}</option>)}
                      </select>
                    </td>
                    <td className="py-4 px-3"><input type="number" step="0.001" value={line.quantity} onChange={(e) => {
                      const lines = data.lines.map(l => l.id === line.id ? {...l, quantity: parseFloat(e.target.value) || 0} : l);
                      onChange({...data, lines});
                    }} className="w-full p-2 border border-slate-700 rounded bg-slate-900 text-sm text-center font-mono text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" /></td>
                    <td className="py-4 px-3"><input type="number" step="0.001" value={line.unitPrice} onChange={(e) => {
                      const lines = data.lines.map(l => l.id === line.id ? {...l, unitPrice: parseFloat(e.target.value) || 0} : l);
                      onChange({...data, lines});
                    }} className="w-full p-2 border border-slate-700 rounded bg-slate-900 text-sm text-right font-mono text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" /></td>
                    <td className="py-4 px-3 text-center">
                      <input type="checkbox" checked={line.fodec} onChange={(e) => {
                        const lines = data.lines.map(l => l.id === line.id ? {...l, fodec: e.target.checked} : l);
                        onChange({...data, lines});
                      }} className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-slate-200 focus:border-slate-600 transition-all cursor-pointer" />
                    </td>
                    <td className="py-4 px-3">
                      <select value={line.taxRate} onChange={(e) => {
                        const lines = data.lines.map(l => l.id === line.id ? {...l, taxRate: parseFloat(e.target.value)} : l);
                        onChange({...data, lines});
                      }} className="w-full p-2 border border-slate-700 rounded bg-slate-900 text-xs font-medium text-slate-100 focus:outline-none focus:border-slate-600 transition-colors cursor-pointer">
                        <option value="0.19">19%</option><option value="0.13">13%</option><option value="0.07">7%</option><option value="0">0%</option>
                      </select>
                    </td>
                    <td className="py-4 pl-3"><button onClick={() => onChange({...data, lines: data.lines.filter(l => l.id !== line.id)})} className="text-slate-500 hover:text-red-400 transition-colors text-lg">×</button></td>
                  </tr>
                  
                  {/* CONDITIONAL VISIBILITY: Exemption Justification */}
                  {line.taxRate === 0 && (
                    <tr className="bg-slate-800/30">
                      <td colSpan={8} className="pb-4 pt-4 px-3">
                        <div className="flex items-center gap-4 p-4 bg-slate-800 border border-slate-700 rounded">
                          <div className="w-10 h-10 rounded bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-mono">I-110</div>
                          <div className="flex-1 space-y-1">
                            <label className="text-xs font-medium text-slate-400">{t('exemptionLabel')}</label>
                            <input 
                              type="text" 
                              placeholder="..." 
                              value={line.exemptionReason || ''} 
                              onChange={(e) => {
                                const lines = data.lines.map(l => l.id === line.id ? {...l, exemptionReason: e.target.value} : l);
                                onChange({...data, lines});
                              }} 
                              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 focus:outline-none focus:border-slate-600 transition-colors text-sm font-medium text-slate-100 placeholder-slate-600" 
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {!data.lines.length && (
            <div className="py-16 text-center border border-dashed border-slate-700 rounded mt-6">
              <div className="text-slate-400 font-medium text-sm">No items added yet</div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: ALLOWANCES & CHARGES (InvoiceAlc - Invoice Level Discounts/Surcharges) */}
      <section className="bg-slate-800 p-8 border border-slate-700 space-y-8">
        <div className="border-b border-slate-700 pb-6">
          <button
            onClick={() => setExpandedSections({...expandedSections, allowances: !expandedSections.allowances})}
            className="w-full flex justify-between items-center p-4 bg-slate-900 border border-slate-700 rounded transition-colors hover:bg-slate-800 group"
          >
            <span className="text-sm font-medium text-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-700 rounded text-white flex items-center justify-center font-mono text-xs font-medium">05</div>
              <span>{t('allowancesCharges')} (InvoiceAlc)</span>
            </span>
            <svg className={`w-5 h-5 transition-transform duration-300 text-slate-400 ${expandedSections.allowances ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>

        {expandedSections.allowances && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* PARTNER TYPES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-900 border border-slate-700 rounded">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Supplier Partner Type (I-61→I-69)</label>
                <select 
                  value={data.supplier?.partnerType || 'I-62'} 
                  onChange={(e) => onChange({...data, supplier: {...data.supplier, partnerType: e.target.value as any}})} 
                  className="w-full p-2 border border-slate-700 rounded bg-slate-800 text-xs text-slate-100 focus:outline-none focus:border-slate-600 transition-colors cursor-pointer"
                >
                  <option value="I-61">I-61: Previous Partner</option>
                  <option value="I-62">I-62: Supplier</option>
                  <option value="I-63">I-63: Ship-to Party</option>
                  <option value="I-64">I-64: Buyer</option>
                  <option value="I-65">I-65: Payment Receiver</option>
                  <option value="I-66">I-66: Delivery Party</option>
                  <option value="I-67">I-67: Ultimate Customer</option>
                  <option value="I-68">I-68: Goods Recipient</option>
                  <option value="I-69">I-69: Bill Recipient</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Buyer Partner Type (I-61→I-69)</label>
                <select 
                  value={data.buyer?.partnerType || 'I-64'} 
                  onChange={(e) => onChange({...data, buyer: {...data.buyer, partnerType: e.target.value as any}})} 
                  className="w-full p-2 border border-slate-700 rounded bg-slate-800 text-xs text-slate-100 focus:outline-none focus:border-slate-600 transition-colors cursor-pointer"
                >
                  <option value="I-61">I-61: Previous Partner</option>
                  <option value="I-62">I-62: Supplier</option>
                  <option value="I-63">I-63: Ship-to Party</option>
                  <option value="I-64">I-64: Buyer</option>
                  <option value="I-65">I-65: Payment Receiver</option>
                  <option value="I-66">I-66: Delivery Party</option>
                  <option value="I-67">I-67: Ultimate Customer</option>
                  <option value="I-68">I-68: Goods Recipient</option>
                  <option value="I-69">I-69: Bill Recipient</option>
                </select>
              </div>
            </div>

            {/* INVOICE-LEVEL ALLOWANCES/CHARGES */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-900 border border-slate-700 rounded">
                <h3 className="text-sm font-medium text-slate-200">Invoice-Level Allowances & Charges</h3>
                <button
                  onClick={() => {
                    const newAllowance: any = {
                      id: `alc-${Date.now()}`,
                      type: 'allowance',
                      code: 'I-153',
                      description: 'Discount',
                      amount: 0,
                      basedOn: 'invoice'
                    };
                    onChange({...data, allowances: [...(data.allowances || []), newAllowance]});
                  }}
                  className="px-4 py-2 bg-purple-600 text-white text-[9px] font-black rounded-xl hover:bg-purple-700 transition-all shadow-sm hover:shadow-md"
                >
                  + Add Allowance
                </button>
              </div>

              {data.allowances && data.allowances.length > 0 ? (
                <div className="space-y-3">
                  {data.allowances.map((alc) => (
                    <div key={alc.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 bg-slate-900 border border-slate-700 rounded transition-colors">
                      <div>
                        <label className="text-xs font-medium text-slate-400 uppercase mb-1 block">Type</label>
                        <select 
                          value={alc.type} 
                          onChange={(e) => {
                            const updated = data.allowances!.map(a => a.id === alc.id ? {...a, type: e.target.value as any} : a);
                            onChange({...data, allowances: updated});
                          }}
                          className="w-full p-2 border border-slate-700 rounded bg-slate-800 text-xs text-slate-100 focus:outline-none focus:border-slate-600 transition-colors cursor-pointer"
                        >
                          <option value="allowance">Allowance (Discount)</option>
                          <option value="charge">Charge (Surcharge)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-400 uppercase mb-1 block">Code (I-151→I-155)</label>
                        <select 
                          value={alc.code} 
                          onChange={(e) => {
                            const updated = data.allowances!.map(a => a.id === alc.id ? {...a, code: e.target.value as any} : a);
                            onChange({...data, allowances: updated});
                          }}
                          className="w-full p-2 border border-slate-700 rounded bg-slate-800 text-xs text-slate-100 focus:outline-none focus:border-slate-600 transition-colors cursor-pointer"
                        >
                          <option value="I-151">I-151: General Discount</option>
                          <option value="I-152">I-152: Freight</option>
                          <option value="I-153">I-153: Standard Discount</option>
                          <option value="I-154">I-154: Insurance</option>
                          <option value="I-155">I-155: Handling</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[8px] font-black text-slate-400 uppercase mb-1 block">Description</label>
                        <input 
                          type="text" 
                          value={alc.description} 
                          onChange={(e) => {
                            const updated = data.allowances!.map(a => a.id === alc.id ? {...a, description: e.target.value} : a);
                            onChange({...data, allowances: updated});
                          }}
                          className="w-full p-2 border border-slate-200 rounded-xl text-[10px] font-black" 
                        />
                      </div>
                      <div>
                        <label className="text-[8px] font-black text-slate-400 uppercase mb-1 block">Amount (TND)</label>
                        <input 
                          type="number" 
                          step="0.001" 
                          value={alc.amount} 
                          onChange={(e) => {
                            const updated = data.allowances!.map(a => a.id === alc.id ? {...a, amount: parseFloat(e.target.value) || 0} : a);
                            onChange({...data, allowances: updated});
                          }}
                          className="w-full p-2 border border-slate-200 rounded-xl text-[10px] font-mono font-black text-right text-blue-700" 
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => {
                            const updated = data.allowances!.filter(a => a.id !== alc.id);
                            onChange({...data, allowances: updated});
                          }}
                          className="w-full px-3 py-2 bg-red-50 text-red-600 text-[9px] font-black rounded-xl hover:bg-red-100 transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center border-4 border-dashed border-slate-50 rounded-2xl">
                  <div className="text-slate-200 font-black uppercase tracking-[0.5em] text-xs">No allowances added</div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* SECTION 6: PAYMENT, BANK & FINANCIAL SUMMARY (Pyt, Bnk, Moa) */}
      <section className="bg-slate-800 p-8 border border-slate-700 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-700 pb-6">
          <h2 className="text-xl font-medium text-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-700 rounded text-white flex items-center justify-center font-mono text-xs font-medium">06</div>
            <div className="flex flex-col">
              <span className="tracking-tight">{t('paymentBankTotals')} (Pyt/Bnk/Moa)</span>
              <span className="text-xs text-slate-400 font-medium uppercase">TEIF 1.8.8 Standard</span>
            </div>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">{t('paymentMeans')} (I-111)</label>
                <select value={data.paymentMeans} onChange={(e) => updateField('paymentMeans', e.target.value)} className="w-full p-2 border border-slate-700 rounded bg-slate-900 text-xs text-slate-100 focus:outline-none focus:border-slate-600 transition-colors cursor-pointer">
                  {Object.entries(PAYMENT_MEANS).map(([c, l]) => (<option key={c} value={c}>{c} - {l.toUpperCase()}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">{t('ttnHash')}</label>
                <input type="text" maxLength={26} value={data.ttnReference} onChange={(e) => updateField('ttnReference', e.target.value)} className="w-full p-2 border border-slate-700 rounded bg-slate-900 font-mono text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors" placeholder="HASH DE 26 CARACTÈRES" />
              </div>
            </div>

            {/* BANKING MODULE - Wire Transfer (I-114) */}
            {visibility.showBankingDetails && (
            <div className="p-6 bg-slate-800 border border-slate-700 space-y-4">
              <h4 className="text-xs font-medium text-slate-300">{t('bankInfo')}</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400">{t('bankCode')}</label>
                  <input type="text" maxLength={5} placeholder="00000" value={data.bankCode || ''} onChange={(e) => updateField('bankCode', e.target.value)} className="w-full p-2 border border-slate-700 rounded bg-slate-900 font-mono text-center text-xs text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-medium text-slate-400">{t('bankNameLabel')}</label>
                  <input type="text" placeholder="..." value={data.bankName || ''} onChange={(e) => updateField('bankName', e.target.value)} className="w-full p-2 border border-slate-700 rounded bg-slate-900 text-xs text-slate-100 focus:outline-none focus:border-slate-600 transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400">{t('ribLabel')}</label>
                <input 
                  type="text" 
                  maxLength={20} 
                  placeholder="00 000 0000000000000 00" 
                  value={data.bankRib || ''} 
                  onChange={(e) => updateField('bankRib', e.target.value)} 
                  className={`w-full p-3 border rounded font-mono text-center text-lg bg-slate-900 transition-all text-slate-100 placeholder-slate-600 focus:outline-none ${data.bankRib ? (isRibValid ? 'border-slate-600 focus:border-slate-500' : 'border-red-600 focus:border-red-500') : 'border-slate-700 focus:border-slate-600'}`} 
                />
                {data.bankRib && (
                  <div className={`text-center text-xs font-medium ${isRibValid ? 'text-slate-400' : 'text-red-400'}`}>
                    {isRibValid ? 'RIB Valid (MOD 97)' : 'Invalid RIB checksum'}
                  </div>
                )}
              </div>
            </div>
            )}

            {/* CHECK PAYMENT MODULE - Check (I-117) */}
            {visibility.showCheckNumber && (
            <div className="p-6 bg-slate-800 border border-slate-700 space-y-4">
              <h4 className="text-xs font-medium text-slate-300">Check Details (I-117)</h4>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400">Check Number *</label>
                <input 
                  type="text" 
                  placeholder="CHK-2024-001" 
                  value={data.checkNumber || ''} 
                  onChange={(e) => updateField('checkNumber', e.target.value)} 
                  className="w-full p-3 border border-slate-700 rounded bg-slate-900 font-mono text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors" 
                  required
                />
                <p className="text-xs text-slate-500">Required for check payments</p>
              </div>
            </div>
            )}

            {/* CARD PAYMENT MODULE - Card (I-118) */}
            {visibility.showCardDetails && (
            <div className="p-6 bg-slate-800 border border-slate-700 space-y-4">
              <h4 className="text-xs font-medium text-slate-300">Card Payment Details (I-118)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400">Card Type</label>
                  <select 
                    value={data.cardType || 'VISA'} 
                    onChange={(e) => updateField('cardType', e.target.value)} 
                    className="w-full p-2 border border-slate-700 rounded bg-slate-900 text-xs text-slate-100 focus:outline-none focus:border-slate-600 transition-colors cursor-pointer"
                  >
                    <option value="VISA">VISA</option>
                    <option value="MASTERCARD">MasterCard</option>
                    <option value="AMEX">American Express</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400">Last 4 Digits</label>
                  <input 
                    type="text" 
                    maxLength={4}
                    placeholder="0000" 
                    value={data.cardLast4 || ''} 
                    onChange={(e) => updateField('cardLast4', e.target.value.replace(/\D/g, ''))} 
                    className="w-full p-2 border border-slate-700 rounded bg-slate-900 font-mono text-center text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400">Transaction Reference</label>
                <input 
                  type="text" 
                  placeholder="Transaction or authorization code" 
                  value={data.cardReference || ''} 
                  onChange={(e) => updateField('cardReference', e.target.value)} 
                  className="w-full p-2 border border-slate-700 rounded bg-slate-900 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                />
              </div>
            </div>
            )}

            {/* POSTAL PAYMENT MODULE - Postal (I-115) */}
            {visibility.showPostalDetails && (
            <div className="p-6 bg-slate-800 border border-slate-700 space-y-4">
              <h4 className="text-xs font-medium text-slate-300">Postal Payment Details (I-115)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400">Account Number *</label>
                  <input 
                    type="text" 
                    placeholder="0120021241115530" 
                    value={data.postalAccountNumber || ''} 
                    onChange={(e) => updateField('postalAccountNumber', e.target.value)} 
                    className="w-full p-2 border border-slate-700 rounded bg-slate-900 font-mono text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400">Account Owner *</label>
                  <input 
                    type="text" 
                    placeholder="Account Holder Name" 
                    value={data.postalAccountOwner || ''} 
                    onChange={(e) => updateField('postalAccountOwner', e.target.value)} 
                    className="w-full p-2 border border-slate-700 rounded bg-slate-900 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400">Branch Code *</label>
                  <input 
                    type="text" 
                    placeholder="0760" 
                    value={data.postalBranchCode || ''} 
                    onChange={(e) => updateField('postalBranchCode', e.target.value)} 
                    className="w-full p-2 border border-slate-700 rounded bg-slate-900 font-mono text-center text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400">Service Name (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="La Poste" 
                    value={data.postalServiceName || ''} 
                    onChange={(e) => updateField('postalServiceName', e.target.value)} 
                    className="w-full p-2 border border-slate-700 rounded bg-slate-900 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors"
                  />
                </div>
              </div>
              <p className="text-[7px] text-orange-600 italic">* Required fields for postal payment</p>
            </div>
            )}

            {/* AMOUNT IN LETTERS Module */}
            <div className="space-y-3">
              <label className="block text-xs font-medium text-slate-400 uppercase">{t('amountLettersLabel')}</label>
              <textarea 
                value={data.amountDescriptionOverride || calculatedLetters} 
                onChange={(e) => updateField('amountDescriptionOverride', e.target.value)} 
                className="w-full p-4 border border-slate-700 rounded bg-slate-900 text-xs text-slate-100 placeholder-slate-600 leading-relaxed h-32 font-mono focus:outline-none focus:border-slate-600 transition-colors"
                placeholder="..."
              />
              <p className="text-xs text-slate-400 italic">Note: Le montant est auto-généré mais modifiable pour respecter vos spécificités juridiques.</p>
            </div>
          </div>

          {/* FINANCIAL SUMMARY MASTER CARD */}
          <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-900/60 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all duration-1000"></div>
            
            <div className="space-y-7 font-mono relative">
              <div className="flex justify-between items-center text-xs opacity-50 tracking-widest">
                <span className="uppercase">{t('totalGross')} HT</span>
                <span className="font-bold">{(totals.ht + (data.globalDiscount || 0)).toFixed(3)}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 px-6 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{t('discountTotal')}</span>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    step="0.001" 
                    value={data.globalDiscount} 
                    onChange={(e) => updateField('globalDiscount', parseFloat(e.target.value) || 0)} 
                    className="w-32 bg-white/10 border-none rounded-xl px-4 py-2 text-right text-sm font-black text-white focus:ring-4 focus:ring-blue-500/50 outline-none transition-all" 
                  />
                  <span className="text-[10px] text-slate-500 font-bold uppercase">{data.currency}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-base border-b border-white/10 pb-6">
                <span className="uppercase tracking-[0.2em] font-black text-emerald-400">{t('netHt')}</span>
                <span className="font-black text-2xl">{totals.netTotalHt.toFixed(3)}</span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-between text-xs opacity-70">
                  <span className="uppercase tracking-widest">{t('taxTotal')}</span>
                  <span className="font-bold">{totals.tva.toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-xs opacity-70">
                  <span className="uppercase tracking-widest">{t('fodec')} (I-178 / 1%)</span>
                  <span className="font-bold">{totals.fodec.toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-xs text-amber-400 font-black">
                  <span className="uppercase tracking-widest">{t('stampDuty')} (I-178)</span>
                  <span className="font-bold">{data.stampDuty.toFixed(3)}</span>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-white/10 relative">
              <div className="text-[11px] text-blue-400 font-black uppercase tracking-[0.5em] mb-4">{t('totalTtc')} (I-180)</div>
              <div className="flex items-baseline gap-4">
                <span className="text-7xl font-black tabular-nums tracking-tighter">{totals.totalTtc.toFixed(3)}</span>
                <span className="text-2xl font-black text-slate-500 tracking-widest">{data.currency}</span>
              </div>
              <div className="mt-10 p-5 bg-white/5 border border-white/5 rounded-3xl shadow-inner backdrop-blur-sm">
                 <div className="text-[9px] text-slate-600 font-black uppercase mb-2 tracking-[0.3em]">{t('qrSignature')}</div>
                 <div className="text-[8px] font-mono opacity-20 break-all leading-relaxed select-none">{qrString}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center space-y-4">
        <div className="inline-block px-10 py-3 bg-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-[0.6em] border border-slate-200 shadow-sm">
          Tunisian Electronic Invoice Engine v1.8.8 Standard
        </div>
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Conformité avec les exigences de la plateforme TTN</p>
      </footer>
    </div>
  );
};

export default InvoiceForm;
