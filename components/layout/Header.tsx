'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { offerings } from '@/content/offerings'
import { cta, navigation, site } from '@/content/site'
import { Arrow, Logo, cx } from '@/components/ui'

const isCurrent = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

export function Header() {
  const pathname = usePathname()
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => dialog.current?.close(), [])

  const open = () => {
    const d = dialog.current
    if (!d) return
    d.showModal()
    document.documentElement.classList.add('menu-open')
  }

  // Close the menu whenever the route changes.
  useEffect(() => {
    close()
  }, [pathname, close])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    const onClose = () => {
      document.documentElement.classList.remove('menu-open')
      opener.current?.focus()
    }
    d.addEventListener('close', onClose)
    return () => d.removeEventListener('close', onClose)
  }, [])

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="glass mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 rounded-full pr-2 pl-4 text-fg sm:pl-5">
        <Link href="/" className="flex min-h-11 items-center" aria-label={`${site.name} — Home`}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const current = isCurrent(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? 'page' : undefined}
                    className={cx(
                      'inline-flex min-h-11 items-center rounded-full px-4 text-[0.8rem] font-medium tracking-[0.08em] uppercase transition-colors',
                      current
                        ? 'bg-white text-fg shadow-[0_1px_2px_rgb(0_30_60/0.12),inset_0_0_0_1px_rgb(15_23_32/0.08)]'
                        : 'text-ink hover:text-fg',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.portal.href}
            className="hidden min-h-11 items-center px-3 text-[0.8rem] font-medium tracking-[0.08em] text-ink uppercase hover:text-fg xl:inline-flex"
          >
            {site.portal.label}
          </a>
          <Link href={cta.primary.href} className="btn btn-primary hidden sm:inline-flex">
            {cta.primary.label}
            <Arrow />
          </Link>
          <button
            ref={opener}
            type="button"
            onClick={open}
            aria-haspopup="dialog"
            aria-controls="site-menu"
            className="js-only btn btn-outline min-w-11 px-5 lg:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      <noscript>
        <nav
          aria-label="Primary (no script)"
          className="theme-dark mx-auto mt-2 max-w-[90rem] rounded-3xl p-3 lg:hidden"
        >
          <ul className="flex flex-wrap gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center px-3 text-sm uppercase"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </noscript>

      <dialog
        ref={dialog}
        id="site-menu"
        aria-label="Menu"
        className="menu-dialog theme-dark"
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <div className="menu-inner flex min-h-full flex-col px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
          <div className="flex h-16 items-center justify-between pl-1">
            <Logo />
            <button
              type="button"
              onClick={close}
              className="btn btn-outline min-w-11 px-4"
              aria-label="Close menu"
            >
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Menu" className="mt-8">
            <ul className="grid gap-1">
              {navigation.map((item, i) => {
                const current = isCurrent(pathname, item.href)
                return (
                  <li
                    key={item.href}
                    className="menu-item"
                    style={{ '--i': i } as React.CSSProperties}
                  >
                    <Link
                      href={item.href}
                      aria-current={current ? 'page' : undefined}
                      onClick={close}
                      className="display flex min-h-14 items-center gap-4 py-1 text-[clamp(2.4rem,11vw,4.5rem)]"
                    >
                      {item.label}
                      {current ? (
                        <span className="size-2.5 rounded-full bg-pop" aria-hidden="true" />
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-8 border-t border-line pt-6">
            <p className="eyebrow">Services</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {offerings.map((o) => (
                <li key={o.id}>
                  <Link href={`/services/${o.id}`} onClick={close} className="pill">
                    {o.name}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.portal.href} className="pill">
                  {site.portal.label}
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-auto grid gap-5 pt-10">
            <Link href={cta.primary.href} onClick={close} className="btn btn-primary btn-block">
              {cta.primary.label}
              <Arrow />
            </Link>
            <div className="flex flex-wrap items-end justify-between gap-3 text-sm text-ink">
              <div className="grid">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center hover:text-fg"
                >
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="inline-flex min-h-11 items-center hover:text-fg"
                >
                  {site.phone}
                </a>
              </div>
              <p className="font-display text-lg tracking-wide text-accent uppercase italic">
                {site.tagline}
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </header>
  )
}
