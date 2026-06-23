import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, ImageIcon } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SiteAtmosphere from '../components/SiteAtmosphere'
import Reveal from '../components/Reveal'
import { getProject, type PortfolioProject } from '../data/portfolio'

/** Greyish liquid-glass media placeholder used until real assets exist. */
function PlaceholderMedia({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015)_45%,rgba(0,0,0,0.25))] ${className}`}
    >
      <div className="flex flex-col items-center gap-2.5 text-white/30">
        <ImageIcon size={30} strokeWidth={1.3} />
        <span className="text-[11px] uppercase tracking-[0.25em]">{label}</span>
      </div>
    </div>
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
        <article className="mx-auto max-w-container px-6 pt-32 md:pt-40">
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

          {/* Hero media placeholder */}
          <Reveal delay={0.15}>
            <div className="liquid-glass mt-12 overflow-hidden rounded-3xl border border-white/10">
              <PlaceholderMedia label="Project media coming soon" className="aspect-[16/9] w-full" />
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

          {/* Overview placeholder */}
          <Reveal className="mt-2 border-t border-white/10 py-10">
            <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
              <h3 className="text-sm uppercase tracking-[0.25em] text-white/45">Overview</h3>
              <p className="max-w-2xl text-lg leading-relaxed text-white/45">
                Case study content coming soon. The full breakdown for this project — process,
                visuals, and outcome — will be published once the portfolio assets are uploaded.
              </p>
            </div>
          </Reveal>

          {/* Gallery placeholders */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="liquid-glass overflow-hidden rounded-3xl border border-white/10 sm:col-span-2">
              <PlaceholderMedia label="Gallery coming soon" className="aspect-[16/10] w-full" />
            </div>
            <div className="liquid-glass overflow-hidden rounded-3xl border border-white/10">
              <PlaceholderMedia label="Asset pending" className="aspect-[16/11] w-full" />
            </div>
            <div className="liquid-glass overflow-hidden rounded-3xl border border-white/10">
              <PlaceholderMedia label="Asset pending" className="aspect-[16/11] w-full" />
            </div>
          </div>
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
