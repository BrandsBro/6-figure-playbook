'use client'

import { useFadeUp } from '@/hooks/useFadeUp'
import styles from '@/styles/YesLadder.module.css'

const steps = [
  { title: 'Start with Your Winners',       desc: 'We pull your top 5 best-sellers from the last 90 days — high margins (60%+) and high repeat purchase rates.' },
  { title: 'Protect Your Bottom Line',      desc: 'Strict rule: No offers under 50% net margin. Revenue is vanity; profit is sanity.' },
  { title: 'Reframe the Value',             desc: '$30 sounds like a lot. $1/day sounds like nothing. We test hooks like "Complete your routine for less than a coffee."' },
  { title: 'Mirror the Front-End Hook',     desc: 'Keep the "Buyer\'s High" alive. If your ad sells confidence, your upsell sells more confidence.' },
  { title: 'Seamless Full-Overlay Design',  desc: 'Data shows full-overlay placements generate 2× the profit of embedded boxes.' },
  { title: 'High-IQ Segmentation',          desc: 'New vs. returning, single-SKU vs. bundlers, one-time vs. subscribers — custom paths for every buyer type.' },
]

export default function YesLadder() {
  const ref = useFadeUp()

  return (
    <section id="yes-ladder" className={styles.section} ref={ref}>
      <div className="sectionInner">
        <span className="sectionTag fadeUp">Page 6 — Upsells</span>
        <h2 className="sectionTitle fadeUp">
          The Profit Escalator:<br />Scaling AOV with "The Yes Ladder"
        </h2>
        <p className="sectionDesc fadeUp">
          Traditional upselling is broken. We build a "Yes Ladder" — each offer builds on the last.
          Every "Yes" makes the next one easier.
        </p>

        <div className={styles.layout}>
          {/* ── Steps ── */}
          <ol className={styles.stepList}>
            {steps.map((s, i) => (
              <li key={i} className={`${styles.stepItem} fadeUp`}>
                <div className={styles.stepNum}>{i + 1}</div>
                <div className={styles.stepContent}>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* ── Flow diagram ── */}
          <div className={`${styles.flowDiagram} fadeUp`}>
            <h3 className={styles.flowTitle}>The BrandsBro Momentum Flow</h3>

            <div className={styles.flowBox} data-highlight="true">
              <h4>⚡ Step 1: Peak Intent</h4>
              <p>Customer completes checkout</p>
            </div>
            <div className={styles.arrow}>↓</div>

            <div className={styles.flowBox}>
              <h4>🎯 Step 2: The Logical Upsell</h4>
              <p>We offer a high-margin winner based on their cart</p>
            </div>
            <div className={styles.arrow}>↓</div>

            <div className={styles.flowBox}>
              <h4>🔀 Step 3: The Split Path</h4>
              <p>Customer decides</p>
            </div>

            <div className={styles.splitRow}>
              <div className={`${styles.splitBox} ${styles.yes}`}>
                <span>✅ Yes</span>
                Higher-tier bundle offer
              </div>
              <div className={`${styles.splitBox} ${styles.no}`}>
                <span>↩ No</span>
                Irresistible downsell
              </div>
            </div>
            <div className={styles.arrow}>↓</div>

            <div className={styles.flowBox} data-highlight="true">
              <h4>🎉 Step 4: Thank You Page</h4>
              <p>Customer arrives happy with higher order value and zero friction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
