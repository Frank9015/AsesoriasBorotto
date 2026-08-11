import { p as prisma } from './prisma_3hcEPnbV.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const authCookie = cookies.get("admin_auth")?.value;
    const adminPassword = "admin123";
    if (authCookie !== adminPassword) {
      return new Response(
        JSON.stringify({ error: "No autorizado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const token = await prisma.reviewToken.create({
      data: {
        used: false
      }
    });
    const origin = new URL(request.url).origin;
    const link = `${origin}/resena?token=${token.id}`;
    return new Response(
      JSON.stringify({ success: true, link, token: token.id }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al generar token de reseña:", error);
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
