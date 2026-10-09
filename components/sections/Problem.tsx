import { cta, home } from '@/content/site'
import { IconRing, namedIcons, type NamedIcon } from '@/components/CapabilityIcon'
import { Accent, Button, Container, Eyebrow } from '@/components/ui'

/** The one solid accent section on the page. */
export function Problem() {
  const { problem } = home
  return (
    <section className="theme-block overflow-clip py-24 sm:py-32">
      <Container>
        <Eyebrow>{problem.eyebrow}</Eyebrow>
        <h2 className="display t-1 mt-6 max-w-6xl">
          {problem.headline} <Accent>{problem.accent}</Accent>
        </h2>

        <ul className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-3 lg:gap-6">
          {problem.beats.map((b) => (
            <li
              key={b.title}
              className="gap-card card theme-dark grid content-start gap-6 p-8 sm:p-10"
            >
              <IconRing icon={namedIcons[b.icon as NamedIcon]} />
              <h3 className="display t-3">{b.title}</h3>
              <p className="text-ink">{b.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-8 lg:mt-24">
          <p
            className="max-w-3xl text-[clamp(1.25rem,2vw,1.6rem)] leading-snug font-medium"
            data-speakable
          >
            {problem.consequence}
          </p>
          <Button href={cta.primary.href}>{cta.primary.label}</Button>
        </div>
      </Container>
    </section>
  )
}
