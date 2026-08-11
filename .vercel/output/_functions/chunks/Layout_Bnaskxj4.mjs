import { c as createComponent } from './astro-component_CvQZIwnS.mjs';
import 'piccolore';
import { q as createRenderInstruction, k as renderTemplate, v as renderSlot, w as renderHead, h as addAttribute } from './entrypoint_DFUSRtSH.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Servicios profesionales de contabilidad, auditoría y asesoría tributaria en Chile. Planes a tu medida para emprendedores y pymes."
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', '><meta name="author" content="Asesorías Borotto"><!-- Open Graph --><meta property="og:title"', '><meta property="og:description"', '><meta property="og:type" content="website"><meta property="og:locale" content="es_CL"><!-- Favicon --><link rel="icon" type="image/png" href="/logo.png"><!-- SweetAlert2 --><script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"><\/script><!-- Estilos globales --><title>', "</title>", "</head> <body> ", " <!-- Intersection Observer para animaciones al scroll --> ", " </body> </html> "])), addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), title, renderHead(), renderSlot($$result, $$slots["default"]), renderScript($$result, "C:/Users/franc/Desktop/contadora-sitio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/franc/Desktop/contadora-sitio/src/layouts/Layout.astro", void 0);

export { $$Layout as $, renderScript as r };
