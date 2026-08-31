'use client'

import { tinaField } from '@/lib/tinaField'
import Reveal from './Reveal'
import Marquee from './Marquee'
import type { Testimonial } from '@/lib/types'

function Card({ t }: { t: Testimonial }) {
  return (
    <div
      style={{
        flex: '0 0 auto',
        width: 'clamp(150px, 40vw, 340px)',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,.08)',
        background: '#141414',
        padding: 'clamp(10px, 2.6vw, 26px) clamp(9px, 2.4vw, 24px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
      }}
    >
      <span data-tina-field={tinaField(t, 'company')} style={{ fontSize: 'clamp(7px, 1.9vw, 11px)', fontWeight: 700, letterSpacing: '.3px', color: '#e6bb52' }}>
        {t.company}
      </span>
      <span data-tina-field={tinaField(t, 'name')} style={{ fontFamily: "'Exo', sans-serif", fontSize: 'clamp(12px, 3.4vw, 22px)', fontWeight: 700, color: '#ffffff' }}>
        {t.name}
      </span>
      <span style={{ fontSize: 'clamp(9px, 2.6vw, 17px)', letterSpacing: '2px', color: '#f3c13b' }}>★★★★★</span>
      <p data-tina-field={tinaField(t, 'text')} style={{ margin: 0, fontSize: 'clamp(8.5px, 2.2vw, 13.5px)', lineHeight: 1.5, textAlign: 'justify', color: 'rgba(255,255,255,.8)' }}>
        {t.text}
      </p>
    </div>
  )
}

export default function ResultsSection({
  data,
}: {
  data: { heading: string; testimonials: (Testimonial | null)[] }
}) {
  const testimonials = (data.testimonials || []).filter(Boolean) as Testimonial[]
  const reversed = [...testimonials].reverse()
  return (
    <section id="resultados" data-screen-label="Resultados" style={{ background: '#0e0e0e', padding: 'clamp(60px, 9vh, 110px) 0', overflow: 'hidden' }}>
      <Reveal
        as="h2"
        data-tina-field={tinaField(data, 'heading')}
        style={{ margin: '0 clamp(20px, 5vw, 96px) clamp(34px, 5vh, 56px)', textAlign: 'center', fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(30px, 3.6vw, 58px)', color: '#ffffff' }}
      >
        {data.heading}
      </Reveal>

      <div style={{ overflow: 'hidden', marginBottom: 20 }}>
        <Marquee speed={35} speedMobile={14} gap={20}>
          {testimonials.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </Marquee>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <Marquee speed={35} speedMobile={14} gap={20} reverse>
          {reversed.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
