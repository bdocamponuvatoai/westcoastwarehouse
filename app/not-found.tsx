import type { Metadata } from 'next'
import { notFound as copy } from '@/content/site'
import { Accent, Button, Container, Eyebrow } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="theme-light grid min-h-[100svh] items-center pt-32 pb-24">
      <Container>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h1 className="display t-1 mt-6 max-w-5xl">
          {copy.title} <Accent>{copy.accent}</Accent>
        </h1>
        <p className="lead mt-8 max-w-xl">{copy.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/services" variant="outline">
            Explore Services
          </Button>
        </div>
      </Container>
    </section>
  )
}
