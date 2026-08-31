import Link from 'next/link'
import type { SiteSettings } from '@/lib/types'

const LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/portafolio', label: 'Portafolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/nosotros', label: 'Sobre mí' },
  { href: '/contacto', label: 'Contacto' },
]

/**
 * `variant="light"` reproduce el footer dorado exclusivo de /contacto;
 * el resto de páginas usa el footer oscuro estándar.
 */
export default function Footer({
  settings,
  variant = 'dark',
}: {
  settings: SiteSettings
  variant?: 'dark' | 'light'
}) {
  const light = variant === 'light'
  return (
    <footer
      style={{
        background: light ? '#f6d98d' : '#0a0a0a',
        padding: '36px clamp(20px, 5vw, 96px)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px 26px',
          marginBottom: 18,
          fontSize: 14,
        }}
      >
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} style={light ? { color: '#1c1c1c' } : undefined}>
            {l.label}
          </Link>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 14, color: light ? '#1c1c1c' : 'rgba(255,255,255,.6)' }}>
        {settings.footerCopyright}
      </p>
      <Link
        href="/politica-de-privacidad"
        style={{
          display: 'inline-block',
          marginTop: 14,
          padding: '5px 16px',
          border: `1px solid ${light ? 'rgba(28,28,28,.35)' : 'rgba(255,255,255,.25)'}`,
          borderRadius: 20,
          fontSize: 12,
          color: light ? '#1c1c1c' : 'rgba(255,255,255,.55)',
          textDecoration: 'none',
          letterSpacing: '0.03em',
        }}
      >
        Política de Privacidad
      </Link>
    </footer>
  )
}
