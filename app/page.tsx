import Link from 'next/link'
import { Rail } from '@/components/Rail'
import { Reveal } from '@/components/Reveal'
import { Footer } from '@/components/Footer'
import { TerminalHero } from '@/components/HeroEntrance'
import { featured, experience } from '@/content/projects'

export default function Home() {
  return (
    <>
      <Rail />
      <main className="body">
        <TerminalHero />

        <section className="homesec" id="experience">
          <div className="sh">
            <h2>Experience</h2>
            <span className="lbl">{String(experience.length).padStart(2, '0')}</span>
          </div>
          {experience.map((w, i) => (
            <Reveal key={w.slug}>
              <Link className="wrow" href={`/experience/${w.slug}`}>
                <span className="ix">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.excerpt}</p>
                </div>
                <span className="dt">{w.date}</span>
              </Link>
            </Reveal>
          ))}
        </section>

        <section className="homesec" id="projects">
          <div className="sh">
            <h2>Selected projects</h2>
            <span className="lbl">2024 — 2026</span>
          </div>

          {featured.map((p, i) => (
            <Reveal key={p.slug}>
              <Link className="row" href={`/projects/${p.slug}`}>
                <span className="ix">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>
                    <span className="t">{p.name}</span>
                  </h3>
                  <p className="hook">{p.hook}</p>
                  <div className="tg">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="ev">
                  {p.evidence.map((e) => (
                    <div key={e.label}>
                      <b>{e.value}</b>
                      <em>{e.label}</em>
                    </div>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}

          <div style={{ marginTop: 28 }}>
            <Link className="lbl colophon-link" href="/projects">
              All projects →
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
