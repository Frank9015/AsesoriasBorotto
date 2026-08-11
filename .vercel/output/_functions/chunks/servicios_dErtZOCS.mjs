import { p as prisma } from './prisma_3hcEPnbV.mjs';

function isAuthorized(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const password = authHeader.replace("Bearer ", "");
  return password === "admin123";
}
const GET = async () => {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return new Response(JSON.stringify(services), {
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
    const service = await prisma.service.create({ data: {
      name: data.name,
      description: data.description,
      icon: data.icon || "file-text",
      features: data.features || [],
      price: data.price || null,
      order: data.order || 0
    } });
    return new Response(JSON.stringify(service), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al crear servicio" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
const PUT = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  }
  try {
    const data = await request.json();
    const service = await prisma.service.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        icon: data.icon,
        features: data.features || [],
        price: data.price || null,
        order: data.order
      }
    });
    return new Response(JSON.stringify(service), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al actualizar servicio" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
const DELETE = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: { "Content-Type": "application/json" } });
  }
  try {
    const { id } = await request.json();
    await prisma.service.delete({ where: { id } });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al eliminar servicio" }), { status: 500, headers: { "Content-Type": "application/json" } });
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
