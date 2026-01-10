
import React, { useMemo, useEffect } from 'react';
import { InvoiceData, InvoiceLine, IdType, DocTypeCode, DOCUMENT_TYPES, PAYMENT_MEANS, Language, UNIT_CODES } from '../types';
import { useTranslation } from '../services/i18n';
import { generateQrString, validateRib, numberToLettersFr } from '../services/xmlGenerator';

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

  return (
    <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-4">
          <span className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-sm font-mono shadow-lg">{step}</span>
          {title}
        </h2>
        <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${isBusiness ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
          {isBusiness ? t('business') : t('person')}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-b border-slate-50 pb-8">
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{t('fullName')}</label>
          <input 
            type="text" 
            placeholder="Ex: SOCIETE TUNISIENNE DE..."
            value={partner.name} 
            onChange={(e) => updateField(`${path}.name`, e.target.value)} 
            className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700" 
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{t('idType')}</label>
          <select 
            value={partner.idType} 
            onChange={(e) => updateField(`${path}.idType`, e.target.value as IdType)} 
            className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 text-sm font-black appearance-none cursor-pointer"
          >
            <option value="I-01">I-01: Matricule Fiscal</option>
            <option value="I-02">I-02: C.I.N</option>
            <option value="I-03">I-03: Passeport</option>
            <option value="I-04">I-04: MF Non-Tunisien</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{t('idValue')}</label>
          <input 
            type="text" 
            placeholder="0000000XAM000"
            value={partner.idValue} 
            onChange={(e) => updateField(`${path}.idValue`, e.target.value.toUpperCase())} 
            className="w-full p-4 border border-slate-200 rounded-2xl font-mono text-sm font-bold tracking-wider" 
          />
        </div>
        
        {isBusiness && (
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-top-2 duration-500">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{t('rc')}</label>
              <input type="text" placeholder="B123452024" value={partner.rc || ''} onChange={(e) => updateField(`${path}.rc`, e.target.value)} className="w-full p-4 border border-slate-200 rounded-2xl font-mono text-xs font-bold" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{t('capital')}</label>
              <input type="text" placeholder="10.000,000" value={partner.capital || ''} onChange={(e) => updateField(`${path}.capital`, e.target.value)} className="w-full p-4 border border-slate-200 rounded-2xl text-xs font-bold" />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        <div className="md:col-span-2">
          <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{t('address')}</label>
          <input type="text" placeholder="Adresse complète..." value={partner.addressDescription} onChange={(e) => updateField(`${path}.addressDescription`, e.target.value)} className="w-full p-4 border border-slate-200 rounded-2xl text-sm font-medium" />
        </div>
        <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{t('city')}</label><input type="text" value={partner.city} onChange={(e) => updateField(`${path}.city`, e.target.value)} className="w-full p-4 border border-slate-200 rounded-2xl text-sm font-bold" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Pays</label><input type="text" maxLength={2} value={partner.country} onChange={(e) => updateField(`${path}.country`, e.target.value.toUpperCase())} className="w-full p-4 border border-slate-200 rounded-2xl font-mono text-center text-sm font-black" /></div>
          <div><label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{t('postalCode')}</label><input type="text" value={partner.postalCode || ''} onChange={(e) => updateField(`${path}.postalCode`, e.target.value)} className="w-full p-4 border border-slate-200 rounded-2xl font-mono text-center text-sm font-bold" /></div>
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

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* SECTION 1: SYSTEM METADATA */}
      <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-100/50 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-10">
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-600 rounded-3xl text-white flex items-center justify-center shadow-xl shadow-blue-200 font-mono text-xl">01</div>
            <div className="flex flex-col">
              <span className="tracking-tight">{t('docDetails')}</span>
              <span className="text-xs text-slate-400 font-bold tracking-[0.2em] uppercase">Protocol Implementation v1.8.8</span>
            </div>
          </h2>
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-[1.5rem] border border-slate-100 shadow-inner">
            <span className="text-[10px] font-black text-slate-400 px-3 uppercase tracking-widest">{t('currencyLabel')} ISO-4217</span>
            <select value={data.currency} onChange={(e) => updateField('currency', e.target.value)} className="bg-white border border-slate-200 rounded-2xl px-6 py-3 text-sm font-black text-blue-700 shadow-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all">
              <option value="TND">TND (Dinar)</option>
              <option value="EUR">EUR (Euro)</option>
              <option value="USD">USD (Dollar)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">{t('docType')}</label>
            <select value={data.documentType} onChange={(e) => updateField('documentType', e.target.value as DocTypeCode)} className="w-full p-4 border border-slate-200 rounded-2xl font-black text-base bg-slate-50 shadow-sm">
              {Object.entries(DOCUMENT_TYPES).map(([c, l]) => (<option key={c} value={c}>{c} — {l.toUpperCase()}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">{t('opNature')}</label>
            <select value={data.operationNature} onChange={(e) => updateField('operationNature', e.target.value)} className="w-full p-4 border border-slate-200 rounded-2xl font-black text-base transition-all focus:border-blue-500 outline-none">
              <option value="GOODS">{t('opGoods')}</option>
              <option value="SERVICES">{t('opServices')}</option>
              <option value="MIXED">{t('opMixed')}</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">{t('docNumber')}</label>
            <input type="text" placeholder="F-2024-0001" value={data.documentNumber} onChange={(e) => updateField('documentNumber', e.target.value)} className="w-full p-4 border border-slate-200 rounded-2xl font-mono font-black text-base shadow-inner text-blue-600" />
          </div>
        </div>

        {/* COMPREHENSIVE DATES SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 pt-6 border-t border-slate-50">
          <div><label className="block text-[9px] font-black text-slate-400 uppercase mb-2 tracking-tighter">{t('issueDate')} (I-31)</label><input type="date" value={data.invoiceDate} onChange={(e) => updateField('invoiceDate', e.target.value)} className="w-full p-3 border border-slate-200 rounded-2xl text-xs font-black shadow-sm" /></div>
          <div><label className="block text-[9px] font-black text-slate-400 uppercase mb-2 tracking-tighter">{t('dueDate')} (I-32)</label><input type="date" value={data.dueDate || ''} onChange={(e) => updateField('dueDate', e.target.value)} className="w-full p-3 border border-slate-200 rounded-2xl text-xs font-black shadow-sm" /></div>
          <div><label className="block text-[9px] font-black text-slate-400 uppercase mb-2 tracking-tighter">{t('deliveryDate')} (I-33)</label><input type="date" value={data.deliveryDate || ''} onChange={(e) => updateField('deliveryDate', e.target.value)} className="w-full p-3 border border-slate-200 rounded-2xl text-xs font-black shadow-sm" /></div>
          <div><label className="block text-[9px] font-black text-slate-400 uppercase mb-2 tracking-tighter">{t('periodStart')} (I-34)</label><input type="date" value={data.periodStart || ''} onChange={(e) => updateField('periodStart', e.target.value)} className="w-full p-3 border border-slate-200 rounded-2xl text-xs font-black shadow-sm" /></div>
          <div><label className="block text-[9px] font-black text-slate-400 uppercase mb-2 tracking-tighter">{t('periodEnd')} (I-35)</label><input type="date" value={data.periodEnd || ''} onChange={(e) => updateField('periodEnd', e.target.value)} className="w-full p-3 border border-slate-200 rounded-2xl text-xs font-black shadow-sm" /></div>
        </div>
      </section>

      {/* SECTION 2: ENTITIES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <PartnerForm title={t('supplier')} path="supplier" partner={data.supplier} step="02" updateField={updateField} lang={lang} />
        <PartnerForm title={t('buyer')} path="buyer" partner={data.buyer} step="03" updateField={updateField} lang={lang} />
      </div>

      {/* SECTION 3: LINE ITEMS Master Table */}
      <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden space-y-8">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-5">
            <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-sm font-mono shadow-lg shadow-amber-200">04</span>
            {t('lines')}
          </h2>
          <button 
            onClick={() => {
              const newLine: InvoiceLine = { id: Math.random().toString(36).substr(2, 9), itemCode: '', description: '', quantity: 1, unit: 'PCE', unitPrice: 0, discountRate: 0, taxRate: 0.19, fodec: false };
              onChange({ ...data, lines: [...data.lines, newLine] });
            }} 
            className="group px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 hover:scale-105 transition-all flex items-center gap-3 shadow-xl shadow-slate-200"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
            {t('addItem')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="pb-6 w-36">{t('code')}</th>
                <th className="pb-6">{t('description')}</th>
                <th className="pb-6 w-24 text-center">{t('unit')}</th>
                <th className="pb-6 w-24 text-center">{t('qty')}</th>
                <th className="pb-6 w-40 text-right">{t('price')} HT (I-183)</th>
                <th className="pb-6 w-20 text-center">{t('fodec')}</th>
                <th className="pb-6 w-28 text-center">{t('tax')} (I-1602)</th>
                <th className="pb-6 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.lines.map((line) => (
                <React.Fragment key={line.id}>
                  <tr className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="py-6 pr-3"><input type="text" value={line.itemCode} onChange={(e) => {
                      const lines = data.lines.map(l => l.id === line.id ? {...l, itemCode: e.target.value} : l);
                      onChange({...data, lines});
                    }} className="w-full p-3 border border-slate-200 rounded-xl text-xs font-mono font-black shadow-sm" /></td>
                    <td className="py-6 px-3"><input type="text" value={line.description} onChange={(e) => {
                      const lines = data.lines.map(l => l.id === line.id ? {...l, description: e.target.value} : l);
                      onChange({...data, lines});
                    }} className="w-full p-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm" /></td>
                    <td className="py-6 px-3">
                      <select value={line.unit} onChange={(e) => {
                        const lines = data.lines.map(l => l.id === line.id ? {...l, unit: e.target.value} : l);
                        onChange({...data, lines});
                      }} className="w-full p-3 border border-slate-200 rounded-xl text-[10px] bg-white font-black shadow-sm cursor-pointer">
                        {UNIT_CODES.map(u => <option key={u.code} value={u.code}>{u.code} — {u.label}</option>)}
                      </select>
                    </td>
                    <td className="py-6 px-3"><input type="number" step="0.001" value={line.quantity} onChange={(e) => {
                      const lines = data.lines.map(l => l.id === line.id ? {...l, quantity: parseFloat(e.target.value) || 0} : l);
                      onChange({...data, lines});
                    }} className="w-full p-3 border border-slate-200 rounded-xl text-sm text-center font-mono font-black shadow-sm" /></td>
                    <td className="py-6 px-3"><input type="number" step="0.001" value={line.unitPrice} onChange={(e) => {
                      const lines = data.lines.map(l => l.id === line.id ? {...l, unitPrice: parseFloat(e.target.value) || 0} : l);
                      onChange({...data, lines});
                    }} className="w-full p-3 border border-slate-200 rounded-xl text-sm text-right font-mono font-black text-blue-700 shadow-sm" /></td>
                    <td className="py-6 px-3 text-center">
                      <input type="checkbox" checked={line.fodec} onChange={(e) => {
                        const lines = data.lines.map(l => l.id === line.id ? {...l, fodec: e.target.checked} : l);
                        onChange({...data, lines});
                      }} className="w-6 h-6 rounded-xl border-slate-300 text-amber-500 focus:ring-amber-500 transition-all cursor-pointer shadow-sm" />
                    </td>
                    <td className="py-6 px-3">
                      <select value={line.taxRate} onChange={(e) => {
                        const lines = data.lines.map(l => l.id === line.id ? {...l, taxRate: parseFloat(e.target.value)} : l);
                        onChange({...data, lines});
                      }} className="w-full p-3 border border-slate-200 rounded-xl text-[11px] font-black bg-slate-50 cursor-pointer">
                        <option value="0.19">19% TVA</option><option value="0.13">13% TVA</option><option value="0.07">07% TVA</option><option value="0">00% EXONÉRÉ</option>
                      </select>
                    </td>
                    <td className="py-6 pl-3"><button onClick={() => onChange({...data, lines: data.lines.filter(l => l.id !== line.id)})} className="text-slate-300 hover:text-red-500 transition-all hover:scale-125">✕</button></td>
                  </tr>
                  
                  {/* CONDITIONAL VISIBILITY: Exemption Justification */}
                  {line.taxRate === 0 && (
                    <tr className="animate-in slide-in-from-top-2 duration-500">
                      <td colSpan={8} className="pb-6 px-3">
                        <div className="flex items-center gap-4 p-5 bg-amber-50 border border-amber-200 rounded-3xl shadow-inner">
                          <div className="w-12 h-12 rounded-2xl bg-amber-200 text-amber-800 flex items-center justify-center text-[10px] font-black shadow-sm">I-110</div>
                          <div className="flex-1 space-y-1">
                            <label className="text-[8px] font-black text-amber-600 uppercase tracking-widest">{t('exemptionLabel')}</label>
                            <input 
                              type="text" 
                              placeholder="..." 
                              value={line.exemptionReason || ''} 
                              onChange={(e) => {
                                const lines = data.lines.map(l => l.id === line.id ? {...l, exemptionReason: e.target.value} : l);
                                onChange({...data, lines});
                              }} 
                              className="w-full bg-transparent border-none focus:ring-0 text-xs font-bold text-amber-900 placeholder-amber-300 uppercase italic" 
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
            <div className="py-24 text-center border-4 border-dashed border-slate-50 rounded-[3rem] mt-6">
              <div className="text-slate-200 font-black uppercase tracking-[0.5em] text-sm">Prêt pour saisie de lignes</div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: PAYMENT, BANK & COMPLIANCE SUMMARY */}
      <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-12">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-5">
          <span className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-sm font-mono shadow-lg shadow-emerald-200">05</span>
          {t('payment')}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">{t('paymentMeans')} (I-111)</label>
                <select value={data.paymentMeans} onChange={(e) => updateField('paymentMeans', e.target.value)} className="w-full p-4 border border-slate-200 rounded-2xl font-black text-sm bg-slate-50 shadow-sm">
                  {Object.entries(PAYMENT_MEANS).map(([c, l]) => (<option key={c} value={c}>{c} - {l.toUpperCase()}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">{t('ttnHash')}</label>
                <input type="text" maxLength={26} value={data.ttnReference} onChange={(e) => updateField('ttnReference', e.target.value)} className="w-full p-4 border border-slate-200 rounded-2xl font-mono text-[11px] text-blue-600 font-black bg-blue-50/20 shadow-inner" placeholder="HASH DE 26 CARACTÈRES" />
              </div>
            </div>

            {/* BANKING MODULE */}
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">{t('bankInfo')}</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[8px] font-black text-slate-400 uppercase">{t('bankCode')}</label>
                  <input type="text" maxLength={5} placeholder="00000" value={data.bankCode || ''} onChange={(e) => updateField('bankCode', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl font-mono text-center text-xs bg-white font-bold" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[8px] font-black text-slate-400 uppercase">{t('bankNameLabel')}</label>
                  <input type="text" placeholder="..." value={data.bankName || ''} onChange={(e) => updateField('bankName', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl text-xs bg-white font-black" />
                </div>
              </div>
              <div className="relative pt-2">
                <label className="text-[8px] font-black text-slate-400 uppercase absolute -top-1 left-4 bg-slate-50 px-2">{t('ribLabel')}</label>
                <input 
                  type="text" 
                  maxLength={20} 
                  placeholder="00 000 0000000000000 00" 
                  value={data.bankRib || ''} 
                  onChange={(e) => updateField('bankRib', e.target.value)} 
                  className={`w-full p-5 border-2 rounded-2xl font-mono text-center tracking-[0.3em] text-xl bg-white shadow-lg transition-all ${data.bankRib ? (isRibValid ? 'border-emerald-500 bg-emerald-50/10' : 'border-red-500 bg-red-50/10 ring-4 ring-red-500/10') : 'border-slate-200'}`} 
                />
                {data.bankRib && (
                  <div className={`mt-3 text-center text-[10px] font-black uppercase tracking-widest ${isRibValid ? 'text-emerald-600' : 'text-red-500 animate-pulse'}`}>
                    {isRibValid ? '✓ RIB Certifié Conforme (MOD 97)' : '⚠ Erreur de clef RIB'}
                  </div>
                )}
              </div>
            </div>

            {/* AMOUNT IN LETTERS Module */}
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('amountLettersLabel')}</label>
              <textarea 
                value={data.amountDescriptionOverride || calculatedLetters} 
                onChange={(e) => updateField('amountDescriptionOverride', e.target.value)} 
                className="w-full p-6 border-2 border-slate-100 rounded-[2rem] text-[11px] font-black uppercase leading-relaxed h-32 italic bg-slate-50 shadow-inner focus:bg-white focus:border-blue-300 transition-all outline-none"
                placeholder="..."
              />
              <p className="text-[9px] text-slate-400 font-bold italic">Note: Le montant est auto-généré mais modifiable pour respecter vos spécificités juridiques.</p>
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
