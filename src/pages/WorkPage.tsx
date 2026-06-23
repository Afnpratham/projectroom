import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SiteAtmosphere from '../components/SiteAtmosphere'
import ScrollScrubVideo from '../components/work/ScrollScrubVideo'
import ProjectShowcase from '../components/work/ProjectShowcase'

const MASTER = {
  mp4: '/work/work-scroll-master.mp4',
  webm: '/work/work-scroll-master.webm',
  poster: '/work/work-scroll-master-poster.jpg',
}

/**
 * The Orbit Room Archive — scroll-driven cinematic Work page.
 *
 * The intro is a pinned section (300vh mobile / 420vh desktop) whose sticky
 * viewport holds the master video. Scroll progress maps directly onto the
 * video's currentTime, so scrolling down moves the cinematic scene forward and
 * scrolling up reverses it — never an autoplay background. Cinematic overlays
 * fade in and out across four scroll phases while the video stays the hero.
 * Once the sequence finishes, the interactive project archive appears.
 */
export default function WorkPage() {
  const introRef = useRef<HTMLElement>(null)

  // Progress across the pinned intro section (0 at pin start, 1 at pin end).
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ['start start', 'end end'],
  })

  // ── Overlay phase opacities ──
  // 0.00–0.20 · intro label + title
  const introOpacity = useTransform(scrollYProgress, [0, 0.18, 0.24], [1, 1, 0])
  // 0.20–0.45 · tagline
  const taglineOpacity = useTransform(scrollYProgress, [0.2, 0.27, 0.4, 0.46], [0, 1, 1, 0])
  // 0.45–0.70 · glass / hand-cards moment
  const glassOpacity = useTransform(scrollYProgress, [0.45, 0.52, 0.65, 0.72], [0, 1, 1, 0])
  // 0.70–1.00 · project list preview
  const previewOpacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1])
  // scroll cue only at the very top
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-text-primary">
      {/* Cyber-botanical CSS atmosphere (base layer; covered by the pinned video) */}
      <SiteAtmosphere />
      <Navbar />

      <div className="relative z-10">
        {/* ── Pinned, scroll-scrubbed cinematic intro ── */}
        <section ref={introRef} className="relative h-[300vh] md:h-[420vh]">
          <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
            {/* Scrubbed master video */}
            <ScrollScrubVideo
              progress={scrollYProgress}
              mp4={MASTER.mp4}
              webm={MASTER.webm}
              poster={MASTER.poster}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* Premium overlays — blush glow, vignette, bottom fade (no neon) */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,220,200,0.10),transparent_55%)] mix-blend-screen" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.72)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/80" />

            {/* Soft dark scrim behind centred text for legibility */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[min(820px,96vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),rgba(0,0,0,0.28)_46%,transparent_76%)]" />

            {/* Phase 1 · intro label + title */}
            <motion.div
              style={{ opacity: introOpacity }}
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <span className="text-xs tracking-[0.35em] text-white/60">SELECTED WORK</span>
              <h1 className="hero-title mt-6 max-w-3xl text-balance text-4xl leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl">
                The Orbit Room <span className="font-display italic">Archive</span>
              </h1>
            </motion.div>

            {/* Phase 2 · tagline */}
            <motion.div
              style={{ opacity: taglineOpacity }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center opacity-0"
            >
              <p className="hero-subtitle max-w-xl text-balance text-xl leading-relaxed text-white/85 sm:text-2xl md:text-3xl">
                Where design, motion, and digital storytelling{' '}
                <span className="font-display italic">enter orbit.</span>
              </p>
            </motion.div>

            {/* Phase 3 · floating liquid-glass cards (hand / cards moment) */}
            <motion.div
              style={{ opacity: glassOpacity }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0"
            >
              <div className="relative flex items-center justify-center gap-4 sm:gap-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, i % 2 === 0 ? -12 : 10, 0] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
                    className={`liquid-glass h-44 w-28 rounded-2xl sm:h-60 sm:w-40 ${
                      i === 1 ? 'z-10 scale-110' : 'opacity-80'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Phase 4 · project list preview */}
            <motion.div
              style={{ opacity: previewOpacity }}
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0"
            >
              <span className="text-xs tracking-[0.3em] text-white/55">THE ARCHIVE</span>
              <p className="mt-5 max-w-2xl text-balance text-2xl leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Projects presented as{' '}
                <span className="font-display italic">digital artifacts.</span>
              </p>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              style={{ opacity: cueOpacity }}
              className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/55"
            >
              <span className="text-xs tracking-[0.3em]">SCROLL TO ENTER</span>
              <motion.span
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={16} />
              </motion.span>
            </motion.div>
          </div>
        </section>

        {/* ── Interactive project archive ── */}
        <section id="work-list" className="relative bg-transparent px-6 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-14 max-w-container"
          >
            <span className="text-xs tracking-[0.3em] text-white/50">(THE ARCHIVE)</span>
            <h2 className="mt-5 max-w-2xl text-balance text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
              Projects presented as{' '}
              <span className="font-display italic">digital artifacts.</span>
            </h2>
          </motion.div>

          <ProjectShowcase />
        </section>

        <Footer />
      </div>
    </div>
  )
}
