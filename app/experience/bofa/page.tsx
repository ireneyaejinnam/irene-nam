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
          dek="I spent four years building electronic trading products across Rates and Mortgages, turning desk problems into trading workflows, technical integrations, and data products that told us what to do next."
          facts={[
            { label: 'Role', value: 'Product Manager (Trading Strategist), FICC E-Trading' },
            { label: 'Period', value: 'Jul 2021 – Jul 2025' },
            { label: 'Markets', value: 'Global Rates, Mortgages, Credit' },
            { label: 'Based', value: 'New York (3 yrs), London (1 yr)' },
            { label: 'Licences', value: 'SIE, Series 7, Series 63' },
          ]}
          evidence={[
            { value: '3 desks', label: 'analytics across Rates, Mortgages, Credit' },
            { value: 'USD, EUR, GBP', label: 'markets expanded' },
            { value: '~10%', label: 'UST retail platform market share, after rollout' },
          ]}
        />

        <article>
          <Section id="role" n="01" title="The role">
            <p>
              <strong>
                Electronic trading product management didn't mean owning a single application.
                The product was the trading capability itself:
              </strong>{' '}
              how prices reached clients, how orders came in, where flow could be executed, what could
              be automated, and what infrastructure had to exist underneath it.
            </p>
            <p>
              The roadmap around me mixed client-facing product expansion with trading protocols,
              venue connectivity, algorithmic capabilities, market-data performance, and core platform
              work. Those weren't independent tracks. A new execution workflow could depend on a
              venue protocol, which depended on connectivity and market data. Meanwhile, the desk would
              still have to keep trading through the existing workflow the whole time.
            </p>

            <Pull label="Why this wasn't a normal product role">
              Market structure, client distribution, trading protocols, models, and infrastructure all
              lived under the same plan, because they could all gate one another.
            </Pull>

            <p>
              Traders thought in liquidity, risk and PnL. Quants thought in models and signals. For
              engineers, it was systems, dependencies, and failure modes. Sales saw their clients. External
              venues came with their own protocols, release schedules and constraints, and no
              obligation to any of us. <strong>My job lived in between all of them.</strong>
            </p>
            <p>
              I worked mostly across Rates and Mortgages, owning parts of the electronic trading
              product: execution workflows, trading protocols, platform connectivity, automation, and
              the roadmap connecting them.
            </p>
            <p>
              <strong>I also stayed unusually close to the implementation.</strong> If the fastest way
              to understand a problem was to query the data, build an internal tool, or instrument the
              workflow, I did it myself. Engineering owned the core production architecture. I built
              the analytical layer closer to the desk: pipelines, real-time tools, and the analysis
              around what we shipped.
            </p>

            <Caveat label="On what's here">
              Everything below stays at or under the level of detail on my resume. Clients,
              strategies, internal roadmaps and desk performance are proprietary.
            </Caveat>
          </Section>

          <Section id="practice" n="02" title="What that looked like in practice">
            <p>
              The roadmap was much broader than any four projects. These are the ones that best show
              the different ways I worked. Sometimes the answer was analysis, sometimes a tool,
              sometimes a product decision, and sometimes a new piece of the trading system.
            </p>

            <h3 className="subhead">Predicting client flow before it arrived</h3>
            <p>
              Some specific client flows at one of the desks were high-volume and hard to anticipate. 
              When they arrived, the desk had to drop what it was doing and respond, so even modest 
              advance warnings could've changed how traders prepared.
            </p>
            <p>
              I combined historical client trading patterns with contemporaneous market signals, using
              rate levels, related flow activity, and index-level information, into a lightweight classification
              ML-based alerting tool. It estimated whether a particular flow was likely to arrive in
              the next time bucket.
            </p>
            <p>
              It was never a high-confidence forecasting system and I wouldn't present it as one.
              But when it caught the pattern, traders were prepared instead of reacting cold.{' '}
              <strong>
                What made it worth building was the translation. Traders had a hunch that one client
                was somewhat predictable, and this turned that hunch into something measurable enough
                to act on.
              </strong>
            </p>

            <h3 className="subhead">Building a live view across algorithmic and voice trading</h3>
            <p>
              Algorithmic traders needed live reference and market data alongside the flow the voice
              desk was seeing. The information existed, but not in one usable view. Discrepancies
              between systems made it hard to know whether everyone was reacting to the same market.
            </p>
            <p>
              I built a real-time dashboard that brought market data, reference data, execution
              signals, and voice-desk flow into a single view. Building it exposed a second problem.
              Some of the disagreement had nothing to do with people, but{' '}
              <strong>
                it came from latency and data-flow differences across the algorithmic stack, the
                voice-trading systems, and the databases underneath them.
              </strong>
            </p>
            <p>
              What began as a visibility problem turned into a systems diagnosis. The interface
              surfaced the data, and in doing so it also showed us where the infrastructure was
              behaving differently from what its users assumed.
            </p>

            <h3 className="subhead">Expanding an electronic product set</h3>
            <p>
              Expanding our electronic offering in EUR and GBP wasn't a matter of adding more
              products. We needed to know where additional coverage would actually change our
              competitive position.
            </p>
            <p>
              I started with the market rather than the backlog, looking at product-level rankings,
              what our highest-value clients were already trading with us, and where their activity
              extended past what we offered. I paired that with conversations across clients, trading
              desks, and platform stakeholders, then mapped the openings back to the existing product
              and technical architecture.
            </p>
            <p>
              Some gaps required genuinely new capabilities while others could reuse pricing logic,
              connectivity, protocols, or workflows we already supported elsewhere. I separated the
              reusable pieces from the deeper builds and sequenced them into a quarter-by-quarter
              roadmap.{' '}
              <strong>
                Electronifying everything was never the goal. The question was where another unit of
                engineering effort would actually change our position with the clients and products
                that mattered.
              </strong>
            </p>

            <h3 className="subhead">Opening a new distribution channel for existing flow</h3>
            <p>
              The Rates systematic desk was handling a meaningful amount of odd-lot flow that
              didn't fit neatly into the institutional channels we normally optimized for. Rather
              than treating the existing market structure as fixed, we asked whether there was another
              distribution path.
            </p>
            <p>
              We evaluated three external platforms offering access to a different client segment,
              working across trading, quant, sales, and engineering to understand the economics,
              execution model, and technical requirements of each. Choosing one was only the first
              decision.{' '}
              <strong>
                Whichever platform we picked had to become another execution channel inside a trading
                system that was already live.
              </strong>{' '}
              Pricing had to reach it, orders had to route correctly, risk controls had to behave
              consistently, positions had to come back into the desk's workflow, and traders
              still needed visibility into what the system was doing.
            </p>
            <p>
              The work moved continuously between commercial strategy, market structure, and
              technical integration. The new channel became a meaningful contributor to the desk, and
              the resulting U.S. Treasuries platform went on to capture a significant share of its retail
              segment.{' '}
              <strong>
                We didn't build a new capability here, but instead, we found a new place for one we already
                had, which turned out to be worth more than most of what we could have built instead.
              </strong>
            </p>
          </Section>

          <Section id="analysis" n="03" title="How I worked">
            <p>
              The common thread had nothing to do with asset class or technology. In almost every
              case, <strong>the original request turned out not to be the actual problem.</strong>
            </p>
            <p>
              Traders and salespeople brought strong intuitions because they were in the market every
              day. <em>This client behaves differently around this condition. We're losing flow
              because of this gap. The algo needs this data. We should add this product.</em> Each of
              those sounds precise until you try to measure it.
            </p>
            <p>
              My job was usually to turn these statements into something we could interrogate. Define the
              behavior, find the relevant data, separate a pattern from a convincing anecdote, build
              enough of the solution to expose its constraints, then decide what deserved production
              engineering. That's why the analytics work and the product work were never very
              separate for me. Real-time pipelines and dashboards across three desks, front-to-back
              frameworks for client flow and hedging (including DV01 and flow attribution), and
              classification approaches for studying trading behavior were some examples of what I did.
            </p>

            <Pull label="The distinction that stuck">
              Shipping products answered whether we could build it. The data answered whether our 
              explanation of the problem survived contact with the market.
            </Pull>

            <p>
              The fastest way to clarify a requirement was often to build enough of it to see where
              the assumption broke.
            </p>
          </Section>

          <Section id="taught" n="04" title="What it changed">
            <h3 className="subhead">Requirements are hypotheses</h3>
            <p>
              "It's slow" isn't a specification. Neither is "clients want
              this," "the model is wrong," or "we're losing on
              price." Those are observations. The work starts by figuring out what would have to
              be true for the observation to be right.
            </p>

            <h3 className="subhead">Instrumentation belongs in the build</h3>
            <p>
              I don't like launching something and deciding afterwards how we'll know
              whether it worked. The telemetry, the analysis, and the workflow that let you evaluate a
              system are all part of the system.
            </p>

            <h3 className="subhead">Constraints are part of the design space</h3>
            <p>
              A trading venue has its own roadmap. A production stack has architecture you can't
              casually replace. Markets have protocols and regulation. Traders have workflows that
              don't stop because you're redesigning them. The cleanest solution on paper was
              rarely the right one. What mattered was whether it survived the environment it got
              deployed into.
            </p>

            <div className="brk" />

            <p>
              Four years on a trading floor left me with a particular definition of product work. Staying
              close enough to the user to hear the messy version of the problem, getting technical enough
              to see where the system disagrees with them, and building when building is the fastest way to
              learn something, then going back to the data and find out which assumptions survived.
            </p>
            <p>
              <strong>That's the part of the job I've kept.</strong>
            </p>
          </Section>

          <NextPrev
            prev={{ label: 'Conviction', href: '/projects/conviction' }}
            next={{ label: 'SEA Lab', href: '/experience/sea-lab' }}
          />
        </article>

        <Footer />
      </main>
    </>
  )
}