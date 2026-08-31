import type { ReactNode } from 'react'
import { getSettings } from '@/lib/settings'
import SiteChrome from '@/components/SiteChrome'
import './globals.css'

// Google Fonts vía <link>, igual que el sitio original — React hoistea estos
// tags a <head> automáticamente. Se evita next/font para que los nombres de
// familia ('Exo' / 'Ubuntu') coincidan exactamente con los estilos inline.
export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings()

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Exo:wght@400;500;600;700;800&family=Ubuntu:wght@400;500;700&family=Ubuntu+Mono&display=swap"
        rel="stylesheet"
      />
      <SiteChrome settings={settings}>{children}</SiteChrome>
    </>
  )
}
