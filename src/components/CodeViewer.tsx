import React, { useState } from 'react';
import { Copy, Check, Download, Code, Sparkles, CheckCircle2 } from 'lucide-react';

interface CodeViewerProps {
  htmlContent: string;
  onCopy: () => void;
  onDownloadHtml: () => void;
  copied: boolean;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  htmlContent,
  onCopy,
  onDownloadHtml,
  copied,
}) => {
  const [copiedBadge, setCopiedBadge] = useState(false);

  const lines = htmlContent.split('\n');

  const handleCopyCode = () => {
    onCopy();
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      
      {/* Code Header Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-slate-200">DataLens_Documentacion.html</span>
          <span className="bg-blue-500/10 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded text-[11px] font-mono">
            {lines.length} líneas
          </span>
          <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px] font-mono">
            Styles Embebidos &lt;style&gt;
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg border border-slate-700 transition-all active:scale-95"
          >
            {copiedBadge ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedBadge ? '¡Código Copiado!' : 'Copiar Código HTML'}</span>
          </button>

          <button
            onClick={onDownloadHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-sm transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar .html</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 font-mono text-xs text-slate-300 leading-relaxed custom-scrollbar">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                <td className="w-12 text-right pr-4 text-slate-600 select-none border-r border-slate-800/80 font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="pl-4 whitespace-pre text-slate-200">
                  {highlightHtmlLine(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Footer Banner */}
      <div className="bg-slate-900 px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Documento Standalone listo para abrir directamente en cualquier navegador
        </span>
        <span className="font-mono text-slate-500">HTML5 + CSS3 Embedded</span>
      </div>

    </div>
  );
};

// Basic syntax colorizer helper
function highlightHtmlLine(line: string) {
  if (line.trim().startsWith('<!DOCTYPE') || line.trim().startsWith('<html') || line.trim().startsWith('</html>')) {
    return <span className="text-amber-400 font-bold">{line}</span>;
  }
  if (line.includes('<style>') || line.includes('</style>')) {
    return <span className="text-purple-400 font-semibold">{line}</span>;
  }
  if (line.includes('<h1') || line.includes('<h2') || line.includes('<h3')) {
    return <span className="text-blue-400">{line}</span>;
  }
  if (line.includes('<table') || line.includes('<thead') || line.includes('<tbody')) {
    return <span className="text-emerald-400">{line}</span>;
  }
  if (line.includes('var(') || line.includes(':root')) {
    return <span className="text-cyan-300">{line}</span>;
  }
  return <span>{line}</span>;
}
