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
          'Cálculo y Declaración Mensual F.29.',
          'Libros y Estadísticas Mensuales de Compra y Venta Nacionales.',
          'Asesoría Personalizada de un Profesional vía Email o WhatsApp.',
          'Recordatorio de Fechas Clave como Impuestos Mensuales, Imposiciones, Pago de Patentes y Otros.',
          'Declaración de Renta Anual tiene un Valor Adicional de 3 UF y es facturado en marzo. Incluye Balance, Declaraciones Juradas y F.22 de la Empresa o Persona Natural.'
        ],
        highlighted: false,
        order: 1,
      },
      {
        name: 'Plan Despegue Pyme',
        price: '1.0 UF/mes',
        description: 'Cobertura mensual básica para mantener al día los impuestos mensuales de tu negocio.',
        features: [
          'Cálculo y Declaración Mensual F.29.',
          'Libros y Estadísticas Mensuales de Compra y Venta Nacionales.',
          'Asesoría Personalizada de un Profesional vía Reunión Google.Meet 60 minutos, Email o WhatsApp.',
          'Recordatorio de Fechas Clave como Impuestos Mensuales, Pago de Patentes y Otros.',
          'Declaración de Renta Anual tiene un Valor Adicional de 3 UF y es facturado en marzo. Incluye Balance, Declaraciones Juradas y F.22 de la Empresa o Persona Natural.'
        ],
        highlighted: false,
        order: 2,
      },
      {
        name: 'Plan Impulso Multiactivo',
        price: '1.5 UF/mes',
        description: 'Diseñado para emprendimientos multirubro y giros dinámicos con facturación moderada.',
        features: [
          'Cálculo y Declaración Mensual F.29.',
          'Libros y Estadísticas Mensuales de Compra y Venta Nacionales e INTERNACIONALES.',
          'Asesoría Personalizada de un Profesional vía telefónica, Email o WhatsApp.',
          'Recordatorio de Fechas Clave como Impuestos Mensuales, Pago de Patentes y Otros.',
          'Declaración de Renta Anual tiene un Valor Adicional de 3 UF y es facturado en marzo. Incluye Balance, Declaraciones Juradas y F.22 de la Empresa o Persona Natural.'
        ],
        highlighted: false,
        order: 3,
      },
      {
        name: 'Plan Pyme Pro',
        price: '2.0 UF/mes',
        description: 'Gestión contable y tributaria completa para empresas en consolidación y crecimiento.',
        features: [
          'Cálculo y Declaración Mensual F.29.',
          'Libros y Estadísticas Mensuales de Compra y Venta Nacional.',
          'Asesoría Personalizada de un Profesional vía Email o WhatsApp.',
          'Recordatorio de Fechas Clave como Impuestos Mensuales, Imposiciones, Pago de Patentes y Otros.',
          'Gestión de Remuneraciones con tope de 3 Trabajadores incluyendo:',
          '• Confección de Contrato de Trabajo.',
          '• Cálculo y Carga de Leyes Sociales.',
          '• Liquidaciones de Sueldo Mensuales.',
          '• Cálculo de Vacaciones y Confección de Comprobantes.',
          '• Cálculo y Confección de Finiquito.',
          'Declaración de Renta Anual tiene un valor adicional de 6 UF facturado en marzo. Incluye Balance, Declaraciones Juradas y F.22 de la Empresa o Persona Natural y los Socios.'
        ],
        highlighted: true,
        order: 4,
      },
      {
        name: 'Plan Expansión Global',
        price: '2.5 UF/mes',
        description: 'Soporte especializado para Pymes con comercio exterior o transacciones en el extranjero.',
        features: [
          'Cálculo y Declaración Mensual F.29.',
          'Libros y Estadísticas Mensuales de Compra y Venta Nacional e INTERNACIONAL.',
          'Asesoría Personalizada de un Profesional vía Email o WhatsApp.',
          'Recordatorio de Fechas Clave como Impuestos Mensuales, Imposiciones, Pago de Patentes y Otros.',
          'Gestión de Remuneraciones con tope de 3 Trabajadores incluyendo:',
          '• Confección de Contrato de Trabajo.',
          '• Cálculo y Carga de Leyes Sociales.',
          '• Liquidaciones de Sueldo Mensuales.',
          '• Cálculo de Vacaciones y Confección de Comprobantes.',
          '• Cálculo y Confección de Finiquito.',
          'Declaración de Renta Anual tiene un valor adicional de 6 UF facturado en marzo. Incluye Balance, Declaraciones Juradas y F.22 de la Empresa o Persona Natural y los Socios.'
        ],
        highlighted: false,
        order: 5,
      },
      {
        name: 'Plan Corporativo',
        price: '4.0 UF/mes',
        description: 'Control riguroso y contabilidad de doble entrada para empresas medianas.',
        features: [
          'Cálculo y Declaración Mensual F.29.',
          'Libros y Estadísticas Mensuales de Compra y Venta Nacional.',
          'Asesoría Personalizada de un Profesional vía Email o WhatsApp.',
          'Recordatorio de Fechas Clave como Impuestos Mensuales, Imposiciones, Pago de Patentes y Otros.',
          'Gestión de Remuneraciones con tope de 10 Trabajadores incluyendo:',
          '• Confección de Contrato de Trabajo.',
          '• Cálculo y Carga de Leyes Sociales.',
          '• Liquidaciones de Sueldo Mensuales.',
          '• Cálculo de Vacaciones y Confección de Comprobantes.',
          '• Cálculo y Confección de Finiquito.',
          'Declaración de Renta Anual tiene un valor adicional de 12 UF facturado en marzo. Incluye Balance, Declaraciones Juradas y F.22 de la Empresa o Persona Natural y los Socios.'
        ],
        highlighted: false,
        order: 6,
      },
      {
        name: 'Plan Corporativo Pro',
        price: '6.0 UF/mes',
        description: 'Informes avanzados y control de gestión estratégica mensual para alta gerencia.',
        features: [
          'Cálculo y Declaración Mensual F.29.',
          'Libros y Estadísticas Mensuales de Compra y Venta Nacional.',
          'Asesoría Personalizada de un Profesional vía Email o WhatsApp.',
          'Recordatorio de Fechas Clave como Impuestos Mensuales, Imposiciones, Pago de Patentes y Otros.',
          'Gestión de Remuneraciones con tope de 15 Trabajadores incluyendo:',
          '• Confección de Contrato de Trabajo.',
          '• Cálculo y Carga de Leyes Sociales.',
          '• Liquidaciones de Sueldo Mensuales.',
          '• Cálculo de Vacaciones y Confección de Comprobantes.',
          '• Cálculo y Confección de Finiquito.',
          'Declaración de Renta Anual tiene un valor adicional de 18 UF facturado en marzo. Incluye Balance, Declaraciones Juradas y F.22 de la Empresa o Persona Natural y los Socios.'
        ],
        highlighted: false,
        order: 7,
      },
      {
        name: 'Plan Asesoría Élite',
        price: '8.0 UF/mes',
        description: 'Servicio integral máximo. Contabilidad, Finanzas, RRHH y Tributación sin límites.',
        features: [
          'Cálculo y Declaración Mensual F.29.',
          'Libros y Estadísticas Mensuales de Compra y Venta Nacional.',
          'Asesoría Personalizada de un Profesional vía Email o WhatsApp.',
          'Recordatorio de Fechas Clave como Impuestos Mensuales, Imposiciones, Pago de Patentes y Otros.',
          'Gestión de Remuneraciones con tope de 20 Trabajadores incluyendo:',
          '• Confección de Contrato de Trabajo.',
          '• Cálculo y Carga de Leyes Sociales.',
          '• Liquidaciones de Sueldo Mensuales.',
          '• Cálculo de Vacaciones y Confección de Comprobantes.',
          '• Cálculo y Confección de Finiquito.',
          'Declaración de Renta Anual tiene un valor adicional de 24 UF facturado en marzo. Incluye Balance, Declaraciones Juradas y F.22 de la Empresa o Persona Natural y los Socios.'
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
        name: 'Creación Rápida de Empresa',
        description: '(no incluye gastos asociados)\n\nEmpresa en un día + inicio de actividades + Puesta en marcha facturación y boleta electrónica sistema gratuito SII',
        icon: 'rocket',
        features: [
          'Constitución de sociedad en portal empresa en un día.',
          'Inicio de actividades en portal del sii.cl',
          'Obtención y anclaje certificado digital.',
          'Verificación de actividades.',
          'Asesoría para la obtención de apertura cuenta bancaria',
          'Asesoría para obtención patente comercial.'
        ],
        price: '$180.000',
        order: 1,
      },
      {
        name: 'Estructuración y Modificación Societaria',
        description: '',
        icon: 'users',
        features: [
          'Asesoría legal empresarial',
          'Redacción de estatutos libro de accionista, acuerdos, modificaciones de empresa Empresario individual de responsabilidad limitada (E.I.R.L) o sociedad por accionistas (S.P.A) o Sociedad de Responsabilidad Limitada (LTDA).',
          'Compra y Venta de acciones de SPA',
          'Compra Venta de empresa sociedad de responsabilidad limitada.'
        ],
        price: 'Valor sujeto a evaluación',
        order: 2,
      },
      {
        name: 'Término de Giro y Cierre de Actividades',
        description: '',
        icon: 'folder',
        features: [
          'Preparación y Representación ante el SII en caso de notificaciones (F-29 o F-22)',
          'Preparación de declaraciones previas',
          'Confección de balances de registros de caja.',
          'Confección F.2121.'
        ],
        price: 'Valor sujeto a evaluación',
        order: 3,
      },
      {
        name: 'Representación Laboral y Fiscalización',
        description: 'PRESENTACIÓN INSPECCIÓN DEL TRABAJO',
        icon: 'briefcase',
        features: [
          'Preparación y asesoría pre,durante y post a solicitud.',
          'Presentación en la Inspección de trabajo',
          'Preparación de nómina.',
          'Cálculo y revisión de finiquito.',
          'Confección de simulados de negociación.'
        ],
        price: 'Valor sujeto a evaluación',
        order: 4,
      },
      {
        name: 'Asesoría en Fondos Concursables',
        description: 'PRESUPUESTO GRATIS',
        icon: 'trending-up',
        features: [
          'Asesoría en la postulación de los concursos Sercotec (Capital abeja, capital semilla, entre otros). Y en caso de ganarlos nos hacemos cargo de la rendición mediante cobro.'
        ],
        price: 'Valor sujeto a evaluación',
        order: 5,
      },
      {
        name: 'Evaluación y Análisis Financiero',
        description: '',
        icon: 'bar-chart',
        features: [],
        price: 'Valor sujeto a evaluación',
        order: 6,
      },
      {
        name: 'Reportes de Estado Financiero',
        description: '',
        icon: 'file-text',
        features: [
          'Creación y análisis de un estado financiero.',
          'Obtención de documentación contable',
          'Revisión de cuentas de saldos',
          'Provisión de impuestos y análisis de resultados'
        ],
        price: 'Valor sujeto a evaluación',
        order: 7,
      },
      {
        name: 'Regularización y Defensa Tributaria',
        description: '',
        icon: 'shield-check',
        features: [
          'Presupuesto o asesoría gratuita en la primera consulta.',
          'Creación y normalización de F-29, F-22, Declaraciones Juradas, entre otras, ante el SII.',
          'Representación en citaciones ante el Servicio de Impuestos Internos.'
        ],
        price: 'Valor sujeto a evaluación',
        order: 8,
      },
      {
        name: 'Gestión de Patentes Municipales',
        description: '(no incluye gastos asociados)',
        icon: 'clipboard',
        features: [
          'Tramitación de patentes mediante portales web.',
          'Tramitación de carpeta y presentación.',
          'No incluye gastos ni el pago de patente.'
        ],
        price: 'Valor sujeto a evaluación',
        order: 9,
      },
      {
        name: 'Plan Identidad Visual para Pymes',
        description: 'Obtendrás la creación de 1 Logo, 3 íconos para las historias destacadas de Instagram, 3 reels creados con su emprendimiento en formato JPG y PNG. Incluye:',
        icon: 'star',
        features: [
          'Se organizará una reunión previa a la creación del contenido, para obtener información y personalidad con respecto a su emprendimiento.',
          'Los diseños del logotipo tienen un límite de dos cambios. En esta instancia, partiendo el cliente, si el diseñador le da dos anteproyectos o 2 propuestas de logo. El cliente escogerá una propuesta.',
          'Los 3 íconos y las 3 publicaciones se definirán en la primera reunión (en caso de solicitar más de éstos, estos tendrán un valor adicional).'
        ],
        price: 'Valor sujeto a evaluación',
        order: 10,
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
