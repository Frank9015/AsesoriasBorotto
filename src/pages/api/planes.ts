import type { APIRoute } from 'astro';
import { prisma } from '../../lib/prisma';
import { validateAdminSession, ADMIN_SESSION_COOKIE } from '../../lib/auth';

async function isAuthorized(cookies: Parameters<APIRoute>[0]['cookies']): Promise<boolean> {
  const sessionId = cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return validateAdminSession(sessionId);
}

export const GET: APIRoute = async () => {
  // Solo devuelve planes activos al público — sin datos draft
  const plans = await prisma.plan.findMany({ orderBy: { order: 'asc' } });
  return new Response(JSON.stringify(plans), {
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
    const plan = await prisma.plan.create({ data: {
      name: String(data.name || '').slice(0, 200),
      price: String(data.price || '').slice(0, 100),
      description: String(data.description || '').slice(0, 1000),
      features: Array.isArray(data.features) ? data.features.map((f: unknown) => String(f).slice(0, 200)) : [],
      highlighted: Boolean(data.highlighted),
      order: Number(data.order) || 0,
    }});
    return new Response(JSON.stringify(plan), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error al crear plan:', error instanceof Error ? error.message : 'desconocido');
    return new Response(JSON.stringify({ error: 'Error al crear plan' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  if (!(await isAuthorized(cookies))) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const data = await request.json();
    const plan = await prisma.plan.update({
      where: { id: Number(data.id) },
      data: {
        name: String(data.name || '').slice(0, 200),
        price: String(data.price || '').slice(0, 100),
        description: String(data.description !== undefined ? data.description : '').slice(0, 1000),
        features: Array.isArray(data.features) ? data.features.map((f: unknown) => String(f).slice(0, 200)) : [],
        highlighted: Boolean(data.highlighted),
        order: Number(data.order) || 0,
      },
    });
    return new Response(JSON.stringify(plan), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error al actualizar plan:', error instanceof Error ? error.message : 'desconocido');
    return new Response(JSON.stringify({ error: 'Error al actualizar plan' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!(await isAuthorized(cookies))) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const { id } = await request.json();
    await prisma.plan.delete({ where: { id: Number(id) } });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error al eliminar plan:', error instanceof Error ? error.message : 'desconocido');
    return new Response(JSON.stringify({ error: 'Error al eliminar plan' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
