import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrubVideo from '../components/work/ScrubVideo'
import ProjectShowcase from '../components/work/ProjectShowcase'

const SCRUB = {
  src: '/work/goddess-sequence.mp4',
  poster: '/work/goddess-sequence-poster.jpg',
}
const HAND = {
  webm: '/work/goddess-hand.webm',
  mp4: '/work/goddess-hand.mp4',
  poster: '/work/goddess-hand-poster.jpg',
}

/**
 * The Orbit Archive — scroll-driven cinematic Work page.
 *
 * The intro section is pinned (300vh tall with a sticky inner viewport). As the
 * user scrolls, the combined goddess sequence (intro → hand) is scrubbed forward
 * frame-by-frame, so it feels like moving through the cinematic scene rather than
 * watching an independent autoplay. The first ~62% of the scroll scrubs the video
 * to its final frame while the title lifts away; the remainder hands off to the
 * looping hand visual, which settles in as the atmospheric background for the
 * interactive project archive below.
 */
export default function WorkPage() {
  const introRef = useRef<HTMLElement>(null)
  const handRef = useRef<HTMLVideoElement>(null)

  // Progress across the pinned intro section (0 at pin start, 1 at pin end).
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ['start start', 'end end'],
  })

  // Scrub the video to its final frame by ~62% of the section scroll, then hold.
  const scrubProgress = useTransform(scrollYProgress, [0, 0.62], [0, 1])

  // Hero text lifts + fades early in the scroll.
  const heroOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, -70])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  // Scrub layer fades out near the end as the looping hand atmosphere rises.
  const scrubLayerOpacity = useTransform(scrollYProgress, [0.78, 0.98], [1, 0])
  const handOpacity = useTransform(scrollYProgress, [0.62, 0.95], [0, 0.6])

  // Best-effort autoplay for the ambient (non-scrubbed) hand background.
  useEffect(() => {
    const v = handRef.current
    if (!v) return
    const play = () => {
      v.muted = true
      void v.play().catch(() => {})
    }
    play()
    document.addEventListener('visibilitychange', play)
    return () => document.removeEventListener('visibilitychange', play)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-text-primary">
      {/* ── Fixed ambient hand atmosphere (behind everything, fades in late) ── */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
        style={{ opacity: handOpacity }}
        aria-hidden="true"
      >
        <img
          src={HAND.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable="false"
        />
        <video
          ref={handRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HAND.poster}
          tabIndex={-1}
        >
          <source src={HAND.webm} type="video/webm" />
          <source src={HAND.mp4} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,220,200,0.10),transparent_55%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.78)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/85" />
      </motion.div>

      <Navbar />

      <div className="relative z-10">
        {/* ── Pinned, scroll-scrubbed cinematic intro ── */}
        <section ref={introRef} className="relative h-[300vh]">
          <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
            {/* Scrubbed video layer */}
            <motion.div className="absolute inset-0" style={{ opacity: scrubLayerOpacity }}>
              <ScrubVideo
                progress={scrubProgress}
                src={SCRUB.src}
                poster={SCRUB.poster}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              {/* Premium overlays — blush glow, vignette, bottom fade (no neon) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,220,200,0.10),transparent_55%)] mix-blend-screen" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.75)_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/80" />
            </motion.div>

            {/* Hero text */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
              {/* Soft dark scrim so the title stays legible over the bright centre */}
              <motion.div
                style={{ opacity: heroOpacity }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[min(820px,96vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.82),rgba(0,0,0,0.55)_42%,rgba(0,0,0,0.2)_68%,transparent_80%)]"
              />
              <motion.div
                style={{ opacity: heroOpacity, y: heroY }}
                className="relative flex w-full max-w-3xl flex-col items-center text-center"
              >
                <span className="text-xs tracking-[0.35em] text-white/60">SELECTED WORK</span>
                <h1 className="hero-title mt-6 text-balance text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl">
                  The Orbit <span className="font-display italic">Archive</span>
                </h1>
                <p className="hero-subtitle mt-6 max-w-md text-base leading-relaxed text-white/70">
                  Projects shaped through design, motion, and digital storytelling.
                </p>
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
            </div>
          </div>
        </section>

        {/* ── Project showcase (rises over the hand atmosphere) ── */}
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
