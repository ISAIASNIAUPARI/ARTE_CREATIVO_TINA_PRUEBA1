'use client'

import { useTina } from 'tinacms/dist/react'
import { tinaField } from '@/lib/tinaField'
import type { TinaDoc } from '@/lib/loadDoc'
import type { SiteSettings, Project } from '@/lib/types'
import Reveal from '@/components/Reveal'
import TagMarquee from '@/components/TagMarquee'
import HeadingSplit from '@/components/HeadingSplit'
import PortfolioGrid from '@/components/PortfolioGrid'
import FeaturedTestimonialBanner from '@/components/FeaturedTestimonialBanner'
import QuoteForm from '@/components/QuoteForm'
import ContactInfoBlock from '@/components/ContactInfoBlock'

type Hero = { eyebrow?: string | null; heading: string; headingHighlight?: string | null; subheading: string; tags?: (string | null)[] | null }
type Testi = { quote: string; author: string; ctaLabel: string }
type Cta = { heading: string; subheading: string }

export default function PortafolioView({
  hero,
  testimonial,
  cta,
  settings,
  projects,
}: {
  hero: TinaDoc<{ portfolioHero: Hero }>
  testimonial: TinaDoc<{ featuredTestimonial: Testi }>
  cta: TinaDoc<{ contactPageCta: Cta }>
  settings: SiteSettings
  projects: Project[]
}) {
  const h = useTina(hero).data.portfolioHero
  const t = useTina(testimonial).data.featuredTestimonial
  const c = useTina(cta).data.contactPageCta
  const tags = (h.tags || []).filter(Boolean) as string[]

  return (
    <>
      <section data-screen-label="Portafolio hero" style={{ background: '#1c1c1c', padding: 'clamp(140px, 20vh, 210px) clamp(20px, 5vw, 96px) 0', textAlign: 'center' }}>
        {h.eyebrow && (
          <Reveal style={{ display: 'inline-block', border: '1px solid rgba(230,187,82,.4)', background: 'rgba(22,22,22,.45)', borderRadius: 8, padding: '14px clamp(28px, 5vw, 60px)' }}>
            <span data-tina-field={tinaField(h, 'eyebrow')} style={{ fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: '2.4px', color: '#f3c13b' }}>{h.eyebrow}</span>
          </Reveal>
        )}
        <Reveal as="h1" data-tina-field={tinaField(h, 'heading')} style={{ margin: 'clamp(28px, 5vh, 52px) auto 0', maxWidth: 1300, fontFamily: "'Exo', sans-serif", fontWeight: 800, fontSize: 'clamp(34px, 5.2vw, 84px)', lineHeight: 1.08, color: '#ffffff' }}>
          <HeadingSplit text={h.heading} highlight={h.headingHighlight} />
        </Reveal>
        <Reveal as="p" data-tina-field={tinaField(h, 'subheading')} style={{ margin: 'clamp(24px, 4vh, 42px) auto 0', maxWidth: 1150, fontSize: 'clamp(15px, 1.4vw, 24px)', lineHeight: 1.5, color: 'rgba(255,255,255,.9)' }}>
          {h.subheading}
        </Reveal>
      </section>

      <section data-screen-label="Grid de proyectos" style={{ background: '#1c1c1c', padding: 'clamp(36px, 6vh, 60px) clamp(20px, 5vw, 96px) clamp(60px, 9vh, 100px)' }}>
        <PortfolioGrid projects={projects} />
        <FeaturedTestimonialBanner data={t} />
      </section>

      {tags.length > 0 && (
        <div style={{ background: '#222222', overflow: 'hidden', padding: '20px 0' }}>
          <TagMarquee>
            {tags.map((tag, i) => (
              <span key={i}>{tag} •</span>
            ))}
          </TagMarquee>
        </div>
      )}

      <section data-screen-label="Formulario" style={{ background: '#1a1a1a', padding: 'clamp(60px, 9vh, 110px) clamp(20px, 5vw, 96px)' }}>
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
