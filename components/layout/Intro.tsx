import Image from 'next/image'
import { site } from '@/content/site'

/**
 * Opening intro, once per session and never with reduced motion. The head script in
 * app/layout.tsx adds html.intro, drives the loading line and counter from real readiness
 * (DOM, fonts, hero photo), then adds html.intro-done to lift the curtain.
 */
export function Intro() {
  const word = site.wordmark.top.split('')
  return (
    <div
      className="site-intro theme-dark pointer-events-none fixed inset-0 z-[90]"
      aria-hidden="true"
    >
      <div className="intro-stage grid place-items-center gap-7 self-center">
        <div className="intro-mark">
          <Image
            src="/assets/logo-mark-transparent.png"
            alt=""
            width={416}
            height={360}
            loading="eager"
            className="h-16 w-auto sm:h-20"
          />
        </div>
        <div className="grid justify-items-center gap-2">
          <p className="intro-word display flex text-[clamp(2.25rem,7vw,3.5rem)] leading-none tracking-[0.06em]">
            {word.map((ch, i) => (
              <span key={i} className="block overflow-clip pb-[0.06em]">
                <span className="block" style={{ '--i': i } as React.CSSProperties}>
                  {ch}
                </span>
              </span>
            ))}
          </p>
          <p className="intro-sub font-display text-[0.8rem] font-semibold tracking-[0.42em] text-accent uppercase">
            {site.wordmark.bottom}
          </p>
        </div>
      </div>

      {/* Loading: a hairline and a counter that follow the page actually getting ready */}
      <div className="intro-loader absolute inset-x-0 bottom-[max(2.5rem,env(safe-area-inset-bottom))] mx-auto flex w-[min(22rem,72vw)] items-center gap-4">
        <span className="relative h-px flex-1 bg-white/20">
          <span className="intro-bar absolute inset-0 origin-left bg-pop" />
        </span>
        <span
          id="intro-count"
          className="font-display text-xs font-semibold tracking-[0.2em] text-muted tabular-nums"
          suppressHydrationWarning
        >
          000
        </span>
      </div>
    </div>
  )
}
