import { home, site } from '@/content/site'
import { Accent, Container, Eyebrow } from '@/components/ui'
import { InquiryForm } from './InquiryForm'

export function Inquiry({ asPageHeading = false }: { asPageHeading?: boolean }) {
  const { inquiry } = home
  const H = asPageHeading ? 'h1' : 'h2'
  return (
    <section id="estimate" className="theme-light py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <Eyebrow>{inquiry.eyebrow}</Eyebrow>
          <H className="display t-1 mt-5">
            {inquiry.title} <Accent>{inquiry.accent}</Accent>
          </H>
          <p className="lead mt-8" data-speakable>
            {inquiry.lead}
          </p>
          <dl className="mt-10 grid gap-5 border-t border-line pt-8 text-ink">
            <div>
              <dt className="text-xs font-semibold tracking-[0.3em] text-muted uppercase">Call</dt>
              <dd>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="inline-flex min-h-11 items-center text-xl font-semibold text-fg"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.3em] text-muted uppercase">Email</dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center break-all text-fg"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.3em] text-muted uppercase">Visit</dt>
              <dd className="mt-1">
                {site.address.street}, {site.address.city}, {site.address.region}{' '}
                {site.address.postalCode}
              </dd>
            </div>
          </dl>
        </div>
        <InquiryForm headingLevel={asPageHeading ? 2 : 3} />
      </Container>
    </section>
  )
}
