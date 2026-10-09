'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const R = 22
const C = 2 * Math.PI * R

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Tells the boot script in app/layout.tsx that hydration happened (keeps the JS form layout).
    ;(window as Window & { __wcHydrated?: boolean }).__wcHydrated = true
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setVisible(window.scrollY > window.innerHeight)
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`theme-dark fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full shadow-[0_0_0_1px_rgb(255_255_255/0.12),0_12px_30px_-12px_rgb(0_0_0/0.6)] transition-[translate,visibility] duration-500 sm:right-6 ${
        visible ? 'visible translate-y-0' : 'invisible translate-y-24'
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="rgb(255 255 255 / 0.14)"
          strokeWidth="1.5"
        />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="var(--pop)"
          strokeWidth="1.5"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          strokeLinecap="round"
        />
      </svg>
      <ArrowUp size={18} strokeWidth={1.75} aria-hidden="true" />
    </button>
  )
}
