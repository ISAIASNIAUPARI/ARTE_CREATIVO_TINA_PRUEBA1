'use client'

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

/**
 * Reproduce el fade + translateY on-scroll del sitio original: threshold 0.05,
 * rootMargin -8%, transición .7s ease, translateY(26px) -> none.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  style,
  className,
  children,
  ...rest
}: {
  as?: ElementType
  delay?: number
  style?: CSSProperties
  className?: string
  children: ReactNode
  [key: string]: unknown
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const show = () => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    }
    if (typeof IntersectionObserver === 'function') {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              show()
              io.unobserve(e.target)
            }
          })
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
      )
      io.observe(el)
      return () => io.disconnect()
    }
    const t = setTimeout(show, 1500)
    return () => clearTimeout(t)
  }, [])

  const Comp = Tag as ElementType
  return (
    <Comp
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(26px)',
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
