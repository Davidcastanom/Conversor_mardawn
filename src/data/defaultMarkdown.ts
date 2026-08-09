export const DEFAULT_MARKDOWN = `# DataLens

![Versión](https://img.shields.io/badge/version-0.1.0--alpha-blue)
![Licencia](https://img.shields.io/badge/licencia-AGPL--3.0-green)
![Plataforma](https://img.shields.io/badge/plataforma-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)
![Stack](https://img.shields.io/badge/stack-Tauri%20v2%20%2B%20Rust%20%2B%20React-orange)
![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)
![Creador](https://img.shields.io/badge/creador-Flujo__Base-purple)

> **La claridad que tus datos necesitan antes de tomar decisiones.**

**DataLens** (código interno: *ForenseDB*) es una herramienta de diagnóstico de bases de datos con **despliegue dual** (ADR-008): una aplicación de escritorio **local-first**, ligera y multiplataforma (Tauri v2), y un **servicio web SaaS** (\`forensedb-server\`) que comparten el mismo núcleo. Permite conectarse a bases de datos relacionales, explorar su esquema visualmente, perfilar automáticamente la calidad de los datos, detectar anomalías sin configuración previa, editar registros con trazabilidad completa y exportar un **Data Health Report** listo para presentar.

**Propuesta de valor:** *Entiendé una base de datos desconocida en 5 minutos, sin escribir SQL y sin infraestructura cloud en tu equipo — o desplegá el servicio en la nube para tu equipo de trabajo.*

---

## ✨ Características principales

### Conectividad multi-motor
- Soporte para **PostgreSQL 12+**, **MySQL 5.7+ / MariaDB 10.5+** y **SQLite 3**.
- Modos de conexión: TCP/IP (host/puerto), socket Unix y archivo local (SQLite).
- Almacenamiento seguro de credenciales vía \`SecretStore\`: **keyring nativo del SO** en desktop (macOS Keychain, Windows DPAPI, Linux libsecret) y **Env/Vault** en el server web (ADR-008).
- Connection pooling por conexión activa con timeout configurable.
- Conexiones SSL/TLS con verificación de certificado opcional.
- Reconexión automática ante desconexiones.

### Visualizador de esquema
- Vista de árbol jerárquica: esquema → tablas → columnas (con iconos por tipo de dato).
- Metadatos enriquecidos: tipo de dato, nullable, default, PK, FK e índices.
- **Diagrama ER automático** generado a partir de relaciones FK-PK (grafo interactivo con ReactFlow).
- Búsqueda global fuzzy de tablas y columnas en toda la base de datos.

### Perfilado lateral automático
Al abrir cualquier tabla, se ejecuta un perfilado en segundo plano:
- Estadísticas básicas: count, nulos (%), vacíos (%), distinct count y cardinalidad.
- Rangos numéricos: min, max, media, mediana y desviación estándar.
- Histogramas de distribución (10 buckets por defecto).
- Longitudes min/max/promedio para columnas de texto.
- Top 10 valores más frecuentes y top 10 valores únicos raros.
- **Sampling estratificado** del 5% para tablas con más de 100K filas, con indicador de aproximación.

### Detección de anomalías (zero-config)
Botón **"Analizar calidad"** por tabla con detectores automáticos:
| Detector | Descripción |
|----------|-------------|
| \`NullRatioDetector\` | Columnas con >10% de nulos (umbral ajustable por tipo) |
| \`CardinalityDetector\` | Cardinalidad 0 (columna vacía) o 1 (constante) |
| \`FormatValidator\` | Emails, URLs, fechas y UUIDs malformados |
| \`StatisticalOutlier\` | Outliers vía IQR y Z-score en columnas numéricas |
| \`FKIntegrityDetector\` | Claves foráneas huérfanas |
| \`DuplicateDetector\` | Filas duplicadas exactas o casi-duplicadas (fuzzy en textos) |

Cada hallazgo incluye severidad (\`info\` / \`warning\` / \`critical\`), descripción, filas afectadas de ejemplo y sugerencia de corrección.

### Editor de datos con audit log
- Grid editable con doble clic en celda y validación de tipo en frontend.
- Operaciones: editar celda, eliminar fila e insertar fila.
- **Audit log inmutable** append-only en SQLite local con hash SHA-256 encadenado.
- Undo/Redo operacional por sesión (máximo 50 niveles).
- Panel lateral con historial de modificaciones de la sesión actual.

### Data Health Report
Generación de informe consolidado exportable en **Markdown**, **HTML** y **PDF**:
- Portada con nombre de BD, fecha y autor.
- Resumen ejecutivo: conteo de tablas, total de registros y severidad global.
- Hallazgos críticos con anomalías detectadas.
- Perfiles de tabla con estadísticas e histogramas embebidos.
- Diagrama ER del esquema y recomendaciones automáticas.

### Principios de diseño
1. **Local-first** — Desktop funciona 100% offline. Sin cuentas obligatorias (el SaaS web es opt-in, ADR-008).
2. **Zero-config** — Perfilado y detección de anomalías con un clic, sin parámetros.
3. **Presentable** — Salida lista para email o reunión sin edición manual.
4. **Seguro** — Credenciales vía \`SecretStore\` (keyring del SO / Env-Vault). Sin telemetría de queries.

---

## 🏗️ Arquitectura y stack tecnológico

### Visión general

DataLens tiene **despliegue dual** (ADR-008): un núcleo Rust compartido (capas 1–4, transport-agnostic) expuesto por dos shells de Capa 5. En **desktop** (Tauri v2), el frontend React/TypeScript se comunica con el backend Rust mediante **comandos IPC tipados** generados con \`tauri-specta\`; no existe backend remoto y todo el procesamiento ocurre localmente. En **web** (SaaS), el mismo núcleo se expone como API HTTP/WebSocket (\`forensedb-server\`, Axum) y el frontend usa \`HttpAdapter\` — los tipos \`Generated.ts\` son idénticos en ambos canales.

\`\`\`
┌──────────────────────────────────────────────────────────────┐
│  UI Layer (Tauri WebView + React 19 + TypeScript)           │
│  ├─ Schema Explorer (árbol + diagrama ER)                   │
│  ├─ Data Grid (TanStack Table v8)                           │
│  ├─ Profiling Dashboard (Recharts / Plotly)                 │
│  ├─ Anomaly Report Viewer                                   │
│  └─ Report Generator (preview + export)                     │
├──────────────────────────────────────────────────────────────┤
│  Application Core (Rust — transport-agnostic, ADR-008)       │
│  ├─ API Boundary: mismos handlers expuestos como             │
│  │    Tauri Commands (desktop) · rutas Axum (web)            │
│  ├─ Session Manager · Schema Introspection Engine           │
│  ├─ Profiling Orchestrator · Anomaly Detection Pipeline     │
│  ├─ Audit Log WAL · Report Generator · ExportService         │
├──────────────────────────────────────────────────────────────┤
│  Data Access Layer (Rust)                                   │
│  ├─ Connection Pool Manager (SQLx nativo)                     │
│  ├─ SQLx Drivers (PostgreSQL, MySQL, SQLite)              │
│  ├─ Dialect Mapper · Type System Unificado                  │
├──────────────────────────────────────────────────────────────┤
│  Analytics Engine (DuckDB embebido + Polars)                │
│  ├─ Cache analítico local · Agregaciones vectorizadas      │
│  └─ Histogramas, percentiles y sampling engine            │
└──────────────────────────────────────────────────────────────┘
\`\`\`

### Flujo de datos principal

\`\`\`
Desktop:
Usuario → React Components → Zustand Stores → ApiClient (TauriAdapter)
       → Tauri Commands (Rust) → Application Services → Domain Engines
       → Drivers (SQLx) → PostgreSQL / MySQL / SQLite

Web (SaaS):
Navegador → React Components → Zustand Stores → ApiClient (HttpAdapter)
       → forensedb-server (Axum) → mismos Application Services
       → Drivers (SQLx) → PostgreSQL / MySQL / SQLite
\`\`\`

### Stack tecnológico

| Capa | Tecnología | Versión / Detalle |
|------|-----------|-------------------|
| **Shell desktop** | Tauri | v2 — binario <20 MB, RAM <100 MB |
| **Shell web (SaaS)** | Axum | \`forensedb-server\` — mismo núcleo vía HTTP/WS (ADR-008) |
| **Backend / Core** | Rust | 1.78+ (edition 2021) |
| **Runtime async** | Tokio | 1.38 |
| **Drivers SQL** | SQLx | 0.8+ — PostgreSQL, MySQL, SQLite |
| **OLAP embebido** | DuckDB | 0.10 (duckdb-rs, bundled) |
| **DataFrames** | Polars | Vectorizado, lazy evaluation |
| **Secrets** | \`SecretStore\` (trait) | Keyring del SO (desktop) · Env/Vault (web) |
| **Templating** | Handlebars | Reportes HTML/Markdown |
| **PDF** | headless_chrome | Renderizado HTML → PDF (feature opcional) |
| **Logging** | tracing + tracing-subscriber | Observabilidad estructurada |
| **Frontend** | React | 19 |
| **Build tool** | Vite | 6 |
| **Estado global** | Zustand | 5 |
| **UI Components** | Radix UI + Tailwind CSS | v4 |
| **Tablas** | TanStack Table | v8 — virtualización y edición inline |
| **Gráficos** | Recharts + Plotly.js | Histogramas interactivos |
| **Diagramas ER** | ReactFlow | 12 — layout force-directed |
| **Formularios** | React Hook Form + Zod | Validación declarativa |
| **Tipos compartidos** | tauri-specta (desktop) · OpenAPI (web) | Mismo namespace \`Generated\` TS |
| **Auth web (SaaS)** | Supabase Auth (detrás de trait \`AuthProvider\`) | Login email/password + OAuth + MFA; solo shell web (ADR-009) |
| **BD server (SaaS)** | Supabase Postgres (\`DATABASE_URL\`) | Audit log por tenant (\`PostgresAuditStorage\`) |
| **Storage exports (SaaS)** | Supabase Storage (S3-compatible) | URLs firmadas de corta vida (RNF6.10) |
| **Testing frontend** | Vitest + RTL + Playwright | Unit, integración y E2E |
| **Testing backend** | tokio-test + mockall + testcontainers | Unit e integración |
| **CI/CD** | GitHub Actions | Build cross-platform |
| **Distribución** | GitHub Releases | AppImage, deb, rpm, winget, Homebrew + imagen Docker del server |

### Estrategia de perfilado por tamaño de tabla

| Tamaño | Estrategia |
|--------|-----------|
| ≤ 100K filas | Agregaciones directas en la BD de origen (pushdown SQL) |
| 100K – 10M filas | Muestra estratificada exportada a DuckDB embebido |
| > 10M filas | Sampling del 1–5% con \`TABLESAMPLE\` (PG) o \`RAND()\` (MySQL) |

---

## 🚀 Prerrequisitos e instalación

### Requisitos del entorno

| Requisito | Versión mínima | Notas |
|-----------|---------------|-------|
| **Rust** | 1.78+ | Instalar vía [rustup.rs](https://rustup.rs) |
| **Node.js** | 20 LTS+ | Requerido para el frontend |
| **npm** o **pnpm** | Latest | Gestor de paquetes del frontend |
| **Git** | 2.x+ | Control de versiones |

#### Dependencias del sistema por plataforma (Tauri v2)

**Windows 10/11 (x64)**
- [Microsoft Edge WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) (incluido en Windows 11).
- Visual Studio Build Tools con workload **Desktop development with C++**.
- Para generación de PDF: Chrome/Chromium instalado (headless_chrome).

**macOS 12+ (Intel y Apple Silicon)**
- Xcode Command Line Tools: \`xcode-select --install\`
- Para firma de releases: Apple Developer ID.

**Linux (Ubuntu 22.04+, Fedora 38+)**
- Dependencias de compilación: \`build-essential\`, \`libssl-dev\`, \`libgtk-3-dev\`, \`libwebkit2gtk-4.1-dev\`, \`libayatana-appindicator3-dev\`, \`librsvg2-dev\`, \`libsecret-1-dev\`.
- Para keyring en Linux: \`libsecret\` (Secret Service).

### Instalación paso a paso

> Para instrucciones detalladas por sistema operativo, solución de problemas y verificación del entorno, consultá [\`Docs/guia_setup_adrs_y_cicd.md\`\`](Docs/guia_setup_adrs_y_cicd.md) (Sección A).

#### 1. Clonar el repositorio

\`\`\`bash
git clone https://github.com/Flujo_Base/datalens.git
cd datalens
\`\`\`

#### 2. Instalar dependencias del frontend

\`\`\`bash
cd forensedb-frontend
npm install
# o: pnpm install
\`\`\`

#### 3. Compilar dependencias del backend (Rust)

\`\`\`bash
# En la raíz del proyecto (workspace raíz)
cargo fetch
\`\`\`

#### 4. Generar bindings TypeScript desde Rust

\`\`\`bash
cargo run --bin generate_bindings   # tauri-specta (canal desktop)
npm run generate:types              # OpenAPI (canal web) — mismo Generated.ts, sin drift (ADR-008)
\`\`\`

Esto regenera \`forensedb-frontend/src/types/generated.ts\` con los tipos compartidos: \`tauri-specta\` para desktop y OpenAPI + \`openapi-typescript\` para el server web.

#### 5. Ejecutar en modo desarrollo

Desde el directorio del frontend:

\`\`\`bash
npm run tauri:dev
\`\`\`

Esto inicia Vite en el puerto **1420** y lanza la ventana de Tauri con hot-reload.

#### 6. Compilar para producción

\`\`\`bash
npm run tauri:build
\`\`\`

Los artefactos se generan en \`forensedb-frontend/src-tauri/target/release/bundle/\` (formato según plataforma: \`.msi\`, \`.dmg\`, \`.AppImage\`, \`.deb\`, \`.rpm\`).

### Compatibilidad de plataformas

| Plataforma | Versiones soportadas |
|-----------|---------------------|
| Windows | 10/11 (x64) |
| macOS | 12+ (Intel y Apple Silicon) |
| Linux | Ubuntu 22.04+, Fedora 38+ |

---

## ⚙️ Variables de entorno y configuración

DataLens **no utiliza un archivo \`.env\` tradicional** para su configuración de runtime. La configuración de la aplicación se gestiona mediante \`config.toml\` en el directorio de configuración del sistema operativo, y las variables de entorno se reservan para el entorno de desarrollo y build.

### Archivo de configuración de la aplicación

**Ubicación:** \`{config_dir}/forensedb/config.toml\`

| SO | Ruta típica |
|----|------------|
| Windows | \`%APPDATA%\\forensedb\\config.toml\` |
| macOS | \`~/Library/Application Support/forensedb/config.toml\` |
| Linux | \`~/.config/forensedb/config.toml\` |

Si el archivo no existe, se crea automáticamente con valores por defecto al primer inicio.

#### Sección \`[profiling]\`

| Parámetro | Valor por defecto | Descripción |
|-----------|------------------|-------------|
| \`default_sample_threshold\` | \`100000\` | Umbral de filas a partir del cual se activa el muestreo |
| \`max_sample_ratio\` | \`0.10\` | Ratio máximo de muestreo (10%) |
| \`default_buckets\` | \`10\` | Número de buckets para histogramas |
| \`timeout_seconds\` | \`300\` | Timeout máximo de perfilado en segundos |
| \`max_concurrent_columns\` | \`4\` | Columnas perfiladas en paralelo |

#### Sección \`[anomaly_detection]\`

| Parámetro | Valor por defecto | Descripción |
|-----------|------------------|-------------|
| \`null_ratio_threshold\` | \`0.10\` | Umbral de ratio de nulos para alerta (10%) |
| \`outlier_iqr_multiplier\` | \`1.5\` | Multiplicador IQR para detección de outliers |
| \`max_anomalies_per_detector\` | \`100\` | Máximo de hallazgos por detector |

#### Sección \`[audit]\`

| Parámetro | Valor por defecto | Descripción |
|-----------|------------------|-------------|
| \`max_entries_before_backup\` | \`1000\` | Entradas antes de backup automático del audit log |
| \`retention_days\` | \`365\` | Días de retención del audit log |
| \`verify_chain_on_startup\` | \`true\` | Verificar cadena de hashes al iniciar |

#### Sección \`[reporting]\`

| Parámetro | Valor por defecto | Descripción |
|-----------|------------------|-------------|
| \`default_template\` | \`"standard"\` | Plantilla de reporte por defecto |
| \`max_tables_per_report\` | \`50\` | Máximo de tablas por reporte |
| \`include_er_diagram\` | \`true\` | Incluir diagrama ER en reportes |

#### Sección \`[ui]\`

| Parámetro | Valor por defecto | Descripción |
|-----------|------------------|-------------|
| \`theme\` | \`"system"\` | Tema: \`"system"\`, \`"light"\` o \`"dark"\` |
| \`page_size\` | \`100\` | Filas por página en el data grid |
| \`max_page_size\` | \`1000\` | Máximo de filas por página |
| \`confirm_destructive_actions\` | \`true\` | Confirmar acciones destructivas (DELETE) |

### Datos locales de la aplicación

| Recurso | Ubicación | Descripción |
|---------|-----------|-------------|
| Audit log | \`{app_data_dir}/audit.db\` | Registro inmutable de ediciones (SQLite; BD del server en web) |
| Cache analítico | \`{app_data_dir}/analytics.duckdb\` | DuckDB embebido para OLAP |
| Credenciales | \`SecretStore\` (\`forensedb_{connection_id}\`) | Keyring del SO en desktop; Env/Vault en web. Nunca en disco plano |

### Variables de entorno para desarrollo

| Variable | Ejemplo | Descripción |
|----------|---------|-------------|
| \`RUST_LOG\` | \`forensedb_backend=debug,tauri=info\` | Nivel de logging del backend Rust |
| \`TAURI_DEBUG\` | \`1\` | Habilita sourcemaps y desactiva minificación en builds de debug |
| \`TAURI_PLATFORM\` | \`windows\` | Plataforma objetivo para el build (\`windows\`, \`macos\`, \`linux\`) |
| \`VITE_*\` | — | Prefijo para variables expuestas al frontend vía Vite (convención estándar) |
| \`DATABASE_URL\` | \`postgres://...\` | BD del server web (audit log por tenant, ADR-008) |
| \`SUPABASE_URL\` | \`https://<project_ref>.supabase.co\` | Auth + BD + Storage del shell web (ADR-009) |
| \`SUPABASE_ANON_KEY\` | \`eyJhbGciOi...\` | Clave anónima pública de Supabase Auth |
| \`SUPABASE_JWT_SECRET\` | — | Secreto para validar JWT en \`auth_guard\` (server) |
| \`EXPORT_DIR\` | \`/var/lib/forensedb/exports\` | Directorio de exports del server web (opcional) |
| \`VITE_API_URL\` | \`https://api.example.com\` | Base URL del server web para \`HttpAdapter\` (SaaS) |

> **Nota de seguridad:** Las credenciales de conexión a bases de datos se guardan vía el trait \`SecretStore\` (ADR-008): **keyring nativo del SO** en desktop (macOS Keychain, Windows DPAPI, Linux libsecret) y **Env/Vault** en el server web — nunca en archivos de configuración en disco plano.

---

## 💻 Uso y ejemplos

### Flujo 1: Primer contacto con una base de datos

1. Abrir la aplicación → pantalla de bienvenida con conexiones recientes.
2. Clic en **"Nueva conexión"** → formulario: motor (PG/MySQL/SQLite), host, puerto, usuario, contraseña, base de datos.
3. Clic en **"Conectar"** → validación de credenciales y almacenamiento en keyring.
4. Panel izquierdo muestra el árbol de esquemas/tablas/columnas.
5. Al expandir una tabla → metadatos + indicador **"Perfilando..."**.
6. En 2–5 segundos aparecen estadísticas en el panel derecho: histograma, nulos, cardinalidad y top valores.

### Flujo 2: Detección de anomalías

1. Seleccionar una tabla → clic en **"Analizar calidad"**.
2. La app ejecuta el pipeline de detectores en segundo plano (spinner con progreso).
3. Resultado: lista de hallazgos agrupados por severidad (crítico / warning / info).
4. Cada hallazgo es expandible y muestra filas de ejemplo afectadas.
5. Marcar hallazgos como **"Revisado"** o **"Ignorado"** (solo UI, no afecta la BD).

### Flujo 3: Generación de reporte

1. Navegar a **Reportes → Nuevo informe**.
2. Seleccionar tablas a incluir (default: todas).
3. Preview del reporte en tiempo real (renderizado HTML).
4. Configurar: incluir/excluir diagrama ER, nivel de detalle (resumen / estándar / completo).
5. Clic en **"Exportar"** → seleccionar formato (PDF, Markdown, HTML).
6. Descarga automática a la carpeta de descargas del SO.

### Comandos IPC / API (Capa 5 — transport-agnostic, ADR-008)

La comunicación frontend ↔ backend usa **los mismos handlers** de la Capa 5 en ambos canales: **Tauri Commands** tipados (desktop, IPC local vía \`tauri-specta\`) y **rutas HTTP/WebSocket** (web, \`forensedb-server\` vía OpenAPI). Los tipos \`Generated.ts\` son idénticos; el frontend cambia solo de transporte (\`TauriAdapter\`/\`HttpAdapter\`).

#### Conexiones

| Comando | Parámetros | Retorno |
|---------|-----------|---------|
| \`create_connection\` | \`CreateConnectionRequest\` | \`ConnectionResponse\` |
| \`list_connections\` | — | \`ConnectionResponse[]\` |
| \`test_connection\` | \`connectionId: string\` | \`ConnectionResponse\` (incluye \`latency_ms\`) |
| \`disconnect\` | \`connectionId: string\` | \`void\` |

#### Esquema

| Comando | Parámetros | Retorno |
|---------|-----------|---------|
| \`get_schema\` | \`connectionId, schemaName\` | \`Schema\` |
| \`get_table_metadata\` | \`connectionId, schema, table\` | \`Table\` |
| \`search_schema\` | \`connectionId, query\` | \`SearchResult[]\` |

#### Perfilado

| Comando | Parámetros | Retorno |
|---------|-----------|---------|
| \`profile_table\` | \`connectionId, schema, table\` | \`string\` (jobId; async en background) |
| \`get_profiling_status\` | \`jobId\` | \`ProfilingStatus\` |
| \`cancel_profiling\` | \`jobId\` | \`void\` |

#### Anomalías

| Comando | Parámetros | Retorno |
|---------|-----------|---------|
| \`detect_anomalies\` | \`connectionId, schema, table\` | \`Anomaly[]\` |
| \`list_anomalies\` | \`connectionId, table?, severity?\` | \`Anomaly[]\` |
| \`update_anomaly_status\` | \`anomalyId, status\` | \`void\` |

#### Edición y auditoría

| Comando | Parámetros | Retorno |
|---------|-----------|---------|
| \`update_cell\` | \`sessionId, connectionId, schema, table, rowId, column, oldValue, newValue\` | \`ExecutionResult\` |
| \`insert_row\` | \`sessionId, connectionId, schema, table, values\` | \`ExecutionResult\` (incluye \`lastInsertId\` para undo) |
| \`delete_row\` | \`sessionId, connectionId, schema, table, rowId\` | \`ExecutionResult\` |
| \`undo\` | \`sessionId\` | \`void\` |
| \`redo\` | \`sessionId\` | \`void\` |
| \`get_audit_log\` | \`connectionId?, tableName?, page, pageSize\` | \`PaginatedResult<AuditEntry>\` |
| \`verify_audit_chain\` | — | \`boolean\` |

#### Exportación

| Comando | Parámetros | Retorno |
|---------|-----------|---------|
| \`export_data\` | \`ExportRequest\` (connectionId, schema, table, filters, format) | \`string\` (jobId; async en background) |
| \`get_export_status\` | \`jobId\` | \`ExportJob\` (progreso 0–100 o ruta resultante) |

#### Reportes

| Comando | Parámetros | Retorno |
|---------|-----------|---------|
| \`generate_report\` | \`GenerateReportRequest\` | \`string\` (ruta del archivo generado) |

### Ejemplo: invocar perfilado desde TypeScript

\`\`\`typescript
import { invoke } from '@tauri-apps/api/core';

const jobId = await invoke('profile_table', {
  connectionId: '550e8400-e29b-41d4-a716-446655440000',
  schema: 'public',
  table: 'users',
});

console.log(jobId); // string; el perfilado corre en background y el resultado llega por get_status (MEJ-006)
\`\`\`

### Ejemplo: generar un Data Health Report

\`\`\`typescript
const outputPath = await invoke('generate_report', {
  request: {
    connectionId: '550e8400-e29b-41d4-a716-446655440000',
    tables: ['public.users', 'public.orders'],
    format: 'pdf',
    includeErDiagram: true,
    detailLevel: 'standard',
  },
});

console.log(\`Reporte generado en: \${outputPath}\`);
\`\`\`

### Atajos de teclado

| Atajo | Acción |
|-------|--------|
| \`Ctrl+K\` | Búsqueda global de tablas/columnas |
| \`Ctrl+E\` | Ejecutar query / acción principal del contexto |
| \`Ctrl+Z\` | Undo (edición de datos) |
| \`Ctrl+Shift+Z\` | Redo (edición de datos) |

### Scripts npm disponibles

| Script | Descripción |
|--------|-------------|
| \`npm run dev\` | Inicia Vite en modo desarrollo (solo frontend) |
| \`npm run tauri:dev\` | Inicia la app completa con Tauri + hot-reload |
| \`npm run build\` | Compila el frontend (\`tsc && vite build\`) |
| \`npm run tauri:build\` | Compila la app de escritorio para producción |
| \`cargo run -p forensedb-server\` | Levanta el servicio web (SaaS) local (Axum, ADR-008) |
| \`npm run test\` | Ejecuta tests unitarios con Vitest |
| \`npm run test:e2e\` | Ejecuta tests E2E con Playwright |
| \`npm run lint\` | Linting con ESLint |
| \`npm run typecheck\` | Verificación de tipos TypeScript |
| \`npm run generate:types\` | Regenera bindings TypeScript desde Rust (desktop y web) |

---

## 🧪 Testing y calidad de código

### Frontend

**Pirámide de testing:**

\`\`\`
        /\\          E2E (Playwright + Tauri) — ~5%
       /  \\         Flujos críticos: conectar, perfilar, exportar reporte
      /----\\        Integration (RTL + Vitest) — ~15%
     /      \\       Stores, hooks, flujo de datos
    /--------\\      Unit (Vitest) — ~80%
   /          \\     Utilidades, parsers, formatters, type guards
\`\`\`

\`\`\`bash
# Tests unitarios e integración (Vitest + React Testing Library)
npm run test

# Tests E2E (Playwright)
npm run test:e2e

# Verificación de tipos
npm run typecheck

# Linting
npm run lint
\`\`\`

**Cobertura objetivo por capa (frontend):**

| Capa | Framework | Cobertura objetivo |
|------|-----------|-------------------|
| Stores (Zustand) | Vitest + mocks de IPC | 85% |
| Componentes UI | RTL + Vitest | 80% |
| Utilidades / formatters | Vitest | 90% |
| Flujos E2E | Playwright | Flujos críticos cubiertos |

### Backend (Rust)

\`\`\`bash
# Tests unitarios e integración
cargo test

# Tests con output verbose
cargo test -- --nocapture

# Tests de un módulo específico
cargo test profiling_engine

# Linting con Clippy
cargo clippy -- -D warnings

# Formateo
cargo fmt --check
\`\`\`

**Cobertura objetivo por capa (backend):**

| Capa | Framework | Cobertura objetivo |
|------|-----------|-------------------|
| Drivers | sqlx test + testcontainers | 90% |
| DAL | tokio::test | 85% |
| Domain Engines | standard test | 90% |
| Services | tokio::test + mocks | 80% |
| Commands (IPC) | tauri test + specta | 70% |

### Métricas de rendimiento (objetivos del MVP)

| Métrica | Objetivo |
|---------|----------|
| Startup de la app | < 2 s (SSD) |
| Conexión a BD local | < 500 ms |
| Perfilado tabla 10K filas | < 3 s |
| Perfilado tabla 1M filas (muestreo) | < 5 s |
| Memoria RAM en uso normal | < 300 MB |
| Crash rate | < 0.1% |

---

## 📂 Estructura del proyecto

\`\`\`
datalens/
├── Docs/                              # Documentación de arquitectura y especificación
│   ├── informe_mvp_forensedb.md       # Informe técnico del MVP (alcance, roadmap, RF/RNF)
│   ├── mapa_arquitectonico_backend.md # Arquitectura del backend Rust
│   ├── mapa_arquitectonico_frontend.md# Arquitectura del frontend React
│   ├── Arquitectura_de_marca.md       # Identidad de marca DataLens
│   └── guia_setup_adrs_y_cicd.md      # Setup por SO, 7 ADRs y workflows CI/CD
│
├── Cargo.toml                        # Workspace raíz: [forensedb-backend, forensedb-frontend/src-tauri, forensedb-server]
├── forensedb-backend/                 # Crate LIB: drivers, dal, domain, services + bin generate_bindings
│   ├── Cargo.toml                     # Dependencias: tokio, sqlx, duckdb, tauri (solo para traits), etc.
│   ├── src/
│   │   ├── lib.rs                     # Re-exports públicos (services, commands, registry)
│   │   ├── commands/                  # Capa 5: handlers transport-agnostic (IPC desktop / HTTP web, ADR-008)
│   │   │   ├── connection.rs          #   create, list, test, disconnect
│   │   │   ├── schema.rs              #   get_schema, get_table_metadata, search
│   │   │   ├── profiling.rs           #   profile_table, get_status, cancel
│   │   │   ├── anomaly.rs             #   detect, list, update_status
│   │   │   ├── edit.rs                #   update_cell, insert_row, delete_row, undo, redo
│   │   │   ├── report.rs              #   generate_report
│   │   │   ├── export.rs              #   export_data, get_export_status
│   │   │   └── audit.rs               #   get_audit_log, verify_chain
│   │   ├── services/                  # Capa 4: Application Services (orquestadores)
│   │   ├── domain/                    # Capa 3: Domain Logic (motores y reglas)
│   │   │   ├── models/                #   Entidades: Connection, Schema, Anomaly, AuditEntry
│   │   │   ├── engines/               #   Introspection, Profiling, AnomalyDetection, Report
│   │   │   └── traits/                #   DatabaseDriver, AnomalyDetector, TypeMapper
│   │   ├── dal/                       # Capa 2: Data Access Layer
│   │   │   ├── driver_registry.rs     #   Registro de drivers por motor
│   │   │   ├── pool_manager.rs        #   Connection pooling
│   │   │   ├── dialect_mapper.rs      #   AST → SQL nativo
│   │   │   ├── type_system.rs         #   UniversalType canónico
│   │   │   └── duckdb_adapter.rs      #   OLAP embebido
│   │   ├── drivers/                   # Capa 1: Implementaciones de drivers
│   │   │   ├── postgres/              #   Driver PostgreSQL (SQLx)
│   │   │   ├── mysql/                 #   Driver MySQL/MariaDB (SQLx)
│   │   │   └── sqlite/                #   Driver SQLite (SQLx)
│   │   ├── infrastructure/            # SecretStore (trait), filesystem, crypto, config, audit_storage
│   │   └── error.rs                   # Tipos de error globales
│   ├── tests/                         # Tests de integración + fixtures
│   └── migrations/                    # Schema migrations del audit log local
│
├── forensedb-frontend/                # Frontend React + TypeScript
│   ├── src/
│   │   ├── main.tsx                   # Entry point React
│   │   ├── App.tsx                    # Root component + routing
│   │   ├── types/
│   │   │   └── generated.ts           # AUTO-GENERADO (tauri-specta desktop / OpenAPI web) — mismo namespace
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   │   ├── client.ts          # ApiClient: interfaz tipada del canal activo (ADR-008)
│   │   │   │   ├── tauriAdapter.ts    #   Transporte desktop: invoke() de Tauri
│   │   │   │   └── httpAdapter.ts     #   Transporte web: fetch a forensedb-server (SaaS)
│   │   │   ├── utils.ts               # cn() y utilidades generales
│   │   │   └── formatters.ts          # Formateo de números, fechas, bytes
│   │   ├── stores/                    # Zustand stores por dominio
│   │   │   ├── connectionStore.ts     #   Conexiones activas y configs
│   │   │   ├── schemaStore.ts         #   Esquemas, tablas, cache
│   │   │   ├── profilingStore.ts      #   Jobs y resultados de perfilado
│   │   │   ├── anomalyStore.ts        #   Hallazgos y filtros
│   │   │   ├── editStore.ts           #   Edición, undo/redo, audit
│   │   │   └── uiStore.ts             #   Tema, layout, preferencias
│   │   ├── hooks/                     # useIpc, useTheme, useDebounce, etc.
│   │   ├── components/
│   │   │   ├── ui/                    # Componentes base (Radix + Tailwind)
│   │   │   ├── layout/                # AppLayout, Sidebar, TopBar, StatusBar
│   │   │   ├── connection/            # ConnectionModal, ConnectionForm, ConnectionList
│   │   │   ├── schema/                # SchemaTree, ERDiagram, SearchBox
│   │   │   ├── data-grid/             # DataGrid editable (TanStack Table)
│   │   │   ├── profiling/             # ProfilingPanel, HistogramChart, TopValuesList
│   │   │   ├── anomaly/               # AnomalyPanel, AnomalyList, SeverityFilter
│   │   │   ├── report/                # ReportModal, ReportPreview, ReportGenerator
│   │   │   ├── audit/                 # AuditLogPanel, AuditEntryRow
│   │   │   └── shared/                # EmptyState, ErrorBoundary, LoadingOverlay
│   │   └── features/                  # Feature slices (lógica + UI por módulo)
│   ├── src-tauri/                     # Crate BIN: shell Tauri v2 (main.rs + registro de commands)
│   │   ├── Cargo.toml                 #   Depende de forensedb-backend (path) + tauri
│   │   ├── src/main.rs                #   Entry point Tauri: Builder + register_commands
│   │   └── tauri.conf.json            #   Configuración del shell (permissions, updater)
│   ├── tests/
│   │   ├── unit/                      # Tests unitarios (Vitest)
│   │   ├── integration/               # Tests de integración (RTL)
│   │   └── e2e/                       # Tests E2E (Playwright)
│   ├── vite.config.ts                 # Vite + alias @/ + config Tauri
│   ├── tailwind.config.ts             # Tailwind CSS v4 + tokens de diseño
│   ├── tsconfig.json                  # TypeScript strict mode
│   └── package.json                   # Dependencias y scripts npm
│
└── README.md                          # Este archivo
\`\`\`

---

## 🤝 Contribución y licencia

### Cómo contribuir

DataLens es un proyecto **open source** bajo licencia AGPL-3.0. Las contribuciones de la comunidad son bienvenidas, especialmente en detectores de anomalías y drivers de bases de datos.

1. **Fork** del repositorio.
2. Crear una rama descriptiva: \`git checkout -b feature/nombre-descriptivo\`.
3. Seguir las convenciones del proyecto:
   - Backend: Rust edition 2021, \`cargo fmt\` + \`cargo clippy\` sin warnings.
   - Frontend: TypeScript strict, zero \`any\`, ESLint sin errores.
   - Commits en español o inglés, mensajes claros y concisos.
4. Asegurar que los tests pasen: \`cargo test\` (backend) y \`npm run test\` (frontend).
5. Regenerar bindings si modificaste structs Rust expuestos vía IPC: \`npm run generate:types\`.
6. Abrir un **Pull Request** con descripción del cambio, motivación y plan de pruebas.

> **Alcance del MVP:** Este documento y la carpeta \`Docs/\` actúan como contrato de alcance. Cualquier feature nueva debe justificarse y, de ser necesario, reemplazar otra feature planificada para evitar scope creep.

### Roadmap resumido (16 semanas)

| Fase | Semanas | Entregable |
|------|---------|-----------|
| 0 — Fundamentos | 1–2 | App conecta a SQLite y muestra esquema |
| 1 — Conectividad y Esquema | 3–5 | PG/MySQL/SQLite + diagrama ER |
| 2 — Perfilado Automático | 6–8 | Perfilado con histogramas al abrir tabla |
| 3 — Detección de Anomalías | 9–10 | Botón "Analizar calidad" funcional |
| 4 — Edición y Audit Log | 11–12 | Edición con trazabilidad y undo/redo |
| 5 — Reportes y Exportación | 13–14 | Data Health Report en PDF/MD/HTML |
| 6 — Polish y Alpha Release | 15–16 | Alpha v0.1.0 cross-platform |

### Licencia

DataLens utiliza un modelo de **licencia dual**:

| Tier | Licencia | Uso |
|------|----------|-----|
| **Community** | [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html) | Uso gratuito, código abierto, contribuciones bienvenidas |
| **Commercial** | Licencia comercial | Uso closed-source en entornos enterprise |

La edición Community es **completa y funcional** (no es crippleware). El revenue del proyecto se sustenta en el tier Team (cloud sync) y licencias comerciales para uso propietario.

---

<p align="center">
  <strong>DataLens</strong> — Entiende la anatomía de tu información en segundos.<br>
  Creado por <strong>Flujo_Base</strong>
</p>
`;
