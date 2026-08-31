import type { Metadata } from 'next'
import { loadDoc } from '@/lib/loadDoc'
import PrivacidadView from '@/components/views/PrivacidadView'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Arte Creativo',
  description:
    'Conoce cómo Arte Creativo recopila, usa y protege tus datos personales conforme a la legislación ecuatoriana y las políticas de Meta.',
  robots: { index: true, follow: true },
}

export const revalidate = 60

export default async function PoliticaDePrivacidad() {
  const doc = await loadDoc('privacyPolicy', 'politica.json', import('@/content/privacidad/politica.json'), 'privacyPolicy')
  return <PrivacidadView doc={doc as never} />
}
