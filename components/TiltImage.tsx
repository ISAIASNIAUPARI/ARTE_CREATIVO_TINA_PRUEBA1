'use client'

import { useRef, type CSSProperties } from 'react'

/** Efecto de inclinación 3D que sigue el cursor, igual al de Inicio y Nosotros. */
export default function TiltImage({
  src,
  alt,
  style,
}: {
  src: string
  alt: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLImageElement | null>(null)

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={460}
      height={620}
      style={{
        width: '100%',
        maxWidth: 460,
        height: 'auto',
        display: 'block',
        filter: 'drop-shadow(0 30px 50px rgba(0,0,0,.45))',
        willChange: 'transform',
        ...style,
      }}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        el.style.transition = 'transform .12s ease-out'
        el.style.transform = `perspective(900px) rotateY(${-x * 14}deg) rotateX(${y * 14}deg) translate3d(${-x * 18}px,${-y * 14}px,0)`
      }}
      onMouseLeave={() => {
        const el = ref.current
        if (!el) return
        el.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1)'
        el.style.transform = 'none'
      }}
    />
  )
}
