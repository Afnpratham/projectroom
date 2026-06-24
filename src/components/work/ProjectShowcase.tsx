import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Mail, MessageCircle, Move, Phone } from 'lucide-react'
import {
  creatives,
  videoProjects,
  websiteProjects,
  type Creative,
  type PortfolioProject,
} from '../../data/portfolio'
import {
  EMAIL,
  EMAIL_HREF,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
} from '../../config/site'
import VideoPreview from '../VideoPreview'

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group liquid-glass block min-h-[clamp(360px,48vw,620px)] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]"
    >
      <div className="h-[62%] min-h-[230px] w-full overflow-hidden">
        {project.mediaType === 'video' ? (
          <VideoPreview
            src={project.preview}
            poster={project.thumbnail}
            title={project.title}
            className="h-full w-full"
          />
        ) : (
          <img
            src={project.preview}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
      </div>
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
            {project.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-xs text-white/65">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
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

/** ── 02 / Creative — curated masonry gallery of real creatives. ── */
function CreativeCard({ creative }: { creative: Creative }) {
  return (
    <figure
      className={`group liquid-glass relative mb-[clamp(16px,2vw,28px)] overflow-hidden rounded-[24px] border border-white/10 ${
        creative.orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-square'
      }`}
    >
      <img
        src={creative.image}
        alt={creative.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-xs uppercase tracking-[0.22em] text-white/60">{creative.category}</p>
        <p className="mt-1 text-lg leading-tight tracking-tight text-white">{creative.title}</p>
      </figcaption>
    </figure>
  )
}

function CreativeSection() {
  return (
    <section className="relative min-h-[100svh] w-full px-[clamp(20px,6vw,96px)] py-[clamp(72px,10vw,140px)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/38 to-black/48" />
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <SectionHeader
          eyebrow="02 / Creative"
          title="Creative Portfolio"
          description="Brand campaigns, event posters, and social creatives — visual systems designed to stop the scroll and carry a message clearly."
        />
        <div className="columns-1 gap-[clamp(16px,2vw,28px)] sm:columns-2 lg:columns-3">
          {creatives.map((creative) => (
            <div key={creative.title} className="break-inside-avoid">
              <CreativeCard creative={creative} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** ── 03 / Videos — real preview clips with poster fallbacks. ── */
function VideoSection() {
  return (
    <section className="relative min-h-[100svh] w-full px-[clamp(20px,6vw,96px)] py-[clamp(72px,10vw,140px)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/38 to-black/48" />
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <SectionHeader
          eyebrow="03 / Videos"
          title="Videos We've Edited"
          description="Cinematic short films and short-form edits — paced, graded, and built to hold attention. Previews play muted; open a project for the full story."
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(24px,4vw,56px)]">
          {videoProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
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
            Drag through the website archive as it comes into view. Each preview plays a muted
            walkthrough — hover or open a card for the full case study.
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
  return (
    <>
      <DraggableWebsites
        projects={websiteProjects}
        lowerAnimationActive={lowerAnimationActive}
        lowerAnimationResetKey={lowerAnimationResetKey}
      />
      <CreativeSection />
      <VideoSection />

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
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.98 }}
              className="accent-gradient inline-flex w-fit items-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-bg"
            >
              <MessageCircle size={17} />
              Start on WhatsApp
            </motion.a>
            <a
              href={EMAIL_HREF}
              className="liquid-glass inline-flex w-fit items-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-white"
            >
              <Mail size={17} />
              {EMAIL}
            </a>
            <a
              href={PHONE_HREF}
              className="liquid-glass inline-flex w-fit items-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-white"
            >
              <Phone size={17} />
              {PHONE_DISPLAY}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              Instagram
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
