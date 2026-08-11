import { c as createComponent } from './astro-component_CvQZIwnS.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_DFUSRtSH.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_Bnaskxj4.mjs';
import { p as prisma } from './prisma_3hcEPnbV.mjs';

const $$Mensajes = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Mensajes;
  const authCookie = Astro2.cookies.get("admin_auth")?.value;
  if (authCookie !== "admin123") {
    return Astro2.redirect("/admin");
  }
  const unreadMessages = await prisma.message.count({ where: { read: false } });
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mensajes | Admin", "data-astro-cid-taxpn72d": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-layout" data-astro-cid-taxpn72d> <aside class="admin-sidebar" data-astro-cid-taxpn72d> <div class="sidebar-logo" data-astro-cid-taxpn72d><svg viewBox="0 0 32 32" fill="none" width="32" height="32" data-astro-cid-taxpn72d><rect width="32" height="32" rx="8" fill="var(--color-accent)" data-astro-cid-taxpn72d></rect><path d="M8 24V8h4l4 10 4-10h4v16h-3V13l-3.5 9h-3L11 13v11H8z" fill="var(--color-primary)" data-astro-cid-taxpn72d></path></svg><span data-astro-cid-taxpn72d>Admin</span></div> <nav class="sidebar-nav" data-astro-cid-taxpn72d> <a href="/admin" class="sidebar-link" data-astro-cid-taxpn72d>Dashboard</a> <a href="/admin/planes" class="sidebar-link" data-astro-cid-taxpn72d>Planes</a> <a href="/admin/servicios" class="sidebar-link" data-astro-cid-taxpn72d>Servicios</a> <a href="/admin/testimonios" class="sidebar-link" data-astro-cid-taxpn72d>Testimonios</a> <a href="/admin/mensajes" class="sidebar-link active" data-astro-cid-taxpn72d>Mensajes ${unreadMessages > 0 && renderTemplate`<span class="badge-count" data-astro-cid-taxpn72d>${unreadMessages}</span>`}</a> </nav> <div class="sidebar-footer" data-astro-cid-taxpn72d><a href="/" class="sidebar-link" data-astro-cid-taxpn72d>Ver Sitio</a></div> </aside> <main class="admin-main" data-astro-cid-taxpn72d> <div class="admin-header" data-astro-cid-taxpn72d> <h1 data-astro-cid-taxpn72d>Mensajes de Contacto</h1> <span class="msg-count" data-astro-cid-taxpn72d>${messages.length} mensajes · ${unreadMessages} sin leer</span> </div> <div class="messages-list" data-astro-cid-taxpn72d> ${messages.length === 0 ? renderTemplate`<div class="empty-msg" data-astro-cid-taxpn72d> <p data-astro-cid-taxpn72d>No hay mensajes aún. Los mensajes del formulario de contacto aparecerán aquí.</p> </div>` : messages.map((msg) => renderTemplate`<div${addAttribute(["message-card", { unread: !msg.read }], "class:list")}${addAttribute(msg.id, "data-id")} data-astro-cid-taxpn72d> <div class="message-header" data-astro-cid-taxpn72d> <div class="message-sender" data-astro-cid-taxpn72d> <div class="message-avatar" data-astro-cid-taxpn72d>${msg.name.charAt(0)}</div> <div data-astro-cid-taxpn72d> <strong data-astro-cid-taxpn72d>${msg.name}</strong> <span class="message-email" data-astro-cid-taxpn72d>${msg.email}</span> </div> </div> <div class="message-meta" data-astro-cid-taxpn72d> ${!msg.read && renderTemplate`<span class="badge badge-accent" data-astro-cid-taxpn72d>Nuevo</span>`} <span class="message-date" data-astro-cid-taxpn72d>${msg.createdAt.toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span> </div> </div> ${msg.phone && renderTemplate`<p class="message-phone" data-astro-cid-taxpn72d>📞 ${msg.phone}</p>`} ${msg.service && renderTemplate`<p class="message-service" data-astro-cid-taxpn72d>📋 Servicio: ${msg.service}</p>`} <p class="message-text" data-astro-cid-taxpn72d>${msg.message}</p> <div class="message-actions" data-astro-cid-taxpn72d> ${!msg.read && renderTemplate`<button class="btn-sm btn-mark-read"${addAttribute(msg.id, "data-id")} data-astro-cid-taxpn72d>Marcar como leído</button>`} <a${addAttribute(`mailto:${msg.email}?subject=Re: Consulta desde sitio web`, "href")} class="btn-sm" data-astro-cid-taxpn72d>Responder por email</a> </div> </div>`)} </div> </main> </div> ` })} ${renderScript($$result, "C:/Users/franc/Desktop/contadora-sitio/src/pages/admin/mensajes.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/franc/Desktop/contadora-sitio/src/pages/admin/mensajes.astro", void 0);
const $$file = "C:/Users/franc/Desktop/contadora-sitio/src/pages/admin/mensajes.astro";
const $$url = "/admin/mensajes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Mensajes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
