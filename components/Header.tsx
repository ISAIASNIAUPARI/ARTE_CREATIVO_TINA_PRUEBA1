'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { SiteSettings } from '@/lib/types'

const LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/portafolio', label: 'Portafolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contactar' },
]

export default function Header({ active, settings }: { active: string; settings: SiteSettings }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const logoUrl = settings.logo || null

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          padding: '34px clamp(20px, 5vw, 96px)',
        }}
      >
        <Link href="/" style={{ display: 'block', lineHeight: 1 }}>
          {logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={settings.brandName || 'Arte Creativo'}
              style={{ display: 'block', height: 66, width: 'auto' }}
            />
          )}
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            width: 54,
            height: 44,
            padding: 0,
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
          }}
        >
          <span style={{ display: 'block', width: 42, height: 9, borderRadius: 4, background: '#ffffff' }} />
          <span style={{ display: 'block', width: 42, height: 9, borderRadius: 4, background: '#ffffff' }} />
        </button>
      </header>

      {open && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
          style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,.55)', overflowY: 'auto' }}
        >
          <div
            style={{
              position: 'relative',
              background: '#2b2b2b',
              padding: '38px clamp(20px, 5vw, 80px) 52px',
              boxShadow: '0 26px 60px rgba(0,0,0,.5)',
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="af-menu-close"
              style={{
                position: 'absolute',
                zIndex: 3,
                top: 14,
                right: 14,
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 0,
                color: '#ffffff',
                fontSize: 34,
                fontWeight: 300,
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            <Link href="/" style={{ display: 'block', width: 'max-content', margin: '0 auto', lineHeight: 1 }}>
              {logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt={settings.brandName || 'Arte Creativo'}
                  style={{ display: 'block', height: 84, width: 'auto', margin: '0 auto' }}
                />
              )}
            </Link>

            <div style={{ width: 'min(280px, 60%)', height: 1, background: 'rgba(255,255,255,.55)', margin: '30px auto 34px' }} />

            <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '22px 14px' }}>
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={active === l.href ? 'af-menu-link af-menu-link--active' : 'af-menu-link'}
                  style={{
                    flex: '1 1 170px',
                    textAlign: 'center',
                    fontFamily: "'Exo', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(17px, 1.5vw, 22px)',
                    color: active === l.href ? '#f3c13b' : '#ffffff',
                    padding: '8px 0',
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 42 }}>
              <a
                href={settings.whatsappShortLink}
                target="_blank"
                rel="noopener"
                className="af-wa-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#25d366',
                  color: '#ffffff',
                  fontFamily: "'Exo', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '15px 30px',
                  borderRadius: 6,
                  transition: 'transform .3s ease, background .3s ease',
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.8 14.24c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.28-3.4-.7-2.86-1.18-4.7-4.08-4.84-4.27-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.08 1-2.36.27-.28.6-.35.8-.35.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.33.02.52-.1.19-.15.31-.3.48-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.24.65-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.75-.17 1.43z" />
                </svg>
                Asesoria
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
