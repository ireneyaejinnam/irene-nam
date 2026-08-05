import Link from 'next/link'
import { Rail } from '@/components/Rail'
import { Reveal } from '@/components/Reveal'
import { Footer } from '@/components/Footer'
import { featured, writing } from '@/content/projects'

export default function Home() {
  return (
    <>
      <Rail />
      <main className="body">
        <section className="hero">
          <span className="lbl">Product · Applied AI</span>
          <h1>I build AI products, then find out what people actually do with them.</h1>
          <p>
            MS Computer Science at Columbia. Four years shipping FICC e-trading products at Bank of
            America. Currently building retrieval systems that cite their sources.
          </p>
        </section>

        <section className="homesec" id="work">
          <div className="sh">
            <h2>Selected work</h2>
            <span className="lbl">2024 — 2026</span>
          </div>

          {featured.map((p, i) => (
            <Reveal key={p.slug}>
              <Link className="row" href={`/work/${p.slug}`}>
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
            <Link className="lbl colophon-link" href="/work">
              All projects →
            </Link>
          </div>
        </section>

        <section className="homesec" id="writing">
          <div className="sh">
            <h2>Writing</h2>
            <span className="lbl">{String(writing.length).padStart(2, '0')}</span>
          </div>
          {writing.map((w, i) => (
            <Reveal key={w.slug}>
              <Link className="wrow" href={`/writing/${w.slug}`}>
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

        <Footer />
      </main>
    </>
  )
}
