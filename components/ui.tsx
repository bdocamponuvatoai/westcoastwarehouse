import Image from 'next/image'
import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { ArrowDown, ArrowRight, type LucideIcon } from 'lucide-react'
import { assets, ratios, type AssetKey } from '@/content/assets'
import { site } from '@/content/site'

export const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ')

export function Container({
  className,
  children,
  ...rest
}: ComponentProps<'div'> & { children: ReactNode }) {
  return (
    <div className={cx('mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12', className)} {...rest}>
      {children}
    </div>
  )
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('eyebrow', className)}>{children}</p>
}

/** Italic accent phrase inside a heading. `wipe` clips it in on scroll. */
export function Accent({ children, wipe = true }: { children: ReactNode; wipe?: boolean }) {
  return (
    <span className={cx('accent-phrase inline-block pr-[0.08em]', wipe && 'wipe-line')}>
      {children}
    </span>
  )
}

export function Arrow({ down = false, className }: { down?: boolean; className?: string }) {
  const Icon = down ? ArrowDown : ArrowRight
  return (
    <span className={cx('arrow', down && 'arrow-down', className)} aria-hidden="true">
      <Icon size={16} strokeWidth={1.75} />
    </span>
  )
}

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'outline'
  className?: string
  external?: boolean
}

export function Button({ href, children, variant = 'primary', className, external }: ButtonProps) {
  const cls = cx('btn', variant === 'primary' ? 'btn-primary' : 'btn-outline', className)
  if (
    external ||
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return (
      <a href={href} className={cls}>
        {children}
        <Arrow />
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
      <Arrow />
    </Link>
  )
}

type PhotoProps = {
  asset: AssetKey
  sizes: string
  className?: string
  priority?: boolean
  /** Glyph for the designed fallback panel shown until the photo exists. */
  icon?: LucideIcon
  /** Fill the parent instead of reserving the native ratio. */
  fill?: boolean
  alt?: string
}

/** Every frame uses its photo's native ratio, so images are never cropped. */
export function Photo({ asset, sizes, className, priority, icon: Icon, fill, alt }: PhotoProps) {
  const a = assets[asset]
  const [w, h] = ratios[asset]
  const style = fill ? undefined : { aspectRatio: `${w} / ${h}` }

  if (!a) {
    return (
      <div
        className={cx('photo photo-pending grid place-items-center', fill && 'h-full', className)}
        style={style}
        aria-hidden="true"
        data-photo-pending={asset}
      >
        {Icon ? <Icon strokeWidth={0.75} className="h-1/4 max-h-28 w-1/4 max-w-28" /> : null}
      </div>
    )
  }

  return (
    <div className={cx('photo', fill && 'h-full', className)} style={style}>
      <Image
        src={a.src}
        alt={alt ?? a.alt}
        width={a.width}
        height={a.height}
        sizes={sizes}
        loading={priority ? 'eager' : undefined}
        fetchPriority={priority ? 'high' : undefined}
        placeholder={a.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={a.blurDataURL}
      />
    </div>
  )
}

/** Monogram tile from the master logo plus the wordmark set as live type. */
export function Logo({ className, size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  return (
    <span className={cx('flex items-center gap-3', className)}>
      <Image
        src="/assets/logo-mark-transparent.png"
        alt=""
        width={208}
        height={180}
        className={size === 'lg' ? 'h-14 w-auto' : 'h-9 w-auto'}
        loading="eager"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            'font-display font-bold tracking-[0.02em] uppercase',
            size === 'lg' ? 'text-4xl' : 'text-[1.4rem]',
          )}
        >
          {site.wordmark.top}
        </span>
        <span
          className={cx(
            'font-display font-semibold tracking-[0.08em] text-accent uppercase',
            size === 'lg' ? 'mt-1 text-base' : 'mt-0.5 text-[0.62rem]',
          )}
        >
          {site.wordmark.bottom}
        </span>
      </span>
    </span>
  )
}

export type Crumb = { name: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-xs tracking-[0.18em] text-muted uppercase">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i < items.length - 1 ? (
              <>
                <Link href={c.href} className="inline-flex min-h-11 items-center hover:text-fg">
                  {c.name}
                </Link>
                <span aria-hidden="true">/</span>
              </>
            ) : (
              <span aria-current="page" className="text-fg">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
