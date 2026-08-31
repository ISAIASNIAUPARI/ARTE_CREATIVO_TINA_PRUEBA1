import type { SiteSettings } from '@/lib/types'
import Reveal from './Reveal'

/**
 * Logo + dirección + lista de contacto, repetido en toda sección de formulario.
 * `showWhatsappCta` reproduce el botón "Habla directo con Isaías" que existe en
 * todas las páginas EXCEPTO la portada.
 */
export default function ContactInfoBlock({
  settings,
  showWhatsappCta = false,
}: {
  settings: SiteSettings
  showWhatsappCta?: boolean
}) {
  const logoUrl = settings.logo || null
  return (
    <Reveal>
      {logoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt={settings.brandName} style={{ display: 'block', height: 72, width: 'auto' }} />
      )}
      <p style={{ margin: '24px 0 0', maxWidth: 420, fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,.82)' }}>
        Trabajo desde Quito, Ecuador, ofreciendo atención directa a negocios locales. Aquí puedes ver dónde estoy
        ubicado.
      </p>
      <a href={settings.mapLink} target="_blank" rel="noopener" className="af-map-btn">
        Ver en el Mapa
      </a>
      <ul
        style={{
          listStyle: 'none',
          margin: '30px 0 0',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          fontSize: 16,
          color: 'rgba(255,255,255,.85)',
        }}
      >
        <li>{settings.phoneDisplay}</li>
        <li>{settings.email}</li>
        <li>{settings.addressLine}</li>
      </ul>
      {showWhatsappCta && (
        <a href={settings.whatsappShortLink} target="_blank" rel="noopener" className="af-wa-direct">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
            <path d="M4.3 19.7L5.6 16A8 8 0 1 1 12 20a8 8 0 0 1-4-1l-3.7.7z" />
            <path d="M9 9.5c.4 3 2.5 5.1 5.5 5.5" />
          </svg>
          Habla directo con Isaías
        </a>
      )}
    </Reveal>
  )
}
