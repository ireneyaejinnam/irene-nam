import { Rail } from '@/components/Rail'
import { Reveal } from '@/components/Reveal'
import { Footer } from '@/components/Footer'
import { Header, Section, Pull, SpecTable, Shots, NextPrev } from '@/components/CaseStudy'

export const metadata = {
  title: 'Conviction',
  description: "Some questions about filings aren't retrieval questions.",
}

const TOC = [
  { id: 'problem', label: 'The problem' },
  { id: 'built', label: 'What I built' },
  { id: 'learned', label: 'What I got wrong' },
  { id: 'next', label: "What I'd do next" },
]

export default function Conviction() {
  return (
    <>
      <Rail toc={TOC} back links={[
        { label: 'GitHub', href: '#' },
        { label: 'Demo', href: '#' },
        { label: 'Email', href: 'mailto:you@example.com' },
      ]} />

      <main className="body">
        <Header
          eyebrow="Project 02 · Retrieval · 2026"
          title="Some questions about filings aren't retrieval questions."
          dek="Conviction answers questions about SEC filings with citations back to the source text. Its most useful feature turned out to be the one that bypasses the retrieval system entirely."
          cta={[
            { label: 'Source on GitHub', href: '#' },
            { label: 'Read DECISIONS.md', href: '#', ghost: true },
          ]}
          facts={[
            { label: 'Role', value: 'Sole author' },
            { label: 'Period', value: '2026' },
            { label: 'Stack', value: 'Python, GPT-4o, ChromaDB' },
            { label: 'Status', value: 'TODO — deployed?' },
          ]}
          evidence={[
            { value: 'TODO', label: 'chunks indexed' },
            { value: 'TODO', label: 'eval pairs' },
            { value: 'TODO', label: 'tickers supported' },
          ]}
        />

        <Reveal>
          <Shots
            wide
            caption="Replace with terminal captures or UI screenshots at 2×."
            items={[
              { title: 'Screenshot', note: 'Cited answer, Item 1A', cap: '01 · Query' },
              { title: 'Screenshot', note: 'Risk-factor diff, year over year', cap: '02 · Diff' },
            ]}
          />
        </Reveal>

        <article>
          <Section id="problem" n="01" title="The problem">
            <p>
              A 10-K runs to a few hundred pages, most of it boilerplate that barely moves year to
              year. The signal is in what changed — a risk factor that gained a paragraph, a hedge
              that got firmer, a customer concentration disclosure that grew a sentence. Finding
              that by reading is possible and nobody does it.
            </p>
            <p>
              The incumbent tools — AlphaSense, Hebbia, Rogo — solve this for institutions at
              institutional prices. <strong>Conviction is scoped to one person’s watchlist</strong>,
              and to transparency: every claim points at the sentence it came from.
            </p>
            <p style={{ color: 'var(--ink2)' }}>
              [Your turn: a paragraph on why you personally wanted this, from four years on an FICC
              desk. That framing is the part nobody else can write.]
            </p>
          </Section>

          <Section id="built" n="02" title="What I built">
            <p>
              Filings come from EDGAR via <code>sec-edgar-downloader</code>, get parsed into
              sections, and are chunked section-aware at roughly 800 tokens with 100 tokens of
              overlap. <strong>Chunks never span Item boundaries</strong>, because a passage
              straddling Item 1A and Item 7 is answerable to neither question. Embeddings are{' '}
              <code>text-embedding-3-small</code>; the store is ChromaDB, local and persistent.
            </p>
            <p>
              Generation runs against GPT-4o under a prompt that refuses to answer outside the
              provided excerpts and requires a <code>[Source N]</code> marker on every claim.
              LangChain is in the project for document loaders and nothing else — everything
              downstream talks to the SDKs directly, which keeps the failure modes legible.
            </p>

            <SpecTable
              head={['Layer', 'Choice', 'Why not the alternative']}
              rows={[
                { cells: ['Chunking', 'Section-aware, ~800 tokens', 'Fixed-size splits cut across Items and produce ungroundable passages'] },
                { cells: ['Vector store', 'Chroma, local, persistent', 'Pinecone adds a network hop and a bill for a single-user tool'] },
                { cells: ['Framework', 'LangChain loaders only', 'Full-chain abstraction hides where retrieval actually failed'] },
                { cells: ['Eval', 'Hand-written Q&A pairs', 'Model-generated ground truth grades the system on its own priors'] },
              ]}
            />

            <p>
              Two capabilities sit on top: <strong>a multi-ticker watchlist</strong>, and{' '}
              <strong>risk-factor diffing</strong> — comparing this year’s Item 1A against last
              year’s and reporting what changed in the language.
            </p>
          </Section>

          <Section id="learned" n="03" title="What I got wrong">
            <p>
              I built the diff feature on top of retrieval, because retrieval was the system I had.
              Ask for both years’ risk factors, get the top-k chunks for each, compare them. It
              produced plausible output and it was wrong in a way that took an eval set to see.
            </p>

            <Pull>
              Retrieval answers “what is relevant to this question.” Diffing asks “what is different
              between these two documents.” Top-k actively destroys the second.
            </Pull>

            <p>
              Any retrieval step returns the passages most similar to a query — which, for two
              versions of the same document, are the passages that <em>didn’t change</em>. The parts
              that moved are exactly the parts least likely to survive a similarity ranking. I was
              sampling the boilerplate and diffing that.
            </p>
            <p>
              The fix was to stop retrieving. The diff module in <code>src/analyze/</code>{' '}
              <strong>bypasses Chroma entirely</strong> and does whole-document comparison, with an
              LLM producing structured JSON on what changed rather than a character-level diff:
            </p>

            <pre>
              <code>
                <span className="c"># src/analyze/ — no vector store in this path</span>
                {'\n'}prior, current = load_item_1a(ticker, y-1), load_item_1a(ticker, y)
                {'\n'}diff = <span className="a">llm_json_diff</span>(prior, current)   <span className="c"># not difflib</span>
                {'\n'}<span className="c"># difflib reports every reworded sentence as a change.</span>
                {'\n'}<span className="c"># The question is which changes carry meaning.</span>
              </code>
            </pre>

            <p>
              Character-level diffing was the other wrong answer I tried. Filings get lightly
              reworded every year, so <code>difflib</code> flags hundreds of edits and buries the
              three that matter. <strong>The judgment about which changes are material is the
              product</strong>, and that judgment needs a model reading both passages in full.
            </p>
            <p style={{ color: 'var(--ink2)' }}>
              [Your turn: one concrete example. A ticker, a year, and a specific risk-factor change
              the system surfaced. One real example is worth the whole section.]
            </p>
          </Section>

          <Section id="next" n="04" title="What I'd do next">
            <ul>
              <li>Grow the eval set and split it by question type — factual lookup, synthesis, refusal — since those fail differently</li>
              <li>Measure citation fidelity directly: does the cited chunk actually contain the claim? That’s the failure mode a fluent answer hides</li>
              <li>Extend diffing beyond Item 1A to MD&amp;A, where the language moves more and means more</li>
              <li>Benchmark grounded retrieval against frontier models answering from parameters alone — the question <a href="/work/dart-rag" style={{ color: 'var(--acc)' }}>dart-rag</a> takes up in Korean</li>
            </ul>
            <p>
              The transferable lesson:{' '}
              <strong>the architecture should follow the question, not the other way round.</strong>{' '}
              I had a retrieval system, so I reached for retrieval. The feature only worked once I
              was willing to route around the thing I’d just built.
            </p>
          </Section>

          <NextPrev
            prev={{ label: 'Sift', href: '/work/sift' }}
            next={{ label: 'Scout', href: '/work/scout' }}
          />
        </article>

        <Footer />
      </main>
    </>
  )
}
