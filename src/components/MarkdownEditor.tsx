import React, { useState, useRef, useEffect } from 'react';
import {
  RotateCcw,
  Undo2,
  Redo2,
  Sparkles,
  FileText,
  Upload,
  Trash2,
  Download,
  Eye,
  Columns,
  Maximize2,
  Type,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Quote,
  Code,
  Table,
  List,
  CheckSquare,
  Shield,
  BookOpen,
  HelpCircle,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react';
import { InsertImageModal } from './InsertImageModal';

interface MarkdownEditorProps {
  markdown: string;
  setMarkdown: (content: string) => void;
  documentTitle: string;
  htmlContent: string;
  onReset: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenGuide?: () => void;
}

type EditorMode = 'editor' | 'split' | 'preview';
type FontSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl';

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  markdown,
  setMarkdown,
  documentTitle,
  htmlContent,
  onReset,
  onFileUpload,
  onOpenGuide,
}) => {
  const [editorMode, setEditorMode] = useState<EditorMode>('split');
  const [fontSize, setFontSize] = useState<FontSize>('lg'); // Default 18px / large for high visibility!
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Undo & Redo History Management
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const lastRecordedMarkdown = useRef<string>(markdown);

  const pushToUndoStack = (previousContent: string) => {
    if (previousContent === markdown && undoStack.length > 0 && undoStack[undoStack.length - 1] === previousContent) {
      return;
    }
    setUndoStack((prev) => [...prev.slice(-49), previousContent]);
    setRedoStack([]);
    lastRecordedMarkdown.current = markdown;
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    const newUndoStack = undoStack.slice(0, -1);
    setUndoStack(newUndoStack);
    setRedoStack((prev) => [...prev, markdown]);
    lastRecordedMarkdown.current = previous;
    setMarkdown(previous);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    const newRedoStack = redoStack.slice(0, -1);
    setRedoStack(newRedoStack);
    setUndoStack((prev) => [...prev, markdown]);
    lastRecordedMarkdown.current = next;
    setMarkdown(next);
  };

  // Keyboard shortcut listener for Ctrl+Z and Ctrl+Y / Ctrl+Shift+Z
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;

    if (isCtrlOrCmd && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      if (e.shiftKey) {
        handleRedo();
      } else {
        handleUndo();
      }
    } else if (isCtrlOrCmd && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      handleRedo();
    }
  };

  // When typing in textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (
      val.endsWith(' ') ||
      val.endsWith('\n') ||
      Math.abs(val.length - lastRecordedMarkdown.current.length) > 5
    ) {
      pushToUndoStack(lastRecordedMarkdown.current);
    }
    setMarkdown(val);
  };

  // Handle dropping images directly onto the editor textarea
  const handleDropOnTextarea = (e: React.DragEvent<HTMLTextAreaElement>) => {
    const files = Array.from(e.dataTransfer.files) as File[];
    const imageFile = files.find((f: File) => f.type.startsWith('image/'));

    if (imageFile) {
      e.preventDefault();
      e.stopPropagation();

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        const alt = imageFile.name.replace(/\.[^/.]+$/, '');
        const imageSnippet = `\n![${alt}](${base64})\n`;

        pushToUndoStack(markdown);
        setMarkdown((prev) => prev + imageSnippet);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleDownloadMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${documentTitle || 'Documento'}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Insert markdown syntax helper
  const insertSyntax = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    pushToUndoStack(markdown);

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end) || 'texto';
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newMarkdown = markdown.substring(0, start) + replacement + markdown.substring(end);
    setMarkdown(newMarkdown);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 50);
  };

  // Font size class mapping
  const fontSizeClasses: Record<FontSize, string> = {
    sm: 'text-sm leading-normal', // 14px
    base: 'text-base leading-relaxed', // 16px
    lg: 'text-lg leading-relaxed', // 18px (High visibility)
    xl: 'text-xl leading-relaxed', // 20px
    '2xl': 'text-2xl leading-loose', // 24px
  };

  const lineCount = markdown.split('\n').length;
  const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col h-full min-h-[750px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      
      {/* Editor Header Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-sm">
        
        {/* Left: Document Name & Visibility Badges */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-100 text-sm">Editor Markdown</h3>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded text-xs font-mono font-medium">
                {documentTitle}.md
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Edita texto en tiempo real con vista previa en vivo</p>
          </div>
        </div>

        {/* Center: View Layout Switcher (Solo Editor / Split / Vista Previa) */}
        <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
          <button
            onClick={() => setEditorMode('editor')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              editorMode === 'editor'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Sólo Editor</span>
          </button>

          <button
            onClick={() => setEditorMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              editorMode === 'split'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Vista Dividida (Split)</span>
          </button>

          <button
            onClick={() => setEditorMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              editorMode === 'preview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista Previa</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.markdown,.txt"
            onChange={onFileUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg shadow-sm border border-emerald-400/30 transition-all active:scale-95"
            title="Cargar un archivo .md o .txt local"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Subir .md</span>
          </button>

          <button
            onClick={handleDownloadMd}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-lg border border-slate-700 transition-all active:scale-95"
            title="Guardar contenido actual como archivo .md"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Guardar .md</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs rounded-lg border border-slate-700 transition-all active:scale-95"
            title="Restablecer al Markdown por defecto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer</span>
          </button>

          <button
            onClick={() => setMarkdown('')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-medium text-xs rounded-lg border border-rose-500/20 transition-all active:scale-95"
            title="Limpiar todo el editor"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpiar</span>
          </button>
        </div>

      </div>

      {/* Formatting & Font Size Sub-Toolbar */}
      <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        
        {/* Markdown Insertion Helpers */}
        <div className="flex items-center gap-1 flex-wrap">
          {/* Undo & Redo Buttons */}
          <button
            onClick={handleUndo}
            disabled={undoStack.length === 0}
            className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 text-xs font-semibold rounded-md border border-slate-700 transition-all active:scale-95 mr-1"
            title="Deshacer cambio (Ctrl + Z)"
          >
            <Undo2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden xs:inline">Deshacer</span>
          </button>

          <button
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 text-xs font-semibold rounded-md border border-slate-700 transition-all active:scale-95 mr-2"
            title="Rehacer cambio (Ctrl + Y o Ctrl + Shift + Z)"
          >
            <Redo2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden xs:inline">Rehacer</span>
          </button>

          <div className="h-4 w-px bg-slate-800 my-auto mr-1.5 hidden sm:block" />

          <span className="text-[11px] text-slate-400 font-medium mr-1.5 hidden sm:inline">Formato:</span>
          
          <button
            onClick={() => insertSyntax('# ')}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-300 hover:text-white transition-colors"
            title="Título H1"
          >
            <Heading1 className="w-4 h-4" />
          </button>

          <button
            onClick={() => insertSyntax('## ')}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-300 hover:text-white transition-colors"
            title="Título H2"
          >
            <Heading2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => insertSyntax('**', '**')}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-300 hover:text-white transition-colors"
            title="Texto en Negrita"
          >
            <Bold className="w-4 h-4" />
          </button>

          <button
            onClick={() => insertSyntax('*', '*')}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-300 hover:text-white transition-colors"
            title="Texto en Cursiva"
          >
            <Italic className="w-4 h-4" />
          </button>

          <button
            onClick={() => insertSyntax('> ')}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-300 hover:text-white transition-colors"
            title="Cita o Destacado"
          >
            <Quote className="w-4 h-4" />
          </button>

          <button
            onClick={() => insertSyntax('```\n', '\n```')}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-300 hover:text-white transition-colors"
            title="Bloque de Código"
          >
            <Code className="w-4 h-4" />
          </button>

          <button
            onClick={() => insertSyntax('\n| Columna 1 | Columna 2 |\n|-----------|-----------|\n| Dato 1    | Dato 2    |\n')}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-300 hover:text-white transition-colors"
            title="Insertar Tabla Markdown"
          >
            <Table className="w-4 h-4" />
          </button>

          <button
            onClick={() => insertSyntax('- ')}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-300 hover:text-white transition-colors"
            title="Lista con Viñetas"
          >
            <List className="w-4 h-4" />
          </button>

          <button
            onClick={() => insertSyntax('- [ ] ')}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-300 hover:text-white transition-colors"
            title="Lista de Tareas / Checkbox"
          >
            <CheckSquare className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            onClick={() => setIsImageModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-semibold text-xs rounded-md border border-blue-500/30 transition-all active:scale-95"
            title="Añadir Imagen (Foto de tu equipo, URL o plantilla)"
          >
            <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>Imagen</span>
          </button>

          <button
            onClick={() => insertSyntax('![Badge](https://img.shields.io/badge/Estado-Aprobado-success)')}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-300 hover:text-white transition-colors"
            title="Insertar Badge de Shields.io"
          >
            <Shield className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Font Size Selector for High Visibility */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Type className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-medium text-slate-300">Tamaño de letra:</span>
          </div>

          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
            {(['sm', 'base', 'lg', 'xl', '2xl'] as FontSize[]).map((sz) => {
              const labels: Record<FontSize, string> = {
                sm: '14px',
                base: '16px',
                lg: '18px (Grande)',
                xl: '20px (XL)',
                '2xl': '24px (XXL)',
              };
              return (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`px-2 py-1 rounded font-mono transition-all ${
                    fontSize === sz
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                  title={`Cambiar tamaño de fuente a ${labels[sz]}`}
                >
                  {sz === 'sm' && 'S'}
                  {sz === 'base' && 'M'}
                  {sz === 'lg' && 'L'}
                  {sz === 'xl' && 'XL'}
                  {sz === '2xl' && 'XXL'}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Editor Body Area: Flexible Grid depending on Layout Mode */}
      <div className="flex-1 min-h-[600px] grid grid-cols-1 md:grid-cols-1 bg-slate-950 overflow-hidden relative">
        
        {/* Split View Container */}
        <div
          className={`h-full w-full grid transition-all duration-200 ${
            editorMode === 'split'
              ? 'grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800'
              : 'grid-cols-1'
          }`}
        >
          {/* TEXTAREA EDITOR PANEL */}
          {(editorMode === 'editor' || editorMode === 'split') && (
            <div className="flex flex-col h-full bg-slate-950 p-4 sm:p-6 relative group">
              <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
                <span>Escribe tu código Markdown en Español / Inglés:</span>
                <span className="text-[11px] text-blue-400 font-mono">
                  Fuente {fontSize.toUpperCase()} ({fontSizeClasses[fontSize].split(' ')[0]})
                </span>
              </label>

              <textarea
                ref={textareaRef}
                value={markdown}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropOnTextarea}
                placeholder="Escribe o pega tu contenido Markdown aquí, o arrastra una imagen o archivo .md directamente a este recuadro..."
                className={`w-full h-full min-h-[520px] flex-1 p-5 bg-slate-900/95 text-slate-100 font-mono border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/80 resize-none custom-scrollbar selection:bg-blue-500 selection:text-white ${fontSizeClasses[fontSize]}`}
              />
            </div>
          )}

          {/* LIVE DOCUMENT PREVIEW PANEL */}
          {(editorMode === 'preview' || editorMode === 'split') && (
            <div className="flex flex-col h-full bg-slate-900/40 p-4 sm:p-6 overflow-hidden">
              <label className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
                <span>Vista Previa del Documento Final:</span>
                <span className="text-[11px] text-emerald-400 font-mono">
                  Sincronizado en tiempo real
                </span>
              </label>

              <div className="flex-1 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
                <iframe
                  title="Live Rendered Preview"
                  srcDoc={htmlContent}
                  className="w-full h-full min-h-[520px] border-none"
                  style={{ background: '#ffffff' }}
                />
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Footer Info */}
      <div className="bg-slate-900 px-4 py-2.5 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-blue-300">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          Los cambios aplicados actualizan inmediatamente la vista previa HTML y el archivo PDF.
        </span>
        <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
          <span>{lineCount.toLocaleString()} líneas</span>
          <span>•</span>
          <span>{wordCount.toLocaleString()} palabras</span>
          <span>•</span>
          <span>{markdown.length.toLocaleString()} caracteres</span>
        </div>
      </div>

      {/* Insert Image Modal */}
      <InsertImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onInsertImage={(snippet) => {
          pushToUndoStack(markdown);
          setMarkdown((prev) => prev + '\n\n' + snippet + '\n');
        }}
      />

    </div>
  );
};
