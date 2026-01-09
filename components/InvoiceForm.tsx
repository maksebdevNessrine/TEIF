
import React from 'react';
import { InvoiceData, InvoiceLine, IdType, DocTypeCode, DOCUMENT_TYPES, PAYMENT_MEANS } from '../types';

interface Props {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

const InvoiceForm: React.FC<Props> = ({ data, onChange }) => {
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

  const addLine = () => {
    const newLine: InvoiceLine = {
      id: Math.random().toString(36).substr(2, 9),
      itemCode: '',
      description: '',
      quantity: 1,
      unit: 'PCE',
      unitPrice: 0,
      taxRate: 0.19,
      fodec: false
    };
    onChange({ ...data, lines: [...data.lines, newLine] });
  };

  const removeLine = (id: string) => {
    onChange({ ...data, lines: data.lines.filter(l => l.id !== id) });
  };

  const updateLine = (id: string, field: keyof InvoiceLine, value: any) => {
    const newLines = data.lines.map(l => l.id === id ? { ...l, [field]: value } : l);
    onChange({ ...data, lines: newLines });
  };

  const PartnerForm = ({ title, path, partner, step }: { title: string, path: string, partner: any, step: string }) => (
    <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">{step}</span>
        {title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Entity Name</label>
          <input type="text" value={partner.name} onChange={(e) => updateField(`${path}.name`, e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">ID Type (I-0)</label>
          <select value={partner.idType} onChange={(e) => updateField(`${path}.idType`, e.target.value as IdType)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="I-01">I-01: Matricule Fiscal</option>
            <option value="I-02">I-02: C.I.N</option>
            <option value="I-03">I-03: Carte de séjour</option>
            <option value="I-04">I-04: MF Non-Tunisien</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">ID Value</label>
          <input type="text" value={partner.idValue} onChange={(e) => updateField(`${path}.idValue`, e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 font-mono outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Registre Commerce (I-815)</label>
          <input type="text" value={partner.rc || ''} onChange={(e) => updateField(`${path}.rc`, e.target.value)} className="w-full p-2 border rounded-lg outline-none font-mono" placeholder="B12345..." />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Capital (I-816)</label>
          <input type="text" value={partner.capital || ''} onChange={(e) => updateField(`${path}.capital`, e.target.value)} className="w-full p-2 border rounded-lg outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Address Detail</label>
          <input type="text" value={partner.addressDescription} onChange={(e) => updateField(`${path}.addressDescription`, e.target.value)} className="w-full p-2 border rounded-lg outline-none" />
        </div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Street</label><input type="text" value={partner.street} onChange={(e) => updateField(`${path}.street`, e.target.value)} className="w-full p-2 border rounded-lg outline-none" /></div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">City</label><input type="text" value={partner.city} onChange={(e) => updateField(`${path}.city`, e.target.value)} className="w-full p-2 border rounded-lg outline-none" /></div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Postal Code</label><input type="text" value={partner.postalCode} onChange={(e) => updateField(`${path}.postalCode`, e.target.value)} className="w-full p-2 border rounded-lg font-mono outline-none" /></div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Phone (I-101)</label><input type="text" value={partner.phone || ''} onChange={(e) => updateField(`${path}.phone`, e.target.value)} className="w-full p-2 border rounded-lg outline-none" /></div>
      </div>
    </section>
  );

  return (
    <div className="space-y-8 pb-24">
      {/* General Header */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 pb-2 border-b"><h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>General Info</h2></div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Doc Type (I-1)</label><select value={data.documentType} onChange={(e) => updateField('documentType', e.target.value as DocTypeCode)} className="w-full p-2 border rounded-lg font-medium">{Object.entries(DOCUMENT_TYPES).map(([c, l]) => (<option key={c} value={c}>{c}: {l}</option>))}</select></div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Doc Number</label><input type="text" value={data.documentNumber} onChange={(e) => updateField('documentNumber', e.target.value)} className="w-full p-2 border rounded-lg font-mono" /></div>
        <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Issue Date</label><input type="date" value={data.invoiceDate} onChange={(e) => updateField('invoiceDate', e.target.value)} className="w-full p-2 border rounded-lg" /></div>
      </section>

      {/* Partners */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <PartnerForm title="Supplier" path="supplier" partner={data.supplier} step="2" />
        <PartnerForm title="Buyer" path="buyer" partner={data.buyer} step="3" />
      </div>

      {/* Lines */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6"><h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold">4</span>Lines</h2><button onClick={addLine} className="text-sm bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium">+ Add Item</button></div>
        <div className="overflow-x-auto"><table className="w-full text-left">
          <thead><tr className="text-[10px] font-bold text-slate-400 uppercase border-b pb-2">
            <th className="pb-2 w-24">Code</th><th className="pb-2">Description</th><th className="pb-2 w-16">Qty</th><th className="pb-2 w-16">Unit</th><th className="pb-2 w-32">Unit Price</th><th className="pb-2 w-20 text-center">FODEC</th><th className="pb-2 w-24">TVA</th><th className="pb-2 w-10"></th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100">{data.lines.map((line) => (
            <tr key={line.id} className="group">
              <td className="py-3 pr-2"><input type="text" value={line.itemCode} onChange={(e) => updateLine(line.id, 'itemCode', e.target.value)} className="w-full p-1 border rounded text-xs font-mono" /></td>
              <td className="py-3 px-2"><input type="text" value={line.description} onChange={(e) => updateLine(line.id, 'description', e.target.value)} className="w-full p-1 border rounded text-xs" /></td>
              <td className="py-3 px-2"><input type="number" value={line.quantity} onChange={(e) => updateLine(line.id, 'quantity', parseFloat(e.target.value))} className="w-full p-1 border rounded text-xs" /></td>
              <td className="py-3 px-2"><select value={line.unit} onChange={(e) => updateLine(line.id, 'unit', e.target.value)} className="w-full p-1 border rounded text-xs"><option value="PCE">PCE</option><option value="KG">KG</option><option value="HUR">HUR</option><option value="MTQ">MTQ</option></select></td>
              <td className="py-3 px-2"><input type="number" step="0.001" value={line.unitPrice} onChange={(e) => updateLine(line.id, 'unitPrice', parseFloat(e.target.value))} className="w-full p-1 border rounded text-xs font-mono" /></td>
              <td className="py-3 px-2 text-center"><input type="checkbox" checked={line.fodec} onChange={(e) => updateLine(line.id, 'fodec', e.target.checked)} className="accent-blue-600" /></td>
              <td className="py-3 px-2"><select value={line.taxRate} onChange={(e) => updateLine(line.id, 'taxRate', parseFloat(e.target.value))} className="w-full p-1 border rounded text-xs"><option value="0.19">19%</option><option value="0.13">13%</option><option value="0.12">12%</option><option value="0.07">7%</option><option value="0">0%</option></select></td>
              <td className="py-3 pl-2"><button onClick={() => removeLine(line.id)} className="text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">✕</button></td>
            </tr>
          ))}</tbody>
        </table></div>
      </section>

      {/* Payment & Compliance */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-8">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">5</span>Payment & Compliance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Due Date (I-32)</label><input type="date" value={data.dueDate || ''} onChange={(e) => updateField('dueDate', e.target.value)} className="w-full p-2 border rounded-lg" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Means (I-13)</label><select value={data.paymentMeans} onChange={(e) => updateField('paymentMeans', e.target.value)} className="w-full p-2 border rounded-lg">{Object.entries(PAYMENT_MEANS).map(([c, l]) => (<option key={c} value={c}>{l}</option>))}</select></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2"><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Bank Name</label><input type="text" value={data.bankName || ''} onChange={(e) => updateField('bankName', e.target.value)} className="w-full p-2 border rounded-lg" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Code (I-141)</label><input type="text" value={data.bankCode || ''} onChange={(e) => updateField('bankCode', e.target.value)} className="w-full p-2 border rounded-lg font-mono" placeholder="0760" /></div>
            </div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">RIB (20 Digits)</label><input type="text" value={data.bankRib || ''} onChange={(e) => updateField('bankRib', e.target.value)} className="w-full p-2 border rounded-lg font-mono" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 uppercase mb-1">TTN Reference (I-88)</label><input type="text" value={data.ttnReference} onChange={(e) => updateField('ttnReference', e.target.value)} className="w-full p-2 border rounded-lg font-mono" /></div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-200">
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between text-slate-500"><span>Total HT:</span><span className="font-bold text-slate-700">{data.lines.reduce((s, l) => s + (l.quantity * l.unitPrice), 0).toFixed(3)} TND</span></div>
              <div className="flex justify-between text-slate-500"><span>Total TVA:</span><span className="font-bold text-slate-700">{data.lines.reduce((s, l) => s + ((l.quantity * l.unitPrice + (l.fodec ? l.quantity * l.unitPrice * 0.01 : 0)) * l.taxRate), 0).toFixed(3)} TND</span></div>
              <div className="flex justify-between text-slate-500"><span>Stamp Duty:</span><span className="font-bold text-slate-700">{data.stampDuty.toFixed(3)} TND</span></div>
              <div className="pt-2 border-t flex justify-between text-lg font-bold text-red-600"><span>TOTAL TTC:</span><span>{(data.lines.reduce((s, l) => s + ((l.quantity * l.unitPrice + (l.fodec ? l.quantity * l.unitPrice * 0.01 : 0)) * (1 + l.taxRate)), 0) + data.stampDuty).toFixed(3)} TND</span></div>
            </div>
            <div className="mt-4"><label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Montant en toutes lettres</label><textarea value={data.amountDescriptionOverride} onChange={(e) => updateField('amountDescriptionOverride', e.target.value)} className="w-full p-2 border rounded bg-white text-xs h-16 outline-none resize-none" placeholder="Généré automatiquement..." /></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvoiceForm;
