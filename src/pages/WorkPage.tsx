import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollScrubVideo from '../components/work/ScrollScrubVideo'
import ProjectShowcase from '../components/work/ProjectShowcase'

const MASTER = {
  mp4: '/work/work-scroll-master.mp4',
  webm: '/work/work-scroll-master.webm',
  poster: '/work/work-scroll-master-poster.jpg',
  posterFinal: '/work/work-scroll-master-poster-final.jpg',
}

/**
 * The Work page — a premium scroll-driven cinematic portfolio archive.
 *
 * The opening is a pinned section whose sticky viewport holds one master video.
 * Scroll progress maps directly onto the video's currentTime, so scrolling down
 * moves the cyber-floral scene forward and scrolling up reverses it (never an
 * autoplay background). Overlay text appears one phase at a time. After the
 * pinned sequence the project list reveals over the artifact (final frame),
 * which stays softly visible behind the projects — no black dead section.
 */
export default function WorkPage() {
  const introRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ['start start', 'end end'],
  })

  // ── Overlay phases (only one visible at a time) ──
  // 0.00–0.30 · intro label + heading + subtitle
  const introOpacity = useTransform(scrollYProgress, [0, 0.22, 0.3], [1, 1, 0])
  // 0.30–0.60 · single supporting line
  const midOpacity = useTransform(scrollYProgress, [0.3, 0.38, 0.55, 0.6], [0, 1, 1, 0])
  // 0.85–1.00 · enter-the-archive cue
  const enterOpacity = useTransform(scrollYProgress, [0.82, 0.92, 1], [0, 1, 1])
  // scroll cue only at the very top
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-text-primary">
      <Navbar />

      <div className="relative z-10">
        {/* ── Pinned, scroll-scrubbed cinematic intro ── */}
        <section ref={introRef} className="relative h-[320vh] md:h-[420vh]">
          <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
            {/* Scrubbed master video */}
            <ScrollScrubVideo
              progress={scrollYProgress}
              mp4={MASTER.mp4}
              webm={MASTER.webm}
              poster={MASTER.poster}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* Light cinematic overlays — keep the artifact visible (no heavy black) */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,220,200,0.10),transparent_55%)] mix-blend-screen" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.6)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/55" />

            {/* Soft dark scrim behind centred text */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[min(760px,94vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5),rgba(0,0,0,0.22)_48%,transparent_78%)]" />

            {/* Phase 1 · intro */}
            <motion.div
              style={{ opacity: introOpacity }}
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <span className="text-xs tracking-[0.35em] text-white/65">SELECTED WORK</span>
              <h1 className="hero-title mt-6 max-w-3xl text-balance text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
                Projects we built <span className="font-display italic">so far</span>
              </h1>
              <p className="hero-subtitle mt-6 max-w-md text-base leading-relaxed text-white/75">
                A curated archive of websites, videos, and digital experiences shaped for modern
                brands.
              </p>
            </motion.div>

            {/* Phase 2 · supporting line */}
            <motion.div
              style={{ opacity: midOpacity }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center opacity-0"
            >
              <p className="hero-subtitle max-w-xl text-balance text-xl leading-relaxed text-white/85 sm:text-2xl md:text-3xl">
                Design, motion, and digital storytelling{' '}
                <span className="font-display italic">in orbit.</span>
              </p>
            </motion.div>

            {/* Phase 4 · enter cue */}
            <motion.div
              style={{ opacity: enterOpacity }}
              className="pointer-events-none absolute inset-x-0 bottom-16 flex flex-col items-center gap-2 text-center opacity-0"
            >
              <span className="text-xs tracking-[0.3em] text-white/70">ENTER THE ARCHIVE</span>
              <ArrowDown size={16} className="text-white/60" />
            </motion.div>

            {/* Scroll cue (top only) */}
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

        {/* ── Interactive project archive (artifact stays visible behind) ── */}
        <section
          id="work-list"
          className="relative scroll-mt-32 overflow-hidden bg-transparent px-6 pb-28 pt-32 md:pb-40 md:pt-40"
        >
          {/* Persistent artifact background — final scene continues softly */}
          <div className="pointer-events-none absolute inset-0">
            <img
              src={MASTER.posterFinal}
              alt=""
              className="h-full w-full object-cover object-center opacity-30"
              draggable="false"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />
          </div>

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
    </div>
  )
}
