import type { APIRoute } from 'astro';
import { prisma } from '../../lib/prisma';

// Autenticación básica para admin
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const password = authHeader.replace('Bearer ', '');
  return password === (import.meta.env.ADMIN_PASSWORD || 'Borotto#2026');
}

export const GET: APIRoute = async () => {
  const plans = await prisma.plan.findMany({ orderBy: { order: 'asc' } });
  return new Response(JSON.stringify(plans), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const data = await request.json();
    const plan = await prisma.plan.create({ data: {
      name: data.name,
      price: data.price,
      description: data.description,
      features: data.features || [],
      highlighted: data.highlighted || false,
      order: data.order || 0,
    }});
    return new Response(JSON.stringify(plan), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al crear plan' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const data = await request.json();
    const plan = await prisma.plan.update({
      where: { id: data.id },
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        features: data.features,
        highlighted: data.highlighted,
        order: data.order,
      },
    });
    return new Response(JSON.stringify(plan), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al actualizar plan' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const { id } = await request.json();
    await prisma.plan.delete({ where: { id } });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al eliminar plan' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
