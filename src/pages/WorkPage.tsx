import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WorkBackground from '../components/work/WorkBackground'
import ProjectShowcase from '../components/work/ProjectShowcase'

/**
 * The Work page — a cinematic cyber-floral project archive.
 *
 * WorkBackground is a single FIXED background layer (steady idle loop crossfading
 * into the lady loop) that never moves with scroll and keeps playing. All page
 * content scrolls over it at a higher z-index. No pinning, no scroll-scrub, so
 * there is no doubled figure, no seam, and no black gap.
 */
export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-text-primary">
      {/* Permanent fixed background (steady + lady) */}
      <WorkBackground />
      <Navbar />

      <div className="relative z-10">
        {/* ── Hero — text over the fixed background ── */}
        <section className="relative flex min-h-[100svh] items-center justify-center px-6 text-center">
          {/* Soft dark scrim behind the centred text for legibility */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[min(760px,94vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5),rgba(0,0,0,0.22)_48%,transparent_78%)]" />

          <div className="relative flex max-w-3xl flex-col items-center">
            <span className="text-xs tracking-[0.35em] text-white/65">SELECTED WORK</span>
            <h1 className="hero-title mt-6 text-balance text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
              Projects we built <span className="font-display italic">so far</span>
            </h1>
            <p className="hero-subtitle mt-6 max-w-md text-base leading-relaxed text-white/75">
              A curated archive of websites, videos, and digital experiences shaped for modern
              brands.
            </p>
          </div>

          {/* Scroll cue */}
          <div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/55">
            <span className="text-xs tracking-[0.3em]">SCROLL TO EXPLORE</span>
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={16} />
            </motion.span>
          </div>
        </section>

        {/* ── Interactive project archive (over the same fixed background) ── */}
        <section
          id="work-list"
          className="relative scroll-mt-32 overflow-hidden px-6 pb-28 pt-16 md:pb-40 md:pt-24"
        >
          {/* Subtle local readability wash only — background stays visible */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/35 to-black/45" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mb-14 max-w-container"
            >
              <span className="text-xs tracking-[0.3em] text-white/55">THE ARCHIVE</span>
              <h2 className="mt-5 max-w-2xl text-balance text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
                Projects we built <span className="font-display italic">so far</span>
              </h2>
            </motion.div>

            <ProjectShowcase />
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
