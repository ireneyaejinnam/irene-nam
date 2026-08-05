'use client'
import { useEffect, useRef } from 'react'

export function RailProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const pct = h > 0 ? Math.min(1, window.scrollY / h) * 100 : 0
      el.style.height = `${pct}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div className="prog" ref={ref} aria-hidden />
}
