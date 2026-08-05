import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'
import { Stub } from '@/components/CaseStudy/Stub'

export const metadata = { title: 'Scout' }

export default function Page() {
  return (
    <>
      <Rail back />
      <main className="body">
        <Stub
          eyebrow="Project 03 · Agents · 2026"
          title="An MCP host that runs my own job search."
          status="In progress · v1 scoping"
          facts={[
            { label: 'Role', value: 'Sole author' },
            { label: 'Protocol', value: 'MCP — host, client, server' },
            { label: 'Sources', value: 'Gmail, Calendar, Obsidian, web' },
            { label: 'Status', value: 'Building' },
          ]}
          prev={{ label: 'Conviction', href: '/work/conviction' }}
          next={{ label: 'SEA Lab', href: '/work/sea-lab' }}
        >
          <p>Scout orchestrates Gmail, Calendar, Obsidian and web search through the Model Context Protocol, assembles briefs before interviews, and tracks application state pulled out of unstructured recruiter email.</p>
          <p style={{ color: 'var(--ink2)' }}>[TODO: the design principle worth leading with — it consumes five mature servers and authors one. The authored server does the fuzzy, high-value transform: turning a recruiter email into clean structured pipeline state. Gluing connectors is shallow; the depth is the server nobody else has written.]</p>
          <p style={{ color: 'var(--ink2)' }}>[TODO: the safety model. Read-only by default, human-in-the-loop on every write, scoped OAuth, untrusted-content handling, cost caps.]</p>
          <p>Staged v1 to v3 so it is useful at every step: read-only briefs first, then guarded actions, then the authored server deployed remote with OAuth 2.1.</p>
        </Stub>
        <Footer />
      </main>
    </>
  )
}
