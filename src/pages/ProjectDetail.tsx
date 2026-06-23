import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SiteAtmosphere from '../components/SiteAtmosphere'
import Reveal from '../components/Reveal'
import { getProject, type PortfolioProject } from '../data/portfolio'

function Media({
  media,
  className,
}: {
  media: { type: 'image' | 'video'; src: string; poster?: string; caption?: string }
  className?: string
}) {
  if (media.type === 'video') {
    return (
      <video
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={media.poster}
        src={media.src}
      />
    )
  }
  return <img className={className} src={media.src} alt={media.caption ?? ''} loading="lazy" />
}

function Section({ title, body }: { title: string; body?: string }) {
  if (!body) return null
  return (
    <Reveal className="border-t border-white/10 py-10">
      <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
        <h3 className="text-sm uppercase tracking-[0.25em] text-white/45">{title}</h3>
        <p className="max-w-2xl text-lg leading-relaxed text-white/80">{body}</p>
      </div>
    </Reveal>
  )
}

function NotFound() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-text-primary">
      <SiteAtmosphere />
      <Navbar />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-4xl tracking-tight">Project not found</h1>
        <Link
          to="/"
          className="liquid-glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white"
        >
          <ArrowLeft size={16} /> Back to Work
        </Link>
      </div>
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project: PortfolioProject | undefined = slug ? getProject(slug) : undefined

  if (!project) return <NotFound />

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-text-primary">
      <SiteAtmosphere />
      <Navbar />

      <div className="relative z-10">
        <article className="mx-auto max-w-container px-6 pt-28 md:pt-36">
          {/* Back button */}
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} /> Back to Work
            </Link>
          </Reveal>

          {/* Header */}
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/55">
              <span>{project.category}</span>
              <span className="text-white/25">·</span>
              <span>{project.year}</span>
              <span className="liquid-glass rounded-full px-3 py-1 text-xs text-white/80">
                {project.type}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 text-balance text-4xl leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
              {project.shortDescription}
            </p>
          </Reveal>

          {/* Hero media */}
          <Reveal delay={0.2}>
            <div className="liquid-glass mt-12 overflow-hidden rounded-3xl">
              <Media
                media={project.heroMedia}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Services */}
          {project.services.length > 0 && (
            <Reveal className="mt-12 border-t border-white/10 pt-10">
              <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
                <h3 className="text-sm uppercase tracking-[0.25em] text-white/45">Services</h3>
                <div className="flex flex-wrap gap-2.5">
                  {project.services.map((s) => (
                    <span
                      key={s}
                      className="liquid-glass rounded-full px-4 py-2 text-sm text-white/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Narrative sections (hide gracefully when missing) */}
          <Section title="Overview" body={project.overview} />
          <Section title="Challenge" body={project.challenge} />
          <Section title="Solution" body={project.solution} />
          <Section title="Outcome" body={project.outcome} />

          {/* Gallery */}
          {project.gallery.length > 0 && (
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {project.gallery.map((g, i) => (
                <Reveal
                  key={g.src}
                  delay={(i % 2) * 0.08}
                  className={i % 3 === 0 ? 'sm:col-span-2' : ''}
                >
                  <figure className="liquid-glass overflow-hidden rounded-3xl">
                    <Media media={g} className="aspect-[16/10] w-full object-cover" />
                    {g.caption && (
                      <figcaption className="px-5 py-4 text-sm text-white/55">
                        {g.caption}
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
        </article>

        {/* Bottom CTA */}
        <section className="px-6 pb-24 pt-24">
          <div className="relative mx-auto max-w-container overflow-hidden rounded-[2rem] px-6 py-20 text-center md:py-28">
            <div className="liquid-glass absolute inset-0 rounded-[2rem]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,220,200,0.10),transparent_60%)]" />
            <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
              <h2 className="text-balance text-3xl leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
                Have a project in <span className="font-display italic">orbit?</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">
                Let’s shape the visuals, motion, and experience around what you’re building.
              </p>
              <motion.a
                href="mailto:hello@theorbitroom.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="accent-gradient mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-bg"
              >
                Start a Project
                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
