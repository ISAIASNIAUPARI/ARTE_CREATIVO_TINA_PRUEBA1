'use client'

import Link from 'next/link'
import { useTina } from 'tinacms/dist/react'
import { tinaField } from '@/lib/tinaField'
import type { TinaDoc } from '@/lib/loadDoc'
import type { SiteSettings, HeroContent, ProblemsContent, AboutContent, Testimonial, Project } from '@/lib/types'
import Reveal from '@/components/Reveal'
import Marquee from '@/components/Marquee'
import HeadingSplit from '@/components/HeadingSplit'
import ProblemsSection from '@/components/ProblemsSection'
import PortfolioCarousel from '@/components/PortfolioCarousel'
import ResultsSection from '@/components/ResultsSection'
import TiltImage from '@/components/TiltImage'
import QuoteForm from '@/components/QuoteForm'
import ContactInfoBlock from '@/components/ContactInfoBlock'

type PortfolioIntro = { heading: string; intro?: string | null; ctaLabel?: string | null }
type Cta = { heading: string; subheading: string }

export default function HomeView({
  hero,
  problems,
  portfolioIntro,
  about,
  results,
  cta,
  settings,
  projects,
}: {
  hero: TinaDoc<{ homeHero: HeroContent }>
  problems: TinaDoc<{ homeProblems: ProblemsContent }>
  portfolioIntro: TinaDoc<{ homePortfolioIntro: PortfolioIntro }>
  about: TinaDoc<{ homeAbout: AboutContent }>
  results: TinaDoc<{ homeResults: { heading: string; testimonials: (Testimonial | null)[] } }>
  cta: TinaDoc<{ contactCta: Cta }>
  settings: SiteSettings
  projects: Project[]
}) {
  const h = useTina(hero).data.homeHero
  const p = useTina(problems).data.homeProblems
  const pf = useTina(portfolioIntro).data.homePortfolioIntro
  const a = useTina(about).data.homeAbout
  const r = useTina(results).data.homeResults
  const c = useTina(cta).data.contactCta

  const tags = (h.tags || []).filter(Boolean) as string[]
  const points = (a.points || []).filter(Boolean) as string[]

  return (
    <>
      <section
        id="inicio"
        data-screen-label="Hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '130px clamp(20px, 5vw, 96px) 74px',
          overflow: 'hidden',
          background: '#0d0d0d',
        }}
      >
        {h.heroVideo && (
          <video
            src={h.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(5,5,5,.72) 0%, rgba(8,8,8,.45) 40%, rgba(7,7,7,.85) 100%)',
            pointerEvents: 'none',
          }}
        />

        <Reveal
          style={{
            position: 'relative',
            border: '1px solid rgba(230,187,82,.55)',
            background: 'rgba(40,40,40,.45)',
            borderRadius: 10,
            padding: '12px clamp(24px, 3.4vw, 48px)',
            marginBottom: 'clamp(22px, 4vh, 44px)',
          }}
        >
          <h2
            data-tina-field={tinaField(h, 'eyebrow')}
            style={{ margin: 0, fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(16px, 1.5vw, 23px)', lineHeight: 1.3, color: '#f3c13b' }}
          >
            {h.eyebrow.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal
          as="h1"
          data-tina-field={tinaField(h, 'heading')}
          style={{
            position: 'relative',
            margin: 0,
            maxWidth: 1560,
            fontFamily: "'Exo', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(42px, 7.4vw, 124px)',
            lineHeight: 1.02,
            letterSpacing: '-1px',
            color: '#ffffff',
            textWrap: 'balance',
          }}
        >
          <HeadingSplit text={h.heading} highlight={h.headingHighlight} />
        </Reveal>

        <Reveal
          as="p"
          data-tina-field={tinaField(h, 'subheading')}
          style={{ position: 'relative', margin: 'clamp(30px, 5.5vh, 62px) 0 0', maxWidth: 1320, fontSize: 'clamp(15px, 1.35vw, 23px)', lineHeight: 1.45, color: 'rgba(255,255,255,.92)' }}
        >
          {h.subheading}
        </Reveal>

        <Reveal
          as="a"
          href={settings.whatsappShortLink}
          target="_blank"
          rel="noopener"
          className="af-hero-cta"
          data-tina-field={tinaField(h, 'ctaLabel')}
          style={{
            position: 'relative',
            marginTop: 'clamp(20px, 3.2vh, 34px)',
            background: '#e6bb52',
            color: '#161616',
            fontFamily: "'Exo', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '1.2px',
            padding: '14px 26px',
            borderRadius: 4,
            transition: 'transform .3s ease, background .3s ease',
            display: 'inline-block',
          }}
        >
          {h.ctaLabel}
        </Reveal>
      </section>

      {tags.length > 0 && (
        <div style={{ background: '#222222', overflow: 'hidden', padding: '20px 0', borderTop: '1px solid rgba(255,255,255,.05)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
          <Marquee speed={55} gap={50}>
            {tags.map((tag, i) => (
              <span
                key={i}
                style={{ fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(.9rem, 1.1vw, 1.2rem)', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#e6bb52', whiteSpace: 'nowrap' }}
              >
                {tag} •
              </span>
            ))}
          </Marquee>
        </div>
      )}

      <ProblemsSection data={p} showTape={!!settings.showDangerTape} />

      <section id="portafolio" data-screen-label="Proyectos" style={{ background: '#0e0e0e', padding: 'clamp(70px, 10vh, 120px) clamp(20px, 5vw, 96px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 28 }}>
            <div style={{ maxWidth: 720 }}>
              <Reveal as="h2" data-tina-field={tinaField(pf, 'heading')} style={{ margin: 0, fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(30px, 3.6vw, 58px)', lineHeight: 1.12, color: '#ffffff' }}>
                {pf.heading}
              </Reveal>
              {pf.intro && (
                <Reveal as="p" delay={90} data-tina-field={tinaField(pf, 'intro')} style={{ margin: '18px 0 0', fontSize: 'clamp(15px, 1.2vw, 19px)', lineHeight: 1.6, color: 'rgba(255,255,255,.72)' }}>
                  {pf.intro}
                </Reveal>
              )}
            </div>
            <Reveal delay={180}>
              <Link href="/portafolio" className="af-portfolio-cta" data-tina-field={tinaField(pf, 'ctaLabel')}>
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M10 8l5 4-5 4z" />
                </svg>
                {pf.ctaLabel || 'Ver todos los proyectos'}
              </Link>
            </Reveal>
          </div>

          <PortfolioCarousel projects={projects} autoplay={!!settings.carouselAutoplay} />
        </div>
      </section>

      <section id="sobre-mi" data-screen-label="Sobre mi" style={{ background: 'linear-gradient(180deg, #131313 0%, #1c1c1c 100%)', padding: 'clamp(60px, 9vh, 110px) clamp(20px, 5vw, 96px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'center' }}>
          <div>
            <Reveal style={{ display: 'block' }}>
              <Link href="/nosotros" className="af-about-eyebrow" data-tina-field={tinaField(a, 'eyebrow')}>
                {a.eyebrow}
              </Link>
            </Reveal>
            <Reveal as="h2" delay={80} data-tina-field={tinaField(a, 'heading')} style={{ margin: '18px 0 0', fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(30px, 3.6vw, 56px)', lineHeight: 1.12, color: '#ffffff' }}>
              {a.heading}
            </Reveal>
            <Reveal as="p" delay={160} data-tina-field={tinaField(a, 'text')} style={{ margin: '22px 0 0', fontSize: 'clamp(15px, 1.2vw, 19px)', lineHeight: 1.7, color: 'rgba(255,255,255,.85)' }}>
              {a.text}
            </Reveal>
            <Reveal delay={240} style={{ marginTop: 30, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px 28px' }}>
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
          </div>
          <Reveal style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {a.photo && <TiltImage src={a.photo} alt="Isaías Anrrango, diseñador web freelance en Quito" />}
            {(a.badgeNumber || a.badgeLabel) && (
              <div
                style={{
                  position: 'absolute',
                  right: '2%',
                  bottom: '8%',
                  background: '#f6d98d',
                  color: '#161616',
                  borderRadius: 12,
                  padding: '16px 30px',
                  textAlign: 'center',
                  transform: 'rotate(-3deg)',
                  boxShadow: '0 14px 32px rgba(0,0,0,.35)',
                }}
              >
                <div data-tina-field={tinaField(a, 'badgeNumber')} style={{ fontFamily: "'Exo', sans-serif", fontWeight: 800, fontSize: 'clamp(22px, 2.2vw, 34px)', lineHeight: 1 }}>{a.badgeNumber}</div>
                <div data-tina-field={tinaField(a, 'badgeLabel')} style={{ marginTop: 6, fontFamily: "'Exo', sans-serif", fontWeight: 600, fontSize: 'clamp(11px, 1vw, 15px)', letterSpacing: '1.2px' }}>{a.badgeLabel}</div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <ResultsSection data={r} />

      <section id="contacto" data-screen-label="Contacto" style={{ background: 'linear-gradient(180deg, #1c1c1c 0%, #101010 100%)', padding: 'clamp(60px, 9vh, 110px) clamp(20px, 5vw, 96px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal as="h3" data-tina-field={tinaField(c, 'heading')} style={{ margin: 0, textAlign: 'center', fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 3.4vw, 54px)', lineHeight: 1.15, color: '#ffffff' }}>
            {c.heading}
          </Reveal>
          <Reveal as="p" data-tina-field={tinaField(c, 'subheading')} style={{ margin: '18px auto 0', maxWidth: 780, textAlign: 'center', fontSize: 'clamp(15px, 1.2vw, 20px)', lineHeight: 1.6, color: 'rgba(255,255,255,.85)' }}>
            {c.subheading}
          </Reveal>

          <div style={{ marginTop: 'clamp(36px, 6vh, 64px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(28px, 4vw, 56px)', alignItems: 'start' }}>
            <ContactInfoBlock settings={settings} showWhatsappCta={false} />
            <QuoteForm whatsappNumber={settings.whatsappNumber} inputStyle="dark" cardWrapper showErrorSlot />
          </div>
        </div>
      </section>
    </>
  )
}
