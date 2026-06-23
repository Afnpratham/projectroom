export type PortfolioProject = {
  slug: string
  title: string
  category: string
  year: string
  type: 'Client Work' | 'Personal Project' | 'Concept Work'
  services: string[]
  shortDescription: string
  overview: string
  challenge?: string
  solution?: string
  outcome?: string
  thumbnail: string
  heroMedia: {
    type: 'image' | 'video'
    src: string
    poster?: string
  }
  gallery: {
    type: 'image' | 'video'
    src: string
    poster?: string
    caption?: string
  }[]
}

export const portfolio: PortfolioProject[] = [
  {
    slug: 'orbit-room',
    title: 'The Orbit Room Website',
    category: 'Website Design',
    year: '2026',
    type: 'Personal Project',
    services: ['Art Direction', 'Web Design', 'Motion', 'Frontend Development'],
    shortDescription:
      'The studio’s own home — a cinematic, cosmic-botanical portfolio experience.',
    overview:
      'The Orbit Room is the studio’s flagship site: a dark, cinematic surface where cosmic-botanical motion meets restrained editorial typography. It sets the tone for every project that follows.',
    challenge:
      'Build a site that feels alive and premium without overwhelming the work it presents — atmosphere that supports the content rather than competing with it.',
    solution:
      'A living video background, liquid-glass UI, and a black-and-pearl palette tie the whole experience together. Motion is reserved for moments that matter, keeping the interface calm and confident.',
    outcome:
      'A signature aesthetic the studio can extend across every page, from the homepage to interactive case studies.',
    thumbnail: '/portfolio/orbit-room/thumb.jpg',
    heroMedia: { type: 'image', src: '/portfolio/orbit-room/hero.jpg' },
    gallery: [
      { type: 'image', src: '/portfolio/orbit-room/gallery-1.jpg', caption: 'Cosmic hero atmosphere' },
      { type: 'image', src: '/portfolio/orbit-room/gallery-2.jpg', caption: 'Liquid-glass UI system' },
      { type: 'image', src: '/portfolio/orbit-room/gallery-3.jpg', caption: 'Editorial typography' },
    ],
  },
  {
    slug: 'companioo',
    title: 'Companioo Landing Page',
    category: 'Campaign Landing Page',
    year: '2026',
    type: 'Personal Project',
    services: ['Concept', 'Landing Page Design', 'Copy Direction', 'Motion'],
    shortDescription: 'A focused, conversion-minded landing page for a companion product concept.',
    overview:
      'Companioo is a single-purpose campaign page built to introduce a companion product and drive a single clear action — designed as a tight, persuasive narrative from first scroll to call-to-action.',
    challenge:
      'Communicate a soft, emotional product story while keeping the page sharp, fast, and conversion-focused.',
    solution:
      'A warm-but-minimal layout with a strong above-the-fold promise, rhythmic section pacing, and a recurring CTA that never feels pushy.',
    outcome:
      'A reusable landing-page framework for emotive product launches.',
    thumbnail: '/portfolio/companioo/thumb.jpg',
    heroMedia: { type: 'image', src: '/portfolio/companioo/hero.jpg' },
    gallery: [
      { type: 'image', src: '/portfolio/companioo/gallery-1.jpg', caption: 'Hero promise' },
      { type: 'image', src: '/portfolio/companioo/gallery-2.jpg', caption: 'Feature storytelling' },
      { type: 'image', src: '/portfolio/companioo/gallery-3.jpg', caption: 'Closing call-to-action' },
    ],
  },
  {
    slug: 'cgpapath',
    title: 'CGPA Path',
    category: 'Web App',
    year: '2026',
    type: 'Personal Project',
    services: ['Product Design', 'UX', 'Frontend Development'],
    shortDescription: 'A clean web app that helps students plan and track their CGPA goals.',
    overview:
      'CGPA Path turns a stressful spreadsheet ritual into a calm, guided experience — students enter their grades and instantly see where they stand and what each upcoming term needs to look like.',
    challenge:
      'Make academic math feel reassuring rather than anxious, with zero learning curve.',
    solution:
      'A focused input flow, live calculation, and gentle visual feedback that frames goals as achievable next steps.',
    outcome:
      'A tool that makes grade planning feel clear and within reach.',
    thumbnail: '/portfolio/cgpapath/thumb.jpg',
    heroMedia: { type: 'image', src: '/portfolio/cgpapath/hero.jpg' },
    gallery: [
      { type: 'image', src: '/portfolio/cgpapath/gallery-1.jpg', caption: 'Grade input flow' },
      { type: 'image', src: '/portfolio/cgpapath/gallery-2.jpg', caption: 'Live projections' },
      { type: 'image', src: '/portfolio/cgpapath/gallery-3.jpg', caption: 'Goal tracking' },
    ],
  },
  {
    slug: 'thinkspace',
    title: 'Think Space',
    category: 'Web App',
    year: '2026',
    type: 'Personal Project',
    services: ['Product Design', 'UX', 'Frontend Development'],
    shortDescription: 'A focused thinking and note workspace for ideas, notes, and reflection.',
    overview:
      'Think Space is a quiet workspace built for thinking out loud — capturing ideas, connecting notes, and giving thoughts room to breathe without the clutter of a typical productivity app.',
    challenge:
      'Design a workspace that feels calm and distraction-free while still being genuinely useful for organising ideas.',
    solution:
      'A minimal canvas, soft typography, and gentle structure that stays out of the way until you need it.',
    outcome:
      'A calm, focused space that makes capturing and revisiting ideas effortless.',
    thumbnail: '/portfolio/thinkspace/thumb.jpg',
    heroMedia: { type: 'image', src: '/portfolio/thinkspace/hero.jpg' },
    gallery: [
      { type: 'image', src: '/portfolio/thinkspace/gallery-1.jpg', caption: 'Thinking canvas' },
      { type: 'image', src: '/portfolio/thinkspace/gallery-2.jpg', caption: 'Connected notes' },
      { type: 'image', src: '/portfolio/thinkspace/gallery-3.jpg', caption: 'Calm interface' },
    ],
  },
  {
    slug: 'mythology-shorts',
    title: 'Mythology Shorts Visuals',
    category: 'Video & Creative Direction',
    year: '2026',
    type: 'Personal Project',
    services: ['Creative Direction', 'Visual Development', 'Motion', 'Editing'],
    shortDescription:
      'Cinematic short-form visuals reimagining mythology through a cyber-botanical lens.',
    overview:
      'A series of short-form cinematic visuals reinterpreting mythological figures as divine, cyber-organic beings — the same visual language that opens this very page.',
    challenge:
      'Translate ancient, larger-than-life mythology into a modern, luxurious, motion-first visual identity.',
    solution:
      'A consistent palette of pearl, blush, and champagne against deep black, paired with slow, deliberate motion and AI-assisted visual development.',
    outcome:
      'A distinctive visual world that can scale into an ongoing short-form series.',
    thumbnail: '/portfolio/mythology-shorts/thumb.jpg',
    heroMedia: {
      type: 'video',
      src: '/work/goddess-hand.mp4',
      poster: '/work/goddess-hand-poster.jpg',
    },
    gallery: [
      {
        type: 'video',
        src: '/work/goddess-intro.mp4',
        poster: '/work/goddess-intro-poster.jpg',
        caption: 'Divine intro sequence',
      },
      { type: 'image', src: '/portfolio/mythology-shorts/gallery-1.jpg', caption: 'Visual development' },
      { type: 'image', src: '/portfolio/mythology-shorts/gallery-3.jpg', caption: 'Hand & glass cards' },
    ],
  },
]

export function getProject(slug: string): PortfolioProject | undefined {
  return portfolio.find((p) => p.slug === slug)
}
