'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { SiteSettings } from '@/lib/types'

type ChatMessage = { from: 'bot' | 'user'; text: string; cta?: { label: string; href: string } }

const DEFAULT_QUICK: { label: string; question: string }[] = [
  { label: '📍 Ubicación en Quito', question: '¿Dónde están ubicados en Quito?' },
  { label: '📁 Ver Portafolio', question: 'Quiero ver el portafolio de proyectos' },
  { label: '💲 Consultar Precios', question: '¿Cuánto cuesta una página web?' },
]

const WELCOME: ChatMessage = { from: 'bot', text: '¡Hola! Soy Artly 👋\n¿En qué puedo ayudarte hoy?' }

const PORTFOLIO_REPLY: ChatMessage = {
  from: 'bot',
  text: '📁 ¡Claro! Aquí tienes todos los proyectos que hemos realizado.',
  cta: { label: 'Ver más →', href: '/portafolio' },
}

function isPortfolioIntent(text: string) {
  const t = text.toLowerCase()
  return (
    t.includes('portafolio') ||
    t.includes('portfolio') ||
    (t.includes('proyecto') && (t.includes('ver') || t.includes('realizad') || t.includes('trabajo')))
  )
}

/**
 * Botón flotante compartido por todas las páginas: alterna entre una tarjeta de
 * WhatsApp y el bot "Artly" (conectado al webhook de n8n de Ajustes generales),
 * más el badge de "N personas consultando".
 */
export default function FloatingContactWidget({ settings }: { settings: SiteSettings }) {
  const [launcherOpen, setLauncherOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [count, setCount] = useState(7)
  const [log, setLog] = useState<ChatMessage[]>([WELCOME])
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const logRef = useRef<HTMLDivElement | null>(null)
  const sidRef = useRef<string>('')

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > (window.innerHeight || 800) * 0.75)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const t = setInterval(() => setCount(5 + Math.floor(Math.random() * 6)), 6000)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearInterval(t)
    }
  }, [])

  const sessionId = () => {
    if (!sidRef.current) {
      try {
        sidRef.current =
          window.localStorage.getItem('af-chat-session') ||
          `visita-${Date.now()}-${Math.floor(Math.random() * 1000)}`
        window.localStorage.setItem('af-chat-session', sidRef.current)
      } catch {
        sidRef.current = `visita-${Date.now()}`
      }
    }
    return sidRef.current
  }

  const scrollLog = () => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }

  const ask = (text: string) => {
    if (!text || thinking) return
    if (isPortfolioIntent(text)) {
      setLog((l) => [...l, { from: 'user', text }, PORTFOLIO_REPLY])
      setDraft('')
      setTimeout(scrollLog, 60)
      return
    }
    if (!settings.chatWebhookUrl) return
    setLog((l) => [...l, { from: 'user', text }])
    setDraft('')
    setThinking(true)
    setTimeout(scrollLog, 60)
    fetch(settings.chatWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: sessionId(), message: text }),
    })
      .then((r) => r.json())
      .then((d) => {
        const reply =
          (d && (d.reply || d.output || d.text)) ||
          'Ahora mismo no puedo responder por aquí. Escríbeme por WhatsApp y te contesto directo.'
        setLog((l) => [...l, { from: 'bot', text: reply }])
        setThinking(false)
        setTimeout(scrollLog, 60)
      })
      .catch(() => {
        setLog((l) => [
          ...l,
          { from: 'bot', text: 'Ahora mismo no puedo responder por aquí. Escríbeme por WhatsApp y te contesto directo.' },
        ])
        setThinking(false)
        setTimeout(scrollLog, 60)
      })
  }

  const anyOpen = launcherOpen || chatOpen
  const quick = settings.chatQuickReplies?.length
    ? (settings.chatQuickReplies.filter(Boolean) as { label: string; question: string }[])
    : DEFAULT_QUICK
  const botAvatarUrl = settings.chatBotAvatar || null

  return (
    <>
      {settings.showConsultBadge && pastHero && (
        <div
          style={{
            position: 'fixed',
            right: 22,
            bottom: 108,
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#0c0c0c',
            border: '1px solid rgba(230,187,82,.35)',
            borderRadius: 8,
            padding: '9px 14px',
            boxShadow: '0 10px 26px rgba(0,0,0,.45)',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: 99, background: '#f3c13b', animation: 'af-pulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,.85)' }}>
            <strong style={{ color: '#f3c13b' }}>{count}</strong> personas consultando ahora
          </span>
        </div>
      )}

      {chatOpen && settings.chatEnabled && (
        <div
          style={{
            position: 'fixed',
            right: 12,
            left: 'auto',
            bottom: 92,
            zIndex: 75,
            width: 'min(360px, calc(100vw - 24px))',
            background: '#101010',
            border: '2px solid #f3c13b',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 26px 64px rgba(0,0,0,.65)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#1c1c1c' }}>
            {botAvatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={botAvatarUrl}
                alt="Asistente Artly"
                style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'cover', background: '#131313', border: '1px solid rgba(230,187,82,.5)' }}
              />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 0 }}>
              <span style={{ fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 17, color: '#ffffff' }}>Asistente Artly</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,.75)' }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: '#f3c13b', animation: 'af-pulse 2s ease-in-out infinite' }} />
                En línea · Responde al instante
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setChatOpen(false)
                setLauncherOpen(true)
              }}
              aria-label="Volver"
              className="af-chat-icon-btn"
              style={iconBtnStyle}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => {
                setChatOpen(false)
                setLauncherOpen(false)
              }}
              aria-label="Cerrar chat"
              className="af-chat-icon-btn"
              style={{ ...iconBtnStyle, fontSize: 19 }}
            >
              ×
            </button>
          </div>

          <div ref={logRef} style={{ maxHeight: 'min(300px, 34vh)', overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {log.map((m, i) => (
              <div
                key={i}
                style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: '88%', alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.55,
                    borderRadius: 14,
                    padding: '12px 14px',
                    whiteSpace: 'pre-wrap',
                    background: m.from === 'user' ? '#f3c13b' : 'rgba(255,255,255,.07)',
                    color: m.from === 'user' ? '#101010' : 'rgba(255,255,255,.92)',
                  }}
                >
                  {m.text}
                </p>
                {m.cta && (
                  <Link
                    href={m.cta.href}
                    onClick={() => {
                      setChatOpen(false)
                      setLauncherOpen(false)
                    }}
                    className="af-chat-cta"
                  >
                    {m.cta.label}
                  </Link>
                )}
              </div>
            ))}
            {thinking && (
              <p style={{ margin: 0, alignSelf: 'flex-start', fontSize: 14, borderRadius: 14, padding: '12px 16px', background: 'rgba(255,255,255,.07)', color: 'rgba(255,255,255,.6)' }}>
                Escribiendo…
              </p>
            )}
          </div>

          <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
            {quick.map((q, i) => (
              <button key={i} type="button" onClick={() => ask(q.question)} className="af-quick-btn">
                {q.label}
              </button>
            ))}
          </div>

          <div style={{ padding: '10px 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href={settings.whatsappShortLink} target="_blank" rel="noopener" className="af-chat-wa">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.8 14.24c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.28-3.4-.7-2.86-1.18-4.7-4.08-4.84-4.27-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.08 1-2.36.27-.28.6-.35.8-.35.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.33.02.52-.1.19-.15.31-.3.48-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.24.65-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.75-.17 1.43z" />
              </svg>
              Chatear por WhatsApp
            </a>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                ask(draft.trim())
              }}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <input
                type="text"
                name="q"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="af-chat-input"
              />
              <button type="submit" aria-label="Enviar" className="af-chat-send">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M3 20l18-8L3 4l4 8-4 8z" />
                </svg>
              </button>
            </form>
            <button
              type="button"
              onClick={() => {
                const newSid = `visita-${Date.now()}-${Math.floor(Math.random() * 1000)}`
                sidRef.current = newSid
                try {
                  window.localStorage.setItem('af-chat-session', newSid)
                } catch {}
                setLog([WELCOME])
                setDraft('')
                setThinking(false)
              }}
              className="af-chat-reset"
            >
              ↺ Reiniciar conversación
            </button>
          </div>
        </div>
      )}

      {launcherOpen && (
        <div style={{ position: 'fixed', right: 12, bottom: 92, zIndex: 74, width: 'min(330px, calc(100vw - 24px))', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <a href={settings.whatsappShortLink} target="_blank" rel="noopener" className="af-launcher-card af-launcher-wa">
            <span className="af-launcher-icon-wa">
              <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.8 14.24c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.28-3.4-.7-2.86-1.18-4.7-4.08-4.84-4.27-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.08 1-2.36.27-.28.6-.35.8-.35.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.33.02.52-.1.19-.15.31-.3.48-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.24.65-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.75-.17 1.43z" />
              </svg>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
              <span style={{ fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 18, color: '#ffffff' }}>WhatsApp</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,.85)' }}>Habla directo con Isaías</span>
            </span>
            <span style={{ fontSize: 16, color: 'rgba(255,255,255,.8)' }}>›</span>
          </a>
          {settings.chatEnabled && (
            <button
              type="button"
              onClick={() => {
                setLauncherOpen(false)
                setChatOpen(true)
              }}
              className="af-launcher-card af-launcher-bot"
            >
              {botAvatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={botAvatarUrl}
                  alt="Asistente Artly"
                  style={{ width: 34, height: 34, flex: '0 0 34px', borderRadius: 9, objectFit: 'cover', background: '#131313' }}
                />
              )}
              <span style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                <span style={{ fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 18, color: '#ffffff' }}>Asistente Artly</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,.8)' }}>Respuestas automáticas 24/7</span>
              </span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,.8)' }}>›</span>
            </button>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          if (chatOpen) {
            setChatOpen(false)
            setLauncherOpen(false)
          } else {
            setLauncherOpen((v) => !v)
          }
        }}
        aria-label="Abrir opciones de contacto"
        className="af-fab"
        style={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          zIndex: 76,
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '1px solid rgba(63,208,126,0.35)',
          background: 'radial-gradient(120% 120% at 30% 25%, #45e081, #1fae5d 60%, #128a48)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 14px 36px -8px rgba(31,174,93,0.6), inset 0 1px 0 rgba(255,255,255,0.25)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            inset: -1,
            borderRadius: '50%',
            border: '2px solid rgba(63,208,126,0.5)',
            animation: 'wa-ping 2.6s ease-out infinite',
            pointerEvents: 'none',
          }}
        />
        {anyOpen ? (
          <span style={{ fontSize: 30, fontWeight: 300, lineHeight: 1 }}>×</span>
        ) : (
          <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.8 14.24c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.28-3.4-.7-2.86-1.18-4.7-4.08-4.84-4.27-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.08 1-2.36.27-.28.6-.35.8-.35.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.33.02.52-.1.19-.15.31-.3.48-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.24.65-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.75-.17 1.43z" />
          </svg>
        )}
      </button>

      <style jsx>{`
        .af-fab:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 18px 44px -8px rgba(31, 174, 93, 0.75);
        }
        .af-chat-icon-btn:hover {
          background: rgba(255, 255, 255, 0.24) !important;
        }
        .af-quick-btn {
          width: 100%;
          text-align: left;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(230, 187, 82, 0.3);
          border-radius: 8px;
          padding: 7px 10px;
          font-family: 'Ubuntu', sans-serif;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.3;
          color: #f6d98d;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .af-quick-btn:hover {
          background: rgba(243, 193, 59, 0.14);
          transform: translateX(3px);
        }
        .af-chat-wa {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #25d366;
          color: #ffffff;
          border-radius: 8px;
          padding: 10px 12px;
          font-family: 'Exo', sans-serif;
          font-weight: 700;
          font-size: 13px;
        }
        .af-chat-wa:hover {
          background: #1fbb59;
          color: #ffffff;
        }
        .af-chat-input {
          flex: 1;
          min-width: 0;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(230, 187, 82, 0.3);
          border-radius: 10px;
          padding: 11px 12px;
          font-size: 13px;
          color: #ffffff;
          outline: none;
        }
        .af-chat-input:focus {
          border-color: #f3c13b;
        }
        .af-chat-send {
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3c13b;
          border: 0;
          border-radius: 10px;
          color: #101010;
          cursor: pointer;
          transition: transform 0.25s ease;
        }
        .af-chat-send:hover {
          transform: scale(1.06);
        }
        .af-chat-reset {
          background: transparent;
          border: 0;
          padding: 2px 0;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.55);
          cursor: pointer;
        }
        .af-chat-reset:hover {
          color: #f6d98d;
        }
        .af-launcher-card {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          text-align: left;
          border-radius: 16px;
          padding: 15px 18px;
          box-shadow: 0 16px 38px rgba(0, 0, 0, 0.5);
          transition: transform 0.25s ease;
          cursor: pointer;
        }
        .af-launcher-card:hover {
          transform: translateX(-6px);
        }
        .af-launcher-wa {
          background: #25d366;
        }
        .af-launcher-wa:hover {
          color: #ffffff;
        }
        .af-launcher-icon-wa {
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.16);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }
        .af-launcher-bot {
          background: #262626;
          border: 2px solid #f3c13b;
          padding: 13px 16px;
        }
      `}</style>
    </>
  )
}

const iconBtnStyle = {
  width: 34,
  height: 34,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255,255,255,.12)',
  border: 0,
  borderRadius: 9,
  color: '#ffffff',
  fontSize: 17,
  lineHeight: 1,
  cursor: 'pointer',
} as const
