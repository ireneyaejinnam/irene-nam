'use client'
import { useEffect, useRef } from 'react'

export type Bar = {
  label: string
  value: string
  /** bar width as a percentage of the track */
  width: number
  /** accent fill — use for the row that carries the argument */
  hi?: boolean
  /** renders the value in accent — use for a zero that means something */
  zero?: boolean
}

export function FunnelChart({
  title,
  bars,
  caption,
}: {
  title: string
  bars: Bar[]
  caption?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          el.querySelectorAll<HTMLElement>('.fill').forEach((f) => {
            f.style.width = `${f.dataset.w}%`
          })
          io.unobserve(e.target)
        })
      },
      { rootMargin: '0px 0px -18% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <figure>
      <div className="chart" ref={ref}>
        <div className="ct">{title}</div>
        {bars.map((b) => (
          <div
            className={`bar${b.hi ? ' hi' : ''}${b.zero ? ' zero' : ''}`}
            key={b.label}
          >
            <span>{b.label}</span>
            <div className="track">
              <div className="fill" data-w={b.width} />
            </div>
            <b>{b.value}</b>
          </div>
        ))}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
