import React, { useRef } from 'react';
import { ViewMode } from '../types';
import {
  FileCode,
  Eye,
  Edit3,
  Palette,
  Download,
  Printer,
  Copy,
  Check,
  FileText,
  Upload,
  BookOpen,
} from 'lucide-react';
import { SAMPLE_TEMPLATES } from '../data/sampleTemplates';

interface NavbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  documentTitle: string;
  setDocumentTitle: (title: string) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectTemplate: (templateId: string) => void;
  onDownloadPdf: () => void;
  onDownloadHtml: () => void;
  onPrint: () => void;
  onCopyCode: () => void;
  isGeneratingPdf: boolean;
  copied: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  setViewMode,
  documentTitle,
  setDocumentTitle,
  onFileUpload,
  onSelectTemplate,
  onDownloadPdf,
  onDownloadHtml,
  onPrint,
  onCopyCode,
  isGeneratingPdf,
  copied,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col gap-3">
          
          {/* Top Row: Brand, Document Name, Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Brand Identity & Document Title Input */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                <FileText className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold tracking-tight text-white">DataLens Studio</h1>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono border border-blue-500/30">
                    Reusable .MD
                  </span>
                </div>
                
                {/* Editable Document Title Input */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] text-slate-400">Archivo:</span>
                  <input
                    type="text"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    placeholder="Nombre del documento"
                    title="Haz clic para cambiar el nombre con el que se guardará el PDF/HTML"
                    className="bg-slate-800/80 hover:bg-slate-800 focus:bg-slate-950 text-xs text-blue-300 font-medium px-2 py-0.5 rounded border border-slate-700/80 focus:border-blue-500 focus:outline-none transition-all w-48 sm:w-60"
                  />
                  <span className="text-[11px] font-mono text-slate-500">.pdf / .html</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Export Buttons */}
            <div className="flex items-center flex-wrap gap-2">
              
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.markdown,.txt"
                onChange={onFileUpload}
                className="hidden"
              />

              {/* Upload Button */}
              <button
                onClick={handleUploadClick}
                title="Cargar cualquier archivo .md o .txt local"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-emerald-600/20 border border-emerald-400/30 transition-all active:scale-95"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Subir .md</span>
              </button>

              {/* Template Selector Dropdown */}
              <div className="relative flex items-center">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      onSelectTemplate(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    📖 Cargar Ejemplos...
                  </option>
                  {SAMPLE_TEMPLATES.map((tmpl) => (
                    <option key={tmpl.id} value={tmpl.id}>
                      {tmpl.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="h-4 w-px bg-slate-800 hidden sm:block" />

              <button
                onClick={onCopyCode}
                title="Copiar HTML al Portapapeles"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-all active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? '¡Copiado!' : 'Copiar HTML'}</span>
              </button>

              <button
                onClick={onDownloadHtml}
                title="Descargar archivo HTML autocontenido"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>HTML</span>
              </button>

              <button
                onClick={onPrint}
                title="Imprimir o PDF Nativo del Navegador"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-all active:scale-95"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Imprimir</span>
              </button>

              <button
                onClick={onDownloadPdf}
                disabled={isGeneratingPdf}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-blue-600/30 border border-blue-400/30 transition-all active:scale-95 disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isGeneratingPdf ? 'Generando PDF...' : 'Descargar PDF'}</span>
              </button>

            </div>

          </div>

          {/* Bottom Row: View Mode Switcher */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
            <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/50">
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'preview'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Vista Previa</span>
              </button>

              <button
                onClick={() => setViewMode('code')}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'code'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Código HTML</span>
              </button>

              <button
                onClick={() => setViewMode('editor')}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'editor'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editor Markdown</span>
              </button>

              <button
                onClick={() => setViewMode('customizer')}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'customizer'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Tema & Estilos</span>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Puedes arrastrar cualquier archivo .md a la pantalla</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
