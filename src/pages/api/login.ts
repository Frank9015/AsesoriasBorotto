import type { APIRoute } from 'astro';
import { verifyAdminPassword, createAdminSession, ADMIN_SESSION_COOKIE } from '../../lib/auth';

/** Duración de la cookie en segundos (8 horas) */
const COOKIE_MAX_AGE = 8 * 60 * 60;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data = await request.json();
    const { password } = data;

    if (!password || typeof password !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Contraseña requerida.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!verifyAdminPassword(password)) {
      // Delay mínimo para evitar timing attacks evidentes
      await new Promise((r) => setTimeout(r, 200));
      return new Response(
        JSON.stringify({ error: 'Contraseña incorrecta.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const sessionId = await createAdminSession();

    cookies.set(ADMIN_SESSION_COOKIE, sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: COOKIE_MAX_AGE,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error en login admin:', error instanceof Error ? error.message : 'desconocido');
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
