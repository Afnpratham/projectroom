import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageCircle,
  Move,
  Phone,
  Play,
} from 'lucide-react'
import {
  creatives,
  videoProjects,
  websiteProjects,
  type Creative,
  type PortfolioProject,
} from '../../data/portfolio'
import {
  EMAIL,
  EMAIL_HREF,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
} from '../../config/site'
import VideoPreview from '../VideoPreview'

/* ═══════════════════════════════════════════════════════════════════════════
   Small hooks
   ═══════════════════════════════════════════════════════════════════════════ */

/** Reactive matchMedia — used to swap the 3D coverflow for a mobile swiper. */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  )
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/* ═══════════════════════════════════════════════════════════════════════════
   3D COVERFLOW — draggable, looping, with inertia + snap
   ───────────────────────────────────────────────────────────────────────────
   The whole carousel is driven by a single continuous float `position` (in
   "card" units). Each card's screen transform is derived from its signed,
   wrapped distance to that position, so the cards always live on a clean curved
   arc — they never stack on top of each other and text never collides.
   ═══════════════════════════════════════════════════════════════════════════ */

function Coverflow({ projects }: { projects: PortfolioProject[] }) {
  const count = projects.length

  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(1100)

  // The physics live in refs (read only inside the rAF loop + handlers) so the
  // loop never re-subscribes; `pos`/`isDragging` mirror them into state so the
  // render derives transforms from state, never from a ref.
  const posRef = useRef(0)
  const velRef = useRef(0)
  const snapTargetRef = useRef<number | null>(null)
  const draggingRef = useRef(false)
  const movedRef = useRef(false)
  const startXRef = useRef(0)
  const startPosRef = useRef(0)

  const [pos, setPos] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Track the container width to keep the arc responsive.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => setWidth(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Animation loop: snap-to-target → inertia → settle to nearest card.
  useEffect(() => {
    let raf = 0
    const loop = () => {
      if (!draggingRef.current) {
        if (snapTargetRef.current !== null) {
          const diff = snapTargetRef.current - posRef.current
          if (Math.abs(diff) > 0.001) {
            posRef.current += diff * 0.16
          } else {
            posRef.current = snapTargetRef.current
            snapTargetRef.current = null
          }
          velRef.current = 0
          setPos(posRef.current)
        } else if (Math.abs(velRef.current) > 0.0016) {
          posRef.current += velRef.current
          velRef.current *= 0.92
          setPos(posRef.current)
        } else if (velRef.current !== 0) {
          velRef.current = 0
          // settle onto the nearest card
          snapTargetRef.current = Math.round(posRef.current)
        } else {
          const nearest = Math.round(posRef.current)
          if (Math.abs(nearest - posRef.current) > 0.0005) {
            posRef.current += (nearest - posRef.current) * 0.16
            setPos(posRef.current)
          }
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Responsive geometry derived from the measured width.
  const cardW = Math.min(380, Math.max(248, width * 0.34))
  const stepX = cardW * 0.74
  const depth = cardW * 0.62
  const maxVisible = Math.min(2, Math.floor(count / 2))

  const activeIndex = ((Math.round(pos) % count) + count) % count

  /* ── pointer / drag ─────────────────────────────────────────── */
  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true
    setIsDragging(true)
    movedRef.current = false
    velRef.current = 0
    snapTargetRef.current = null
    startXRef.current = e.clientX
    startPosRef.current = posRef.current
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const dx = e.clientX - startXRef.current
    if (Math.abs(dx) > 4) movedRef.current = true
    const dragDist = Math.max(width * 0.46, 240) // px to advance one card
    const next = startPosRef.current - dx / dragDist
    velRef.current = next - posRef.current
    posRef.current = next
    setPos(next)
  }

  const onPointerUp = () => {
    if (!draggingRef.current) return
    draggingRef.current = false
    setIsDragging(false)
    velRef.current = Math.max(-0.42, Math.min(0.42, velRef.current))
    if (Math.abs(velRef.current) < 0.012) {
      velRef.current = 0
      snapTargetRef.current = Math.round(posRef.current)
    }
  }

  const goTo = (dir: number) => {
    velRef.current = 0
    snapTargetRef.current = Math.round(posRef.current) + dir
  }

  // Bring a clicked side card to the front along the shortest path.
  const focusCard = (index: number) => {
    velRef.current = 0
    const base = Math.round((posRef.current - index) / count) * count + index
    snapTargetRef.current = base
  }

  return (
    <div
      ref={containerRef}
      className={`coverflow${isDragging ? ' coverflow--dragging' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className="coverflow-stage">
        {projects.map((project, index) => {
          // signed, wrapped distance from the current position
          let off = index - pos
          off = ((off % count) + count) % count
          if (off > count / 2) off -= count

          const abs = Math.abs(off)
          const hidden = abs > maxVisible + 0.5
          const clamped = Math.max(-1.6, Math.min(1.6, off))
          const isActive = index === activeIndex

          const translateX = off * stepX
          const translateZ = -abs * depth
          const rotateY = -clamped * 30
          const scale = Math.max(0.66, 1 - abs * 0.14)
          const opacity = hidden ? 0 : Math.max(0, 1 - abs * 0.34)
          const blur = abs < 0.4 ? 0 : Math.min(abs * 2.4, 6)
          const zIndex = 100 - Math.round(abs * 10)

          return (
            <div
              key={project.slug}
              className={`cf-card${isActive ? ' cf-card--active' : ''}`}
              style={{
                width: cardW,
                transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                filter: blur ? `blur(${blur}px)` : undefined,
                pointerEvents: hidden ? 'none' : 'auto',
              }}
              aria-hidden={hidden}
            >
              <CoverflowCard
                project={project}
                index={index}
                isActive={isActive}
                onActivate={() => focusCard(index)}
                wasDragged={() => movedRef.current}
              />
            </div>
          )
        })}
      </div>

      <button
        type="button"
        className="cf-nav cf-nav--prev"
        onClick={() => goTo(-1)}
        aria-label="Previous project"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        className="cf-nav cf-nav--next"
        onClick={() => goTo(1)}
        aria-label="Next project"
      >
        <ChevronRight size={20} />
      </button>

      <div className="cf-dots">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            className={`cf-dot${i === activeIndex ? ' cf-dot--active' : ''}`}
            onClick={() => focusCard(i)}
            aria-label={`Go to ${p.title}`}
          />
        ))}
      </div>
    </div>
  )
}

function CoverflowCard({
  project,
  index,
  isActive,
  onActivate,
  wasDragged,
}: {
  project: PortfolioProject
  index: number
  isActive: boolean
  onActivate: () => void
  wasDragged: () => boolean
}) {
  const handleClick = (e: React.MouseEvent) => {
    // A drag should never trigger navigation or focus.
    if (wasDragged()) {
      e.preventDefault()
      return
    }
    // Clicking a side card recentres it instead of navigating.
    if (!isActive) {
      e.preventDefault()
      onActivate()
    }
  }

  return (
    <Link
      to={`/work/${project.slug}`}
      className="cf-card-inner"
      onClick={handleClick}
      draggable={false}
      tabIndex={isActive ? 0 : -1}
    >
      <div className="cf-card-media">
        {isActive && project.mediaType === 'video' ? (
          <VideoPreview
            src={project.preview}
            poster={project.thumbnail}
            title={project.title}
            className="h-full w-full"
          />
        ) : (
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover"
          />
        )}
        <span className="cf-card-badge">{project.type}</span>
      </div>
      <div className="cf-card-body">
        <div className="cf-card-row">
          <span className="cf-card-num">{String(index + 1).padStart(2, '0')}</span>
          <ArrowUpRight size={18} className="cf-card-arrow" />
        </div>
        <p className="cf-card-cat">{project.category}</p>
        <h3 className="cf-card-title">{project.title}</h3>
        <p className="cf-card-desc">{project.description}</p>
        <div className="cf-card-tags">
          <span className="cf-tag">{project.year}</span>
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="cf-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILE SWIPER — clean one-card-at-a-time carousel
   ═══════════════════════════════════════════════════════════════════════════ */

function MobileSwiper({ projects }: { projects: PortfolioProject[] }) {
  const [current, setCurrent] = useState(0)
  const startX = useRef(0)
  const delta = useRef(0)

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    delta.current = 0
  }
  const onTouchMove = (e: React.TouchEvent) => {
    delta.current = e.touches[0].clientX - startX.current
  }
  const onTouchEnd = () => {
    if (delta.current > 55 && current > 0) setCurrent((c) => c - 1)
    else if (delta.current < -55 && current < projects.length - 1)
      setCurrent((c) => c + 1)
    delta.current = 0
  }

  return (
    <div className="mswipe">
      <div
        className="mswipe-track"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ transform: `translateX(calc(${current * -88}% - ${current * 12}px))` }}
      >
        {projects.map((project, index) => (
          <div className="mswipe-slide" key={project.slug}>
            <Link
              to={`/work/${project.slug}`}
              className="cf-card-inner"
              draggable={false}
            >
              <div className="cf-card-media">
                {index === current && project.mediaType === 'video' ? (
                  <VideoPreview
                    src={project.preview}
                    poster={project.thumbnail}
                    title={project.title}
                    className="h-full w-full"
                  />
                ) : (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="cf-card-badge">{project.type}</span>
              </div>
              <div className="cf-card-body">
                <div className="cf-card-row">
                  <span className="cf-card-num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <ArrowUpRight size={18} className="cf-card-arrow" />
                </div>
                <p className="cf-card-cat">{project.category}</p>
                <h3 className="cf-card-title">{project.title}</h3>
                <p className="cf-card-desc">{project.description}</p>
                <div className="cf-card-tags">
                  <span className="cf-tag">{project.year}</span>
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="cf-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="cf-dots cf-dots--mobile">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            className={`cf-dot${i === current ? ' cf-dot--active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to ${p.title}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════════════════════════════ */

function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`pf-head${align === 'center' ? ' pf-head--center' : ''}`}
    >
      <span className="pf-eyebrow">{eyebrow}</span>
      <h2 className="pf-title">{title}</h2>
      <p className="pf-desc">{description}</p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   01 / WEBSITES
   ═══════════════════════════════════════════════════════════════════════════ */

function WebsiteSection() {
  const isMobile = useMediaQuery('(max-width: 860px)')

  return (
    <section id="websites" className="pf-section ws-section">
      <div className="pf-inner">
        <div className="ws-head">
          <SectionHeader
            eyebrow="01 / Websites"
            title="Websites we've built"
            description="Drag through the website archive. Each preview plays a muted walkthrough — open a card for the full case study."
          />
          {!isMobile && (
            <div className="ws-drag-hint">
              <Move size={15} />
              <span>Drag to explore</span>
            </div>
          )}
        </div>
      </div>

      {isMobile ? (
        <MobileSwiper projects={websiteProjects} />
      ) : (
        <Coverflow projects={websiteProjects} />
      )}
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   02 / CREATIVE — compact masonry gallery
   ═══════════════════════════════════════════════════════════════════════════ */

function CreativeCard({ creative }: { creative: Creative }) {
  return (
    <figure className={`cr-card cr-card--${creative.orientation}`}>
      <img
        src={creative.image}
        alt={creative.title}
        loading="lazy"
        className="cr-card-img"
      />
      <figcaption className="cr-card-cap">
        <p className="cr-card-cat">{creative.category}</p>
        <p className="cr-card-title">{creative.title}</p>
      </figcaption>
    </figure>
  )
}

function CreativeSection() {
  return (
    <section className="pf-section cr-section">
      <div className="pf-inner">
        <SectionHeader
          eyebrow="02 / Creative"
          title="Creative portfolio"
          description="Brand campaigns, event posters, and social creatives — visual systems designed to stop the scroll and carry a message clearly."
        />
        <div className="cr-grid">
          {creatives.map((creative) => (
            <div className="cr-item" key={creative.title}>
              <CreativeCard creative={creative} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   03 / VIDEOS — compact 16:9 grid
   ═══════════════════════════════════════════════════════════════════════════ */

function VideoCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <Link to={`/work/${project.slug}`} className="vg-card">
      <div className="vg-card-media">
        <VideoPreview
          src={project.preview}
          poster={project.thumbnail}
          title={project.title}
          className="h-full w-full"
        />
        <span className="vg-card-play">
          <Play size={15} className="ml-0.5" fill="currentColor" />
        </span>
      </div>
      <div className="vg-card-body">
        <div className="cf-card-row">
          <span className="cf-card-num">{String(index + 1).padStart(2, '0')}</span>
          <ArrowUpRight size={16} className="cf-card-arrow" />
        </div>
        <p className="cf-card-cat">{project.category}</p>
        <h3 className="vg-card-title">{project.title}</h3>
        <div className="cf-card-tags">
          <span className="cf-tag">{project.year}</span>
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="cf-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

function VideoSection() {
  return (
    <section className="pf-section vg-section">
      <div className="pf-inner">
        <SectionHeader
          eyebrow="03 / Videos"
          title="Videos we've edited"
          description="Cinematic short films and short-form edits — paced, graded, and built to hold attention."
        />
        <div className="vg-grid">
          {videoProjects.map((project, index) => (
            <VideoCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function ProjectShowcase() {
  return (
    <>
      <WebsiteSection />
      <CreativeSection />
      <VideoSection />

      <section id="contact" className="pf-section contact-section">
        <div className="pf-inner contact-inner">
          <span className="pf-eyebrow">04 / Contact</span>
          <h2 className="contact-heading">
            Let&apos;s build the next room around your brand.
          </h2>
          <div className="contact-links">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.98 }}
              className="contact-btn-primary"
            >
              <MessageCircle size={17} />
              Start on WhatsApp
            </motion.a>
            <a href={EMAIL_HREF} className="contact-btn-secondary">
              <Mail size={17} />
              {EMAIL}
            </a>
            <a href={PHONE_HREF} className="contact-btn-secondary">
              <Phone size={17} />
              {PHONE_DISPLAY}
            </a>
          </div>
          <div className="contact-social">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="contact-social-link">
              Instagram
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="contact-social-link">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
