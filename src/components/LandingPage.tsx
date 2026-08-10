import React from 'react';
import { ViewMode } from '../types';
import { SAMPLE_TEMPLATES, SampleTemplate } from '../data/sampleTemplates';
import {
  FileText,
  Upload,
  ArrowRight,
  CheckCircle2,
  Printer,
  Palette,
  ShieldCheck,
  Code2,
  Store,
  Layers,
  ChevronRight,
  Terminal,
  Cpu,
  FileCheck,
  Zap,
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* HERO PORTADA SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-slate-800/80 bg-slate-950">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Version / Category Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>MARKFLOW STUDIO v2.4</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">ENGINEERING SUITE</span>
            </div>
          </div>

          {/* Main Title & Description */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Plataforma de Edición y Conversión <br className="hidden sm:inline" />
              <span className="text-blue-500">Markdown a PDF & HTML5</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
              Entorno de documentación profesional con motor de renderizado A4 de alta precisión, control de saltos de página y hojas de estilo CSS embebidas.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onStartEditor}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-lg border border-blue-400/20 transition-all active:scale-95"
              >
                <Terminal className="w-4 h-4" />
                <span>Abrir Editor de Documentos</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onFileUploadClick}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm rounded-lg border border-slate-800 transition-all active:scale-95"
              >
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Cargar Archivo Local (.MD)</span>
              </button>

              <a
                href="#templates-store"
                className="flex items-center gap-2 px-5 py-3 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-medium text-xs sm:text-sm rounded-lg border border-slate-800 transition-all"
              >
                <Store className="w-4 h-4 text-slate-400" />
                <span>Ver Plantillas</span>
              </a>
            </div>

            {/* Technical Specifications Bar */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-slate-400 border-t border-slate-900/80 max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>100% Client-Side Exec</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Sin Marcas de Agua</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>A4 Page-Break Engine</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TECHNICAL FEATURE GRID */}
      <section className="py-16 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">Capacidades del Sistema</h2>
            <p className="text-2xl font-bold text-white">Arquitectura Diseñada para Documentación de Alta Precisión</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 mb-4">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Motor de Exportación PDF A4</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Algoritmo de cálculo de maquetación que inspecciona el árbol DOM para evitar cortes involuntarios en bloques de código, imágenes y tablas.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">HTML Standalone + CSS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generación de entregables en HTML5 autocontenidos con todas las reglas de estilo compiladas en una sola etiqueta para distribución limpia.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 mb-4">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Gestor de Temas & Estilos</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ajuste fino de paletas de color, tipografía ejecutiva y márgenes de página preconfigurados según estándares corporativos.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Entorno Dividido (Split)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Editor multitarea con soporte para fuente variable (14px - 24px), inserción asistida de sintaxis y renderizado instantáneo.
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
                <Store className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Biblioteca Estándar</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Plantillas de Ingeniería y Negocio</h2>
              <p className="text-slate-400 text-xs mt-1">
                Estructuras predefinidas para especificaciones técnicas, propuestas ejecutivas, informes de auditoría y acuerdos legales.
              </p>
            </div>

            <button
              onClick={onStartEditor}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Documento en Blanco</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_TEMPLATES.map((tmpl: SampleTemplate) => (
              <div
                key={tmpl.id}
                className="bg-slate-900/90 rounded-xl border border-slate-800/90 p-6 flex flex-col justify-between hover:border-slate-700 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-950 text-blue-400 border border-slate-800">
                      {tmpl.category || 'Estándar'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">.md</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                    {tmpl.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {tmpl.description}
                  </p>
                </div>

                <button
                  onClick={() => handleTemplateClick(tmpl.id)}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white font-medium text-xs rounded-lg border border-slate-700 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Cargar Plantilla</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 bg-slate-950 text-slate-500 text-xs border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">MARKFLOW STUDIO</span>
            <span>•</span>
            <span className="text-slate-400">ENGINEERING SUITE v2.4</span>
          </div>
          <p>© {new Date().getFullYear()} MarkFlow Studio. Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
};
