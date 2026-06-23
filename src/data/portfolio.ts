export type PortfolioProject = {
  slug: string
  title: string
  category: string
  year: string
  type: 'Client Work' | 'Personal Project' | 'Concept Work'
  /** Disciplines involved — structural only, not claimed outcomes. */
  services: string[]
}

/**
 * Structural project list only. Real portfolio assets (images, videos, case
 * studies) have NOT been uploaded yet — the UI shows premium grey placeholders
 * everywhere media or case-study copy would go. Do not add fabricated visuals,
 * metrics, clients, or outcomes here.
 */
export const portfolio: PortfolioProject[] = [
  {
    slug: 'orbit-room',
    title: 'The Orbit Room Website',
    category: 'Website Design',
    year: '2026',
    type: 'Personal Project',
    services: ['Art Direction', 'Web Design', 'Motion', 'Frontend Development'],
  },
  {
    slug: 'companioo',
    title: 'Companioo Landing Page',
    category: 'Campaign Landing Page',
    year: '2026',
    type: 'Personal Project',
    services: ['Concept', 'Landing Page Design', 'Motion'],
  },
  {
    slug: 'cgpapath',
    title: 'CGPA Path',
    category: 'Web App',
    year: '2026',
    type: 'Personal Project',
    services: ['Product Design', 'UX', 'Frontend Development'],
  },
  {
    slug: 'thinkspace',
    title: 'Think Space',
    category: 'Web App',
    year: '2026',
    type: 'Personal Project',
    services: ['Product Design', 'UX', 'Frontend Development'],
  },
  {
    slug: 'mythology-shorts',
    title: 'Mythology Shorts Visuals',
    category: 'Video & Creative Direction',
    year: '2026',
    type: 'Personal Project',
    services: ['Creative Direction', 'Visual Development', 'Motion', 'Editing'],
  },
]

export function getProject(slug: string): PortfolioProject | undefined {
  return portfolio.find((p) => p.slug === slug)
}
