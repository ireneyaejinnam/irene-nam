import Link from 'next/link'
import { Rail } from '@/components/Rail'
import { Reveal } from '@/components/Reveal'
import { Footer } from '@/components/Footer'
import { allProjects } from '@/content/projects'

export const metadata = { title: 'Work' }

export default function Work() {
  return (
    <>
      <Rail />
      <main className="body">
        <section className="hero">
          <span className="lbl">Work</span>
          <h1>Everything, including the parts still being built.</h1>
        </section>

        <section className="homesec">
          <div className="sh">
            <h2>All projects</h2>
            <span className="lbl">{allProjects.length} total</span>
          </div>
          {allProjects.map((p, i) => (
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
        </section>
        <Footer />
      </main>
    </>
  )
}
