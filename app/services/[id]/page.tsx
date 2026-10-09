import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CapabilityIcon, IconRing } from '@/components/CapabilityIcon'
import { CtaBlock } from '@/components/sections/CtaBlock'
import { Inquiry } from '@/components/sections/Inquiry'
import { PageIntro } from '@/components/sections/PageIntro'
import { offeringIcons } from '@/components/sections/Panels'
import { JsonLd, service, webPage } from '@/components/seo/JsonLd'
import { Accent, Arrow, Container, Eyebrow, Photo } from '@/components/ui'
import type { AssetKey } from '@/content/assets'
import { getOffering, offerings, type Offering } from '@/content/offerings'
import { about, cta, site } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return offerings.map((o) => ({ id: o.id }))
}

export async function generateMetadata({ params }: PageProps<'/services/[id]'>) {
  const { id } = await params
  const o = getOffering(id)
  if (!o) return {}
  return pageMetadata({ title: o.name, description: o.promise, path: `/services/${o.id}` })
}

// Hero photo per service: a close-up that isn't already used further down the page
const introImage: Record<Offering['id'], AssetKey> = {
  warehousing: 'm2-receive',
  trucking: 'm1-port',
  'e-commerce': 'm3-pick',
}

const stretched = "after:absolute after:inset-0 after:content-['']"

export default async function ServicePage({ params }: PageProps<'/services/[id]'>) {
  const { id } = await params
  const o = getOffering(id)
  if (!o) notFound()
  const others = offerings.filter((x) => x.id !== o.id)
  const path = `/services/${o.id}`

  return (
    <>
      <PageIntro
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
          { name: o.name, href: path },
        ]}
        eyebrow={`${o.index} · ${o.name}`}
        title={o.headline}
        lead={o.promise}
        cta={cta.primary}
        image={introImage[o.id]}
        chips={o.capabilities.slice(0, 3)}
      />

      <section className="theme-light py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="grid content-start gap-8">
            <Photo
              asset={o.image}
              sizes="(min-width: 64rem) 45vw, 100vw"
              className="wipe-up rounded-[2rem]"
              icon={offeringIcons[o.id]}
            />
            <div className="grid gap-5" data-speakable>
              {o.body.map((p) => (
                <p key={p} className="text-lg text-ink">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>Our {o.name.toLowerCase()} services include</Eyebrow>
            <ul className="mt-8 grid border-b border-line">
              {o.capabilities.map((c) => (
                <li key={c} className="flex items-center gap-4 border-t border-line py-4 text-lg">
                  <CapabilityIcon name={c} />
                  {c}
                </li>
              ))}
            </ul>
            {o.apply ? (
              <div className="card mt-10 grid gap-3 p-7">
                <p className="display t-3">{o.apply.label}</p>
                <p className="text-ink">
                  {about.careers.body}{' '}
                  <a
                    href={`mailto:${site.hrEmail}?subject=${encodeURIComponent(o.apply.label)}`}
                    className="inline-link font-semibold text-fg"
                  >
                    {site.hrEmail}
                  </a>
                </p>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="theme-dark py-24 sm:py-32">
        <Container>
          <Eyebrow>Connected services</Eyebrow>
          <h2 className="display t-1 mt-5">
            Under <Accent>one roof.</Accent>
          </h2>
          <ul className="mt-14 grid gap-5 md:grid-cols-2">
            {others.map((x) => (
              <li
                key={x.id}
                className="card card-lift relative grid content-start gap-6 p-8 sm:p-10"
              >
                <IconRing icon={offeringIcons[x.id]} />
                <h3 className="display t-2">
                  <Link href={`/services/${x.id}`} className={stretched}>
                    {x.name}
                  </Link>
                </h3>
                <p className="text-ink">{x.connection}</p>
                <span className="link-arrow text-accent" aria-hidden="true">
                  Discover {x.name}
                  <Arrow />
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBlock body={o.questions} />
      <Inquiry />

      <JsonLd
        data={[webPage('WebPage', path, o.name, o.promise), service(o.id)].filter(
          (x): x is Record<string, unknown> => x !== null,
        )}
      />
    </>
  )
}
