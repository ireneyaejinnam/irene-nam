import type { ReactNode } from 'react'
import { NextPrev } from './index'

export function Stub({
  eyebrow,
  title,
  status,
  children,
  facts,
  prev,
  next,
}: {
  eyebrow: string
  title: string
  status: string
  children: ReactNode
  facts: { label: string; value: ReactNode }[]
  prev?: { label: string; href: string }
  next?: { label: string; href: string }
}) {
  return (
    <>
      <div className="stub">
        <span className="lbl">{eyebrow}</span>
        <h1>{title}</h1>
        <div className="status">
          <s />
          {status}
        </div>
        {children}
        <div className="facts">
          {facts.map((f) => (
            <div key={f.label}>
              <em>{f.label}</em>
              <b>{f.value}</b>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 90 }}>
        <NextPrev prev={prev} next={next} />
      </div>
    </>
  )
}
