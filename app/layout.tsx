import type { Metadata, Viewport } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { BackToTop } from '@/components/BackToTop'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Intro } from '@/components/layout/Intro'
import { JsonLd, organization, website } from '@/components/seo/JsonLd'
import { site } from '@/content/site'
import './globals.css'

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display-face',
  display: 'swap',
})

const body = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body-face',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { siteName: site.name, locale: site.locale, type: 'website' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#006199',
}

// Runs before first paint: flags JS (with a 4 s fallback if hydration never happens) and opts
// into the opening intro once per session when motion is allowed.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!window.__wcHydrated)d.classList.remove('js')},4000);try{if(!sessionStorage.getItem('wc-intro')&&matchMedia('(prefers-reduced-motion: no-preference)').matches){d.classList.add('intro');sessionStorage.setItem('wc-intro','1');setTimeout(function(){d.classList.remove('intro')},3800)}}catch(e){}})()`

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="reading-progress" aria-hidden="true" />
        <Intro />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <JsonLd data={[organization(), website()]} />
        {process.env.VERCEL_ENV === 'production' ? <Analytics /> : null}
      </body>
    </html>
  )
}
