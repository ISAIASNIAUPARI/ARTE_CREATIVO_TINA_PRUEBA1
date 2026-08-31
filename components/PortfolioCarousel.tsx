'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import type { Project } from '@/lib/types'

/** Carrusel horizontal con scroll-snap, autoplay y bullets — sección "Proyectos" de Inicio. */
export default function PortfolioCarousel({ projects, autoplay }: { projects: Project[]; autoplay: boolean }) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const [slide, setSlide] = useState(0)

  const step = () => {
    const t = trackRef.current
    if (!t || !projects.length) return 0
    return t.scrollWidth / projects.length
  }

  const goTo = (i: number) => {
    const t = trackRef.current
    if (!t) return
    let left = i * step()
    if (left > t.scrollWidth - t.clientWidth + 4) {
      left = 0
      i = 0
    }
    t.scrollTo({ left, behavior: 'smooth' })
    setSlide(i)
  }

  const resumeAuto = () => {
    if (!autoplay) return
    if (autoTimer.current) clearInterval(autoTimer.current)
    autoTimer.current = setInterval(() => goTo(slide + 1), 3500)
  }
  const pauseAuto = () => {
    if (autoTimer.current) clearInterval(autoTimer.current)
  }

  useEffect(() => {
    resumeAuto()
    return () => pauseAuto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide, autoplay])

  return (
    <>
      <div
        ref={trackRef}
        onScroll={() => {
          const t = trackRef.current
          if (!t) return
          const i = Math.round(t.scrollLeft / step())
          if (i !== slide) setSlide(i)
        }}
        onMouseEnter={pauseAuto}
        onMouseLeave={resumeAuto}
        className="af-carousel-track"
        style={{
          marginTop: 'clamp(32px, 5vh, 56px)',
          display: 'flex',
          gap: 20,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: 6,
        }}
      >
        {projects.map((p) => (
          <article key={p.slug} className="af-carousel-card">
            <h3 style={{ margin: 0, fontFamily: "'Ubuntu', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '.4px', color: '#e6bb52' }}>
              {p.service}
            </h3>
            <h2 style={{ margin: 0, fontFamily: "'Ubuntu', sans-serif", fontSize: 'clamp(20px, 2vw, 30px)', fontWeight: 600, lineHeight: 1.2, color: '#ffffff' }}>
              {p.title}
            </h2>
            <div style={{ aspectRatio: '3 / 4', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(230,187,82,.14)', background: '#0f0f0f' }}>
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                />
              )}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,.75)',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {p.shortDescription}
            </p>
            <Link href={`/proyecto/${p.slug}`} className="af-carousel-cta">
              Ver Proyecto
            </Link>
          </article>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 28 }}>
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            aria-label="Ir al proyecto"
            onClick={() => {
              pauseAuto()
              goTo(i)
              resumeAuto()
            }}
            style={{ height: 8, border: 0, borderRadius: 99, padding: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <span
              style={{
                display: 'block',
                width: slide === i ? 26 : 8,
                height: 8,
                borderRadius: 99,
                background: slide === i ? '#e6bb52' : 'rgba(230,187,82,.3)',
              }}
            />
          </button>
        ))}
      </div>
    </>
  )
}
