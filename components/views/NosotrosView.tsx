'use client'

import { useTina } from 'tinacms/dist/react'
import { tinaField } from '@/lib/tinaField'
import type { TinaDoc } from '@/lib/loadDoc'
import type { SiteSettings } from '@/lib/types'
import Reveal from '@/components/Reveal'
import TagMarquee from '@/components/TagMarquee'
import HeadingSplit from '@/components/HeadingSplit'
import TiltImage from '@/components/TiltImage'
import QuoteForm from '@/components/QuoteForm'
import ContactInfoBlock from '@/components/ContactInfoBlock'

type Hero = { eyebrow?: string | null; heading: string; headingHighlight?: string | null; text: string; tags?: (string | null)[] | null }
type Pillars = { heading: string; subheading?: string | null; items: ({ title: string; text: string } | null)[] }
type WorkStyle = { heading: string; items: ({ highlight: string; text: string } | null)[] }
type Bio = {
  heading: string
  text: string
  points?: (string | null)[] | null
  ctaLabel: string
  photo: string
  badgeNumber?: string | null
  badgeLabel?: string | null
}
type Cta = { heading: string; subheading: string }

const PILLAR_ICONS = [
  <svg key="a" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.9 1.8-1.8 0-1.5 1-2.2 2.2-2.2H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3z" />
    <circle cx="8.5" cy="10.5" r="1.1" />
    <circle cx="12" cy="8" r="1.1" />
    <circle cx="15.5" cy="10.5" r="1.1" />
  </svg>,
  <svg key="b" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 8l-4 4 4 4" />
    <path d="M15 8l4 4-4 4" />
  </svg>,
  <svg key="c" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 17l5-5 3 3 4-6 4 4" />
    <path d="M4 20h16" />
  </svg>,
]

export default function NosotrosView({
  hero,
  pillars,
  workStyle,
  bio,
  cta,
  settings,
}: {
  hero: TinaDoc<{ nosotrosHero: Hero }>
  pillars: TinaDoc<{ nosotrosPillars: Pillars }>
  workStyle: TinaDoc<{ nosotrosWorkStyle: WorkStyle }>
  bio: TinaDoc<{ nosotrosBio: Bio }>
  cta: TinaDoc<{ contactCta: Cta }>
  settings: SiteSettings
}) {
  const h = useTina(hero).data.nosotrosHero
  const pl = useTina(pillars).data.nosotrosPillars
  const ws = useTina(workStyle).data.nosotrosWorkStyle
  const b = useTina(bio).data.nosotrosBio
  const c = useTina(cta).data.contactCta

  const tags = (h.tags || []).filter(Boolean) as string[]
  const pillarItems = (pl.items || []).filter(Boolean) as { title: string; text: string }[]
  const steps = (ws.items || []).filter(Boolean) as { highlight: string; text: string }[]
  const points = (b.points || []).filter(Boolean) as string[]

  return (
    <>
      <section
        data-screen-label="Mi historia"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0f0f0f 0%, #161616 55%, #2c2c2c 100%)',
          padding: 'clamp(140px, 22vh, 240px) clamp(20px, 5vw, 96px) clamp(70px, 12vh, 140px)',
          textAlign: 'center',
        }}
      >
        <Reveal style={{ display: 'inline-block', border: '1px solid rgba(230,187,82,.35)', background: 'rgba(40,40,40,.35)', borderRadius: 8, padding: '14px clamp(28px, 5vw, 64px)' }}>
          <span data-tina-field={tinaField(h, 'eyebrow')} style={{ fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: '2.4px', color: '#f3c13b' }}>{h.eyebrow}</span>
        </Reveal>
        <Reveal as="h1" data-tina-field={tinaField(h, 'heading')} style={{ margin: 'clamp(30px, 5vh, 56px) auto 0', maxWidth: 1100, fontFamily: "'Exo', sans-serif", fontWeight: 800, fontSize: 'clamp(34px, 5.2vw, 84px)', lineHeight: 1.08, color: '#ffffff' }}>
          <HeadingSplit text={h.heading} highlight={h.headingHighlight} />
        </Reveal>
        <Reveal as="p" data-tina-field={tinaField(h, 'text')} style={{ margin: 'clamp(26px, 4vh, 44px) auto 0', maxWidth: 1180, fontSize: 'clamp(16px, 1.5vw, 25px)', lineHeight: 1.5, color: 'rgba(255,255,255,.9)' }}>
          {h.text}
        </Reveal>
      </section>

      {tags.length > 0 && (
        <div style={{ background: '#222222', overflow: 'hidden', padding: '20px 0', borderTop: '1px solid rgba(255,255,255,.05)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
          <TagMarquee>
            {tags.map((tag, i) => (
              <span key={i}>{tag} •</span>
            ))}
          </TagMarquee>
        </div>
      )}

      <section data-screen-label="Pilares" style={{ background: 'linear-gradient(180deg, #1c1c1c 0%, #181818 100%)', padding: 'clamp(70px, 10vh, 130px) clamp(20px, 5vw, 96px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal as="h2" data-tina-field={tinaField(pl, 'heading')} style={{ margin: 0, textAlign: 'center', fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(32px, 4.4vw, 76px)', lineHeight: 1.1, color: '#ffffff' }}>
            {pl.heading}
          </Reveal>
          {pl.subheading && (
            <Reveal as="p" data-tina-field={tinaField(pl, 'subheading')} style={{ margin: '22px auto 0', maxWidth: 900, textAlign: 'center', fontSize: 'clamp(15px, 1.35vw, 24px)', lineHeight: 1.5, color: 'rgba(255,255,255,.9)' }}>
              {pl.subheading}
            </Reveal>
          )}
          <div style={{ marginTop: 'clamp(34px, 5vh, 56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 24 }}>
            {pillarItems.map((item, i) => (
              <Reveal key={i} className="af-pillar-card">
                <div style={{ width: 56, height: 56, borderRadius: 8, background: 'rgba(230,187,82,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f3c13b' }}>
                  {PILLAR_ICONS[i % PILLAR_ICONS.length]}
                </div>
                <h3 data-tina-field={tinaField(item, 'title')} style={{ margin: '26px 0 0', fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(21px, 1.7vw, 27px)', color: '#ffffff' }}>{item.title}</h3>
                <p data-tina-field={tinaField(item, 'text')} style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.6, textAlign: 'justify', color: 'rgba(255,255,255,.78)' }}>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="Forma de trabajar" style={{ background: '#2c2c2c', padding: 'clamp(60px, 9vh, 110px) clamp(20px, 5vw, 96px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <Reveal as="h2" data-tina-field={tinaField(ws, 'heading')} style={{ margin: 0, fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(30px, 4.2vw, 68px)', lineHeight: 1.1, color: '#ffffff' }}>
            {ws.heading}
          </Reveal>
          <div style={{ marginTop: 'clamp(24px, 4vh, 40px)', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {steps.map((step, i) => (
              <Reveal key={i} as="p" style={{ margin: 0, fontSize: 'clamp(15px, 1.3vw, 20px)', lineHeight: 1.5, color: 'rgba(255,255,255,.92)' }}>
                <strong data-tina-field={tinaField(step, 'highlight')} style={{ color: '#ffffff' }}>{step.highlight}</strong>{' '}
                <span data-tina-field={tinaField(step, 'text')}>{step.text}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="Socio estrategico" style={{ background: 'linear-gradient(180deg, #131313 0%, #1c1c1c 100%)', padding: 'clamp(60px, 9vh, 110px) clamp(20px, 5vw, 96px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'center' }}>
          <div>
            <Reveal as="h2" data-tina-field={tinaField(b, 'heading')} style={{ margin: 0, fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(30px, 3.6vw, 56px)', lineHeight: 1.12, color: '#ffffff' }}>
              {b.heading}
            </Reveal>
            <Reveal as="p" delay={90} data-tina-field={tinaField(b, 'text')} style={{ margin: '22px 0 0', fontSize: 'clamp(15px, 1.2vw, 19px)', lineHeight: 1.7, color: 'rgba(255,255,255,.85)' }}>
              {b.text}
            </Reveal>
            <Reveal delay={180} style={{ marginTop: 30, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px 28px' }}>
              {points.map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, color: '#ffffff' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#f3c13b" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12.5l2.6 2.6L16 9.7" />
                  </svg>
                  {point}
                </div>
              ))}
            </Reveal>
            <Reveal
              as="a"
              delay={260}
              href="/contacto"
              className="af-bio-cta"
              data-tina-field={tinaField(b, 'ctaLabel')}
              style={{
                display: 'inline-block',
                marginTop: 32,
                background: '#e6bb52',
                color: '#161616',
                fontFamily: "'Exo', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '1.2px',
                padding: '15px 26px',
                borderRadius: 4,
                transition: 'transform .3s ease, background .3s ease',
              }}
            >
              {b.ctaLabel}
            </Reveal>
          </div>
          <Reveal style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {b.photo && <TiltImage src={b.photo} alt="Isaías Anrrango, diseñador web freelance en Quito" />}
            {(b.badgeNumber || b.badgeLabel) && (
              <div style={{ position: 'absolute', right: '2%', bottom: '8%', background: '#f6d98d', color: '#161616', borderRadius: 12, padding: '16px 30px', textAlign: 'center', transform: 'rotate(-3deg)', boxShadow: '0 14px 32px rgba(0,0,0,.35)' }}>
                <div data-tina-field={tinaField(b, 'badgeNumber')} style={{ fontFamily: "'Exo', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 2.2vw, 34px)', lineHeight: 1 }}>{b.badgeNumber}</div>
                <div data-tina-field={tinaField(b, 'badgeLabel')} style={{ marginTop: 6, fontFamily: "'Exo', sans-serif", fontWeight: 600, fontSize: 'clamp(11px, 1vw, 15px)', letterSpacing: '1.2px' }}>{b.badgeLabel}</div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section data-screen-label="Formulario" style={{ background: '#181818', padding: 'clamp(60px, 9vh, 110px) clamp(20px, 5vw, 96px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal as="h2" data-tina-field={tinaField(c, 'heading')} style={{ margin: 0, textAlign: 'center', fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.4vw, 54px)', lineHeight: 1.15, color: '#ffffff' }}>
            {c.heading}
          </Reveal>
          <Reveal as="p" data-tina-field={tinaField(c, 'subheading')} style={{ margin: '18px auto 0', maxWidth: 780, textAlign: 'center', fontSize: 'clamp(15px, 1.2vw, 20px)', lineHeight: 1.6, color: 'rgba(255,255,255,.82)' }}>
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
