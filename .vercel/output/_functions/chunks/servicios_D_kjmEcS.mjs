import { c as createComponent } from './astro-component_CvQZIwnS.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead, h as addAttribute, p as Fragment, u as unescapeHTML } from './entrypoint_DFUSRtSH.mjs';
import { $ as $$Layout } from './Layout_Bnaskxj4.mjs';
import { $ as $$Header, a as $$Footer } from './Footer_Drw3Fq9T.mjs';
import { $ as $$Hero, a as $$WhatsAppButton } from './WhatsAppButton_RIYuNh-D.mjs';
import { p as prisma } from './prisma_3hcEPnbV.mjs';

const $$Servicios = createComponent(async ($$result, $$props, $$slots) => {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  const iconMap = {
    "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    "calculator": '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/>',
    "users": '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    "rocket": '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    "shield-check": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    "search": '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    "folder": '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    "briefcase": '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    "trending-up": '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    "bar-chart": '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
    "map-pin": '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    "palette": '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.46 2 12 2z"/>'
  };
  const steps = [
    { num: "01", title: "Conversemos", desc: "Cuéntame sobre tu negocio y tus necesidades contables. Agendemos una llamada o reunión." },
    { num: "02", title: "Plan personalizado", desc: "Diseño un plan de trabajo adaptado a tu empresa, con plazos y entregables claros." },
    { num: "03", title: "Manos a la obra", desc: "Me encargo de tu contabilidad mientras tú te enfocas en hacer crecer tu negocio." },
    { num: "04", title: "Seguimiento continuo", desc: "Recibes informes periódicos y asesoría constante para tomar las mejores decisiones." }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Servicios | Asesorías Borotto", "description": "Servicios de contabilidad, declaración de impuestos, remuneraciones, asesoría tributaria y auditoría financiera.", "data-astro-cid-wrzvmyuk": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-wrzvmyuk": true })} ${maybeRenderHead()}<main data-astro-cid-wrzvmyuk> ${renderComponent($$result2, "Hero", $$Hero, { "title": 'Servicios <span class="accent">profesionales</span>', "subtitle": "Soluciones contables integrales para emprendedores y pymes. Tu tranquilidad financiera es mi prioridad.", "compact": true, "ctaPrimary": { text: "Ver Planes", href: "/planes" }, "ctaSecondary": { text: "Contactar", href: "/contacto" }, "data-astro-cid-wrzvmyuk": true })} <!-- Services Grid --> <section class="section" data-astro-cid-wrzvmyuk> <div class="container" data-astro-cid-wrzvmyuk> <div class="services-detail-grid" data-astro-cid-wrzvmyuk> ${services.map((service, i) => renderTemplate`<div${addAttribute(`service-detail-card reveal delay-${Math.min(i + 1, 6)}`, "class")} data-astro-cid-wrzvmyuk> <div class="service-detail-header" data-astro-cid-wrzvmyuk> <div class="service-detail-icon" data-astro-cid-wrzvmyuk> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-wrzvmyuk> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(iconMap[service.icon] || iconMap["file-text"])}` })} </svg> </div> ${service.price && renderTemplate`<span class="service-price-badge" data-astro-cid-wrzvmyuk>${service.price}</span>`} </div> <h3 class="service-name" data-astro-cid-wrzvmyuk>${service.name}</h3> ${service.description && service.description.trim() !== "" && renderTemplate`<p class="service-desc" data-astro-cid-wrzvmyuk>${unescapeHTML(service.description.replace(/\n/g, "<br/>"))}</p>`} ${service.features && service.features.length > 0 && renderTemplate`<ul class="service-features" data-astro-cid-wrzvmyuk> ${service.features.map((feature) => renderTemplate`<li data-astro-cid-wrzvmyuk> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="check-icon" data-astro-cid-wrzvmyuk> <polyline points="20 6 9 17 4 12" data-astro-cid-wrzvmyuk></polyline> </svg> <span data-astro-cid-wrzvmyuk>${feature}</span> </li>`)} </ul>`} <a${addAttribute(`/contacto?servicio=${encodeURIComponent(service.name)}`, "href")} class="btn btn-primary w-full text-center" style="margin-top: auto;" data-astro-cid-wrzvmyuk>
Solicitar
</a> </div>`)} </div> </div> </section> <!-- Process --> <section class="section process-section" data-astro-cid-wrzvmyuk> <div class="container" data-astro-cid-wrzvmyuk> <div class="section-header" data-astro-cid-wrzvmyuk> <span class="section-label" data-astro-cid-wrzvmyuk>Proceso</span> <h2 data-astro-cid-wrzvmyuk>¿Cómo trabajamos juntos?</h2> <p data-astro-cid-wrzvmyuk>Un proceso simple y transparente para que te sientas acompañado en cada paso.</p> </div> <div class="process-grid" data-astro-cid-wrzvmyuk> ${steps.map((step, i) => renderTemplate`<div${addAttribute(`process-step reveal delay-${i + 1}`, "class")} data-astro-cid-wrzvmyuk> <div class="process-num" data-astro-cid-wrzvmyuk>${step.num}</div> <h3 data-astro-cid-wrzvmyuk>${step.title}</h3> <p data-astro-cid-wrzvmyuk>${step.desc}</p> </div>`)} </div> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-wrzvmyuk": true })} ${renderComponent($$result2, "WhatsAppButton", $$WhatsAppButton, { "data-astro-cid-wrzvmyuk": true })} ` })}`;
}, "C:/Users/franc/Desktop/contadora-sitio/src/pages/servicios.astro", void 0);

const $$file = "C:/Users/franc/Desktop/contadora-sitio/src/pages/servicios.astro";
const $$url = "/servicios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Servicios,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
