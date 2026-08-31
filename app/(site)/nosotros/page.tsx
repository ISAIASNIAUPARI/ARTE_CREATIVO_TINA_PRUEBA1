import { loadDoc } from '@/lib/loadDoc'
import { getSettings } from '@/lib/settings'
import NosotrosView from '@/components/views/NosotrosView'

export const metadata = { title: 'Nosotros — Arte Creativo' }
export const revalidate = 60

export default async function NosotrosPage() {
  const [hero, pillars, workStyle, bio, cta] = await Promise.all([
    loadDoc('nosotrosHero', 'hero.json', import('@/content/nosotros/hero.json'), 'nosotrosHero'),
    loadDoc('nosotrosPillars', 'pillars.json', import('@/content/nosotros/pillars.json'), 'nosotrosPillars'),
    loadDoc('nosotrosWorkStyle', 'work-style.json', import('@/content/nosotros/work-style.json'), 'nosotrosWorkStyle'),
    loadDoc('nosotrosBio', 'bio.json', import('@/content/nosotros/bio.json'), 'nosotrosBio'),
    loadDoc('contactCta', 'cta.json', import('@/content/compartido/cta.json'), 'contactCta'),
  ])
  const settings = await getSettings()

  return (
    <NosotrosView
      hero={hero as never}
      pillars={pillars as never}
      workStyle={workStyle as never}
      bio={bio as never}
      cta={cta as never}
      settings={settings}
    />
  )
}
