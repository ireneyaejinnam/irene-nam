import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'
import { Stub } from '@/components/CaseStudy/Stub'

export const metadata = { title: 'Bank of America' }

const Todo = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: 'var(--ink2)' }}>[{children}]</p>
)

export default function BofA() {
  return (
    <>
      <Rail back={{ label: 'All experience', href: '/experience' }} />
      <main className="body">
        <Stub
          eyebrow="Experience · 2021–2025"
          title="Four years between traders, quants and engineers."
          status="Prior role · details limited by confidentiality"
          facts={[
            { label: 'Role', value: 'Product manager, FICC e-trading' },
            { label: 'Period', value: '2021–2025' },
            { label: 'Licences', value: 'Series 7, Series 63' },
            { label: 'Domain', value: 'Fixed income, currencies, commodities' },
          ]}
          next={{ label: 'SEA Lab', href: '/experience/sea-lab' }}
        >
          <p>
            I was a product manager on FICC electronic trading. The work was external vendor
            integration, real-time data pipelines, and standing between three groups who each wanted
            something different from the same system.
          </p>
          <p>
            What I can describe is the shape of it, not the specifics. Most of what I worked on is
            proprietary, and the parts that aren’t are dull. So this page is about what the role
            taught me rather than what it produced.
          </p>
          <Todo>
            Theme one: requirements gathering across groups who don’t share a vocabulary. A trader
            saying “it’s slow” and a quant saying “it’s slow” are describing different problems.
          </Todo>
          <Todo>
            Theme two: vendor integration as the job. Someone else’s system, someone else’s roadmap,
            your users’ deadline. The closest thing to forward-deployed work that exists in a bank —
            draw that parallel explicitly.
          </Todo>
          <Todo>
            Theme three: working where being wrong is expensive and immediate, and what that does to
            how you ship.
          </Todo>
          <Todo>
            The bridge: what carries into applied AI work — the domain fluency, the Series 7 and 63,
            and the habit of asking what a system is actually used for rather than what it was
            specified to do.
          </Todo>
        </Stub>
        <Footer />
      </main>
    </>
  )
}
