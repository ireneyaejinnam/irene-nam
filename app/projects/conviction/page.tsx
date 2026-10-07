// import { Rail } from '@/components/Rail'
// import { Reveal } from '@/components/Reveal'
// import { Footer } from '@/components/Footer'
// import { Header, Section, Pull, Caveat, SpecTable, Shots, NextPrev } from '@/components/CaseStudy'

// export const metadata = {
//   title: 'Conviction',
//   description: "Some questions about filings aren't retrieval questions.",
// }

// const Fill = ({ children }: { children: React.ReactNode }) => (
//   <span style={{ color: 'var(--ink2)' }}>[{children}]</span>
// )

// const TOC = [
//   { id: 'problem', label: 'The problem' },
//   { id: 'built', label: 'What I built' },
//   { id: 'learned', label: 'What I got wrong' },
//   { id: 'eval', label: 'How I know it works' },
// ]

// export default function Conviction() {
//   return (
//     <>
//       <Rail toc={TOC} back links={[
//         { label: 'Live demo', href: '#' },
//         { label: 'GitHub', href: '#' },
//         { label: 'Email', href: 'mailto:you@example.com' },
//       ]} />

//       <main className="body">
//         <Header
//           eyebrow="Project 02 · Retrieval · 2026"
//           title="Some questions about filings aren't retrieval questions."
//           dek="Conviction answers questions about SEC filings with citations back to the source text. Its most useful feature turned out to be the one that bypasses the retrieval system entirely."
//           cta={[
//             { label: 'Try the demo', href: '#' },
//             { label: 'Source on GitHub', href: '#', ghost: true },
//           ]}
//           facts={[
//             { label: 'Role', value: 'Sole author' },
//             { label: 'Period', value: '2026' },
//             { label: 'Stack', value: 'Python, GPT-4o, ChromaDB, Docker, EC2' },
//             { label: 'Status', value: 'FILL — deployed at <url>?' },
//           ]}
//           evidence={[
//             { value: 'FILL', label: 'hand-labeled eval questions' },
//             { value: 'FILL', label: 'retrieval hit rate @8' },
//             { value: 'FILL', label: 'citation precision, hand-checked' },
//           ]}
//         />

//         <Reveal>
//           <Shots
//             wide
//             caption="Replace with terminal captures or UI screenshots at 2×."
//             items={[
//               { title: 'Screenshot', note: 'Cited answer, Item 1A', cap: '01 · Query' },
//               { title: 'Screenshot', note: 'Risk-factor diff, year over year', cap: '02 · Diff' },
//             ]}
//           />
//         </Reveal>

//         <article>
//           <Section id="problem" n="01" title="The problem">
//             <p>
//               A 10-K runs to a few hundred pages, most of it boilerplate that barely moves year to
//               year. The signal is in what changed. A risk factor that gained a paragraph, a hedge
//               that got firmer, a customer concentration disclosure that grew a sentence. Finding that
//               by reading is possible and nobody does it.
//             </p>
//             <p>
//               The incumbent tools, AlphaSense and Hebbia and Rogo, solve this for institutions at
//               institutional prices. <strong>Conviction is scoped to one person&apos;s watchlist</strong>,
//               and to transparency. Every claim points at the sentence it came from.
//             </p>
//             <p>
//               <Fill>
//                 Your turn: a paragraph on why you personally wanted this, from four years on an FICC
//                 desk. That framing is the part nobody else can write.
//               </Fill>
//             </p>
//           </Section>

//           <Section id="built" n="02" title="What I built">
//             <p>
//               Filings come from EDGAR via <code>sec-edgar-downloader</code>, get parsed into
//               sections, and are chunked section-aware at roughly 800 tokens with 100 tokens of
//               overlap. <strong>Chunks never span Item boundaries</strong>, because a passage
//               straddling Item 1A and Item 7 is answerable to neither question. Embeddings are{' '}
//               <code>text-embedding-3-small</code>. The store is ChromaDB, local and persistent, with
//               ticker and document-type metadata so retrieval can be scoped to one company or one
//               filing type.
//             </p>
//             <p>
//               Generation runs against GPT-4o under a prompt that refuses to answer outside the
//               provided excerpts and requires a <code>[Source N]</code> marker on every claim.
//               LangChain is in the project for document loaders and nothing else. Everything
//               downstream talks to the SDKs directly, which keeps the failure modes legible.
//             </p>

//             <SpecTable
//               head={['Layer', 'Choice', 'Why not the alternative']}
//               rows={[
//                 { cells: ['Chunking', 'Section-aware, ~800 tokens', 'Fixed-size splits cut across Items and produce ungroundable passages'] },
//                 { cells: ['Vector store', 'Chroma, local, persistent', 'Pinecone adds a network hop and a bill for a single-user tool'] },
//                 { cells: ['Framework', 'LangChain loaders only', 'Full-chain abstraction hides where retrieval actually failed'] },
//                 { cells: ['Eval', 'Hand-labeled Q&A pairs', 'Model-generated ground truth grades the system on its own priors'] },
//                 { cells: ['Hosting', 'Docker Compose on one EC2 instance', 'App Runner and Fargate fight a persistent disk, and Chroma needs one'] },
//               ]}
//             />

//             <p>
//               Two capabilities sit on top. <strong>A multi-ticker watchlist</strong>, currently
//               covering <Fill>N</Fill> companies. And <strong>risk-factor diffing</strong>, which
//               compares this year&apos;s Item 1A against last year&apos;s and reports what changed in
//               the language.
//             </p>
//             <p>
//               It runs as a container behind Caddy on a single EC2 instance, with the Chroma store on
//               a mounted volume and logs shipped to CloudWatch. The API sits behind a key with rate
//               limiting, and the public demo uses a server-held key so anyone can try it without
//               signing up for anything.{' '}
//               <strong>
//                 I picked EC2 over a managed runtime because the app needs a persistent disk and I
//                 wanted to be able to explain every layer of it.
//               </strong>
//             </p>
//           </Section>

//           <Section id="learned" n="03" title="What I got wrong">
//             <p>
//               I built the diff feature on top of retrieval, because retrieval was the system I had.
//               Ask for both years&apos; risk factors, get the top-k chunks for each, compare them. It
//               produced plausible output and it was wrong in a way that took an eval set to see.
//             </p>

//             <Pull>
//               Retrieval answers &ldquo;what is relevant to this question.&rdquo; Diffing asks
//               &ldquo;what is different between these two documents.&rdquo; Top-k actively destroys
//               the second.
//             </Pull>

//             <p>
//               Any retrieval step returns the passages most similar to a query. For two versions of
//               the same document, those are the passages that <em>didn&apos;t change</em>. The parts
//               that moved are exactly the parts least likely to survive a similarity ranking. I was
//               sampling the boilerplate and diffing that.
//             </p>
//             <p>
//               The fix was to stop retrieving. The diff module in <code>src/analyze/</code>{' '}
//               <strong>bypasses Chroma entirely</strong> and does whole-document comparison, with an
//               LLM producing structured JSON on what changed rather than a character-level diff:
//             </p>

//             <pre>
//               <code>
//                 <span className="c"># src/analyze/ — no vector store in this path</span>
//                 {'\n'}prior, current = load_item_1a(ticker, y-1), load_item_1a(ticker, y)
//                 {'\n'}diff = <span className="a">llm_json_diff</span>(prior, current)   <span className="c"># not difflib</span>
//                 {'\n'}<span className="c"># difflib reports every reworded sentence as a change.</span>
//                 {'\n'}<span className="c"># The question is which changes carry meaning.</span>
//               </code>
//             </pre>

//             <p>
//               Character-level diffing was the other wrong answer I tried. Filings get lightly
//               reworded every year, so <code>difflib</code> flags hundreds of edits and buries the
//               three that matter.{' '}
//               <strong>The judgment about which changes are material is the product</strong>, and that
//               judgment needs a model reading both passages in full.
//             </p>
//             <p>
//               <Fill>
//                 Your turn: one concrete example. A ticker, a year, and a specific risk-factor change
//                 the system surfaced. One real example is worth the whole section.
//               </Fill>
//             </p>
//           </Section>

//           <Section id="eval" n="04" title="How I know it works">
//             <p>
//               The first eval harness was six questions scored pass or fail. It told me the pipeline
//               ran. It told me nothing about where it broke.
//             </p>
//             <p>
//               A pass-fail score on a RAG system hides the failure that matters. An answer can be
//               fluent, correctly formatted, carry a <code>[Source N]</code> marker, and cite a chunk
//               that doesn&apos;t contain the claim. That answer passes. It is also the single worst
//               output the system can produce, because it looks exactly like a correct one.
//             </p>

//             <Pull label="What the harness measures now">
//               Not whether the answer looks right. Whether the chunk it cited actually says what the
//               answer claims it says.
//             </Pull>

//             <p>The rebuilt harness reports four things:</p>

//             <SpecTable
//               head={['Metric', 'What it catches', 'How it&apos;s scored']}
//               rows={[
//                 { cells: ['Retrieval hit rate @8', 'Chunking and metadata filtering failures', 'Did any retrieved chunk come from the expected Item'] },
//                 { cells: ['Citation precision', 'Fluent answers citing the wrong chunk', 'Hand-labeled, one row per citation'] },
//                 { cells: ['Abstention accuracy', 'Answering questions the filing cannot support', 'Refusal detection on unanswerable questions'] },
//                 { cells: ['False-refusal rate', 'Over-refusing on questions it should handle', 'Same heuristic, inverted, on answerable questions'] },
//               ]}
//             />

//             <p>
//               <strong>Citation precision is hand-labeled and I will not automate it.</strong> The
//               obvious shortcut is an LLM judge scoring whether each citation supports its claim. That
//               judge has the same failure mode as the system it is grading: both reward a fluent,
//               plausible-sounding match. Grading a hallucination problem with a model prone to
//               hallucination gives you a number that moves for the wrong reasons. The harness writes
//               every citation into a CSV with its claim sentence beside the cited chunk, and I mark
//               each one by hand.
//             </p>
//             <p>
//               Retrieval misses are logged with what came back instead, so a miss is a diagnosis
//               rather than a tally.{' '}
//               <Fill>
//                 Your turn: once EVAL_RESULTS.md exists, drop in set size, hit@8, citation precision
//                 and the count of citations checked, plus one or two specific misses and what they
//                 revealed. The misses are more interesting than the headline rate.
//               </Fill>
//             </p>

//             <Caveat label="On the size of this">
//               <Fill>
//                 Your turn, once the numbers exist. State the set size plainly and say what it can and
//                 can&apos;t support. A few dozen hand-labeled questions across four filings is a
//                 controlled demonstration and not a population estimate, and saying so is worth more
//                 than the number itself.
//               </Fill>
//             </Caveat>

//             <p>
//               What I&apos;d do next, in order: extend diffing beyond Item 1A to MD&amp;A, where the
//               language moves more and means more. Split the eval set by question type, since factual
//               lookup, synthesis and refusal fail in different ways and one aggregate rate hides that.
//               And benchmark grounded retrieval against frontier models answering from parameters
//               alone, which is the question{' '}
//               <a href="/projects/dart-rag" style={{ color: 'var(--acc)' }}>dart-rag</a> takes up in
//               Korean.
//             </p>
//             <p>
//               The transferable lesson from the whole build:{' '}
//               <strong>the architecture should follow the question, not the other way round.</strong>{' '}
//               I had a retrieval system, so I reached for retrieval. The diff only worked once I was
//               willing to route around the thing I had just built, and I only found out it was broken
//               because I had something measuring it.
//             </p>
//           </Section>

//           <NextPrev
//             prev={{ label: 'Sift', href: '/projects/sift' }}
//             next={{ label: 'dart-rag', href: '/projects/dart-rag' }}
//           />
//         </article>

//         <Footer />
//       </main>
//     </>
//   )
// }

import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'
import { Header, Section, Pull, Caveat, SpecTable, NextPrev } from '@/components/CaseStudy'

export const metadata = {
  title: 'Conviction',
  description: "Some questions about filings aren't retrieval questions.",
}

const TOC = [
  { id: 'problem', label: 'The problem' },
  { id: 'built', label: 'How it works' },
  { id: 'learned', label: 'What I got wrong' },
  { id: 'eval', label: 'How it gets measured' },
]

export default function Conviction() {
  return (
    <>
      <Rail toc={TOC} back links={[
        { label: 'GitHub', href: '#' },
        { label: 'Email', href: 'mailto:you@example.com' },
      ]} />

      <main className="body">
        <Header
          eyebrow="Project 02 · Retrieval · 2026"
          title="Some questions about filings aren't retrieval questions."
          dek="Conviction answers questions about SEC filings with citations back to the source text. Its most useful feature turned out to be the one that bypasses the retrieval system entirely. This is a short brief on the architecture and what building it taught me. A fuller write-up follows once the evaluation run is finished."
          facts={[
            { label: 'Role', value: 'Sole author' },
            { label: 'Period', value: '2026' },
            { label: 'Stack', value: 'Python, GPT-4o, ChromaDB' },
            { label: 'Corpus', value: 'SEC 10-K filings via EDGAR' },
          ]}
          evidence={[
            { value: '4', label: 'tickers in the watchlist' },
            { value: '~800', label: 'tokens per chunk, Item-bounded' },
            { value: '0', label: 'retrieval calls in the diff path' },
          ]}
        />

        <article>
          <Section id="problem" n="01" title="The problem">
            <p>
              A 10-K runs to a few hundred pages, most of it boilerplate that barely moves year to
              year. The signal is in what changed. A risk factor that gained a paragraph, a hedge
              that got firmer, a customer concentration disclosure that grew a sentence. Finding that
              by reading is possible and nobody does it.
            </p>
            <p>
              The incumbent tools, AlphaSense and Hebbia and Rogo, solve this for institutions at
              institutional prices. <strong>Conviction is scoped to one person&apos;s watchlist</strong>,
              and to transparency. Every claim points at the sentence it came from.
            </p>
          </Section>

          <Section id="built" n="02" title="How it works">
            <p>
              Filings come from EDGAR, get parsed into sections, and are chunked section-aware at
              roughly 800 tokens with 100 tokens of overlap.{' '}
              <strong>Chunks never span Item boundaries</strong>, because a passage straddling Item
              1A and Item 7 is answerable to neither question. The store is ChromaDB with ticker and
              document-type metadata, so retrieval can be scoped to one company or one filing type.
            </p>
            <p>
              Generation runs under a prompt that refuses to answer outside the provided excerpts and
              requires a <code>[Source N]</code> marker on every claim. LangChain is in the project
              for document loaders and nothing else. Everything downstream talks to the SDKs
              directly, which keeps the failure modes legible.
            </p>

            <SpecTable
              head={['Layer', 'Choice', 'Why not the alternative']}
              rows={[
                { cells: ['Chunking', 'Section-aware, ~800 tokens', 'Fixed-size splits cut across Items and produce ungroundable passages'] },
                { cells: ['Vector store', 'Chroma, local, persistent', 'Pinecone adds a network hop and a bill for a single-user tool'] },
                { cells: ['Framework', 'LangChain loaders only', 'Full-chain abstraction hides where retrieval actually failed'] },
                { cells: ['Eval', 'Hand-labeled Q&A pairs', 'Model-generated ground truth grades the system on its own priors'] },
              ]}
            />

            <p>
              Two capabilities sit on top. A multi-ticker watchlist, and risk-factor diffing, which
              compares this year&apos;s Item 1A against last year&apos;s and reports what changed in
              the language.
            </p>
          </Section>

          <Section id="learned" n="03" title="What I got wrong">
            <p>
              I built the diff feature on top of retrieval, because retrieval was the system I had.
              Ask for both years&apos; risk factors, get the top-k chunks for each, compare them. It
              produced plausible output and it was wrong in a way that took an eval set to see.
            </p>

            <Pull>
              Retrieval answers &ldquo;what is relevant to this question.&rdquo; Diffing asks
              &ldquo;what is different between these two documents.&rdquo; Top-k actively destroys
              the second.
            </Pull>

            <p>
              Any retrieval step returns the passages most similar to a query. For two versions of
              the same document, those are the passages that <em>didn&apos;t change</em>. The parts
              that moved are exactly the parts least likely to survive a similarity ranking. I was
              sampling the boilerplate and diffing that.
            </p>
            <p>
              The fix was to stop retrieving. The diff path bypasses the vector store entirely and
              does whole-document comparison, with a model producing structured output on what
              changed.
            </p>
            <p>
              Character-level diffing was the other wrong answer I tried. Filings get lightly
              reworded every year, so a text diff flags hundreds of edits and buries the three that
              matter.{' '}
              <strong>The judgment about which changes are material is the product</strong>, and that
              judgment needs a model reading both passages in full.
            </p>
          </Section>

          <Section id="eval" n="04" title="How it gets measured">
            <p>
              The first eval harness was a handful of questions scored pass or fail. It told me the
              pipeline ran. It told me nothing about where it broke.
            </p>
            <p>
              A pass-fail score on a retrieval system hides the failure that matters. An answer can
              be fluent, correctly formatted, carry a <code>[Source N]</code> marker, and cite a
              chunk that doesn&apos;t contain the claim. That answer passes. It is also the worst
              output the system can produce, because it looks exactly like a correct one.
            </p>

            <Pull label="What the harness measures">
              Not whether the answer looks right. Whether the chunk it cited actually says what the
              answer claims it says.
            </Pull>

            <p>The rebuilt harness reports four things:</p>

            <SpecTable
              head={['Metric', 'What it catches', 'How it&apos;s scored']}
              rows={[
                { cells: ['Retrieval hit rate', 'Chunking and metadata filtering failures', 'Did any retrieved chunk come from the expected Item'] },
                { cells: ['Citation precision', 'Fluent answers citing the wrong chunk', 'Hand-labeled, one row per citation'] },
                { cells: ['Abstention accuracy', 'Answering questions the filing cannot support', 'Refusal detection on unanswerable questions'] },
                { cells: ['False-refusal rate', 'Over-refusing on questions it should handle', 'Same check, inverted, on answerable questions'] },
              ]}
            />

            <p>
              <strong>Citation precision is hand-labeled and I will not automate it.</strong> The
              obvious shortcut is a model judging whether each citation supports its claim. That
              judge has the same failure mode as the system it is grading, since both reward a
              fluent, plausible-sounding match. Grading a hallucination problem with something prone
              to hallucination gives you a number that moves for the wrong reasons. The harness
              writes every citation into a file with its claim sentence beside the cited chunk, and I
              mark each one by hand.
            </p>
            <p>
              Retrieval misses are logged with whatever came back instead, so a miss is a diagnosis
              rather than a tally.
            </p>

            <Caveat label="Status">
              This is a brief, not the full write-up. The architecture and the findings above are
              current. The evaluation numbers are not here yet because the labeling is still in
              progress, and I would rather publish nothing than publish an estimate. They go up when
              they exist, alongside the retrieval misses and what each one turned out to mean.
            </Caveat>

            <p>
              The transferable lesson from the build so far:{' '}
              <strong>the architecture should follow the question, not the other way round.</strong>{' '}
              I had a retrieval system, so I reached for retrieval. The diff only worked once I was
              willing to route around the thing I had just built, and I only found out it was broken
              because something was measuring it.
            </p>
          </Section>

          <NextPrev
            prev={{ label: 'Sift', href: '/projects/sift' }}
            next={{ label: 'dart-rag', href: '/projects/dart-rag' }}
          />
        </article>

        <Footer />
      </main>
    </>
  )
}