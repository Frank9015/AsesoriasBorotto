import { prisma } from './prisma';

/** Duración de sesión: 8 horas en milisegundos */
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

/** Nombre de la cookie de sesión administrativa */
export const ADMIN_SESSION_COOKIE = 'admin_session';

/**
 * Devuelve la contraseña del admin desde las variables de entorno.
 * Si no está configurada, lanza un error para evitar fallbacks inseguros.
 */
function getAdminPassword(): string {
  const pw = import.meta.env.ADMIN_PASSWORD;
  if (!pw || pw.trim() === '') {
    throw new Error('ADMIN_PASSWORD no está configurada en las variables de entorno.');
  }
  return pw;
}

/**
 * Verifica si la contraseña proporcionada es correcta.
 * @returns true si es correcta, false si no.
 */
export function verifyAdminPassword(candidate: string): boolean {
  try {
    const pw = getAdminPassword();
    return candidate === pw;
  } catch {
    return false;
  }
}

/**
 * Crea una nueva sesión administrativa en la base de datos.
 * @returns el ID de sesión generado (UUID criptográficamente seguro).
 */
export async function createAdminSession(): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await prisma.adminSession.create({
    data: { expiresAt },
  });
  return session.id;
}

/**
 * Valida un ID de sesión: lo busca en BD y verifica que no haya expirado.
 * @returns true si la sesión es válida y activa.
 */
export async function validateAdminSession(sessionId: string | undefined): Promise<boolean> {
  if (!sessionId || sessionId.trim() === '') return false;
  try {
    const session = await prisma.adminSession.findUnique({
      where: { id: sessionId },
    });
    if (!session) return false;
    if (session.expiresAt < new Date()) {
      // Sesión expirada — limpiar en BD de forma asíncrona
      void prisma.adminSession.delete({ where: { id: sessionId } }).catch(() => {});
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Elimina una sesión de la base de datos (logout).
 */
export async function deleteAdminSession(sessionId: string): Promise<void> {
  try {
    await prisma.adminSession.delete({ where: { id: sessionId } });
  } catch {
    // Si ya no existe, no es un error crítico
  }
}

/**
 * Limpia sesiones expiradas (mantenimiento opcional).
 */
export async function purgeExpiredSessions(): Promise<void> {
  try {
    await prisma.adminSession.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  } catch {
    // silencioso
  }
}
