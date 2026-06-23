/**
 * Lightweight, CSS-only cyber-botanical ambient layer used behind the
 * project-detail pages of the standalone Work site. Pure gradients (no video)
 * so detail pages stay fast — the Work page itself carries the heavy cinematic
 * video atmosphere. Sits at z-0, behind page content (z-10+).
 */
export default function SiteAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
      {/* Soft pearl core glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.05),transparent_45%)] mix-blend-screen" />
      {/* Warm blush / champagne wash, off-centre */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(255,220,200,0.06),transparent_55%)] mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_85%,rgba(255,210,225,0.045),transparent_55%)] mix-blend-screen" />
      {/* Slow breathing bloom near the bottom */}
      <div className="absolute inset-0 animate-glow-pulse bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.05),transparent_60%)]" />
      {/* Edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)]" />
      {/* Gentle vertical depth fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/45" />
    </div>
  )
}
