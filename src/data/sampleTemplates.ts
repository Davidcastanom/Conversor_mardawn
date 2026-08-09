import { DEFAULT_MARKDOWN } from './defaultMarkdown';

export interface SampleTemplate {
  id: string;
  name: string;
  description: string;
  filename: string;
  content: string;
}

export const SAMPLE_TEMPLATES: SampleTemplate[] = [
  {
    id: 'datalens',
    name: 'README DataLens (ForenseDB)',
    description: 'Documento completo de arquitectura, instalación y especificaciones',
    filename: 'DataLens_Documentacion',
    content: DEFAULT_MARKDOWN,
  },
  {
    id: 'informe-tecnico',
    name: 'Informe de Auditoría Técnica',
    description: 'Reporte ejecutivo con métricas de infraestructura, tablas y hallazgos',
    filename: 'Informe_Auditoria_Tecnica',
    content: `# Informe Ejecutivo de Auditoría de Sistemas y Seguridad

![Clasificación](https://img.shields.io/badge/clasificacion-Confidencial-red)
![Estado](https://img.shields.io/badge/estado-Aprobado-success)
![Versión](https://img.shields.io/badge/version-2.4.0-blue)

> **Evaluación periódica de rendimiento, integridad de datos y cumplimiento normativo.**

**Fecha de evaluación:** 09 de Agosto, 2026  
**Auditor Principal:** Ing. Carlos Mendoza (Lead Security Auditor)  
**Entidad Auditada:** Sistema Central de Infraestructura Cloud  

---

## 📌 Resumen Ejecutivo

Durante el ciclo Q3-2026 se realizó una revisión intensiva de las bases de datos transaccionales y servicios backend. El objetivo principal consistió en verificar el nivel de cumplimiento de los Acuerdos de Nivel de Servicio (SLA de **99.99%**) e identificar vulnerabilidades críticas.

### Indicadores Clave de Desempeño (KPIs)
- **Disponibilidad Global:** 99.993%
- **Tiempo medio de respuesta (p95):** 42 ms
- **Capacidad utilizada de almacenamiento:** 64.2%
- **Anomalías detectadas:** 2 críticas, 5 moderadas (todas subsanadas)

---

## 🛡️ Hallazgos y Vulnerabilidades

| ID Hallazgo | Severidad | Módulo Afectado | Descripción del Problema | Estado |
|-------------|-----------|-----------------|--------------------------|--------|
| \`SEC-001\` | 🔴 **Alta** | Auth Gateway | Tiempos de expiración de token JWT superiores a 24h | Solucionado |
| \`PERF-002\` | 🟡 **Media** | PostgreSQL Cluster | Falta de índice compuesto en tabla \`transactions\` | Solucionado |
| \`DATA-003\` | 🟢 **Baja** | Logs Storage | Retención excesiva de logs sin compresión | En Proceso |

> ⚠️ **Nota de Seguridad:** Se recomienda implementar rotación automática de claves secretas cada 90 días mediante integración con **HashiCorp Vault**.

---

## 📊 Arquitectura de Red y Flujo de Datos

\`\`\`
[Cliente Web / Mobile] ──(HTTPS/WSS)──> [Cloudflare WAF]
                                              │
                                     [Load Balancer NGINX]
                                              │
                                 ┌────────────┴────────────┐
                                 ▼                         ▼
                          [Microservicio A]        [Microservicio B]
                                 │                         │
                                 └────────────┬────────────┘
                                              ▼
                                    [Cluster PostgreSQL]
\`\`\`

---

## 📋 Lista de Acciones Recomendadas

1. **Corto Plazo (1-7 días):**
   - Actualizar dependencias de Node.js a la versión v22 LTS.
   - Reforzar reglas de firewall en el entorno de desarrollo.

2. **Mediano Plazo (1 mes):**
   - Implementar réplicas de lectura automáticas para consultas de analítica.
   - Migrar el almacenamiento de imágenes a un bucket con política de cifrado KMS.

---

*Informe generado automáticamente por la plataforma de auditoría.*
`,
  },
  {
    id: 'guia-api',
    name: 'Guía de API REST / Developer Docs',
    description: 'Documentación técnica de endpoints, modelos JSON y respuestas de código',
    filename: 'API_Reference_Manual',
    content: `# Especificación de API REST (v1.0)

![API](https://img.shields.io/badge/API-REST%20v1.0-blue)
![Formato](https://img.shields.io/badge/Formato-JSON-orange)

Bienvenido a la referencia oficial de la **API de Integración DataLens**. Todas las peticiones deben enviarse a través de HTTPS con la cabecera \`Authorization: Bearer <TOKEN>\`.

---

## 🔐 Autenticación

Para obtener una clave API válida, envíe una petición POST al endpoint de autenticación con sus credenciales de servicio:

\`\`\`http
POST /api/v1/auth/login HTTP/1.1
Host: api.datalens.io
Content-Type: application/json

{
  "client_id": "client_abc123",
  "client_secret": "sec_xyz789"
}
\`\`\`

**Respuesta exitosa (200 OK):**
\`\`\`json
{
  "status": "success",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "token_type": "Bearer",
  "expires_in": 3600
}
\`\`\`

---

## 🚀 Endpoints Principales

### 1. Obtener Lista de Documentos
- **URL:** \`/api/v1/documents\`
- **Método:** \`GET\`
- **Parámetros de Consulta:**
  - \`limit\` (integer, opcional): Número máximo de resultados (por defecto: 20).
  - \`page\` (integer, opcional): Número de página.

#### Ejemplo cURL:
\`\`\`bash
curl -X GET "https://api.datalens.io/api/v1/documents?limit=10" \\
  -H "Authorization: Bearer tu_token_aqui"
\`\`\`

---

## ⚡ Códigos de Estado HTTP

| Código | Significado | Descripción |
|--------|-------------|-------------|
| \`200 OK\` | Éxito | La solicitud fue procesada correctamente. |
| \`201 Created\` | Creado | El recurso fue creado exitosamente. |
| \`400 Bad Request\` | Error del cliente | Parámetros inválidos en la petición. |
| \`401 Unauthorized\` | No autorizado | Token inválido o expirado. |
| \`500 Internal Error\` | Error del servidor | Ocurrió un fallo en los servidores centrales. |

---
`,
  },
  {
    id: 'curriculum-cv',
    name: 'Curriculum Vitae / Hoja de Vida',
    description: 'Plantilla limpia y profesional para crear hojas de vida exportables a PDF',
    filename: 'CV_Perfil_Profesional',
    content: `# Alex R. Valenzuela
### **Ingeniero de Software Senior & Arquitecto Frontend**
📍 Madrid, España | ✉️ alex.valenzuela@devmail.com | 🌐 github.com/alexvalenzuela

---

## 👤 Perfil Profesional

Ingeniero de Software con **más de 8 años de experiencia** liderando equipos de desarrollo web y móvil. Especializado en **TypeScript, React, Node.js y arquitectura de sistemas distribuidos**. Apasionado por la optimización del rendimiento web, la accesibilidad (WCAG) y la automatización de flujos de trabajo en CI/CD.

---

## 🛠️ Habilidades Técnicas

- **Lenguajes:** TypeScript, JavaScript (ESNext), Python, SQL, HTML5/CSS3.
- **Frontend:** React 19, Next.js, Vite, Tailwind CSS, Zustand, Redux Toolkit.
- **Backend & Cloud:** Node.js, Express, PostgreSQL, Redis, Docker, AWS (S3, Lambda).
- **Herramientas & Pruebas:** Git, Vitest, Cypress, Webpack, GitHub Actions.

---

## 💼 Experiencia Laboral

### **Lead Frontend Engineer** | *TechCorp Global* (2022 – Presente)
- Lideré la migración de un monolito legacy a una arquitectura basada en microfrontends con **React y Vite**, reduciendo el tiempo de carga inicial en un **45%**.
- Diseñé el sistema de diseño interno consumido por más de 12 equipos de desarrollo.
- Mentoricé a un equipo de 6 ingenieros junior y mid-level.

### **Senior Full Stack Developer** | *Innovatech Solutions* (2019 – 2022)
- Desarrollé APIs REST y WebSockets en Node.js para procesamiento de datos en tiempo real.
- Optimicé consultas PostgreSQL complejas, mejorando la latencia en un 30%.

---

## 🎓 Educación

- **Grado en Ingeniería Informática** — *Universidad Politécnica* (2014 – 2018)
- **Máster en Desarrollo de Aplicaciones Web Complejas** — *Tech Institute* (2018 – 2019)

---
`,
  },
  {
    id: 'vacio',
    name: 'Documento en Blanco',
    description: 'Espacio de trabajo limpio para empezar a escribir desde cero',
    filename: 'Nuevo_Documento',
    content: `# Mi Nuevo Documento

Escribe tu contenido Markdown aquí...

## Sección 1
- Elemento 1
- Elemento 2

> ¡Puedes personalizar los colores en la pestaña "Tema & Estilos"!
`,
  },
];
