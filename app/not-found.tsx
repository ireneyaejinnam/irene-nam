import Link from 'next/link'
import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Rail />
      <main className="body">
        <section className="hero">
          <span className="lbl">404</span>
          <h1>That page doesn’t exist.</h1>
          <p>
            It may have been renamed, or it may never have existed.{' '}
            <Link href="/" style={{ color: 'var(--acc)' }}>Back to the homepage</Link>, or press ⌘K
            to search.
          </p>
        </section>
        <Footer />
      </main>
    </>
  )
}
