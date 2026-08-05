import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'
import { Stub } from '@/components/CaseStudy/Stub'

export const metadata = { title: 'SEA Lab' }

export default function Page() {
  return (
    <>
      <Rail back />
      <main className="body">
        <Stub
          eyebrow="Project 04 · Research · 2026"
          title="A multi-agent system for mental rehearsal."
          status="Under submission · CHI 2027"
          facts={[
            { label: 'Role', value: 'Research assistant' },
            { label: 'Lab', value: 'Columbia SEA Lab' },
            { label: 'Advisor', value: 'Prof. Xuhai “Orson” Xu' },
            { label: 'Venue', value: 'CHI 2027, under submission' },
          ]}
          prev={{ label: 'Scout', href: '/work/scout' }}
          next={{ label: 'dart-rag', href: '/work/dart-rag' }}
        >
          <p style={{ color: 'var(--ink2)' }}>[TODO: two or three sentences on what mental rehearsal is and why a multi-agent architecture suits it. Written for someone who does not read HCI papers.]</p>
          <p style={{ color: 'var(--ink2)' }}>[TODO: one sentence on your specific contribution and the author position you expect.]</p>
          <p>A full write-up goes up after the submission decision. Until then this page stays deliberately thin — the work is under review and the numbers are not mine alone to publish.</p>
        </Stub>
        <Footer />
      </main>
    </>
  )
}
