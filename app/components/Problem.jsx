'use client'

import { useFadeUp } from '@/hooks/useFadeUp'
import styles from '@/styles/Problem.module.css'

const leaks = [
  { icon: '🛒', title: 'The Cart Page',         desc: 'Where we transform intent into immediate AOV growth.' },
  { icon: '⚡', title: 'The Checkout Flow',      desc: 'Eliminating the friction points that silently kill your ROI.' },
  { icon: '💰', title: 'The Confirmation Page',  desc: 'Capturing pure profit while wallets are still wide open.' },
]

export default function Problem() {
  const ref = useFadeUp()

  return (
    <section id="problem" className={styles.section} ref={ref}>
      <div className="sectionInner">
        <span className={`sectionTag fadeUp`}>The New Reality of DTC</span>
        <h2 className={`sectionTitle fadeUp`}>
          Why Just Getting the Click<br />Isn't Enough
        </h2>

        <div className={styles.grid}>
          {/* ── Left ── */}
          <div>
            <p className={`sectionDesc fadeUp`}>
              Every DTC operator knows the math has changed. CAC is at an all-time
              high. Ad platforms are black boxes. The old playbook of "spend more to
              make more" is broken.
            </p>

            <ul className={styles.leakList}>
              {leaks.map((item) => (
                <li key={item.title} className={`${styles.leakItem} fadeUp`}>
                  <div className={styles.leakIcon}>{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right ── */}
          <div className={`${styles.philosophyBox} fadeUp`}>
            <blockquote>
              "Revenue Per Visitor matters more than conversion rate.{' '}
              <span>Profit Per Visitor matters more than both.</span>"
            </blockquote>

            <div className={styles.metricsRow}>
              <div className={styles.chip}>
                <div className={styles.chipLabel}>Most Agencies</div>
                <div className={styles.chipValue}>CR</div>
              </div>
              <div className={`${styles.chip} ${styles.chipActive}`}>
                <div className={styles.chipLabel}>BrandsBro</div>
                <div className={styles.chipValue}>RPV</div>
              </div>
              <div className={`${styles.chip} ${styles.chipActive}`}>
                <div className={styles.chipLabel}>BrandsBro</div>
                <div className={styles.chipValue}>PPV</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
