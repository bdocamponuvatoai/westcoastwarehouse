import { convenience } from '@/content/site'
import { Accent, Button, Container, Eyebrow } from '@/components/ui'

export function Convenience() {
  return (
    <section className="theme-block py-20 sm:py-28">
      <Container>
        <Eyebrow>{convenience.eyebrow}</Eyebrow>
        <h2 className="display t-1 mt-5">
          {convenience.title} <Accent>{convenience.accent}</Accent>
        </h2>
        <ul className="mt-14 grid gap-5 lg:grid-cols-2">
          {convenience.items.map((it) => (
            <li
              key={it.title}
              className="card theme-dark grid min-w-0 content-between gap-8 p-7 sm:p-10"
            >
              <div>
                <h3 className="display t-3">{it.title}</h3>
                <p className="mt-4 text-ink">{it.body}</p>
              </div>
              <div>
                <Button href={it.href} className="max-w-full py-3 text-center whitespace-normal">
                  {it.label}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
