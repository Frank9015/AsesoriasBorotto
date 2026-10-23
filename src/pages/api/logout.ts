import type { APIRoute } from 'astro';
import { deleteAdminSession, ADMIN_SESSION_COOKIE } from '../../lib/auth';

export const POST: APIRoute = async ({ cookies }) => {
  const sessionId = cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (sessionId) {
    await deleteAdminSession(sessionId);
  }

  // Eliminar la cookie estableciendo expiración en el pasado
  cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
