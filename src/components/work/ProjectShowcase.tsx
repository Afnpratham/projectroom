import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ImageIcon } from 'lucide-react'
import { portfolio } from '../../data/portfolio'

/**
 * Interactive project list for the Work page.
 *
 * Real portfolio media has not been uploaded yet, so every media slot is a
 * premium grey placeholder (no fabricated visuals). On desktop, hovering a row
 * brightens it, dims the rest, shifts it right, and reveals a large floating
 * liquid-glass preview card. On mobile, each project is a stacked card with its
 * own inline placeholder.
 */

/** Greyish liquid-glass media placeholder used until real assets exist. */
function PlaceholderMedia({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015)_45%,rgba(0,0,0,0.25))] ${className}`}
    >
      <div className="flex flex-col items-center gap-2 text-white/30">
        <ImageIcon size={26} strokeWidth={1.4} />
        <span className="text-[10px] uppercase tracking-[0.25em]">{label}</span>
      </div>
    </div>
  )
}

export default function ProjectShowcase() {
  const [hovered, setHovered] = useState<number | null>(null)
  const active = hovered !== null ? portfolio[hovered] : null

  return (
    <div className="mx-auto grid max-w-container gap-12 lg:grid-cols-[1fr_minmax(360px,460px)] lg:gap-16">
      {/* ── Rows ── */}
      <ul className="flex flex-col" onMouseLeave={() => setHovered(null)}>
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
                      dimmed ? 'text-white/20' : 'text-white/55'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`truncate text-3xl tracking-tight transition-colors lg:text-4xl ${
                        dimmed ? 'text-white/30' : 'text-white'
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={`mt-1.5 text-sm transition-colors ${
                        dimmed ? 'text-white/20' : 'text-white/55'
                      }`}
                    >
                      {p.category}
                    </p>
                  </div>
                  <span
                    className={`text-sm tabular-nums transition-colors ${
                      dimmed ? 'text-white/20' : 'text-white/55'
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

                {/* Mobile card with inline placeholder */}
                <div className="md:hidden">
                  <div className="liquid-glass mb-4 aspect-[16/10] overflow-hidden rounded-2xl">
                    <PlaceholderMedia label="Media coming soon" className="h-full w-full" />
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

      {/* ── Floating preview card (desktop only, hover-driven) ── */}
      <div className="hidden lg:block">
        <div className="sticky top-32">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="liquid-glass overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/50"
              >
                <PlaceholderMedia label="Project media coming soon" className="aspect-video w-full" />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                    {active.category}
                  </p>
                  <h4 className="mt-2 text-xl tracking-tight text-white">{active.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    Portfolio asset pending — case study coming soon.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
