import type { MetadataRoute } from 'next'
import { offerings } from '@/content/offerings'
import { absolute } from '@/lib/seo'

const lastModified = new Date('2026-10-09')

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<[string, number]> = [
    ['/', 1],
    ['/services', 0.9],
    ...offerings.map((o): [string, number] => [`/services/${o.id}`, 0.8]),
    ['/about', 0.7],
    ['/process', 0.7],
    ['/rate-estimate', 0.9],
  ]
  return pages.map(([path, priority]) => ({
    url: absolute(path),
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }))
}
