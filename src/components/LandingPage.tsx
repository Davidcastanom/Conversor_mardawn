import React from 'react';
import { ViewMode } from '../types';
import { SAMPLE_TEMPLATES, SampleTemplate } from '../data/sampleTemplates';
import {
  FileText,
  Sparkles,
  Upload,
  ArrowRight,
  CheckCircle2,
  Download,
  Printer,
  Palette,
  ShieldCheck,
  Zap,
  Code2,
  Store,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface LandingPageProps {
  onStartEditor: () => void;
  onFileUploadClick: () => void;
  onSelectTemplate: (templateId: string) => void;
  setViewMode: (mode: ViewMode) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartEditor,
  onFileUploadClick,
  onSelectTemplate,
  setViewMode,
}) => {
  const handleTemplateClick = (templateId: string) => {
    onSelectTemplate(templateId);
    setViewMode('editor');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      
      {/* HERO PORTADA SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        
        {/* Decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[200px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Creator Badge (Flujo Base) */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs font-semibold text-blue-300 shadow-xl shadow-blue-500/10 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
              <span className="text-slate-300">Una herramienta profesional desarrollada por</span>
              <span className="text-blue-400 font-bold tracking-wide">Flujo Base</span>
            </div>
          </div>

          {/* Catchy Main Title & Subtitle */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              MarkFlow Studio <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">
                Store & Conversor Markdown a PDF / HTML
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
              Transforma cualquier archivo <code className="text-blue-300 font-mono bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/50">.md</code> en documentos HTML5 modernos con CSS embebido e impresiones PDF con <strong className="text-white font-semibold">saltos de página inteligentes</strong>.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onStartEditor}
                className="flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-xl shadow-blue-600/25 border border-blue-400/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <Zap className="w-5 h-5 text-amber-300" />
                <span>Abrir Editor / Iniciar Conversor</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onFileUploadClick}
                className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-600/20 border border-emerald-400/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <Upload className="w-5 h-5" />
                <span>Subir mi archivo .MD</span>
              </button>

              <a
                href="#templates-store"
                className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm sm:text-base rounded-xl border border-slate-700 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <Store className="w-5 h-5 text-indigo-400" />
                <span>Explorar Store de Plantillas</span>
              </a>
            </div>

            {/* Micro Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sin marcas de agua</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>100% Procesamiento Local</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Compatible con cualquier .md</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="py-16 bg-slate-900/50 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Poderosa Suite de Documentos</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">Diseñado para crear documentos impecables</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all hover:shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">PDF sin Cortes de Página</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Algoritmo inteligente de inspección del DOM que previene cortes accidentales en tablas, código o títulos al exportar.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all hover:shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">HTML Standalone + CSS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Descarga un archivo HTML5 completamente independiente con hojas de estilo embebidas dentro de etiquetas style.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all hover:shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Personalización de Temas</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Elige entre paletas de color Azul Profesional, Verde Esmeralda, Modo Oscuro y ajusta fuentes o radios de borde.
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all hover:shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Editor con Fuente Variable</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ajusta el tamaño de letra en el editor desde 14px hasta 24px (S, M, L, XL, XXL) con vista previa dividida (*Split View*).
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* TEMPLATES STORE SHOWCASE SECTION */}
      <section id="templates-store" className="py-16 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Catálogo de Plantillas</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">MarkFlow Store — Plantillas Listas para Usar</h2>
              <p className="text-slate-400 text-sm mt-1">
                Selecciona cualquier plantilla para cargarla inmediatamente en el editor y exportarla a PDF o HTML.
              </p>
            </div>

            <button
              onClick={onStartEditor}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Abrir Documento en Blanco</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_TEMPLATES.map((tmpl: SampleTemplate) => (
              <div
                key={tmpl.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-2xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {tmpl.category || 'Plantilla'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">.md</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                    {tmpl.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {tmpl.description}
                  </p>
                </div>

                <button
                  onClick={() => handleTemplateClick(tmpl.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 group-hover:bg-blue-600 text-slate-200 group-hover:text-white font-semibold text-xs rounded-xl border border-slate-700 group-hover:border-blue-500 transition-all shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Usar Plantilla en Editor</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 bg-slate-900/40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Paso a Paso</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">¿Cómo usar la herramienta con cualquier archivo?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-white mb-1">Carga tu Archivo .MD</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Sube o arrastra cualquier archivo Markdown desde tu computadora, o elige una plantilla de nuestro Store.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-white mb-1">Edita y Personaliza</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Modifica el texto en tiempo real, cambia el tamaño de letra (hasta 24px) y selecciona el tema visual que más te guste.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-white mb-1">Exporta a PDF o HTML</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Descarga un PDF impreso sin saltos accidentales de línea o guarda el código HTML5 autocontenido listo para usar.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onStartEditor}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg border border-blue-400/30 transition-all active:scale-95"
            >
              Comenzar Ahora Mismo
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-slate-950 text-slate-500 text-xs text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">MarkFlow Studio</span>
            <span>•</span>
            <span className="text-blue-400 font-medium">Creado por Flujo Base</span>
          </div>
          <p>© {new Date().getFullYear()} Flujo Base. Herramienta libre y reutilizable para procesar documentos Markdown.</p>
        </div>
      </footer>

    </div>
  );
};
