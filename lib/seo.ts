import type { Metadata } from 'next'
import { site } from '@/content/site'

type PageMeta = {
  title?: string
  description: string
  path: string
  noindex?: boolean
}

export const absolute = (path: string) => `${site.url}${path === '/' ? '' : path}`

const ogImage = { url: '/opengraph-image', width: 1200, height: 630, alt: site.name }

export function pageMetadata({ title, description, path, noindex }: PageMeta): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`
  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: site.locale,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  }
}

export const isPreview = () =>
  process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production'
