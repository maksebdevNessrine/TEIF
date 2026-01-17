
import React, { useMemo, useEffect, useState } from 'react';
import { InvoiceData, InvoiceLine, IdType, DocTypeCode, DOCUMENT_TYPES, PAYMENT_MEANS, Language, UNIT_CODES } from '@teif/shared/types';
import * as Validators from '@teif/shared/validation';
import { invoiceDataSchema } from '@teif/shared/validation';
import { useTranslation } from '../services/i18n';
import { generateQrString, validateRib, numberToLettersFr } from '../services/xmlGenerator';
import { useConditionalFields } from '../services/useConditionalFields';
import { FormInput, FormSelect, FormSection, StepIndicator } from './design-system';
import { FieldValidationError, RequiredFieldMark, FieldWrapper } from './ValidationError';
import { validateInvoiceField, getFieldError, type FieldError } from '../services/invoiceFormValidator';

interface PartnerFormProps {
  title: string;
  path: string;
  partner: any;
  step: string;
  updateField: (path: string, value: any) => void;
  lang: Language;
  validationErrors?: FieldError[];
}

const PartnerForm: React.FC<PartnerFormProps> = ({ title, path, partner, step, updateField, lang, validationErrors = [] }) => {
  const getFieldError = (fieldPath: string): FieldError | undefined => {
    return validationErrors.find(e => e.field === fieldPath);
  };
  const t = useTranslation(lang);
  const isBusiness = partner.idType === 'I-01' || partner.idType === 'I-04';
  
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
          <label className="flex items-center gap-1 text-xs font-medium text-slate-400 mb-2">
            {t('fullName')}
            <RequiredFieldMark />
          </label>
          <input 
            type="text" 
            placeholder="Ex: Company Name..."
            value={partner.name} 
            onChange={(e) => updateField(`${path}.name`, e.target.value)} 
            className={`w-full p-3 border rounded font-medium text-slate-100 placeholder-slate-600 focus:outline-none focus:border-slate-600 transition-colors bg-slate-900 border-slate-700 focus:border-slate-600`} 
          />
          {getFieldError(`${path}.name`) && (
            <FieldValidationError error={getFieldError(`${path}.name`)} />
          )}
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
          <p className="text-xs text-slate-500 mt-1">Select identifier type</p>
        </div>
        <div>
          <label className="flex items-center gap-1 text-xs font-medium text-slate-400 mb-2">
            {t('idValue')}
            <RequiredFieldMark />
          </label>
          <input 
            type="text" 
            placeholder="0000000XAM000"
            value={partner.idValue} 
            onChange={(e) => updateField(`${path}.idValue`, e.target.value.toUpperCase())} 
            className="w-full p-3 border rounded font-mono text-sm font-medium tracking-wider focus:outline-none transition-colors bg-slate-900 text-slate-100 placeholder-slate-600 border-slate-700 focus:border-slate-600" 
          />
          {getFieldError(`${path}.idValue`) && (
            <FieldValidationError error={getFieldError(`${path}.idValue`)} />
          )}
          <p className="text-xs text-slate-500 mt-1">
            {partner.idType === 'I-01' && 'Tunisian Tax ID: 8-10 digits (e.g., 0000000XAM)'}
            {partner.idType === 'I-02' && 'Tunisian ID: 8 digits'}
            {partner.idType === 'I-03' && 'Passport: alphanumeric'}
            {partner.idType === 'I-04' && 'EU VAT: 2 letters + numbers (e.g., FR12345678901)'}
          </p>
        </div>
        {isBusiness && (
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">{t('rc')}</label>
              <input type="text" placeholder="B123452024" value={partner.rc || ''} onChange={(e) => updateField(`${path}.rc`, e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-900 font-mono text-xs font-medium focus:outline-none focus:border-slate-600 transition-colors text-slate-100" />
              <p className="text-xs text-slate-500 mt-1">Business registration number (optional)</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">{t('capital')}</label>
              <input type="text" placeholder="10.000,000" value={partner.capital || ''} onChange={(e) => updateField(`${path}.capital`, e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-900 text-xs font-medium focus:outline-none focus:border-slate-600 transition-colors text-slate-100" />
              <p className="text-xs text-slate-500 mt-1">Capital amount (optional)</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 space-y-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-2">{t('address')}</label>
          <input type="text" placeholder="Complete address..." value={partner.addressDescription} onChange={(e) => updateField(`${path}.addressDescription`, e.target.value)} className="w-full p-3 border border-slate-700 rounded bg-slate-900 text-sm font-medium focus:outline-none focus:border-slate-600 transition-colors text-slate-100 placeholder-slate-600" />
          <p className="text-xs text-slate-500 mt-1">Full address description (optional)</p>
        </div>
        <div>
          <label className="flex items-center gap-1 text-xs font-medium text-slate-400 mb-2">
            {t('city')}
            <RequiredFieldMark />
          </label>
          <input 
            type="text" 
            value={partner.city} 
            onChange={(e) => updateField(`${path}.city`, e.target.value)} 
            className="w-full p-3 border rounded text-sm font-medium focus:outline-none transition-colors bg-slate-900 text-slate-100 placeholder-slate-600 border-slate-700 focus:border-slate-600" 
          />
          {getFieldError(`${path}.city`) && (
            <FieldValidationError error={getFieldError(`${path}.city`)} />
          )}
          <p className="text-xs text-slate-500 mt-1">Max 50 characters</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Country</label>
            <input type="text" maxLength={2} value={partner.country} onChange={(e) => updateField(`${path}.country`, e.target.value.toUpperCase())} className="w-full p-3 border border-slate-700 rounded bg-slate-900 font-mono text-center text-sm font-medium focus:outline-none focus:border-slate-600 transition-colors text-slate-100" placeholder="TN" />
            <p className="text-xs text-slate-500 mt-1">ISO 2-letter code</p>
          </div>
          <div>
            <label className="flex items-center gap-1 text-xs font-medium text-slate-400 mb-2">
              {t('postalCode')}
              <RequiredFieldMark />
            </label>
            <input 
              type="text" 
              value={partner.postalCode || ''} 
              onChange={(e) => updateField(`${path}.postalCode`, e.target.value)} 
              className="w-full p-3 border rounded font-mono text-center text-sm font-medium focus:outline-none transition-colors bg-slate-900 text-slate-100 placeholder-slate-600 border-slate-700 focus:border-slate-600" 
              placeholder="1000"
            />
            {getFieldError(`${path}.postalCode`) && (
              <FieldValidationError error={getFieldError(`${path}.postalCode`)} />
            )}
            <p className="text-xs text-slate-500 mt-1">Max 10 chars</p>
          </div>
        </div>
      </div>

      {/* Contact information */}
      <div className="pt-4 border-t border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">Email</label>
          <input 
            type="email" 
            placeholder="contact@example.com"
            value={partner.email || ''} 
            onChange={(e) => updateField(`${path}.email`, e.target.value)} 
            className="w-full p-3 border border-slate-700 rounded bg-slate-900 text-sm font-medium focus:outline-none focus:border-slate-600 transition-colors text-slate-100 placeholder-slate-600" 
          />
          <p className="text-xs text-slate-500 mt-1">user@example.com (optional)</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">Phone</label>
          <input 
            type="tel" 
            placeholder="+216 XX XXX XXX"
            value={partner.phone || ''} 
            onChange={(e) => updateField(`${path}.phone`, e.target.value)} 
            className="w-full p-3 border border-slate-700 rounded bg-slate-900 text-sm font-medium focus:outline-none focus:border-slate-600 transition-colors text-slate-100 placeholder-slate-600" 
          />
          <p className="text-xs text-slate-500 mt-1">8-15 digits (optional)</p>
        </div>
      </div>
    </section>
  );
};

interface Props {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
  lang: Language;
  onSave?: () => void;
  validationErrors?: FieldError[];
}

const InvoiceForm: React.FC<Props> = ({ data, onChange, lang, onSave, validationErrors = [] }) => {
  const t = useTranslation(lang);
  
  const getFieldError = (fieldPath: string): FieldError | undefined => {
    return validationErrors.find(e => e.field === fieldPath);
  };
  
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
  const visibility = useConditionalFields(data);

  return (
    <div className="space-y-8">

      {/* SECTION 1: DOCUMENT METADATA (Bgm - Document Identification) */}
      <FormSection 
        title={t('docDetails')} 
        description="TEIF 1.8.8 Standard - Document type and basic identification"
        badge={{ label: "Required", variant: "default" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            label={t('docType')}
            value={data.documentType}
            onValueChange={(value) => updateField('documentType', value as DocTypeCode)}
            options={Object.entries(DOCUMENT_TYPES).map(([code, label]) => ({
              value: code,
              label: `${code} — ${label.toUpperCase()}`
            }))}
            required
            error={getFieldError('documentType')?.message}
          />
          <FormSelect
            label={t('opNature')}
            value={data.operationNature}
            onValueChange={(value) => updateField('operationNature', value)}
            options={[
              { value: 'GOODS', label: t('opGoods') },
              { value: 'SERVICES', label: t('opServices') },
              { value: 'MIXED', label: t('opMixed') }
            ]}
            required
            error={getFieldError('operationNature')?.message}
          />
          <FormSelect
            label={t('currencyLabel')}
            value={data.currency}
            onValueChange={(value) => updateField('currency', value)}
            options={[
              { value: 'TND', label: 'TND (Tunisian Dinar)' },
              { value: 'EUR', label: 'EUR (Euro)' },
              { value: 'USD', label: 'USD (US Dollar)' }
            ]}
            required
            error={getFieldError('currency')?.message}
          />
          <FormInput
            label={t('docNumber')}
            placeholder="F-2024-0001"
            value={data.documentNumber}
            onChange={(e) => updateField('documentNumber', e.target.value)}
            required
            error={getFieldError('documentNumber')?.message}
            description="Alphanumeric with hyphens/slashes only (max 30 chars)"
          />
          {visibility.showOrderReference && (
            <FormInput
              label="Order Reference (I-121)"
              placeholder="PO-2024-001"
              value={data.orderReference || ''}
              onChange={(e) => updateField('orderReference', e.target.value)}
              description="For PO and contracts"
            />
          )}
          {visibility.showContractReference && (
            <FormInput
              label="Contract Reference (I-123)"
              placeholder="CTR-2024-001"
              value={data.contractReference || ''}
              onChange={(e) => updateField('contractReference', e.target.value)}
              description="For public contract documents"
            />
          )}
          {visibility.showCreditReason && (
            <FormInput
              label="Credit Reason (I-124)"
              placeholder="Reason for credit note"
              value={data.creditReason || ''}
              onChange={(e) => updateField('creditReason', e.target.value)}
              description="Mandatory for credit notes"
            />
          )}
        </div>
      </FormSection>

      {/* SECTION 2: DATES (Dtm - All date information I-31 through I-38) */}
      <FormSection 
        title={t('invoiceDates')}
        description="TEIF 1.8.8 - Date information (I-31 through I-38)"
        badge={{ label: "Required", variant: "default" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label={t('issueDate')}
            type="date"
            value={data.invoiceDate}
            onChange={(e) => updateField('invoiceDate', e.target.value)}
            required
            error={getFieldError('invoiceDate')?.message}
            description="Invoice date in YYYY-MM-DD format"
          />
          {visibility.showDueDate && (
            <FormInput
              label={t('dueDate')}
              type="date"
              value={data.dueDate || ''}
              onChange={(e) => updateField('dueDate', e.target.value)}
              required
              error={getFieldError('dueDate')?.message}
              description="Payment deadline (after invoice date)"
            />
          )}
          {visibility.showDeliveryDate && (
            <FormInput
              label={t('deliveryDate')}
              type="date"
              value={data.deliveryDate || ''}
              onChange={(e) => updateField('deliveryDate', e.target.value)}
              description="When goods are delivered"
            />
          )}
          {visibility.showServicePeriod && (
            <>
              <FormInput
                label={t('servicePeriodStart')}
                type="date"
                value={data.periodStart || ''}
                onChange={(e) => updateField('periodStart', e.target.value)}
                description="Service period start"
              />
              <FormInput
                label={t('servicePeriodEnd')}
                type="date"
                value={data.periodEnd || ''}
                onChange={(e) => updateField('periodEnd', e.target.value)}
                description="Service period end"
              />
            </>
          )}
          {visibility.showDispatchDate && (
            <FormInput
              label={t('dispatchDate')}
              type="date"
              value={data.dispatchDate || ''}
              onChange={(e) => updateField('dispatchDate', e.target.value)}
              description="When goods are dispatched"
            />
          )}
          <FormInput
            label={t('paymentDateLabel')}
            type="date"
            value={data.paymentDate || ''}
            onChange={(e) => updateField('paymentDate', e.target.value)}
            description="Expected payment date"
          />
          <FormInput
            label={t('signatureDate')}
            type="text"
            maxLength={10}
            value={data.signatureDate || ''}
            onChange={(e) => updateField('signatureDate', e.target.value)}
            description="Format: DDMMYYHHmm (e.g., 1001261430 = 10/01/26 14:30)"
            helper="Optional: Signature date and time"
          />
          <FormInput
            label={t('otherDate')}
            type="date"
            value={data.otherDate || ''}
            onChange={(e) => updateField('otherDate', e.target.value)}
            description="Any other relevant date"
          />
        </div>
      </FormSection>

      {/* SECTION 3: PARTNER INFORMATION (Rff - Party Information) */}
      <FormSection 
        title={t('partnerInfo')} 
        description="TEIF 1.8.8 - Supplier and Buyer details"
        badge={{ label: "Required", variant: "default" }}
        className="md:col-span-2"
      >
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-r border-slate-700 pr-8 space-y-4">
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-slate-700 text-slate-200 flex items-center justify-center text-xs font-semibold">S</span>
              {t('supplier')}
            </h3>
            <PartnerForm title={t('supplier')} path="supplier" partner={data.supplier} step="03a" updateField={updateField} lang={lang} validationErrors={validationErrors} />
          </div>
          <div className="border-l border-slate-700 pl-8 space-y-4">
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-slate-700 text-slate-200 flex items-center justify-center text-xs font-semibold">B</span>
              {t('buyer')}
            </h3>
            <PartnerForm title={t('buyer')} path="buyer" partner={data.buyer} step="03b" updateField={updateField} lang={lang} validationErrors={validationErrors} />
          </div>
        </div>
      </FormSection>

      {/* SECTION 4: LINE ITEMS (Lin - Invoice Line Items) */}
      <section className="bg-gradient-to-br from-slate-800/80 via-slate-800/50 to-slate-900/80 border border-slate-700/50 backdrop-blur-sm p-8 space-y-8 rounded-xl shadow-xl shadow-slate-900/30 hover:shadow-slate-900/50 transition-all duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-700/30 pb-8">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-4 group">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-600/90 to-purple-600/90 border border-violet-500/30 rounded-lg flex items-center justify-center text-white font-mono text-lg font-semibold shadow-lg shadow-violet-600/20 group-hover:shadow-violet-600/40 transition-all duration-300">04</div>
            <div className="flex flex-col">
              <span className="tracking-tight">{t('invoiceLines')}</span>
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
      <FormSection 
        title={t('allowancesCharges')} 
        description="Invoice-level discounts, surcharges, and allowances (I-150 to I-155)"
        badge={{ label: "Optional", variant: "secondary" }}
      >
        <div className="md:col-span-2">
          <button
            onClick={() => setExpandedSections({...expandedSections, allowances: !expandedSections.allowances})}
            className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600 rounded-lg font-medium text-sm transition-colors flex items-center justify-between"
          >
            <span>{t('allowancesCharges')}</span>
            <span>{expandedSections.allowances ? '▼' : '▶'}</span>
          </button>
          
          {expandedSections.allowances && (
            <div className="mt-4 space-y-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
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
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded font-medium text-sm transition-colors"
              >
                + Add Allowance/Charge
              </button>

              {data.allowances && data.allowances.length > 0 ? (
                <div className="space-y-3">
                  {data.allowances.map((alc) => (
                    <div key={alc.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 bg-slate-900 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors">
                      <select 
                        value={alc.type} 
                        onChange={(e) => {
                          const updated = data.allowances!.map(a => a.id === alc.id ? {...a, type: e.target.value as any} : a);
                          onChange({...data, allowances: updated});
                        }}
                        className="px-3 py-2 border border-slate-700 rounded bg-slate-800 text-sm text-slate-100 focus:outline-none focus:border-slate-600 transition-colors cursor-pointer"
                      >
                        <option value="allowance">Allowance</option>
                        <option value="charge">Charge</option>
                      </select>
                      <input 
                        type="text" 
                        value={alc.description} 
                        onChange={(e) => {
                          const updated = data.allowances!.map(a => a.id === alc.id ? {...a, description: e.target.value} : a);
                          onChange({...data, allowances: updated});
                        }}
                        placeholder="Description"
                        className="px-3 py-2 border border-slate-700 rounded bg-slate-800 text-sm text-slate-100 focus:outline-none focus:border-slate-600 transition-colors placeholder-slate-500"
                      />
                      <input 
                        type="number" 
                        step="0.001" 
                        value={alc.amount} 
                        onChange={(e) => {
                          const updated = data.allowances!.map(a => a.id === alc.id ? {...a, amount: parseFloat(e.target.value) || 0} : a);
                          onChange({...data, allowances: updated});
                        }}
                        placeholder="0.00"
                        className="px-3 py-2 border border-slate-700 rounded bg-slate-800 text-sm text-slate-100 text-right font-mono focus:outline-none focus:border-slate-600 transition-colors placeholder-slate-500"
                      />
                      <button
                        onClick={() => {
                          const updated = data.allowances!.filter(a => a.id !== alc.id);
                          onChange({...data, allowances: updated});
                        }}
                        className="px-3 py-2 bg-slate-700 hover:bg-red-600/20 text-slate-300 hover:text-red-400 rounded text-sm font-medium transition-colors"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 text-center py-3">No allowances added</p>
              )}
            </div>
          )}
        </div>
      </FormSection>

      {/* SECTION 6: PAYMENT, BANK & FINANCIAL SUMMARY (Pyt, Bnk, Moa) */}
      <FormSection 
        title={t('paymentFinancialSummary')}
        description="Payment method, banking details, and invoice totals (I-111 through I-180)"
        badge={{ label: "Required", variant: "default" }}
      >
        <FormSelect
          label={t('paymentMeans')}
          value={data.paymentMeans}
          onValueChange={(value) => updateField('paymentMeans', value)}
          options={Object.entries(PAYMENT_MEANS).map(([code, label]) => ({
            value: code,
            label: `${code} - ${label.toUpperCase()}`
          }))}
          required
        />
        <FormInput
          label={t('ttnHash')}
          type="text"
          maxLength={26}
          value={data.ttnReference}
          onChange={(e) => updateField('ttnReference', e.target.value)}
          placeholder="26-character hash"
        />
        {visibility.showGlobalDiscount && (
          <FormInput
            label="Discount Amount"
            type="number"
            step="0.001"
            value={data.globalDiscount}
            onChange={(e) => updateField('globalDiscount', parseFloat(e.target.value) || 0)}
            description="Invoice-level discount"
          />
        )}
        {visibility.showStampDuty && (
          <FormInput
            label="Stamp Duty (I-178)"
            type="number"
            step="0.001"
            value={data.stampDuty}
            onChange={(e) => updateField('stampDuty', parseFloat(e.target.value) || 0)}
            description="Droit de timbre"
          />
        )}

        {visibility.showBankingDetails && (
          <>
            <FormInput
              label="Bank Code (I-114)"
              type="text"
              maxLength={5}
              placeholder="00000"
              value={data.bankCode || ''}
              onChange={(e) => updateField('bankCode', e.target.value)}
              description="Bank clearing/code"
            />
            <FormInput
              label="Bank Name"
              type="text"
              placeholder="Bank of Tunisia"
              value={data.bankName || ''}
              onChange={(e) => updateField('bankName', e.target.value)}
              description="Institution name"
              required
            />
            <FormInput
              label="Account Owner"
              type="text"
              placeholder="Owner Name"
              value={data.bankAccountOwner || ''}
              onChange={(e) => updateField('bankAccountOwner', e.target.value)}
              description="Account holder name"
              required
            />
            <FormInput
              label="RIB Account (I-814)"
              type="text"
              maxLength={20}
              placeholder="00000000000000000000"
              value={data.bankRib || ''}
              onChange={(e) => updateField('bankRib', e.target.value)}
              description="20-digit account number"
              error={data.bankRib && !isRibValid ? 'Invalid RIB (must be 20 digits with valid checksum)' : ''}
              helper={isRibValid ? '✓ Valid RIB' : ''}
              required
            />
          </>
        )}

        {visibility.showCheckNumber && (
          <FormInput
            label="Check Number (I-117)"
            type="text"
            placeholder="CHK-2024-001"
            value={data.checkNumber || ''}
            onChange={(e) => updateField('checkNumber', e.target.value)}
            required
          />
        )}

        {visibility.showCardDetails && (
          <>
            <FormSelect
              label="Card Type (I-118)"
              value={data.cardType || 'VISA'}
              onValueChange={(value) => updateField('cardType', value)}
              options={[
                { value: 'VISA', label: 'VISA' },
                { value: 'MASTERCARD', label: 'MasterCard' },
                { value: 'AMEX', label: 'American Express' },
              ]}
              required
            />
            <FormInput
              label="Last 4 Digits (I-118)"
              type="text"
              maxLength={4}
              placeholder="0000"
              value={data.cardLast4 || ''}
              onChange={(e) => updateField('cardLast4', e.target.value.replace(/\D/g, ''))}
              description="Last 4 digits of card"
              required
            />
            <FormInput
              label="Authorization Code (I-118)"
              type="text"
              placeholder="AUTH123456"
              value={data.cardReference || ''}
              onChange={(e) => updateField('cardReference', e.target.value)}
              description="Transaction/authorization reference code"
              required
            />
          </>
        )}

        {visibility.showPostalDetails && (
          <>
            <FormInput
              label="Postal Account Number (I-115)"
              type="text"
              placeholder="0120021241115530"
              value={data.postalAccountNumber || ''}
              onChange={(e) => updateField('postalAccountNumber', e.target.value)}
              description="Postal account for payment"
              required
            />
            <FormInput
              label="Postal Account Owner"
              type="text"
              placeholder="Account Holder Name"
              value={data.postalAccountOwner || ''}
              onChange={(e) => updateField('postalAccountOwner', e.target.value)}
              required
            />
            <FormInput
              label="Postal Branch Code"
              type="text"
              maxLength={4}
              placeholder="0760"
              value={data.postalBranchCode || ''}
              onChange={(e) => updateField('postalBranchCode', e.target.value)}
              required
            />
            <FormInput
              label="Postal Service Name"
              type="text"
              placeholder="La Poste"
              value={data.postalServiceName || ''}
              onChange={(e) => updateField('postalServiceName', e.target.value)}
              description="Optional: Postal service provider"
            />
          </>
        )}

        {visibility.showEPaymentDetails && (
          <>
            <FormInput
              label="Payment Gateway (I-119)"
              type="text"
              placeholder="PayPal, Stripe, etc."
              value={data.ePaymentGateway || ''}
              onChange={(e) => updateField('ePaymentGateway', e.target.value)}
              description="Payment gateway provider"
              required
            />
            <FormInput
              label="Transaction ID"
              type="text"
              placeholder="TXN123456789"
              value={data.ePaymentTransactionId || ''}
              onChange={(e) => updateField('ePaymentTransactionId', e.target.value)}
              description="Transaction reference from gateway"
              required
            />
          </>
        )}

        {visibility.showOtherPaymentDetails && (
          <>
            <FormInput
              label="Payment Method Description (I-120)"
              type="text"
              placeholder="Description of payment method"
              value={data.otherPaymentDescription || ''}
              onChange={(e) => updateField('otherPaymentDescription', e.target.value)}
              description="Describe the payment method"
              required
            />
            <FormInput
              label="Payment Reference"
              type="text"
              placeholder="Payment reference or confirmation"
              value={data.otherPaymentReference || ''}
              onChange={(e) => updateField('otherPaymentReference', e.target.value)}
              description="Reference code or confirmation number"
              required
            />
          </>
        )}
      </FormSection>

      {/* CALCULATION SECTION - Invoice Summary */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-700 pb-6">
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3v3m-6-1v-3m0-6h12a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" />
            </svg>
            {t('invoiceCalculationSummary')}
          </h2>
        </div>

        {/* Calculation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT COLUMN: Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 px-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t('subtotalHt')}</span>
              <span className="font-bold text-slate-100">{totals.ht.toFixed(3)}</span>
            </div>

            {data.globalDiscount > 0 && (
              <div className="flex justify-between items-center py-3 px-4 bg-red-500/10 rounded-lg border border-red-500/30">
                <span className="text-xs font-medium text-red-400 uppercase tracking-wider">{t('allowancesCharges')} (I-181)</span>
                <span className="font-bold text-red-300">-{data.globalDiscount.toFixed(3)}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-3 px-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t('netTotalHt')}</span>
              <span className="font-bold text-slate-100">{totals.netTotalHt.toFixed(3)}</span>
            </div>

            {totals.fodec > 0 && (
              <div className="flex justify-between items-center py-3 px-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
                <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">{t('fodec')} (1%)</span>
                <span className="font-bold text-amber-300">+{totals.fodec.toFixed(3)}</span>
              </div>
            )}

            {totals.tva > 0 && (
              <div className="flex justify-between items-center py-3 px-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">{t('tvaLabel')}</span>
                <span className="font-bold text-emerald-300">+{totals.tva.toFixed(3)}</span>
              </div>
            )}

            {data.stampDuty > 0 && (
              <div className="flex justify-between items-center py-3 px-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">{t('stampDutyLabel')}</span>
                <span className="font-bold text-purple-300">+{data.stampDuty.toFixed(3)}</span>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Final Amount */}
          <div className="space-y-4 flex flex-col justify-center">
            <div className="p-6 bg-gradient-to-br from-blue-600/20 to-blue-700/10 rounded-2xl border border-blue-500/40 space-y-4">
              <div className="text-[11px] text-blue-400 font-black uppercase tracking-[0.5em]">{t('totalAmountTtc')}</div>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-black tabular-nums tracking-tighter text-slate-100">{totals.totalTtc.toFixed(3)}</span>
                <span className="text-xl font-black text-slate-500">{data.currency}</span>
              </div>
              
              {/* Amount in Words */}
              <div className="pt-4 border-t border-slate-700/50">
                <div className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-2">{t('amountLetters')}</div>
                <div className="text-sm font-semibold text-slate-200 italic capitalize leading-relaxed">
                  {calculatedLetters}
                </div>
              </div>
            </div>

            {/* QR Code Display */}
            {data.qrCodeEnabled && qrString && (
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <div className="text-[9px] text-slate-600 font-bold uppercase tracking-wider mb-2">QR Code (TTN Reference)</div>
                <div className="bg-black p-2 rounded" style={{fontSize: 0}}>
                  {/* QR visualization - uses the qrString */}
                  <div className="text-[9px] text-slate-600 font-mono text-center p-2">TTN: {qrString.substring(0, 20)}...</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tax Summary Table */}
        {Object.keys(data.lines || []).length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="text-sm font-semibold text-slate-300 mb-3">{t('taxRateBreakdown')}</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-700">
                    <th className="py-2 px-3">{t('rate')}</th>
                    <th className="py-2 px-3 text-right">{t('base')}</th>
                    <th className="py-2 px-3 text-right">{t('taxAmount')}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.lines
                    .reduce((acc, line) => {
                      const rate = (line.taxRate * 100).toFixed(0) + '%';
                      const existing = acc.find(r => r.rate === rate);
                      const base = line.quantity * line.unitPrice * (1 - line.discountRate / 100);
                      const taxAmount = base * line.taxRate;
                      if (existing) {
                        existing.base += base;
                        existing.amount += taxAmount;
                      } else {
                        acc.push({ rate, base, amount: taxAmount });
                      }
                      return acc;
                    }, [] as Array<{rate: string, base: number, amount: number}>)
                    .map((row) => (
                      <tr key={row.rate} className="border-b border-slate-700 hover:bg-slate-800/30">
                        <td className="py-2 px-3 font-medium text-slate-300">{row.rate}</td>
                        <td className="py-2 px-3 text-right text-slate-400">{row.base.toFixed(3)}</td>
                        <td className="py-2 px-3 text-right font-bold text-slate-200">{row.amount.toFixed(3)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <footer className="py-12 space-y-6 border-t border-slate-700 pt-8">
        {/* Save Action Button */}
        {onSave && (
          <div className="flex justify-center">
            <button
              onClick={onSave}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Save Invoice
            </button>
          </div>
        )}

        <div className="text-center space-y-4">
          <div className="inline-block px-10 py-3 bg-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-[0.6em] border border-slate-200 shadow-sm">
            Tunisian Electronic Invoice Engine v1.8.8 Standard
          </div>
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Conformité avec les exigences de la plateforme TTN</p>
        </div>
      </footer>
    </div>
  );
};

export default InvoiceForm;
