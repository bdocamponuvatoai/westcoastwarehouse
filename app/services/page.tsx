import Link from 'next/link'
import { CapabilityIcon, TechnologyIcon } from '@/components/CapabilityIcon'
import { Inquiry } from '@/components/sections/Inquiry'
import { PageIntro } from '@/components/sections/PageIntro'
import { offeringIcons } from '@/components/sections/Panels'
import { JsonLd, webPage } from '@/components/seo/JsonLd'
import { Accent, Arrow, Container, Eyebrow, Photo } from '@/components/ui'
import { offerings, technologies } from '@/content/offerings'
import { home, servicesPage } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

const description =
  'Warehousing, trucking and e-commerce fulfillment: drayage, LTL, long haul, pick to light, retail compliance, EDI and more.'

export const metadata = pageMetadata({ title: 'Services', description, path: '/services' })

const stretched = "after:absolute after:inset-0 after:content-['']"

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
        ]}
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        accent={servicesPage.accent}
        lead={servicesPage.lead}
        image="h1-desktop"
        variant="editorial"
        focus="62% 55%"
        chips={offerings.map((o) => o.name)}
      />

      <section className="theme-light py-24 sm:py-32">
        <Container>
          <ul className="grid gap-5 lg:grid-cols-3">
            {offerings.map((o) => (
              <li key={o.id} className="card card-lift relative grid content-start gap-6 p-4 pb-8">
                <Photo
                  asset={o.image}
                  sizes="(min-width: 64rem) 30vw, 100vw"
                  className="rounded-[1.25rem]"
                  icon={offeringIcons[o.id]}
                />
                <div className="grid gap-4 px-4">
                  <span className="numeral-outline text-5xl" aria-hidden="true">
                    {o.index}
                  </span>
                  <h2 className="display t-2">
                    <Link href={`/services/${o.id}`} className={stretched}>
                      {o.name}
                    </Link>
                  </h2>
                  <p className="text-ink">{o.promise}</p>
                  <span className="link-arrow text-accent" aria-hidden="true">
                    Discover {o.name}
                    <Arrow />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="theme-dark py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <Eyebrow>{home.services.eyebrow}</Eyebrow>
              <h2 className="display t-1 mt-5">
                {home.services.title} <Accent>{home.services.accent}</Accent>
              </h2>
            </div>
            <p className="lead">{home.services.lead}</p>
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            {offerings.map((o) => (
              <div key={o.id}>
                <h3 className="display t-3 border-b border-line pb-4">{o.name}</h3>
                <ul className="mt-6 grid gap-3">
                  {o.capabilities.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-ink">
                      <CapabilityIcon name={c} small />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="theme-block py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <Eyebrow>{servicesPage.technology.eyebrow}</Eyebrow>
              <h2 className="display t-1 mt-5">
                {servicesPage.technology.title} <Accent>{servicesPage.technology.accent}</Accent>
              </h2>
            </div>
            <p className="lead">{servicesPage.technology.lead}</p>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((t) => (
              <li key={t} className="card theme-dark grid content-start gap-5 p-6">
                <TechnologyIcon name={t} />
                <span className="text-lg leading-snug font-semibold">{t}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Inquiry />

      <JsonLd data={webPage('CollectionPage', '/services', 'Services', description)} />
    </>
  )
}
