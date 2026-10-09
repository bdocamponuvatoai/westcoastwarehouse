import Image from 'next/image'
import { site } from '@/content/site'

/** Opening intro: CSS only, once per session (the head script adds html.intro), never with reduced motion. */
export function Intro() {
  return (
    <div
      className="site-intro theme-block pointer-events-none fixed inset-0 z-[90] place-items-center"
      aria-hidden="true"
    >
      <div className="grid justify-items-center gap-6">
        <div className="relative">
          <Image
            src="/assets/logo-mark.png"
            alt=""
            width={208}
            height={180}
            className="h-28 w-auto opacity-25 grayscale"
          />
          <div className="intro-fill absolute inset-0">
            <Image
              src="/assets/logo-mark.png"
              alt=""
              width={208}
              height={180}
              className="h-28 w-auto"
            />
          </div>
        </div>
        <div className="h-px w-40 bg-fg/20">
          <div className="intro-line h-px w-full bg-fg" />
        </div>
        <p className="display text-xl tracking-[0.3em]">{site.shortName}</p>
      </div>
    </div>
  )
}
