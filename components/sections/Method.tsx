import { Anchor, PackageCheck, Truck, Warehouse, type LucideIcon } from 'lucide-react'
import { process } from '@/content/process'
import { home } from '@/content/site'
import { Accent, Container, Eyebrow, Photo, cx } from '@/components/ui'

const stepIcons: LucideIcon[] = [Anchor, Warehouse, PackageCheck, Truck]

/** Stacking cards: each pins, rises into place, and the one beneath recedes as it is covered. */
export function Method({
  showDetail = false,
  headingLevel = 2,
  intro = true,
  tone = 'dark',
}: {
  showDetail?: boolean
  headingLevel?: 1 | 2
  intro?: boolean
  tone?: 'dark' | 'light'
}) {
  const { method } = home
  const H = headingLevel === 1 ? 'h1' : 'h2'
  const total = process.length
  return (
    <section className={cx(tone === 'dark' ? 'theme-dark' : 'theme-light', 'py-24 sm:py-32')}>
      <Container>
        {intro ? (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <Eyebrow>{method.eyebrow}</Eyebrow>
              <H className="display t-1 mt-5">
                {method.title} <Accent>{method.accent}</Accent>
              </H>
            </div>
            <p className="lead" data-speakable>
              {method.lead}
            </p>
          </div>
        ) : null}

        <ol className={cx('stack grid gap-6', intro && 'mt-16 lg:mt-24')}>
          {process.map((s, i) => (
            <li key={s.index} style={{ '--n': i } as React.CSSProperties}>
              <article
                className={cx(
                  'stack-card card grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:p-10',
                  tone === 'dark' && 'theme-paper',
                )}
              >
                <div className="flex flex-col justify-between gap-10">
                  <div className="flex items-start justify-between gap-6">
                    <span
                      className="stack-numeral numeral-outline text-7xl sm:text-8xl"
                      aria-hidden="true"
                    >
                      {s.index}
                    </span>
                    <div className="flex gap-1.5 pt-4" aria-hidden="true">
                      {Array.from({ length: total }, (_, k) => (
                        <span
                          key={k}
                          className={cx('h-1 w-8 rounded-full', k <= i ? 'bg-pop' : 'bg-line')}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.3em] text-muted uppercase">
                      Step {i + 1} of {total}
                    </p>
                    <h3 className="display t-2 mt-3">{s.title}</h3>
                    <p className="lead mt-5 max-w-xl">{s.body}</p>
                    {showDetail ? <p className="mt-4 max-w-xl text-muted">{s.detail}</p> : null}
                  </div>
                </div>
                <Photo
                  asset={s.image}
                  sizes="(min-width: 64rem) 40vw, 100vw"
                  className="w-full rounded-[1.25rem] lg:max-w-[min(30rem,60vh)] lg:justify-self-end"
                  icon={stepIcons[i]}
                />
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
