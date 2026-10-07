import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'
import { Header, Section, Pull, Caveat, SpecTable, NextPrev } from '@/components/CaseStudy'

export const metadata = {
  title: 'dart-rag',
  description: 'Korean retrieval, measured. Then a benchmark on whether grounding survives without it.',
}

const TOC = [
  { id: 'study', label: 'The retrieval study' },
  { id: 'surprises', label: 'Three surprises' },
  { id: 'next', label: "What I'm running next" },
]

export default function DartRag() {
  return (
    <>
      <Rail
        toc={TOC}
        back={{ label: 'All work', href: '/projects' }}
        links={[
          { label: 'GitHub', href: '#' },
          { label: 'Notebooks', href: '#' },
        ]}
      />

      <main className="body">
        <Header
          eyebrow="Project 05 · Retrieval · 2026"
          title="Better retrieval didn't make the answers more faithful. It made the model willing to answer."
          dek="I benchmarked four retrievers on Korean Wikipedia QA, then ran the same 200 questions end to end through a generator to see whether retrieval gains survived into the answers. They did, but not in the way I expected, and that result is what the next experiment is built on."
          facts={[
            { label: 'Role', value: 'Sole author' },
            { label: 'Corpus', value: 'Mr. TYDI Korean, 200-query subset' },
            { label: 'Retrievers', value: 'BM25 whitespace, BM25-Kiwi, E5, RRF hybrid' },
            { label: 'Next', value: 'DART filings benchmark, designed, not yet run' },
          ]}
          evidence={[
            { value: '2.1×', label: 'E5 over Kiwi-BM25, Recall@10' },
            { value: '57.5% → 18.5%', label: 'cannot-answer rate' },
            { value: '4.63 – 4.78', label: 'faithfulness, flat across all four' },
          ]}
        />

        <article>
          <Section id="study" n="01" title="The retrieval study">
            <p>
              Korean is a morphologically rich, agglutinative language. Particles attach to nouns,
              verbs inflect heavily, and whitespace does not mark word boundaries the way it does in
              English. That makes it a good place to test whether retrieval methods built on English
              assumptions hold up.
            </p>
            <p>
              I used Mr. TYDI Korean, a standard multilingual retrieval benchmark, and compared four
              retrievers on the same queries. BM25 with naive whitespace tokenization. BM25 with
              Kiwi, a Korean morphological analyzer, keeping only content morphemes. Dense retrieval
              with <code>multilingual-e5-base</code>. And an equal-weight reciprocal-rank fusion of
              the Kiwi and dense runs.
            </p>

            <SpecTable
              head={['Retriever', 'Recall@10', 'Recall@100', 'MRR@100']}
              rows={[
                { cells: ['BM25, whitespace', '0.213', '0.306', '0.167'], numeric: 3 },
                { cells: ['BM25, Kiwi morphological', '0.311', '0.502', '0.236'], numeric: 3 },
                { cells: ['Dense, multilingual-E5', '0.658', '0.829', '0.502'], numeric: 3 },
                { cells: ['Hybrid, Kiwi + dense via RRF', '0.478', '0.810', '0.348'], numeric: 3 },
              ]}
            />

            <p>
              Retrieval metrics on their own only tell you what reached the context window. The
              second half of the study ran all four retrievers through the same generator on a
              200-query subset, holding the model constant so that any difference in answer quality
              traced to retrieval rather than to the generator. A separate judge scored each answer
              for faithfulness and relevance, and I tracked how often the model declined to answer at
              all.
            </p>
          </Section>

          <Section id="surprises" n="02" title="Three surprises">
            <h3 className="subhead">The tokenizer was worth more than I thought</h3>
            <p>
              Swapping whitespace tokenization for Kiwi lifted Recall@10 from 0.213 to 0.311 and
              Recall@100 from 0.306 to 0.502. Nothing else changed. That is a large gain for a
              one-line substitution, and it means a lot of published Korean BM25 baselines are
              probably measuring their tokenizer rather than their retriever.
            </p>

            <h3 className="subhead">I got the opposite result to the benchmark's own paper</h3>
            <p>
              Mr. TYDI reported that BM25 outperformed multilingual DPR on Korean. With
              multilingual-E5 I found the reverse, and by a wide margin: 0.658 Recall@10 against
              0.311 for a properly tokenized BM25, roughly 2.1 times better.{' '}
              <strong>
                The original finding appears to depend heavily on which dense model was available at
                the time rather than on anything intrinsic to Korean.
              </strong>{' '}
              That is worth knowing before you reach for a sparse baseline on the strength of a 2021
              result.
            </p>

            <h3 className="subhead">The hybrid made things worse</h3>
            <p>
              I expected reciprocal-rank fusion to win. It usually does. Here it landed at 0.478
              Recall@10, well below dense alone at 0.658, while holding up at depth (0.810 Recall@100
              against 0.829). Equal-weight fusion pulled strong dense results down the ranking to
              make room for weaker BM25 ones. When one retriever substantially dominates the other,
              naive fusion costs you precision at the top, which is the part that reaches the model.
            </p>

            <h3 className="subhead">And the one that mattered most</h3>
            <p>
              I expected better retrieval to produce more grounded answers. It did not. Faithfulness
              scores sat between 4.625 and 4.780 on a five-point scale across all four retrievers,
              effectively flat. What moved was whether the model answered at all. With whitespace
              BM25 it declined 57.5% of the time. With dense E5 that fell to 18.5%.
            </p>

            <Pull label="The finding">
              When retrieval was weak, the model refused rather than fabricating. Better retrieval
              did not make it more honest. It made it able to speak.
            </Pull>

            <p>
              That behavior is the thing worth probing further, because it was measured entirely
              inside a grounded pipeline. Every condition had retrieval, some of it just bad. The
              obvious next question is what happens when there is no retrieval at all.
            </p>
          </Section>

          <Section id="next" n="next" title="What I'm running next">
            <p>
              The follow-up moves to Korean corporate filings from DART, the Korean regulator&apos;s
              disclosure system. Four conditions, one variable:
            </p>

            <SpecTable
              head={['Condition', 'Retrieval', 'Generator', 'Purpose']}
              rows={[
                { cells: ['rag_gpt4', 'E5 over DART', 'GPT-4o', 'the grounded system'] },
                { cells: ['raw_gpt4', 'none', 'GPT-4o', 'controlled ablation, grounding removed'] },
                { cells: ['raw_claude', 'none', 'Claude', 'parametric ceiling'] },
                { cells: ['raw_gemini', 'none', 'Gemini', 'parametric ceiling'] },
              ]}
            />

            <p>
              Two design choices carry the weight. The first is that the grounded system and the
              ablation share a generator, so the delta between them isolates retrieval rather than
              model quality. The second is the corpus window. Filings from 2024 and 2025 sit at or
              past the models&apos; training cutoffs, so a raw model has to either abstain or invent,
              which is the behavior under test. Wikipedia would have been useless here: frontier
              models already know most of it, and the grounding signal collapses.
            </p>
            <p>
              Raw models are explicitly allowed to say 확실하지 않습니다. Forcing an answer turns
              every uncertainty into a fabrication and makes the hallucination metric meaningless.
            </p>

            <Pull label="Written before the run">
              I expect hallucination to appear. The Mr. TYDI result showed a model that abstained
              when context was thin, but it always had context. My guess is that abstention was a
              property of the pipeline rather than of the model, and that removing retrieval entirely
              produces confident fabrication instead.
            </Pull>

            <p>
              I could be wrong about that, which is the point of writing it down first. The
              alternative outcome is that the frontier models abstain cleanly on recent filings they
              have no memory of, in which case the value of grounding is narrower than I think and
              the interesting number becomes how much accuracy it recovers rather than how much
              fabrication it prevents.
            </p>

            <Caveat label="Status">
              The retrieval study is complete and the results above are from it. The DART benchmark
              is designed and documented, with the ingest pipeline and experimental protocol written,
              but it has not been run. The hand-labeled test set is the bottleneck: it needs 50
              verified Korean question and answer pairs with exact gold spans copied from the
              filings, and I am building it by hand because that is the only part of the experiment
              a model cannot be trusted to produce. Results go up when they exist, including if they
              contradict the paragraph above.
            </Caveat>
          </Section>

          <NextPrev
            prev={{ label: 'Conviction', href: '/projects/conviction' }}
            next={{ label: 'SWISH', href: '/projects/swish' }}
          />
        </article>

        <Footer />
      </main>
    </>
  )
}