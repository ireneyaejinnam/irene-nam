import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'
import { Header, Section, Pull, Caveat, NextPrev } from '@/components/CaseStudy'

export const metadata = {
  title: 'Bank of America',
  description: 'Four years between traders, quants and engineers.',
}

const TOC = [
  { id: 'role', label: 'The role' },
  { id: 'practice', label: 'In practice' },
  { id: 'analysis', label: 'How I worked' },
  { id: 'taught', label: 'What it changed' },
]

export default function BofA() {
  return (
    <>
      <Rail toc={TOC} back={{ label: 'All experience', href: '/experience' }} />

      <main className="body">
        <Header
          eyebrow="Experience · Jul 2021 – Jul 2025"
          title="Four years between traders, quants and engineers."
          dek="I spent four years building electronic trading products across Rates and Mortgages — translating desk problems into trading workflows, technical integrations, data products, and the analysis that told us what to do next."
          facts={[
            { label: 'Role', value: 'Trading Strategist, FICC E-Trading Product' },
            { label: 'Period', value: 'Jul 2021 – Jul 2025' },
            { label: 'Markets', value: 'Rates, Mortgages, Credit' },
            { label: 'Based', value: 'New York and London' },
            { label: 'Licences', value: 'SIE, Series 7, Series 63' },
          ]}
          evidence={[
            { value: '3 desks', label: 'analytics across Rates, Mortgages, Credit' },
            { value: 'EUR + GBP', label: 'markets expanded' },
            { value: '~10%', label: 'retail market share, UST platform after rollout' },
          ]}
        />

        <article>
          <Section id="role" n="01" title="The role">
            <p>
              <strong>
                Electronic trading product management didn&apos;t mean owning a single application.
                The product was the trading capability itself:
              </strong>{' '}
              how prices reached clients, how orders came in, where flow could be executed, what
              could be automated, and what infrastructure had to exist underneath it.
            </p>
            <p>
              The roadmap around me mixed client-facing product expansion with trading protocols,
              venue connectivity, algorithmic capabilities, market-data performance and core platform
              work. Those weren&apos;t independent tracks. A new execution workflow could depend on a
              venue protocol, which depended on connectivity and market data — while the desk still
              had to trade through the existing workflow the entire time.
            </p>

            <Pull label="Why this wasn&apos;t a normal product role">
              Market structure, client distribution, trading protocols, models and infrastructure all
              lived on the same plan, because they could all gate one another.
            </Pull>

            <p>
              Traders thought in liquidity, risk and PnL. Quants thought in models and signals.
              Engineers thought in systems, dependencies and failure modes. Sales saw the client.
              External venues had their own protocols, release schedules and constraints.{' '}
              <strong>My job lived between all of them.</strong>
            </p>
            <p>
              I worked primarily across Rates and Mortgages, owning parts of the electronic trading
              product: execution workflows, trading protocols, platform connectivity, automation, and
              the roadmap connecting them.
            </p>
            <p>
              <strong>I also stayed unusually close to the implementation.</strong> If the fastest way
              to understand a problem was to query the data, build an internal tool, or instrument the
              workflow, I did it myself. Engineering owned the core production architecture; I often
              built the analytical layer closer to the desk — pipelines, real-time tools, and the
              analysis around what we shipped.
            </p>

            <Caveat label="On what&apos;s here">
              Everything below stays at or under the level of detail on my résumé. Clients,
              strategies, internal roadmaps and desk performance are proprietary and stay that way.
            </Caveat>
          </Section>

          <Section id="practice" n="02" title="What that looked like in practice">
            <p>
              The roadmap was much broader than any four projects. These are the ones that best show
              the different ways I worked: sometimes the answer was analysis, sometimes a tool,
              sometimes a product decision, and sometimes a new piece of the trading system.
            </p>

            <h3 className="subhead">Predicting client flow before it arrived</h3>
            <p>
              Some large hedge-fund flows in Mortgages were both high-volume and difficult to
              anticipate. When they arrived, the desk had to drop what it was doing and respond, so
              even modest advance warning changed how traders prepared.
            </p>
            <p>
              I combined historical client trading patterns with contemporaneous market signals —
              rate levels, related flow activity, index-level information — into a lightweight
              ML-based alerting tool that estimated whether a particular flow was likely to arrive in
              the next time bucket.
            </p>
            <p>
              It was never a high-confidence forecasting system and I wouldn&apos;t present it as
              one. But when it caught the pattern, traders were prepared rather than reacting cold.
              The useful output wasn&apos;t a good model.{' '}
              <strong>
                It was turning a desk intuition — <em>this client sometimes seems predictable</em> —
                into something measurable enough to act on.
              </strong>
            </p>

            <h3 className="subhead">Building a live view across algorithmic and voice trading</h3>
            <p>
              Algorithmic traders needed live reference and market data alongside the flow the voice
              desk was seeing. The information existed, but not in one usable view — and
              discrepancies between systems made it hard to know whether everyone was reacting to the
              same market.
            </p>
            <p>
              I built a real-time dashboard bringing market data, reference data, execution signals
              and voice-desk flow into a single view. Building it exposed a second problem: some of
              the disagreement wasn&apos;t human.{' '}
              <strong>
                It came from latency and data-flow differences across the algorithmic stack, the
                voice-trading systems, and the databases underneath them.
              </strong>
            </p>
            <p>
              What began as a visibility problem became a systems diagnosis. The interface
              didn&apos;t just surface the data — it gave us a way to see where the infrastructure
              was behaving differently from what its users assumed.
            </p>

            <h3 className="subhead">Expanding an electronic product set</h3>
            <p>
              Expanding our electronic offering in EUR and GBP wasn&apos;t a matter of adding more
              products. We needed to know where additional coverage would actually change our
              competitive position.
            </p>
            <p>
              I started with the market rather than the backlog: product-level rankings, what our
              highest-value clients were already trading with us, and where their activity extended
              past what we offered. I paired that with conversations across clients, trading desks and
              platform stakeholders, then mapped the openings back to the existing product and
              technical architecture.
            </p>
            <p>
              Some gaps required genuinely new capabilities. Others could reuse pricing logic,
              connectivity, protocols or workflows we already supported elsewhere. I separated the
              reusable pieces from the deeper builds and sequenced them into a quarter-by-quarter
              roadmap.{' '}
              <strong>
                The goal wasn&apos;t to electronify everything. It was to find where another unit of
                engineering effort would actually change our position with the clients and products
                that mattered.
              </strong>
            </p>

            <h3 className="subhead">Opening a new distribution channel for existing flow</h3>
            <p>
              The Rates systematic desk was handling a meaningful amount of odd-lot flow that
              didn&apos;t fit neatly into the institutional channels we normally optimised for.
              Rather than treat the existing market structure as fixed, we asked whether there was
              another distribution path.
            </p>
            <p>
              We evaluated three external platforms offering access to a different client segment,
              working across trading, quant, sales and engineering to understand the economics,
              execution model and technical requirements of each. But choosing one was only the first
              decision.{' '}
              <strong>
                Whichever platform we picked had to become another execution channel inside a trading
                system that was already live:
              </strong>{' '}
              pricing had to reach it, orders had to route correctly, risk controls had to behave
              consistently, positions had to come back into the desk&apos;s workflow, and traders
              still needed visibility into what the system was doing.
            </p>
            <p>
              So the work moved continuously between commercial strategy, market structure and
              technical integration. The new channel became a meaningful contributor to the desk, and
              the resulting U.S. Treasuries platform went on to capture roughly 10% of its retail
              segment.{' '}
              <strong>
                Sometimes the highest-leverage product decision isn&apos;t building a new capability.
                It&apos;s finding a new place for an existing one to become valuable.
              </strong>
            </p>
          </Section>

          <Section id="analysis" n="03" title="How I worked">
            <p>
              The common thread wasn&apos;t the asset class or the technology. It was that{' '}
              <strong>the original request was rarely the actual problem.</strong>
            </p>
            <p>
              Traders and salespeople brought strong intuitions because they were in the market every
              day. <em>This client behaves differently around this condition. We&apos;re losing flow
              because of this gap. The algo needs this data. We should add this product.</em> Each of
              those sounds precise until you try to measure it.
            </p>
            <p>
              My job was usually to turn the statement into something we could interrogate: define
              the behaviour, find the relevant data, separate a pattern from a convincing anecdote,
              build enough of the solution to expose its constraints, then decide what deserved
              production engineering. That&apos;s why the analytics work and the product work were
              never very separate for me — real-time pipelines and dashboards across three desks,
              front-to-back frameworks for client flow and hedging including DV01 and flow
              attribution, and classification approaches for studying trading behaviour.
            </p>

            <Pull label="The distinction that stuck">
              Shipping answered whether we could build it. The data answered whether our explanation
              of the problem survived contact with the market.
            </Pull>

            <p>
              The fastest way to clarify a requirement was often to build enough of it to see where
              the assumption broke.
            </p>
          </Section>

          <Section id="taught" n="04" title="What it changed">
            <h3 className="subhead">Requirements are hypotheses</h3>
            <p>
              &ldquo;It&apos;s slow&rdquo; isn&apos;t a specification. Neither is &ldquo;clients want
              this,&rdquo; &ldquo;the model is wrong,&rdquo; or &ldquo;we&apos;re losing on
              price.&rdquo; They&apos;re observations. The work starts by figuring out what would have
              to be true for the observation to be right.
            </p>

            <h3 className="subhead">Instrumentation belongs in the build</h3>
            <p>
              I don&apos;t like launching something and deciding afterwards how we&apos;ll know
              whether it worked. The telemetry, the analysis and the workflow that let you evaluate a
              system are part of the system.
            </p>

            <h3 className="subhead">Constraints are part of the design space</h3>
            <p>
              A trading venue has its own roadmap. A production stack has architecture you
              can&apos;t casually replace. Markets have protocols and regulation. Traders have
              workflows that don&apos;t stop because you&apos;re redesigning them. Good solutions are
              rarely the cleanest ones on paper — they&apos;re the ones that survive the environment
              they&apos;re deployed into.
            </p>

            <div className="brk" />

            <p>
              Four years on a trading floor left me with a particular definition of product work.
              Stay close enough to the user to hear the messy version of the problem. Get technical
              enough to understand where the system disagrees. Build when building is the fastest way
              to learn. Then go back to the data and see which assumptions survived.
            </p>
            <p>
              <strong>That&apos;s the part of the job I&apos;ve kept.</strong>
            </p>
          </Section>

          <NextPrev
            prev={{ label: 'Conviction', href: '/work/conviction' }}
            next={{ label: 'SEA Lab', href: '/experience/sea-lab' }}
          />
        </article>

        <Footer />
      </main>
    </>
  )
}