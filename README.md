# Sitio Web Profesional y Gestor de Contenidos — Asesorías Borotto

Este proyecto es un sitio web dinámico, profesional y autogestionable para la firma contable **Asesorías Borotto** (`asesoriasborotto.cl`). Cuenta con una interfaz pública premium altamente responsiva y un panel de administración a medida (CMS) para gestionar servicios, planes en UF y testimonios, además de recibir consultas de clientes directas a la base de datos relacional y notificaciones automáticas estructuradas por correo electrónico.

---

## 🎯 Propósito del Proyecto

Establecer la presencia digital de **Asesorías Borotto**, brindando:
1. Una vitrina digital moderna con diseño premium y adaptabilidad total (móvil, tablet, escritorio) basada en una paleta corporativa Navy & Gold.
2. Un cotizador transparente de servicios y planes mensuales expresados en UF.
3. Un gestor interno privado que permita controlar el contenido visible del sitio y administrar los mensajes de contacto entrantes sin requerir conocimientos técnicos.
4. Un sistema anti-spam para recolectar reseñas verificadas mediante links de un solo uso generados por el administrador.

---

## 🏗️ Arquitectura del Sitio

El sistema se compone de una arquitectura monolítica moderna basada en el framework **Astro** configurado para renderizado en el servidor (SSR):

```mermaid
graph TD
    Client[Cliente / Navegador] <-->|HTTP / SSR| Astro[Astro v6 SSR / Node]
    Astro <-->|Prisma ORM| DB[(PostgreSQL en Producción)]
    Astro -->|API Route| ContactAPI[api/contacto.ts]
    ContactAPI -->|Nodemailer| SMTP[Servidor SMTP / Correo Corporativo]
    Astro -->|Admin Cookie Auth| AdminPanel[Panel Admin /admin]
    AdminPanel -->|Genera Token| TokenAPI[api/review-token.ts]
    TokenAPI -.->|Link Único| ClientReview[Cliente dejando reseña]
```

### Componentes de la Arquitectura
*   **Capa de Presentación (Frontend):** Páginas estáticas e híbridas con Astro, estructuradas con HTML5 semántico y CSS Vanilla mediante variables globales (`src/styles/global.css`). Transiciones fluidas, Intersection Observer para animaciones "on-scroll", y SweetAlert2 para popups interactivos.
*   **Capa del Servidor (Backend):** Astro API Routes actuando como endpoints JSON (`/api/*`) que validan llamadas y procesan operaciones de negocio bajo autenticación Bearer Token y Cookies.
*   **Capa de Persistencia (Base de Datos):** PostgreSQL mapeado mediante Prisma ORM para garantizar consultas rápidas y consistencia relacional. Integrado con `npx prisma db push` automático en el pipeline de despliegue de Vercel.
*   **Capa de Comunicaciones (Notificaciones):** Integración con `nodemailer` para generar alertas HTML corporativas Navy & Gold automatizadas cada vez que un prospecto envía el formulario de contacto.
*   **Sistema de Reseñas Anti-Spam:** Generación de tokens UUID de un solo uso (`ReviewToken`) para recolectar testimonios verificados que se autopublican.

---

## 🚀 Stack Tecnológico

*   **Core:** [Astro v6.4](https://astro.build/) (Híbrido SSR con adaptador `@astrojs/node` / Vercel).
*   **Base de Datos Relacional:** [PostgreSQL](https://www.postgresql.org/) (Vercel Postgres / Neon).
*   **ORM de Base de Datos:** [Prisma v6.19](https://www.prisma.io/) (Esquemas relacionales y sincronización en build).
*   **Envío de Correos:** [Nodemailer](https://nodemailer.com/) (Instalación de base con formato HTML premium).
*   **Feedback de Interfaz:** [SweetAlert2](https://sweetalert2.github.io/) para popups y confirmaciones seguras.
*   **Estilos:** Vanilla CSS con variables personalizadas y responsive de diseño fluido (Navy `#13254e`, Gold `#dfb653`).

---

## 📁 Estructura del Proyecto

```text
/contadora-sitio
├── prisma/
│   ├── schema.prisma      # Esquema Prisma con modelos (Plan, Service, Testimonial, Message, ReviewToken)
│   └── seed.ts            # Script de inicialización de datos (8 planes en UF y servicios)
├── public/                # Assets públicos (logo.png corporativo usado como favicon)
├── src/
│   ├── components/        # Componentes Astro reutilizables (Header, Footer, Hero, PlanCard, WhatsAppButton)
│   ├── layouts/
│   │   └── Layout.astro   # Layout base (SEO dinámico, favicon corporativo e integración SweetAlert2)
│   ├── styles/
│   │   └── global.css     # Variables CSS globales, diseño responsivo y animaciones
│   └── pages/             # Enrutamiento basado en archivos
│       ├── index.astro        # Inicio público (Servicios, planes, estadísticas, testimonios)
│       ├── sobre-mi.astro     # Trayectoria, valores e información de la clienta
│       ├── servicios.astro    # Listado detallado de servicios con precios base en UF
│       ├── planes.astro       # Visualización flexible de 8 planes en grilla 3-3-2 responsiva
│       ├── contacto.astro     # Formulario de contacto con alertas SweetAlert2
│       ├── resena.astro       # [NUEVO] Página pública para dejar reseñas vía token
│       ├── admin/             # Panel privado de gestión
│       │   ├── index.astro        # Control de acceso administrativo (Password por defecto: admin123)
│       │   ├── planes.astro       # CRUD de Planes mensuales en UF
│       │   ├── servicios.astro    # CRUD de Servicios con asignación de precios y selector de iconos
│       │   ├── testimonios.astro  # CRUD de Testimonios y Generador de Links Únicos
│       │   └── mensajes.astro     # Bandeja de entrada y control de mensajes leídos
│       └── api/               # Controladores API (contacto, planes, servicios, testimonios, review-token, submit-review)
```

---

## 📈 Fases del Proyecto

### Fase 1 y 1.5: Desarrollo, Backend Base y Branding (100% Completada) ✅
*   [x] Configuración inicial y estructuración del layout con paleta Navy & Gold.
*   [x] Integración de base de datos y Prisma Client con modelo de datos inicial.
*   [x] Panel de administración dinámico con flujos CRUD funcionales (Planes, Servicios, Testimonios).
*   [x] Branding Oficial: Logo corporativo en cabecera, pie de página y Favicon.
*   [x] Diseño de grillas responsivas (Planes en UF) y visualización unificada de componentes.

### Fase 1.6: Sistema de Reseñas Anti-Spam (100% Completada) ✅
*   [x] Creación de modelo `ReviewToken` para generación de links únicos.
*   [x] Rutas API protegidas para generar y consumir tokens de un solo uso.
*   [x] Botón "Generar Link para Cliente" en el panel de administrador.
*   [x] Página `/resena` con validación de tokens y formulario de 5 estrellas.

### Fase 2: Lanzamiento y Deploy (En Progreso) ⏳
*   [x] Carga de textos definitivos y fotografías oficiales.
*   [x] Despliegue en hosting cloud (Vercel) e integración con base de datos de producción remota.
*   [x] Automatización de `prisma db push` en Vercel durante la etapa de construcción (Build).
*   [ ] Configuración de dominio oficial `asesoriasborotto.cl` en NIC Chile y DNS correspondientes.
*   [ ] Integración de credenciales SMTP de producción para notificaciones reales por email.
*   [ ] SEO final, optimización de assets (WebP) y auditoría Lighthouse.

---

## 🛠️ Ejecución Local y Pruebas

### 1. Clonar el repositorio e instalar dependencias:
```bash
npm install
```

### 2. Configurar el archivo `.env`:
Crea un archivo `.env` en la raíz con lo siguiente:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/contadora_sitio"
ADMIN_PASSWORD="admin123"

# Opcional - SMTP para notificaciones por correo en producción
SMTP_HOST=""
SMTP_PORT="465"
SMTP_USER=""
SMTP_PASSWORD=""
NOTIFICATION_EMAIL="contacto@asesoriasborotto.cl"
```

### 3. Sincronizar Base de Datos y Poblar (Seed):
```bash
# Sincronizar esquema y generar cliente (también se ejecuta automático en Vercel)
npm run build

# Poblar con datos iniciales (opcional en local)
npx prisma db seed
```

### 4. Ejecutar en Desarrollo:
```bash
npm run dev
```
La aplicación correrá en **`http://localhost:4321/`**
Accede al panel administrativo en **`/admin`** (Clave: `admin123`).
