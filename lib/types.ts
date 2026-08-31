/* Tipos de las secciones de contenido. Reflejan los JSON de /content y el
   esquema de tina/config.ts. Se usan para tipar los componentes de presentación;
   los "views" reciben el nodo de TinaCMS y lo pasan aquí ya resuelto. */

export interface QuickReply {
  label: string
  question: string
}

export interface SiteSettings {
  brandName: string
  logo: string
  phoneDisplay: string
  email: string
  addressLine: string
  mapLink: string
  whatsappNumber: string
  whatsappShortLink: string
  footerCopyright: string
  chatEnabled?: boolean | null
  chatWebhookUrl?: string | null
  chatBotAvatar?: string | null
  chatQuickReplies?: (QuickReply | null)[] | null
  carouselAutoplay?: boolean | null
  showConsultBadge?: boolean | null
  showDangerTape?: boolean | null
}

export interface HeroContent {
  eyebrow: string
  heading: string
  headingHighlight?: string | null
  subheading: string
  ctaLabel: string
  heroVideo?: string | null
  tags?: (string | null)[] | null
}

export interface ProblemsContent {
  heading: string
  subheading?: string | null
  items: { title: string; text: string }[]
  tapeText?: string | null
}

export interface AboutContent {
  eyebrow?: string | null
  heading: string
  text: string
  points?: (string | null)[] | null
  photo: string
  badgeNumber?: string | null
  badgeLabel?: string | null
}

export interface Testimonial {
  company: string
  name: string
  text: string
}

export interface Project {
  slug: string
  title: string
  category: 'Tiendas' | 'Especializado' | 'Informativo'
  service: string
  image: string
  caseImage: string
  shortDescription: string
  objective: string
  story: { parrafo: string }[]
  benefits: { title: string; text: string }[]
  closingQuestion: string
  closingSubtext: string
  featuredOnHome?: boolean | null
  order?: number | null
}

export interface ToolCard {
  title: string
  category?: string | null
  logo: string
  logoBackground: string
  description: string
  aboutText: string
  order?: number | null
}
