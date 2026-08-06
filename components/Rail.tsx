import Link from 'next/link'
import { RailProgress } from './RailProgress'
import { ThemeToggle } from './ThemeToggle'
import { TocLinks } from './TocLinks'

export type TocItem = { id: string; label: string }

type Props = {
  /** Section links for case-study pages. Omit for the site-wide nav. */
  toc?: TocItem[]
  /** Show a back link instead of the primary nav. Accepts true (defaults to /work) or a { label, href } object. */
  back?: boolean | { label: string; href: string }
  links?: { label: string; href: string }[]
}

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/experience', label: 'Experience' },
  { href: '/about', label: 'About' },
  { href: '/resume.pdf', label: 'Résumé' },
]

export function Rail({ toc, back = false, links }: Props) {
  const social = links ?? [
    { label: 'Email', href: 'mailto:irene.nam@columbia.edu' },
    { label: 'GitHub', href: 'https://github.com/ireneyaejinnam/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ireneynam/' },
  ]

  return (
    <aside className="rail">
      <RailProgress />

      <div>
        <Link href="/" className="idblock">
          <img className="avatar avatar-dark" src="/portrait/64.png" width={64} height={73} alt="" />
          <img className="avatar avatar-light" src="/portrait/64light.png" width={64} height={73} alt="" />
          <div className="mark">
            Irene Nam<span>New York</span>
          </div>
        </Link>
        {back && (
          <Link className="back" href={typeof back === 'object' ? back.href : '/work'}>
            <i>←</i> {typeof back === 'object' ? back.label : 'All work'}
          </Link>
        )}
      </div>

      {toc ? (
        <TocLinks items={toc} />
      ) : (
        <nav>
          {NAV.map((n, i) => (
            <Link key={n.href} href={n.href}>
              <i>{String(i + 1).padStart(2, '0')}</i>
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>
      )}

      <div>
        <div className="rf">
          {social.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </div>
        <ThemeToggle />
        <div className="kbd">
          <b>⌘</b>
          <b>K</b> search
        </div>
      </div>
    </aside>
  )
}
