import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'

type VideoPreviewProps = {
  src: string
  poster: string
  title: string
  className?: string
  /** Disable in-view autoplay (e.g. on a detail page hero where hover is enough). */
  autoplayInView?: boolean
}

/**
 * A performance-conscious preview player.
 *
 * - Poster shows immediately; the video itself uses preload="none" so nothing
 *   downloads until the clip is actually needed.
 * - Plays muted + looping on hover (desktop) and when scrolled into view
 *   (mobile / touch), and pauses when it leaves the viewport so we never have a
 *   pile of clips decoding at once.
 */
export default function VideoPreview({
  src,
  poster,
  title,
  className = '',
  autoplayInView = true,
}: VideoPreviewProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [activated, setActivated] = useState(false)

  const play = () => {
    const v = ref.current
    if (!v) return
    setActivated(true)
    v.play().catch(() => {})
  }

  const pause = () => {
    const v = ref.current
    if (!v) return
    v.pause()
  }

  useEffect(() => {
    if (!autoplayInView) return
    const v = ref.current
    if (!v) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          play()
        } else {
          pause()
        }
      },
      { threshold: [0, 0.55, 1] },
    )
    observer.observe(v)
    return () => observer.disconnect()
  }, [autoplayInView])

  return (
    <div
      className={`group/video relative overflow-hidden ${className}`}
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      />
      {/* Play affordance until the clip activates */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          activated ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-white">
          <Play size={18} className="ml-0.5" fill="currentColor" />
        </span>
      </div>
      <span className="sr-only">{title} preview</span>
    </div>
  )
}
