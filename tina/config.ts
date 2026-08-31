import { defineConfig } from 'tinacms'

/* ────────────────────────────────────────────────────────────────────────────
   TinaCMS — panel de edición visual en /admin

   Cada "colección" de abajo es una sección editable de la web. El cliente
   entra a /admin, cambia los textos/imágenes y al pulsar "Save" TinaCMS crea
   un commit en GitHub → Vercel redespliega solo.

   Lo que NO aparece aquí (colores, tipografías, espaciados, animaciones) es
   fijo: vive en el código y no se puede tocar desde el panel.

   `branch`, `clientId` y `token` vienen de variables de entorno:
     NEXT_PUBLIC_TINA_BRANCH, NEXT_PUBLIC_TINA_CLIENT_ID, TINA_TOKEN
   ──────────────────────────────────────────────────────────────────────────── */

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  'main'

/** Bloque reutilizable: los ajustes de un titular con palabra resaltada. */
const highlightField = {
  type: 'string' as const,
  name: 'headingHighlight',
  label: 'Palabra destacada del titular',
  description:
    'Escribe una palabra que esté EXACTAMENTE dentro del titular. Esa palabra se pinta en dorado claro. Déjalo vacío si ninguna palabra debe resaltar.',
}

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images/uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      /* ══════════════════ AJUSTES GENERALES ══════════════════ */
      {
        name: 'settings',
        label: 'Ajustes generales',
        path: 'content/settings',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'string',
            name: 'brandName',
            label: 'Nombre de la marca',
            description:
              'Se usa como texto alternativo del logo (accesibilidad y SEO). No se muestra como texto visible.',
            required: true,
          },
          {
            type: 'image',
            name: 'logo',
            label: 'Logo',
            description:
              'Aparece en la cabecera, en el menú y en la sección de contacto de todas las páginas. Usa un PNG con fondo transparente.',
            required: true,
          },
          {
            type: 'string',
            name: 'phoneDisplay',
            label: 'Teléfono (como se muestra)',
            description:
              'Se muestra tal cual en la lista de contacto. Ejemplo: +593 96 260 6760',
            required: true,
          },
          {
            type: 'string',
            name: 'email',
            label: 'Correo de contacto',
            description: 'Se muestra en la lista de contacto de cada formulario.',
            required: true,
          },
          {
            type: 'string',
            name: 'addressLine',
            label: 'Ciudad / dirección',
            description: 'Texto corto en la lista de contacto. Ejemplo: Quito - Ecuador',
            required: true,
          },
          {
            type: 'string',
            name: 'mapLink',
            label: 'Enlace a Google Maps',
            description: 'A dónde lleva el botón "Ver en el Mapa".',
            required: true,
          },
          {
            type: 'string',
            name: 'whatsappNumber',
            label: 'Número de WhatsApp (solo dígitos, con código de país)',
            description:
              'A este número se envían los formularios de "cotizar proyecto". Solo números, sin espacios ni signos. Ejemplo: 593998381419',
            required: true,
          },
          {
            type: 'string',
            name: 'whatsappShortLink',
            label: 'Enlace directo de WhatsApp',
            description:
              'Se usa en el botón flotante verde, en el menú y en el asistente de chat. Puede ser un enlace corto (w.app/...) o wa.me/...',
            required: true,
          },
          {
            type: 'string',
            name: 'footerCopyright',
            label: 'Texto del pie de página',
            description: 'Frase centrada bajo los enlaces del pie, en todas las páginas.',
            required: true,
          },
          {
            type: 'boolean',
            name: 'chatEnabled',
            label: '¿Mostrar el asistente de chat?',
            description:
              'Si lo apagas, el botón flotante solo abre WhatsApp — sin el bot "Artly" ni sus opciones rápidas.',
          },
          {
            type: 'string',
            name: 'chatWebhookUrl',
            label: 'Webhook del asistente (n8n)',
            description:
              'A dónde se envían los mensajes que escribe el visitante en el chat. Solo lo cambia quien administra el flujo de automatización de n8n.',
          },
          {
            type: 'image',
            name: 'chatBotAvatar',
            label: 'Foto del asistente',
            description: 'La imagen redonda del bot "Artly" en la ventana de chat.',
          },
          {
            type: 'object',
            name: 'chatQuickReplies',
            label: 'Respuestas rápidas del chat',
            description:
              'Los botones que ve el visitante antes de escribir. El "Texto del botón" es lo que se ve; la "Pregunta" es lo que realmente se envía al asistente.',
            list: true,
            ui: { itemProps: (i) => ({ label: i?.label || 'Respuesta rápida' }) },
            fields: [
              { type: 'string', name: 'label', label: 'Texto del botón', required: true },
              { type: 'string', name: 'question', label: 'Pregunta que envía', required: true },
            ],
          },
          {
            type: 'boolean',
            name: 'carouselAutoplay',
            label: '¿Avanzar solo el carrusel de proyectos de la portada?',
            description: 'Si lo apagas, el visitante avanza el carrusel de Inicio a mano.',
          },
          {
            type: 'boolean',
            name: 'showConsultBadge',
            label: '¿Mostrar el aviso de "N personas consultando ahora"?',
            description: 'El globito que aparece arriba del botón flotante tras bajar por la página.',
          },
          {
            type: 'boolean',
            name: 'showDangerTape',
            label: '¿Mostrar la cinta de "PELIGRO" animada?',
            description:
              'La franja amarilla y negra que cruza la sección de problemas de la portada al hacer scroll.',
          },
        ],
      },

      /* ══════════════════ INICIO ══════════════════ */
      {
        name: 'homeHero',
        label: 'Inicio · 1 Portada',
        path: 'content/home',
        format: 'json',
        match: { include: 'hero' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'string',
            name: 'eyebrow',
            label: 'Texto pequeño sobre el titular',
            description:
              'Aparece dentro del recuadro con borde dorado, encima del titular grande. Para dos líneas, pulsa Enter.',
            ui: { component: 'textarea' },
            required: true,
          },
          { type: 'string', name: 'heading', label: 'Titular', required: true },
          highlightField,
          {
            type: 'string',
            name: 'subheading',
            label: 'Párrafo debajo del titular',
            ui: { component: 'textarea' },
            required: true,
          },
          {
            type: 'string',
            name: 'ctaLabel',
            label: 'Texto del botón',
            description: 'El botón siempre lleva al WhatsApp configurado en Ajustes generales.',
            required: true,
          },
          {
            type: 'string',
            name: 'heroVideo',
            label: 'Video de fondo (ruta del archivo)',
            description:
              'Ruta a un archivo .mp4 dentro de /public. Se reproduce en bucle y sin sonido detrás del titular. Ejemplo: /media/hero-bg.mp4',
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Franja de etiquetas',
            description:
              'Las palabras que se mueven en bucle justo debajo de la portada. Arrastra para reordenar.',
            list: true,
          },
        ],
      },
      {
        name: 'homeProblems',
        label: 'Inicio · 2 Problemas',
        path: 'content/home',
        format: 'json',
        match: { include: 'problems' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Titular', required: true },
          { type: 'string', name: 'subheading', label: 'Párrafo', ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'items',
            label: 'Tarjetas de problemas',
            description: 'Normalmente 3, una por columna.',
            list: true,
            ui: { itemProps: (i) => ({ label: i?.title || 'Tarjeta' }) },
            fields: [
              { type: 'string', name: 'title', label: 'Pregunta', required: true },
              { type: 'string', name: 'text', label: 'Respuesta', ui: { component: 'textarea' }, required: true },
            ],
          },
          {
            type: 'string',
            name: 'tapeText',
            label: 'Texto de la cinta animada',
            description:
              'Se repite muchas veces en la franja amarilla. Actívala o desactívala en Ajustes generales.',
          },
        ],
      },
      {
        name: 'homeAbout',
        label: 'Inicio · 3 Sobre mí',
        path: 'content/home',
        format: 'json',
        match: { include: 'about' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'string',
            name: 'eyebrow',
            label: 'Texto pequeño',
            description: 'Enlace corto que lleva a la página Nosotros.',
          },
          { type: 'string', name: 'heading', label: 'Titular', required: true },
          { type: 'string', name: 'text', label: 'Párrafo', ui: { component: 'textarea' }, required: true },
          {
            type: 'string',
            name: 'points',
            label: 'Lista de servicios',
            description: 'Se muestran con un ícono de check. Normalmente 4.',
            list: true,
          },
          {
            type: 'image',
            name: 'photo',
            label: 'Foto',
            description: 'La foto reacciona al pasar el mouse (efecto 3D) — ese comportamiento es fijo.',
            required: true,
          },
          {
            type: 'string',
            name: 'badgeNumber',
            label: 'Número destacado',
            description: 'El número grande del sello inclinado sobre la foto. Ejemplo: +2 Años',
          },
          { type: 'string', name: 'badgeLabel', label: 'Texto bajo el número' },
        ],
      },
      {
        name: 'homePortfolioIntro',
        label: 'Inicio · 3b Encabezado de Proyectos',
        path: 'content/home',
        format: 'json',
        match: { include: 'portafolio' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Titular de la sección de proyectos', required: true },
          { type: 'string', name: 'intro', label: 'Párrafo de introducción', ui: { component: 'textarea' } },
          {
            type: 'string',
            name: 'ctaLabel',
            label: 'Texto del botón "Ver todos"',
            description: 'Lleva a la página de Portafolio.',
          },
        ],
      },
      {
        name: 'homeResults',
        label: 'Inicio · 4 Resultados',
        path: 'content/home',
        format: 'json',
        match: { include: 'results' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Titular', required: true },
          {
            type: 'object',
            name: 'testimonials',
            label: 'Testimonios',
            description:
              'Se muestran en dos franjas que se mueven en bucle en direcciones opuestas. El orden aquí es el orden en pantalla.',
            list: true,
            ui: { itemProps: (i) => ({ label: i?.name ? `${i.name} — ${i.company || ''}` : 'Testimonio' }) },
            fields: [
              { type: 'string', name: 'company', label: 'Empresa', required: true },
              { type: 'string', name: 'name', label: 'Nombre de quien opina', required: true },
              { type: 'string', name: 'text', label: 'Testimonio', ui: { component: 'textarea' }, required: true },
            ],
          },
        ],
      },

      /* ══════════════════ NOSOTROS ══════════════════ */
      {
        name: 'nosotrosHero',
        label: 'Nosotros · 1 Mi historia',
        path: 'content/nosotros',
        format: 'json',
        match: { include: 'hero' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'eyebrow', label: 'Texto pequeño (dentro del recuadro)' },
          { type: 'string', name: 'heading', label: 'Titular', required: true },
          highlightField,
          { type: 'string', name: 'text', label: 'Párrafo', ui: { component: 'textarea' }, required: true },
          {
            type: 'string',
            name: 'tags',
            label: 'Franja de etiquetas',
            description: 'Las palabras que se mueven en bucle justo debajo. Arrastra para reordenar.',
            list: true,
          },
        ],
      },
      {
        name: 'nosotrosPillars',
        label: 'Nosotros · 2 Pilares',
        path: 'content/nosotros',
        format: 'json',
        match: { include: 'pillars' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Titular', required: true },
          { type: 'string', name: 'subheading', label: 'Párrafo', ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'items',
            label: 'Pilares',
            description: 'Normalmente 3: Estética, Funcionalidad, Resultados. El ícono de cada uno es fijo.',
            list: true,
            ui: { itemProps: (i) => ({ label: i?.title || 'Pilar' }) },
            fields: [
              { type: 'string', name: 'title', label: 'Título', required: true },
              { type: 'string', name: 'text', label: 'Texto', ui: { component: 'textarea' }, required: true },
            ],
          },
        ],
      },
      {
        name: 'nosotrosWorkStyle',
        label: 'Nosotros · 3 Forma de trabajar',
        path: 'content/nosotros',
        format: 'json',
        match: { include: 'work-style' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Titular', required: true },
          {
            type: 'object',
            name: 'items',
            label: 'Pasos',
            description: 'Cada paso lleva un emoji al inicio: escríbelo tú dentro del "Texto destacado".',
            list: true,
            ui: { itemProps: (i) => ({ label: i?.highlight || 'Paso' }) },
            fields: [
              {
                type: 'string',
                name: 'highlight',
                label: 'Texto destacado (con su emoji)',
                description: 'Se muestra en negrita blanca. Ejemplo: 🎯 Escucho primero:',
                required: true,
              },
              { type: 'string', name: 'text', label: 'Resto del texto', required: true },
            ],
          },
        ],
      },
      {
        name: 'nosotrosBio',
        label: 'Nosotros · 4 Socio estratégico',
        path: 'content/nosotros',
        format: 'json',
        match: { include: 'bio' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Titular', required: true },
          { type: 'string', name: 'text', label: 'Párrafo', ui: { component: 'textarea' }, required: true },
          { type: 'string', name: 'points', label: 'Lista de servicios', list: true },
          { type: 'string', name: 'ctaLabel', label: 'Texto del botón', required: true },
          {
            type: 'image',
            name: 'photo',
            label: 'Foto',
            description: 'La foto reacciona al pasar el mouse (efecto 3D) — ese comportamiento es fijo.',
            required: true,
          },
          { type: 'string', name: 'badgeNumber', label: 'Número destacado', description: 'Ejemplo: +2 Años' },
          { type: 'string', name: 'badgeLabel', label: 'Texto bajo el número' },
        ],
      },

      /* ══════════════════ PORTAFOLIO ══════════════════ */
      {
        name: 'portfolioHero',
        label: 'Portafolio · Portada',
        path: 'content/portafolio',
        format: 'json',
        match: { include: 'hero' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'eyebrow', label: 'Texto pequeño (dentro del recuadro)' },
          { type: 'string', name: 'heading', label: 'Titular', required: true },
          highlightField,
          { type: 'string', name: 'subheading', label: 'Párrafo', ui: { component: 'textarea' }, required: true },
          {
            type: 'string',
            name: 'tags',
            label: 'Franja de etiquetas',
            description: 'Se mueven en bucle entre los proyectos y el testimonio.',
            list: true,
          },
        ],
      },

      /* ══════════════════ BLOG ══════════════════ */
      {
        name: 'blogHero',
        label: 'Blog · Portada',
        path: 'content/blog',
        format: 'json',
        match: { include: 'hero' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'eyebrow', label: 'Texto pequeño (dentro del recuadro)' },
          { type: 'string', name: 'heading', label: 'Titular', required: true },
          highlightField,
          { type: 'string', name: 'subheading', label: 'Párrafo', ui: { component: 'textarea' }, required: true },
          {
            type: 'string',
            name: 'toolsLabel',
            label: 'Texto sobre la grilla de herramientas',
            description: 'La etiqueta subrayada en dorado que separa la portada de las tarjetas de herramientas.',
          },
        ],
      },

      /* ══════════════════ CONTACTO ══════════════════ */
      {
        name: 'contactHero',
        label: 'Contacto · 1 Portada',
        path: 'content/contacto',
        format: 'json',
        match: { include: 'hero' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Titular', required: true },
          { type: 'string', name: 'paragraph1', label: 'Primer párrafo', ui: { component: 'textarea' }, required: true },
          { type: 'string', name: 'paragraph2', label: 'Segundo párrafo', ui: { component: 'textarea' } },
        ],
      },
      {
        name: 'contactPageCta',
        label: 'Contacto · 2 Formulario',
        path: 'content/contacto',
        format: 'json',
        match: { include: 'cta' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Titular', required: true },
          { type: 'string', name: 'subheading', label: 'Párrafo', ui: { component: 'textarea' }, required: true },
        ],
      },

      /* ══════════════════ COMPARTIDO ══════════════════ */
      {
        name: 'contactCta',
        label: 'Compartido · Llamado a la acción',
        path: 'content/compartido',
        format: 'json',
        match: { include: 'cta' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'string',
            name: 'heading',
            label: 'Titular',
            description:
              'Aparece sobre el formulario de "cotizar proyecto" en Inicio, Nosotros, Blog y en cada proyecto. Se edita una vez y cambia en las cuatro páginas.',
            required: true,
          },
          { type: 'string', name: 'subheading', label: 'Párrafo', ui: { component: 'textarea' }, required: true },
        ],
      },
      {
        name: 'featuredTestimonial',
        label: 'Compartido · Testimonio destacado',
        path: 'content/compartido',
        format: 'json',
        match: { include: 'testimonio-destacado' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'string',
            name: 'quote',
            label: 'Cita',
            description: 'La tarjeta amarilla con botón, compartida por Portafolio y Blog.',
            ui: { component: 'textarea' },
            required: true,
          },
          { type: 'string', name: 'author', label: 'Firma', description: 'Ejemplo: - Intailor', required: true },
          { type: 'string', name: 'ctaLabel', label: 'Texto del botón', required: true },
        ],
      },

      /* ══════════════════ POLÍTICA DE PRIVACIDAD ══════════════════ */
      {
        name: 'privacyPolicy',
        label: 'Política de privacidad',
        path: 'content/privacidad',
        format: 'json',
        match: { include: 'politica' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'eyebrow', label: 'Etiqueta pequeña', description: 'Ejemplo: Legal' },
          { type: 'string', name: 'title', label: 'Título de la página', required: true },
          { type: 'string', name: 'subtitle', label: 'Subtítulo', ui: { component: 'textarea' } },
          {
            type: 'string',
            name: 'lastUpdated',
            label: 'Fecha de última actualización',
            description: 'Texto libre que se muestra al final. Ejemplo: 27 de agosto de 2025',
          },
          {
            type: 'string',
            name: 'contactEmail',
            label: 'Correo para ejercer derechos / eliminación de datos',
            description: 'Se usa en todos los enlaces "mailto:" de esta página.',
          },
          {
            type: 'object',
            name: 'sections',
            label: 'Secciones numeradas',
            list: true,
            ui: { itemProps: (i) => ({ label: i?.number ? `${i.number}. ${i.title || ''}` : i?.title || 'Sección' }) },
            fields: [
              { type: 'string', name: 'number', label: 'Número', description: 'Se muestra dentro del círculo dorado.' },
              { type: 'string', name: 'title', label: 'Título de la sección', required: true },
              {
                type: 'string',
                name: 'body',
                label: 'Contenido',
                description:
                  'Un párrafo por bloque; separa los bloques con una línea en blanco. Para negrita, envuelve el texto en **dobles asteriscos**.',
                ui: { component: 'textarea' },
              },
              {
                type: 'string',
                name: 'bullets',
                label: 'Lista con viñetas (opcional)',
                description: 'Cada elemento es una viñeta. Admite **negrita**.',
                list: true,
              },
              {
                type: 'string',
                name: 'callout',
                label: 'Recuadro dorado (opcional)',
                description: 'Si lo llenas, aparece un recuadro dorado al final de la sección. Admite **negrita**.',
                ui: { component: 'textarea' },
              },
            ],
          },
        ],
      },

      /* ══════════════════ PROYECTOS (colección) ══════════════════ */
      {
        name: 'project',
        label: 'Proyectos',
        path: 'content/proyectos',
        format: 'json',
        ui: {
          filename: {
            readonly: false,
            description:
              'El nombre del archivo es la dirección web del proyecto: /proyecto/nombre-del-archivo. Cámbialo con cuidado (rompe el enlace viejo).',
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Nombre del cliente / proyecto', required: true },
          {
            type: 'string',
            name: 'category',
            label: 'Categoría',
            description: 'Define en qué pestaña del filtro de Portafolio aparece.',
            options: ['Tiendas', 'Especializado', 'Informativo'],
            required: true,
          },
          {
            type: 'string',
            name: 'service',
            label: 'Servicio',
            description: 'Se muestra sobre el título en la tarjeta y en la página de detalle. Ejemplo: Diseño Web para Clínica Estética',
            required: true,
          },
          {
            type: 'image',
            name: 'image',
            label: 'Foto de portada (vertical 3:4)',
            description: 'Se usa en la tarjeta del carrusel de Inicio y en la grilla de Portafolio.',
            required: true,
          },
          {
            type: 'string',
            name: 'shortDescription',
            label: 'Descripción corta',
            description: 'Se muestra en la tarjeta del carrusel de Inicio (máximo 3 líneas).',
            ui: { component: 'textarea' },
            required: true,
          },
          {
            type: 'boolean',
            name: 'featuredOnHome',
            label: '¿Mostrar en el carrusel de Inicio?',
            description: 'Si lo apagas, el proyecto sigue en Portafolio pero sale del carrusel de la portada.',
          },
          {
            type: 'number',
            name: 'order',
            label: 'Orden',
            description: 'Los números más bajos aparecen primero en Portafolio y en el carrusel de Inicio.',
          },
          {
            type: 'image',
            name: 'caseImage',
            label: 'Captura grande de la página de detalle',
            description: 'Imagen larga (screenshot del sitio del cliente). Solo se ve la parte superior, recortada.',
            required: true,
          },
          {
            type: 'string',
            name: 'objective',
            label: 'Objetivo',
            description: 'Una frase: qué se buscaba lograr con este proyecto.',
            ui: { component: 'textarea' },
            required: true,
          },
          {
            type: 'object',
            name: 'story',
            label: 'Historia del proyecto',
            description: 'Uno o más párrafos. Arrastra para reordenar.',
            list: true,
            ui: { itemProps: (i) => ({ label: i?.parrafo?.slice(0, 60) || 'Párrafo' }) },
            fields: [{ type: 'string', name: 'parrafo', label: 'Párrafo', ui: { component: 'textarea' }, required: true }],
          },
          {
            type: 'object',
            name: 'benefits',
            label: 'Beneficios del proyecto',
            list: true,
            ui: { itemProps: (i) => ({ label: i?.title || 'Beneficio' }) },
            fields: [
              { type: 'string', name: 'title', label: 'Título', required: true },
              { type: 'string', name: 'text', label: 'Texto', ui: { component: 'textarea' }, required: true },
            ],
          },
          {
            type: 'string',
            name: 'closingQuestion',
            label: 'Pregunta de cierre',
            description: 'La pregunta grande antes del botón final de contacto.',
            required: true,
          },
          { type: 'string', name: 'closingSubtext', label: 'Texto bajo la pregunta de cierre', required: true },
        ],
      },

      /* ══════════════════ HERRAMIENTAS (colección — grilla del Blog) ══════════════════ */
      {
        name: 'toolCard',
        label: 'Herramientas (Blog)',
        path: 'content/herramientas',
        format: 'json',
        ui: {
          filename: {
            readonly: false,
            description: 'Nombre interno del archivo. No afecta ninguna URL.',
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Nombre', required: true },
          { type: 'string', name: 'category', label: 'Categoría', description: 'Etiqueta pequeña sobre el nombre. Ejemplo: Herramientas' },
          {
            type: 'image',
            name: 'logo',
            label: 'Logo',
            description: 'Se muestra centrado sobre el color de fondo del siguiente campo.',
            required: true,
          },
          {
            type: 'string',
            name: 'logoBackground',
            label: 'Color de fondo de la tarjeta del logo',
            description: 'Un color hexadecimal (ej. #ffffff o #000000). Elígelo para que el logo se lea bien.',
            required: true,
          },
          { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' }, required: true },
          {
            type: 'string',
            name: 'aboutText',
            label: 'Texto "Sobre la herramienta"',
            ui: { component: 'textarea' },
            required: true,
          },
          {
            type: 'number',
            name: 'order',
            label: 'Orden',
            description: 'Los números más bajos aparecen primero en la grilla del Blog.',
          },
        ],
      },
    ],
  },
})
