import { Rail } from '@/components/Rail'
import { Footer } from '@/components/Footer'
import { Stub } from '@/components/CaseStudy/Stub'

export const metadata = { title: 'SWISH' }

export default function Page() {
  return (
    <>
      <Rail back />
      <main className="body">
        <Stub
          eyebrow="Project 06 · Computer vision · Fall 2025"
          title="Predicting a free throw from the body, before the ball lands."
          status="Complete · COMS4731, Columbia"
          facts={[
            { label: 'Role', value: 'TODO — your part' },
            { label: 'Team', value: 'Three, COMS4731' },
            { label: 'Stack', value: 'YOLOv8-pose, SAM3D Body, PyTorch' },
            { label: 'Model', value: 'KeyJointNet, 72K params' },
          ]}
          prev={{ label: 'dart-rag', href: '/work/dart-rag' }}
          next={{ label: 'Sift', href: '/work/sift' }}
        >
          <p>SWISH predicts whether a basketball free throw goes in, using only the shooter’s 3D skeleton at the moment of release. YOLOv8-pose finds the release frame, SAM3D Body extracts a 70-joint 3D pose, and a small attention-plus-temporal-CNN classifier reads four frames of joint positions with velocity and acceleration.</p>
          <p>The headline number is 91.95% accuracy at 0.97 AUC. The more interesting result is asymmetric: below 0.40 predicted probability the model called 88 of 88 misses correctly, while high-confidence makes ran at 87.9% across 33 samples. Bad form is legible in the pose. Good form is necessary but not sufficient — roughly what a shooting coach would tell you.</p>
          <p style={{ color: 'var(--ink2)' }}>[TODO: one paragraph on which parts were yours. This was a three-person course project and the repo lives under a teammate’s account; say plainly what you owned.]</p>
          <p style={{ color: 'var(--ink2)' }}>[TODO: the honest caveat — 174 samples, five-fold cross-validation. State the denominator the way you do everywhere else on this site.]</p>
        </Stub>
        <Footer />
      </main>
    </>
  )
}
