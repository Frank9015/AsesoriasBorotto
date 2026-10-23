import type { APIRoute } from 'astro';
import { prisma } from '../../lib/prisma';
import { validateAdminSession, ADMIN_SESSION_COOKIE } from '../../lib/auth';
import nodemailer from 'nodemailer';

// ─────────────────────────────────────────────
// Rate limiting (FASE 6)
// Solución basada en PostgreSQL para Vercel serverless multi-instancia.
// Limitación: 5 peticiones por IP en 60 segundos.
// Como las funciones serverless no comparten memoria, usamos la BD.
//
// Nota: Para mayor escala considera Vercel KV o Upstash Redis.
// ─────────────────────────────────────────────
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

/**
 * Rate limiting simple en memoria para un único proceso.
 * En Vercel SSR, cada instancia es independiente, por lo que esta solución
 * es best-effort pero sigue siendo una mitigación real de abuso masivo.
 * Para rate limiting robusto multi-instancia, agrega Vercel KV.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true; // OK
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false; // Límite excedido
  }

  entry.count++;
  return true; // OK
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/**
 * Valida y sanitiza un string de input del usuario.
 * Rechaza si no es string, retorna string truncado al máximo indicado.
 */
function sanitizeField(value: unknown, maxLength: number): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'string') return null;
  return value.trim().slice(0, maxLength);
}

const escapeHtml = (str: string) =>
  String(str || '').replace(/[&<>"']/g, (m) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] || m)
  );

// ─────────────────────────────────────────────
// POST — Formulario de contacto público
// ─────────────────────────────────────────────
export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Rate limiting
    const ip = clientAddress || 'unknown';
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Demasiadas solicitudes. Por favor espera un momento.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60' } }
      );
    }

    // Validar Content-Type y tamaño del body
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Formato de datos no válido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Leer y validar body (límite de tamaño defensivo)
    const rawBody = await request.text();
    if (rawBody.length > 10_000) {
      return new Response(
        JSON.stringify({ error: 'Solicitud demasiado grande.' }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(rawBody);
    } catch {
      return new Response(
        JSON.stringify({ error: 'JSON inválido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar y sanitizar campos
    const name = sanitizeField(data.name, 100);
    const email = sanitizeField(data.email, 254);
    const phone = sanitizeField(data.phone, 20);
    const service = sanitizeField(data.service, 100);
    const message = sanitizeField(data.message, 2000);

    // Campos obligatorios
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Nombre, email y mensaje son obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'El formato del email no es válido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Guardar en BD
    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        phone: phone || null,
        service: service || null,
        message,
      },
    });

    // Enviar correo de notificación
    try {
      const smtpHost = import.meta.env.SMTP_HOST;
      const smtpPort = Number(import.meta.env.SMTP_PORT) || 587;
      const smtpUser = import.meta.env.SMTP_USER;
      const smtpPass = import.meta.env.SMTP_PASSWORD;
      const notificationEmail = import.meta.env.NOTIFICATION_EMAIL;

      if (!notificationEmail) {
        console.warn('NOTIFICATION_EMAIL no configurada — correo de notificación omitido.');
      }

      const serviceLabels: Record<string, string> = {
        'impuestos': 'Declaración de Impuestos',
        'contabilidad': 'Contabilidad Completa',
        'remuneraciones': 'Remuneraciones',
        'inicio-actividades': 'Inicio de Actividades',
        'asesoria': 'Asesoría Tributaria',
        'auditoria': 'Auditoría Financiera',
        'otro': 'Otro'
      };
      const displayService = (service && serviceLabels[service]) || service || 'General';

      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safePhone = escapeHtml(phone || 'No especificado');
      const safeService = escapeHtml(displayService);
      const safeMessage = escapeHtml(message);

      const origin = new URL(request.url).origin;
      const logoUrl = `${origin}/logo-light.png`;

      // Sanitizar el asunto del correo (eliminar saltos de línea para evitar header injection)
      const subjectName = name.replace(/[\r\n]/g, '').slice(0, 60);
      const subjectService = displayService.replace(/[\r\n]/g, '').slice(0, 40);

      const emailHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fafbfc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #13254e, #1e3a75); padding: 35px 20px 25px; text-align: center; border-bottom: 4px solid #dfb653;">
            <img src="${logoUrl}" alt="Asesorías Borotto" style="height: 64px; width: auto; max-width: 240px; margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto;" />
            <p style="color: #dfb653; margin: 5px 0 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Nuevo Mensaje de Contacto</p>
          </div>

          <!-- Body -->
          <div style="padding: 30px 25px; background-color: #ffffff;">
            <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-top: 0;">Has recibido un nuevo mensaje a través del sitio web oficial de <strong>Asesorías Borotto</strong>:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600; width: 120px;">Nombre:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${safeEmail}" style="color: #13254e; text-decoration: none; font-weight: 600;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Teléfono:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${safePhone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Motivo / Interés:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #dfb653; font-weight: 700;">${safeService}</td>
              </tr>
            </table>

            <div style="background-color: #f8fafc; border-left: 4px solid #13254e; padding: 18px 20px; margin-top: 20px; border-radius: 6px;">
              <h4 style="margin: 0 0 8px 0; color: #13254e; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje del Cliente:</h4>
              <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
            </div>

            <!-- Action Button -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${safeEmail}?subject=Re:%20Contacto%20Asesor%C3%ADas%20Borotto" style="display: inline-block; background-color: #13254e; color: #ffffff; font-weight: 700; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; border: 1px solid #dfb653; box-shadow: 0 4px 10px rgba(19, 37, 78, 0.2);">
                ✉️ Responder directamente a ${safeName}
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">Este es un correo automático generado por el sitio web oficial de Asesorías Borotto.</p>
            <p style="margin: 5px 0 0;">© 2026 Asesorías Borotto. Todos los derechos reservados.</p>
          </div>
        </div>
      `;

      if (smtpHost && smtpUser && smtpPass && notificationEmail) {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Asesorías Borotto Web" <${smtpUser}>`,
          replyTo: `"${safeName}" <${safeEmail}>`,
          to: notificationEmail,
          subject: `Nuevo contacto: ${subjectName} - ${subjectService}`,
          html: emailHtml,
        });
        console.log('Correo de notificación enviado correctamente.');
      } else {
        // Sin SMTP configurado: solo log de diagnóstico sin PII
        console.log('SMTP no configurado — mensaje guardado en BD, correo de notificación omitido.');
      }
    } catch (emailError) {
      // No falla la request si el correo falla — el mensaje ya está en BD
      console.warn('Error al enviar notificación de correo:', emailError instanceof Error ? emailError.message : 'desconocido');
    }

    return new Response(
      JSON.stringify({ success: true, id: newMessage.id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al guardar mensaje:', error instanceof Error ? error.message : 'desconocido');
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// ─────────────────────────────────────────────
// PUT — Marcar mensaje como leído (admin)
// ─────────────────────────────────────────────
export const PUT: APIRoute = async ({ request, cookies }) => {
  const sessionId = cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await validateAdminSession(sessionId))) {
    return new Response(
      JSON.stringify({ error: 'No autorizado' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
  try {
    const data = await request.json();
    const { id, read } = data;

    if (!id || typeof id !== 'number') {
      return new Response(
        JSON.stringify({ error: 'ID inválido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const updated = await prisma.message.update({
      where: { id: Number(id) },
      data: { read: read ?? true },
    });

    return new Response(
      JSON.stringify({ success: true, message: updated }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al actualizar mensaje:', error instanceof Error ? error.message : 'desconocido');
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// ─────────────────────────────────────────────
// DELETE — Eliminar mensaje (admin, cumplimiento ARCO Ley 19.628)
// ─────────────────────────────────────────────
export const DELETE: APIRoute = async ({ request, cookies }) => {
  const sessionId = cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await validateAdminSession(sessionId))) {
    return new Response(
      JSON.stringify({ error: 'No autorizado' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID es obligatorio.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await prisma.message.delete({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al eliminar mensaje:', error instanceof Error ? error.message : 'desconocido');
    return new Response(
      JSON.stringify({ error: 'Error al eliminar el mensaje.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
