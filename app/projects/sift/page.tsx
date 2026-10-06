import { Rail } from '@/components/Rail'
import { Reveal } from '@/components/Reveal'
import { Footer } from '@/components/Footer'
import { Header, Section, Pull, Caveat, SpecTable, NextPrev } from '@/components/CaseStudy'
import { FunnelChart } from '@/components/CaseStudy/FunnelChart'
import { PipelineDiagram } from '@/components/CaseStudy/PipelineDiagram'

export const metadata = {
  title: 'Sift',
  description: 'Nobody finished onboarding. Personalization worked anyway.',
}

const TOC = [
  { id: 'problem', label: 'The problem' },
  { id: 'built', label: 'What I built' },
  { id: 'learned', label: 'What the data said' },
  { id: 'next', label: "What I'd do next" },
]

export default function Sift() {
  return (
    <>
      <Rail toc={TOC} back links={[
        { label: 'App Store', href: '#' },
        { label: 'GitHub', href: '#' },
        { label: 'Email', href: 'mailto:you@example.com' },
      ]} />

      <main className="body">
        <Header
          eyebrow="Project 01 · Consumer iOS · 2026"
          title="Nobody finished onboarding. Personalization worked anyway."
          dek="Sift is a taste-first event app for New York, co-built and shipped to the App Store. We designed an onboarding flow to learn your taste before you saw a single event. Not one user finished it. The recommender reached full confidence for most of them anyway."
          cta={[
            { label: 'View on the App Store', href: 'https://apps.apple.com/us/app/sift-nyc-events/id6761741207' },
            { label: 'Source on GitHub', href: 'https://github.com/ireneyaejinnam/sift-mobile', ghost: true },
          ]}
          facts={[
            { label: 'My role', value: 'Co-founder, product and engineering' },
            { label: 'Team', value: 'Four co-founders' },
            { label: 'Stack', value: 'React Native, Expo, Supabase' },
            { label: 'Status', value: 'Live on the App Store' },
          ]}
          evidence={[
            { value: '0 of 41', label: 'completed the taste-setter' },
            { value: '60%', label: 'reached full confidence (n≈25)' },
            { value: '20.5%', label: 'App Store conversion, 79 views' },
          ]}
        />

        <Reveal>
          <div className="shots app-shots">
            {[
              { src: '/shots/sift/01-deck.png', cap: '01 · Deck' },
              { src: '/shots/sift/02-taste-setter.png', cap: '02 · Taste-setter' },
              { src: '/shots/sift/03-event.png', cap: '03 · Event' },
              { src: '/shots/sift/04-import.png', cap: '04 · Import' },
            ].map((s) => (
              <div className="phone" key={s.cap}>
                <div className="scr">
                  <img src={s.src} alt={s.cap} />
                </div>
                <span className="cap">{s.cap}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <article>
          <Section id="problem" n="01" title="The problem">
            <p>
              New York has more events on any given night than a person could evaluate in a week,
              and almost none of them are relevant to any particular person. We ran{' '}
              <strong>20 user interviews</strong> before writing product code. Two findings shaped
              everything after.
            </p>
            <p>
              The first was fragmentation:{' '}
              <strong>87% of the 18–35 New Yorkers we spoke to used three or more apps</strong> to
              figure out what to do, usually some mix of Google Maps, Eventbrite, Instagram, Resy, 
              and a group chat. The second finding was a negative result, and it mattered more.{' '}
              <strong>Zero interview subjects asked for another social feed.</strong> What they described wanting was an
              answer, not more to look through.
            </p>

            <div className="quotes">
              <div>
                <p>
                  “We spend most of our time looking into activities we end up not even going to. We
                  just get overwhelmed and give up.”
                </p>
                <span>Sam, 23 · user interview</span>
              </div>
              <div>
                <p>
                  “Honestly? I don’t want another social media app. I just want to know what’s good
                  this weekend.”
                </p>
                <span>Recurring theme across 20 interviews</span>
              </div>
            </div>

            <p>
              That pushed us away from a feed and toward a ranked deck, one card at a time, ordered
              by predicted fit, creating a cold-start problem. A recommender with no signal
              cannot rank, so we did the obvious thing and{' '}
              <strong>asked the user up front.</strong>
            </p>
          </Section>

          <Section id="built" n="02" title="What I built">
            <p>
              The client is React Native on Expo and the backend is Supabase. Most of the work went
              into the ingest pipeline and the scoring loop.
            </p>
            <p>
              <strong>Six live scrapers</strong> pull from Dice, Resident Advisor, Luma, Fever, NYC
              museums, and Eventbrite, refreshed{' '}
              <strong>every three days via GitHub Actions</strong>. Claude Sonnet finds what the
              scrapers miss and pulls in a curated "high-taste" list of events, mostly involving 
              pop-ups, sample sales and gallery openings. Then everything gets
              cut hard. An LLM rubric rejects tourist traps, corporate spam, and children's events, which
              removes <strong>roughly 85% of incoming inventory</strong>. What survives gets a vibe
              score from 1–10 via <code>gpt-4o-mini</code>; anything under a score of 5 never loads.
            </p>
            <p>
              Aggregators need the firehose because their economics depend on total inventory. Ours
              didn't, so we could afford to throw most of it away. <strong>Rejection is the product.</strong>
            </p>

            <PipelineDiagram />

            <p>
              On the client, every swipe carries intent. Each gesture updates four independent
              signals (category, tag, borough, price band) and the deck{' '}
              <strong>re-ranks in under 200ms</strong>.
            </p>

            <SpecTable
              head={['Gesture', 'Intent', 'Signal effect', 'Weight']}
              rows={[
                { cells: ['Right', 'Going', 'Category, each tag, borough', '+0.15 / +0.08 / +0.06'], numeric: 3 },
                { cells: ['Left', 'Not now', 'No taste effect; resurfaces in 2–5 days', '0.00'], numeric: 3 },
                { cells: ['Down', 'Not interested', 'Category penalty; 3 strikes hides permanently', '−0.05'], numeric: 3 },
                { cells: ['Up', 'Inspect', 'Opens detail, deliberately no signal', '—'], numeric: 3 },
              ]}
            />

            <p>
              Cold start blends quality and timing for roughly the first 20 swipes, then hands over
              to personalized ranking. That threshold is what <code>confidence</code> measures. I built it as
              an internal diagnostic, a way to check if he recommender had enough signal before we
              trusted it. It turned out to be the most important number in the product.
            </p>
          </Section>

          <Section id="learned" n="03" title="What the data said">
            <p>
              We launched with no paid acquisition. The App Store funnel was healthy.{' '}
              <strong>157 impressions, 79 product page views, 18 first-time downloads</strong>, a
              20.5% conversion against Apple’s typical 5–7%. With 23 seeded TestFlight users still
              active, that put us at 41 people.
            </p>

            <FunnelChart
              title="Acquisition · App Store, launch to week 3, zero spend"
              caption="20.5% page-view-to-install. Strong ratio, small denominator. 79 views is not a stable estimate, so I'd treat it as directional rather than a benchmark claim."
              bars={[
                { label: 'Impressions', value: '157', width: 100 },
                { label: 'Product page views', value: '79', width: 50 },
                { label: 'First-time downloads', value: '18', width: 11, hi: true },
              ]}
            />

            <p>Then I pulled the onboarding funnel expecting a drop-off curve, and got something that didn’t resolve.</p>

            <FunnelChart
              title="Personalization · all 41 users"
              caption="Zero out of 41 finished it. Roughly 60% of active users reached full personalization confidence anyway, through swipes, saves and repeat category visits."
              bars={[
                { label: 'Opened the app', value: '41', width: 100 },
                { label: 'Started the taste-setter', value: '17', width: 41 },
                { label: 'Finished the taste-setter', value: '0', width: 1, zero: true },
                { label: 'Reached full confidence', value: '~25', width: 60, hi: true },
              ]}
            />

            <p>
              The mechanism was in our own design and we hadn’t noticed it. Cold start hands over to
              personalized ranking after about 20 swipes.{' '}
              <strong>Twenty swipes takes under two minutes.</strong> The taste-setter was asking
              users to spend ninety seconds declaring preferences the deck would infer from two
              minutes of ordinary use.
            </p>

            <Pull>
              The onboarding flow wasn’t a bottleneck we needed to widen. It was a question the
              product was already answering by watching.
            </Pull>

            <p>
              This surfaced because two independent sources agreed. A heuristic UX audit flagged the
              flow as skippable friction; separately, the scoring code showed confidence
              accumulating for users who had never touched it. Neither alone would have been
              convincing, since the audit could have just been my taste and the score could have
              been a bug.{' '}
              <strong>The finding lives in the agreement between them.</strong>
            </p>

            <Caveat label="On the numbers">
              Every figure here comes from a launch cohort of 41 users. The percentages are honest
              but the denominators are small: 60% is roughly 25 people, and the zero is a genuine
              zero rather than a rounding artifact. I’d re-run all of it at 1,000 users before
              treating any of it as settled. The direction was clear enough to act on though, and a
              design decision that costs every new user ninety seconds doesn’t need p &lt; 0.05 to
              be worth revisiting.
            </Caveat>
          </Section>

          <Section id="next" n="04" title="What I'd do next">
            <p>
              Cutting the taste-setter is the obvious move and the least interesting one. What I'd actually want to know is what
              else in the product asks for information it could observe instead.
            </p>
            <ul>
              <li>Cut the taste-setter entirely; keep one optional neighbourhood prompt at first save, where intent already exists</li>
              <li>Surface confidence to the user as a reason (<em>you’re seeing this because you saved three like it</em>), turning an internal diagnostic into trust</li>
              <li>Instrument the inverse: which users never reach confidence, and what they have in common</li>
              <li>Re-run the audit against the scoring code each quarter, since that pairing is what caught this</li>
            </ul>

            <p>
              <strong>Instrument the implicit path before you build the explicit one.</strong> That's the
              lesson I took into everything after. We built the questionnaire because it was the
              legible solution, and only found out it was redundant because we happened to have
              logged the alternative.
            </p>
          </Section>

          <NextPrev
            prev={{ label: 'SWISH', href: '/projects/swish' }}
            next={{ label: 'Conviction', href: '/projects/conviction' }}
          />
        </article>

        <Footer />
      </main>
    </>
  )
}
