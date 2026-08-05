'use client'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { allProjects, writing } from '@/content/projects'

type Item = { name: string; kind: string; href: string }

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)

  const items: Item[] = useMemo(
    () => [
      ...allProjects.map((p) => ({ name: p.name, kind: 'Project', href: `/work/${p.slug}` })),
      ...writing.map((w) => ({ name: w.title, kind: 'Writing', href: `/writing/${w.slug}` })),
      { name: 'About', kind: 'Page', href: '/about' },
      { name: 'Bank of America', kind: 'Page', href: '/experience/bofa' },
      { name: 'Colophon', kind: 'Page', href: '/colophon' },
      { name: 'Résumé', kind: 'Page', href: '/resume.pdf' },
    ],
    [],
  )

  const shown = useMemo(() => {
    const v = q.toLowerCase()
    if (!v) return items
    return items.filter(
      (i) => i.name.toLowerCase().includes(v) || i.kind.toLowerCase().includes(v),
    )
  }, [q, items])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        setQ('')
        setSel(0)
        return
      }
      if (!open) return
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSel((s) => Math.min(s + 1, shown.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSel((s) => Math.max(s - 1, 0))
      }
      if (e.key === 'Enter' && shown[sel]) {
        setOpen(false)
        router.push(shown[sel].href)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, shown, sel, router])

  if (!open) return null

  return (
    <div className="pal" role="dialog" aria-modal="true" aria-label="Search" onClick={(e) => {
      if (e.target === e.currentTarget) setOpen(false)
    }}>
      <div className="pbox">
        <input
          autoFocus
          value={q}
          placeholder="Search projects, writing, pages…"
          onChange={(e) => {
            setQ(e.target.value)
            setSel(0)
          }}
        />
        <div className="plist">
          {shown.map((it, i) => (
            <button
              key={it.href}
              className={`pitem${i === sel ? ' sel' : ''}`}
              onMouseEnter={() => setSel(i)}
              onClick={() => {
                setOpen(false)
                router.push(it.href)
              }}
            >
              <span>{it.name}</span>
              <em>{it.kind}</em>
            </button>
          ))}
        </div>
        <div className="pfoot">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}
