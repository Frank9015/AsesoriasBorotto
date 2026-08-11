import { c as createComponent } from './astro-component_CvQZIwnS.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_DFUSRtSH.mjs';
import { $ as $$Layout } from './Layout_Bnaskxj4.mjs';
import { $ as $$Header, a as $$Footer } from './Footer_Drw3Fq9T.mjs';
import { $ as $$Hero, a as $$WhatsAppButton } from './WhatsAppButton_RIYuNh-D.mjs';
import { $ as $$PlanCard } from './PlanCard_ByVddxxm.mjs';
import { p as prisma } from './prisma_3hcEPnbV.mjs';

const $$Planes = createComponent(async ($$result, $$props, $$slots) => {
  const plans = await prisma.plan.findMany({ orderBy: { order: "asc" } });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Planes y Precios | Asesorías Borotto", "description": "Conoce los planes de servicios contables de Asesorías Borotto. Desde declaración de impuestos hasta contabilidad completa y asesoría directa.", "data-astro-cid-sd3efst6": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-sd3efst6": true })} ${maybeRenderHead()}<main data-astro-cid-sd3efst6> ${renderComponent($$result2, "Hero", $$Hero, { "title": 'Planes a <span class="accent">tu medida</span>', "subtitle": "Elige el plan que mejor se adapte a tu negocio. Todos incluyen atención personalizada y asesoría directa.", "compact": true, "ctaPrimary": { text: "Contactar", href: "/contacto" }, "ctaSecondary": { text: "Ver Servicios", href: "/servicios" }, "data-astro-cid-sd3efst6": true })} <section class="section" data-astro-cid-sd3efst6> <div class="container" data-astro-cid-sd3efst6> <!-- Cabecera de la sección inspirada en la referencia --> <div class="section-header-custom reveal" data-astro-cid-sd3efst6> <span class="section-label" data-astro-cid-sd3efst6>Acerca de nuestros</span> <h2 data-astro-cid-sd3efst6>Planes de Servicios Contables</h2> <div class="header-description" data-astro-cid-sd3efst6> <p data-astro-cid-sd3efst6>Queremos que tengas un contador cuando de verdad lo necesites. Es por eso que, nuestros planes están enfocados en la realidad de tu negocio, tiempo y horario, con la calidad y profesionalismo que nos caracteriza desde siempre.</p> <p data-astro-cid-sd3efst6>Diseñamos planes a tu medida, con la férrea convicción de que seremos el impulso que nuestros emprendedores necesitan para alcanzar el éxito.</p> </div> </div> <div class="plans-grid" data-astro-cid-sd3efst6> ${plans.map((plan, i) => renderTemplate`<div${addAttribute(`reveal delay-${i + 1}`, "class")} data-astro-cid-sd3efst6> ${renderComponent($$result2, "PlanCard", $$PlanCard, { "name": plan.name, "price": plan.price, "description": plan.description, "features": plan.features, "highlighted": plan.highlighted, "data-astro-cid-sd3efst6": true })} </div>`)} </div> <div class="custom-plan reveal" style="margin-top: var(--space-16);" data-astro-cid-sd3efst6> <div class="card-glass" style="text-align: center; padding: var(--space-10);" data-astro-cid-sd3efst6> <h3 data-astro-cid-sd3efst6>¿No encuentras lo que buscas?</h3> <p style="margin: var(--space-4) auto; max-width: 500px;" data-astro-cid-sd3efst6>Puedo crear un plan personalizado para las necesidades específicas de tu negocio. Conversemos.</p> <a href="/contacto" class="btn btn-primary" data-astro-cid-sd3efst6>Solicitar Plan Personalizado</a> </div> </div> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-sd3efst6": true })} ${renderComponent($$result2, "WhatsAppButton", $$WhatsAppButton, { "data-astro-cid-sd3efst6": true })} ` })}`;
}, "C:/Users/franc/Desktop/contadora-sitio/src/pages/planes.astro", void 0);

const $$file = "C:/Users/franc/Desktop/contadora-sitio/src/pages/planes.astro";
const $$url = "/planes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Planes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
