import { loadDoc } from '@/lib/loadDoc'
import { getSettings } from '@/lib/settings'
import { getAllTools } from '@/lib/collections'
import BlogView from '@/components/views/BlogView'

export const metadata = { title: 'Blog — Arte Creativo' }
export const revalidate = 60

export default async function BlogPage() {
  const [hero, testimonial, cta] = await Promise.all([
    loadDoc('blogHero', 'hero.json', import('@/content/blog/hero.json'), 'blogHero'),
    loadDoc('featuredTestimonial', 'testimonio-destacado.json', import('@/content/compartido/testimonio-destacado.json'), 'featuredTestimonial'),
    loadDoc('contactCta', 'cta.json', import('@/content/compartido/cta.json'), 'contactCta'),
  ])
  const settings = await getSettings()
  const tools = getAllTools()

  return (
    <BlogView
      hero={hero as never}
      testimonial={testimonial as never}
      cta={cta as never}
      settings={settings}
      tools={tools}
    />
  )
}
