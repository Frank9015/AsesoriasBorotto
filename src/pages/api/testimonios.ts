import type { APIRoute } from 'astro';
import { prisma } from '../../lib/prisma';
import { validateAdminSession, ADMIN_SESSION_COOKIE } from '../../lib/auth';

async function isAuthorized(cookies: Parameters<APIRoute>[0]['cookies']): Promise<boolean> {
  const sessionId = cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return validateAdminSession(sessionId);
}

export const GET: APIRoute = async ({ cookies }) => {
  const authed = await isAuthorized(cookies);
  // Usuarios no autenticados solo ven testimonios visibles
  const testimonials = await prisma.testimonial.findMany({
    where: authed ? undefined : { visible: true },
    orderBy: { createdAt: 'desc' },
  });
  return new Response(JSON.stringify(testimonials), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!(await isAuthorized(cookies))) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const data = await request.json();
    const testimonial = await prisma.testimonial.create({ data: {
      name: String(data.name || '').slice(0, 100),
      company: data.company ? String(data.company).slice(0, 100) : null,
      role: data.role ? String(data.role).slice(0, 100) : null,
      text: String(data.text || '').slice(0, 1000),
      rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
      visible: data.visible ?? true,
    }});
    return new Response(JSON.stringify(testimonial), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error al crear testimonio:', error instanceof Error ? error.message : 'desconocido');
    return new Response(JSON.stringify({ error: 'Error al crear testimonio' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  if (!(await isAuthorized(cookies))) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const data = await request.json();
    const testimonial = await prisma.testimonial.update({
      where: { id: Number(data.id) },
      data: {
        name: String(data.name || '').slice(0, 100),
        company: data.company ? String(data.company).slice(0, 100) : null,
        role: data.role ? String(data.role).slice(0, 100) : null,
        text: String(data.text || '').slice(0, 1000),
        rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
        visible: Boolean(data.visible),
      },
    });
    return new Response(JSON.stringify(testimonial), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error al actualizar testimonio:', error instanceof Error ? error.message : 'desconocido');
    return new Response(JSON.stringify({ error: 'Error al actualizar testimonio' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!(await isAuthorized(cookies))) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const { id } = await request.json();
    await prisma.testimonial.delete({ where: { id: Number(id) } });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error al eliminar testimonio:', error instanceof Error ? error.message : 'desconocido');
    return new Response(JSON.stringify({ error: 'Error al eliminar testimonio' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
