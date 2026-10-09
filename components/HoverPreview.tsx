'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { assets, type AssetKey } from '@/content/assets'

/**
 * Cursor-following photo preview over closed accordion rows. Fine pointers only, and only for
 * rows whose photo exists. Purely decorative.
 */
export function HoverPreview({ children }: { children: React.ReactNode }) {
  const [key, setKey] = useState<AssetKey | null>(null)
  const box = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const summary = (e.target as HTMLElement).closest('summary')
    const row = summary?.parentElement
    const next =
      row instanceof HTMLDetailsElement && !row.open ? (row.dataset.preview as AssetKey) : null
    const valid = next && assets[next] ? next : null
    if (valid !== key) setKey(valid)
    if (box.current) box.current.style.translate = `${e.clientX + 24}px ${e.clientY - 120}px`
  }

  const asset = key ? assets[key] : undefined

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setKey(null)}>
      {children}
      <div
        ref={box}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 hidden w-64 [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        {asset ? (
          <div className="photo aspect-[4/3] rounded-2xl shadow-[0_24px_48px_-20px_rgb(0_0_0/0.5)]">
            <Image src={asset.src} alt="" width={asset.width} height={asset.height} sizes="16rem" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
