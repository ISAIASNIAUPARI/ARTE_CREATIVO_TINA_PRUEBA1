'use client'

import { useEffect, useState } from 'react'

/**
 * `withPolicyLinks` reproduce el texto largo (con enlaces a Política de cookies/
 * privacidad) que solo trae la portada; el resto de páginas usa el texto corto.
 */
export default function CookieBanner({ withPolicyLinks = false }: { withPolicyLinks?: boolean }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let saved: string | null = null
    try {
      saved = window.localStorage.getItem('af-cookie-consent')
    } catch {
      saved = null
    }
    if (!saved) {
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  if (!visible) return null

  const accept = () => {
    try {
      window.localStorage.setItem('af-cookie-consent', 'all')
    } catch {}
    setVisible(false)
  }
  const reject = () => {
    try {
      window.localStorage.setItem('af-cookie-consent', 'necessary')
    } catch {}
    setVisible(false)
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: 22,
        bottom: 22,
        zIndex: 80,
        width: 'min(430px, calc(100vw - 44px))',
        background: '#222222',
        border: '1px solid rgba(255,255,255,.1)',
        borderRadius: 10,
        padding: '18px 20px',
        boxShadow: '0 18px 44px rgba(0,0,0,.55)',
      }}
    >
      <h4
        style={{
          margin: 0,
          fontFamily: "'Exo', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: '#ffffff',
        }}
      >
        Ayúdenos a mejorar su experiencia digital
      </h4>
      <p style={{ margin: '10px 0 0', fontSize: 12, lineHeight: 1.55, color: 'rgba(255,255,255,.75)' }}>
        Usamos cookies para el funcionamiento del sitio, analizar el tráfico y medir campañas (Meta Pixel y
        Google Analytics).
        {withPolicyLinks && (
          <>
            {' '}
            Al hacer clic en &quot;Aceptar todas&quot; aceptas nuestra{' '}
            <a href="#contacto" style={{ color: '#e6bb52', textDecoration: 'underline' }}>
              Política de cookies
            </a>{' '}
            y la{' '}
            <a href="#contacto" style={{ color: '#e6bb52', textDecoration: 'underline' }}>
              Política de privacidad
            </a>
            .
          </>
        )}
      </p>
      <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        <button type="button" onClick={reject} className="af-cookie-reject">
          Solo necesarias
        </button>
        <button type="button" onClick={accept} className="af-cookie-accept">
          Aceptar todas las cookies
        </button>
      </div>
      <style jsx>{`
        .af-cookie-reject {
          background: transparent;
          border: 0;
          padding: 8px 0;
          font-family: 'Exo', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: underline;
          cursor: pointer;
        }
        .af-cookie-reject:hover {
          color: #e6bb52;
        }
        .af-cookie-accept {
          margin-left: auto;
          background: #e6bb52;
          color: #161616;
          border: 0;
          border-radius: 4px;
          padding: 11px 18px;
          font-family: 'Exo', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .af-cookie-accept:hover {
          background: #f3c13b;
        }
      `}</style>
    </div>
  )
}
