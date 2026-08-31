import { Fragment, type ReactNode } from 'react'

/**
 * Mini-formateador para la Política de privacidad: convierte **texto** en
 * <strong> y {{email}} en el correo configurado. No es Markdown completo,
 * solo lo que esa página necesita.
 */
export function formatInline(text: string, email?: string, strongClassName?: string): ReactNode[] {
  const withEmail = email ? text.split('{{email}}').join(email) : text
  const parts = withEmail.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className={strongClassName}>
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

/** Divide un bloque de texto en párrafos (línea en blanco = nuevo párrafo). */
export function splitParagraphs(body?: string | null): string[] {
  if (!body) return []
  return body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
}
