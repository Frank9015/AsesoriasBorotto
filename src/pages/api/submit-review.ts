import type { APIRoute } from 'astro';
import { prisma } from '../../lib/prisma';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { token, name, company, role, text, rating } = data;

    if (!token || !name || !text || !rating) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos obligatorios o el token.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1. Validar el token
    const reviewToken = await prisma.reviewToken.findUnique({
      where: { id: token }
    });

    if (!reviewToken) {
      return new Response(
        JSON.stringify({ error: 'El link de reseña es inválido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (reviewToken.used) {
      return new Response(
        JSON.stringify({ error: 'Este link de reseña ya ha sido utilizado.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Guardar el testimonio
    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        company: company || null,
        role: role || null,
        text,
        rating: Number(rating),
        visible: true // Según solicitud del cliente
      }
    });

    // 3. Marcar token como usado
    await prisma.reviewToken.update({
      where: { id: token },
      data: { used: true }
    });

    return new Response(
      JSON.stringify({ success: true, id: newTestimonial.id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al guardar reseña:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
