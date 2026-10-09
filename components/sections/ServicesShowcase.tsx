import Link from 'next/link'
import { offerings } from '@/content/offerings'
import { home } from '@/content/site'
import { CapabilityIcon } from '@/components/CapabilityIcon'
import { HoverPreview } from '@/components/HoverPreview'
import { ServicePills } from '@/components/ServicePills'
import { Accent, Arrow, Container, Eyebrow, Photo } from '@/components/ui'
import { offeringIcons } from './Panels'

export function ServicesShowcase({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const { services } = home
  const H = headingLevel === 1 ? 'h1' : 'h2'
  return (
    <section className="theme-light py-24 sm:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow>{services.eyebrow}</Eyebrow>
            <H className="display t-1 mt-5">
              {services.title} <Accent>{services.accent}</Accent>
            </H>
          </div>
          <div className="grid gap-6">
            <p className="lead" data-speakable>
              {services.lead}
            </p>
            <ServicePills items={offerings.map((o) => ({ id: o.id, label: o.name }))} />
          </div>
        </div>

        <HoverPreview>
          <div className="mt-14 border-b border-line">
            {offerings.map((o, i) => (
              <details
                key={o.id}
                id={`service-${o.id}`}
                name="services"
                open={i === 0}
                className="service-row border-t border-line"
                data-preview={o.image}
              >
                <summary className="grid min-h-24 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-6 sm:gap-8">
                  <span
                    className="numeral-outline text-4xl transition-colors sm:text-6xl"
                    aria-hidden="true"
                  >
                    {o.index}
                  </span>
                  <span className="grid min-w-0 gap-1">
                    <span className="service-name display block text-[clamp(1.75rem,8.5vw,4.6rem)] leading-[0.95]">
                      {o.name}
                    </span>
                    <span className="hidden text-sm text-muted md:block">
                      {o.capabilities.slice(0, 4).join(' · ')}
                    </span>
                  </span>
                  <span className="icon-ring" aria-hidden="true">
                    <span className="plus" />
                  </span>
                </summary>

                <div className="grid gap-5 pb-10 lg:grid-cols-2 lg:gap-6">
                  <Photo
                    asset={o.image}
                    sizes="(min-width: 64rem) 45vw, 100vw"
                    className="rounded-[1.75rem]"
                    icon={offeringIcons[o.id]}
                  />
                  <div className="card grid content-between gap-8 p-7 sm:p-10">
                    <div>
                      <p className="display t-3">{o.headline}</p>
                      <p className="mt-4 text-ink">{o.promise}</p>
                    </div>
                    <ul className="flex flex-wrap gap-2" aria-label={`${o.name} capabilities`}>
                      {o.capabilities.slice(0, 8).map((c) => (
                        <li key={c} className="chip">
                          <CapabilityIcon name={c} small />
                          {c}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/services/${o.id}`} className="link-arrow w-fit text-accent">
                      Discover {o.name}
                      <Arrow />
                    </Link>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </HoverPreview>
      </Container>
    </section>
  )
}
