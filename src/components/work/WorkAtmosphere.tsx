import { useEffect, useRef } from 'react'

const MASTER = {
  webm: '/work/work-scroll-master.webm',
  mp4: '/work/work-scroll-master.mp4',
  poster: '/work/work-scroll-master-poster-final.jpg',
}

/**
 * Persistent cyber-floral atmosphere for the entire Work page. Fixed to the
 * viewport (z-0) so the lady/hand artifact never scrolls away — all page content
 * scrolls over it. Kept softly visible (not over-darkened) so the page feels
 * built around the figure. This is a gentle autoplay loop; the pinned intro
 * renders its own scroll-scrubbed copy on top, and when that fades this layer
 * remains, so there is never a black gap.
 */
export default function WorkAtmosphere() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const play = () => {
      v.muted = true
      void v.play().catch(() => {})
    }
    play()
    const onVisible = () => document.visibilityState === 'visible' && play()
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
      aria-hidden="true"
    >
      <img
        src={MASTER.poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.42]"
        draggable="false"
      />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.42]"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        poster={MASTER.poster}
        tabIndex={-1}
      >
        <source src={MASTER.webm} type="video/webm" />
        <source src={MASTER.mp4} type="video/mp4" />
      </video>

      {/* Premium, light overlays — keep the artifact clearly visible (no heavy black) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,220,200,0.08),transparent_55%)] mix-blend-screen" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.72)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/60" />
    </div>
  )
}
