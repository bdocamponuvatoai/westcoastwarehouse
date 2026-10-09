import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV !== 'production'

// Static-friendly CSP: Next.js inlines small bootstrap scripts, so 'unsafe-inline' is required
// without a nonce (a nonce would force every page to render dynamically).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "media-src 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  // Only on Vercel (always HTTPS); locally it would break plain-http `next start`.
  ...(process.env.VERCEL ? ['upgrade-insecure-requests'] : []),
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()',
  },
]

// The previous WordPress site lived under /index.php/logistics-*. Keep those links and their
// search ranking alive.
const legacy: Array<[string, string]> = [
  ['logistics-about-us', '/about'],
  ['logistics-services', '/services'],
  ['logistics-warehousing', '/services/warehousing'],
  ['logistics-trucking', '/services/trucking'],
  ['logistics-e-commerce', '/services/e-commerce'],
  ['logistics-rate-estimate', '/rate-estimate'],
  ['logistics-set-an-appointment', '/rate-estimate'],
  ['logistics-send-your-referrals', '/rate-estimate'],
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [
      { source: '/index.php', destination: '/', permanent: true },
      ...legacy.flatMap(([from, to]) => [
        { source: `/index.php/${from}`, destination: to, permanent: true },
        { source: `/${from}`, destination: to, permanent: true },
      ]),
    ]
  },
}

export default nextConfig
