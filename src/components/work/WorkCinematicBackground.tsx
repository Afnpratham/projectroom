import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, type MotionValue } from 'framer-motion'

type Props = {
  /** 1 at the top, fading to 0 as the user scrolls past the intro. */
  introOpacity: MotionValue<number>
  /** 0 at the top, rising to 1 as the hand sequence takes over. */
  handOpacity: MotionValue<number>
}

const INTRO = {
  webm: '/work/goddess-intro.webm',
  mp4: '/work/goddess-intro.mp4',
  poster: '/work/goddess-intro-poster.jpg',
}
const HAND = {
  webm: '/work/goddess-hand.webm',
  mp4: '/work/goddess-hand.mp4',
  poster: '/work/goddess-hand-poster.jpg',
}

/**
 * Fixed, full-viewport cinematic backdrop for the Work page. Manages the two
 * goddess video layers (intro + hand), keeps autoplay reliable across browser
 * quirks, falls back to poster stills on failure, and lays premium pearl /
 * champagne glows + a soft vignette over the footage so it never washes out.
 *
 * Opacity for each layer is driven by scroll-linked MotionValues from the page.
 */
export default function WorkCinematicBackground({ introOpacity, handOpacity }: Props) {
  const introRef = useRef<HTMLVideoElement>(null)
  const handRef = useRef<HTMLVideoElement>(null)
  const [introFailed, setIntroFailed] = useState(false)
  const [handFailed, setHandFailed] = useState(false)

  const tryPlay = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    const p = video.play()
    if (p !== undefined) p.catch(() => {})
  }, [])

  useEffect(() => {
    const intro = introRef.current
    const hand = handRef.current
    tryPlay(intro)
    tryPlay(hand)

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        tryPlay(introRef.current)
        tryPlay(handRef.current)
      }
    }
    const onInteract = () => {
      tryPlay(introRef.current)
      tryPlay(handRef.current)
    }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('pointerdown', onInteract, { once: true, passive: true })
    window.addEventListener('touchstart', onInteract, { once: true, passive: true })

    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('pointerdown', onInteract)
      window.removeEventListener('touchstart', onInteract)
    }
  }, [tryPlay])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
      {/* ── Intro (divine creature) layer ── */}
      <motion.div className="absolute inset-0" style={{ opacity: introOpacity }}>
        <img
          src={INTRO.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable="false"
        />
        {!introFailed && (
          <video
            ref={introRef}
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={INTRO.poster}
            onError={() => setIntroFailed(true)}
            onCanPlay={() => tryPlay(introRef.current)}
            tabIndex={-1}
          >
            <source src={INTRO.webm} type="video/webm" />
            <source src={INTRO.mp4} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* ── Hand / glass-cards layer ── */}
      <motion.div className="absolute inset-0" style={{ opacity: handOpacity }}>
        <img
          src={HAND.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable="false"
        />
        {!handFailed && (
          <video
            ref={handRef}
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HAND.poster}
            onError={() => setHandFailed(true)}
            onCanPlay={() => tryPlay(handRef.current)}
            tabIndex={-1}
          >
            <source src={HAND.webm} type="video/webm" />
            <source src={HAND.mp4} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* ── Premium cinematic overlays (no harsh blue / neon) ── */}
      {/* Soft blush / champagne glow around centre */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,220,200,0.10),transparent_55%)] mix-blend-screen" />
      {/* Edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.75)_100%)]" />
      {/* Vertical readability fade — heavier toward the bottom for the list */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/80" />
    </div>
  )
}
