import { Building2 } from 'lucide-react'
import { offerings } from '@/content/offerings'
import { home } from '@/content/site'
import { IconRing } from '@/components/CapabilityIcon'
import { Accent, Container, Eyebrow, Photo } from '@/components/ui'
import { offeringIcons } from './Panels'

export function OneRoof() {
  const { oneRoof } = home
  return (
    <section className="theme-dark overflow-clip py-24 sm:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow>{oneRoof.eyebrow}</Eyebrow>
            <h2 className="display t-1 mt-5">
              {oneRoof.title} <Accent>{oneRoof.accent}</Accent>
            </h2>
          </div>
          <p className="lead">{oneRoof.lead}</p>
        </div>

        <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-24">
          {offerings.map((o) => (
            <li
              key={o.id}
              className="grid content-start gap-5 border-t border-line pt-8"
              data-reveal
            >
              <div className="flex items-center justify-between gap-4">
                <span className="numeral-outline text-6xl" aria-hidden="true">
                  {o.index}
                </span>
                <IconRing icon={offeringIcons[o.id]} />
              </div>
              <h3 className="display t-2">{o.name}</h3>
              <p className="text-lg text-ink">{o.connection}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 lg:mt-24">
          <Photo
            asset="w1-wide"
            sizes="(min-width: 90rem) 86rem, 100vw"
            className="parallax rounded-[2rem]"
            icon={Building2}
          />
        </div>
      </Container>
    </section>
  )
}
