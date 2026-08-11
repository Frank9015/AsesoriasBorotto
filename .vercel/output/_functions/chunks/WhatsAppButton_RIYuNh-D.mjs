import { c as createComponent } from './astro-component_CvQZIwnS.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, u as unescapeHTML, k as renderTemplate } from './entrypoint_DFUSRtSH.mjs';
import 'clsx';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Hero;
  const {
    title,
    subtitle,
    ctaPrimary = { text: "Ver Planes", href: "/planes" },
    ctaSecondary = { text: "Contactar", href: "/contacto" },
    compact = false
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(["hero", { "hero-compact": compact }], "class:list")} id="hero" data-astro-cid-bbe6dxrz> <!-- Decorative shapes --> <div class="hero-shapes" aria-hidden="true" data-astro-cid-bbe6dxrz> <div class="shape shape-1" data-astro-cid-bbe6dxrz></div> <div class="shape shape-2" data-astro-cid-bbe6dxrz></div> <div class="shape shape-3" data-astro-cid-bbe6dxrz></div> <div class="shape shape-4" data-astro-cid-bbe6dxrz></div> </div> <div class="container hero-container" data-astro-cid-bbe6dxrz> <div class="hero-content" data-astro-cid-bbe6dxrz> <h1 class="hero-title" data-astro-cid-bbe6dxrz>${unescapeHTML(title)}</h1> <p class="hero-subtitle" data-astro-cid-bbe6dxrz>${subtitle}</p> <div class="hero-ctas" data-astro-cid-bbe6dxrz> <a${addAttribute(ctaPrimary.href, "href")} class="btn btn-primary btn-lg" data-astro-cid-bbe6dxrz>${ctaPrimary.text}</a> <a${addAttribute(ctaSecondary.href, "href")} class="btn btn-secondary btn-lg" data-astro-cid-bbe6dxrz>${ctaSecondary.text}</a> </div> </div> </div> </section>`;
}, "C:/Users/franc/Desktop/contadora-sitio/src/components/Hero.astro", void 0);

const $$WhatsAppButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$WhatsAppButton;
  const {
    phone = "56973764841",
    message = "Hola! Me interesa conocer más sobre tus servicios de contabilidad."
  } = Astro2.props;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(whatsappUrl, "href")} target="_blank" rel="noopener noreferrer" class="whatsapp-btn" id="whatsapp-btn" aria-label="Contactar por WhatsApp" data-astro-cid-iehx2mtc> <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-iehx2mtc> <path d="M16.004 2.002c-7.732 0-14.002 6.27-14.002 14.002 0 2.468.657 4.876 1.904 6.988L2 30l7.195-1.886A13.94 13.94 0 0 0 16.004 30c7.732 0 14.002-6.27 14.002-14.002S23.736 2.002 16.004 2.002zm0 25.614a11.584 11.584 0 0 1-5.91-1.617l-.424-.252-4.394 1.152 1.174-4.288-.276-.44a11.55 11.55 0 0 1-1.774-6.17c0-6.412 5.217-11.63 11.63-11.63 6.412 0 11.63 5.218 11.63 11.63-.002 6.413-5.22 11.63-11.632 11.63h-.024zm6.38-8.712c-.35-.175-2.07-1.02-2.39-1.137-.32-.117-.553-.175-.786.175s-.902 1.137-1.106 1.37-.407.263-.757.088c-.35-.175-1.477-.544-2.814-1.736-1.04-.927-1.742-2.072-1.946-2.422-.204-.35-.022-.539.153-.713.157-.157.35-.408.525-.612.175-.204.233-.35.35-.583.117-.233.058-.437-.03-.612-.087-.175-.785-1.893-1.076-2.592-.283-.68-.571-.588-.786-.599-.204-.01-.437-.012-.67-.012s-.612.088-.933.437c-.32.35-1.223 1.196-1.223 2.916s1.252 3.382 1.427 3.615c.175.233 2.465 3.763 5.974 5.276.835.36 1.486.576 1.994.737.838.266 1.601.229 2.203.139.672-.1 2.07-.846 2.362-1.663.292-.817.292-1.518.204-1.663-.087-.146-.32-.233-.67-.408z" fill="white" data-astro-cid-iehx2mtc></path> </svg> <span class="whatsapp-tooltip" data-astro-cid-iehx2mtc>¿Necesitas ayuda?</span> </a>`;
}, "C:/Users/franc/Desktop/contadora-sitio/src/components/WhatsAppButton.astro", void 0);

export { $$Hero as $, $$WhatsAppButton as a };
