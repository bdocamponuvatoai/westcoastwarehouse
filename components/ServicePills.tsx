'use client'

import { useState } from 'react'

type Item = { id: string; label: string }

/** Quick filter: opens the matching accordion row. Plain anchors without JS. */
export function ServicePills({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id)

  const select = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const row = document.getElementById(`service-${id}`)
    if (!(row instanceof HTMLDetailsElement)) return
    e.preventDefault()
    row.open = true
    setActive(id)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    row.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'start' })
    row.querySelector('summary')?.focus({ preventScroll: true })
  }

  return (
    <nav aria-label="Jump to a service">
      <ul className="flex flex-wrap gap-2">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#service-${it.id}`}
              onClick={(e) => select(e, it.id)}
              aria-current={active === it.id ? 'true' : undefined}
              className="pill aria-[current=true]:bg-fg aria-[current=true]:text-bg"
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
