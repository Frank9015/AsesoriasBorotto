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

      const emailHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fafbfc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #13254e, #1e3a75); padding: 30px 20px; text-align: center; border-bottom: 3px solid #dfb653;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">Asesorías Borotto</h1>
            <p style="color: #dfb653; margin: 5px 0 0; font-size: 14px; font-weight: 600; text-transform: uppercase;">Nuevo Mensaje de Contacto</p>
          </div>
          <!-- Body -->
          <div style="padding: 30px 25px; background-color: #ffffff;">
            <p style="color: #334155; font-size: 16px; line-height: 1.5; margin-top: 0;">Has recibido una nueva consulta a través del formulario de contacto del sitio web.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600; width: 120px;">Nombre:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;"><a href="mailto:${email}" style="color: #13254e; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">Teléfono:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${phone || 'No especificado'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 600;">Servicio:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #dfb653; font-weight: bold;">${displayService}</td>
              </tr>
            </table>

            <div style="background-color: #f8fafc; border-left: 4px solid #13254e; padding: 15px 20px; margin-top: 20px; border-radius: 4px;">
              <h4 style="margin: 0 0 8px 0; color: #13254e; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje:</h4>
              <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
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
          from: `"Contacto Web" <${smtpUser}>`,
          to: notificationEmail,
          subject: `Nuevo contacto: ${name} - ${service || 'General'}`,
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

export const PUT: APIRoute = async ({ request }) => {
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
      where: { id },
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
