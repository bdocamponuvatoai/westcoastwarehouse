import { Mail, Truck, Warehouse } from 'lucide-react'
import { IconRing } from '@/components/CapabilityIcon'
import { PageIntro } from '@/components/sections/PageIntro'
import { JsonLd, webPage } from '@/components/seo/JsonLd'
import { Accent, Container, Eyebrow, Photo } from '@/components/ui'
import { about, home, site } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

const description =
  'Prompt, reliable warehousing, trucking and fulfillment from the heart of the Alameda Corridor in Compton, California.'

export const metadata = pageMetadata({ title: 'About Us', description, path: '/about' })

export default function AboutPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
        ]}
        eyebrow={about.eyebrow}
        title={about.title}
        accent={about.accent}
        lead={about.lead}
        image="w1-wide"
        variant="editorial"
        focus="50% 62%"
        chips={[
          'Alameda Corridor',
          'Third-party warehousing',
          'Order fulfillment',
          'Retail compliance and EDI',
        ]}
      />

      <section className="theme-light py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
            <Photo
              asset="e1-feature"
              sizes="(min-width: 64rem) 40vw, 100vw"
              className="wipe-up mx-auto w-full max-w-xl rounded-[2rem]"
              icon={Warehouse}
            />
          </div>
          <div className="grid content-start gap-6" data-speakable>
            {about.story.map((p, i) => (
              <p key={i} className={i === 0 ? 'lead text-fg' : 'text-lg text-ink'}>
                {p}
              </p>
            ))}
            <p className="display t-3 mt-6">
              {home.problem.headline} <Accent>{home.problem.accent}</Accent>
            </p>
          </div>
        </Container>
      </section>

      <section className="theme-block py-24 sm:py-32">
        <Container className="grid gap-5 lg:grid-cols-2">
          {[about.mission, about.vision].map((m) => (
            <article key={m.title} className="card theme-dark grid content-start gap-6 p-8 sm:p-12">
              <h2 className="eyebrow">{m.title}</h2>
              <p
                className="text-[clamp(1.25rem,2vw,1.6rem)] leading-snug font-medium"
                data-speakable
              >
                {m.body}
              </p>
            </article>
          ))}
        </Container>
      </section>

      <section id="careers" className="theme-light py-24 sm:py-32">
        <Container>
          <Eyebrow>{about.careers.eyebrow}</Eyebrow>
          <h2 className="display t-1 mt-5">
            {about.careers.title} <Accent>{about.careers.accent}</Accent>
          </h2>
          <ul className="mt-14 grid gap-5 md:grid-cols-2">
            {about.careers.roles.map((r, i) => (
              <li key={r.title} className="card grid content-start gap-6 p-8 sm:p-10">
                <IconRing icon={i === 0 ? Warehouse : Truck} />
                <h3 className="display t-3">{r.title}</h3>
                <p className="text-ink">{r.body}</p>
                <p className="flex flex-wrap items-center gap-2 text-ink">
                  <Mail className="size-4 text-accent" aria-hidden="true" />
                  {about.careers.body}
                  <a
                    href={`mailto:${site.hrEmail}?subject=${encodeURIComponent(r.title)}`}
                    className="inline-link inline-flex min-h-11 items-center font-semibold text-fg"
                  >
                    {site.hrEmail}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <JsonLd data={webPage('AboutPage', '/about', `About ${site.name}`, description)} />
    </>
  )
}
