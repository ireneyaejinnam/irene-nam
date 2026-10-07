import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'
import { Header, Section, Pull, Caveat, SpecTable, NextPrev } from '@/components/CaseStudy'

export const metadata = {
  title: 'SWISH',
  description: 'Predicting a free throw from the shooter’s pose, and auditing the number afterwards.',
}

const TOC = [
  { id: 'built', label: 'What we built' },
  { id: 'number', label: 'The number' },
]

export default function Swish() {
  return (
    <>
      <Rail
        toc={TOC}
        back={{ label: 'All work', href: '/projects' }}
        links={[
          { label: 'GitHub', href: 'https://github.com/Dexin-Huang/SWISH' },
          { label: 'Paper', href: 'https://github.com/Dexin-Huang/SWISH/blob/main/Computer_Vision_Final_Project_Report.pdf' },
        ]}
      />

      <main className="body">
        <Header
          eyebrow="Project 06 · Computer vision · Fall 2025"
          title="The headline number was 91.95%. The one I'd defend is 82.8%."
          dek="SWISH predicts whether a basketball free throw goes in, using only the shooter's 3D skeleton at the moment of release, before the ball is visible in flight. It works. It works less well than our abstract says, and the gap between those two numbers is the part worth writing down."
          cta={[
            { label: 'Source on GitHub', href: 'https://github.com/Dexin-Huang/SWISH' },
            { label: 'Read the paper', href: 'https://github.com/Dexin-Huang/SWISH/blob/main/Computer_Vision_Final_Project_Report.pdf', ghost: true },
          ]}
          facts={[
            { label: 'My role', value: 'Release detection, data pipeline, models, demo' },
            { label: 'Team', value: 'Three, COMS 4731' },
            { label: 'Stack', value: 'YOLOv8-pose, SAM3D Body, PyTorch' },
            { label: 'Model', value: 'KeyJointNet, 72K params' },
          ]}
          evidence={[
            { value: '82.8%', label: 'five-fold CV, ±5.6' },
            { value: '75.9%', label: 'majority-class baseline' },
            { value: '0.84 vs 0.58', label: 'AUC, pose vs trajectory' },
          ]}
        />

        <article>
          <Section id="built" n="01" title="What we built">
            <p>
              Free throws are the most standardized shot in basketball and they go in about 75% of
              the time. The question was whether the body tells you anything the ball hasn&apos;t
              yet. Prediction has to happen at the release frame. Once the ball is in flight the
              problem is physics and everyone can see it.
            </p>
            <p>
              The pipeline runs in four stages. YOLOv8-pose finds the release frame by watching for
              an arm angle between 100 and 145 degrees with an elevated wrist. SAM3D Body extracts a
              70-joint 3D skeleton from that frame and the three around it. Velocity and acceleration
              across the four frames give a tensor of nine channels by four frames by seventy joints.
              A small attention-plus-temporal-CNN called KeyJointNet reads fifteen upper-body joints
              and predicts make or miss.
            </p>
            <p>
              <strong>
                I owned the release detector, the data pipeline, the model architectures and the
                demo.
              </strong>{' '}
              That meant the YOLOv8 detection heuristics and their confidence scoring, the annotation
              tool we used to review candidate frames, the curation and feature engineering that
              produced the training set, the architecture comparison across KeyJointNet, ST-GCN and
              the two baselines, the trajectory-only models, and the Streamlit app that runs the
              whole thing on an uploaded clip.
            </p>
            <p>
              Getting usable data was most of the work. We started with 2,352 candidate clips across
              two sources and finished with 174. Broadcast footage is a bad input for pose
              estimation: the shooter is often occluded, the camera angle moves, and the ball is
              frequently invisible at the moment it matters.
            </p>

            <SpecTable
              head={['Stage', 'Candidates', 'Survived']}
              rows={[
                { cells: ['Basketball-51, after manual validation', '1,332', '139'], numeric: 2 },
                { cells: ['Basketball-51, after pose extraction QC', '139', '102'], numeric: 2 },
                { cells: ['NBA Play DB, after auto-detection', '1,020', '985'], numeric: 2 },
                { cells: ['NBA Play DB, after confidence filter', '985', '340'], numeric: 2 },
                { cells: ['Merged training set', '—', '174'], numeric: 2 },
              ]}
            />

            <p>
              The result that holds up best has nothing to do with the headline. I trained
              trajectory-only models on the full 1,020-sample set using ball tracking and physics
              features. Random Forest got 75.0%. XGBoost got 75.0%. Always predicting
              &ldquo;make&rdquo; gets 75.3%.{' '}
              <strong>
                Early ball trajectory provided no edge at all over guessing, with three times the
                training data.
              </strong>{' '}
              Pose reached an AUC of 0.84 against trajectory&apos;s 0.58. The body really does say
              something the ball hasn&apos;t yet.
            </p>
          </Section>

          <Section id="number" n="02" title="The number">
            <p>
              Our abstract leads with 91.95% accuracy at 0.97 AUC. Table 2 of the same paper reports
              the same model at 82.8% ±5.6% under five-fold cross-validation. Both numbers are in the
              submission. Only one of them estimates how the model would do on a shot it
              hasn&apos;t seen.
            </p>

            <Pull label="What went wrong">
              The decision threshold and the probability calibration were both fit on the data they
              were then scored against. The confusion matrix sums to 174, which is the entire
              dataset.
            </Pull>

            <p>
              Three things inflate the headline, in descending order of how much they bother me.
            </p>
            <ul>
              <li>
                <strong>The threshold was tuned in-sample.</strong> Moving the decision boundary from
                0.50 to 0.64 bought five points of accuracy, chosen by looking at the same 174
                samples it was evaluated on. Platt scaling has the same problem.
              </li>
              <li>
                <strong>The baseline is higher than it looks.</strong> The merged set is 132 misses
                to 42 makes, so always predicting &ldquo;miss&rdquo; scores 75.9%. The honest 82.8%
                sits about one standard deviation above that. The class balance is also inverted from
                real basketball, where roughly 75% go in.
              </li>
              <li>
                <strong>I merged in 72 samples from a second source, all of them misses.</strong> If
                those clips differ systematically in camera angle or pose-extraction quality, then
                &ldquo;which dataset is this&rdquo; becomes a usable proxy for &ldquo;miss&rdquo;
                across more than half the miss class. It improved our numbers, we wrote it up as a
                win, and I never tested for the confound.
              </li>
            </ul>
            <p>
              That last one matters most for the finding we were proudest of. The model called 88 of
              88 high-confidence misses correctly and only 87.9% of 33 high-confidence makes, and we
              wrote that up as a biomechanical result: bad form is distinctive, good form is
              necessary but not sufficient. It might be. A shooting coach would tell you the same
              thing. But a source confound produces exactly that pattern, and the experiment that
              separates the two is one I designed the dataset for and didn&apos;t run.
            </p>

            <Caveat label="What I&apos;d do differently">
              Hold out a source. Train on the curated 102 and test on the MHR70 samples, or report
              the 108-sample clean subset on its own. Tune the threshold inside each CV fold rather
              than on the full set. Split folds by shooter instead of by class, since NBA broadcast
              clips repeat players and stratified CV doesn&apos;t care. None of that is hard. We ran
              out of semester, which is a reason and not an excuse.
            </Caveat>

            <p>
              The paper also frames the asymmetry as a betting edge, with an expected value
              calculation and a claimed 110% ROI. I&apos;d cut that. It rests entirely on the
              in-sample threshold, and a result that fragile shouldn&apos;t be dressed as a strategy.
            </p>
          </Section>

          <NextPrev
            prev={{ label: 'dart-rag', href: '/projects/dart-rag' }}
            next={{ label: 'Sift', href: '/projects/sift' }}
          />
        </article>

        <Footer />
      </main>
    </>
  )
}