'use client'

import { tinaField } from '@/lib/tinaField'
import Reveal from './Reveal'

export default function FeaturedTestimonialBanner({
  data,
}: {
  data: { quote: string; author: string; ctaLabel: string }
}) {
  return (
    <div
      style={{
        maxWidth: 1320,
        margin: 'clamp(40px, 7vh, 80px) auto 0',
        background: '#f6d98d',
        borderRadius: 12,
        padding: 'clamp(30px, 4vw, 60px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 32,
        alignItems: 'center',
      }}
    >
      <div>
        <Reveal style={{ fontSize: 22, letterSpacing: '12px', color: '#1c1c1c' }}>★★★★★</Reveal>
        <Reveal
          as="p"
          delay={90}
          data-tina-field={tinaField(data, 'quote')}
          style={{ margin: '26px 0 0', maxWidth: 620, fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(22px, 2.4vw, 38px)', lineHeight: 1.25, color: '#1c1c1c' }}
        >
          &ldquo;{data.quote}&rdquo;
        </Reveal>
        <Reveal as="p" delay={170} data-tina-field={tinaField(data, 'author')} style={{ margin: '18px 0 0', fontSize: 16, color: 'rgba(24,24,24,.8)' }}>
          {data.author}
        </Reveal>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Reveal
          as="a"
          delay={250}
          href="/contacto"
          className="af-testimonial-cta"
          data-tina-field={tinaField(data, 'ctaLabel')}
          style={{
            background: '#1c1c1c',
            color: '#f6d98d',
            fontFamily: "'Exo', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(15px, 1.3vw, 19px)',
            padding: '20px 32px',
            borderRadius: 8,
            boxShadow: '0 10px 26px rgba(40,40,40,.35)',
            transition: 'transform .3s ease, background .3s ease',
          }}
        >
          {data.ctaLabel}
        </Reveal>
      </div>
    </div>
  )
}
