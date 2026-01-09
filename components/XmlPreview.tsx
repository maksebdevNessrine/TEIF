
import React, { useState } from 'react';

interface Props {
  xml: string;
  minifiedXml: string;
}

const XmlPreview: React.FC<Props> = ({ xml, minifiedXml }) => {
  const [copied, setCopied] = useState(false);
  const [showMinified, setShowMinified] = useState(false);

  const activeXml = showMinified ? minifiedXml : xml;

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

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 bg-slate-800 text-slate-400 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            <span className="text-sm font-bold uppercase tracking-wider">TEIF 1.8.8 Output</span>
          </div>
          <label className="flex items-center gap-2 text-xs cursor-pointer bg-slate-700 px-3 py-1 rounded-full border border-slate-600 hover:bg-slate-600 transition-colors">
            <input 
              type="checkbox" 
              checked={showMinified} 
              onChange={(e) => setShowMinified(e.target.checked)}
              className="accent-blue-500"
            />
            <span>Minify (Unpretty)</span>
          </label>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="text-xs hover:text-white transition-colors bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg flex items-center gap-2"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button 
            onClick={handleDownload}
            className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
          >
            Download XML
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-slate-900 p-6">
        {showMinified ? (
          <code className="text-sm font-mono text-emerald-400 break-all">{activeXml}</code>
        ) : (
          <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap break-all leading-relaxed">
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
