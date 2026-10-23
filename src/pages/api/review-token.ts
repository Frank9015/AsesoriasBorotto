import type { APIRoute } from 'astro';
import { prisma } from '../../lib/prisma';
import { validateAdminSession, ADMIN_SESSION_COOKIE } from '../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Verificar sesión admin
    const sessionId = cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!(await validateAdminSession(sessionId))) {
      return new Response(
        JSON.stringify({ error: 'No autorizado' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crear Token en la Base de Datos
    const token = await prisma.reviewToken.create({
      data: { used: false }
    });

    const origin = new URL(request.url).origin;
    const link = `${origin}/resena?token=${token.id}`;

    return new Response(
      JSON.stringify({ success: true, link, token: token.id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al generar token de reseña:', error instanceof Error ? error.message : 'desconocido');
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
