# 📄 DataLens Studio — Conversor & Editor Reutilizable de Markdown a HTML & PDF

[![Licencia](https://img.shields.io/badge/Licencia-AGPL--3.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.0.0-61dafb.svg?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.9-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/Despliegue-GitHub_Pages-2ea44f.svg?logo=github)](https://pages.github.com/)

**DataLens Studio** es una suite web interactiva, moderna y 100% cliente que permite cargar, editar y convertir cualquier documento Markdown (`.md`, `.markdown`, `.txt`) en documentos **HTML5 autocontenidos con CSS embebido** y archivos **PDF profesionales con saltos de página inteligentes**.

---

## 📋 Tabla de Contenidos

- [✨ Características Destacadas](#-características-destacadas)
- [🖥️ Vistas y Modos de Trabajo](#️-vistas-y-modos-de-trabajo)
- [🧩 Reutilización & Carga de Archivos](#-reutilización--carga-de-archivos)
- [📄 Algoritmo de Generación PDF Inteligente](#-algoritmo-de-generación-pdf-inteligente)
- [🎨 Personalizador de Temas y Estilos](#-personalizador-de-temas-y-estilos)
- [🛠️ Guía de Instalación y Ejecución Local](#️-guía-de-instalación-y-ejecución-local)
- [🌐 Despliegue en GitHub Pages y Servicios Cloud](#-despliegue-en-github-pages-y-servicios-cloud)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🛡️ Licencia & Créditos](#️-licencia--créditos)

---

## ✨ Características Destacadas

- 🔄 **Reutilizable con Cualquier Archivo `.md`:** Sube tus propios archivos locales o arrástralos directamente (*Drag & Drop*) a cualquier área de la pantalla.
- ⚡ **Procesamiento 100% Local y Privado:** Toda la conversión ocurre dentro de tu navegador web mediante la API de `FileReader`, sin enviar tus documentos a servidores externos.
- 📐 **Saltos de Página Inteligentes para PDF:** Previene cortes antiestéticos en medio de encabezados, tablas, bloques de código (`pre`), citas (`blockquote`) y párrafos.
- 🎨 **Estilos CSS Embebidos en HTML:** Al descargar el archivo HTML, se genera una etiqueta `<style>` con el sistema de diseño completo e imágenes/badges cargados vía HTTPS.
- ✏️ **Editor de Alta Visibilidad:** Control dinámico del tamaño de fuente en el editor (desde **14px** hasta **24px**) con resaltado de sintaxis y atajos rápidos de formato Markdown.
- 🖼️ **Vista Dividida (*Split View*):** Edita el texto Markdown a la izquierda y observa la actualización del documento rendered en vivo a la derecha.
- 📚 **Plantillas Incorporadas:** Incluye ejemplos listos para probar: Manuales de Arquitectura, Informes de Auditoría Técnica, Documentación de APIs REST y Curriculums Vitae (CV).

---

## 🖥️ Vistas y Modos de Trabajo

| Vista | Descripción |
| :--- | :--- |
| **👁️ Vista Previa** | Visualiza el documento final maquetado tal y como se imprimirá o exportará a PDF. |
| **✏️ Editor Markdown** | Entorno de edición interactivo con controles de tamaño de fuente (S, M, L, XL, XXL), barra de herramientas y vista dividida (*Split*). |
| **💻 Código HTML** | Revisa y copia el código HTML5 fuente generado con CSS embebido listo para publicar o incrustar. |
| **🎨 Tema & Estilos** | Selecciona entre múltiples paletas (Azul Moderno, Verde Esmeralda, Violeta Elegante, Modo Oscuro) y personaliza fuentes o radios de borde. |

---

## 🧩 Reutilización & Carga de Archivos

Puedes utilizar **DataLens Studio** con cualquier archivo `.md` de tres formas distintas:

1. **Arrastrar y Soltar (*Drag & Drop*):** Arrastra cualquier archivo `.md`, `.markdown` o `.txt` desde tu explorador de archivos y suéltalo en cualquier parte de la ventana de la aplicación.
2. **Botón de Subida "Subir .md":** Ubicado en la barra de navegación superior y dentro del editor.
3. **Pega Directa / Editor:** Copia el texto Markdown desde tu editor favorito (VS Code, Obsidian, Notion) y pégalo directamente en la pestaña **Editor Markdown**.

---

## 📄 Algoritmo de Generación PDF Inteligente

La exportación a PDF combina `html2canvas` y `jsPDF` con un cálculo preciso del DOM para lograr acabado de imprenta:

1. **Aislamiento en Marco Oculto:** El documento se renderiza en un `iframe` invisible con dimensiones A4 fijas a resolución DPI alta (`scale: 2`).
2. **Inspección de Bloques:** Se extrae la posición vertical (`getBoundingClientRect`) de todos los elementos `h1-h6`, `table`, `pre`, `blockquote`, `ul`, `ol` y `p`.
3. **Corte Ajustado:** Se determina si un corte de página natural atraviesa un elemento. Si el elemento cabe en la página posterior, se ajusta el punto de corte justo arriba del elemento con un buffer de seguridad de 6px.
4. **Protección de Encabezados Huérfanos:** Evita que un título (`h1-h4`) quede atrapado al final de una página sin su contenido correspondiente.

---

## 🎨 Personalizador de Temas y Estilos

La aplicación cuenta con una amplia variedad de presets visuales y configuraciones:

- **Presets de Tema:**
  - 🔵 **Azul Moderno (DataLens Default):** Fondo blanco limpio, acentos en azul índigo.
  - 🟢 **Verde Esmeralda:** Ideal para informes financieros, métricas e innovación.
  - 🟣 **Violeta Elegante:** Apariencia ejecutiva y creativa.
  - 🌑 **Dark Executive (Modo Oscuro):** Fondo oscuro mate (`#0f172a`) con tipografía clara y contraste optimizado.
- **Tipografías Soportadas:** Plus Jakarta Sans, Inter, JetBrains Mono, Roboto, Lora, Playfair Display.

---

## 🛠️ Guía de Instalación y Ejecución Local

### Prerrequisitos

Asegúrate de tener instalados en tu sistema:
- **Node.js**: v18.0.0 o superior ([Descargar Node.js](https://nodejs.org/))
- **npm**: v9.0.0 o superior

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/datalens-studio.git
   cd datalens-studio
   ```

2. **Instalar dependencias de Node:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Modo SPA estático alternativo con Vite:**
   ```bash
   npm run dev:vite
   ```

---

## 🌐 Despliegue en GitHub Pages y Servicios Cloud

### Despliegue Automático en GitHub Pages

Este proyecto viene preconfigurado con **GitHub Actions** (`.github/workflows/deploy.yml`):

1. Sube tu proyecto a GitHub.
2. Dirígete a **Settings** -> **Pages** en tu repositorio de GitHub.
3. En **Source**, selecciona **GitHub Actions**.
4. Cada commit pushed a la rama `main` o `master` compilará y publicará la aplicación automáticamente.

### Despliegue en Vercel

Este proyecto utiliza **Vite + React + TypeScript** (no Angular). Si Vercel detectó por error el framework como Angular y muestra el mensaje `sh: línea 1: ng: comando no encontrado`:

1. El repositorio incluye un archivo **`vercel.json`** que fuerza el selector a **Vite**:
   ```json
   {
     "framework": "vite",
     "buildCommand": "npm run build:static",
     "outputDirectory": "dist"
   }
   ```
2. **Ajustes en el Panel de Vercel (Project Settings):**
   - **Framework Preset:** Selecciona `Vite` (o `Other`). **NO** selecciones `Angular`.
   - **Build Command:** `npm run build:static` (o `vite build`)
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Compilación Estática Manual

Para desplegar en otros servicios como **Netlify**, **Render**, **Cloudflare Pages** o **AWS S3**:

```bash
npm run build:static
```

Los archivos de distribución final se generarán en el directorio `/dist`.

---

## 📂 Estructura del Proyecto

```
datalens-studio/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Pipeline de despliegue automático para GitHub Pages
├── public/                      # Recursos estáticos
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Barra superior, títulos, selector de plantillas y exportación
│   │   ├── MarkdownEditor.tsx   # Editor con vista dividida, toolbar y ajuste de fuente (14px-24px)
│   │   ├── HtmlPreview.tsx      # Previsualizador interactivo del documento impreso
│   │   ├── CodeViewer.tsx       # Visor de código fuente HTML embebido con botón de copia
│   │   └── ThemeCustomizer.tsx  # Galería de temas, fuentes y ajuste de esquinas/sombras
│   ├── data/
│   │   ├── defaultMarkdown.ts   # Documentación inicial por defecto
│   │   └── sampleTemplates.ts   # Muestras reutilizables (Informes, APIs, CV, Blanqueador)
│   ├── utils/
│   │   ├── htmlGenerator.ts     # Generador de plantilla HTML5 completa con CSS embebido
│   │   └── pdfGenerator.ts      # Motor de captura e impresión PDF con saltos inteligentes
│   ├── types.ts                 # Definición de interfaces TypeScript
│   ├── App.tsx                  # Componente contenedor principal
│   └── main.tsx                 # Entrada principal React
├── server.ts                    # Servidor Express con middleware Vite integrado
├── vite.config.ts               # Configuración de Vite (base relativo './')
├── package.json                 # Gestión de dependencias y scripts de compilación
└── README.md                    # Documentación oficial del repositorio
```

---

## 🛡️ Licencia & Créditos

Este proyecto está distribuido bajo la licencia **AGPL-3.0**.  
Creado por el equipo de **DataLens / Flujo_Base**.
