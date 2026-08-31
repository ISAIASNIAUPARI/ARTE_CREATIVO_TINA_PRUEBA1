import { tinaField as tinaFieldStrict } from 'tinacms/dist/react'

/**
 * Envoltura de `tinaField` con tipos laxos: nuestros objetos de contenido son
 * interfaces estrictas y `tinaField` pide `Record<string, unknown>`. Devuelve el
 * atributo `data-tina-field` (o undefined si el objeto no trae metadatos de Tina,
 * p. ej. en el modo de respaldo desde JSON local).
 */
export function tinaField(object: unknown, property?: string): string | undefined {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return tinaFieldStrict(object as any, property as any)
  } catch {
    return undefined
  }
}
