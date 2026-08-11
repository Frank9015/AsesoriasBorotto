import { c as createComponent } from './astro-component_CvQZIwnS.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, k as renderTemplate } from './entrypoint_DFUSRtSH.mjs';
import 'clsx';
import { r as renderScript } from './Layout_Bnaskxj4.mjs';

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Header;
  const currentPath = Astro2.url.pathname;
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/sobre-mi", label: "Sobre Mí" },
    { href: "/servicios", label: "Servicios" },
    { href: "/planes", label: "Planes" },
    { href: "/testimonios", label: "Testimonios" },
    { href: "/contacto", label: "Contacto" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="header" id="main-header" data-astro-cid-3ef6ksr2> <div class="container" data-astro-cid-3ef6ksr2> <nav class="nav" data-astro-cid-3ef6ksr2> <a href="/" class="logo" id="logo" data-astro-cid-3ef6ksr2> <img src="/logo.png?v=4" alt="Asesorías Borotto" class="logo-img" data-astro-cid-3ef6ksr2> </a> <ul class="nav-links" id="nav-links" data-astro-cid-3ef6ksr2> ${navLinks.map((link) => renderTemplate`<li data-astro-cid-3ef6ksr2> <a${addAttribute(link.href, "href")}${addAttribute(["nav-link", { active: currentPath === link.href || link.href !== "/" && currentPath.startsWith(link.href) }], "class:list")} data-astro-cid-3ef6ksr2> ${link.label} </a> </li>`)} </ul> <a href="/contacto" class="btn btn-primary hide-mobile" id="header-cta" data-astro-cid-3ef6ksr2>
Consulta Gratis
</a> <button class="hamburger" id="hamburger" aria-label="Abrir menú" aria-expanded="false" data-astro-cid-3ef6ksr2> <span data-astro-cid-3ef6ksr2></span> <span data-astro-cid-3ef6ksr2></span> <span data-astro-cid-3ef6ksr2></span> </button> </nav> </div> </header> <!-- Mobile menu overlay --> <div class="mobile-menu" id="mobile-menu" data-astro-cid-3ef6ksr2> <ul class="mobile-nav-links" data-astro-cid-3ef6ksr2> ${navLinks.map((link) => renderTemplate`<li data-astro-cid-3ef6ksr2> <a${addAttribute(link.href, "href")}${addAttribute(["mobile-nav-link", { active: currentPath === link.href }], "class:list")} data-astro-cid-3ef6ksr2> ${link.label} </a> </li>`)} </ul> <a href="/contacto" class="btn btn-primary btn-lg w-full" style="margin-top: var(--space-6); text-align: center;" data-astro-cid-3ef6ksr2>
Consulta Gratis
</a> </div> ${renderScript($$result, "C:/Users/franc/Desktop/contadora-sitio/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/franc/Desktop/contadora-sitio/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/sobre-mi", label: "Sobre Mí" },
    { href: "/servicios", label: "Servicios" },
    { href: "/planes", label: "Planes" },
    { href: "/testimonios", label: "Testimonios" },
    { href: "/contacto", label: "Contacto" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="footer" id="main-footer" data-astro-cid-sz7xmlte> <div class="footer-wave" data-astro-cid-sz7xmlte> <svg viewBox="0 0 1440 120" preserveAspectRatio="none" data-astro-cid-sz7xmlte> <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z" fill="var(--color-primary)" data-astro-cid-sz7xmlte></path> </svg> </div> <div class="footer-body" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <div class="footer-grid" data-astro-cid-sz7xmlte> <!-- Brand --> <div class="footer-brand" data-astro-cid-sz7xmlte> <div class="footer-logo" data-astro-cid-sz7xmlte> <img src="/logo-light.png?v=4" alt="Asesorías Borotto" class="footer-logo-img" data-astro-cid-sz7xmlte> </div> <p class="footer-desc" data-astro-cid-sz7xmlte>
Servicios profesionales de contabilidad, auditoría y asesoría tributaria. 
            Tu tranquilidad financiera es mi prioridad.
</p> </div> <!-- Enlaces --> <div class="footer-section" data-astro-cid-sz7xmlte> <h4 class="footer-title" data-astro-cid-sz7xmlte>Navegación</h4> <ul class="footer-links" data-astro-cid-sz7xmlte> ${navLinks.map((link) => renderTemplate`<li data-astro-cid-sz7xmlte><a${addAttribute(link.href, "href")} data-astro-cid-sz7xmlte>${link.label}</a></li>`)} </ul> </div> <!-- Servicios --> <div class="footer-section" data-astro-cid-sz7xmlte> <h4 class="footer-title" data-astro-cid-sz7xmlte>Servicios</h4> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/servicios" data-astro-cid-sz7xmlte>Declaración de Impuestos</a></li> <li data-astro-cid-sz7xmlte><a href="/servicios" data-astro-cid-sz7xmlte>Contabilidad Completa</a></li> <li data-astro-cid-sz7xmlte><a href="/servicios" data-astro-cid-sz7xmlte>Remuneraciones</a></li> <li data-astro-cid-sz7xmlte><a href="/servicios" data-astro-cid-sz7xmlte>Asesoría Tributaria</a></li> <li data-astro-cid-sz7xmlte><a href="/servicios" data-astro-cid-sz7xmlte>Auditoría Financiera</a></li> </ul> </div> <!-- Contacto --> <div class="footer-section" data-astro-cid-sz7xmlte> <h4 class="footer-title" data-astro-cid-sz7xmlte>Contacto & Redes</h4> <ul class="footer-contact" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sz7xmlte><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-astro-cid-sz7xmlte></path><polyline points="22,6 12,13 2,6" data-astro-cid-sz7xmlte></polyline></svg> <a href="mailto:contacto@asesoriasborotto.cl" data-astro-cid-sz7xmlte>contacto@asesoriasborotto.cl</a> </li> <li data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sz7xmlte><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-sz7xmlte></path></svg> <a href="tel:+56973764841" data-astro-cid-sz7xmlte>+56 9 7376 4841</a> </li> <li data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-sz7xmlte><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" data-astro-cid-sz7xmlte></path></svg> <a href="https://www.linkedin.com/in/rossana-borotto/" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>LinkedIn Profesional</a> </li> <li data-astro-cid-sz7xmlte> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-sz7xmlte><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" data-astro-cid-sz7xmlte></path><circle cx="12" cy="10" r="3" data-astro-cid-sz7xmlte></circle></svg> <span data-astro-cid-sz7xmlte>Santiago, Chile</span> </li> </ul> </div> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>&copy; ${year} Asesorías Borotto. Todos los derechos reservados.</p> </div> </div> </div> </footer>`;
}, "C:/Users/franc/Desktop/contadora-sitio/src/components/Footer.astro", void 0);

export { $$Header as $, $$Footer as a };
