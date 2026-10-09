import { Container } from '@/components/ui'

export type LegalSection = { heading: string; body: string[] }

export function Legal({ sections, updated }: { sections: LegalSection[]; updated: string }) {
  return (
    <section className="theme-light py-20 sm:py-28">
      <Container className="max-w-3xl">
        <p
          className="rounded-2xl px-5 py-4 text-sm font-medium text-ink shadow-[inset_0_0_0_1px_var(--line)]"
          role="note"
        >
          Draft template — pending review by counsel. Last updated {updated}.
        </p>
        <div className="prose-links mt-12 grid gap-12">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="display t-3">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-4 text-ink">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
