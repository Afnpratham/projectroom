/**
 * Central place for all contact / social details and cross-site links.
 * Update a value here and it propagates everywhere across the site.
 */

export const INSTAGRAM_URL = 'https://www.instagram.com/theorbitroom1/'

/** Public-facing LinkedIn company page (NOT the admin dashboard). */
export const LINKEDIN_URL = 'https://www.linkedin.com/company/133284067/'

export const EMAIL = 'theorbitroom1@gmail.com'
export const EMAIL_HREF = `mailto:${EMAIL}`

/** Display number and the tel: link used by phone buttons. */
export const PHONE_DISPLAY = '+91 73399 28960'
export const PHONE_HREF = 'tel:+917339928960'

/** WhatsApp with a pre-filled message so the chat opens ready to send. */
export const WHATSAPP_MESSAGE = 'Hi The Orbit Room, I want to discuss a project.'
export const WHATSAPP_URL = `https://wa.me/917339928960?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

/**
 * The Orbit Room — the main agency / brand site this portfolio belongs to.
 * Deployment Protection is currently enabled on the Vercel project, so this
 * canonical URL is gated until protection is turned off (or a custom domain is
 * added — paste it here if so).
 */
export const ORBIT_ROOM_URL = 'https://orbitroom-afn-pratham-99.vercel.app'
