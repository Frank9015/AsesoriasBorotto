import { p as prisma } from './prisma_3hcEPnbV.mjs';

function isAuthorized(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const password = authHeader.replace("Bearer ", "");
  return password === "admin123";
}
const GET = async () => {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  return new Response(JSON.stringify(testimonials), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  }
  try {
    const data = await request.json();
    const testimonial = await prisma.testimonial.create({ data: {
      name: data.name,
      company: data.company || null,
      role: data.role || null,
      text: data.text,
      rating: data.rating || 5,
      visible: data.visible ?? true
    } });
    return new Response(JSON.stringify(testimonial), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al crear testimonio" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
const PUT = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  }
  try {
    const data = await request.json();
    const testimonial = await prisma.testimonial.update({
      where: { id: data.id },
      data: {
        name: data.name,
        company: data.company,
        role: data.role,
        text: data.text,
        rating: data.rating,
        visible: data.visible
      }
    });
    return new Response(JSON.stringify(testimonial), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al actualizar testimonio" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
const DELETE = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  }
  try {
    const { id } = await request.json();
    await prisma.testimonial.delete({ where: { id } });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al eliminar testimonio" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
