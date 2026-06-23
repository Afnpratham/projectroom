import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const CONTACT_EMAIL = 'mailto:hello@theorbitroom.com'

function OrbitMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="nav-g" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#a7abb2" />
        </linearGradient>
      </defs>
      {/* 6 soft petals arranged radially */}
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path
          key={a}
          d="M32 10 C27 20, 24 28, 25 33 C26 38, 29 42, 32 46 C35 42, 38 38, 39 33 C40 28, 37 20, 32 10Z"
          transform={`rotate(${a} 32 32)`}
          fill="url(#nav-g)"
          opacity="0.7"
        />
      ))}
      <circle cx="32" cy="32" r="3.5" fill="#ffffff" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex w-full max-w-container items-center justify-between rounded-full border border-white/15 bg-black/35 py-2.5 pl-5 pr-2.5 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-shadow duration-500 ${
          scrolled ? 'shadow-[0_14px_46px_-15px_rgba(0,0,0,0.85)]' : ''
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 text-sm font-medium tracking-tight text-text-primary"
        >
          <OrbitMark />
          <span>The Orbit Room</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          <li>
            <Link
              to="/"
              className="rounded-full px-4 py-2 text-sm text-white transition-colors hover:text-white"
            >
              Work
            </Link>
          </li>
          <li>
            <a
              href={CONTACT_EMAIL}
              className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT_EMAIL}
            className="accent-gradient hidden rounded-full px-5 py-2.5 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.03] sm:inline-block"
          >
            Start a Project
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-text-primary md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute left-4 right-4 top-20 md:hidden"
          >
            <ul className="flex flex-col rounded-3xl border border-white/15 bg-black/70 p-4 backdrop-blur-xl">
              <li>
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-base text-text-primary transition-colors hover:bg-white/5"
                >
                  Work
                </Link>
              </li>
              <li>
                <a
                  href={CONTACT_EMAIL}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-base text-text-primary transition-colors hover:bg-white/5"
                >
                  Contact
                </a>
              </li>
              <li className="mt-2">
                <a
                  href={CONTACT_EMAIL}
                  onClick={() => setOpen(false)}
                  className="accent-gradient block rounded-2xl px-4 py-3 text-center text-base font-medium text-bg"
                >
                  Start a Project
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
