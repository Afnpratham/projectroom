import { useEffect, useRef } from 'react'
import { type MotionValue, useMotionValueEvent } from 'framer-motion'

type Props = {
  /** Scroll progress 0 → 1 that maps to the video timeline. */
  progress: MotionValue<number>
  /** H.264 mp4 source (encoded all-keyframe so every frame is seekable). */
  src: string
  poster: string
  className?: string
}

/**
 * Scroll-scrubbed video. The video never autoplays — instead its currentTime is
 * driven by a scroll-linked MotionValue, so scrolling moves the cinematic scene
 * forward frame-by-frame. A requestAnimationFrame loop eases currentTime toward
 * the scroll target so fast scrolls feel smooth rather than snapping.
 *
 * Requirements honoured: waits for metadata before seeking, muted + playsInline,
 * preload="auto", poster shown until the first frame is ready, primed once so
 * iOS Safari allows programmatic seeking.
 */
export default function ScrubVideo({ progress, src, poster, className }: Props) {
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
      // Prime once so mobile Safari permits programmatic currentTime control.
      video.muted = true
      const primed = video.play()
      if (primed !== undefined) {
        primed
          .then(() => {
            video.pause()
            readyRef.current = true
          })
          .catch(() => {
            // Autoplay blocked is fine — we only seek, never play.
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
          const next = current + delta * 0.18
          try {
            v.currentTime = next
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
      src={src}
    />
  )
}
