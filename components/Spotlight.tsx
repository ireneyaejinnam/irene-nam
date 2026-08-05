'use client'
import { useEffect } from 'react'

export function Spotlight() {
  useEffect(() => {
    let queued = false
    let x = 0
    let y = 0
    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        const root = document.documentElement
        root.style.setProperty('--mx', `${x}px`)
        root.style.setProperty('--my', `${y}px`)
        queued = false
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return <div className="spotlight" aria-hidden />
}
