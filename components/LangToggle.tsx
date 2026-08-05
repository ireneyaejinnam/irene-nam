'use client'
import { useState } from 'react'

export function LangToggle() {
  const [lang, setLang] = useState<'en' | 'ko'>('en')

  const pick = (next: 'en' | 'ko') => {
    setLang(next)
    document.documentElement.setAttribute('lang', next)
    document.documentElement.dataset.lang = next
  }

  return (
    <div className="lang">
      <button onClick={() => pick('en')} aria-pressed={lang === 'en'}>EN</button>
      <button onClick={() => pick('ko')} aria-pressed={lang === 'ko'}>KO</button>
    </div>
  )
}
