'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

/**
 * Marquesina movida por JS (requestAnimationFrame + translate3d), igual a la del
 * sitio original. Sigue funcionando con prefers-reduced-motion porque no depende
 * de una animación CSS. Duplica `children` una vez internamente para el loop.
 */
export default function Marquee({
  speed = 40,
  speedMobile,
  reverse = false,
  gap = 20,
  children,
}: {
  speed?: number
  speedMobile?: number
  reverse?: boolean
  gap?: number
  children: ReactNode
}) {
  const rowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const dir = reverse ? -1 : 1
    const currentSpeed = (window.innerWidth <= 768 && speedMobile) || speed
    let x = 0
    let last = performance.now()
    let raf = 0
    const step = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t
      const half = row.scrollWidth / 2
      if (half) {
        x -= dir * currentSpeed * dt
        if (x <= -half) x += half
        if (x >= 0) x -= half
        row.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [speed, speedMobile, reverse])

  const rowStyle: CSSProperties = { display: 'flex', flexShrink: 0, gap, paddingRight: gap }

  return (
    <div style={{ display: 'flex', width: 'max-content' }} ref={rowRef}>
      <div style={rowStyle}>{children}</div>
      <div aria-hidden="true" style={rowStyle}>
        {children}
      </div>
    </div>
  )
}
