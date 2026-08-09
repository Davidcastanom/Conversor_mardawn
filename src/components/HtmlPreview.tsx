import React, { useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, FileCheck, Info } from 'lucide-react';

interface HtmlPreviewProps {
  htmlContent: string;
  pdfStatusMessage: string | null;
}

export const HtmlPreview: React.FC<HtmlPreviewProps> = ({ htmlContent, pdfStatusMessage }) => {
  const [zoom, setZoom] = React.useState<number>(100);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 60));
  const handleZoomReset = () => setZoom(100);

  return (
    <div className="flex flex-col h-full bg-slate-950/40 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      
      {/* Control Sub-bar */}
      <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Vista Previa del Documento Renderizado</span>
          <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[11px] font-mono border border-slate-700">
            A4 Standard Sheet Layout
          </span>
        </div>

        {/* Status Toast */}
        {pdfStatusMessage && (
          <div className="flex items-center gap-2 bg-blue-500/10 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs animate-fade-in">
            <Info className="w-3.5 h-3.5 animate-spin" />
            <span>{pdfStatusMessage}</span>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60">
          <button
            onClick={handleZoomOut}
            title="Reducir Zoom"
            className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] w-12 text-center text-slate-300">{zoom}%</span>
          <button
            onClick={handleZoomIn}
            title="Aumentar Zoom"
            className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomReset}
            title="Restablecer 100%"
            className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors border-l border-slate-700 ml-0.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Document Render Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-slate-950/60 custom-scrollbar">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="w-full max-w-[920px]"
        >
          {/* Paper Sheet Document Container */}
          <div
            id="printable-document"
            ref={containerRef}
            className="bg-white rounded-xl shadow-2xl overflow-hidden text-slate-900 border border-slate-200"
          >
            <iframe
              title="Rendered Document HTML"
              srcDoc={htmlContent}
              className="w-full min-h-[1200px] border-none"
              style={{
                width: '100%',
                height: '100%',
                minHeight: '1400px',
                background: 'transparent',
              }}
              onLoad={(e) => {
                // Adjust iframe height dynamically to match content height
                const iframe = e.currentTarget;
                if (iframe.contentWindow?.document.body) {
                  const contentHeight = iframe.contentWindow.document.body.scrollHeight;
                  iframe.style.height = `${Math.max(contentHeight + 60, 1400)}px`;
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-900 px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
          Documento HTML válido con CSS integrado y tipografía Plus Jakarta Sans
        </span>
        <span className="font-mono text-slate-500">UTF-8 Standalone Document</span>
      </div>

    </div>
  );
};
