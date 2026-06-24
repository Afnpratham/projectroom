export type PortfolioProject = {
  slug: string
  title: string
  category: string
  year: string
  type: 'Client Work' | 'Personal Project' | 'Concept Work'
  /** Which showcase section this belongs to. */
  group: 'website' | 'video'
  /** Short premium description shown on the card and detail page. */
  description: string
  /** 'video' cards play a muted looping preview on hover / in view. */
  mediaType: 'video' | 'image'
  /** Path to the preview media (mp4 for video, jpg/png for image). */
  preview: string
  /** Poster / thumbnail fallback shown before the video loads. */
  thumbnail: string
  /** Aspect ratio hint for the media frame. */
  ratio: '16/9' | '9/16'
  /** Disciplines / quick tags. */
  tags: string[]
  /** Live site URL, if the project is publicly deployed. */
  liveUrl: string
  /** Disciplines involved. */
  services: string[]
  /**
   * Featured projects are the strongest work — surfaced first within their
   * section. Add more projects later by appending an object below; set
   * `featured: true` to prioritize it.
   */
  featured?: boolean
}

export type Creative = {
  title: string
  category: string
  image: string
  /** Layout hint for the masonry grid. */
  orientation: 'portrait' | 'square'
}

/**
 * Real portfolio assets, optimized and served from /public/portfolio.
 * Website + video previews are short, muted, looping clips with poster
 * fallbacks; creatives are a curated image gallery.
 */
export const portfolio: PortfolioProject[] = [
  // ── Websites ──────────────────────────────────────────────
  {
    slug: 'orbit-archive',
    title: 'The Orbit Archive',
    category: 'Website / Motion',
    year: '2026',
    type: 'Personal Project',
    group: 'website',
    description:
      'A cinematic studio archive — a floating wall of website walkthroughs, posters and film edits, wrapped in a Web3 motion system and built to move with the brand.',
    mediaType: 'video',
    preview: '/portfolio/websites/orbit-archive-preview.mp4',
    thumbnail: '/portfolio/thumbnails/orbit-archive-preview.jpg',
    ratio: '16/9',
    tags: ['Website', 'Motion', 'Cinematic'],
    liveUrl: '',
    services: ['Art Direction', 'Web Design', 'Motion', 'Frontend Development'],
    featured: true,
  },
  {
    slug: 'orbit-room',
    title: 'The Orbit Room',
    category: 'Website Development',
    year: '2026',
    type: 'Personal Project',
    group: 'website',
    description:
      'The studio site itself — a cosmic-floral identity with cinematic motion, art direction, and a fully responsive front end.',
    mediaType: 'video',
    preview: '/portfolio/websites/orbit-room-preview.mp4',
    thumbnail: '/portfolio/thumbnails/orbit-room-preview.jpg',
    ratio: '16/9',
    tags: ['Website', 'Brand', 'Motion'],
    liveUrl: '',
    services: ['Art Direction', 'Web Design', 'Motion', 'Frontend Development'],
    featured: true,
  },
  {
    slug: 'companioo',
    title: 'Companioo Landing Page',
    category: 'Website Development',
    year: '2026',
    type: 'Personal Project',
    group: 'website',
    description:
      'A warm, human campaign landing page built around connection — calm typography, soft motion, and a clear emotional hook.',
    mediaType: 'video',
    preview: '/portfolio/websites/companioo-preview.mp4',
    thumbnail: '/portfolio/thumbnails/companioo-preview.jpg',
    ratio: '16/9',
    tags: ['Landing Page', 'Campaign', 'Motion'],
    liveUrl: '',
    services: ['Concept', 'Landing Page Design', 'Motion'],
    featured: true,
  },
  {
    slug: 'cgpapath',
    title: 'CGPA Path',
    category: 'Website Development',
    year: '2026',
    type: 'Personal Project',
    group: 'website',
    description:
      'A clean product web app that helps students calculate SGPA and plan the grades they need to hit a target CGPA.',
    mediaType: 'video',
    preview: '/portfolio/websites/cgpa-path-preview.mp4',
    thumbnail: '/portfolio/thumbnails/cgpa-path-preview.jpg',
    ratio: '16/9',
    tags: ['Web App', 'Product', 'UX'],
    liveUrl: '',
    services: ['Product Design', 'UX', 'Frontend Development'],
    featured: true,
  },
  {
    slug: 'jarvis',
    title: 'Jarvis',
    category: 'Website Development',
    year: '2026',
    type: 'Personal Project',
    group: 'website',
    description:
      'A cinematic AI automation interface — a dark, precise command core where tools stay dormant until summoned.',
    mediaType: 'video',
    preview: '/portfolio/websites/jarvis-preview.mp4',
    thumbnail: '/portfolio/thumbnails/jarvis-preview.jpg',
    ratio: '16/9',
    tags: ['Web App', 'AI', 'Interface'],
    liveUrl: '',
    services: ['Product Design', 'UI', 'Frontend Development'],
    featured: true,
  },

  // ── Video & Editing ───────────────────────────────────────
  {
    slug: 'breaking-in',
    title: 'Breaking In',
    category: 'Video Editing',
    year: '2024',
    type: 'Client Work',
    group: 'video',
    description:
      'A cinematic short film for AFN Cinema — graded, paced, and edited for a tense, atmospheric 4K look.',
    mediaType: 'video',
    preview: '/portfolio/videos/breaking-in-preview.mp4',
    thumbnail: '/portfolio/thumbnails/breaking-in-poster.jpg',
    ratio: '16/9',
    tags: ['Short Film', 'Editing', 'Color'],
    liveUrl: '',
    services: ['Editing', 'Color Grading', 'Sound'],
  },
  {
    slug: 'breaking-out',
    title: 'Breaking Out',
    category: 'Video Editing',
    year: '2024',
    type: 'Client Work',
    group: 'video',
    description:
      'An AFN Cinema film — wide, contemplative frames cut into a quiet, cinematic rhythm.',
    mediaType: 'video',
    preview: '/portfolio/videos/breaking-out-preview.mp4',
    thumbnail: '/portfolio/thumbnails/breaking-out-poster.jpg',
    ratio: '16/9',
    tags: ['Short Film', 'Editing', 'Color'],
    liveUrl: '',
    services: ['Editing', 'Color Grading'],
  },
  {
    slug: 'bandhan',
    title: 'Bandhan — The Struggle',
    category: 'Video Editing',
    year: '2026',
    type: 'Client Work',
    group: 'video',
    description:
      'A socially-driven AFN Cinema short film on child marriage — intimate, restrained edits that let the story breathe.',
    mediaType: 'video',
    preview: '/portfolio/videos/bandhan-preview.mp4',
    thumbnail: '/portfolio/thumbnails/bandhan-poster.jpg',
    ratio: '16/9',
    tags: ['Short Film', 'Storytelling', 'Editing'],
    liveUrl: '',
    services: ['Editing', 'Color Grading', 'Storytelling'],
  },
  {
    slug: 'mythology-shorts',
    title: 'Mythology Shorts',
    category: 'Video Editing',
    year: '2026',
    type: 'Personal Project',
    group: 'video',
    description:
      'Vertical short-form edits exploring Indian mythology — punchy pacing, motion text, and dramatic sound design for reels.',
    mediaType: 'video',
    preview: '/portfolio/videos/veer-arjun-short.mp4',
    thumbnail: '/portfolio/thumbnails/veer-arjun-poster.jpg',
    ratio: '9/16',
    tags: ['Shorts', 'Reels', 'Motion'],
    liveUrl: '',
    services: ['Creative Direction', 'Editing', 'Motion'],
  },
]

/** Curated creative-design gallery (posters, social, and campaign creatives). */
export const creatives: Creative[] = [
  {
    title: 'Vedapix — Brand Campaign',
    category: 'Campaign Creative',
    image: '/portfolio/creatives/vedapix-brand-campaign.jpg',
    orientation: 'square',
  },
  {
    title: 'Vedapix — Animation Story',
    category: 'Campaign Creative',
    image: '/portfolio/creatives/vedapix-animation-story.jpg',
    orientation: 'square',
  },
  {
    title: 'AI-ML Workshop',
    category: 'Event Poster',
    image: '/portfolio/creatives/aiml-workshop-poster.jpg',
    orientation: 'portrait',
  },
  {
    title: 'World Cancer Day',
    category: 'Awareness Campaign',
    image: '/portfolio/creatives/world-cancer-day-poster.jpg',
    orientation: 'portrait',
  },
  {
    title: 'Interschool Athletics Meet',
    category: 'Sports Poster',
    image: '/portfolio/creatives/interschool-athletics-poster.jpg',
    orientation: 'portrait',
  },
  {
    title: 'OJAS 3.0',
    category: 'Sports Fest Campaign',
    image: '/portfolio/creatives/ojas-sports-poster.jpg',
    orientation: 'portrait',
  },
  {
    title: 'IEEE WIE Hackathon',
    category: 'Event Poster',
    image: '/portfolio/creatives/wie-hackathon-poster.jpg',
    orientation: 'portrait',
  },
]

export const websiteProjects = portfolio.filter((p) => p.group === 'website')
export const videoProjects = portfolio.filter((p) => p.group === 'video')

export function getProject(slug: string): PortfolioProject | undefined {
  return portfolio.find((p) => p.slug === slug)
}
