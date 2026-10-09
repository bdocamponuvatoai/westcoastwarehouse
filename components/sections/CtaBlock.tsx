import { anyQuestions, site } from '@/content/site'
import { Accent, Button, Container, Eyebrow } from '@/components/ui'

/** Solid accent band: the one .theme-block section on inner pages. */
export function CtaBlock({ body = anyQuestions.body }: { body?: string }) {
  return (
    <section className="theme-block py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <Eyebrow>{anyQuestions.eyebrow}</Eyebrow>
          <h2 className="display t-1 mt-5">
            {anyQuestions.title} <Accent>{anyQuestions.accent}</Accent>
          </h2>
        </div>
        <div className="grid gap-8">
          <p className="lead">{body}</p>
          <div className="flex flex-wrap gap-3">
            <Button href={site.portal.href}>{anyQuestions.appointment}</Button>
            <Button href={`tel:${site.phoneHref}`} variant="outline">
              {anyQuestions.call}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
