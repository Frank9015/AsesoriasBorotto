import { c as createComponent } from './astro-component_CvQZIwnS.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, k as renderTemplate } from './entrypoint_DFUSRtSH.mjs';
import 'clsx';

const $$PlanCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PlanCard;
  const { name, price, description, features, highlighted = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["plan-card", { highlighted }], "class:list")} data-astro-cid-753wq3aa> ${highlighted && renderTemplate`<span class="badge badge-accent plan-badge" data-astro-cid-753wq3aa>Popular</span>`} <h3 class="plan-name" data-astro-cid-753wq3aa>${name}</h3> <p class="plan-price" data-astro-cid-753wq3aa>${price}</p> <p class="plan-desc" data-astro-cid-753wq3aa>${description}</p> <ul class="plan-features" data-astro-cid-753wq3aa> ${features.map((feature) => {
    const isSub = feature.trim().startsWith("•");
    const cleanText = isSub ? feature.replace(/^•\s*/, "") : feature;
    return renderTemplate`<li${addAttribute(isSub ? "sub-feature" : "", "class")} data-astro-cid-753wq3aa> ${!isSub ? renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-753wq3aa> <polyline points="20 6 9 17 4 12" data-astro-cid-753wq3aa></polyline> </svg>` : renderTemplate`<span class="bullet-dot" data-astro-cid-753wq3aa>•</span>`} <span data-astro-cid-753wq3aa>${cleanText}</span> </li>`;
  })} </ul> <a href="/contacto"${addAttribute(["btn", "w-full", highlighted ? "btn-primary" : "btn-secondary"], "class:list")} style="text-align:center; margin-top: auto;" data-astro-cid-753wq3aa>
Solicitar
</a> </div>`;
}, "C:/Users/franc/Desktop/contadora-sitio/src/components/PlanCard.astro", void 0);

export { $$PlanCard as $ };
