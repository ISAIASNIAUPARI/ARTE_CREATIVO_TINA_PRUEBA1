import { notFound } from 'next/navigation'
import { client } from '@/tina/__generated__/client'
import { loadDoc } from '@/lib/loadDoc'
import { getSettings } from '@/lib/settings'
import { getAllProjects, getProject, getRelatedProjects } from '@/lib/collections'
import ProyectoView from '@/components/views/ProyectoView'
import type { Project } from '@/lib/types'

export const revalidate = 60

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getProject(slug)
  return { title: p ? `${p.title} — Arte Creativo` : 'Proyecto — Arte Creativo' }
}

export default async function ProyectoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fallback = getProject(slug)
  if (!fallback) notFound()

  let projectDoc: { query: string; variables: Record<string, unknown>; data: { project: Project } }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r: any = await client.queries.project({ relativePath: `${slug}.json` })
    projectDoc = { query: r.query, variables: r.variables, data: { project: { ...r.data.project, slug } } }
  } catch {
    projectDoc = { query: '', variables: {}, data: { project: fallback } }
  }

  const cta = await loadDoc('contactCta', 'cta.json', import('@/content/compartido/cta.json'), 'contactCta')
  const settings = await getSettings()
  const related = getRelatedProjects(slug)

  return <ProyectoView project={projectDoc as never} related={related} cta={cta as never} settings={settings} />
}
