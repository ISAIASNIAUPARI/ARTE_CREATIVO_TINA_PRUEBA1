import type { Project, ToolCard } from '@/lib/types'

// Proyectos — importados estáticamente para que el build nunca dependa de la red.
// El slug de cada proyecto es el nombre del archivo (así también lo ve TinaCMS).
import cafeDelCerro from '@/content/proyectos/cafe-del-cerro.json'
import dentalSolis from '@/content/proyectos/dental-solis.json'
import socios from '@/content/proyectos/socios.json'
import cachorros from '@/content/proyectos/cachorros.json'
import losBifes from '@/content/proyectos/los-bifes.json'
import cafeteriaKuna from '@/content/proyectos/cafeteria-kuna.json'
import deessa from '@/content/proyectos/deessa.json'
import alonja from '@/content/proyectos/alonja.json'
import kasaami from '@/content/proyectos/kasaami.json'

import toolSanity from '@/content/herramientas/sanity.json'
import toolVercel from '@/content/herramientas/vercel.json'
import toolHtml from '@/content/herramientas/html-css-js.json'
import toolN8n from '@/content/herramientas/n8n.json'
import toolHostinger from '@/content/herramientas/hostinger.json'
import toolWhatsapp from '@/content/herramientas/whatsapp-api.json'
import toolMeta from '@/content/herramientas/meta.json'
import toolGithub from '@/content/herramientas/github.json'

const PROJECT_FILES: { slug: string; data: unknown }[] = [
  { slug: 'cafe-del-cerro', data: cafeDelCerro },
  { slug: 'dental-solis', data: dentalSolis },
  { slug: 'socios', data: socios },
  { slug: 'cachorros', data: cachorros },
  { slug: 'los-bifes', data: losBifes },
  { slug: 'cafeteria-kuna', data: cafeteriaKuna },
  { slug: 'deessa', data: deessa },
  { slug: 'alonja', data: alonja },
  { slug: 'kasaami', data: kasaami },
]

const TOOL_FILES: unknown[] = [
  toolSanity,
  toolVercel,
  toolHtml,
  toolN8n,
  toolHostinger,
  toolWhatsapp,
  toolMeta,
  toolGithub,
]

export function getAllProjects(): Project[] {
  return PROJECT_FILES.map(({ slug, data }) => ({ ...(data as Project), slug })).sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  )
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featuredOnHome)
}

export function getProject(slug: string): Project | undefined {
  const hit = PROJECT_FILES.find((p) => p.slug === slug)
  return hit ? { ...(hit.data as Project), slug: hit.slug } : undefined
}

export function getRelatedProjects(slug: string): Project[] {
  return getAllProjects()
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
}

export function getAllTools(): ToolCard[] {
  return (TOOL_FILES as ToolCard[]).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}
