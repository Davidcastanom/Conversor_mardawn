import React, { useState, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Link,
  Sparkles,
  X,
  Check,
  FileImage,
  Layers,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface InsertImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertImage: (imageMarkdown: string) => void;
}

const SAMPLE_PRESET_IMAGES = [
  {
    title: 'Diagrama de Flujo Técnico',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    caption: 'Diagrama de métricas y análisis de datos',
  },
  {
    title: 'Código & Desarrollo',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    caption: 'Pantalla con código fuente en entorno oscuro',
  },
  {
    title: 'Banner Corporativo Minimalista',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    caption: 'Edificio corporativo moderno',
  },
  {
    title: 'Reunión de Trabajo & Reporte',
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80',
    caption: 'Equipo trabajando en interfaz de diseño',
  },
];

export const InsertImageModal: React.FC<InsertImageModalProps> = ({
  isOpen,
  onClose,
  onInsertImage,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [imageWidth, setImageWidth] = useState('100%');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle local file selection and convert to Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, SVG, WebP, GIF).');
      return;
    }

    setIsProcessingFile(true);
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setUploadedBase64(result);
      setIsProcessingFile(false);
      if (!altText) {
        setAltText(file.name.replace(/\.[^/.]+$/, ''));
      }
    };
    reader.onerror = () => {
      setIsProcessingFile(false);
      alert('Error al leer el archivo de imagen.');
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmInsert = () => {
    let finalSrc = '';
    const cleanAlt = altText.trim() || 'Imagen adjunta';

    if (activeTab === 'upload') {
      if (!uploadedBase64) {
        alert('Por favor selecciona una imagen de tu equipo primero.');
        return;
      }
      finalSrc = uploadedBase64;
    } else if (activeTab === 'url') {
      if (!imageUrl.trim()) {
        alert('Por favor ingresa la URL de la imagen.');
        return;
      }
      finalSrc = imageUrl.trim();
    }

    // Build HTML/Markdown snippet according to options
    let snippet = '';
    if (alignment === 'center' || imageWidth !== '100%') {
      // HTML img block for advanced styling, alignment and width in PDF/HTML
      const alignClass = alignment === 'center' ? 'margin: 0 auto; display: block;' : alignment === 'right' ? 'margin-left: auto; display: block;' : '';
      snippet = `<p align="${alignment}">\n  <img src="${finalSrc}" alt="${cleanAlt}" style="max-width: ${imageWidth}; ${alignClass} border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />\n</p>`;
    } else {
      // Standard Markdown format
      snippet = `![${cleanAlt}](${finalSrc})`;
    }

    onInsertImage(snippet);
    resetAndClose();
  };

  const handleInsertPreset = (presetUrl: string, caption: string) => {
    const snippet = `![${caption}](${presetUrl})`;
    onInsertImage(snippet);
    resetAndClose();
  };

  const resetAndClose = () => {
    setImageUrl('');
    setAltText('');
    setUploadedBase64(null);
    setUploadedFileName(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Añadir Imagen al Documento</h2>
              <p className="text-xs text-slate-400">Sube una foto local, usa un enlace URL o elige una plantilla de imagen</p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-slate-900/90 px-6 py-3 border-b border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'upload'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Subir de tu Equipo (Base64)</span>
          </button>

          <button
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'url'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Link className="w-4 h-4" />
            <span>Enlace URL Web</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'presets'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Imágenes de Muestra</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-5">
          
          {/* TAB 1: UPLOAD LOCAL FILE */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-950/60 p-6 rounded-2xl text-center cursor-pointer transition-all hover:bg-blue-950/20 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 mx-auto flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform mb-3">
                  <Upload className="w-6 h-6" />
                </div>

                <p className="text-sm font-bold text-white mb-1">
                  Haz clic aquí para examinar o arrastrar tu imagen
                </p>
                <p className="text-xs text-slate-400">
                  Admite PNG, JPG, WebP, SVG o GIF. La imagen se incrustará de forma segura en Base64.
                </p>

                {uploadedFileName && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Imagen cargada: {uploadedFileName}</span>
                  </div>
                )}
              </div>

              {uploadedBase64 && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                  <img
                    src={uploadedBase64}
                    alt="Vista previa"
                    className="w-16 h-16 object-cover rounded-lg border border-slate-700"
                  />
                  <div className="text-xs text-slate-300">
                    <p className="font-semibold text-white">Vista Previa Lista</p>
                    <p className="text-slate-400">La imagen se guardará dentro del archivo .md e imprimirá en el PDF.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: URL INPUT */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Dirección URL de la Imagen (https://...)
                </label>
                <input
                  type="url"
                  placeholder="https://ejemplo.com/mi-imagen.png"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 font-mono placeholder:text-slate-600"
                />
              </div>

              {imageUrl.trim() && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                  <img
                    src={imageUrl}
                    alt="Vista previa"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=Error+URL';
                    }}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-700"
                  />
                  <div className="text-xs text-slate-300">
                    <p className="font-semibold text-white">Verificación de URL</p>
                    <p className="text-slate-400">Si ves la imagen en el recuadro, la URL es correcta.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRESETS */}
          {activeTab === 'presets' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto custom-scrollbar p-1">
              {SAMPLE_PRESET_IMAGES.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => handleInsertPreset(preset.url, preset.caption)}
                  className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-blue-500 cursor-pointer transition-all flex items-center gap-3 group"
                >
                  <img
                    src={preset.url}
                    alt={preset.title}
                    className="w-14 h-14 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                      {preset.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{preset.caption}</p>
                    <span className="text-[10px] text-blue-400 font-medium">Hacer clic para insertar</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* COMMON OPTIONS: ALT TEXT, ALIGNMENT & WIDTH */}
          {activeTab !== 'presets' && (
            <div className="pt-3 border-t border-slate-800/80 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Texto Alternativo / Descripción
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Diagrama de arquitectura"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Ancho de la Imagen
                  </label>
                  <select
                    value={imageWidth}
                    onChange={(e) => setImageWidth(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="100%">100% (Ancho Completo)</option>
                    <option value="75%">75% (Grande)</option>
                    <option value="50%">50% (Mediano)</option>
                    <option value="300px">300px (Fijo Ajustado)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Alineación en la Página
                </label>
                <div className="flex items-center gap-2">
                  {(['left', 'center', 'right'] as const).map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => setAlignment(align)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-all ${
                        alignment === align
                          ? 'bg-blue-600/30 border-blue-500 text-blue-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {align === 'left' ? 'Izquierda' : align === 'center' ? 'Centrado' : 'Derecha'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        {activeTab !== 'presets' && (
          <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              {activeTab === 'upload' ? 'Se incrustará en formato Base64 listo para PDF/HTML.' : 'Se insertará la etiqueta correspondiente.'}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={resetAndClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
              >
                Cancelar
              </button>

              <button
                onClick={handleConfirmInsert}
                disabled={isProcessingFile}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>Insertar Imagen</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
