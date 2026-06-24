import { useEffect, useRef, useState } from 'react'
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
  const heroRef = useRef<HTMLElement>(null)
  const [lowerAnimationActive, setLowerAnimationActive] = useState(false)
  const [lowerAnimationResetKey, setLowerAnimationResetKey] = useState(0)

  useEffect(() => {
    let wasActive = false
    let ticking = false

    const updateLowerAnimationState = () => {
      ticking = false

      const heroRect = heroRef.current?.getBoundingClientRect()
      const heroFullyVisible =
        heroRect !== undefined && heroRect.top >= -1 && heroRect.bottom <= window.innerHeight + 1
      const shouldReset = window.scrollY <= 10 || heroFullyVisible
      const shouldActivate = !shouldReset && window.scrollY > 10

      if (shouldReset) {
        if (wasActive) {
          setLowerAnimationResetKey((key) => key + 1)
        }
        wasActive = false
        setLowerAnimationActive(false)
        return
      }

      if (shouldActivate && !wasActive) {
        wasActive = true
        setLowerAnimationActive(true)
      }
    }

    const requestUpdate = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateLowerAnimationState)
    }

    updateLowerAnimationState()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate, { passive: true })

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-text-primary">
      {/* Fixed background: hero video first, lower loop only after scroll activation */}
      <WorkBackground
        lowerAnimationActive={lowerAnimationActive}
        lowerAnimationResetKey={lowerAnimationResetKey}
      />
      <Navbar />

      <div className="relative z-10">
        {/* ── Hero — text over the fixed background ── */}
        <section
          ref={heroRef}
          className="relative flex min-h-[100svh] items-center justify-center px-6 text-center"
        >
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

        {/* ── Ordered portfolio sections over the same fixed background ── */}
        <section
          id="work-list"
          className="relative scroll-mt-24 overflow-hidden"
        >
          <ProjectShowcase />
        </section>

        <Footer />
      </div>
    </main>
  )
}
