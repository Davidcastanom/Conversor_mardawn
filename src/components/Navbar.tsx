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
  BookOpen,
  FileDown,
  Terminal,
  ChevronRight,
  Sparkles,
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
   * LANDING PAGE HEADER (Single Clean Top Bar)
   * ---------------------------------------------------- */
  if (viewMode === 'landing') {
    return (
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md text-white border-b border-slate-800/80">
        {hiddenFileInput}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                MARKFLOW
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono font-semibold">
                STUDIO v2.4
              </span>
            </div>
          </button>

          {/* Landing Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenGuide}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium rounded-lg border border-slate-800 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>Sintaxis MD</span>
            </button>

            <button
              onClick={handleUploadClick}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 text-xs font-semibold rounded-lg border border-emerald-500/30 transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Subir .MD</span>
            </button>

            <button
              onClick={() => setViewMode('editor')}
              className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm border border-blue-400/30 transition-all active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Abrir Workspace</span>
            </button>
          </div>

        </div>
      </header>
    );
  }

  /* ----------------------------------------------------
   * UNIFIED WORKSPACE HEADER (Editor, Preview, Code, Theme)
   * Single integrated toolbar bar without duplication
   * ---------------------------------------------------- */
  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md text-white border-b border-slate-800/90 shadow-2xl">
      {hiddenFileInput}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Left: Home Brand & Title Field */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setViewMode('landing')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium transition-all group"
              title="Volver a la portada principal"
            >
              <Home className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span className="hidden sm:inline">Inicio</span>
            </button>

            <div className="h-4 w-px bg-slate-800" />

            {/* Editable Title Input */}
            <div className="flex items-center gap-1 bg-slate-900/90 px-2 py-1 rounded-lg border border-slate-800">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="Nombre de archivo"
                title="Cambia el nombre del documento para la descarga"
                className="bg-transparent text-xs text-slate-100 font-mono font-medium px-1 focus:outline-none w-36 sm:w-48 placeholder:text-slate-600"
              />
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                .md
              </span>
            </div>
          </div>

          {/* Center: Segmented View Selector */}
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 self-center lg:self-auto">
            <button
              onClick={() => setViewMode('editor')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'editor'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>

            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'preview'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Vista Previa</span>
            </button>

            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'code'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Código HTML</span>
            </button>

            <button
              onClick={() => setViewMode('customizer')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'customizer'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Estilos & Tema</span>
            </button>
          </div>

          {/* Right: Actions Group */}
          <div className="flex items-center flex-wrap gap-1.5 justify-end">
            
            {/* Upload File */}
            <button
              onClick={handleUploadClick}
              title="Cargar archivo .md o .txt local"
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium rounded-lg border border-slate-800 transition-all"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Subir .MD</span>
            </button>

            {/* Template Selector */}
            <select
              onChange={(e) => {
                if (e.target.value) {
                  onSelectTemplate(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium px-2 py-1.5 rounded-lg border border-slate-800 cursor-pointer focus:outline-none focus:border-blue-500 max-w-[120px] sm:max-w-none"
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
              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-0.5" />

            {/* Downloads & Export */}
            <button
              onClick={onDownloadMarkdown}
              title="Descargar archivo Markdown (.md)"
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium rounded-lg border border-slate-800 transition-all"
            >
              <FileDown className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">.MD</span>
            </button>

            <button
              onClick={onCopyCode}
              title="Copiar HTML al Portapapeles"
              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onDownloadHtml}
              title="Descargar HTML independiente"
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium rounded-lg border border-slate-800 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">HTML</span>
            </button>

            <button
              onClick={onPrint}
              title="Imprimir / PDF de Sistema"
              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Primary PDF Export Button */}
            <button
              onClick={onDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md border border-blue-400/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGeneratingPdf ? 'Generando...' : 'Exportar PDF'}</span>
            </button>

          </div>

        </div>

      </div>
    </header>
  );
};
