# ARTE CREATIVO — Next.js + TinaCMS (PRUEBA1)

Réplica exacta de [arte-creativo.vercel.app](https://arte-creativo.vercel.app/) en
Next.js (App Router) con **TinaCMS** como gestor de contenido.

El cliente edita todos los textos e imágenes desde `/admin` (edición visual). Cada
cambio se guarda como commit en GitHub → Vercel redespliega solo.

## Estructura

- `app/(site)/` — páginas públicas (Inicio, Nosotros, Portafolio, Blog, Contacto,
  Proyecto/[slug], Política de privacidad).
- `components/` — componentes compartidos; `components/views/` son los que conectan
  con TinaCMS (`useTina`) para la edición en vivo.
- `content/` — un archivo JSON por sección. Es la fuente de contenido.
- `tina/config.ts` — esquema del panel: un campo por cada texto/imagen editable,
  con etiquetas y descripciones en español.
- `public/images`, `public/media` — logo, foto, video de fondo, capturas de proyectos.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completar con las claves de Tina Cloud
npm run dev
```

- Web: `http://localhost:3000`
- Panel: `http://localhost:3000/admin`

## Variables de entorno (Vercel + local)

| Variable | Ejemplo | Dónde |
|---|---|---|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | `98ab9535-…` | Production, Preview, Development |
| `TINA_TOKEN` | `c8e350…` | Production, Preview, Development |
| `NEXT_PUBLIC_TINA_BRANCH` | `main` | Production, Preview, Development |

## Qué es editable y qué es fijo

**Editable desde `/admin`:** todos los textos, listas, testimonios, proyectos,
herramientas, datos de contacto (teléfono, correo, WhatsApp, mapa), textos legales,
imágenes (logo, foto, capturas), y los interruptores de comportamiento
(carrusel automático, cinta de "PELIGRO", aviso de "personas consultando").

**Fijo (en el código, no editable):** paleta de colores (`#0a0a0a`, `#e6bb52`,
`#f3c13b`, `#f6d98d`, …), tipografías (Exo y Ubuntu de Google Fonts), espaciados,
animaciones (marquesinas, aparición al hacer scroll, inclinación 3D de la foto,
cinta animada), iconos SVG y la lógica del formulario de WhatsApp.

## Despliegue

Vercel conectado a este repositorio: cada push a `main` despliega. El build  se ejecuta
`tinacms build && next build`.
