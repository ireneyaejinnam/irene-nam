import Link from 'next/link'

export function Footer() {
  return (
    <footer>
      <span className="lbl">© {new Date().getFullYear()} Irene Nam</span>
      <span className="lbl">Available December 2026</span>
      <Link className="lbl colophon-link" href="/colophon">
        Next.js · Vercel · built by hand →
      </Link>
    </footer>
  )
}
