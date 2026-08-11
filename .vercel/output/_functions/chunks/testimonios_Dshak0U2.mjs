import { c as createComponent } from './astro-component_CvQZIwnS.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_DFUSRtSH.mjs';
import { $ as $$Layout } from './Layout_Bnaskxj4.mjs';
import { $ as $$Header, a as $$Footer } from './Footer_Drw3Fq9T.mjs';
import { $ as $$Hero, a as $$WhatsAppButton } from './WhatsAppButton_RIYuNh-D.mjs';
import { p as prisma } from './prisma_3hcEPnbV.mjs';

const $$Testimonios = createComponent(async ($$result, $$props, $$slots) => {
  const testimonials = await prisma.testimonial.findMany({ where: { visible: true }, orderBy: { createdAt: "desc" } });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Testimonios | Asesorías Borotto", "description": "Conoce las opiniones de nuestros clientes sobre las asesorías contables y tributarias de Asesorías Borotto.", "data-astro-cid-poxa74gv": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-poxa74gv": true })} ${maybeRenderHead()}<main data-astro-cid-poxa74gv> ${renderComponent($$result2, "Hero", $$Hero, { "title": 'Lo que dicen mis <span class="accent">clientes</span>', "subtitle": "La confianza de mis clientes es mi mayor orgullo. Conoce sus experiencias.", "compact": true, "ctaPrimary": { text: "Contactar", href: "/contacto" }, "ctaSecondary": { text: "Ver Planes", href: "/planes" }, "data-astro-cid-poxa74gv": true })} <section class="section" data-astro-cid-poxa74gv> <div class="container" data-astro-cid-poxa74gv> ${testimonials.length > 0 ? renderTemplate`<div class="testimonials-page-grid" data-astro-cid-poxa74gv> ${testimonials.map((t, i) => renderTemplate`<div${addAttribute(`card testimonial-page-card reveal delay-${Math.min(i + 1, 6)}`, "class")} data-astro-cid-poxa74gv> <div class="t-quote" data-astro-cid-poxa74gv>"</div> <p class="t-text" data-astro-cid-poxa74gv>${t.text}</p> <div class="t-author" data-astro-cid-poxa74gv> <div class="t-avatar" data-astro-cid-poxa74gv>${t.name.charAt(0)}</div> <div data-astro-cid-poxa74gv> <strong data-astro-cid-poxa74gv>${t.name}</strong> ${t.role && t.company && renderTemplate`<span data-astro-cid-poxa74gv>${t.role} — ${t.company}</span>`} </div> </div> <div class="t-stars" data-astro-cid-poxa74gv> ${Array.from({ length: t.rating }).map(() => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--color-accent)" stroke="var(--color-accent)" stroke-width="1" data-astro-cid-poxa74gv><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" data-astro-cid-poxa74gv></polygon></svg>`)} </div> </div>`)} </div>` : renderTemplate`<div class="empty-state reveal" data-astro-cid-poxa74gv> <h3 data-astro-cid-poxa74gv>Pronto compartiremos testimonios</h3> <p data-astro-cid-poxa74gv>Estamos recopilando las experiencias de nuestros clientes.</p> </div>`} <div class="cta-section reveal" style="margin-top: var(--space-16);" data-astro-cid-poxa74gv> <div class="card-glass" style="text-align: center; padding: var(--space-10);" data-astro-cid-poxa74gv> <h3 data-astro-cid-poxa74gv>¿Quieres ser el próximo caso de éxito?</h3> <p style="margin: var(--space-4) auto; max-width: 500px;" data-astro-cid-poxa74gv>Contáctame y descubre cómo puedo ayudar a tu negocio.</p> <a href="/contacto" class="btn btn-primary btn-lg" data-astro-cid-poxa74gv>Agendar Consulta Gratis</a> </div> </div> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-poxa74gv": true })} ${renderComponent($$result2, "WhatsAppButton", $$WhatsAppButton, { "data-astro-cid-poxa74gv": true })} ` })}`;
}, "C:/Users/franc/Desktop/contadora-sitio/src/pages/testimonios.astro", void 0);

const $$file = "C:/Users/franc/Desktop/contadora-sitio/src/pages/testimonios.astro";
const $$url = "/testimonios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Testimonios,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
