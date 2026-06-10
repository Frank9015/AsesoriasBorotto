import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Limpiar datos existentes
  await prisma.message.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.service.deleteMany();
  await prisma.plan.deleteMany();

  // --- PLANES ---
  await prisma.plan.createMany({
    data: [
      {
        name: 'Plan Emprendedor',
        price: '0.7 UF/mes',
        description: 'Ideal para independientes, honorarios o microempresas sin movimiento complejo que recién comienzan.',
        features: [
          'Declaración mensual F-29 (sin movimiento)',
          'Recordatorio de fechas clave y vencimientos',
          'Emisión básica de boletas de honorarios',
          'Soporte estándar vía correo electrónico',
        ],
        highlighted: false,
        order: 1,
      },
      {
        name: 'Plan Despegue Pyme',
        price: '1.0 UF/mes',
        description: 'Cobertura mensual básica para mantener al día los impuestos mensuales de tu negocio.',
        features: [
          'Declaración mensual F-29 completa',
          'Registro mensual de compras y ventas',
          'Centralización de boletas de ventas',
          'Soporte por WhatsApp y Correo',
        ],
        highlighted: false,
        order: 2,
      },
      {
        name: 'Plan Impulso Multiactivo',
        price: '1.5 UF/mes',
        description: 'Diseñado para emprendimientos multirubro y giros dinámicos con facturación moderada.',
        features: [
          'Todo lo del Plan Despegue Pyme',
          'Gestión de hasta 2 actividades comerciales',
          'Conciliación de ventas con Transbank/proveedores',
          'Asesoría mensual online (30 minutos)',
        ],
        highlighted: false,
        order: 3,
      },
      {
        name: 'Plan Pyme Pro',
        price: '2.0 UF/mes',
        description: 'Gestión contable y tributaria completa para empresas en consolidación y crecimiento.',
        features: [
          'Todo lo del Plan Impulso Multiactivo',
          'Contabilidad simplificada completa',
          'Liquidaciones de sueldo (hasta 3 trabajadores)',
          'Preparación de Declaración de Renta anual F-22',
          'Reunión de asesoría mensual de 1 hora',
        ],
        highlighted: true,
        order: 4,
      },
      {
        name: 'Plan Expansión Global',
        price: '2.5 UF/mes',
        description: 'Soporte especializado para Pymes con comercio exterior o transacciones en el extranjero.',
        features: [
          'Todo lo del Plan Pyme Pro',
          'Contabilidad multimoneda (USD/CLP)',
          'Gestión de retenciones de impuestos extranjeros',
          'Control y declaración de importaciones/exportaciones',
        ],
        highlighted: false,
        order: 5,
      },
      {
        name: 'Plan Corporativo',
        price: '4.0 UF/mes',
        description: 'Control riguroso y contabilidad de doble entrada para empresas medianas.',
        features: [
          'Contabilidad completa partida doble',
          'Liquidaciones de sueldo (hasta 10 trabajadores)',
          'Declaración de Renta anual (F-22) y declaraciones juradas',
          'Balances semestrales y estados financieros',
          'Planificación tributaria anual',
        ],
        highlighted: false,
        order: 6,
      },
      {
        name: 'Plan Corporativo Pro',
        price: '6.0 UF/mes',
        description: 'Informes avanzados y control de gestión estratégica mensual para alta gerencia.',
        features: [
          'Todo lo del Plan Corporativo',
          'Liquidaciones de sueldo (hasta 20 trabajadores)',
          'Conciliación bancaria avanzada y flujos de caja mensuales',
          'Reportería financiera a medida',
          'Asesoría tributaria y financiera prioritaria',
        ],
        highlighted: false,
        order: 7,
      },
      {
        name: 'Plan Asesoría Élite',
        price: '8.0 UF/mes',
        description: 'Servicio integral máximo. Contabilidad, Finanzas, RRHH y Tributación sin límites.',
        features: [
          'Gestión integral total y prioritaria',
          'Liquidaciones de sueldo y personal ilimitado',
          'Auditoría continua de registros y control de gestión',
          'Representación directa y defensa ante fiscalizaciones del SII',
          'Reunión semanal de análisis y control financiero',
        ],
        highlighted: false,
        order: 8,
      },
    ],
  });

  // --- SERVICIOS ---
  await prisma.service.createMany({
    data: [
      {
        name: 'Declaración de Impuestos',
        description: 'Confección y presentación de declaraciones mensuales (F-29) y anuales (F-22) ante el SII.',
        icon: 'file-text',
        price: 'Desde 1.0 UF',
        order: 1,
      },
      {
        name: 'Contabilidad Completa',
        description: 'Registro contable integral de tu negocio. Libros, balances y estados financieros al día.',
        icon: 'calculator',
        price: 'Desde 2.0 UF',
        order: 2,
      },
      {
        name: 'Remuneraciones',
        description: 'Liquidaciones de sueldo, cotizaciones previsionales y todo lo relacionado con tu equipo de trabajo.',
        icon: 'users',
        price: 'Desde 0.2 UF/trab.',
        order: 3,
      },
      {
        name: 'Inicio de Actividades',
        description: 'Te acompañamos en el proceso de formalización ante el SII. Inicio de actividades, obtención de RUT y más.',
        icon: 'rocket',
        price: 'Desde 1.5 UF',
        order: 4,
      },
      {
        name: 'Asesoría Tributaria',
        description: 'Orientación experta para optimizar tu carga tributaria y tomar decisiones informadas.',
        icon: 'shield-check',
        price: 'Desde 1.5 UF/hora',
        order: 5,
      },
      {
        name: 'Auditoría Financiera',
        description: 'Revisión exhaustiva de tus registros contables para garantizar transparencia y cumplimiento.',
        icon: 'search',
        price: 'Cotizar',
        order: 6,
      },
    ],
  });

  // --- TESTIMONIOS ---
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'María González',
        company: 'Panadería Don Trigo',
        role: 'Dueña',
        text: 'Desde que trabajo con ella, mis impuestos están siempre al día. Me explica todo con paciencia y me siento tranquila con mis finanzas.',
        rating: 5,
        visible: true,
      },
      {
        name: 'Carlos Muñoz',
        company: 'CM Diseño Web',
        role: 'Freelancer',
        text: 'Excelente servicio. Me ayudó con el inicio de actividades y ahora lleva mi contabilidad completa. Muy profesional y cercana.',
        rating: 5,
        visible: true,
      },
      {
        name: 'Ana Sepúlveda',
        company: 'Tienda Verde Limón',
        role: 'Emprendedora',
        text: 'Lo que más valoro es la comunicación. Siempre disponible para resolver mis dudas, y los informes son claros y puntuales.',
        rating: 5,
        visible: true,
      },
    ],
  });

  console.log('✅ Seed completado!');
  console.log('   - 3 planes creados');
  console.log('   - 6 servicios creados');
  console.log('   - 3 testimonios creados');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
