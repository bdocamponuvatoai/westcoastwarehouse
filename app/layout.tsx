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

// Runs before first paint: flags JS (with a 4 s fallback if hydration never happens) and, once
// per session when motion is allowed, runs the opening intro. Progress follows real readiness —
// DOM parsed, fonts loaded, hero photo decoded — and the line and counter ease toward it each
// frame. The curtain lifts once they show 100 and the logo has finished drawing (≥ 1.75 s);
// a 3.6 s cap means a slow network never holds the page back.
const boot = `(function(){
var d=document.documentElement;d.classList.add('js');
setTimeout(function(){if(!window.__wcHydrated)d.classList.remove('js')},4000);
try{if(sessionStorage.getItem('wc-intro')||!matchMedia('(prefers-reduced-motion: no-preference)').matches)return;sessionStorage.setItem('wc-intro','1')}catch(e){return}
d.classList.add('intro');
var t0=performance.now(),MIN=1750,target=0.06,shown=0,loaded=false,left=false;
function set(v){if(v>target)target=v}
function exit(){if(left)return;left=true;d.classList.add('intro-done');setTimeout(function(){d.classList.remove('intro','intro-done');d.style.removeProperty('--intro-p')},1000)}
function tick(now){if(left)return;if(!loaded)set(Math.min(0.9,target+(0.9-target)*0.015));shown+=Math.max(0.006,(target-shown)*0.09);if(shown>target)shown=target;d.style.setProperty('--intro-p',shown.toFixed(3));var c=document.getElementById('intro-count');if(c)c.textContent=('00'+Math.round(shown*100)).slice(-3);if(loaded&&shown>=0.999&&now-t0>=MIN){setTimeout(exit,180);return}requestAnimationFrame(tick)}
requestAnimationFrame(tick);
function finish(){loaded=true;set(1)}
function hero(){var i=document.querySelector('img[fetchpriority="high"]');if(!i||i.complete)return Promise.resolve();return new Promise(function(r){i.addEventListener('load',r,{once:true});i.addEventListener('error',r,{once:true})})}
function ready(){set(0.4);var f=document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve();Promise.all([f.then(function(){set(0.65)}),hero().then(function(){set(0.85)})]).then(finish,finish)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
setTimeout(finish,2800);setTimeout(exit,3600);
})()`

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
