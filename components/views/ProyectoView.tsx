'use client'

import Link from 'next/link'
import { useTina } from 'tinacms/dist/react'
import { tinaField } from '@/lib/tinaField'
import type { TinaDoc } from '@/lib/loadDoc'
import type { SiteSettings, Project } from '@/lib/types'
import Reveal from '@/components/Reveal'
import QuoteForm from '@/components/QuoteForm'
import ContactInfoBlock from '@/components/ContactInfoBlock'

type Cta = { heading: string; subheading: string }

export default function ProyectoView({
  project,
  related,
  cta,
  settings,
}: {
  project: TinaDoc<{ project: Project }>
  related: Project[]
  cta: TinaDoc<{ contactCta: Cta }>
  settings: SiteSettings
}) {
  const p = useTina(project).data.project
  const c = useTina(cta).data.contactCta

  const story = (p.story || []).filter(Boolean) as { parrafo: string }[]
  const benefits = (p.benefits || []).filter(Boolean) as { title: string; text: string }[]

  return (
    <>
      <section data-screen-label="Hero caso" style={{ background: 'linear-gradient(180deg, #1c1c1c 0%, #161616 100%)', padding: 'clamp(140px, 20vh, 210px) clamp(20px, 5vw, 96px) clamp(50px, 7vh, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <Reveal style={{ fontSize: 13, letterSpacing: '.5px', color: 'rgba(255,255,255,.6)' }}>
            <Link href="/portafolio" style={{ color: 'rgba(255,255,255,.6)' }}>
              Portafolio
            </Link>{' '}
            » <span style={{ color: '#f3c13b' }}>{p.service}</span>
          </Reveal>
          <Reveal as="h1" delay={80} data-tina-field={tinaField(p, 'title')} style={{ margin: '18px 0 0', fontFamily: "'Exo', sans-serif", fontWeight: 800, fontSize: 'clamp(30px, 4.6vw, 62px)', lineHeight: 1.12, color: '#ffffff' }}>
            {p.title}
          </Reveal>
        </div>
      </section>

      <section data-screen-label="Detalle" style={{ background: '#1c1c1c', padding: '0 clamp(20px, 5vw, 96px) clamp(60px, 9vh, 100px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(28px, 4vw, 56px)', alignItems: 'start' }}>
          <Reveal>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.8 }}>
              <strong style={{ color: '#f3c13b' }}>Servicio:</strong> <span data-tina-field={tinaField(p, 'service')}>{p.service}</span>
            </p>
            <p style={{ margin: '16px 0 0', fontSize: 17, lineHeight: 1.8 }}>
              <strong style={{ color: '#f3c13b' }}>Empresa:</strong> {p.title}
            </p>
            <p style={{ margin: '16px 0 0', fontSize: 17, lineHeight: 1.8 }}>
              <strong style={{ color: '#f3c13b' }}>Objetivo:</strong> <span data-tina-field={tinaField(p, 'objective')}>{p.objective}</span>
            </p>
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 4, color: '#f3c13b', fontSize: 20, letterSpacing: '2px' }}>★★★★★</div>
          </Reveal>
          <Reveal delay={100} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(230,187,82,.2)', maxHeight: 620 }}>
            {p.caseImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.caseImage}
                alt={p.title}
                style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover', objectPosition: 'top center' }}
              />
            )}
          </Reveal>
        </div>

        <div style={{ maxWidth: 900, margin: 'clamp(40px, 6vh, 64px) auto 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {story.map((para, i) => (
            <Reveal key={i} as="p" style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,.85)' }}>
              {para.parrafo}
            </Reveal>
          ))}

          {benefits.length > 0 && (
            <>
              <Reveal as="h2" style={{ margin: '24px 0 0', fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(24px, 2.6vw, 36px)', color: '#ffffff' }}>
                Beneficios del Proyecto
              </Reveal>
              {benefits.map((b, i) => (
                <Reveal key={i} as="p" style={{ margin: 0, fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,.85)' }}>
                  <strong data-tina-field={tinaField(b, 'title')} style={{ color: '#ffffff' }}>{b.title}:</strong>{' '}
                  <span data-tina-field={tinaField(b, 'text')}>{b.text}</span>
                </Reveal>
              ))}
            </>
          )}
        </div>

        <div style={{ maxWidth: 900, margin: 'clamp(48px, 7vh, 72px) auto 0', textAlign: 'center' }}>
          <Reveal as="h3" data-tina-field={tinaField(p, 'closingQuestion')} style={{ margin: 0, fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(22px, 2.6vw, 34px)', lineHeight: 1.3, color: '#ffffff' }}>
            {p.closingQuestion}
          </Reveal>
          <Reveal as="p" data-tina-field={tinaField(p, 'closingSubtext')} style={{ margin: '14px 0 0', fontSize: 17, color: 'rgba(255,255,255,.75)' }}>
            {p.closingSubtext}
          </Reveal>
          <Reveal
            as="a"
            href={settings.whatsappShortLink}
            target="_blank"
            rel="noopener"
            className="af-closing-cta"
            style={{
              display: 'inline-block',
              marginTop: 24,
              background: '#e6bb52',
              color: '#161616',
              fontFamily: "'Exo', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: '.6px',
              padding: '16px 34px',
              borderRadius: 99,
              transition: 'background .3s ease',
            }}
          >
            Haz clic aquí y hablemos de tu proyecto
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section data-screen-label="Mas proyectos" style={{ background: '#161616', padding: 'clamp(50px, 7vh, 80px) clamp(20px, 5vw, 96px)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Reveal as="h2" style={{ margin: 0, textAlign: 'center', fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(24px, 2.8vw, 40px)', color: '#ffffff' }}>
              Más proyectos
            </Reveal>
            <div style={{ marginTop: 'clamp(28px, 4vh, 44px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              {related.map((rp) => (
                <Link key={rp.slug} href={`/proyecto/${rp.slug}`} className="af-related-card">
                  <div style={{ aspectRatio: '3 / 4', borderRadius: '3px 3px 0 0', overflow: 'hidden', border: '1px solid rgba(0,0,0,.35)', borderBottom: 0, background: '#ffffff' }}>
                    {rp.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={rp.image} alt={rp.title} loading="lazy" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
            <QuoteForm whatsappNumber={settings.whatsappNumber} inputStyle="light" />
          </div>
        </div>
      </section>
    </>
  )
}
