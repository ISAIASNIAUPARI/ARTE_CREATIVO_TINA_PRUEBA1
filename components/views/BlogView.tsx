'use client'

import Link from 'next/link'
import { useTina } from 'tinacms/dist/react'
import { tinaField } from '@/lib/tinaField'
import type { TinaDoc } from '@/lib/loadDoc'
import type { SiteSettings, ToolCard } from '@/lib/types'
import Reveal from '@/components/Reveal'
import HeadingSplit from '@/components/HeadingSplit'
import FeaturedTestimonialBanner from '@/components/FeaturedTestimonialBanner'
import QuoteForm from '@/components/QuoteForm'
import ContactInfoBlock from '@/components/ContactInfoBlock'

type Hero = {
  eyebrow?: string | null
  heading: string
  headingHighlight?: string | null
  subheading: string
  toolsLabel?: string | null
}
type Testi = { quote: string; author: string; ctaLabel: string }
type Cta = { heading: string; subheading: string }

export default function BlogView({
  hero,
  testimonial,
  cta,
  settings,
  tools,
}: {
  hero: TinaDoc<{ blogHero: Hero }>
  testimonial: TinaDoc<{ featuredTestimonial: Testi }>
  cta: TinaDoc<{ contactCta: Cta }>
  settings: SiteSettings
  tools: ToolCard[]
}) {
  const h = useTina(hero).data.blogHero
  const t = useTina(testimonial).data.featuredTestimonial
  const c = useTina(cta).data.contactCta

  return (
    <>
      <section data-screen-label="Blog hero" style={{ background: '#1c1c1c', padding: 'clamp(140px, 22vh, 230px) clamp(20px, 5vw, 96px) clamp(60px, 9vh, 100px)', textAlign: 'center' }}>
        {h.eyebrow && (
          <Reveal style={{ display: 'inline-block', border: '1px solid rgba(230,187,82,.35)', background: 'rgba(40,40,40,.35)', borderRadius: 8, padding: '14px clamp(28px, 5vw, 64px)' }}>
            <span data-tina-field={tinaField(h, 'eyebrow')} style={{ fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: '2.4px', color: '#f3c13b' }}>{h.eyebrow}</span>
          </Reveal>
        )}
        <Reveal as="h1" data-tina-field={tinaField(h, 'heading')} style={{ margin: 'clamp(28px, 5vh, 52px) auto 0', maxWidth: 1000, fontFamily: "'Exo', sans-serif", fontWeight: 800, fontSize: 'clamp(34px, 5vw, 80px)', lineHeight: 1.08, color: '#ffffff' }}>
          <HeadingSplit text={h.heading} highlight={h.headingHighlight} />
        </Reveal>
        <Reveal as="p" data-tina-field={tinaField(h, 'subheading')} style={{ margin: 'clamp(24px, 4vh, 40px) auto 0', maxWidth: 900, fontSize: 'clamp(15px, 1.4vw, 23px)', lineHeight: 1.55, color: 'rgba(255,255,255,.88)' }}>
          {h.subheading}
        </Reveal>
        {h.toolsLabel && (
          <div style={{ margin: 'clamp(34px, 6vh, 56px) auto 0', padding: '0 clamp(20px, 5vw, 96px)', display: 'flex', justifyContent: 'center' }}>
            <span data-tina-field={tinaField(h, 'toolsLabel')} style={{ fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(15px, 1.2vw, 20px)', color: '#f6d98d', borderBottom: '2px solid #f6d98d', paddingBottom: 6 }}>
              {h.toolsLabel}
            </span>
          </div>
        )}
      </section>

      <section data-screen-label="Articulos" style={{ background: '#1c1c1c', padding: 'clamp(40px, 6vh, 70px) clamp(20px, 5vw, 96px) clamp(60px, 9vh, 100px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 26, alignItems: 'stretch' }}>
          {tools.map((tool, i) => (
            <article key={i} className="af-tool-card">
              <div style={{ position: 'relative', height: 210, background: tool.logoBackground, overflow: 'hidden' }}>
                {tool.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tool.logo}
                    alt={tool.title}
                    style={{ position: 'absolute', top: 26, right: 30, bottom: 26, left: 30, width: 'calc(100% - 60px)', height: 'calc(100% - 52px)', objectFit: 'contain', display: 'block' }}
                  />
                )}
              </div>
              <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#e6bb52' }}>{tool.category}</span>
                <h2 style={{ margin: 0, fontFamily: "'Exo', sans-serif", fontWeight: 800, fontSize: 21, lineHeight: 1.2, color: '#ffffff' }}>{tool.title}</h2>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,.82)' }}>{tool.description}</p>
                <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid rgba(230,187,82,.18)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 12.5, lineHeight: 1.55, color: 'rgba(230,187,82,.85)' }}>{tool.aboutText}</span>
                  <Link href="/portafolio" className="af-tool-link">
                    Leer artículo
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section data-screen-label="Testimonio" style={{ background: '#1c1c1c', padding: '0 clamp(20px, 5vw, 96px) clamp(60px, 9vh, 110px)' }}>
        <FeaturedTestimonialBanner data={t} />
      </section>

      <section data-screen-label="Formulario" style={{ background: '#222222', padding: 'clamp(60px, 9vh, 110px) clamp(20px, 5vw, 96px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal as="h2" data-tina-field={tinaField(c, 'heading')} style={{ margin: 0, textAlign: 'center', fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.6vw, 58px)', lineHeight: 1.15, color: '#ffffff' }}>
            {c.heading}
          </Reveal>
          <Reveal as="p" data-tina-field={tinaField(c, 'subheading')} style={{ margin: '18px auto 0', maxWidth: 860, textAlign: 'center', fontSize: 'clamp(15px, 1.2vw, 20px)', lineHeight: 1.6, color: 'rgba(255,255,255,.85)' }}>
            {c.subheading}
          </Reveal>
          <div style={{ marginTop: 'clamp(36px, 6vh, 64px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(28px, 4vw, 56px)', alignItems: 'start' }}>
            <ContactInfoBlock settings={settings} showWhatsappCta />
            <QuoteForm whatsappNumber={settings.whatsappNumber} inputStyle="light" />
          </div>
        </div>
      </section>
    </>
  )
}
