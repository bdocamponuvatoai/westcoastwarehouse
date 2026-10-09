import { faq } from '@/content/faq'
import { home } from '@/content/site'
import { JsonLd, faqPage } from '@/components/seo/JsonLd'
import { Accent, Container, Eyebrow } from '@/components/ui'

export function Faq({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const { faq: copy } = home
  return (
    <section className={`${tone === 'dark' ? 'theme-dark' : 'theme-light'} py-24 sm:py-32`}>
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 className="display t-1 mt-5">
            {copy.title} <Accent>{copy.accent}</Accent>
          </h2>
        </div>
        <div className="border-b border-line">
          {faq.map((f, i) => (
            <details key={f.q} name="faq" className="border-t border-line">
              <summary className="flex min-h-20 items-center gap-5 py-5 sm:gap-8">
                <span
                  className="w-8 flex-none font-display text-lg font-semibold text-accent"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="flex-1 text-lg leading-snug font-semibold sm:text-xl">{f.q}</h3>
                <span className="icon-ring icon-ring-sm" aria-hidden="true">
                  <span className="plus" />
                </span>
              </summary>
              <p className="max-w-2xl pb-8 pl-13 text-ink sm:pl-16" data-speakable>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
      <JsonLd data={faqPage()} />
    </section>
  )
}
