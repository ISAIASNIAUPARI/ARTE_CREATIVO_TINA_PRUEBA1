'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'

const TABS = ['Todo', 'Especializado', 'Informativo', 'Tiendas']

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('Todo')
  const visible = filter === 'Todo' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <div style={{ margin: 'clamp(34px, 6vh, 60px) auto 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px clamp(20px, 3vw, 46px)' }}>
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setFilter(t)} className="af-tab-btn">
            <span style={filter === t ? { color: '#f6d98d', borderBottom: '2px solid #f6d98d', paddingBottom: 4 } : { color: '#ffffff' }}>{t}</span>
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 26 }}>
        {visible.map((p) => (
          <Link key={p.slug} href={`/proyecto/${p.slug}`} className="af-grid-card">
            <div style={{ aspectRatio: '3 / 4', borderRadius: '4px 4px 0 0', overflow: 'hidden', border: '1px solid rgba(0,0,0,.35)', borderBottom: 0, background: '#ffffff' }}>
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
            <div className="af-grid-overlay">
              <span style={{ fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 15, color: '#ffffff', marginBottom: 10 }}>{p.title}</span>
              <span className="af-grid-btn">Ver Proyecto</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
