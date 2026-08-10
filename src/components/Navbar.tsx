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
  Home,
  Store,
  BookOpen,
  ExternalLink,
  FileDown,
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
  onDownloadMarkdown: () => void;
  onOpenGuide: () => void;
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
  onDownloadMarkdown,
  onOpenGuide,
  onPrint,
  onCopyCode,
  isGeneratingPdf,
  copied,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Hidden File Input shared by both modes
  const hiddenFileInput = (
    <input
      ref={fileInputRef}
      type="file"
      accept=".md,.markdown,.txt"
      onChange={(e) => {
        onFileUpload(e);
        if (viewMode === 'landing') {
          setViewMode('editor');
        }
      }}
      className="hidden"
    />
  );

  /* ----------------------------------------------------
   * LANDING PAGE HEADER (Clean, Minimal & High Impact)
   * ---------------------------------------------------- */
  if (viewMode === 'landing') {
    return (
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md text-white border-b border-slate-800/80 shadow-lg">
        {hiddenFileInput}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Creator Badge */}
          <button
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                  MarkFlow Studio
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-semibold border border-blue-500/30">
                  por Flujo Base
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Conversor & Editor Universal Markdown</p>
            </div>
          </button>

          {/* Landing Navigation & Quick Action Access */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenGuide}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Guía MD</span>
            </button>

            <button
              onClick={handleUploadClick}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all active:scale-95"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Subir .MD</span>
              <span className="sm:hidden">Subir</span>
            </button>

            <button
              onClick={() => setViewMode('editor')}
              className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg shadow-md shadow-blue-600/20 border border-blue-400/30 transition-all active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-300" />
              <span>Abrir Editor</span>
            </button>
          </div>

        </div>
      </header>
    );
  }

  /* ----------------------------------------------------
   * INNER WORKSPACE HEADER (Editor, Preview, Code, Customizer)
   * Unified single header with Document Title, View Mode Tabs & Actions
   * ---------------------------------------------------- */
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-xl">
      {hiddenFileInput}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        
        {/* ROW 1: Brand & Document Title + View Navigation Tabs + Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Left: Brand Identity & Title Input */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setViewMode('landing')}
              className="flex items-center gap-2 group"
              title="Volver a la Portada de Inicio"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-amber-300 transition-colors">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors hidden sm:inline">
                MarkFlow
              </span>
            </button>

            <div className="h-5 w-px bg-slate-800" />

            {/* Editable Document Title Input */}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="Nombre del documento"
                title="Haz clic para cambiar el nombre del archivo PDF/HTML"
                className="bg-slate-950/80 hover:bg-slate-950 focus:bg-slate-950 text-xs text-blue-300 font-semibold px-2.5 py-1 rounded-lg border border-slate-700/80 focus:border-blue-500 focus:outline-none transition-all w-36 sm:w-48"
              />
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">.pdf / .html</span>
            </div>
          </div>

          {/* Center: View Switcher Navigation Tabs */}
          <div className="flex items-center bg-slate-950/90 p-1 rounded-xl border border-slate-800 self-center lg:self-auto">
            <button
              onClick={() => setViewMode('editor')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'editor'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>

            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'preview'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Vista Previa</span>
            </button>

            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'code'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Código HTML</span>
            </button>

            <button
              onClick={() => setViewMode('customizer')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'customizer'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Tema & Estilos</span>
              <span className="sm:hidden">Tema</span>
            </button>
          </div>

          {/* Right: Quick Tools & Export Actions */}
          <div className="flex items-center flex-wrap gap-1.5">
            
            {/* Upload .md */}
            <button
              onClick={handleUploadClick}
              title="Cargar cualquier archivo .md o .txt local"
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-all active:scale-95"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Subir .MD</span>
            </button>

            {/* Template Store Selector */}
            <select
              onChange={(e) => {
                if (e.target.value) {
                  onSelectTemplate(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-2 py-1.5 rounded-lg border border-slate-700 cursor-pointer focus:outline-none max-w-[130px] sm:max-w-none"
            >
              <option value="" disabled>
                Plantillas...
              </option>
              {SAMPLE_TEMPLATES.map((tmpl) => (
                <option key={tmpl.id} value={tmpl.id}>
                  {tmpl.name}
                </option>
              ))}
            </select>

            {/* Markdown Guide */}
            <button
              onClick={onOpenGuide}
              title="Ver Guía de Sintaxis Markdown"
              className="p-1.5 bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 rounded-lg border border-indigo-500/40 transition-all active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block mx-0.5" />

            {/* Export Actions */}
            <button
              onClick={onDownloadMarkdown}
              title="Descargar archivo Markdown (.md)"
              className="flex items-center gap-1 px-2 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold rounded-lg border border-blue-500/30 transition-all"
            >
              <FileDown className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">.MD</span>
            </button>

            <button
              onClick={onCopyCode}
              title="Copiar HTML al Portapapeles"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onDownloadHtml}
              title="Descargar HTML autocontenido"
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>HTML</span>
            </button>

            <button
              onClick={onPrint}
              title="Imprimir o PDF del Navegador"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
            </button>

            <button
              onClick={onDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-blue-600/30 border border-blue-400/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGeneratingPdf ? 'PDF...' : 'PDF'}</span>
            </button>

          </div>

        </div>

      </div>
    </header>
  );
};
