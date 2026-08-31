import type { ReactNode } from 'react'

export const metadata = {
  title: 'Arte Creativo — Diseño Web en Quito',
  description:
    'Diseño sitios web rápidos, modernos y optimizados para Google que convierten visitantes en clientes.',
}

// Layout raíz: sin CSS del sitio público a propósito. El reset de globals.css
// vive en app/(site)/layout.tsx para que /admin no lo herede.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
