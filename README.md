# Sitio Web Profesional — Asesorías Borotto

> **Estado del proyecto:** ✅ **FINALIZADO Y EN PRODUCCIÓN** — `asesoriasborotto.cl`

Sitio web dinámico, profesional y autogestionable para la firma contable **Asesorías Borotto**, operada por **Borotto y Castillo Asociados LTDA**. Cuenta con una interfaz pública premium altamente responsiva y un panel de administración a medida (CMS) para gestionar servicios, planes en UF y testimonios, además de recibir consultas de clientes directas a la base de datos relacional y notificaciones automáticas estructuradas por correo electrónico.

---

## 🏢 Datos de la Empresa

| Campo | Valor |
|---|---|
| **Nombre comercial** | Asesorías Borotto |
| **Razón social** | Borotto y Castillo Asociados LTDA |
| **RUT** | 78.453.841-9 |
| **Domicilio legal** | Roger de Flor 2736, Oficina 91, Santiago, Chile |
| **Correo oficial** | rossana.b@asesoriasborotto.cl |
| **Teléfono** | +56 9 7376 4841 |
| **Sitio web** | https://asesoriasborotto.cl |
| **Instagram** | @contaborotto (https://www.instagram.com/contaborotto/) |
| **LinkedIn** | Rossana Borotto (https://www.linkedin.com/in/rossana-borotto/) |

---

## 🎯 Propósito del Proyecto

1. Vitrina digital moderna con diseño premium Navy & Gold (móvil, tablet, escritorio).
2. Cotizador transparente de servicios y planes mensuales en UF.
3. Panel de administración privado sin requerir conocimientos técnicos.
4. Sistema anti-spam para reseñas verificadas con tokens de un solo uso.
5. Cumplimiento legal con la Ley N° 19.628, Ley N° 21.663 y estándares GDPR.

---

## 🏗️ Arquitectura

```
Cliente → Astro v6 SSR (Vercel) → Prisma ORM → PostgreSQL (Neon)
                                → Nodemailer → SMTP Corporativo
                                → Panel Admin (/admin, cookie HttpOnly)
```

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Astro v6 (SSR) |
| Lenguaje | TypeScript 5.x |
| ORM | Prisma 5.x |
| Base de datos | PostgreSQL 16 (Neon) |
| Email | Nodemailer 6.x |
| Despliegue | Vercel |
| Estilos | CSS Vanilla con variables personalizadas |
| Fuentes | Google Fonts (Outfit, Inter) |

---

## 📁 Estructura del Proyecto

```
contadora-sitio/
├── prisma/
│   └── schema.prisma          # Modelos: Message, Plan, Service, Testimonial, ReviewToken
├── src/
│   ├── components/
│   │   ├── Footer.astro       # Pie de página con contacto, redes y copyright legal
│   │   ├── Header.astro       # Barra de navegación responsiva con menú hamburguesa
│   │   ├── Hero.astro         # Componente hero reutilizable (compact/full)
│   │   ├── PlanCard.astro     # Tarjeta de plan mensual con features y badge
│   │   └── WhatsAppButton.astro
│   ├── layouts/
│   │   └── Layout.astro       # Layout base con SEO y meta tags
│   ├── lib/
│   │   └── prisma.ts          # Singleton PrismaClient
│   ├── pages/
│   │   ├── index.astro        # Inicio: hero, stats, servicios, planes, testimonios
│   │   ├── sobre-mi.astro     # Perfil: trayectoria, formación, filosofía
│   │   ├── servicios.astro    # Catálogo de servicios desde BD
│   │   ├── planes.astro       # Planes en UF con comparativo visual
│   │   ├── contacto.astro     # Formulario con consentimiento ARCO
│   │   ├── testimonios.astro  # Galería de reseñas verificadas
│   │   ├── resena.astro       # Formulario público (token de un uso)
│   │   ├── politica-de-privacidad.astro  # Ley 19.628 - completa
│   │   ├── admin/             # Panel de administración (protegido)
│   │   │   ├── index.astro    # Dashboard con estadísticas
│   │   │   ├── mensajes.astro # Bandeja de mensajes + eliminar (ARCO)
│   │   │   ├── servicios.astro
│   │   │   ├── planes.astro
│   │   │   └── testimonios.astro
│   │   └── api/               # Endpoints REST
│   │       ├── contacto.ts    # POST / PUT / DELETE (autenticado)
│   │       ├── submit-review.ts
│   │       ├── review-token.ts
│   │       ├── admin-login.ts
│   │       └── admin-logout.ts
└── public/
    ├── logo.png
    └── logo-light.png
```

---

## ✨ Funcionalidades Públicas

- **Inicio**: hero animado, +15 años experiencia, MBA USACH, 3 Titulaciones, 100% Ética.
- **Sobre Mí**: trayectoria, formación académica (ECAS, UNAB, USACH MBA), valores.
- **Servicios**: listado dinámico desde base de datos.
- **Planes en UF**: comparativo visual con features y badge recomendado.
- **Contacto**: formulario completo con checkbox de privacidad obligatorio.
- **Testimonios**: solo reseñas aprobadas por el admin son visibles.
- **Política de Privacidad**: razón social, domicilio legal, derechos ARCO publicados.
- **WhatsApp**: botón flotante en todas las páginas.

---

## 🔒 Panel Admin (/admin)

| Módulo | Funcionalidades |
|---|---|
| Dashboard | Contadores de mensajes, servicios, planes y testimonios |
| Mensajes | Ver, marcar leído, eliminar (cumplimiento derecho de Cancelación ARCO) |
| Servicios | CRUD completo: nombre, descripción, icono, orden |
| Planes | CRUD completo: nombre, precio UF, features, badge, orden |
| Testimonios | Aprobar/rechazar, generar link de reseña de un solo uso |

---

## 🛡️ Seguridad Implementada

### Capa de Aplicación (Astro / Vercel)
- Autenticación admin via cookie HttpOnly + `ADMIN_PASSWORD`
- PUT y DELETE en `/api/contacto` requieren Bearer token de autorización
- Sanitización HTML en templates de correo (prevención XSS)
- Validación de rating (1–5) y trimming de strings en reseñas
- Tokens de reseña de un solo uso (`ReviewToken.used`)
- `rel="noopener noreferrer"` en todos los enlaces externos
- HTTPS forzado por Vercel en producción

### Capa de Red (Cloudflare)
- WAF (Web Application Firewall) activo en plan Free
- Protección DDoS automática
- Cifrado SSL/TLS en modo **Full (Strict)**
- **Always Use HTTPS** activado
- TLS mínimo: **TLS 1.2** (TLS 1.3 también habilitado)
- **Automatic HTTPS Rewrites** activado
- **Browser Integrity Check** activado
- **Opportunistic Encryption** activado
- IP real de Vercel oculta detrás de Cloudflare (proxy activo 🟠)

---

## ☁️ Infraestructura Cloudflare

El dominio `asesoriasborotto.cl` está protegido por **Cloudflare Free** actuando como proxy inverso frente a Vercel.

### Flujo de tráfico
```
Usuario → Cloudflare (CDN + WAF + DDoS) → Vercel (SSR) → Neon PostgreSQL
```

### Nameservers (NIC Chile)
| Nameserver | Estado |
|---|---|
| `millie.ns.cloudflare.com` | ✅ Activo |
| `vicente.ns.cloudflare.com` | ✅ Activo |

### Configuración SSL/TLS aplicada
| Parámetro | Valor |
|---|---|
| Modo cifrado | Full (Strict) |
| Always Use HTTPS | Activado |
| TLS mínimo | TLS 1.2 |
| TLS 1.3 | Activado |
| Automatic HTTPS Rewrites | Activado |
| Browser Integrity Check | Activado |

> **Nota**: Vercel sigue siendo el servidor de ejecución. Cloudflare no afecta el código, la base de datos ni el despliegue. Los cambios en Vercel (`git push`) se despliegan normalmente.


## 🌐 Variables de Entorno (Vercel)

| Variable | Descripción | Requerida |
|---|---|---|
| `DATABASE_URL` | URL PostgreSQL Neon | ✅ |
| `ADMIN_PASSWORD` | Contraseña panel admin | ✅ |
| `SMTP_HOST` | Servidor SMTP | ✅ |
| `SMTP_PORT` | Puerto SMTP (587 / 465) | ✅ |
| `SMTP_USER` | Usuario SMTP | ✅ |
| `SMTP_PASSWORD` | Contraseña de aplicación SMTP | ✅ |
| `NOTIFICATION_EMAIL` | Destino notificaciones (rossana.b@asesoriasborotto.cl) | Recomendada |

---

## 🚀 Desarrollo Local

```bash
npm install
cp .env.example .env        # Rellenar DATABASE_URL, ADMIN_PASSWORD, SMTP_*
npx prisma db push
npm run dev                  # http://localhost:4321
```

---

## 📦 Despliegue en Producción

```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin master
# Vercel detecta el push y despliega automáticamente en < 2 min
```

---

## 📋 Cumplimiento Legal (Chile)

| Normativa | Estado |
|---|---|
| Ley N° 19.628 — Protección de Datos Personales | ✅ Política publicada en /politica-de-privacidad |
| Ley N° 21.663 — Marco de Ciberseguridad | ✅ Medidas técnicas implementadas |
| Derechos ARCO | ✅ Botón eliminar en panel admin + correo de contacto publicado |
| Consentimiento explícito | ✅ Checkbox obligatorio en formulario de contacto |
| Identificación del Responsable | ✅ Razón social + domicilio en política de privacidad |

---

## 👤 Créditos

| Rol | Persona |
|---|---|
| **Titular / Directora** | Rossana Borotto Vidal — Contador Auditor, Ing. Industrial, MBA USACH |
| **Diseño & Desarrollo Web** | Franco Alfredo Borotto Vidal |

---

*© 2026 Asesorías Borotto — Borotto y Castillo Asociados LTDA. Todos los derechos reservados.*
