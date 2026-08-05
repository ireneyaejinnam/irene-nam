import type { ReactNode } from 'react'
import type { Evidence } from '@/content/projects'

/* ---------- header ---------- */

export function Header({
  eyebrow,
  title,
  dek,
  cta,
  facts,
  evidence,
}: {
  eyebrow: string
  title: string
  dek: ReactNode
  cta?: { label: string; href: string; ghost?: boolean }[]
  facts?: { label: string; value: ReactNode }[]
  evidence?: Evidence[]
}) {
  return (
    <header className="head">
      <span className="lbl">{eyebrow}</span>
      <h1>{title}</h1>
      <p className="dek">{dek}</p>

      {cta && (
        <div className="cta">
          {cta.map((c) => (
            <a key={c.label} className={`btn${c.ghost ? ' ghost' : ''}`} href={c.href}>
              {c.label} <i>↗</i>
            </a>
          ))}
        </div>
      )}

      {facts && (
        <div className="facts">
          {facts.map((f) => (
            <div key={f.label}>
              <em>{f.label}</em>
              <b>{f.value}</b>
            </div>
          ))}
        </div>
      )}

      {evidence && (
        <div className="evstrip">
          {evidence.map((e) => (
            <div key={e.label}>
              <b>{e.value}</b>
              <em>{e.label}</em>
            </div>
          ))}
        </div>
      )}
    </header>
  )
}

/* ---------- section ---------- */

export function Section({
  id,
  n,
  title,
  children,
}: {
  id: string
  n: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id}>
      <div className="sechead">
        <i>{n}</i>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

/* ---------- pull quote ---------- */

export function Pull({ children, label = 'The finding' }: { children: ReactNode; label?: string }) {
  return (
    <div className="pull">
      <p>{children}</p>
      <span>{label}</span>
    </div>
  )
}

/* ---------- caveat ---------- */

export function Caveat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="caveat">
      <em>{label}</em>
      <p>{children}</p>
    </div>
  )
}

/* ---------- spec table ---------- */

export function SpecTable({
  head,
  rows,
}: {
  head: string[]
  rows: { cells: ReactNode[]; numeric?: number }[]
}) {
  return (
    <div className="tw">
      <table>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={h} style={i === head.length - 1 ? { textAlign: 'right' } : undefined}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.cells.map((c, j) => (
                <td
                  key={j}
                  className={j === 0 ? 'k' : j === r.numeric ? 'n' : undefined}
                  style={j === r.numeric ? { textAlign: 'right' } : undefined}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------- screenshot grid ---------- */

export function Shots({
  items,
  wide = false,
  caption,
}: {
  items: { title: string; note: string; cap: string }[]
  wide?: boolean
  caption?: string
}) {
  return (
    <figure>
      <div className={`shots${wide ? ' wide' : ''}`}>
        {items.map((s) => (
          <div className={wide ? 'shot' : 'phone'} key={s.cap}>
            <div className="scr">
              <span className="ph">
                <b>{s.title}</b>
                {s.note}
              </span>
            </div>
            <span className="cap">{s.cap}</span>
          </div>
        ))}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/* ---------- next / prev ---------- */

export function NextPrev({
  prev,
  next,
}: {
  prev: { label: string; href: string }
  next: { label: string; href: string }
}) {
  return (
    <div className="nextprev">
      <a href={prev.href}>
        <em>Previous</em>
        <b>{prev.label}</b>
      </a>
      <a href={next.href} style={{ textAlign: 'right' }}>
        <em>Next</em>
        <b>{next.label}</b>
      </a>
    </div>
  )
}
