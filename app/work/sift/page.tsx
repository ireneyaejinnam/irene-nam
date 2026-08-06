import { Rail } from '@/components/Rail'
import { Reveal } from '@/components/Reveal'
import { Footer } from '@/components/Footer'
import { Header, Section, Pull, Caveat, SpecTable, Shots, NextPrev } from '@/components/CaseStudy'
import { FunnelChart } from '@/components/CaseStudy/FunnelChart'

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
          eyebrow="Project 01 · Consumer iOS · 2025–2026"
          title="Nobody finished onboarding. Personalization worked anyway."
          dek="Sift is a taste-first event app for New York, co-built and shipped to the App Store. We designed an onboarding flow to learn your taste before you saw a single event. Not one user completed it — and the recommender reached full confidence for most of them regardless."
          cta={[
            { label: 'View on the App Store', href: '#' },
            { label: 'Source on GitHub', href: '#', ghost: true },
          ]}
          facts={[
            { label: 'My role', value: 'Co-founder — product & engineering' },
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
          <Shots
            caption="Replace with App Store screenshots at 1290 × 2796 (iPhone 15 Pro Max), exported at 2×."
            items={[
              { title: 'Screenshot', note: 'Feed · 1290 × 2796', cap: '01 · Deck' },
              { title: 'Screenshot', note: 'Mood picker · 1290 × 2796', cap: '02 · Taste-setter' },
              { title: 'Screenshot', note: 'Event detail · 1290 × 2796', cap: '03 · Event' },
              { title: 'Screenshot', note: 'Share-sheet import · 1290 × 2796', cap: '04 · Import' },
            ]}
          />
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
              figure out what to do — Eventbrite, TimeOut, Instagram, Resy, a group chat. The second
              was sharper, and it was a negative result.{' '}
              <strong>Zero interview subjects asked for another social feed.</strong> People did not
              want more to browse. They wanted an answer.
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
              That pushed us away from a feed and toward a ranked deck: one card at a time, ordered
              by predicted fit. Which creates a cold-start problem. A recommender with no signal
              cannot rank, so our first instinct was the obvious one —{' '}
              <strong>ask the user up front.</strong>
            </p>
          </Section>

          <Section id="built" n="02" title="What I built">
            <p>
              The client is React Native on Expo; the backend is Supabase. The interesting parts are
              the ingest pipeline and the scoring loop.
            </p>
            <p>
              <strong>Six live scrapers</strong> pull from Dice, Resident Advisor, Luma, Fever, NYC
              museums and Eventbrite, refreshed{' '}
              <strong>every three days via GitHub Actions</strong>. Claude Sonnet finds what the
              scrapers miss — pop-ups, sample sales, gallery openings. Everything ingested is then
              cut hard: an LLM rubric rejects tourist traps, corporate spam and kids’ events, which
              removes <strong>roughly 85% of incoming inventory</strong>. What survives gets a vibe
              score from 1–10 via <code>gpt-4o-mini</code>; anything under 5 never loads.
            </p>
            <p>
              Aggregators need the firehose because their economics depend on total inventory. We
              don’t, which is the whole design premise: <strong>rejection is the product.</strong>
            </p>

            <Shots
              wide
              caption="The ingest and scoring pipeline, and the Amplitude view the funnel below was read from."
              items={[
                { title: 'Diagram', note: 'Ingest → reject → score → rank', cap: 'Pipeline' },
                { title: 'Screenshot', note: 'Amplitude funnel', cap: 'Instrumentation' },
              ]}
            />

            <p>
              On the client, every swipe carries intent. Each gesture updates four independent
              signals — category, tag, borough, price band — and the deck{' '}
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
              to personalized ranking. That threshold is what <code>confidence</code> measures — an
              internal diagnostic, built to check the recommender had enough signal before we
              trusted it. It turned out to be the most important number in the product.
            </p>
          </Section>

          <Section id="learned" n="03" title="What the data said">
            <p>
              We launched with no paid acquisition. The App Store funnel was healthy —{' '}
              <strong>157 impressions, 79 product page views, 18 first-time downloads</strong>, a
              20.5% conversion against Apple’s typical 5–7%. With 23 seeded TestFlight users still
              active, that put us at 41 people.
            </p>

            <FunnelChart
              title="Acquisition · App Store, launch to week 3, zero spend"
              caption="20.5% page-view-to-install. Strong ratio, small denominator — 79 views is not a stable estimate, and I'd treat it as directional rather than a benchmark claim."
              bars={[
                { label: 'Impressions', value: '157', width: 100 },
                { label: 'Product page views', value: '79', width: 50 },
                { label: 'First-time downloads', value: '18', width: 11, hi: true },
              ]}
            />

            <p>Then I pulled the onboarding funnel expecting a drop-off curve, and got something that didn’t resolve.</p>

            <FunnelChart
              title="Personalization · all 41 users"
              caption="Not a low completion rate. Zero, out of 41. And roughly 60% of active users reached full personalization confidence anyway — through swipes, saves and repeat category visits alone."
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
              convincing — the audit could have been my taste, and the score could have been a bug.{' '}
              <strong>The finding lives in the agreement between them.</strong>
            </p>

            <Caveat label="On the numbers">
              Every figure here comes from a launch cohort of 41 users. The percentages are honest
              but the denominators are small: 60% is roughly 25 people, and the zero is a genuine
              zero rather than a rounding artifact. I’d re-run all of it at 1,000 users before
              treating any of it as settled — but the direction was clear enough to act on, and a
              design decision that costs every new user ninety seconds does not need p &lt; 0.05 to
              be worth revisiting.
            </Caveat>
          </Section>

          <Section id="next" n="04" title="What I'd do next">
            <p>
              Cutting the taste-setter is the obvious move and the least interesting one. The more
              useful question is what else in the product asks for information it could observe
              instead.
            </p>
            <ul>
              <li>Cut the taste-setter entirely; keep one optional neighbourhood prompt at first save, where intent already exists</li>
              <li>Surface confidence to the user as a reason — <em>you’re seeing this because you saved three like it</em> — turning an internal diagnostic into trust</li>
              <li>Instrument the inverse: which users never reach confidence, and what they have in common</li>
              <li>Re-run the audit against the scoring code each quarter, since that pairing is what caught this</li>
            </ul>

            <Shots
              caption="The proposed flow drops ninety seconds of first-run friction and spends the space explaining why a card appeared."
              items={[
                { title: 'Before', note: 'Mood picker, screen 1 of 4', cap: 'Shipped' },
                { title: 'After', note: 'Straight to the deck', cap: 'Proposed' },
                { title: 'After', note: 'Reason shown on card', cap: 'Proposed' },
              ]}
            />

            <p>
              The broader lesson I took into later work:{' '}
              <strong>instrument the implicit path before you build the explicit one.</strong> We
              built the questionnaire because it was the legible solution, and only discovered it
              was redundant because we happened to have logged the alternative.
            </p>
          </Section>

          <NextPrev
            prev={{ label: 'SWISH', href: '/work/swish' }}
            next={{ label: 'Conviction', href: '/work/conviction' }}
          />
        </article>

        <Footer />
      </main>
    </>
  )
}
