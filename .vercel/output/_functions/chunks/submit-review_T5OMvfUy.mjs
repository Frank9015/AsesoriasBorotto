import { p as prisma } from './prisma_3hcEPnbV.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { token, name, company, role, text, rating } = data;
    if (!token || !name || !text || !rating) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios o el token." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const reviewToken = await prisma.reviewToken.findUnique({
      where: { id: token }
    });
    if (!reviewToken) {
      return new Response(
        JSON.stringify({ error: "El link de reseña es inválido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (reviewToken.used) {
      return new Response(
        JSON.stringify({ error: "Este link de reseña ya ha sido utilizado." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        company: company || null,
        role: role || null,
        text,
        rating: Number(rating),
        visible: true
        // Según solicitud del cliente
      }
    });
    await prisma.reviewToken.update({
      where: { id: token },
      data: { used: true }
    });
    return new Response(
      JSON.stringify({ success: true, id: newTestimonial.id }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al guardar reseña:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
