import { useEffect, useRef } from 'react'
import { type MotionValue, useMotionValueEvent } from 'framer-motion'

type Props = {
  /** Scroll progress 0 → 1 that maps onto the video timeline. */
  progress: MotionValue<number>
  /** mp4 listed first — it is the all-keyframe master, ideal for seeking. */
  mp4: string
  webm: string
  poster: string
  className?: string
}

/**
 * Scroll-scrubbed master video. The video is never played — its currentTime is
 * driven entirely by a scroll-linked MotionValue, so scrolling down moves the
 * cinematic scene forward and scrolling up reverses it. A requestAnimationFrame
 * loop eases currentTime toward the scroll target so fast scrolls feel smooth.
 *
 * Honours: waits for metadata before seeking, stays paused, muted + playsInline,
 * preload="auto", poster shown until the first frame is ready, and a one-time
 * prime so iOS Safari permits programmatic seeking.
 */
export default function ScrollScrubVideo({ progress, mp4, webm, poster, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const durationRef = useRef(0)
  const targetRef = useRef(0)
  const readyRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  // Keep the seek target in sync with scroll progress.
  useMotionValueEvent(progress, 'change', (p) => {
    const clamped = Math.min(1, Math.max(0, p))
    targetRef.current = clamped * durationRef.current
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleMetadata = () => {
      durationRef.current = video.duration || 0
      video.muted = true
      // Prime once so mobile Safari allows programmatic currentTime control.
      const primed = video.play()
      if (primed !== undefined) {
        primed
          .then(() => {
            video.pause()
            readyRef.current = true
          })
          .catch(() => {
            readyRef.current = true
          })
      } else {
        readyRef.current = true
      }
      targetRef.current = Math.min(1, Math.max(0, progress.get())) * durationRef.current
    }

    if (video.readyState >= 1) handleMetadata()
    else video.addEventListener('loadedmetadata', handleMetadata)

    // Smoothing loop: ease currentTime toward the scroll target.
    const tick = () => {
      const v = videoRef.current
      if (v && readyRef.current && durationRef.current > 0) {
        const current = v.currentTime
        const target = targetRef.current
        const delta = target - current
        if (Math.abs(delta) > 0.01) {
          try {
            v.currentTime = current + delta * 0.18
          } catch {
            /* seek not ready yet */
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [progress])

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      playsInline
      preload="auto"
      poster={poster}
      tabIndex={-1}
      aria-hidden="true"
    >
      {/* mp4 first: it is the all-keyframe master used for smooth scrubbing. */}
      <source src={mp4} type="video/mp4" />
      <source src={webm} type="video/webm" />
    </video>
  )
}
