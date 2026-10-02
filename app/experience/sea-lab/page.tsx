import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'
import { Header, Section, Pull, Caveat, SpecTable, NextPrev } from '@/components/CaseStudy'

export const metadata = {
  title: 'SEA Lab',
  description: 'Twice: a multi-agent mental rehearsal system. Third author, CHI 2027 submission.',
}

const TOC = [
  { id: 'problem', label: 'The problem' },
  { id: 'system', label: 'The system' },
  { id: 'built', label: 'What I built' },
]

export default function SeaLab() {
  return (
    <>
      <Rail toc={TOC} back={{ label: 'All experience', href: '/experience' }} />

      <main className="body">
        <Header
          eyebrow="Research · Columbia SEA Lab · Jan 2026 – present"
          title="A rehearsal system that adapts to the state the user woke up in."
          dek="Twice reads a person's sleep and activity data, asks what they plan to do today and what they care about, then turns all three into a five-minute guided rehearsal before they start working. I built the iOS app for both study arms and ran the experiments."
          facts={[
            { label: 'Role', value: 'Graduate Researcher' },
            { label: 'Lab', value: 'SEA Lab, Columbia' },
            { label: 'Advisor', value: 'Prof. Xuhai "Orson" Xu' },
            { label: 'Paper', value: 'Third author, CHI 2027 submission' },
          ]}
          evidence={[
            { value: '5', label: 'coordinated agents' },
            { value: '14 of 30', label: 'components survived expert review' },
            { value: 'N = 18', label: 'four-week deployment' },
          ]}
        />

        <article>
          <Section id="problem" n="01" title="The problem">
            <p>
              Most New Year&apos;s resolutions are abandoned within a month. Fewer than one in five
              survive two years.
            </p>
            <p>
              The number matters less than the loop that follows it. Failing at something
              genuinely wanted erodes the belief that success is possible, and that belief is most
              of what drives the next attempt. People don&apos;t only miss goals. They get worse at
              setting them.
            </p>
            <p>
              Athletes handle a version of this with mental rehearsal: running the task mentally
              before performing it. Sport psychology has studied the technique for decades and it
              holds up. A framework called PETTLEP names the seven things a good rehearsal should
              match: the performer&apos;s body, the setting, the task, its pacing, current skill
              level, the emotions involved, and the perspective it&apos;s imagined from.
            </p>
            <p>
              <strong>The catch is that PETTLEP assumes a coach.</strong> Someone who knows the
              athlete, the sport, and what Saturday&apos;s competition looks like. Nobody shows up
              to a Tuesday morning with that. Calendars and task apps handle the decision about
              what to do and the retrospective about what happened. Neither addresses the moment
              a person has to begin.
            </p>
          </Section>

          <Section id="system" n="02" title="The system">
            <p>
              The lab started with interviews. Six domain experts from Olympic-level athletics,
              clinical psychology and health coaching, plus six people who just plan their own days.
              The question was what each PETTLEP dimension turns into when the performer is a
              person with a laptop instead of an athlete with a coach.
            </p>
            <p>
              The body dimension becomes last night&apos;s sleep data. The setting becomes
              whatever small cues signal that it&apos;s time to work. The task is the two or three
              priorities ranked that morning. Emotion was the hard one. It ended up meaning what
              the person actually cares about, and how acting on it would feel.
            </p>
            <p>
              Five design guidelines came out of that, and the architecture maps onto them one to
              one.
            </p>

            <SpecTable
              head={['Agent', 'Question it answers', 'Evidence it draws on']}
              rows={[
                {
                  cells: [
                    'State',
                    'Where am I starting from?',
                    'Fitbit sleep and activity history, a short morning check-in, and the focus cues set during onboarding',
                  ],
                },
                {
                  cells: [
                    'Goal',
                    'What am I going to do?',
                    'Longer-term goals, today\u2019s ranked priorities and rough time estimates, and a record of how past plans went',
                  ],
                },
                {
                  cells: [
                    'Value',
                    'Why does it matter?',
                    'A values questionnaire, the user\u2019s own writing about what each value means to them, and a best-possible-self exercise',
                  ],
                },
                {
                  cells: [
                    'Reflection',
                    'What should change tomorrow?',
                    'An evening review of the same three dimensions, fed back into the other agents',
                  ],
                },
                {
                  cells: [
                    'Safety',
                    'Is this releasable?',
                    'Seven release checks run against each section before anything is assembled',
                  ],
                },
              ]}
            />

            <p>Two decisions there are worth defending.</p>
            <p>
              The first is keeping the three content agents separate instead of handing one model a
              very long prompt. They run on different clocks. Physical state is different every
              morning, priorities belong to one particular day, and values shift over months if
              they shift at all. Keeping them apart means a bad night of Fitbit data can&apos;t
              leak into the part of the script about why the work matters.
            </p>
            <p>
              The second is that the model doesn&apos;t get to write whatever it likes. Behind it
              sits a library of rehearsal techniques, each one reviewed by six experts who scored
              thirty candidates on effectiveness, theoretical fit and safety. Fourteen made it
              through: six for State, three for Goal, five for Value. At runtime the agent picks
              whichever one suits the moment and fills in only the blanks that technique exposes.
              Delivery gets personalized. The method underneath doesn&apos;t.
            </p>

            <Pull label="Why the Safety Agent exists">
              If a section fails a check, only that section gets regenerated. The rest of the
              rehearsal has already passed and doesn&apos;t get touched.
            </Pull>

            <p>
              The Safety Agent is the last stop before anything reaches the user. It checks each
              section separately. Do the claims trace back to real evidence? Did the technique
              survive intact? Has anything drifted into clinical territory? Does the tone still
              leave the decision with the user? Only then does it assemble the pieces and read the
              whole thing once more for coherence.
            </p>
            <p>
              Sensor data informs all of this without being allowed to decide anything.
              There&apos;s an energy estimate built from how long the user has been awake, where
              they are in their daily cycle, and how recently they got up. If the user reports
              feeling fine and the wearable disagrees, the self-report wins.
            </p>
          </Section>

          <Section id="built" n="03" title="What I built">
            <p>
              I built the iOS app. It ships through TestFlight and pairs with two things: a Fitbit
              Inspire 3 for sleep and activity, and Google Calendar for the day&apos;s schedule.
              The rehearsal is narrated audio synced to on-screen text, and it launches from the
              calendar rather than living in its own wellness tab, which was deliberate. Onboarding
              collects what rarely changes: values, focus cues, the best-possible-self writing. The
              morning check-in collects what changes daily. The evening reflection asks about the
              same three dimensions the morning rehearsal was built from.
            </p>
            <p>
              <strong>I built the baseline app too.</strong> The control arm ran on the same
              application, the same onboarding, the same Fitbit and Calendar pairing. The only
              difference was what happened to everything it collected. Baseline users got a plain
              prose summary of their day instead of the structured rehearsal, and no evening
              reflection. That equivalence is what makes the comparison worth anything. A cheaper
              baseline would have turned the deployment into a measurement of onboarding effort.
            </p>
            <p>
              On the research side I contributed to the study design and ran the experiments across
              three studies:
            </p>
            <ul>
              <li>
                <strong>Blinded ablation, N = 67.</strong> Five script conditions against five
                personas, delivered as audio, rated on helpfulness and on how well each matched its
                intended dimension.
              </li>
              <li>
                <strong>Lab usability study, N = 20.</strong> Ninety minutes per participant, each
                one using both the full system and the baseline in a randomized order.
              </li>
              <li>
                <strong>Four-week deployment, N = 18.</strong> Randomized between subjects, run on
                participants&apos; own goals and calendars with a paired Fitbit. Three weeks of
                required use, then a fourth with no minimum.
              </li>
            </ul>
            <p>
              The deployment is where I learned the most about instrumentation. Four sources ran at
              once: interaction logs from the app, weekly questionnaires, passive Fitbit data, and
              exit interviews.{' '}
              <strong>
                Making those four reconcilable afterwards was a build decision, not an analysis
                decision.
              </strong>{' '}
              Logging had to line up with survey weeks. The optional fourth week only produced a
              usable behavioral signal because the app kept recording when nobody was asking
              participants to do anything.
            </p>

            <Caveat label="On results">
              The paper is under review at CHI 2027 and isn&apos;t on arXiv, so findings stay off
              this page until there&apos;s a decision. What&apos;s here is the system and the study
              design. I&apos;m third author on a lab project, so none of it is mine alone. A fuller
              write-up goes up once the paper is public.
            </Caveat>
          </Section>

          <NextPrev
            prev={{ label: 'Bank of America', href: '/experience/bofa' }}
            next={{ label: 'Sift', href: '/projects/sift' }}
          />
        </article>

        <Footer />
      </main>
    </>
  )
}
