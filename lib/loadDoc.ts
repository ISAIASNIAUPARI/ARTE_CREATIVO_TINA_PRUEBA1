import { client } from '@/tina/__generated__/client'

/**
 * Devuelve `{ query, variables, data }` para pasar a `useTina()`.
 *
 * Camino normal: consulta el contenido a TinaCMS (con eso el panel /admin
 * puede editar cada texto en vivo).
 *
 * Camino de respaldo: si TinaCMS Cloud todavía no indexó el repo (típico en el
 * primer deploy), lee el JSON local. La web se ve idéntica; la edición en vivo
 * empieza a funcionar cuando el proyecto de Tina Cloud queda conectado al repo
 * y se vuelve a desplegar.
 */
export type TinaDoc<T> = { query: string; variables: Record<string, unknown>; data: T }

export async function loadDoc<T = unknown>(
  collection: string,
  relativePath: string,
  jsonImport: Promise<{ default: unknown }>,
  dataKey: string
): Promise<TinaDoc<T>> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queries = client.queries as any
    const res = await queries[collection]({ relativePath })
    return { query: res.query, variables: res.variables, data: res.data as T }
  } catch {
    const mod = await jsonImport
    return { query: '', variables: {}, data: { [dataKey]: mod.default } as unknown as T }
  }
}
