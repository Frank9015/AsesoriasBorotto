# Sitio Web Profesional y Gestor de Contenidos — Asesorías Borotto

Este proyecto es un sitio web dinámico, profesional y autogestionable para la firma contable **Asesorías Borotto** (`asesoriasborotto.cl`). Cuenta con una interfaz pública premium altamente responsiva y un panel de administración a medida (CMS) para gestionar servicios, planes en UF y testimonios, además de recibir consultas de clientes directas a la base de datos relacional y notificaciones automáticas estructuradas por correo electrónico.

---

## 🎯 Propósito del Proyecto

Establecer la presencia digital de **Asesorías Borotto**, brindando:
1. Una vitrina digital moderna con diseño premium y adaptabilidad total (móvil, tablet, escritorio) basada en una paleta corporativa Navy & Gold.
2. Un cotizador transparente de servicios y planes mensuales expresados en UF.
3. Un gestor interno privado que permita controlar el contenido visible del sitio y administrar los mensajes de contacto entrantes sin requerir conocimientos técnicos.

---

## 🏗️ Arquitectura del Sitio

El sistema se compone de una arquitectura monolítica moderna basada en el framework **Astro** configurado para renderizado en el servidor (SSR):

```mermaid
graph TD
    Client[Cliente / Navegador] <-->|HTTP / SSR| Astro[Astro v6 SSR / Node]
    Astro <-->|Prisma ORM| DB[(PostgreSQL 17 local)]
    Astro -->|API Route| ContactAPI[api/contacto.ts]
    ContactAPI -->|Nodemailer| SMTP[Servidor SMTP / Correo Corporativo]
    Astro -->|Admin Cookie Auth| AdminPanel[Panel Admin /admin]
```

### Componentes de la Arquitectura
*   **Capa de Presentación (Frontend):** Páginas estáticas e híbridas con Astro, estructuradas con HTML5 semántico y CSS Vanilla mediante variables globales (`src/styles/global.css`). Transiciones fluidas, Intersection Observer para animaciones "on-scroll", y SweetAlert2 para popups interactivos.
*   **Capa del Servidor (Backend):** Astro API Routes actuando como endpoints JSON (`/api/*`) que validan llamadas y procesan operaciones de negocio bajo autenticación Bearer Token y Cookies.
*   **Capa de Persistencia (Base de Datos):** PostgreSQL 17 mapeado mediante Prisma ORM para garantizar consultas rápidas y consistencia relacional.
*   **Capa de Comunicaciones (Notificaciones):** Integración con `nodemailer` para generar alertas HTML corporativas Navy & Gold automatizadas cada vez que un prospecto envía el formulario de contacto.

---

## 🚀 Stack Tecnológico

*   **Core:** [Astro v6.4](https://astro.build/) (Híbrido SSR con adaptador `@astrojs/node`).
*   **Base de Datos Relacional:** [PostgreSQL 17](https://www.postgresql.org/) en entorno local.
*   **ORM de Base de Datos:** [Prisma v6.19](https://www.prisma.io/) (Esquemas relacionales y cliente autogenerado).
*   **Envío de Correos:** [Nodemailer](https://nodemailer.com/) (Instalación de base con formato HTML premium).
*   **Feedback de Interfaz:** [SweetAlert2](https://sweetalert2.github.io/) para popups y confirmaciones seguras.
*   **Estilos:** Vanilla CSS con variables personalizadas y responsive de diseño fluido (Navy `#13254e`, Gold `#dfb653`).

---

## 📁 Estructura del Proyecto

```text
/contadora-sitio
├── prisma/
│   ├── schema.prisma      # Esquema Prisma con modelos (Plan, Service, Testimonial, Message)
│   └── seed.ts            # Script de inicialización de datos (8 planes en UF y servicios)
├── public/                # Assets públicos (logo.png original, logo-light.png blanco/dorado)
├── src/
│   ├── components/        # Componentes Astro reutilizables (Header, Footer, Hero, PlanCard, WhatsAppButton)
│   ├── layouts/
│   │   └── Layout.astro   # Layout base (SEO dinámico, tipografías e integración SweetAlert2)
│   ├── styles/
│   │   └── global.css     # Variables CSS globales, diseño responsivo y animaciones
│   └── pages/             # Enrutamiento basado en archivos
│       ├── index.astro        # Inicio público (Servicios, planes, estadísticas, testimonios)
│       ├── sobre-mi.astro     # Trayectoria, valores e información de la clienta
│       ├── servicios.astro    # Listado detallado de servicios con precios base en UF
│       ├── planes.astro       # Visualización flexible de 8 planes en grilla 3-3-2 responsiva
│       ├── contacto.astro     # Formulario de contacto con alertas SweetAlert2
│       ├── admin/             # Panel privado de gestión
│       │   ├── index.astro        # Control de acceso administrativo (Password temporal: admin123)
│       │   ├── planes.astro       # CRUD de Planes mensuales en UF
│       │   ├── servicios.astro    # CRUD de Servicios con asignación de precios y selector de iconos
│       │   └── mensajes.astro     # Bandeja de entrada y control de mensajes leídos
│       └── api/               # Controladores API (contacto.ts, planes.ts, servicios.ts, testimonios.ts)
```

---

## 📈 Fases del Proyecto

### Fase 1: Desarrollo y Backend Base (100% Completada) ✅
*   [x] Configuración inicial y estructuración del layout.
*   [x] Integración de base de datos local y Prisma Client.
*   [x] Panel de administración dinámico con flujos CRUD funcionales.
*   [x] Validación de acciones críticas mediante SweetAlert2.

### Fase 1.5: Nuevos Requerimientos y Ajustes de Marca (100% Completada) ✅
*   [x] **Branding Oficial:** Integración del logotipo transparente de **Asesorías Borotto** en cabecera y versión blanca/dorada de 80px en pie de página.
*   [x] **Paleta de Colores:** Actualización a Azul Marino (`#13254e`) y Dorado (`#dfb653`).
*   [x] **Precios en UF:** Adición del campo `price` en el modelo `Service`, modificación de las APIs y panel CRUD admin.
*   [x] **Planes Adaptables (3-3-2):** Actualización del seed a 8 niveles de planes (0.7 UF a 8.0 UF) y migración de la grilla pública a Flexbox responsivo para centrado estético en la última fila.
*   [x] **Base de Notificación:** Configuración de `nodemailer` y plantilla HTML corporativa con log de consola en desarrollo local.

### Fase 2: Lanzamiento y Deploy (Pendiente de aprobación de la clienta) ⏳
*   [ ] Carga de textos definitivos y fotografías oficiales.
*   [ ] Despliegue en hosting cloud (Vercel) e integración con base de datos de producción (Supabase / Vercel Postgres).
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

# Opcional - SMTP para notificaciones por correo (Fase 2)
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
NOTIFICATION_EMAIL="contacto@asesoriasborotto.cl"
```

### 3. Sincronizar Base de Datos y Poblar (Seed):
```bash
# Generar Cliente Prisma
npx prisma generate

# Sincronizar esquema
npx prisma db push

# Poblar con 8 planes y servicios en UF
npx prisma db seed
```

### 4. Ejecutar en Desarrollo:
```bash
npm run dev
```
La aplicación correrá en **`http://localhost:4321/`**
Accede al panel administrativo en **`/admin`** (Clave: `admin123`).
