import { MapPin } from 'lucide-react'
import { home } from '@/content/site'
import { IconRing, namedIcons, type NamedIcon } from '@/components/CapabilityIcon'
import { Accent, Container, Eyebrow, Photo } from '@/components/ui'

/** Signature advantage: the location in the Alameda Corridor. */
export function Feature() {
  const { feature } = home
  return (
    <section className="theme-light py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Photo
          asset="e1-feature"
          sizes="(min-width: 64rem) 40vw, 100vw"
          className="wipe-up mx-auto w-full max-w-xl rounded-[2rem]"
          icon={MapPin}
        />
        <div>
          <Eyebrow>{feature.eyebrow}</Eyebrow>
          <h2 className="display t-1 mt-5">
            {feature.title} <Accent>{feature.accent}</Accent>
          </h2>
          <p className="lead mt-8" data-speakable>
            {feature.body}
          </p>
          <ul className="mt-10 grid gap-4">
            {feature.points.map((p) => (
              <li key={p.text} className="flex items-center gap-4 border-t border-line pt-4">
                <IconRing icon={namedIcons[p.icon as NamedIcon]} />
                <span className="font-medium">{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
