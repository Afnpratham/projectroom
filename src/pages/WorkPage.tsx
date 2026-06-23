import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WorkCinematicBackground from '../components/work/WorkCinematicBackground'
import ProjectShowcase from '../components/work/ProjectShowcase'

/**
 * The Orbit Archive — cinematic Work page.
 * Opens on the divine cyber-organic intro video, then crossfades into the
 * hand / glass-card sequence as the project list rises into view on scroll.
 */
export default function WorkPage() {
  const [vh, setVh] = useState(() => (typeof window === 'undefined' ? 800 : window.innerHeight))
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const { scrollY } = useScroll()

  // Background crossfade: intro fades down, hand fades in (no hard cut).
  const introOpacity = useTransform(scrollY, [0, vh * 0.85], [1, 0])
  const handOpacity = useTransform(scrollY, [vh * 0.35, vh * 1.1], [0, 1])

  // Hero text lifts up and fades as the user scrolls to enter.
  const heroOpacity = useTransform(scrollY, [0, vh * 0.5], [1, 0])
  const heroY = useTransform(scrollY, [0, vh * 0.5], [0, -80])
  const cueOpacity = useTransform(scrollY, [0, vh * 0.25], [1, 0])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-text-primary">
      <WorkCinematicBackground introOpacity={introOpacity} handOpacity={handOpacity} />
      <Navbar />

      <div className="relative z-10">
        {/* ── Cinematic opening screen ── */}
        <section className="relative flex min-h-[100svh] items-center justify-center px-6">
          {/* Soft dark scrim behind the hero text so it stays legible over the
              bright centre of the goddess video. */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[min(820px,96vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.82),rgba(0,0,0,0.55)_42%,rgba(0,0,0,0.2)_68%,transparent_80%)]"
          />
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative flex flex-col items-center text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs tracking-[0.35em] text-white/60"
            >
              SELECTED WORK
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title mt-6 text-balance text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl"
            >
              The Orbit <span className="font-display italic">Archive</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hero-subtitle mt-6 max-w-md text-base leading-relaxed text-white/70"
            >
              Projects shaped through design, motion, and digital storytelling.
            </motion.p>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            style={{ opacity: cueOpacity }}
            className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/55"
          >
            <span className="text-xs tracking-[0.3em]">SCROLL TO ENTER</span>
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={16} />
            </motion.span>
          </motion.div>
        </section>

        {/* ── Project showcase (rises over the hand visual) ── */}
        <section className="relative pb-28 pt-10 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-14 max-w-container px-6"
          >
            <span className="text-xs tracking-[0.3em] text-white/50">(THE ARCHIVE)</span>
            <h2 className="mt-5 max-w-2xl text-balance text-3xl leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
              Selected projects, presented as a living{' '}
              <span className="font-display italic">archive.</span>
            </h2>
          </motion.div>

          <ProjectShowcase />
        </section>

        <Footer />
      </div>
    </div>
  )
}
