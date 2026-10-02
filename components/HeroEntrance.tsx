'use client'

import { useState, useEffect } from 'react'

function Typewriter({ text, delay, speed = 40, className = '' }: {
  text: string; delay: number; speed?: number; className?: string
}) {
  const [shown, setShown] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const iv = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) { clearInterval(iv); setDone(true) }
    }, speed)
    return () => clearInterval(iv)
  }, [started, text, speed])

  return (
    <div className={`lt2-typed ${className}`}>
      {shown}
      {started && !done && <span className="lt2-cursor">▊</span>}
    </div>
  )
}

export function TerminalHero() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => setPhase(4), 4200),
      setTimeout(() => setPhase(5), 7200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section className="lt-hero lt2-terminal">
      <div className="lt2-term-window lt2-term-lg">
        <div className="lt2-term-bar">
          <span className="lt2-dot-r" /><span className="lt2-dot-y" /><span className="lt2-dot-g" />
          <span className="lt2-term-title">irene@columbia ~</span>
        </div>
        <div className="lt2-term-body lt2-term-body-lg">
          {phase >= 1 && (
            <div className="lt2-cmd">
              <span className="lt2-prompt">$</span>
              <Typewriter text="whoami" delay={0} speed={50} className="lt2-input" />
            </div>
          )}
          {phase >= 2 && (
            <div className="lt2-output lt2-log">
              <Typewriter text="Irene Nam" delay={0} speed={20} className="lt2-output-name" />
              <Typewriter text="M.S. Computer Science @ Columbia University" delay={300} speed={12} />
              <Typewriter text="Product · Applied AI · Engineering" delay={1000} speed={12} />
            </div>
          )}
          {phase >= 3 && (
            <div className="lt2-cmd">
              <span className="lt2-prompt">$</span>
              <Typewriter text="cat experience.log" delay={0} speed={35} className="lt2-input" />
            </div>
          )}
          {phase >= 4 && (
            <div className="lt2-output lt2-log">
              <Typewriter text="[2021–2025]  Bank of America · FICC E-Trading Product" delay={0} speed={10} />
              <Typewriter text="             Product Manager - Rates, Mortgages, Credit" delay={600} speed={10} />
              <Typewriter text="" delay={0} speed={10} />
              <Typewriter text="[2026]       SEA Lab, Columbia · Multi-agent systems" delay={1500} speed={10} />
              <Typewriter text="             Graduate Researcher - CHI 2027 submission" delay={2100} speed={10} />
            </div>
          )}
          {phase >= 5 && (
            <>
              <div className="lt2-cmd">
                <span className="lt2-prompt">$</span>
                <Typewriter text="echo $THESIS" delay={0} speed={40} className="lt2-input" />
              </div>
              <div className="lt2-output lt2-thesis">
                <Typewriter
                  text={`"I turn messy problems into things we can build, then test them against reality."`}
                  delay={600}
                  speed={12}
                  className="lt-acc"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="lt-scroll-cue">
        <span className="lt-arrow">↓</span>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
