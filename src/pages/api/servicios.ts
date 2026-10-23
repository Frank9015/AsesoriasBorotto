import type { APIRoute } from 'astro';
import { prisma } from '../../lib/prisma';
import { validateAdminSession, ADMIN_SESSION_COOKIE } from '../../lib/auth';

async function isAuthorized(cookies: Parameters<APIRoute>[0]['cookies']): Promise<boolean> {
  const sessionId = cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return validateAdminSession(sessionId);
}

export const GET: APIRoute = async () => {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  return new Response(JSON.stringify(services), {
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
    const service = await prisma.service.create({ data: {
      name: String(data.name || '').slice(0, 200),
      description: String(data.description || '').slice(0, 1000),
      icon: String(data.icon || 'file-text').slice(0, 50),
      features: Array.isArray(data.features) ? data.features.map((f: unknown) => String(f).slice(0, 200)) : [],
      price: data.price ? String(data.price).slice(0, 100) : null,
      order: Number(data.order) || 0,
    }});
    return new Response(JSON.stringify(service), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error al crear servicio:', error instanceof Error ? error.message : 'desconocido');
    return new Response(JSON.stringify({ error: 'Error al crear servicio' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  if (!(await isAuthorized(cookies))) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const data = await request.json();
    const service = await prisma.service.update({
      where: { id: Number(data.id) },
      data: {
        name: String(data.name || '').slice(0, 200),
        description: String(data.description !== undefined ? data.description : '').slice(0, 1000),
        icon: String(data.icon || 'file-text').slice(0, 50),
        features: Array.isArray(data.features) ? data.features.map((f: unknown) => String(f).slice(0, 200)) : [],
        price: data.price ? String(data.price).slice(0, 100) : null,
        order: Number(data.order) || 0,
      },
    });
    return new Response(JSON.stringify(service), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error al actualizar servicio:', error instanceof Error ? error.message : 'desconocido');
    return new Response(JSON.stringify({ error: 'Error al actualizar servicio' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!(await isAuthorized(cookies))) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const { id } = await request.json();
    await prisma.service.delete({ where: { id: Number(id) } });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error al eliminar servicio:', error instanceof Error ? error.message : 'desconocido');
    return new Response(JSON.stringify({ error: 'Error al eliminar servicio' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
