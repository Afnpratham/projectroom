import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STEADY = { src: '/steady-pingpong.mp4', poster: '/steady-poster.jpg' }
const LADY = {
  webm: '/work/work-scroll-master.webm',
  mp4: '/work/work-scroll-master.mp4',
  poster: '/work/work-scroll-master-poster.jpg',
}

type WorkBackgroundProps = {
  lowerAnimationActive: boolean
  lowerAnimationResetKey: number
}

/**
 * Fixed background for the Work page.
 *
 * steady.mp4 owns the hero state. The lower master loop is loaded and played
 * only after the user leaves the hero, then paused and rewound at the top.
 */
export default function WorkBackground({
  lowerAnimationActive,
  lowerAnimationResetKey,
}: WorkBackgroundProps) {
  const ladyRef = useRef<HTMLVideoElement>(null)

  const [vh, setVh] = useState(() => (typeof window === 'undefined' ? 800 : window.innerHeight))
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Crossfade steady -> lady over the first ~70% of a viewport of scrolling.
  const { scrollY } = useScroll()
  const steadyOpacity = useTransform(scrollY, [0, vh * 0.65], [1, 0])
  const ladyOpacity = useTransform(scrollY, [0, vh * 0.7], [0.55, 0.85])

  // Start the lower master loop only when scroll state activates it.
  useEffect(() => {
    const video = ladyRef.current
    if (!video) return

    const resetLowerVideo = () => {
      video.pause()
      try {
        video.currentTime = 0
      } catch {
        // Some browsers reject seeks before metadata is available.
      }
    }

    if (!lowerAnimationActive) {
      if (video.readyState >= 1) {
        resetLowerVideo()
      } else {
        video.addEventListener('loadedmetadata', resetLowerVideo, { once: true })
      }

      return () => {
        video.removeEventListener('loadedmetadata', resetLowerVideo)
      }
    }

    let attempts = 0
    let cancelled = false

    const playFromStart = () => {
      if (cancelled) return
      video.muted = true
      video.loop = true

      if (video.readyState === 0) {
        video.load()
      }

      if (video.readyState >= 1) {
        try {
          video.currentTime = 0
        } catch {
          // Playback can still proceed even when the reset seek is deferred.
        }
      }

      void video.play().catch(() => {})
    }

    const retry = window.setInterval(() => {
      attempts += 1
      void video.play().catch(() => {})
      if (attempts >= 10 || !video.paused) {
        window.clearInterval(retry)
      }
    }, 700)

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        void video.play().catch(() => {})
      }
    }

    playFromStart()
    video.addEventListener('loadedmetadata', playFromStart)
    video.addEventListener('canplay', playFromStart, { once: true })
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      window.clearInterval(retry)
      video.removeEventListener('loadedmetadata', playFromStart)
      video.removeEventListener('canplay', playFromStart)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [lowerAnimationActive, lowerAnimationResetKey])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0b]"
      aria-hidden="true"
    >
      {/* Lower loop — hidden and paused until the user scrolls past the hero */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: lowerAnimationActive ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.video
          ref={ladyRef}
          style={{ opacity: ladyOpacity }}
          className="absolute inset-0 h-full w-full object-cover object-center"
          muted
          loop
          playsInline
          preload={lowerAnimationActive ? 'auto' : 'none'}
          poster={LADY.poster}
          tabIndex={-1}
        >
          <source src={LADY.mp4} type="video/mp4" />
          <source src={LADY.webm} type="video/webm" />
        </motion.video>
      </motion.div>

      {/* Steady ping-pong loop — on top at the top of the page, fades out on scroll */}
      <motion.video
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
