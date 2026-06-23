import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STEADY = { src: '/steady.mp4', poster: '/steady-poster.jpg' }
const LADY = {
  webm: '/work/work-scroll-master.webm',
  mp4: '/work/work-scroll-master.mp4',
  poster: '/work/work-scroll-master-poster.jpg',
}

/**
 * Permanent fixed background for the whole Work page.
 *
 * Two continuously-playing video layers (never scroll-scrubbed):
 *   • steady.mp4  — the idle opening loop, shown at the top of the page.
 *   • the lady    — the cyber-floral master loop, the persistent background.
 *
 * The layer is fixed to the viewport, so it never moves with scroll. As the user
 * scrolls away from the top, the steady idle video gently crossfades into the
 * lady loop (which is always playing underneath), so the background stays alive
 * and there is never a black gap. Content scrolls above this at a higher z-index.
 */
export default function WorkBackground() {
  const steadyRef = useRef<HTMLVideoElement>(null)
  const ladyRef = useRef<HTMLVideoElement>(null)

  const [vh, setVh] = useState(() => (typeof window === 'undefined' ? 800 : window.innerHeight))
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Crossfade steady → lady over the first ~70% of a viewport of scrolling.
  const { scrollY } = useScroll()
  const steadyOpacity = useTransform(scrollY, [0, vh * 0.65], [1, 0])
  const ladyOpacity = useTransform(scrollY, [0, vh * 0.7], [0.55, 0.85])

  // Keep both videos playing (autoplay can be deferred by the browser).
  useEffect(() => {
    const play = () => {
      for (const v of [steadyRef.current, ladyRef.current]) {
        if (!v) continue
        v.muted = true
        void v.play().catch(() => {})
      }
    }
    play()
    const onVisible = () => document.visibilityState === 'visible' && play()
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('pointerdown', play, { once: true, passive: true })
    window.addEventListener('touchstart', play, { once: true, passive: true })
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('pointerdown', play)
      window.removeEventListener('touchstart', play)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0b]"
      aria-hidden="true"
    >
      {/* Lady loop — always playing, the persistent background */}
      <motion.video
        ref={ladyRef}
        style={{ opacity: ladyOpacity }}
        className="absolute inset-0 h-full w-full object-cover object-center"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        poster={LADY.poster}
        tabIndex={-1}
      >
        <source src={LADY.webm} type="video/webm" />
        <source src={LADY.mp4} type="video/mp4" />
      </motion.video>

      {/* Steady idle loop — on top at the top of the page, fades out on scroll */}
      <motion.video
        ref={steadyRef}
        style={{ opacity: steadyOpacity }}
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={STEADY.src}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        poster={STEADY.poster}
        tabIndex={-1}
      />

      {/* Premium, light overlays — keep the figure clearly visible (no heavy black) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,220,200,0.08),transparent_55%)] mix-blend-screen" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/15 to-black/55" />
    </div>
  )
}
