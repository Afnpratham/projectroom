import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Delay before the reveal starts, in seconds */
  delay?: number
  /** Vertical offset to animate from, in pixels */
  y?: number
  className?: string
  /** Render as a different element if needed */
  as?: 'div' | 'section' | 'span' | 'li'
}

/**
 * Lightweight scroll-reveal wrapper. Fades + lifts its children into view once,
 * the first time they enter the viewport. Respects reduced-motion via Framer.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {children}
    </MotionTag>
  )
}
