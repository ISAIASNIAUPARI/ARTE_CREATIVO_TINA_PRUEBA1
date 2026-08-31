import { loadDoc } from '@/lib/loadDoc'
import { getSettings } from '@/lib/settings'
import ContactoView from '@/components/views/ContactoView'

export const metadata = { title: 'Contacto — Arte Creativo' }
export const revalidate = 60

export default async function ContactoPage() {
  const [hero, cta] = await Promise.all([
    loadDoc('contactHero', 'hero.json', import('@/content/contacto/hero.json'), 'contactHero'),
    loadDoc('contactPageCta', 'cta.json', import('@/content/contacto/cta.json'), 'contactPageCta'),
  ])
  const settings = await getSettings()

  return <ContactoView hero={hero as never} cta={cta as never} settings={settings} />
}
