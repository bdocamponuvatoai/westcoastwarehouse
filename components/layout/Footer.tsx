import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { offerings } from '@/content/offerings'
import { cta, footer, legalNav, site } from '@/content/site'
import { Button, Container, Logo } from '@/components/ui'

const label = 'text-[0.6875rem] font-semibold tracking-[0.24em] text-muted uppercase'
const link = 'inline-flex min-h-11 items-center text-ink transition-colors hover:text-fg'

const company = [
  { label: 'About', href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'Rate Estimate', href: '/rate-estimate' },
  { label: 'Careers', href: '/about#careers' },
]

function Column({
  title,
  wide,
  children,
}: {
  title: string
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={`grid content-start gap-4 ${wide ? 'col-span-2 sm:col-span-1' : ''}`}>
      <h2 className={label}>{title}</h2>
      {children}
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="theme-dark">
      <Container className="pt-20 sm:pt-24">
        {/* Identity + primary actions */}
        <div className="grid gap-10 border-b border-line pb-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="grid max-w-xl gap-6">
            <Logo size="lg" />
            <p className="text-ink">{footer.blurb}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={cta.primary.href}>{cta.primary.label}</Button>
            <Button href={site.portal.href} variant="outline">
              {site.portal.label}
            </Button>
          </div>
        </div>

        {/* Directory */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 lg:grid-cols-4 lg:gap-8">
          <Column title="Headquarters" wide>
            <address className="grid gap-1 text-ink not-italic">
              <span>{site.address.street}</span>
              <span>
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
            </address>
            <a href={footer.directions} className={`${link} w-fit gap-1.5 text-fg`}>
              Get directions
              <ArrowUpRight className="size-4 text-accent" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </Column>

          <Column title="Contact" wide>
            <dl className="grid [grid-template-columns:auto_1fr] gap-x-4 text-ink">
              <dt className="flex min-h-11 items-center text-muted">Phone</dt>
              <dd>
                <a href={`tel:${site.phoneHref}`} className={link}>
                  {site.phone}
                </a>
              </dd>
              <dt className="flex min-h-11 items-center text-muted">Fax</dt>
              <dd className="flex min-h-11 items-center">{site.fax}</dd>
              <dt className="flex min-h-11 items-center text-muted">Email</dt>
              <dd className="min-w-0">
                <a href={`mailto:${site.email}`} className={`${link} break-all`}>
                  {site.email}
                </a>
              </dd>
            </dl>
          </Column>

          <Column title="Services">
            <nav aria-label="Services">
              <ul className="grid">
                {offerings.map((o) => (
                  <li key={o.id}>
                    <Link href={`/services/${o.id}`} className={link}>
                      {o.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" className={link}>
                    All services
                  </Link>
                </li>
              </ul>
            </nav>
          </Column>

          <Column title="Company">
            <nav aria-label="Footer">
              <ul className="grid">
                {company.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className={link}>
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Column>
        </div>

        <div className="footer-road" aria-hidden="true">
          <div className="footer-vehicle">
            <Image
              src="/assets/footer-vehicle.webp"
              alt=""
              width={1000}
              height={386}
              sizes="(min-width: 64rem) 25rem, 17rem"
            />
          </div>
        </div>

        {/* Operating facts */}
        <ul
          className="flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-5 text-sm text-ink"
          aria-label="Operations"
        >
          {footer.facts.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-pop" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        {/* Legal */}
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-sm text-muted">
          <div className="flex flex-wrap items-center gap-x-6">
            <p>
              © {year} {site.legalName}
            </p>
            <ul className="flex gap-5">
              {legalNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-flex min-h-11 items-center hover:text-fg">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="font-display text-base tracking-wide text-accent uppercase italic">
            {site.tagline}
          </p>
        </div>
      </Container>
    </footer>
  )
}
