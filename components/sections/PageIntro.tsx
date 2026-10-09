import { MapPin } from 'lucide-react'
import type { AssetKey } from '@/content/assets'
import { site } from '@/content/site'
import {
  Accent,
  Breadcrumbs,
  Button,
  Container,
  Eyebrow,
  Photo,
  cx,
  type Crumb,
} from '@/components/ui'
import { JsonLd, breadcrumbs } from '@/components/seo/JsonLd'

type Props = {
  crumbs: Crumb[]
  eyebrow: string
  title: string
  accent?: string
  lead?: string
  cta?: { label: string; href: string }
  /** Full-bleed photo: right half on desktop, a banner under the header on phones. */
  image?: AssetKey
  /** A few short facts shown as chips under the lead. */
  chips?: readonly string[]
  /** 'split' = photo beside the text; 'editorial' = quiet type, ruled facts, cinematic photo strip. */
  variant?: 'split' | 'editorial'
  /** Focal point of the editorial photo strip (CSS object-position). */
  focus?: string
}

function Editorial({
  crumbs,
  eyebrow,
  title,
  accent,
  lead,
  image,
  chips,
  focus = '50% 50%',
}: Props & { image: AssetKey }) {
  return (
    <section className="theme-dark overflow-clip pt-32 sm:pt-40">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <Breadcrumbs items={crumbs} />
          <p className="hidden text-[0.6875rem] font-semibold tracking-[0.32em] text-muted uppercase sm:block">
            {site.address.city}, California
          </p>
        </div>

        <div className="pt-14 sm:pt-20 lg:pt-24">
          <Eyebrow className="hero-rise">{eyebrow}</Eyebrow>
          <h1 className="display mt-7 max-w-[18ch] text-[clamp(2.9rem,6.4vw,6.25rem)] leading-[0.92] tracking-[0.005em]">
            {title} {accent ? <Accent>{accent}</Accent> : null}
          </h1>
        </div>

        <div className="hero-rise grid gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
          {lead ? (
            <p
              className="text-lg leading-relaxed text-ink lg:col-span-5 lg:text-xl lg:leading-relaxed"
              data-speakable
            >
              {lead}
            </p>
          ) : null}
          {chips?.length ? (
            <ol
              className="border-t border-line lg:col-span-6 lg:col-start-7"
              aria-label="At a glance"
            >
              {chips.map((c, i) => (
                <li key={c} className="flex items-baseline gap-6 border-b border-line py-4 sm:py-5">
                  <span className="w-8 flex-none font-display text-sm font-semibold tracking-[0.12em] text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base tracking-[0.02em] text-fg sm:text-lg">{c}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </Container>

      {/* One cinematic photo, edge to edge: no overlay, no frame */}
      <div
        className="relative h-[min(78vw,36rem)] lg:h-[clamp(26rem,40vw,38rem)]"
        style={{ '--focus': focus } as React.CSSProperties}
      >
        <Photo asset={image} sizes="100vw" priority fill className="intro-still" />
      </div>
      <Container>
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-1 py-5 text-[0.6875rem] font-semibold tracking-[0.2em] text-muted uppercase sm:tracking-[0.28em]">
          <span className="hidden sm:inline">
            Alameda Corridor · Next to the 710 and 91 freeways
          </span>
          <span>10 miles to the LA and Long Beach ports</span>
        </div>
      </Container>
      <JsonLd data={breadcrumbs(crumbs)} />
    </section>
  )
}

function LocationCard({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        'theme-paper flex items-center gap-3 rounded-2xl py-3 pr-5 pl-3 shadow-[0_24px_48px_-20px_rgb(0_30_60/0.6)]',
        className,
      )}
    >
      <span className="grid size-10 flex-none place-items-center rounded-full bg-[#006199] text-[#ffd27a]">
        <MapPin className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="grid leading-tight">
        <span className="text-sm font-semibold text-fg">
          {site.address.city}, {site.address.region} · Alameda Corridor
        </span>
        <span className="text-xs text-muted">10 miles to the LA and Long Beach ports</span>
      </span>
    </div>
  )
}

export function PageIntro(props: Props) {
  const { crumbs, eyebrow, title, accent, lead, cta, image, chips, variant = 'split' } = props
  if (image && variant === 'editorial') return <Editorial {...props} image={image} />
  const text = (
    <>
      <Breadcrumbs items={crumbs} />
      <Eyebrow className="hero-rise mt-8">{eyebrow}</Eyebrow>
      <h1 className="display t-1 mt-5 max-w-6xl">
        {title} {accent ? <Accent>{accent}</Accent> : null}
      </h1>
      {lead ? (
        <p className="lead hero-rise mt-7 max-w-2xl" data-speakable>
          {lead}
        </p>
      ) : null}
      {chips?.length ? (
        <ul className="hero-rise mt-8 flex flex-wrap gap-2" aria-label="At a glance">
          {chips.map((c) => (
            <li
              key={c}
              className="flex min-h-10 items-center gap-2.5 rounded-full bg-white/8 px-4 text-sm text-ink shadow-[inset_0_0_0_1px_var(--line)]"
            >
              <span className="size-1.5 rounded-full bg-pop" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      ) : null}
      {cta ? (
        <div className="hero-rise mt-9">
          <Button href={cta.href}>{cta.label}</Button>
        </div>
      ) : null}
    </>
  )

  if (!image) {
    return (
      <section className="theme-dark overflow-clip pt-36 pb-20 sm:pt-44 sm:pb-24">
        <Container>
          {text}
          <div className="page-hairline mt-16 h-px bg-line" aria-hidden="true" />
        </Container>
        <JsonLd data={breadcrumbs(crumbs)} />
      </section>
    )
  }

  return (
    <section className="theme-dark relative isolate overflow-clip lg:flex lg:min-h-[min(56rem,92svh)] lg:items-center">
      {/* Phones: full-width photo banner under the floating header */}
      <div className="relative h-[min(96vw,30rem)] lg:hidden">
        <Photo
          asset={image}
          sizes="100vw"
          priority
          fill
          className="intro-photo rounded-b-[2.5rem]"
        />
        <LocationCard className="absolute -bottom-7 left-5" />
      </div>

      {/* Desktop: the photo bleeds to the right edge, full height, one large rounded corner */}
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[47%] lg:block">
        <Photo
          asset={image}
          sizes="47vw"
          priority
          fill
          className="intro-photo h-full rounded-bl-[5rem]"
        />
        <LocationCard className="absolute bottom-14 -left-10" />
      </div>

      <Container className="relative pt-16 pb-16 sm:pb-20 lg:py-40">
        <div className="lg:w-[49%] lg:pr-10">{text}</div>
      </Container>
      <JsonLd data={breadcrumbs(crumbs)} />
    </section>
  )
}
