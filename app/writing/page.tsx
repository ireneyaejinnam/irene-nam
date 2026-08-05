import Link from 'next/link'
import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'
import { writing } from '@/content/projects'

export const metadata = { title: 'Writing' }

export default function Writing() {
  return (
    <>
      <Rail />
      <main className="body">
        <section className="hero">
          <span className="lbl">Writing</span>
          <h1>Notes on things that surprised me.</h1>
        </section>
        <section className="homesec">
          <div className="sh">
            <h2>All pieces</h2>
            <span className="lbl">{String(writing.length).padStart(2, '0')}</span>
          </div>
          {writing.map((w, i) => (
            <Link className="wrow" href={`/writing/${w.slug}`} key={w.slug}>
              <span className="ix">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{w.title}</h3>
                <p>{w.excerpt}</p>
              </div>
              <span className="dt">{w.date}</span>
            </Link>
          ))}
        </section>
        <Footer />
      </main>
    </>
  )
}
