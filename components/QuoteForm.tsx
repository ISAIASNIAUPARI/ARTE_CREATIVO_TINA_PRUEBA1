'use client'

import { useState, type FormEvent } from 'react'
import Reveal from './Reveal'

/**
 * Formulario "cotizar proyecto": no llama a ningún backend. Arma un mensaje de
 * texto con los datos y abre wa.me con ese número — igual que el sitio original.
 * `inputStyle="light"` es la variante de fondo blanco que usan todas las páginas
 * salvo la portada (`dark`). `cardWrapper` reproduce la tarjeta con borde que
 * solo envuelve el formulario en la portada.
 */
export default function QuoteForm({
  whatsappNumber,
  inputStyle = 'light',
  cardWrapper = false,
  showErrorSlot = false,
}: {
  whatsappNumber: string
  inputStyle?: 'dark' | 'light'
  cardWrapper?: boolean
  showErrorSlot?: boolean
}) {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = e.currentTarget
    const nombre = (f.elements.namedItem('nombre') as HTMLInputElement).value
    const telefono = (f.elements.namedItem('telefono') as HTMLInputElement).value
    const mensajeEl = f.elements.namedItem('mensaje') as HTMLTextAreaElement | null
    const msg =
      'Hola Isaías, quiero cotizar un proyecto.\n\nNombre: ' +
      nombre +
      '\nCelular: ' +
      telefono +
      '\nProyecto: ' +
      (mensajeEl ? mensajeEl.value : '')
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
  }

  const inputBg = inputStyle === 'light' ? '#ffffff' : 'rgba(0,0,0,.35)'
  const inputColor = inputStyle === 'light' ? '#101010' : '#ffffff'
  const inputBorder = inputStyle === 'light' ? 'rgba(230,187,82,.45)' : 'rgba(230,187,82,.22)'

  const content = sent ? (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '30px 0', textAlign: 'center' }}>
      <span style={{ fontFamily: "'Exo', sans-serif", fontWeight: 700, fontSize: 24, color: '#f3c13b' }}>
        ¡Mensaje enviado!
      </span>
      <span style={{ fontSize: 16, color: 'rgba(255,255,255,.8)' }}>Gracias. Te contacto en las próximas horas.</span>
    </div>
  ) : (
    <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18 }}>
      <Reveal as="label" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'rgba(255,255,255,.85)' }}>
        Nombre y Apellido
        <input
          type="text"
          name="nombre"
          required
          placeholder="Tu nombre y apellido"
          className="af-input"
          style={{ background: inputBg, borderColor: inputBorder, color: inputColor }}
        />
      </Reveal>
      <Reveal
        as="label"
        delay={80}
        style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'rgba(255,255,255,.85)' }}
      >
        Número Celular
        <input
          type="tel"
          name="telefono"
          required
          placeholder="Número celular"
          className="af-input"
          style={{ background: inputBg, borderColor: inputBorder, color: inputColor, minWidth: 0 }}
        />
      </Reveal>
      <Reveal
        as="label"
        delay={160}
        style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'rgba(255,255,255,.85)' }}
      >
        Descripción del proyecto
        <textarea
          name="mensaje"
          rows={4}
          placeholder="Cuéntame sobre tus metas y que deseas lograr...."
          className="af-input"
          style={{ background: inputBg, borderColor: inputBorder, color: inputColor, resize: 'vertical' }}
        />
      </Reveal>
      {showErrorSlot && <span style={{ gridColumn: '1 / -1', fontSize: 13, color: '#ff9f9f', minHeight: 18 }} />}
      <Reveal as="span" delay={240} style={{ gridColumn: '1 / -1' }}>
        <button type="submit" className="af-submit">
          Enviar
        </button>
      </Reveal>
      <style jsx>{`
        .af-input {
          border: 1px solid;
          border-radius: 8px;
          padding: 13px 14px;
          font-size: 15px;
          outline: none;
          width: 100%;
        }
        .af-input:focus {
          border-color: #e6bb52 !important;
        }
        .af-submit {
          width: 100%;
          background: #e6bb52;
          color: #161616;
          border: 0;
          border-radius: 4px;
          padding: 15px 20px;
          font-family: 'Exo', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 1px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .af-submit:hover {
          background: #f3c13b;
        }
      `}</style>
    </form>
  )

  if (!cardWrapper) return <div>{content}</div>
  return (
    <div
      style={{
        background: 'rgba(255,255,255,.045)',
        border: '1px solid rgba(230,187,82,.18)',
        borderRadius: 16,
        padding: 'clamp(24px, 3vw, 40px)',
      }}
    >
      {content}
    </div>
  )
}
