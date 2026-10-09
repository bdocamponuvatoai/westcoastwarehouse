import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { isPreview } from '@/lib/seo'

const welcome = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Applebot',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  // Never index Vercel preview deployments.
  if (isPreview()) return { rules: [{ userAgent: '*', disallow: '/' }] }
  return {
    rules: [
      ...welcome.map((userAgent) => ({ userAgent, allow: '/' })),
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
