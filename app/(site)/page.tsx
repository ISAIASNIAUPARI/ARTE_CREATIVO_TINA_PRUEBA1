import { loadDoc } from '@/lib/loadDoc'
import { getSettings } from '@/lib/settings'
import { getFeaturedProjects } from '@/lib/collections'
import HomeView from '@/components/views/HomeView'
import type { HeroContent, ProblemsContent, AboutContent, Testimonial } from '@/lib/types'

export const revalidate = 60

type PortfolioIntro = { heading: string; intro?: string | null; ctaLabel?: string | null }
type Cta = { heading: string; subheading: string }

export default async function HomePage() {
  const [hero, problems, portfolioIntro, about, results, cta] = await Promise.all([
    loadDoc<{ homeHero: HeroContent }>('homeHero', 'hero.json', import('@/content/home/hero.json'), 'homeHero'),
    loadDoc<{ homeProblems: ProblemsContent }>('homeProblems', 'problems.json', import('@/content/home/problems.json'), 'homeProblems'),
    loadDoc<{ homePortfolioIntro: PortfolioIntro }>('homePortfolioIntro', 'portafolio.json', import('@/content/home/portafolio.json'), 'homePortfolioIntro'),
    loadDoc<{ homeAbout: AboutContent }>('homeAbout', 'about.json', import('@/content/home/about.json'), 'homeAbout'),
    loadDoc<{ homeResults: { heading: string; testimonials: (Testimonial | null)[] } }>('homeResults', 'results.json', import('@/content/home/results.json'), 'homeResults'),
    loadDoc<{ contactCta: Cta }>('contactCta', 'cta.json', import('@/content/compartido/cta.json'), 'contactCta'),
  ])
  const settings = await getSettings()
  const projects = getFeaturedProjects()

  return (
    <HomeView
      hero={hero}
      problems={problems}
      portfolioIntro={portfolioIntro}
      about={about}
      results={results}
      cta={cta}
      settings={settings}
      projects={projects}
    />
  )
}
