import type { APIRoute } from 'astro';
import { prisma } from '../../lib/prisma';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, service, message } = data;

    // Validación básica
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

    // Enviar correo de notificación (Base de diseño y preparación Fase 2)
    try {
      const smtpHost = import.meta.env.SMTP_HOST;
      const smtpPort = Number(import.meta.env.SMTP_PORT) || 587;
      const smtpUser = import.meta.env.SMTP_USER;
      const smtpPass = import.meta.env.SMTP_PASSWORD;
      const notificationEmail = import.meta.env.NOTIFICATION_EMAIL || 'contacto@asesoriasborotto.cl';

      const serviceLabels: Record<string, string> = {
        'impuestos': 'Declaración de Impuestos',
        'contabilidad': 'Contabilidad Completa',
        'remuneraciones': 'Remuneraciones',
        'inicio-actividades': 'Inicio de Actividades',
        'asesoria': 'Asesoría Tributaria',
        'auditoria': 'Auditoría Financiera',
        'otro': 'Otro'
      };
      const displayService = serviceLabels[service || ''] || service || 'General';
      const escapeHtml = (str: string) => String(str || '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] || m));

      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safePhone = escapeHtml(phone || 'No especificado');
      const safeService = escapeHtml(displayService);
      const safeMessage = escapeHtml(message);

      const origin = new URL(request.url).origin;
      const logoUrl = `${origin}/logo-light.png`;

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

      if (smtpHost && smtpUser && smtpPass) {
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
          subject: `Nuevo contacto: ${name} - ${displayService}`,
          html: emailHtml,
        });
        console.log('📬 Correo de notificación enviado correctamente.');
      } else {
        console.log('📝 SMTP no configurado. Log de notificación por correo (Fase 1.5):');
        console.log(`Para: ${notificationEmail}`);
        console.log(`Asunto: Nuevo contacto: ${name}`);
        console.log('Contenido HTML generado:\n', emailHtml);
      }
    } catch (emailError) {
      console.warn('⚠️ Error al enviar notificación de correo (se asume SMTP inactivo en local):', emailError);
    }

    return new Response(
      JSON.stringify({ success: true, id: newMessage.id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al guardar mensaje:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const password = authHeader.replace('Bearer ', '');
  return password === (import.meta.env.ADMIN_PASSWORD || 'admin123');
}

export const PUT: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) {
    return new Response(
      JSON.stringify({ error: 'No autorizado' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
  try {
    const data = await request.json();
    const { id, read } = data;

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID es obligatorio.' }),
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
    console.error('Error al actualizar mensaje:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) {
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
    console.error('Error al eliminar mensaje:', error);
    return new Response(
      JSON.stringify({ error: 'Error al eliminar el mensaje.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
