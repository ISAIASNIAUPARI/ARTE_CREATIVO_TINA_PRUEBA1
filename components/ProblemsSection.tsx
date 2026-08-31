'use client'

import { useEffect, useRef, useState } from 'react'
import { tinaField } from '@/lib/tinaField'
import Reveal from './Reveal'

const ICON = (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 9l2 2M10 9l-2 2M14 9l2 2M16 9l-2 2" />
    <circle cx="12" cy="16" r="1.6" />
  </svg>
)

const TAPE_ROW = Array.from({ length: 14 })

type ProblemsData = {
  heading: string
  subheading?: string | null
  items: ({ title: string; text: string } | null)[]
  tapeText?: string | null
}

/** Sección "Problemas" de Inicio, con la cinta de PELIGRO ligada al scroll. */
export default function ProblemsSection({ data, showTape }: { data: ProblemsData; showTape: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!showTape) return
    let raf = 0
    const read = () => {
      const sec = sectionRef.current
      if (!sec) return
      const r = sec.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const d = r.bottom - vh
      const start = vh * 0.85
      const end = vh * 0.05
      const p = Math.max(0, Math.min(1, (start - d) / (start - end)))
      setProgress((prev) => (Math.abs(p - prev) > 0.005 ? p : prev))
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        read()
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    window.addEventListener('resize', onScroll, { passive: true })
    const tick = setInterval(read, 250)
    read()
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
      clearInterval(tick)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [showTape])

  const tapeOpacity = Math.min(1, progress * 1.5)
  const tapeOffset = Math.round((1 - progress) * 260)
  const tapeText = data.tapeText || '- PELIGRO'
  const items = (data.items || []).filter(Boolean) as { title: string; text: string }[]

  return (
    <section
      ref={sectionRef}
      data-screen-label="Problemas"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1c1c1c 0%, #181818 60%, #131313 100%)',
        padding: 'clamp(70px, 10vh, 130px) clamp(20px, 5vw, 96px) clamp(210px, 20vh, 240px)',
      }}
    >
      {showTape && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-8%',
            right: '-8%',
            bottom: 'clamp(-40px, -4vw, -10px)',
            top: 'auto',
            height: 'clamp(180px, 30vw, 420px)',
            pointerEvents: 'none',
            zIndex: 3,
            willChange: 'transform, opacity',
            transition: 'opacity .12s linear, transform .12s linear',
            opacity: tapeOpacity,
            transform: `translateY(${tapeOffset}px)`,
          }}
        >
          <div className="af-tape" style={{ top: 'clamp(6px, 3vw, 40px)', transform: 'rotate(9deg)' }}>
            <div className="af-tape-row">
              {TAPE_ROW.map((_, i) => (
                <span key={i}>{tapeText}</span>
              ))}
            </div>
          </div>
          <div className="af-tape" style={{ top: 'clamp(90px, 15vw, 210px)', transform: 'rotate(-9deg)' }}>
            <div className="af-tape-row">
              {TAPE_ROW.map((_, i) => (
                <span key={i}>{tapeText}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 4, maxWidth: 1200, margin: '0 auto' }}>
        <Reveal
          as="h2"
          data-tina-field={tinaField(data, 'heading')}
          style={{ margin: 0, textAlign: 'center', fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(32px, 4.4vw, 76px)', lineHeight: 1.1, color: '#ffffff' }}
        >
          {data.heading}
        </Reveal>
        {data.subheading && (
          <Reveal
            as="p"
            data-tina-field={tinaField(data, 'subheading')}
            style={{ margin: '22px auto 0', maxWidth: 900, textAlign: 'center', fontSize: 'clamp(15px, 1.35vw, 24px)', lineHeight: 1.5, color: 'rgba(255,255,255,.9)' }}
          >
            {data.subheading}
          </Reveal>
        )}

        <div style={{ marginTop: 'clamp(34px, 5vh, 56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 24 }}>
          {items.map((item, i) => (
            <Reveal key={i} className="af-problem-card">
              <div style={{ width: 56, height: 56, borderRadius: 8, background: 'rgba(230,187,82,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f3c13b' }}>
                {ICON}
              </div>
              <h3 data-tina-field={tinaField(item, 'title')} style={{ margin: '26px 0 0', fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 'clamp(21px, 1.7vw, 27px)', color: '#ffffff' }}>
                {item.title}
              </h3>
              <p data-tina-field={tinaField(item, 'text')} style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,.78)' }}>
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

    </section>
  )
}
