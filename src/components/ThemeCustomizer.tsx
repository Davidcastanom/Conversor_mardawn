import React from 'react';
import { ThemeConfig, THEME_PRESETS } from '../types';
import { Palette, Check, Sparkles } from 'lucide-react';

interface ThemeCustomizerProps {
  currentTheme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  currentTheme,
  setTheme,
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl p-6 overflow-auto custom-scrollbar">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
          <Palette className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-100">Personalizador de Tema y Estilos CSS</h2>
          <p className="text-xs text-slate-400">
            Ajusta los colores, tipografía y diseño que se embeberán dentro del archivo HTML y PDF.
          </p>
        </div>
      </div>

      {/* Preset Cards */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
          Presets de Diseño Recomendados
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(THEME_PRESETS).map(([key, preset]) => {
            const isSelected = currentTheme.name === preset.name;
            return (
              <button
                key={key}
                onClick={() => setTheme(preset)}
                className={`flex flex-col text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-slate-200">{preset.name}</span>
                  {isSelected && (
                    <span className="p-1 rounded-full bg-blue-500 text-white">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="w-5 h-5 rounded-full border border-slate-700 shadow-sm"
                    style={{ backgroundColor: preset.primaryColor }}
                    title="Color Principal"
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-slate-700 shadow-sm"
                    style={{ backgroundColor: preset.bgContainer }}
                    title="Color Contenedor"
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-slate-700 shadow-sm"
                    style={{ backgroundColor: preset.textColor }}
                    title="Color de Texto"
                  />
                  <span className="text-xs text-slate-400 font-mono ml-auto">
                    {preset.fontFamily.split(',')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual Fine Tuning */}
      <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          Ajustes Individuales
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-xs text-slate-400 mb-2 font-medium">Color Principal (Accent)</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={currentTheme.primaryColor}
                onChange={(e) =>
                  setTheme({ ...currentTheme, primaryColor: e.target.value })
                }
                className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer p-0.5"
              />
              <span className="font-mono text-xs text-slate-300">{currentTheme.primaryColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-2 font-medium">Fondo del Documento</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={currentTheme.bgContainer}
                onChange={(e) =>
                  setTheme({ ...currentTheme, bgContainer: e.target.value })
                }
                className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer p-0.5"
              />
              <span className="font-mono text-xs text-slate-300">{currentTheme.bgContainer}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
