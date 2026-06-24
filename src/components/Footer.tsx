import { Link } from 'react-router-dom'
import {
  EMAIL,
  EMAIL_HREF,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
} from '../config/site'

function OrbitMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="foot-g" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#a7abb2" />
        </linearGradient>
      </defs>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path
          key={a}
          d="M32 10 C27 20, 24 28, 25 33 C26 38, 29 42, 32 46 C35 42, 38 38, 39 33 C40 28, 37 20, 32 10Z"
          transform={`rotate(${a} 32 32)`}
          fill="url(#foot-g)"
          opacity="0.7"
        />
      ))}
      <circle cx="32" cy="32" r="3.5" fill="#ffffff" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-stroke px-6 py-14">
      <div className="mx-auto flex max-w-container flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5 text-text-primary">
            <OrbitMark />
            <span className="text-base font-medium tracking-tight">The Orbit Room</span>
          </div>
          <p className="mt-4 text-sm text-muted">Creatives • Videos • Websites</p>
          <p className="font-display text-lg italic text-text-primary/80">Built around your brand.</p>
        </div>

        <nav className="flex flex-col gap-3">
          <span className="text-xs tracking-[0.2em] text-muted">NAVIGATE</span>
          <Link to="/" className="text-sm text-muted transition-colors hover:text-text-primary">
            Work
          </Link>
          <a
            href="/#contact"
            className="text-sm text-muted transition-colors hover:text-text-primary"
          >
            Contact
          </a>
        </nav>

        <nav className="flex flex-col gap-3">
          <span className="text-xs tracking-[0.2em] text-muted">CONNECT</span>
          <a
            href={EMAIL_HREF}
            className="text-sm text-muted transition-colors hover:text-text-primary"
          >
            {EMAIL}
          </a>
          <a
            href={PHONE_HREF}
            className="text-sm text-muted transition-colors hover:text-text-primary"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors hover:text-text-primary"
          >
            Instagram
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors hover:text-text-primary"
          >
            LinkedIn
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted transition-colors hover:text-text-primary"
          >
            WhatsApp
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-12 flex max-w-container flex-col items-center justify-between gap-3 border-t border-stroke pt-6 text-xs text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} The Orbit Room. All rights reserved.</span>
        <span>Creatives, videos, and websites built around your brand.</span>
      </div>
    </footer>
  )
}
