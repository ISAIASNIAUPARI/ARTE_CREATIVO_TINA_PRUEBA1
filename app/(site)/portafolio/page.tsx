import { loadDoc } from '@/lib/loadDoc'
import { getSettings } from '@/lib/settings'
import { getAllProjects } from '@/lib/collections'
import PortafolioView from '@/components/views/PortafolioView'

export const metadata = { title: 'Portafolio — Arte Creativo' }
export const revalidate = 60

export default async function PortafolioPage() {
  const [hero, testimonial, cta] = await Promise.all([
    loadDoc('portfolioHero', 'hero.json', import('@/content/portafolio/hero.json'), 'portfolioHero'),
    loadDoc('featuredTestimonial', 'testimonio-destacado.json', import('@/content/compartido/testimonio-destacado.json'), 'featuredTestimonial'),
    loadDoc('contactPageCta', 'cta.json', import('@/content/contacto/cta.json'), 'contactPageCta'),
  ])
  const settings = await getSettings()
  const projects = getAllProjects()

  return (
    <PortafolioView
      hero={hero as never}
      testimonial={testimonial as never}
      cta={cta as never}
      settings={settings}
      projects={projects}
    />
  )
}
