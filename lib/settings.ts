import { cache } from 'react'
import { loadDoc } from '@/lib/loadDoc'
import type { SiteSettings } from '@/lib/types'

/** Ajustes generales, resueltos y cacheados por render. */
export const getSettings = cache(async (): Promise<SiteSettings> => {
  const doc = await loadDoc<{ settings: SiteSettings }>(
    'settings',
    'site.json',
    import('@/content/settings/site.json'),
    'settings'
  )
  return doc.data.settings
})
