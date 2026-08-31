// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";
var highlightField = {
  type: "string",
  name: "headingHighlight",
  label: "Palabra destacada del titular",
  description: "Escribe una palabra que est\xE9 EXACTAMENTE dentro del titular. Esa palabra se pinta en dorado claro. D\xE9jalo vac\xEDo si ninguna palabra debe resaltar."
};
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images/uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      /* ══════════════════ AJUSTES GENERALES ══════════════════ */
      {
        name: "settings",
        label: "Ajustes generales",
        path: "content/settings",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "string",
            name: "brandName",
            label: "Nombre de la marca",
            description: "Se usa como texto alternativo del logo (accesibilidad y SEO). No se muestra como texto visible.",
            required: true
          },
          {
            type: "image",
            name: "logo",
            label: "Logo",
            description: "Aparece en la cabecera, en el men\xFA y en la secci\xF3n de contacto de todas las p\xE1ginas. Usa un PNG con fondo transparente.",
            required: true
          },
          {
            type: "string",
            name: "phoneDisplay",
            label: "Tel\xE9fono (como se muestra)",
            description: "Se muestra tal cual en la lista de contacto. Ejemplo: +593 96 260 6760",
            required: true
          },
          {
            type: "string",
            name: "email",
            label: "Correo de contacto",
            description: "Se muestra en la lista de contacto de cada formulario.",
            required: true
          },
          {
            type: "string",
            name: "addressLine",
            label: "Ciudad / direcci\xF3n",
            description: "Texto corto en la lista de contacto. Ejemplo: Quito - Ecuador",
            required: true
          },
          {
            type: "string",
            name: "mapLink",
            label: "Enlace a Google Maps",
            description: 'A d\xF3nde lleva el bot\xF3n "Ver en el Mapa".',
            required: true
          },
          {
            type: "string",
            name: "whatsappNumber",
            label: "N\xFAmero de WhatsApp (solo d\xEDgitos, con c\xF3digo de pa\xEDs)",
            description: 'A este n\xFAmero se env\xEDan los formularios de "cotizar proyecto". Solo n\xFAmeros, sin espacios ni signos. Ejemplo: 593998381419',
            required: true
          },
          {
            type: "string",
            name: "whatsappShortLink",
            label: "Enlace directo de WhatsApp",
            description: "Se usa en el bot\xF3n flotante verde, en el men\xFA y en el asistente de chat. Puede ser un enlace corto (w.app/...) o wa.me/...",
            required: true
          },
          {
            type: "string",
            name: "footerCopyright",
            label: "Texto del pie de p\xE1gina",
            description: "Frase centrada bajo los enlaces del pie, en todas las p\xE1ginas.",
            required: true
          },
          {
            type: "boolean",
            name: "chatEnabled",
            label: "\xBFMostrar el asistente de chat?",
            description: 'Si lo apagas, el bot\xF3n flotante solo abre WhatsApp \u2014 sin el bot "Artly" ni sus opciones r\xE1pidas.'
          },
          {
            type: "string",
            name: "chatWebhookUrl",
            label: "Webhook del asistente (n8n)",
            description: "A d\xF3nde se env\xEDan los mensajes que escribe el visitante en el chat. Solo lo cambia quien administra el flujo de automatizaci\xF3n de n8n."
          },
          {
            type: "image",
            name: "chatBotAvatar",
            label: "Foto del asistente",
            description: 'La imagen redonda del bot "Artly" en la ventana de chat.'
          },
          {
            type: "object",
            name: "chatQuickReplies",
            label: "Respuestas r\xE1pidas del chat",
            description: 'Los botones que ve el visitante antes de escribir. El "Texto del bot\xF3n" es lo que se ve; la "Pregunta" es lo que realmente se env\xEDa al asistente.',
            list: true,
            ui: { itemProps: (i) => ({ label: i?.label || "Respuesta r\xE1pida" }) },
            fields: [
              { type: "string", name: "label", label: "Texto del bot\xF3n", required: true },
              { type: "string", name: "question", label: "Pregunta que env\xEDa", required: true }
            ]
          },
          {
            type: "boolean",
            name: "carouselAutoplay",
            label: "\xBFAvanzar solo el carrusel de proyectos de la portada?",
            description: "Si lo apagas, el visitante avanza el carrusel de Inicio a mano."
          },
          {
            type: "boolean",
            name: "showConsultBadge",
            label: '\xBFMostrar el aviso de "N personas consultando ahora"?',
            description: "El globito que aparece arriba del bot\xF3n flotante tras bajar por la p\xE1gina."
          },
          {
            type: "boolean",
            name: "showDangerTape",
            label: '\xBFMostrar la cinta de "PELIGRO" animada?',
            description: "La franja amarilla y negra que cruza la secci\xF3n de problemas de la portada al hacer scroll."
          }
        ]
      },
      /* ══════════════════ INICIO ══════════════════ */
      {
        name: "homeHero",
        label: "Inicio \xB7 1 Portada",
        path: "content/home",
        format: "json",
        match: { include: "hero" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "string",
            name: "eyebrow",
            label: "Texto peque\xF1o sobre el titular",
            description: "Aparece dentro del recuadro con borde dorado, encima del titular grande. Para dos l\xEDneas, pulsa Enter.",
            ui: { component: "textarea" },
            required: true
          },
          { type: "string", name: "heading", label: "Titular", required: true },
          highlightField,
          {
            type: "string",
            name: "subheading",
            label: "P\xE1rrafo debajo del titular",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "string",
            name: "ctaLabel",
            label: "Texto del bot\xF3n",
            description: "El bot\xF3n siempre lleva al WhatsApp configurado en Ajustes generales.",
            required: true
          },
          {
            type: "string",
            name: "heroVideo",
            label: "Video de fondo (ruta del archivo)",
            description: "Ruta a un archivo .mp4 dentro de /public. Se reproduce en bucle y sin sonido detr\xE1s del titular. Ejemplo: /media/hero-bg.mp4"
          },
          {
            type: "string",
            name: "tags",
            label: "Franja de etiquetas",
            description: "Las palabras que se mueven en bucle justo debajo de la portada. Arrastra para reordenar.",
            list: true
          }
        ]
      },
      {
        name: "homeProblems",
        label: "Inicio \xB7 2 Problemas",
        path: "content/home",
        format: "json",
        match: { include: "problems" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading", label: "Titular", required: true },
          { type: "string", name: "subheading", label: "P\xE1rrafo", ui: { component: "textarea" } },
          {
            type: "object",
            name: "items",
            label: "Tarjetas de problemas",
            description: "Normalmente 3, una por columna.",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.title || "Tarjeta" }) },
            fields: [
              { type: "string", name: "title", label: "Pregunta", required: true },
              { type: "string", name: "text", label: "Respuesta", ui: { component: "textarea" }, required: true }
            ]
          },
          {
            type: "string",
            name: "tapeText",
            label: "Texto de la cinta animada",
            description: "Se repite muchas veces en la franja amarilla. Act\xEDvala o desact\xEDvala en Ajustes generales."
          }
        ]
      },
      {
        name: "homeAbout",
        label: "Inicio \xB7 3 Sobre m\xED",
        path: "content/home",
        format: "json",
        match: { include: "about" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "string",
            name: "eyebrow",
            label: "Texto peque\xF1o",
            description: "Enlace corto que lleva a la p\xE1gina Nosotros."
          },
          { type: "string", name: "heading", label: "Titular", required: true },
          { type: "string", name: "text", label: "P\xE1rrafo", ui: { component: "textarea" }, required: true },
          {
            type: "string",
            name: "points",
            label: "Lista de servicios",
            description: "Se muestran con un \xEDcono de check. Normalmente 4.",
            list: true
          },
          {
            type: "image",
            name: "photo",
            label: "Foto",
            description: "La foto reacciona al pasar el mouse (efecto 3D) \u2014 ese comportamiento es fijo.",
            required: true
          },
          {
            type: "string",
            name: "badgeNumber",
            label: "N\xFAmero destacado",
            description: "El n\xFAmero grande del sello inclinado sobre la foto. Ejemplo: +2 A\xF1os"
          },
          { type: "string", name: "badgeLabel", label: "Texto bajo el n\xFAmero" }
        ]
      },
      {
        name: "homePortfolioIntro",
        label: "Inicio \xB7 3b Encabezado de Proyectos",
        path: "content/home",
        format: "json",
        match: { include: "portafolio" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading", label: "Titular de la secci\xF3n de proyectos", required: true },
          { type: "string", name: "intro", label: "P\xE1rrafo de introducci\xF3n", ui: { component: "textarea" } },
          {
            type: "string",
            name: "ctaLabel",
            label: 'Texto del bot\xF3n "Ver todos"',
            description: "Lleva a la p\xE1gina de Portafolio."
          }
        ]
      },
      {
        name: "homeResults",
        label: "Inicio \xB7 4 Resultados",
        path: "content/home",
        format: "json",
        match: { include: "results" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading", label: "Titular", required: true },
          {
            type: "object",
            name: "testimonials",
            label: "Testimonios",
            description: "Se muestran en dos franjas que se mueven en bucle en direcciones opuestas. El orden aqu\xED es el orden en pantalla.",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.name ? `${i.name} \u2014 ${i.company || ""}` : "Testimonio" }) },
            fields: [
              { type: "string", name: "company", label: "Empresa", required: true },
              { type: "string", name: "name", label: "Nombre de quien opina", required: true },
              { type: "string", name: "text", label: "Testimonio", ui: { component: "textarea" }, required: true }
            ]
          }
        ]
      },
      /* ══════════════════ NOSOTROS ══════════════════ */
      {
        name: "nosotrosHero",
        label: "Nosotros \xB7 1 Mi historia",
        path: "content/nosotros",
        format: "json",
        match: { include: "hero" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "eyebrow", label: "Texto peque\xF1o (dentro del recuadro)" },
          { type: "string", name: "heading", label: "Titular", required: true },
          highlightField,
          { type: "string", name: "text", label: "P\xE1rrafo", ui: { component: "textarea" }, required: true },
          {
            type: "string",
            name: "tags",
            label: "Franja de etiquetas",
            description: "Las palabras que se mueven en bucle justo debajo. Arrastra para reordenar.",
            list: true
          }
        ]
      },
      {
        name: "nosotrosPillars",
        label: "Nosotros \xB7 2 Pilares",
        path: "content/nosotros",
        format: "json",
        match: { include: "pillars" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading", label: "Titular", required: true },
          { type: "string", name: "subheading", label: "P\xE1rrafo", ui: { component: "textarea" } },
          {
            type: "object",
            name: "items",
            label: "Pilares",
            description: "Normalmente 3: Est\xE9tica, Funcionalidad, Resultados. El \xEDcono de cada uno es fijo.",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.title || "Pilar" }) },
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo", required: true },
              { type: "string", name: "text", label: "Texto", ui: { component: "textarea" }, required: true }
            ]
          }
        ]
      },
      {
        name: "nosotrosWorkStyle",
        label: "Nosotros \xB7 3 Forma de trabajar",
        path: "content/nosotros",
        format: "json",
        match: { include: "work-style" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading", label: "Titular", required: true },
          {
            type: "object",
            name: "items",
            label: "Pasos",
            description: 'Cada paso lleva un emoji al inicio: escr\xEDbelo t\xFA dentro del "Texto destacado".',
            list: true,
            ui: { itemProps: (i) => ({ label: i?.highlight || "Paso" }) },
            fields: [
              {
                type: "string",
                name: "highlight",
                label: "Texto destacado (con su emoji)",
                description: "Se muestra en negrita blanca. Ejemplo: \u{1F3AF} Escucho primero:",
                required: true
              },
              { type: "string", name: "text", label: "Resto del texto", required: true }
            ]
          }
        ]
      },
      {
        name: "nosotrosBio",
        label: "Nosotros \xB7 4 Socio estrat\xE9gico",
        path: "content/nosotros",
        format: "json",
        match: { include: "bio" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading", label: "Titular", required: true },
          { type: "string", name: "text", label: "P\xE1rrafo", ui: { component: "textarea" }, required: true },
          { type: "string", name: "points", label: "Lista de servicios", list: true },
          { type: "string", name: "ctaLabel", label: "Texto del bot\xF3n", required: true },
          {
            type: "image",
            name: "photo",
            label: "Foto",
            description: "La foto reacciona al pasar el mouse (efecto 3D) \u2014 ese comportamiento es fijo.",
            required: true
          },
          { type: "string", name: "badgeNumber", label: "N\xFAmero destacado", description: "Ejemplo: +2 A\xF1os" },
          { type: "string", name: "badgeLabel", label: "Texto bajo el n\xFAmero" }
        ]
      },
      /* ══════════════════ PORTAFOLIO ══════════════════ */
      {
        name: "portfolioHero",
        label: "Portafolio \xB7 Portada",
        path: "content/portafolio",
        format: "json",
        match: { include: "hero" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "eyebrow", label: "Texto peque\xF1o (dentro del recuadro)" },
          { type: "string", name: "heading", label: "Titular", required: true },
          highlightField,
          { type: "string", name: "subheading", label: "P\xE1rrafo", ui: { component: "textarea" }, required: true },
          {
            type: "string",
            name: "tags",
            label: "Franja de etiquetas",
            description: "Se mueven en bucle entre los proyectos y el testimonio.",
            list: true
          }
        ]
      },
      /* ══════════════════ BLOG ══════════════════ */
      {
        name: "blogHero",
        label: "Blog \xB7 Portada",
        path: "content/blog",
        format: "json",
        match: { include: "hero" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "eyebrow", label: "Texto peque\xF1o (dentro del recuadro)" },
          { type: "string", name: "heading", label: "Titular", required: true },
          highlightField,
          { type: "string", name: "subheading", label: "P\xE1rrafo", ui: { component: "textarea" }, required: true },
          {
            type: "string",
            name: "toolsLabel",
            label: "Texto sobre la grilla de herramientas",
            description: "La etiqueta subrayada en dorado que separa la portada de las tarjetas de herramientas."
          }
        ]
      },
      /* ══════════════════ CONTACTO ══════════════════ */
      {
        name: "contactHero",
        label: "Contacto \xB7 1 Portada",
        path: "content/contacto",
        format: "json",
        match: { include: "hero" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading", label: "Titular", required: true },
          { type: "string", name: "paragraph1", label: "Primer p\xE1rrafo", ui: { component: "textarea" }, required: true },
          { type: "string", name: "paragraph2", label: "Segundo p\xE1rrafo", ui: { component: "textarea" } }
        ]
      },
      {
        name: "contactPageCta",
        label: "Contacto \xB7 2 Formulario",
        path: "content/contacto",
        format: "json",
        match: { include: "cta" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading", label: "Titular", required: true },
          { type: "string", name: "subheading", label: "P\xE1rrafo", ui: { component: "textarea" }, required: true }
        ]
      },
      /* ══════════════════ COMPARTIDO ══════════════════ */
      {
        name: "contactCta",
        label: "Compartido \xB7 Llamado a la acci\xF3n",
        path: "content/compartido",
        format: "json",
        match: { include: "cta" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "string",
            name: "heading",
            label: "Titular",
            description: 'Aparece sobre el formulario de "cotizar proyecto" en Inicio, Nosotros, Blog y en cada proyecto. Se edita una vez y cambia en las cuatro p\xE1ginas.',
            required: true
          },
          { type: "string", name: "subheading", label: "P\xE1rrafo", ui: { component: "textarea" }, required: true }
        ]
      },
      {
        name: "featuredTestimonial",
        label: "Compartido \xB7 Testimonio destacado",
        path: "content/compartido",
        format: "json",
        match: { include: "testimonio-destacado" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "string",
            name: "quote",
            label: "Cita",
            description: "La tarjeta amarilla con bot\xF3n, compartida por Portafolio y Blog.",
            ui: { component: "textarea" },
            required: true
          },
          { type: "string", name: "author", label: "Firma", description: "Ejemplo: - Intailor", required: true },
          { type: "string", name: "ctaLabel", label: "Texto del bot\xF3n", required: true }
        ]
      },
      /* ══════════════════ POLÍTICA DE PRIVACIDAD ══════════════════ */
      {
        name: "privacyPolicy",
        label: "Pol\xEDtica de privacidad",
        path: "content/privacidad",
        format: "json",
        match: { include: "politica" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "eyebrow", label: "Etiqueta peque\xF1a", description: "Ejemplo: Legal" },
          { type: "string", name: "title", label: "T\xEDtulo de la p\xE1gina", required: true },
          { type: "string", name: "subtitle", label: "Subt\xEDtulo", ui: { component: "textarea" } },
          {
            type: "string",
            name: "lastUpdated",
            label: "Fecha de \xFAltima actualizaci\xF3n",
            description: "Texto libre que se muestra al final. Ejemplo: 27 de agosto de 2025"
          },
          {
            type: "string",
            name: "contactEmail",
            label: "Correo para ejercer derechos / eliminaci\xF3n de datos",
            description: 'Se usa en todos los enlaces "mailto:" de esta p\xE1gina.'
          },
          {
            type: "object",
            name: "sections",
            label: "Secciones numeradas",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.number ? `${i.number}. ${i.title || ""}` : i?.title || "Secci\xF3n" }) },
            fields: [
              { type: "string", name: "number", label: "N\xFAmero", description: "Se muestra dentro del c\xEDrculo dorado." },
              { type: "string", name: "title", label: "T\xEDtulo de la secci\xF3n", required: true },
              {
                type: "string",
                name: "body",
                label: "Contenido",
                description: "Un p\xE1rrafo por bloque; separa los bloques con una l\xEDnea en blanco. Para negrita, envuelve el texto en **dobles asteriscos**.",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "bullets",
                label: "Lista con vi\xF1etas (opcional)",
                description: "Cada elemento es una vi\xF1eta. Admite **negrita**.",
                list: true
              },
              {
                type: "string",
                name: "callout",
                label: "Recuadro dorado (opcional)",
                description: "Si lo llenas, aparece un recuadro dorado al final de la secci\xF3n. Admite **negrita**.",
                ui: { component: "textarea" }
              }
            ]
          }
        ]
      },
      /* ══════════════════ PROYECTOS (colección) ══════════════════ */
      {
        name: "project",
        label: "Proyectos",
        path: "content/proyectos",
        format: "json",
        ui: {
          filename: {
            readonly: false,
            description: "El nombre del archivo es la direcci\xF3n web del proyecto: /proyecto/nombre-del-archivo. C\xE1mbialo con cuidado (rompe el enlace viejo)."
          }
        },
        fields: [
          { type: "string", name: "title", label: "Nombre del cliente / proyecto", required: true },
          {
            type: "string",
            name: "category",
            label: "Categor\xEDa",
            description: "Define en qu\xE9 pesta\xF1a del filtro de Portafolio aparece.",
            options: ["Tiendas", "Especializado", "Informativo"],
            required: true
          },
          {
            type: "string",
            name: "service",
            label: "Servicio",
            description: "Se muestra sobre el t\xEDtulo en la tarjeta y en la p\xE1gina de detalle. Ejemplo: Dise\xF1o Web para Cl\xEDnica Est\xE9tica",
            required: true
          },
          {
            type: "image",
            name: "image",
            label: "Foto de portada (vertical 3:4)",
            description: "Se usa en la tarjeta del carrusel de Inicio y en la grilla de Portafolio.",
            required: true
          },
          {
            type: "string",
            name: "shortDescription",
            label: "Descripci\xF3n corta",
            description: "Se muestra en la tarjeta del carrusel de Inicio (m\xE1ximo 3 l\xEDneas).",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "boolean",
            name: "featuredOnHome",
            label: "\xBFMostrar en el carrusel de Inicio?",
            description: "Si lo apagas, el proyecto sigue en Portafolio pero sale del carrusel de la portada."
          },
          {
            type: "number",
            name: "order",
            label: "Orden",
            description: "Los n\xFAmeros m\xE1s bajos aparecen primero en Portafolio y en el carrusel de Inicio."
          },
          {
            type: "image",
            name: "caseImage",
            label: "Captura grande de la p\xE1gina de detalle",
            description: "Imagen larga (screenshot del sitio del cliente). Solo se ve la parte superior, recortada.",
            required: true
          },
          {
            type: "string",
            name: "objective",
            label: "Objetivo",
            description: "Una frase: qu\xE9 se buscaba lograr con este proyecto.",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "object",
            name: "story",
            label: "Historia del proyecto",
            description: "Uno o m\xE1s p\xE1rrafos. Arrastra para reordenar.",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.parrafo?.slice(0, 60) || "P\xE1rrafo" }) },
            fields: [{ type: "string", name: "parrafo", label: "P\xE1rrafo", ui: { component: "textarea" }, required: true }]
          },
          {
            type: "object",
            name: "benefits",
            label: "Beneficios del proyecto",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.title || "Beneficio" }) },
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo", required: true },
              { type: "string", name: "text", label: "Texto", ui: { component: "textarea" }, required: true }
            ]
          },
          {
            type: "string",
            name: "closingQuestion",
            label: "Pregunta de cierre",
            description: "La pregunta grande antes del bot\xF3n final de contacto.",
            required: true
          },
          { type: "string", name: "closingSubtext", label: "Texto bajo la pregunta de cierre", required: true }
        ]
      },
      /* ══════════════════ HERRAMIENTAS (colección — grilla del Blog) ══════════════════ */
      {
        name: "toolCard",
        label: "Herramientas (Blog)",
        path: "content/herramientas",
        format: "json",
        ui: {
          filename: {
            readonly: false,
            description: "Nombre interno del archivo. No afecta ninguna URL."
          }
        },
        fields: [
          { type: "string", name: "title", label: "Nombre", required: true },
          { type: "string", name: "category", label: "Categor\xEDa", description: "Etiqueta peque\xF1a sobre el nombre. Ejemplo: Herramientas" },
          {
            type: "image",
            name: "logo",
            label: "Logo",
            description: "Se muestra centrado sobre el color de fondo del siguiente campo.",
            required: true
          },
          {
            type: "string",
            name: "logoBackground",
            label: "Color de fondo de la tarjeta del logo",
            description: "Un color hexadecimal (ej. #ffffff o #000000). El\xEDgelo para que el logo se lea bien.",
            required: true
          },
          { type: "string", name: "description", label: "Descripci\xF3n", ui: { component: "textarea" }, required: true },
          {
            type: "string",
            name: "aboutText",
            label: 'Texto "Sobre la herramienta"',
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "number",
            name: "order",
            label: "Orden",
            description: "Los n\xFAmeros m\xE1s bajos aparecen primero en la grilla del Blog."
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
