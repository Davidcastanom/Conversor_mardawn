# 📄 MarkFlow Studio — Conversor & Editor Universal de Markdown a HTML & PDF

[![Licencia](https://img.shields.io/badge/Licencia-AGPL--3.0-blue.svg)](LICENSE)
[![Creado con](https://img.shields.io/badge/Creado%20con-Flujo__Base-purple.svg)]()
[![React](https://img.shields.io/badge/React-19.0.0-61dafb.svg?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.9-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Despliegue Vercel](https://img.shields.io/badge/Despliegue-Vercel-000000.svg?logo=vercel)](https://vercel.com)
[![GitHub Pages](https://img.shields.io/badge/Despliegue-GitHub_Pages-2ea44f.svg?logo=github)](https://pages.github.com/)

> **MarkFlow Studio** es una suite web interactiva, moderna y 100% funcional creada por **Flujo Base** que permite cargar, editar y convertir **cualquier documento Markdown (`.md`, `.markdown`, `.txt`)** en documentos **HTML5 autocontenidos con CSS embebido** y archivos **PDF profesionales con saltos de página inteligentes**.

---

## 📋 Tabla de Contenidos

- [🚀 Características Destacadas](#-características-destacadas)
- [🏠 Portada Landing & Store de Plantillas](#-portada-landing--store-de-plantillas)
- [🖥️ Modos de Vista y Herramientas](#️-modos-de-vista-y-herramientas)
- [📄 Generación PDF Inteligente (Sin Cortes Accidental)](#-generación-pdf-inteligente-sin-cortes-accidental)
- [🎨 Personalización de Temas y Tipografías](#-personalización-de-temas-y-tipografías)
- [🚀 Instrucciones para Subir y Hacer Commit en GitHub](#-instrucciones-para-subir-y-hacer-commit-en-github)
- [🌐 Guía Completa de Despliegue en Vercel, Netlify y GitHub Pages](#-guía-completa-de-despliegue-en-vercel-netlify-y-github-pages)
- [🛠️ Guía de Ejecución Local](#️-guía-de-ejecución-local)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🛡️ Licencia y Créditos](#️-licencia-y-créditos)

---

## 🚀 Características Destacadas

- 🔄 **Funcional para Cualquier Archivo `.md`:** Sube tus propios archivos `.md`, `.markdown` o `.txt` desde la barra superior, el editor o arrastrándolos (*Drag & Drop*) a cualquier parte de la pantalla.
- ⚡ **Procesamiento 100% Local y Privado:** Toda la conversión ocurre dentro de tu navegador web mediante la API de `FileReader`, garantizando que tus documentos nunca salgan de tu equipo.
- 📐 **Saltos de Página Inteligentes para PDF:** Algoritmo que inspecciona el DOM antes de imprimir para prevenir cortes accidentales en títulos, tablas, bloques de código (`pre`), citas (`blockquote`) y párrafos.
- 🎨 **HTML5 Autocontenido con CSS Embebido:** Exporta un único archivo `.html` con todo el diseño empaquetado dentro de etiquetas `<style>`, listo para enviar por correo o publicar en la web.
- 💾 **Descarga Directa de Archivo `.md`:** Descarga las modificaciones realizadas online en un archivo Markdown limpio (`.md`) directamente desde la barra superior o el editor.
- 📚 **Guía Interactiva & CheatSheet Markdown:** Modal integrado con búsqueda por categorías, copiado e inserción en 1-clic de estructuras especiales (encabezados, listas de tareas `- [ ]`, tablas con alineación, badges de Shields.io, citas de alerta `> ⚠️`, bloques colapsables `<details>`, ecuaciones y teclas `<kbd>`).
- 🔗 **Enlace Directo a Documentación Oficial:** Acceso directo a la guía global de sintaxis en `MarkdownGuide.org`.
- ✏️ **Editor Markdown con Fuente Variable:** Control dinámico del tamaño de fuente en el editor desde **14px** hasta **24px** (S, M, L, XL, XXL) con vista previa dividida (*Split View*).
- 🏪 **MarkFlow Store (Plantillas Incorporadas):** Incluye modelos de uso inmediato: Informes de Auditoría Técnica, Especificaciones de API REST, Hojas de Vida (CV) y Lienzo en Blanco.

---

## 🏠 Portada Landing & Store de Plantillas

El proyecto incluye una **Página de Portada (Landing Page)** diseñada para dar la bienvenida al usuario con:
- **Título & Subtítulo Impactantes:** Identificación clara de la herramienta y sus capacidades.
- **Mención de Autoría:** Destacando que es una solución creada por **Flujo Base**.
- **Store de Plantillas:** Catálogo de documentos preestablecidos para un inicio rápido.
- **Acceso Directo a Carga:** Botón para arrastrar/subir un archivo `.md` de inmediato.

---

## 🖥️ Modos de Vista y Herramientas

| Modo de Vista | Descripción |
| :--- | :--- |
| **🏠 Portada (Landing)** | Presentación ejecutiva del producto, características clave y Store de Plantillas. |
| **👁️ Vista Previa** | Muestra el documento maquetado tal como se exportará o imprimirá a PDF. |
| **✏️ Editor Markdown** | Entorno de edición interactivo con ajuste de fuente, barra de accesos directos y vista dividida (*Split*). |
| **💻 Código HTML** | Revisa, descarga o copia al portapapeles el código HTML5 autocontenido con CSS inline/embebido. |
| **🎨 Tema & Estilos** | Selecciona paletas (Azul Profesional, Verde Esmeralda, Violeta Ejecutivo, Modo Oscuro) y personaliza fuentes. |

---

## 📄 Generación PDF Inteligente (Sin Cortes Accidental)

La exportación a PDF combina `html2canvas` y `jsPDF` con un cálculo preciso de límites verticales:

1. **Aislamiento en Marco Oculto:** El documento se renderiza en un contenedor A4 de alta resolución (`scale: 2`).
2. **Inspección de Bloques:** Se evalúa la posición vertical de cada elemento (`h1-h6`, `table`, `pre`, `blockquote`, `p`).
3. **Ajuste de Corte:** Si un elemento es atravesado por un salto de página, la división se calcula justo encima del elemento con un buffer de seguridad.
4. **Protección de Encabezados Huérfanos:** Evita que un título quede al final de una página sin texto debajo.

---

## 🎨 Personalización de Temas y Tipografías

- **Presets Visuales:**
  - 🔵 **Azul Profesional (MarkFlow Default):** Fondo blanco limpio, acentos azules.
  - 🟢 **Verde Esmeralda Corporativo:** Ideal para reportes financieros y de métricas.
  - 🟣 **Nórdico / Violeta Elegante:** Apariencia creativa y ejecutiva.
  - 🌑 **Oscuro Elegante:** Fondo oscuro mate (`#0f172a`) con contraste optimizado para lectura.
- **Fuentes Soportadas:** Plus Jakarta Sans, Inter, Georgia, JetBrains Mono, Roboto, Playfair Display.

---

## 🚀 Instrucciones para Subir y Hacer Commit en GitHub

Si estás listo para enviar estos cambios a tu repositorio de **GitHub**:

```bash
# 1. Verifica el estado de los archivos modificados
git status

# 2. Agrega todos los archivos actualizados al stage
git add .

# 3. Haz un commit con un mensaje descriptivo
git commit -m "feat: renaming brand to MarkFlow Studio, updated landing page and deployment docs for Vercel"

# 4. Envia los cambios a tu rama principal (main o master)
git push origin main
```

---

## 🌐 Guía Completa de Despliegue en Vercel, Netlify y GitHub Pages

### 1. Despliegue en Vercel (Recomendado)

Este proyecto está construido con **Vite + React + TypeScript**. El repositorio incluye el archivo **`vercel.json`** configurado correctamente:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build:static",
  "outputDirectory": "dist"
}
```

#### Pasos en Vercel:
1. Ve a [Vercel Dashboard](https://vercel.com/dashboard) e importa tu repositorio de GitHub.
2. En **Project Settings**:
   - **Framework Preset:** Selecciona `Vite` (O no selecciones `Angular`).
   - **Build Command:** `npm run build:static` (o `vite build`)
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
3. Haz clic en **Deploy**. ¡Tu app estará online en segundos!

---

### 2. Despliegue Automático en GitHub Pages

El proyecto incluye el flujo de trabajo de GitHub Actions en `.github/workflows/deploy.yml`:

1. En tu repositorio de GitHub, ve a **Settings** -> **Pages**.
2. En **Source**, selecciona **GitHub Actions**.
3. Al hacer `git push` a `main` o `master`, la aplicación se compilará y publicará automáticamente.

---

### 3. Despliegue en Netlify / Render / Cloudflare Pages

1. **Build Command:** `npm run build:static`
2. **Publish Directory:** `dist`

---

## 🛠️ Guía de Ejecución Local

### Prerrequisitos
- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior

### Pasos
```bash
# Instalación de dependencias
npm install

# Ejecución del servidor de desarrollo
npm run dev
```
Abre `http://localhost:3000` en tu navegador.

---

## 📂 Estructura del Proyecto

```
markflow-studio/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Pipeline CI/CD para GitHub Pages
├── public/                      # Recursos estáticos e íconos
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx      # Portada de bienvenida, hero y showcase de plantillas
│   │   ├── Navbar.tsx           # Barra superior, títulos, menú de vistas y exportaciones
│   │   ├── MarkdownEditor.tsx   # Editor interactivo con vista dividida y fuente (14px-24px)
│   │   ├── HtmlPreview.tsx      # Previsualizador del documento maquetado
│   │   ├── CodeViewer.tsx       # Visor de código HTML5 embebido con botón de copia
│   │   └── ThemeCustomizer.tsx  # Galería de temas visuales y fuentes
│   ├── data/
│   │   ├── defaultMarkdown.ts   # Documentación por defecto
│   │   └── sampleTemplates.ts   # Plantillas del Store (Informes, APIs, CV)
│   ├── utils/
│   │   ├── htmlGenerator.ts     # Generador de documento HTML5 autocontenido
│   │   └── pdfGenerator.ts      # Motor de captura e impresión PDF con saltos inteligentes
│   ├── types.ts                 # Interfaces TypeScript
│   ├── App.tsx                  # Componente principal de la aplicación
│   └── main.tsx                 # Punto de entrada React
├── vercel.json                  # Configuración para despliegue sin errores en Vercel
├── server.ts                    # Servidor Express con middleware Vite
├── vite.config.ts               # Configuración Vite
├── package.json                 # Gestión de dependencias y scripts
└── README.md                    # Documentación oficial del repositorio
```

---

## 🛡️ Licencia y Créditos

Este proyecto está bajo la licencia **AGPL-3.0**.  
Desarrollado y mantenido por **Flujo Base**.
