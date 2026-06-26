import type { APIRoute } from 'astro';
import { prisma } from '../../lib/prisma';

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const password = authHeader.replace('Bearer ', '');
  return password === (import.meta.env.ADMIN_PASSWORD || 'Borotto#2026');
}

export const GET: APIRoute = async () => {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
  return new Response(JSON.stringify(services), {
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
    const service = await prisma.service.create({ data: {
      name: data.name,
      description: data.description,
      icon: data.icon || 'file-text',
      features: data.features || [],
      price: data.price || null,
      order: data.order || 0,
    }});
    return new Response(JSON.stringify(service), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al crear servicio' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
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
        order: data.order,
      },
    });
    return new Response(JSON.stringify(service), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al actualizar servicio' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const { id } = await request.json();
    await prisma.service.delete({ where: { id } });
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al eliminar servicio' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
