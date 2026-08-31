import { client } from '@/tina/__generated__/client'

export type TinaDoc<T> = { query: string; variables: Record<string, unknown>; data: T }

// Tina Cloud transforma "/images/logo.png" a "https://assets.tina.io/.../__file/images/logo.png"
// Esta función lo revierte para que las imágenes locales sigan funcionando.
function normalizeTinaUrls<T>(data: T): T {
  if (typeof data === 'string') {
    const m = data.match(/https:\/\/assets\.tina\.io\/[^/]+\/(?:[^/]+\/)*__file\/(.+)/)
    if (m) return ('/' + m[1]) as unknown as T
    return data
  }
  if (Array.isArray(data)) return data.map(normalizeTinaUrls) as unknown as T
  if (data && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data as Record<string, unknown>).map(([k, v]) => [k, normalizeTinaUrls(v)])
    ) as unknown as T
  }
  return data
}

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
    return { query: res.query, variables: res.variables, data: normalizeTinaUrls(res.data) as T }
  } catch {
    const mod = await jsonImport
    return { query: '', variables: {}, data: { [dataKey]: mod.default } as unknown as T }
  }
}
