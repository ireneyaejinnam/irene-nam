import Link from 'next/link'
import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'
import { experience } from '@/content/projects'

export const metadata = { title: 'Experience' }

export default function Experience() {
  return (
    <>
      <Rail />
      <main className="body">
        <section className="hero">
          <span className="lbl">Experience</span>
          <h1>Where the instincts come from.</h1>
        </section>
        <section className="homesec">
          <div className="sh">
            <h2>Roles</h2>
            <span className="lbl">{String(experience.length).padStart(2, '0')}</span>
          </div>
          {experience.map((w, i) => (
            <Link className="wrow" href={`/experience/${w.slug}`} key={w.slug}>
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
