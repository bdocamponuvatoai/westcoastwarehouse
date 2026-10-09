import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#006199',
    theme_color: '#006199',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      {
        src: '/assets/icon-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
