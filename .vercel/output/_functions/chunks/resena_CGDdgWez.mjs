import { c as createComponent } from './astro-component_CvQZIwnS.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_DFUSRtSH.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_Bnaskxj4.mjs';
import { $ as $$Header, a as $$Footer } from './Footer_Drw3Fq9T.mjs';
import { p as prisma } from './prisma_3hcEPnbV.mjs';

const $$Resena = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Resena;
  const token = Astro2.url.searchParams.get("token");
  let isValid = false;
  let errorMsg = "";
  if (!token) {
    errorMsg = "No se proporcionó un link de reseña.";
  } else {
    try {
      const reviewToken = await prisma.reviewToken.findUnique({
        where: { id: token }
      });
      if (!reviewToken) {
        errorMsg = "El link de reseña es inválido o no existe.";
      } else if (reviewToken.used) {
        errorMsg = "Este link de reseña ya ha sido utilizado. Cada link es válido para una sola reseña.";
      } else {
        isValid = true;
      }
    } catch (e) {
      errorMsg = "Error al verificar el link. Por favor, inténtalo más tarde.";
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dejar Reseña | Asesorías Borotto", "data-astro-cid-ykoduolo": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-ykoduolo": true })} ${maybeRenderHead()}<main style="padding-top: 120px; padding-bottom: 80px; min-height: 70vh;" data-astro-cid-ykoduolo> <div class="container" data-astro-cid-ykoduolo> <div class="review-wrapper" data-astro-cid-ykoduolo> <div class="section-header" data-astro-cid-ykoduolo> <span class="section-label" data-astro-cid-ykoduolo>Feedback</span> <h2 data-astro-cid-ykoduolo>Dejar una Reseña</h2> <p data-astro-cid-ykoduolo>Tu opinión es fundamental para seguir mejorando mis servicios.</p> </div> ${isValid ? renderTemplate`<div class="card-glass review-card reveal" data-astro-cid-ykoduolo> <form id="review-form" data-astro-cid-ykoduolo> <input type="hidden" id="token"${addAttribute(token, "value")} data-astro-cid-ykoduolo> <div class="form-group mb-4" data-astro-cid-ykoduolo> <label class="form-label" data-astro-cid-ykoduolo>Nombre *</label> <input type="text" id="name" class="form-input" required placeholder="Ej: Juan Pérez" data-astro-cid-ykoduolo> </div> <div class="form-row mb-4" data-astro-cid-ykoduolo> <div class="form-group" data-astro-cid-ykoduolo> <label class="form-label" data-astro-cid-ykoduolo>Empresa (Opcional)</label> <input type="text" id="company" class="form-input" placeholder="Ej: Mi Pyme SpA" data-astro-cid-ykoduolo> </div> <div class="form-group" data-astro-cid-ykoduolo> <label class="form-label" data-astro-cid-ykoduolo>Cargo (Opcional)</label> <input type="text" id="role" class="form-input" placeholder="Ej: Dueño" data-astro-cid-ykoduolo> </div> </div> <div class="form-group mb-4" data-astro-cid-ykoduolo> <label class="form-label" data-astro-cid-ykoduolo>Testimonio *</label> <textarea id="text" class="form-textarea" required placeholder="Cuéntanos tu experiencia trabajando con nosotros..." data-astro-cid-ykoduolo></textarea> </div> <div class="form-group mb-8 text-center" data-astro-cid-ykoduolo> <label class="form-label" style="display:block; margin-bottom: 10px;" data-astro-cid-ykoduolo>Calificación *</label> <div class="star-rating" data-astro-cid-ykoduolo> <input type="radio" id="star5" name="rating" value="5" checked data-astro-cid-ykoduolo> <label for="star5" title="5 estrellas" data-astro-cid-ykoduolo>★</label> <input type="radio" id="star4" name="rating" value="4" data-astro-cid-ykoduolo> <label for="star4" title="4 estrellas" data-astro-cid-ykoduolo>★</label> <input type="radio" id="star3" name="rating" value="3" data-astro-cid-ykoduolo> <label for="star3" title="3 estrellas" data-astro-cid-ykoduolo>★</label> <input type="radio" id="star2" name="rating" value="2" data-astro-cid-ykoduolo> <label for="star2" title="2 estrellas" data-astro-cid-ykoduolo>★</label> <input type="radio" id="star1" name="rating" value="1" data-astro-cid-ykoduolo> <label for="star1" title="1 estrella" data-astro-cid-ykoduolo>★</label> </div> </div> <button type="submit" class="btn btn-primary btn-lg w-full" data-astro-cid-ykoduolo>Enviar Reseña</button> </form> </div>` : renderTemplate`<div class="card error-card reveal text-center" data-astro-cid-ykoduolo> <div style="font-size: 3rem; margin-bottom: var(--space-4);" data-astro-cid-ykoduolo>⚠️</div> <h3 data-astro-cid-ykoduolo>Link Inválido</h3> <p data-astro-cid-ykoduolo>${errorMsg}</p> <a href="/" class="btn btn-secondary mt-8" data-astro-cid-ykoduolo>Volver al Inicio</a> </div>`} </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-ykoduolo": true })} ` })} ${renderScript($$result, "C:/Users/franc/Desktop/contadora-sitio/src/pages/resena.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/franc/Desktop/contadora-sitio/src/pages/resena.astro", void 0);

const $$file = "C:/Users/franc/Desktop/contadora-sitio/src/pages/resena.astro";
const $$url = "/resena";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Resena,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
