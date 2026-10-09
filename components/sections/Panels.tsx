import Link from 'next/link'
import { Container as ContainerIcon, ShoppingCart, Warehouse, type LucideIcon } from 'lucide-react'
import { offerings, type Offering } from '@/content/offerings'
import { home } from '@/content/site'
import { Accent, Arrow, Container, Eyebrow, Photo } from '@/components/ui'

export const offeringIcons: Record<Offering['id'], LucideIcon> = {
  warehousing: Warehouse,
  trucking: ContainerIcon,
  'e-commerce': ShoppingCart,
}

/** Discipline panels: the hovered/focused panel widens on desktop; stacked rows on phones. */
export function Panels() {
  const { panels } = home
  return (
    <section id="discover" className="theme-light py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow>{panels.eyebrow}</Eyebrow>
            <h2 className="display t-1 mt-5">
              {panels.title} <Accent>{panels.accent}</Accent>
            </h2>
          </div>
        </div>

        <div className="panels mt-14 grid gap-4">
          {offerings.map((o, i) => (
            <article
              key={o.id}
              className="panel card card-lift relative overflow-clip"
              data-open={i === 0 ? '' : undefined}
              data-reveal
            >
              <div className="grid gap-6 p-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:p-5 lg:hidden">
                <Photo
                  asset={o.image}
                  sizes="(min-width: 40rem) 40vw, 100vw"
                  className="rounded-[1.25rem]"
                  icon={offeringIcons[o.id]}
                />
                <PanelBody offering={o} />
              </div>

              {/* Desktop: dark panel; the photo wipes up under a scrim when the panel opens */}
              <div className="panel-desktop theme-dark relative hidden h-full !bg-surface lg:flex">
                <div className="panel-media absolute inset-0" aria-hidden="true">
                  <Photo asset={o.image} sizes="60vw" fill icon={offeringIcons[o.id]} />
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(0_97_153/0.94)_0%,rgb(0_97_153/0.55)_55%,rgb(0_97_153/0.2)_100%)]" />
                </div>
                <PanelBody offering={o} desktop />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

function PanelBody({ offering: o, desktop }: { offering: Offering; desktop?: boolean }) {
  const caps = o.capabilities.slice(0, 6)
  return (
    <div
      className={
        desktop
          ? 'panel-body relative flex h-full w-full flex-col justify-between p-8 xl:p-10'
          : 'panel-body flex flex-col gap-4 py-1 sm:py-3'
      }
    >
      <span className="numeral-outline text-5xl" aria-hidden="true">
        {o.index}
      </span>
      <div className={desktop ? 'panel-text text-fg' : ''}>
        <h3 className="display t-2">
          <Link
            href={`/services/${o.id}`}
            className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none"
          >
            {o.name}
          </Link>
        </h3>
        <p className="mt-3 max-w-md text-ink">{o.short}</p>
        <ul
          className="panel-caps mt-6 grid gap-2 text-sm text-ink"
          aria-label={`${o.name} capabilities`}
        >
          {caps.map((c, i) => (
            <li
              key={c}
              className="flex items-center gap-3"
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className="size-1.5 flex-none rounded-full bg-pop" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
        <span className="link-arrow mt-6" aria-hidden="true">
          Discover {o.name}
          <Arrow />
        </span>
      </div>
    </div>
  )
}
