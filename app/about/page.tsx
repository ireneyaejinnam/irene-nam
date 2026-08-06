import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'

export const metadata = { title: 'About' }

const Todo = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--ink2)' }}>[{children}]</span>
)

export default function About() {
  return (
    <>
      <Rail />
      <main className="body">
        <div className="aboutwrap">
          <div className="aboutbody">
            <span className="lbl" style={{ display: 'block', marginBottom: 26 }}>
              About
            </span>
            <h1>
              I translate between people who don't share a vocabulary, build from what I learn, 
              then figure out what happens when it meets the real world.
            </h1>

            <p className="lede" style={{ marginTop: 34 }}>
              Both halves of that sentence came from the same four years, and I learned the second
              half because I got the first half wrong.
            </p>

            <p>
              A trader told me the pricing screen was slow. The quant who owned the model agreed it
              was slow. So did the engineer who ran the service. Three people, one word, total
              agreement — and for most of a week we worked on three different problems. To the
              trader, slow meant the gap between wanting a price and having one, most of which was
              happening in his hands, not the system. To the quant it meant how often the model
              recalibrated. To the engineer it meant p99 latency on a service that was, by his
              numbers, comfortably fast. Nobody was wrong. Nobody was describing the same thing.
            </p>

            <p>
              What fixed it wasn’t technical. It was getting the three of them to define the word in
              one room, and then <strong>measuring the thing they actually meant</strong> instead of
              the thing each had assumed the others meant. I’ve done some version of that every year
              since.
            </p>

            <div className="brk" />

            <p>
              I spent four years as a product manager on FICC electronic trading at Bank of America,
              mostly on external vendor integrations and real-time data pipelines. Vendor work is the
              part I’d point at now: someone else’s system, someone else’s roadmap, your users’
              deadline, and no authority over any of it. You get very good at finding the one
              question whose answer determines everything downstream, and at asking it before anyone
              has committed to a design.
            </p>

            <p>
              It’s also where I stopped trusting stated requirements as a description of what people
              do. A desk that can’t opt out of your software will tell you immediately and
              unsentimentally when you’ve misread them.{' '}
              <Todo>
                Your turn: one or two sentences on why you left for the master’s — what you wanted to
                be able to build rather than specify.
              </Todo>
            </p>

            <div className="brk" />

            <p>
              At Columbia I’ve been building the things I used to write specs for, and running into
              the same problem from the other side. On <strong>Sift</strong>, the event app I
              co-built and shipped, we put a taste questionnaire in front of every new user because a
              recommender with no signal can’t rank. Not one person finished it. Sixty percent of
              active users reached full personalization anyway, from swipes alone. We had assumed
              users needed to be asked. They’d been answering the whole time, and the only reason I
              could see it was that we’d instrumented both paths.
            </p>

            <p>
              On <strong>Conviction</strong>, a retrieval system over SEC filings, I made the same
              mistake against a machine instead of a person. I built year-over-year risk-factor
              diffing on top of retrieval, because retrieval was the system I had. But top-k returns
              the passages most <em>similar</em> between two documents — which are precisely the ones
              that didn’t change. I was sampling boilerplate and diffing it. The feature only worked
              once I was willing to route around the thing I’d just finished building.
            </p>

            <p>
              I’m also a research assistant at Columbia’s SEA Lab, working on a multi-agent system
              for mental rehearsal under Professor Xuhai Xu, with a paper under submission to CHI
              2027.
            </p>

            <div className="brk" />

            <p>
              <Todo>
                Your turn: one short paragraph that isn’t about work. Not a hobbies list — one
                specific thing you actually care about, in the voice you’d use out loud. This is the
                paragraph people remember.
              </Todo>
            </p>

            <div className="now">
              <span className="lbl" style={{ display: 'block', marginBottom: 20 }}>
                Currently
              </span>
              <div className="nowlist">
                <div>
                  <em>Building</em>
                  <p>Conviction, and an MCP host called Scout that runs my own job search.</p>
                </div>
                <div>
                  <em>Researching</em>
                  <p>Multi-agent mental rehearsal at Columbia’s SEA Lab. Under submission to CHI 2027.</p>
                </div>
                <div>
                  <em>Reading</em>
                  <p><Todo>Two or three things. Update when it stops being true, or delete this row.</Todo></p>
                </div>
                <div>
                  <em>Looking for</em>
                  <p>Full-time product and applied AI roles starting December 2026.</p>
                </div>
              </div>
            </div>
          </div>

          <aside>
            <img
              className="port port-dark"
              src="/portrait/160.png"
              alt="Illustrated portrait of Irene Nam"
              width={200}
              height={228}
            />
            <img
              className="port port-light"
              src="/portrait/160light.png"
              alt="Illustrated portrait of Irene Nam"
              width={200}
              height={228}
            />
            <div className="sidemeta">
              <div><em>Based</em><span>New York</span></div>
              <div><em>Studying</em><span>MS Computer Science, Columbia</span></div>
              <div><em>Previously</em><span>Bank of America, FICC e-trading</span></div>
              <div><em>Licences</em><span>Series 7, Series 63</span></div>
              <div><em>Languages</em><span>English, Korean</span></div>
              <div><em>Available</em><span>December 2026</span></div>
            </div>
            <div className="cta" style={{ marginTop: 26 }}>
              <a className="btn" href="mailto:you@example.com" style={{ width: '100%', justifyContent: 'center' }}>
                Email me <i>↗</i>
              </a>
            </div>
          </aside>
        </div>

        <div style={{ marginTop: 100 }}>
          <Footer />
        </div>
      </main>
    </>
  )
}
