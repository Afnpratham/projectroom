import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '../../data/portfolio'

/**
 * Interactive project list for the Work page.
 * Desktop: hovering a row brightens it, dims the rest, shifts it right, and
 * updates a floating liquid-glass preview card on the right.
 * Mobile: each project is a compact card with its own inline preview image.
 */
export default function ProjectShowcase() {
  const [hovered, setHovered] = useState<number | null>(null)
  const active = portfolio[hovered ?? 0]

  return (
    <div className="mx-auto grid max-w-container gap-12 px-6 lg:grid-cols-[1fr_minmax(320px,420px)] lg:gap-16">
      {/* ── Rows ── */}
      <ul
        className="flex flex-col"
        onMouseLeave={() => setHovered(null)}
      >
        {portfolio.map((p, i) => {
          const dimmed = hovered !== null && hovered !== i
          return (
            <li key={p.slug}>
              <Link
                to={`/work/${p.slug}`}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                className="group block border-b border-white/10 py-7 transition-colors first:border-t md:py-9"
              >
                {/* Desktop / tablet row */}
                <motion.div
                  animate={{ x: hovered === i ? 14 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                  className="hidden items-center gap-6 md:flex"
                >
                  <span
                    className={`font-display text-2xl tabular-nums transition-colors ${
                      dimmed ? 'text-white/25' : 'text-white/55'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`truncate text-3xl tracking-tight transition-colors lg:text-4xl ${
                        dimmed ? 'text-white/35' : 'text-white group-hover:text-white'
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={`mt-1.5 text-sm transition-colors ${
                        dimmed ? 'text-white/25' : 'text-white/55'
                      }`}
                    >
                      {p.category}
                    </p>
                  </div>
                  <span
                    className={`text-sm tabular-nums transition-colors ${
                      dimmed ? 'text-white/25' : 'text-white/55'
                    }`}
                  >
                    {p.year}
                  </span>
                  <span className="liquid-glass shrink-0 rounded-full px-3.5 py-1.5 text-xs text-white/80">
                    {p.type}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className={`shrink-0 transition-all duration-300 ${
                      hovered === i
                        ? 'translate-x-0.5 -translate-y-0.5 text-white'
                        : dimmed
                          ? 'text-white/20'
                          : 'text-white/45'
                    }`}
                  />
                </motion.div>

                {/* Mobile card with inline preview */}
                <div className="md:hidden">
                  <div className="liquid-glass relative mb-4 aspect-[16/10] overflow-hidden rounded-2xl">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg text-white/55">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="truncate text-xl tracking-tight text-white">{p.title}</h3>
                      </div>
                      <p className="mt-1 text-sm text-white/55">
                        {p.category} · {p.year}
                      </p>
                    </div>
                    <ArrowUpRight size={20} className="mt-1 shrink-0 text-white/55" />
                  </div>
                  <span className="liquid-glass mt-3 inline-block rounded-full px-3 py-1 text-xs text-white/80">
                    {p.type}
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* ── Floating preview card (desktop only) ── */}
      <div className="hidden lg:block">
        <div className="sticky top-32">
          <motion.div
            className="liquid-glass overflow-hidden rounded-3xl bg-white/[0.025] shadow-2xl shadow-black/50"
            animate={{ opacity: hovered === null ? 0.85 : 1, scale: hovered === null ? 0.99 : 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.slug}
                  src={active.thumbnail}
                  alt={active.title}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/45">{active.category}</p>
              <h4 className="mt-2 text-xl tracking-tight text-white">{active.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{active.shortDescription}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
