import { getImageProps } from 'next/image'
import { Truck } from 'lucide-react'
import { assets } from '@/content/assets'
import { cta, home } from '@/content/site'
import { Arrow, Button, Container, Eyebrow } from '@/components/ui'

function HeroPicture() {
  const desktop = assets['h1-desktop']
  const mobile = assets['h1-mobile']
  if (!desktop || !mobile) {
    return (
      <div className="photo-pending grid h-full place-items-end p-10" aria-hidden="true">
        <Truck strokeWidth={0.5} className="hidden h-[40vh] w-auto opacity-60 md:block" />
      </div>
    )
  }
  const common = { alt: desktop.alt, sizes: '100vw', fetchPriority: 'high' as const }
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: desktop.src, width: desktop.width, height: desktop.height })
  const {
    props: { srcSet: mobileSet, ...rest },
  } = getImageProps({ ...common, src: mobile.src, width: mobile.width, height: mobile.height })
  return (
    <picture>
      <source media="(min-width: 48rem)" srcSet={desktopSet} />
      <source media="(max-width: 47.99rem)" srcSet={mobileSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...rest} className="h-full w-full object-cover md:object-[72%_50%]" />
    </picture>
  )
}

export function Hero() {
  const { hero } = home
  return (
    <section className="theme-dark relative isolate flex min-h-[100svh] flex-col overflow-clip">
      <div className="hero-frame absolute inset-0 -z-10 overflow-clip">
        <HeroPicture />
        {/* Light touch: shade only where text sits, so the photo carries the hero */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_60_95/0.66)_0%,rgb(0_74_117/0.5)_46%,rgb(0_74_117/0.18)_60%,rgb(0_50_80/0.72)_76%,rgb(0_40_64/0.88)_100%)] md:bg-[linear-gradient(90deg,rgb(0_60_95/0.8)_0%,rgb(0_74_117/0.5)_36%,rgb(0_74_117/0)_62%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 hidden h-2/5 bg-[linear-gradient(0deg,rgb(0_40_64/0.78)_0%,rgb(0_40_64/0)_100%)] md:block"
          aria-hidden="true"
        />
      </div>

      <Container className="flex flex-1 flex-col pt-32 pb-8 md:justify-end md:pt-40">
        <Eyebrow className="hero-rise">{hero.eyebrow}</Eyebrow>
        <h1 className="display t-hero mt-5 max-w-[14ch]">
          {hero.lines.map((line, i) => (
            <span key={line.text} className="hero-line block overflow-clip pb-[0.04em]">
              <span style={{ '--i': i } as React.CSSProperties}>
                {line.text}
                {line.accent ? (
                  <>
                    {' '}
                    <span className="accent-phrase pr-[0.06em]">{line.accent}</span>
                  </>
                ) : null}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-rise mt-8 grid gap-8 md:mt-10 lg:grid-cols-[minmax(0,34rem)_auto] lg:items-end lg:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-ink sm:text-lg" data-speakable>
            {hero.lead}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={cta.primary.href}>{cta.primary.label}</Button>
            <Button
              href={cta.secondary.href}
              variant="outline"
              className="bg-[rgb(0_60_95/0.35)] backdrop-blur-md"
            >
              {cta.secondary.label}
            </Button>
          </div>
        </div>

        <div className="hero-rise mt-auto grid gap-6 border-t border-white/25 pt-6 md:mt-14 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
          <dl className="contents">
            {hero.facts.map((f) => (
              <div key={f.value} className="flex items-baseline gap-3 md:block">
                <dt className="font-display text-3xl font-bold tracking-wide text-accent uppercase md:text-4xl">
                  {f.value}
                </dt>
                <dd className="text-sm text-ink md:mt-1">{f.label}</dd>
              </div>
            ))}
          </dl>
          <a href="#discover" className="link-arrow w-fit text-fg">
            Discover
            <Arrow down />
          </a>
        </div>
      </Container>
    </section>
  )
}
