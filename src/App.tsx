import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { ViewMode, THEME_PRESETS, ThemeConfig } from './types';
import { DEFAULT_MARKDOWN } from './data/defaultMarkdown';
import { SAMPLE_TEMPLATES } from './data/sampleTemplates';
import { generateFullHtmlDocument } from './utils/htmlGenerator';
import { generatePdfFromHtml } from './utils/pdfGenerator';
import { Navbar } from './components/Navbar';
import { HtmlPreview } from './components/HtmlPreview';
import { CodeViewer } from './components/CodeViewer';
import { MarkdownEditor } from './components/MarkdownEditor';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { LandingPage } from './components/LandingPage';
import { MarkdownGuideModal } from './components/MarkdownGuideModal';
import { Sparkles, UploadCloud, CheckCircle2, FileText, AlertCircle } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN);
  const [documentTitle, setDocumentTitle] = useState<string>('Mi_Documento_Markdown');
  const [theme, setTheme] = useState<ThemeConfig>(THEME_PRESETS.modernBlue);
  
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfStatusMessage, setPdfStatusMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // File input ref for triggering from landing page
  const mainFileInputRef = useRef<HTMLInputElement>(null);

  // Toast alert status message for uploads & templates
  const [notification, setNotification] = useState<{
    type: 'success' | 'info' | 'error';
    message: string;
  } | null>(null);

  // Global Drag and Drop state
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Process uploaded file (FileReader)
  const processFile = useCallback((file: File) => {
    if (!file) return;

    const validExtensions = ['.md', '.markdown', '.txt'];
    const isMarkdown = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!isMarkdown) {
      showNotification('Por favor selecciona un archivo con extensión .md, .markdown o .txt', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        setMarkdown(content);
        
        // Clean title from filename
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
        setDocumentTitle(cleanName || 'Documento_Cargado');
        
        // Auto-switch to editor view if in landing page
        setViewMode('editor');
        showNotification(`¡Archivo "${file.name}" cargado exitosamente!`, 'success');
      }
    };
    reader.onerror = () => {
      showNotification('Error al leer el archivo. Inténtalo de nuevo.', 'error');
    };
    reader.readAsText(file, 'UTF-8');
  }, []);

  // Handle Input File Upload Event
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
      e.target.value = ''; // reset input
    }
  };

  // Handle Select Sample Template
  const handleSelectTemplate = (templateId: string) => {
    const template = SAMPLE_TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setMarkdown(template.content);
      setDocumentTitle(template.filename);
      showNotification(`Plantilla "${template.name}" cargada.`, 'info');
    }
  };

  // Global Drag & Drop Handlers
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingFile(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setIsDraggingFile(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDraggingFile(false);

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        processFile(file);
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, [processFile]);

  // Generate full standalone HTML document with embedded CSS
  const htmlContent = useMemo(() => {
    return generateFullHtmlDocument(markdown, theme, documentTitle);
  }, [markdown, theme, documentTitle]);

  // Handle direct Markdown (.md) download
  const handleDownloadMarkdown = () => {
    const safeName = documentTitle.trim() || 'Documento';
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeName}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification(`Archivo "${safeName}.md" descargado.`, 'success');
  };

  // Handle direct HTML download
  const handleDownloadHtml = () => {
    const safeName = documentTitle.trim() || 'Documento';
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeName}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification(`Archivo "${safeName}.html" descargado.`, 'success');
  };

  // Handle Clipboard Copy
  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    showNotification('¡Código HTML5 con CSS embebido copiado al portapapeles!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  // Handle Print via Native Dialog or PDF
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } else {
      showNotification('Permite los popups en el navegador para imprimir.', 'error');
    }
  };

  // Handle PDF Generation
  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    setPdfStatusMessage('Preparando lienzo A4 y calculando saltos de página...');

    try {
      await generatePdfFromHtml(
        htmlContent,
        `${documentTitle}.pdf`,
        (status) => setPdfStatusMessage(status)
      );
      showNotification(`¡PDF "${documentTitle}.pdf" generado exitosamente!`, 'success');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      setPdfStatusMessage('Error al generar PDF. Utilizando impresión nativa...');
      setTimeout(() => {
        setPdfStatusMessage(null);
        handlePrint();
      }, 1500);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white relative">
      
      {/* Hidden File Input for Landing Page triggers */}
      <input
        ref={mainFileInputRef}
        type="file"
        accept=".md,.markdown,.txt"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Global Drag & Drop Overlay */}
      {isDraggingFile && (
        <div className="fixed inset-0 z-[100] bg-blue-950/90 backdrop-blur-md border-4 border-dashed border-blue-400 flex flex-col items-center justify-center p-6 text-center animate-fade-in pointer-events-none">
          <div className="w-20 h-20 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 animate-bounce">
            <UploadCloud className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Suelta tu archivo Markdown aquí</h2>
          <p className="text-sm text-blue-200">
            Soporta archivos .md, .markdown y .txt. Se cargará e imprimirá en formato HTML & PDF.
          </p>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        documentTitle={documentTitle}
        setDocumentTitle={setDocumentTitle}
        onFileUpload={handleFileUpload}
        onSelectTemplate={handleSelectTemplate}
        onDownloadPdf={handleDownloadPdf}
        onDownloadHtml={handleDownloadHtml}
        onDownloadMarkdown={handleDownloadMarkdown}
        onOpenGuide={() => setIsGuideOpen(true)}
        onPrint={handlePrint}
        onCopyCode={handleCopyCode}
        isGeneratingPdf={isGeneratingPdf}
        copied={copied}
      />

      {/* RENDER LANDING PAGE PORTADA MODE */}
      {viewMode === 'landing' ? (
        <LandingPage
          onStartEditor={() => setViewMode('editor')}
          onFileUploadClick={() => mainFileInputRef.current?.click()}
          onSelectTemplate={handleSelectTemplate}
          setViewMode={setViewMode}
        />
      ) : (
        /* MAIN WORKSPACE CONVERTER AREA */
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
          
          {/* Toast Notification Banner */}
          {notification && (
            <div
              className={`mb-4 p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium shadow-lg transition-all animate-fade-in ${
                notification.type === 'success'
                  ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                  : notification.type === 'info'
                  ? 'bg-blue-950/90 border-blue-500/40 text-blue-200'
                  : 'bg-rose-950/90 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {notification.type === 'info' && <Sparkles className="w-4 h-4 text-blue-400" />}
                {notification.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
                <span>{notification.message}</span>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-0.5"
              >
                ✕
              </button>
            </div>
          )}

          {/* Banner Status */}
          <div className="mb-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-200">
                  MarkFlow Studio por <span className="text-blue-400 font-bold">Flujo Base</span> — Conversor Universal Markdown
                </h2>
                <p className="text-xs text-slate-400">
                  Carga cualquier archivo <code className="text-emerald-400 font-mono">.md</code>, ajusta el tema visual y descarga tu PDF impreso o HTML standalone.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {documentTitle}.md
              </span>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
                Procesamiento 100% Local
              </span>
            </div>
          </div>

          {/* View Switcher Output */}
          <div className="flex-1 flex flex-col min-h-[700px]">
            {viewMode === 'preview' && (
              <HtmlPreview
                htmlContent={htmlContent}
                pdfStatusMessage={pdfStatusMessage}
              />
            )}

            {viewMode === 'code' && (
              <CodeViewer
                htmlContent={htmlContent}
                onCopy={handleCopyCode}
                onDownloadHtml={handleDownloadHtml}
                copied={copied}
              />
            )}

            {viewMode === 'editor' && (
              <MarkdownEditor
                markdown={markdown}
                setMarkdown={setMarkdown}
                documentTitle={documentTitle}
                htmlContent={htmlContent}
                onReset={() => {
                  setMarkdown(DEFAULT_MARKDOWN);
                  setDocumentTitle('Mi_Documento_Markdown');
                  showNotification('Editor restablecido al documento inicial.', 'info');
                }}
                onFileUpload={handleFileUpload}
                onOpenGuide={() => setIsGuideOpen(true)}
              />
            )}

            {viewMode === 'customizer' && (
              <ThemeCustomizer
                currentTheme={theme}
                setTheme={setTheme}
              />
            )}
          </div>

        </main>
      )}

      {/* Interactive Markdown Syntax & Cheatsheet Guide Modal */}
      <MarkdownGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onInsertSnippet={(snippet) => {
          setMarkdown((prev) => prev + '\n\n' + snippet);
          showNotification('Sintaxis de atajo insertada en el editor.', 'success');
        }}
      />

    </div>
  );
}
