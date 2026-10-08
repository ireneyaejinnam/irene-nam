import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'

export const metadata = { title: 'About' }

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
              I translate between people who don&apos;t share a vocabulary, build from what I learn,
              then figure out what happens when it meets the real world.
            </h1>

            <p className="lede" style={{ marginTop: 34 }}>
              Both halves of that came out of the same four years. I learned the second half because
              I got the first half wrong.
            </p>

            <p>
              A trader told me the pricing screen was slow. The quant who owned the model agreed it
              was slow. So did the engineer who ran the service. Three people, one word, total
              agreement. For most of a week we worked on three different problems. To the trader,
              slow meant the gap between wanting a price and having one, and most of that gap was
              happening in his hands rather than in the system. The quant meant how often the model
              recalibrated. For the engineer it was p99 latency on a service his numbers said was
              comfortably fast. Nobody was wrong. Nobody was describing the same thing.
            </p>

            <p>
              Getting the three of them in a room to agree on the word was the whole fix. After that
              we could <strong>measure the thing they actually meant</strong> rather than the thing
              each had assumed the others meant. I&apos;ve done some version of that every year
              since.
            </p>

            <div className="brk" />

            <p>
              I spent four years as a product manager on FICC electronic trading at Bank of America,
              mostly on external vendor integrations and real-time data pipelines. Vendor work is the
              part I&apos;d point at now: someone else&apos;s system, someone else&apos;s roadmap,
              your users&apos; deadline, and no authority over any of it. You learn to find the one
              question whose answer determines everything downstream, and to ask it before anyone has
              committed to a design.
            </p>

            <p>
              It&apos;s also where I stopped trusting stated requirements as a description of what
              people do. A desk that can&apos;t opt out of your software tells you the same day when
              you&apos;ve misread them, and they aren&apos;t gentle about it.
            </p>

            <div className="brk" />

            <p>
              At Columbia I&apos;ve been building the things I used to write specs for, and running
              into the same problem from the other side. On <strong>Sift</strong>, the event app I
              co-built and shipped, we put a taste questionnaire in front of every new user because a
              recommender with no signal can&apos;t rank. Not one person finished it. Sixty percent
              of active users reached full personalization anyway, from swipes alone. We had assumed
              users needed to be asked. They had been answering the whole time, and I could only see
              it because we had instrumented both paths.
            </p>

            <p>
              On <strong>Conviction</strong>, a retrieval system over SEC filings, I made the same
              mistake against a machine instead of a person. I built year-over-year risk-factor
              diffing on top of retrieval, because retrieval was the system I had. But top-k returns
              the passages most <em>similar</em> between two documents, which are exactly the ones
              that didn&apos;t change. I was sampling boilerplate and diffing it. The feature only
              worked once I was willing to route around the thing I had just finished building.
            </p>

            <p>
              I&apos;m also a research assistant at Columbia&apos;s SEA Lab, working on a multi-agent
              system for mental rehearsal under Professor Xuhai Xu, with a paper under submission to
              CHI 2027.
            </p>

            <div className="now">
              <span className="lbl" style={{ display: 'block', marginBottom: 20 }}>
                Currently
              </span>
              <div className="nowlist">
                <div>
                  <em>Building</em>
                  <p>Conviction, a retrieval system for SEC filings.</p>
                </div>
                <div>
                  <em>Researching</em>
                  <p>Multi-agent mental rehearsal at Columbia&apos;s SEA Lab. Under submission to CHI 2027.</p>
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
              <a className="btn" href="mailto:irene.nam@columbia.edu" style={{ width: '100%', justifyContent: 'center' }}>
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