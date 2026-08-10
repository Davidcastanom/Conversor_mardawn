import { DEFAULT_MARKDOWN } from './defaultMarkdown';

export interface SampleTemplate {
  id: string;
  name: string;
  description: string;
  filename: string;
  category: string;
  content: string;
}

export const SAMPLE_TEMPLATES: SampleTemplate[] = [
  {
    id: 'documento-inicial',
    name: 'Documento de Ejemplo & Guía Inicial',
    description: 'Guía interactiva completa con ejemplos visuales, tablas y formatos Markdown',
    filename: 'Manual_MarkFlow_Studio',
    category: 'General',
    content: DEFAULT_MARKDOWN,
  },
  {
    id: 'propuesta-proyecto',
    name: 'Propuesta Ejecutiva de Proyecto (Proposal & Scope)',
    description: 'Plantilla estándar para propuestas comerciales, alcance, hitos, presupuesto y entregables',
    filename: 'Propuesta_Ejecutiva_Proyecto',
    category: 'Negocios',
    content: `# Propuesta Ejecutiva de Proyecto: Transformación Digital Cloud

![Alcance](https://img.shields.io/badge/Estado-Propuesta_Oficial-blue)
![Prioridad](https://img.shields.io/badge/Prioridad-Estratégica-emerald)
![Confidencialidad](https://img.shields.io/badge/Clasificación-Restringido-red)

> **Documento formal de especificación de servicios, alcance operativo, cronograma de trabajo y estructura presupuestaria.**

**Cliente:** Corporación Global de Servicios S.A.  
**Proveedor:** Consultoría Tecnológica & Arquitectura Cloud  
**Fecha:** 10 de Agosto, 2026  
**Versión:** 1.0 (Borrador Final para Firma)  

---

## 1. 🎯 Objetivos Estratégicos del Proyecto

El presente proyecto tiene como finalidad modernizar la infraestructura de software de la organización cliente, migrando sistemas legados hacia una arquitectura nativa en la nube distribuida e interoperable.

### Metas Cuantitativas (KPIs)
- **Reducción de Latencia:** Disminución del **60%** en tiempos de carga de la plataforma web.
- **Disponibilidad del Servicio:** Garantizar un Uptime de **99.95% (SLA)** en entornos de producción.
- **Eficiencia Operativa:** Automatización del **80%** del ciclo de despliegue de software (CI/CD).
- **Seguridad y Cumplimiento:** Adecuación completa a normativas ISO/IEC 27001 y GDPR.

---

## 2. 📋 Alcance de los Trabajos (Statement of Work)

El proyecto se estructurará en tres grandes componentes tecnológicos integrados:

### Componentes de Desarrollo
1. **Rediseño de Capa Frontend:**
   - Desarrollo de una SPA modular en TypeScript con Server-Side Rendering (SSR).
   - Implementación de un Sistema de Diseño Unificado con soporte accesible WCAG AA.

2. **Modernización de Servicios Backend:**
   - Construcción de Microservicios desacoplados vía API Gateway con autenticación JWT.
   - Base de datos relacional PostgreSQL con réplicas de lectura automáticas.

3. **Infraestructura & Seguridad:**
   - Despliegue automatizado en contenedores Docker / Kubernetes (K8s).
   - Configuración de Firewall WAF, monitoreo continuo de logs y copias de respaldo redundantes.

---

## 3. 📅 Cronograma e Hitos (Milestones)

| Fase | Hito / Entregable Principal | Duración Est. | Fecha Límite Est. | Responsable |
|:---:|:---|:---:|:---:|:---|
| **Fase I** | Levantamiento de Requerimientos & Arquitectura Base | 2 semanas | 01-Sep-2026 | Arquitecto Lead |
| **Fase II** | Desarrollo de Backend, APIs y Base de Datos | 4 semanas | 29-Sep-2026 | Equipo Backend |
| **Fase III** | Desarrollo Frontend, UI/UX e Integración | 4 semanas | 27-Oct-2026 | Equipo Frontend |
| **Fase IV** | Pruebas de Carga, Seguridad & QA | 2 semanas | 10-Nov-2026 | Equipo QA |
| **Fase V** | Despliegue en Producción & Capacitación | 1 semana | 17-Nov-2026 | DevOps Lead |

---

## 4. 💰 Estructura de Inversión y Presupuesto

| Concepto de Servicio | Horas Estimadas | Tarifa/Hora | Total Neto (USD) |
|:---|:---:|:---:|:---:|
| Arquitectura de Software & Diseño Cloud | 80 hrs | $85.00 | $6,800.00 |
| Desarrollo Backend & API Services | 160 hrs | $75.00 | $12,000.00 |
| Desarrollo Frontend & Interfaces de Usuario | 160 hrs | $75.00 | $12,000.00 |
| Automatización DevOps & Seguridad WAF | 60 hrs | $90.00 | $5,400.00 |
| Pruebas de Aseguramiento de Calidad (QA) | 40 hrs | $60.00 | $2,400.00 |
| **SUBTOTAL** | **500 hrs** | — | **$38,600.00** |
| *Impuestos Aplicables (VAT / IVA 16%)* | — | — | *$6,176.00* |
| **TOTAL INVERSIÓN PROYECTO** | — | — | **$44,776.00** |

---

## 5. ✍️ Aprobación y Firmas

Ambas partes acuerdan los términos, alcance y condiciones económicas estipuladas en esta propuesta formal.

| Por el Cliente | Por la Empresa Consultora |
|:---|:---|
| **Firma:** ___________________________ | **Firma:** ___________________________ |
| **Nombre:** Director de Tecnología (CTO) | **Nombre:** Gerente de Proyectos |
| **Fecha:** ____ / ____ / ________ | **Fecha:** ____ / ____ / ________ |
`,
  },
  {
    id: 'especificacion-arquitectura',
    name: 'Especificación Técnica & Arquitectura de Software (SAD / RFC)',
    description: 'Documento estándar de arquitectura de sistemas, modelo C4, decisiones ADR y requerimientos NFR',
    filename: 'Especificacion_Arquitectura_Software',
    category: 'Ingeniería',
    content: `# Especificación Técnica de Arquitectura de Software (SAD)

![Nivel](https://img.shields.io/badge/Tipo-SAD%20%2F%20RFC-purple)
![Estado](https://img.shields.io/badge/Aprobado-Si-success)
![Versión](https://img.shields.io/badge/Arquitectura-v3.2-blue)

> **Documento de diseño técnico formal que describe la arquitectura del sistema, patrones de diseño, flujos de datos y requerimientos no funcionales.**

---

## 1. 🏗️ Visión General del Sistema

El sistema es una **plataforma SaaS multitenant distribuida** diseñada para el procesamiento transaccional de alta concurrencia y análisis de datos en tiempo real.

### Principios de Arquitectura
1. **Desacoplamiento Estricto:** Comunicación entre componentes basada exclusivamente en contratos de API REST y mensajes asíncronos.
2. **Escalabilidad Horizontal:** Todos los servicios backend deben ser *stateless* (sin estado) para permitir autoscaling elástico.
3. **Resiliencia & Failover:** Circuit breakers automáticos y fallback graceful en caso de degradación de dependencias externas.
4. **Seguridad en Profundidad:** Cifrado en tránsito (TLS 1.3) y cifrado en reposo (AES-256) en todas las capas de datos.

---

## 2. 📐 Diagrama de Arquitectura de Sistemas

\`\`\`
                          [ Clientes Web / Móviles ]
                                      │
                                (HTTPS / WSS)
                                      ▼
                           [ Cloudflare Edge WAF ]
                                      │
                         [ Ingress NGINX Gateway ]
                                      │
           ┌──────────────────────────┼──────────────────────────┐
           ▼                          ▼                          ▼
   [ Microservicio Auth ]    [ Microservicio Core ]    [ Servicio Notificaciones ]
           │                          │                          │
           ▼                          ▼                          ▼
   [ Redis Session Cache ]   [ Cluster PostgreSQL ]      [ RabbitMQ / Kafka ]
\`\`\`

---

## 3. 📑 Decisiones de Arquitectura Registradas (ADR)

### ADR-001: Adopción de PostgreSQL como Motor de Base de Datos Principal
* **Estatus:** Aprobado
* **Contexto:** Se requiere soporte para consultas relacionales complejas y garantías ACID estrictas en transacciones financieras.
* **Decisión:** Utilizar **PostgreSQL 16** alojado en cluster gestionado con réplicas de lectura y conmutación por error automatizada.
* **Consecuencias Positivas:** Integración con tipos de datos JSONB, extensiones de búsqueda Full-Text e integridad referencial garantizada.

---

## 4. ⚡ Requerimientos No Funcionales (NFR)

| Categoría | Métrica Objetivo | Mecanismo de Verificación |
|:---|:---|:---|
| **Rendimiento** | Latencia < 50ms para el percentil 95 (p95) | Pruebas de carga continuas con k6 / Locust |
| **Disponibilidad** | 99.95% de tiempo de actividad anual | Monitoreo sintético con Datadog / Prometheus |
| **Escalabilidad** | Soporte para 10,000 peticiones por segundo (RPS) | Autoscaling de pods Kubernetes en AWS EKS |
| **Seguridad** | Zero Vulnerabilidades Críticas o Altas | Análisis SAST/DAST diario en tubería CI/CD |
| **Recuperación** | RPO < 5 minutos, RTO < 15 minutos | Pruebas simular de Desastre (Disaster Recovery) |

---

## 5. 🛠️ Stack Tecnológico Aprobado

- **Frontend:** React 19, TypeScript, Tailwind CSS, Vite.
- **Backend Services:** Node.js v22 (LTS), Express / NestJS.
- **Bases de Datos & Caché:** PostgreSQL 16, Redis 7.2.
- **Mensajería:** Apache Kafka / RabbitMQ.
- **Infraestructura:** Docker, Kubernetes, Terraform, GitHub Actions.
`,
  },
  {
    id: 'documentacion-api-rest',
    name: 'Especificación Oficial de API REST (Developer Reference)',
    description: 'Documentación técnica completa para desarrolladores con endpoints, ejemplos cURL, códigos HTTP y payloads JSON',
    filename: 'Especificacion_API_REST',
    category: 'Ingeniería',
    content: `# Manual de Referencia de API RESTful (v1.0)

![API REST](https://img.shields.io/badge/API-RESTful-blue)
![Formato](https://img.shields.io/badge/Format-JSON-orange)
![Auth](https://img.shields.io/badge/Auth-Bearer_JWT-green)

Bienvenido a la documentación oficial para desarrolladores e integradores. Toda comunicación debe realizarse mediante **HTTPS** seguro.

- **URL Base de Producción:** \`https://api.empresa.com/v1\`
- **URL Base de Pruebas (Sandbox):** \`https://sandbox-api.empresa.com/v1\`

---

## 🔐 1. Autenticación y Autorización

La API utiliza tokens de acceso **Bearer JWT**. Cada solicitud a endpoints protegidos debe incluir la cabecera HTTP correspondiente:

\`\`\`http
Authorization: Bearer <tu_access_token>
\`\`\`

### Endpoint de Autenticación
\`\`\`http
POST /v1/auth/token HTTP/1.1
Host: api.empresa.com
Content-Type: application/json

{
  "client_id": "app_live_8392019482",
  "client_secret": "sec_8f93a71b2d304910a9c8e7"
}
\`\`\`

#### Respuesta Exitosa (\`200 OK\`):
\`\`\`json
{
  "status": "success",
  "token_type": "Bearer",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "refresh_token": "rfr_920194810293847"
}
\`\`\`

---

## 🚀 2. Endpoints del Recurso \`/documents\`

### GET \`/v1/documents\` — Listar Documentos
Permite obtener una lista paginada de documentos pertenecientes a la cuenta autenticada.

#### Parámetros de Consulta (Query Params):
| Parámetro | Tipo | Requerido | Descripción |
|:---|:---:|:---:|:---|
| \`page\` | \`integer\` | No | Número de página (Por defecto: \`1\`) |
| \`limit\` | \`integer\` | No | Cantidad de elementos por página (Máx: \`100\`, Por defecto: \`20\`) |
| \`status\` | \`string\` | No | Filtrar por estado: \`draft\`, \`published\`, \`archived\` |

#### Ejemplo de Solicitud cURL:
\`\`\`bash
curl -X GET "https://api.empresa.com/v1/documents?limit=10&status=published" \\
  -H "Authorization: Bearer tu_token_aqui" \\
  -H "Accept: application/json"
\`\`\`

---

## 🚦 3. Tabla de Códigos de Estado HTTP

| Código | Estado | Significado y Causa |
|:---:|:---|:---|
| \`200\` | **OK** | Solicitud procesada correctamente. |
| \`201\` | **Created** | El recurso fue creado de forma exitosa. |
| \`400\` | **Bad Request** | Los parámetros de la solicitud son inválidos o faltan campos obligatorios. |
| \`401\` | **Unauthorized** | El token de autenticación falta, es inválido o ha expirado. |
| \`403\` | **Forbidden** | No tiene permisos suficientes para acceder a este recurso. |
| \`404\` | **Not Found** | El recurso solicitado no existe o fue eliminado. |
| \`429\` | **Too Many Requests** | Se superó el límite de peticiones permitido (Rate Limit). |
| \`500\` | **Internal Server Error** | Ocurrió un error inesperado en los servidores. |
`,
  },
  {
    id: 'informe-ejecutivo-auditoria',
    name: 'Informe Ejecutivo de Auditoría & Resultados',
    description: 'Reporte profesional para gerencia con gráficos de estado, hallazgos de seguridad y plan de acción',
    filename: 'Informe_Ejecutivo_Auditoria',
    category: 'Corporativo',
    content: `# Reporte Ejecutivo de Auditoría Operativa y de Seguridad

![Clasificación](https://img.shields.io/badge/Clasificación-Confidencial-red)
![Estado](https://img.shields.io/badge/Estatus-Completado-success)
![Periodo](https://img.shields.io/badge/Periodo-Q3_2026-blue)

> **Evaluación semestral de rendimiento de infraestructura, cumplimiento normativo y análisis de riesgo corporativo.**

**Fecha de Emisión:** 10 de Agosto, 2026  
**Elaborado por:** Departamento de Seguridad de la Información & Cumplimiento  
**Destinatarios:** Comité de Dirección & Gerencia General  

---

## 1. 📊 Resumen de Resultados Operativos

Durante el periodo evaluado, se analizaron los servicios principales del ecosistema corporativo. La disponibilidad global del servicio alcanzó un **99.98%**, superando el objetivo mínimo acordado.

### Indicadores Clave del Trimestre
- **Tasa de Disponibilidad (Uptime):** 99.98%
- **Tiempo Promedio de Respuesta:** 38 ms
- **Incidencias Críticas Registradas:** 0
- **Nivel de Cumplimiento de Seguridad:** 94.5%

---

## 2. 🔍 Cuadro de Hallazgos y Vulnerabilidades

| Código ID | Severidad | Área Afectada | Descripción de la Observación | Plan de Acción / Solución | Estado |
|:---:|:---:|:---|:---|:---|:---:|
| \`AUD-101\` | 🔴 **Alta** | Base de Datos | Retención excesiva de registros de log no anonimizados | Implementar política de purga a los 90 días | **Corregido** |
| \`AUD-102\` | 🟡 **Media** | Control de Acceso | Usuarios inactivos sin desactivación automática | Configurar suspensión tras 30 días de inactividad | **En Curso** |
| \`AUD-103\` | 🟢 **Baja** | Certificados TLS | Certificado secundario con vencimiento en < 30 días | Renovación automática vía Let's Encrypt | **Corregido** |

---

## 3. 🎯 Plan de Recomendaciones Prioritarias

1. **A corto plazo (Próximos 15 días):**
   - Completar la migración de claves de acceso hacia un gestor de secretos centralizado (**HashiCorp Vault**).
   - Realizar simulación de recuperación ante desastres (DRP) en el datacenter secundario.

2. **A mediano plazo (Próximos 60 días):**
   - Implementar autenticación multifactor (MFA) obligatoria para el 100% del personal administrativo.
   - Reforzar capacitaciones internas contra ataques de ingeniería social y phishing.
`,
  },
  {
    id: 'terminos-condiciones-legal',
    name: 'Términos de Servicio y Política de Privacidad (Legal Draft)',
    description: 'Plantilla legal estándar estructurada para términos de uso, protección de datos y propiedad intelectual',
    filename: 'Terminos_de_Servicio_y_Privacidad',
    category: 'Legal',
    content: `# Términos de Servicio y Política de Privacidad

![Versión Legal](https://img.shields.io/badge/Documento-Legal_Oficial-slate)
![Vigencia](https://img.shields.io/badge/Vigencia-2026-emerald)

> **Por favor lea atentamente estos términos antes de utilizar nuestra plataforma y servicios digitales.**

**Última actualización:** 10 de Agosto de 2026  

---

## 1. ⚖️ Aceptación de los Términos

Al acceder, navegar o utilizar este sitio web y sus servicios asociados, el usuario declara haber leído, comprendido y aceptado en su totalidad las presentes condiciones de uso. Si no está de acuerdo con alguno de los términos estipulados, deberá abstenerse de utilizar la plataforma.

---

## 2. 🛡️ Protección de Datos Personales y Privacidad

De conformidad con las regulaciones de protección de datos aplicables (incluyendo el Reglamento General de Protección de Datos - **GDPR** y legislaciones locales vigentes):

1. **Recopilación de Información:** Únicamente recopilamos los datos personales estrictamente necesarios para la prestación del servicio (ej. nombre, correo electrónico y datos de facturación).
2. **Uso de Datos:** Sus datos personales no serán vendidos, alquilados ni transferidos a terceros con fines comerciales sin su consentimiento explícito.
3. **Derechos del Usuario (ARCO):** Usted conserva el derecho de acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales en cualquier momento mediante solicitud formal.

---

## 3. 🔒 Propiedad Intelectual

Todos los contenidos, marcas comerciales, logotipos, código fuente, interfaces y diseños presentes en esta aplicación son propiedad exclusiva de la empresa o de sus respectivos licenciantes, y se encuentran protegidos por las leyes internacionales de propiedad intelectual.

---

## 4. ✉️ Contacto Legal

Para cualquier duda, consulta o ejercicio de derechos ARCO respecto a este documento, puede ponerse en contacto con nuestro equipo legal:

- **Correo Electrónico:** \`legal@empresa.com\`
- **Dirección Postal:** Av. Principal 123, Oficina 501, Ciudad de México
`,
  },
  {
    id: 'curriculum-vitae-ejecutivo',
    name: 'Curriculum Vitae / Hoja de Vida Profesional',
    description: 'Plantilla limpia y elegante para perfil laboral, trayectoria, habilidades y formación académica',
    filename: 'CV_Perfil_Profesional',
    category: 'Personal',
    content: `# Alex R. Valenzuela
### **Ingeniero de Software Senior & Arquitecto de Sistemas**
📍 Madrid, España | ✉️ alex.valenzuela@devmail.com | 🌐 linkedin.com/in/alexvalenzuela | 💻 github.com/alexvalenzuela

---

## 👤 Perfil Profesional

Ingeniero de Software con **más de 8 años de experiencia** liderando equipos multidisciplinarios en el desarrollo de aplicaciones web a gran escala y soluciones Cloud. Especializado en **TypeScript, React, Node.js y Arquitectura Microservicios**. Enfoque orientado a resultados, optimización del rendimiento, accesibilidad web y buenas prácticas de ingeniería.

---

## 🛠️ Competencias & Habilidades Tecnológicas

- **Lenguajes de Programación:** TypeScript, JavaScript (ESNext), Python, SQL, HTML5 / CSS3.
- **Desarrollo Frontend:** React 19, Next.js, Vite, Tailwind CSS, Redux Toolkit, Zustand.
- **Desarrollo Backend & Cloud:** Node.js, Express, NestJS, PostgreSQL, Redis, Docker, AWS (S3, EC2, Lambda).
- **Herramientas & Pruebas:** Git, GitHub Actions (CI/CD), Vitest, Cypress, Webpack.

---

## 💼 Experiencia Laboral

### **Lead Frontend Architect** | *TechCorp Solutions Global*
*Enero 2023 – Presente*
- Lideré el rediseño y la migración de la plataforma web principal, mejorando la velocidad de carga en un **45%**.
- Diseñé e implementé el sistema de componentes UI interno utilizado por más de 15 desarrolladores.
- Gestioné y mentoricé a un equipo de 6 ingenieros de software frontend.

### **Senior Full Stack Developer** | *Innovación Digital S.A.*
*Marzo 2020 – Diciembre 2022*
- Desarrollé microservicios RESTful con Node.js y PostgreSQL capaces de procesar más de 2 millones de peticiones diarias.
- Implementé tuberías automatizadas de integración continua (CI/CD) reduciendo el tiempo de despliegue a producción.

---

## 🎓 Formación Académica

- **Grado en Ingeniería Informática** — *Universidad Politécnica* (2015 – 2019)
- **Máster en Arquitectura de Software & Cloud Computing** — *Tech Institute* (2020 – 2021)
`,
  },
  {
    id: 'vacio',
    name: 'Documento en Blanco (Lienzo Cero)',
    description: 'Espacio de trabajo totalmente limpio para redactar cualquier contenido en Markdown desde cero',
    filename: 'Nuevo_Documento',
    category: 'General',
    content: `# Nuevo Documento

Escribe tu contenido en Markdown aquí...
`,
  },
];
