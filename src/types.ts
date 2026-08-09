export type ViewMode = 'preview' | 'code' | 'editor' | 'customizer';

export interface ThemeConfig {
  name: string;
  primaryColor: string;
  primaryLight: string;
  bgContainer: string;
  textColor: string;
  fontFamily: string;
}

export const THEME_PRESETS: Record<string, ThemeConfig> = {
  modernBlue: {
    name: 'Azul Profesional (DataLens Default)',
    primaryColor: '#2563eb',
    primaryLight: '#eff6ff',
    bgContainer: '#ffffff',
    textColor: '#0f172a',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  slateDark: {
    name: 'Oscuro Elegante',
    primaryColor: '#38bdf8',
    primaryLight: '#0f172a',
    bgContainer: '#1e293b',
    textColor: '#f8fafc',
    fontFamily: "'Inter', sans-serif",
  },
  emeraldClean: {
    name: 'Esmeralda Corporativo',
    primaryColor: '#059669',
    primaryLight: '#ecfdf5',
    bgContainer: '#ffffff',
    textColor: '#064e3b',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  warmNordic: {
    name: 'Nórdico Cálido',
    primaryColor: '#4f46e5',
    primaryLight: '#f5f3ff',
    bgContainer: '#fbf8f5',
    textColor: '#1f2937',
    fontFamily: "Georgia, serif",
  }
};
