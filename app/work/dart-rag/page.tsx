import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'
import { Stub } from '@/components/CaseStudy/Stub'

export const metadata = { title: 'dart-rag' }

export default function Page() {
  return (
    <>
      <Rail back />
      <main className="body">
        <Stub
          eyebrow="Project 05 · Retrieval · 2026"
          title="Does grounding still beat a frontier model in Korean?"
          status="In progress · Phase 3"
          facts={[
            { label: 'Role', value: 'Sole author' },
            { label: 'Corpus', value: 'DART corporate filings' },
            { label: 'Baselines', value: 'GPT-4o, Claude, Gemini' },
            { label: 'Status', value: 'Test set in construction' },
          ]}
          prev={{ label: 'SEA Lab', href: '/work/sea-lab' }}
          next={{ label: 'SWISH', href: '/work/swish' }}
        >
          <p>A benchmark comparing grounded retrieval against frontier models answering from parameters alone, over Korean corporate filings from DART. The English-language version of this question is close to settled. The Korean one is not, and the gap is where the interesting answer lives.</p>
          <p style={{ color: 'var(--ink2)' }}>[TODO: one paragraph on method — multilingual-E5 for embeddings, dense-only retrieval, and the Mr. TYDI Korean Wikipedia notebooks that justify both choices. Say plainly that those two decisions were made and frozen before the DART results existed.]</p>
          <p style={{ color: 'var(--ink2)' }}>[TODO: what you expect to find, written now, before you have the numbers. A pre-registered guess you can be wrong about in public is worth more than a clean result explained afterwards.]</p>
        </Stub>
        <Footer />
      </main>
    </>
  )
}
