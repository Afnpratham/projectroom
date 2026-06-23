import { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ImageIcon, Mail, Move } from 'lucide-react'
import { portfolio, type PortfolioProject } from '../../data/portfolio'

type PortfolioSection = {
  eyebrow: string
  title: string
  description: string
  projects: PortfolioProject[]
  placeholders?: number
}

/** Greyish liquid-glass media placeholder used until real assets exist. */
function PlaceholderMedia({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.018)_46%,rgba(0,0,0,0.28))] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.13),transparent_36%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/25" />
      <div className="relative flex flex-col items-center gap-3 text-white/34">
        <ImageIcon size={34} strokeWidth={1.25} />
        <span className="text-[10px] uppercase tracking-[0.28em]">{label}</span>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group liquid-glass block min-h-[clamp(360px,48vw,620px)] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]"
    >
      <PlaceholderMedia label="Project media coming soon" className="h-[62%] min-h-[230px] w-full" />
      <div className="flex min-h-[38%] flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <span className="font-display text-3xl tabular-nums text-white/40">
            {String(index + 1).padStart(2, '0')}
          </span>
          <ArrowUpRight
            size={24}
            className="mt-1 shrink-0 text-white/45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
          />
        </div>
        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">{project.category}</p>
          <h3 className="mt-3 text-balance text-[clamp(1.8rem,3.8vw,3.7rem)] leading-[0.98] tracking-tight text-white">
            {project.title}
          </h3>
          <div className="mt-5 flex flex-wrap items-center gap-2.5 text-sm text-white/55">
            <span>{project.year}</span>
            <span className="liquid-glass rounded-full px-3 py-1 text-xs text-white/75">
              {project.type}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function EmptyPlaceholderCard({ label, index }: { label: string; index: number }) {
  return (
    <div className="liquid-glass min-h-[clamp(320px,40vw,520px)] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
      <PlaceholderMedia label={label} className="h-full min-h-[inherit] w-full" />
      <div className="pointer-events-none absolute left-6 top-6 font-display text-3xl tabular-nums text-white/35">
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, description }: Omit<PortfolioSection, 'projects'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mb-[clamp(32px,5vw,72px)] max-w-[980px]"
    >
      <span className="text-xs uppercase tracking-[0.32em] text-white/50">{eyebrow}</span>
      <h2 className="mt-5 text-balance text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.94] tracking-tight text-white">
        {title}
      </h2>
      <p className="mt-6 max-w-2xl text-[clamp(1rem,1.35vw,1.22rem)] leading-relaxed text-white/62">
        {description}
      </p>
    </motion.div>
  )
}

function OrderedPortfolioSection({ section }: { section: PortfolioSection }) {
  const cards = section.projects.length + (section.placeholders ?? 0)

  return (
    <section className="relative min-h-[100svh] w-full px-[clamp(20px,6vw,96px)] py-[clamp(72px,10vw,140px)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/38 to-black/48" />
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <SectionHeader {...section} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(24px,4vw,56px)]">
          {section.projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
          {Array.from({ length: section.placeholders ?? 0 }).map((_, offset) => (
            <EmptyPlaceholderCard
              key={`${section.title}-${offset}`}
              index={section.projects.length + offset}
              label={cards > 1 ? 'Portfolio asset pending' : 'Portfolio coming soon'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function DraggableWebsites({
  projects,
  lowerAnimationActive,
  lowerAnimationResetKey,
}: {
  projects: PortfolioProject[]
  lowerAnimationActive: boolean
  lowerAnimationResetKey: number
}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.28, margin: '-12% 0px -12% 0px' })
  const dragActive = lowerAnimationActive && isInView
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-10%'])
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2])

  return (
    <section
      ref={ref}
      id="websites"
      className="relative min-h-[112svh] w-full overflow-hidden px-[clamp(20px,6vw,96px)] py-[clamp(72px,10vw,140px)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/28 to-black/42" />
      <div className="relative z-10 mx-auto grid min-h-[calc(112svh-160px)] max-w-[1700px] min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_minmax(0,1.2fr)]">
        <div className="w-full min-w-0 max-w-[720px]">
          <span className="text-xs uppercase tracking-[0.32em] text-white/52">01 / Websites</span>
          <h2 className="mt-5 max-w-full text-balance text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-tight text-white">
            Websites We&apos;ve Built
          </h2>
          <p className="mt-7 max-w-xl text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed text-white/66">
            Drag through the website archive as it comes into view. Real media can drop into these
            large preview surfaces when the assets are ready.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-white/68 backdrop-blur-md">
            <Move size={16} />
            <span>{dragActive ? 'Drag is active' : 'Scroll to activate'}</span>
          </div>
        </div>

        <motion.div
          key={`mobile-drag-${lowerAnimationResetKey}`}
          drag="x"
          dragMomentum={false}
          dragElastic={0.08}
          dragConstraints={{ left: -720, right: 0 }}
          initial={{ opacity: 0, scale: 0.94, x: 0 }}
          animate={{
            opacity: dragActive ? 1 : 0,
            scale: dragActive ? 1 : 0.96,
            x: 0,
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className={`flex gap-5 overflow-visible pb-4 lg:hidden ${
            dragActive ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {projects.map((project, index) => (
            <div key={project.slug} className="min-w-[min(82vw,430px)]">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </motion.div>

        <motion.div
          key={`desktop-drag-${lowerAnimationResetKey}`}
          style={{ y, rotate }}
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(2px)' }}
          animate={{
            opacity: dragActive ? 1 : 0,
            scale: dragActive ? 1 : 0.94,
            filter: dragActive ? 'blur(0px)' : 'blur(2px)',
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className={`relative hidden min-h-[820px] lg:block ${
            dragActive ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {projects.map((project, index) => {
            const positions = [
              'left-[2%] top-[4%] rotate-[-7deg]',
              'right-[2%] top-[16%] rotate-[5deg]',
              'left-[12%] bottom-[8%] rotate-[4deg]',
              'right-[14%] bottom-[2%] rotate-[-4deg]',
            ]

            return (
              <motion.div
                key={project.slug}
                drag
                dragMomentum={false}
                dragElastic={0.12}
                dragConstraints={{ left: -220, right: 220, top: -160, bottom: 160 }}
                whileDrag={{ scale: 1.04, zIndex: 30, rotate: 0 }}
                whileHover={{ scale: 1.025 }}
                className={`absolute w-[min(76vw,520px)] cursor-grab active:cursor-grabbing ${positions[index % positions.length]}`}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

type ProjectShowcaseProps = {
  lowerAnimationActive: boolean
  lowerAnimationResetKey: number
}

export default function ProjectShowcase({
  lowerAnimationActive,
  lowerAnimationResetKey,
}: ProjectShowcaseProps) {
  const websiteProjects = useMemo(
    () =>
      portfolio.filter((project) =>
        ['website', 'landing page', 'web app'].some((term) =>
          project.category.toLowerCase().includes(term),
        ),
      ),
    [],
  )

  const videoProjects = useMemo(
    () =>
      portfolio.filter((project) =>
        ['video', 'editing'].some((term) =>
          `${project.category} ${project.services.join(' ')}`.toLowerCase().includes(term),
        ),
      ),
    [],
  )

  const creativeSection: PortfolioSection = {
    eyebrow: '02 / Creative',
    title: 'Creative Portfolio',
    description:
      'A dedicated space for visual systems, creative direction, social assets, and campaign design. Placeholders stay neutral until the actual work is uploaded.',
    projects: [],
    placeholders: 3,
  }

  const videoSection: PortfolioSection = {
    eyebrow: '03 / Videos',
    title: "Videos We've Edited",
    description:
      'Video and motion work appears here with large preview blocks, ready for final reels, edits, and behind-the-scenes media.',
    projects: videoProjects,
    placeholders: videoProjects.length ? 1 : 3,
  }

  return (
    <>
      <DraggableWebsites
        projects={websiteProjects}
        lowerAnimationActive={lowerAnimationActive}
        lowerAnimationResetKey={lowerAnimationResetKey}
      />
      <OrderedPortfolioSection section={creativeSection} />
      <OrderedPortfolioSection section={videoSection} />

      <section
        id="contact"
        className="relative min-h-[100svh] w-full px-[clamp(20px,6vw,96px)] py-[clamp(72px,10vw,140px)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/48 to-black/70" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-180px)] max-w-[1400px] flex-col justify-center">
          <span className="text-xs uppercase tracking-[0.32em] text-white/50">04 / Contact</span>
          <h2 className="mt-5 max-w-5xl text-balance text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tight text-white">
            Let&apos;s build the next room around your brand.
          </h2>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <motion.a
              href="mailto:hello@theorbitroom.com"
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.98 }}
              className="accent-gradient inline-flex w-fit items-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-bg"
            >
              <Mail size={17} />
              Start a Project
            </motion.a>
            <a
              href="mailto:hello@theorbitroom.com"
              className="text-base text-white/58 transition-colors hover:text-white"
            >
              hello@theorbitroom.com
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
