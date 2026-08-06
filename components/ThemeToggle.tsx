'use client'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (saved) {
      setTheme(saved)
      document.documentElement.dataset.theme = saved
    }
  }, [])

  const pick = (next: 'dark' | 'light') => {
    setTheme(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
  }

  return (
    <div className="theme-toggle">
      <button onClick={() => pick('dark')} aria-pressed={theme === 'dark'}>Dark</button>
      <button onClick={() => pick('light')} aria-pressed={theme === 'light'}>Light</button>
    </div>
  )
}
