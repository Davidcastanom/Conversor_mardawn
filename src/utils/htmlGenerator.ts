import { marked } from 'marked';
import { ThemeConfig } from '../types';

export function convertMarkdownToHtmlBody(markdown: string): string {
  // Configure marked for safe clean rendering
  return marked.parse(markdown, { async: false }) as string;
}

export function generateFullHtmlDocument(
  markdownContent: string,
  theme: ThemeConfig,
  documentTitle: string = 'DataLens — Documentación'
): string {
  const parsedBody = convertMarkdownToHtmlBody(markdownContent);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${documentTitle}</title>
  <style>
    /* ==========================================================================
       DataLens Document Design System (Embedded CSS)
       ========================================================================== */
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    :root {
      --font-sans: ${theme.fontFamily};
      --font-mono: 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      
      --color-bg: #f8fafc;
      --color-surface: ${theme.bgContainer};
      --color-text-main: ${theme.textColor};
      --color-text-muted: ${theme.textColor === '#f8fafc' ? '#94a3b8' : '#475569'};
      --color-text-light: ${theme.textColor === '#f8fafc' ? '#64748b' : '#64748b'};
      
      --color-primary: ${theme.primaryColor};
      --color-primary-dark: ${theme.primaryColor};
      --color-primary-light: ${theme.primaryLight};
      --color-primary-border: ${theme.primaryColor}33;
      
      --color-border: ${theme.textColor === '#f8fafc' ? '#334155' : '#e2e8f0'};
      --color-border-subtle: ${theme.textColor === '#f8fafc' ? '#1e293b' : '#f1f5f9'};
      
      --color-code-bg: #0f172a;
      --color-code-text: #f8fafc;
      
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
      --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02);

      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;
    }

    /* Reset & Base */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      font-size: 16px;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--color-bg);
      color: var(--color-text-main);
      line-height: 1.65;
      padding: 2.5rem 1rem;
    }

    /* Document Layout Sheet */
    .document-container {
      max-width: 900px;
      margin: 0 auto;
      background: var(--color-surface);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      border: 1px solid var(--color-border);
      padding: 3.5rem 4rem;
      position: relative;
    }

    /* Top Accent Line */
    .document-container::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, var(--color-primary) 0%, #3b82f6 50%, #6366f1 100%);
      border-top-left-radius: var(--radius-lg);
      border-top-right-radius: var(--radius-lg);
    }

    /* Typography */
    h1, h2, h3, h4, h5, h6 {
      color: var(--color-text-main);
      font-weight: 700;
      line-height: 1.25;
      letter-spacing: -0.02em;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 1.25rem;
      color: var(--color-primary);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      page-break-after: avoid;
      break-after: avoid;
    }

    h2 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-top: 2.75rem;
      margin-bottom: 1.25rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--color-border-subtle);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      page-break-after: avoid;
      break-after: avoid;
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-top: 1.75rem;
      margin-bottom: 0.75rem;
      color: var(--color-text-main);
      page-break-after: avoid;
      break-after: avoid;
    }

    p {
      margin-bottom: 1.25rem;
      color: var(--color-text-muted);
      font-size: 1rem;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    strong {
      color: var(--color-text-main);
      font-weight: 600;
    }

    em {
      font-style: italic;
    }

    hr {
      border: none;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, var(--color-border) 20%, var(--color-border) 80%, transparent 100%);
      margin: 2.5rem 0;
    }

    /* Header Badges Grid */
    p img {
      display: inline-block;
      margin-right: 0.35rem;
      margin-bottom: 0.5rem;
      vertical-align: middle;
      border-radius: 4px;
    }

    /* Blockquote Callout */
    blockquote {
      background: var(--color-primary-light);
      border-left: 4px solid var(--color-primary);
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
      padding: 1.25rem 1.5rem;
      margin: 1.5rem 0 2rem 0;
      color: var(--color-text-main);
      font-size: 1.1rem;
      font-weight: 500;
      box-shadow: var(--shadow-sm);
      page-break-inside: avoid;
      break-inside: avoid;
    }

    blockquote p {
      margin: 0;
      color: inherit;
    }

    /* Lists */
    ul, ol {
      margin-bottom: 1.25rem;
      padding-left: 1.5rem;
      color: var(--color-text-muted);
      page-break-inside: avoid;
      break-inside: avoid;
    }

    li {
      margin-bottom: 0.4rem;
    }

    li::marker {
      color: var(--color-primary);
    }

    /* Tables */
    .table-responsive, table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
      text-align: left;
      margin: 1.5rem 0 2rem 0;
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 1px solid var(--color-border);
      page-break-inside: avoid;
      break-inside: avoid;
    }

    thead {
      background-color: var(--color-border-subtle);
      border-bottom: 2px solid var(--color-border);
    }

    th {
      padding: 0.85rem 1rem;
      font-weight: 600;
      color: var(--color-text-main);
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
    }

    tr {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    td {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid var(--color-border-subtle);
      color: var(--color-text-muted);
      vertical-align: top;
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    /* Code & Pre Formatting */
    code {
      font-family: var(--font-mono);
      font-size: 0.85em;
      background-color: rgba(148, 163, 184, 0.15);
      color: var(--color-text-main);
      padding: 0.2em 0.4em;
      border-radius: 4px;
    }

    pre {
      background-color: var(--color-code-bg);
      color: var(--color-code-text);
      padding: 1.25rem 1.5rem;
      border-radius: var(--radius-md);
      overflow-x: auto;
      margin: 1.5rem 0 2rem 0;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      line-height: 1.6;
      box-shadow: var(--shadow-md);
      border: 1px solid #1e293b;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    pre code {
      background-color: transparent;
      color: inherit;
      padding: 0;
      border: none;
      font-size: inherit;
    }

    /* Links */
    a {
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      border-bottom: 1px dashed var(--color-primary-border);
      transition: all 0.2s ease;
    }

    a:hover {
      border-bottom-style: solid;
    }

    /* Footer */
    footer.doc-footer {
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 1px solid var(--color-border);
      text-align: center;
      color: var(--color-text-light);
      font-size: 0.875rem;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Print Stylesheet */
    @media print {
      @page {
        size: A4 portrait;
        margin: 15mm 15mm 15mm 15mm;
      }

      body {
        background-color: #ffffff !important;
        color: #0f172a !important;
        padding: 0 !important;
        margin: 0 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .document-container {
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
        background: #ffffff !important;
      }

      .document-container::before {
        display: none !important;
      }

      h1, h2, h3, h4, h5, h6 {
        break-after: avoid !important;
        page-break-after: avoid !important;
      }

      p, blockquote, pre, table, tr, ul, ol, .table-responsive, footer {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
    }

    @media (max-width: 768px) {
      body { padding: 1rem 0.5rem; }
      .document-container { padding: 2rem 1.5rem; }
      h1 { font-size: 2rem; }
      h2 { font-size: 1.4rem; }
    }
  </style>
</head>
<body>

  <article class="document-container">
    ${parsedBody}

    <footer class="doc-footer">
      <p><strong>DataLens</strong> — Entiende la anatomía de tu información en segundos.</p>
      <p>Creado por <strong>Flujo_Base</strong> | Licencia AGPL-3.0</p>
    </footer>
  </article>

</body>
</html>`;
}
