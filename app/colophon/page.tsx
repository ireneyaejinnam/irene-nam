import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'

export const metadata = { title: 'Colophon' }

export default function Colophon() {
  return (
    <>
      <Rail />
      <main className="body">
        <div className="stub">
          <span className="lbl">Colophon</span>
          <h1>How this site is built.</h1>

          <p>
            A Next.js app written in TypeScript, styled with a single token file, and deployed on
            Vercel. There is no CMS and no database — every page is a React component, and project
            metadata lives in one array.
          </p>
          <p>
            Type is Archivo for display, Inter for body, IBM Plex Mono for data and labels, and Noto
            Sans KR for Korean. Self-hosted at build time via <code>next/font</code>.
          </p>
          <p>
            The ground is <code>#1A1C1D</code> with a single periwinkle accent at{' '}
            <code>#93A8E8</code>, reserved for evidence — the numbers attached to each project —
            plus link affordances. Long-form prose sits at <code>#C6C7C4</code> rather than the
            secondary grey, because a body colour tuned for two-line hooks is tiring across a
            thousand words.
          </p>
          <p>
            The texture is a 4.5% SVG noise overlay. The pointer carries a 340px radial lightening.
            Neither survives <code>prefers-reduced-motion</code>, and neither exists on touch
            devices.
          </p>
          <p>
            The portrait is an illustration, not a photograph, remapped for a dark ground: the
            original was drawn on white, so skin is compressed to <code>#D6D5D1</code> rather than
            glowing, and hair lifted off the background instead of disappearing into it.
          </p>
          <p>Built by hand, no template.</p>

          <div className="cta" style={{ marginTop: 34 }}>
            <a className="btn" href="https://github.com/">
              Source on GitHub <i>↗</i>
            </a>
          </div>

          <div className="facts">
            <div><em>Framework</em><b>Next.js 15, App Router</b></div>
            <div><em>Language</em><b>TypeScript</b></div>
            <div><em>Hosting</em><b>Vercel</b></div>
            <div><em>Backend</em><b>None — fully static</b></div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
