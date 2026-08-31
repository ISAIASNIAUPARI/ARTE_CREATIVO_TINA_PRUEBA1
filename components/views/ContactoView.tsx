'use client'

import { useTina } from 'tinacms/dist/react'
import { tinaField } from '@/lib/tinaField'
import type { TinaDoc } from '@/lib/loadDoc'
import type { SiteSettings } from '@/lib/types'
import Reveal from '@/components/Reveal'
import QuoteForm from '@/components/QuoteForm'
import ContactInfoBlock from '@/components/ContactInfoBlock'

type Hero = { heading: string; paragraph1: string; paragraph2?: string | null }
type Cta = { heading: string; subheading: string }

export default function ContactoView({
  hero,
  cta,
  settings,
}: {
  hero: TinaDoc<{ contactHero: Hero }>
  cta: TinaDoc<{ contactPageCta: Cta }>
  settings: SiteSettings
}) {
  const h = useTina(hero).data.contactHero
  const c = useTina(cta).data.contactPageCta

  return (
    <>
      <section data-screen-label="Contacto" style={{ background: '#1c1c1c', padding: 'clamp(140px, 20vh, 220px) clamp(20px, 5vw, 96px) clamp(60px, 9vh, 110px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal
            style={{
              maxWidth: 1140,
              margin: '0 auto',
              border: '1px solid rgba(230,187,82,.55)',
              borderRadius: 22,
              padding: 'clamp(30px, 4vw, 60px) clamp(24px, 4vw, 56px)',
              textAlign: 'center',
            }}
          >
            <h1 data-tina-field={tinaField(h, 'heading')} style={{ margin: 0, fontFamily: "'Exo', sans-serif", fontWeight: 800, fontSize: 'clamp(34px, 5vw, 78px)', lineHeight: 1.08, color: '#ffffff' }}>{h.heading}</h1>
            <p data-tina-field={tinaField(h, 'paragraph1')} style={{ margin: '22px 0 0', fontSize: 'clamp(15px, 1.3vw, 21px)', lineHeight: 1.55, color: 'rgba(255,255,255,.92)' }}>{h.paragraph1}</p>
            {h.paragraph2 && (
              <p data-tina-field={tinaField(h, 'paragraph2')} style={{ margin: '22px 0 0', fontSize: 'clamp(15px, 1.3vw, 21px)', lineHeight: 1.55, color: 'rgba(255,255,255,.92)' }}>{h.paragraph2}</p>
            )}
          </Reveal>
        </div>
      </section>

      <section data-screen-label="Formulario" style={{ background: '#1a1a1a', padding: 'clamp(60px, 9vh, 110px) clamp(20px, 5vw, 96px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal as="h2" data-tina-field={tinaField(c, 'heading')} style={{ margin: 0, textAlign: 'center', fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.6vw, 58px)', lineHeight: 1.1, color: '#ffffff' }}>
            {c.heading}
          </Reveal>
          <Reveal as="p" data-tina-field={tinaField(c, 'subheading')} style={{ margin: '18px auto 0', maxWidth: 860, textAlign: 'center', fontSize: 'clamp(15px, 1.2vw, 20px)', lineHeight: 1.6, color: 'rgba(255,255,255,.85)' }}>
            {c.subheading}
          </Reveal>
          <div style={{ marginTop: 'clamp(36px, 6vh, 64px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(28px, 4vw, 56px)', alignItems: 'start' }}>
            <ContactInfoBlock settings={settings} showWhatsappCta />
            <QuoteForm whatsappNumber={settings.whatsappNumber} inputStyle="light" showErrorSlot />
          </div>
        </div>
      </section>
    </>
  )
}
