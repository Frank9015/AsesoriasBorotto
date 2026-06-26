import type { APIRoute } from 'astro';
import { prisma } from '../../lib/prisma';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // 1. Verificación de Autenticación de Admin
    const authCookie = cookies.get('admin_auth')?.value;
    const adminPassword = import.meta.env.ADMIN_PASSWORD || 'admin123';
    
    if (authCookie !== adminPassword) {
      return new Response(
        JSON.stringify({ error: 'No autorizado' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Crear Token en la Base de Datos
    const token = await prisma.reviewToken.create({
      data: {
        used: false
      }
    });

    // 3. Devolver la URL del link generado
    const origin = new URL(request.url).origin;
    const link = `${origin}/resena?token=${token.id}`;

    return new Response(
      JSON.stringify({ success: true, link, token: token.id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al generar token de reseña:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
