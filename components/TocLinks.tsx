'use client'
import { useEffect, useState } from 'react'
import type { TocItem } from './Rail'

export function TocLinks({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    items.forEach((i) => {
      const el = document.getElementById(i.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [items])

  return (
    <nav className="toc">
      {items.map((i, n) => (
        <a key={i.id} href={`#${i.id}`} className={active === i.id ? 'on' : undefined}>
          <i>{String(n + 1).padStart(2, '0')}</i>
          <span>{i.label}</span>
        </a>
      ))}
    </nav>
  )
}
