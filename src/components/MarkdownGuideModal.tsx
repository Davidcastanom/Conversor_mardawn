import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  X,
  Code2,
  Table,
  CheckSquare,
  Sparkles,
  Shield,
  HelpCircle,
  FileText,
  Terminal,
  Type,
  Layers,
  Info,
} from 'lucide-react';

interface MarkdownGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertSnippet?: (snippet: string) => void;
}

interface SnippetItem {
  title: string;
  syntax: string;
  description: string;
  category: 'basico' | 'estructuras' | 'tablas' | 'avanzado';
}

const CHEATSHEET_SNIPPETS: SnippetItem[] = [
  // BÁSICO
  {
    title: 'Títulos y Encabezados',
    syntax: '# Título Nivel 1\n## Título Nivel 2\n### Título Nivel 3',
    description: 'Usa de 1 a 6 signos # para definir jerarquía de títulos',
    category: 'basico',
  },
  {
    title: 'Negrita y Cursiva',
    syntax: '**Texto en negrita** y *texto en cursiva* o ***ambos***',
    description: 'Enuelve el texto entre asteriscos o guiones bajos',
    category: 'basico',
  },
  {
    title: 'Texto Tachado y Resaltado',
    syntax: '~~Texto tachado~~ y <mark>Texto resaltado</mark>',
    description: 'Tachado estándar con tildes ~ y resaltado HTML con mark',
    category: 'basico',
  },
  {
    title: 'Línea Divisora Horizontal',
    syntax: '---\n',
    description: 'Crea una línea de separación elegante',
    category: 'basico',
  },
  {
    title: 'Listas con Viñetas y Números',
    syntax: '- Elemento 1\n- Elemento 2\n  - Sub-elemento A\n1. Primer paso\n2. Segundo paso',
    description: 'Listas ordenadas y desordenadas multinivel',
    category: 'basico',
  },

  // ESTRUCTURAS Y TAREAS
  {
    title: 'Lista de Tareas Interactivas',
    syntax: '- [x] Tarea completada\n- [ ] Tarea pendiente por hacer\n- [ ] Revisión de diseño',
    description: 'Casillas de verificación para seguimiento de proyectos',
    category: 'estructuras',
  },
  {
    title: 'Bloque de Cita o Callout',
    syntax: '> 💡 **Consejo:** Este es un bloque destacado de información importante.\n> Múltiples líneas de texto.',
    description: 'Ideal para advertencias, notas o aclaraciones',
    category: 'estructuras',
  },
  {
    title: 'Citas de Alerta (Warning/Info)',
    syntax: '> ⚠️ **Atención:** Revisa los permisos antes de continuar.\n> 🔴 **Crítico:** Error de configuración en producción.',
    description: 'Destacados de colores mediante emojis y negritas',
    category: 'estructuras',
  },
  {
    title: 'Caja Colapsable (<details>)',
    syntax: '<details>\n  <summary>🔍 Haz clic para ver los detalles ocultos</summary>\n\n  Contenido adicional que se despliega al hacer clic.\n</details>',
    description: 'Oculta o muestra contenido extenso a voluntad',
    category: 'estructuras',
  },

  // TABLAS Y CÓDIGO
  {
    title: 'Tabla Básica Alineada',
    syntax: '| Nombre | Rol | Estado |\n| :--- | :---: | ---: |\n| Ana G. | Lead | ✅ Activo |\n| Carlos | Dev | 🟡 Pendiente |',
    description: 'Alineación a izquierda (:---), centro (:---:) y derecha (---:)',
    category: 'tablas',
  },
  {
    title: 'Bloque de Código con Lenguaje',
    syntax: '```typescript\nfunction saludar(nombre: string): string {\n  return `¡Hola, ${nombre}! Bienvenido a MarkFlow.`;\n}\n```',
    description: 'Resaltado de sintaxis especificando el lenguaje tras las comillas triples',
    category: 'tablas',
  },
  {
    title: 'Código en Línea (Inline)',
    syntax: 'Ejecuta el comando `npm run build` en la terminal',
    description: 'Resalta variables o comandos breves en el texto',
    category: 'tablas',
  },

  // AVANZADO / BADGES
  {
    title: 'Badges y Escudos (Shields.io)',
    syntax: '![Versión](https://img.shields.io/badge/versión-1.0.0-blue)\n![Estado](https://img.shields.io/badge/Estado-Aprobado-success)\n![Autor](https://img.shields.io/badge/Creado%20por-Flujo__Base-purple)',
    description: 'Insignias visuales dinámicas para repositorios y documentación',
    category: 'avanzado',
  },
  {
    title: 'Añadir Imagen (URL o Fotos Locales)',
    syntax: '![Descripción de la imagen](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600)\n\n<!-- O sube/arrastra una foto local con el botón "Imagen" (se incrusta en Base64 offline) -->',
    description: 'Sintaxis estándar de imagen. Consejo: Usa el botón "Imagen" para subir fotos desde tu PC.',
    category: 'avanzado',
  },
  {
    title: 'Imagen Centrada con Ancho Específico (HTML)',
    syntax: '<p align="center">\n  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800" alt="Grafico" width="400" style="border-radius: 8px;" />\n</p>',
    description: 'Permite centrar imágenes y ajustar su tamaño exacto para impresión en PDF',
    category: 'avanzado',
  },
  {
    title: 'Enlaces e Hipervínculos',
    syntax: '[Visitar sitio web oficial](https://markdownguide.org)\n[Descargar documento](#)',
    description: 'Creación de hipervínculos cliqueables en el documento',
    category: 'avanzado',
  },
  {
    title: 'Teclas y Atajos (<kbd>)',
    syntax: 'Presiona <kbd>Ctrl</kbd> + <kbd>C</kbd> para copiar o <kbd>Ctrl</kbd> + <kbd>V</kbd> para pegar.',
    description: 'Muestra teclas de teclado con estilo de botón real',
    category: 'avanzado',
  },
  {
    title: 'Fórmulas Matemáticas o Símbolos',
    syntax: 'La famosa fórmula $E = mc^2$ o subíndices H<sub>2</sub>O y superíndices X<sup>2</sup>',
    description: 'Símbolos científicos, subíndices y superíndices',
    category: 'avanzado',
  },
];

export const MarkdownGuideModal: React.FC<MarkdownGuideModalProps> = ({
  isOpen,
  onClose,
  onInsertSnippet,
}) => {
  const [activeCategory, setActiveCategory] = useState<'todos' | 'basico' | 'estructuras' | 'tablas' | 'avanzado'>('todos');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredSnippets = activeCategory === 'todos'
    ? CHEATSHEET_SNIPPETS
    : CHEATSHEET_SNIPPETS.filter((s) => s.category === activeCategory);

  return (
    <div className="fixed inset-0 z-[110] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Guía de Sintaxis & Atajos Markdown</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-semibold">
                  CheatSheet
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Aprende la estructura de Markdown, copia atajos o insértalos directamente en tu editor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct link to Official Documentation */}
            <a
              href="https://www.markdownguide.org/cheat-sheet/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-semibold transition-all"
              title="Abrir la documentación oficial de Markdown en nueva pestaña"
            >
              <span>Doc Oficial (MarkdownGuide.org)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Doc Banner Link (Mobile fallback) */}
        <div className="bg-blue-950/60 border-b border-blue-800/40 px-6 py-2.5 flex items-center justify-between gap-3 text-xs text-blue-200">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>¿Buscas la especificación técnica completa? Visita la documentación oficial global.</span>
          </div>
          <a
            href="https://www.markdownguide.org/basic-syntax/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-300 hover:text-white font-bold underline flex-shrink-0"
          >
            <span>Ver Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Category Tabs */}
        <div className="bg-slate-900/90 px-6 py-3 border-b border-slate-800 flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveCategory('todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeCategory === 'todos'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Todos los Atajos ({CHEATSHEET_SNIPPETS.length})
          </button>

          <button
            onClick={() => setActiveCategory('basico')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeCategory === 'basico'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Formato Básico
          </button>

          <button
            onClick={() => setActiveCategory('estructuras')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeCategory === 'estructuras'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Tareas & Citas
          </button>

          <button
            onClick={() => setActiveCategory('tablas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeCategory === 'tablas'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Tablas & Código
          </button>

          <button
            onClick={() => setActiveCategory('avanzado')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeCategory === 'avanzado'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Badges & HTML Especial
          </button>
        </div>

        {/* Snippets List Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSnippets.map((snippet, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                      {snippet.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {snippet.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    {snippet.description}
                  </p>

                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre-wrap overflow-x-auto custom-scrollbar mb-3">
                    {snippet.syntax}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-900">
                  {onInsertSnippet && (
                    <button
                      onClick={() => {
                        onInsertSnippet(snippet.syntax);
                        onClose();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-all"
                    >
                      <Type className="w-3.5 h-3.5" />
                      <span>Insertar en Editor</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleCopy(snippet.syntax, idx)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-all"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Tip: También puedes arrastrar cualquier archivo .md para visualizar sus estructuras al instante.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-all"
          >
            Cerrar Guía
          </button>
        </div>

      </div>
    </div>
  );
};
