'use client'

import { useFadeUp } from '@/hooks/useFadeUp'
import styles from '@/styles/Checkout.module.css'

const emotions = [
  {
    icon: '😕',
    name: 'Confusion',
    risk: 'Kills momentum. If the path isn\'t crystal clear, users bail.',
    solution: '"Frictionless Pathing" — clear progress indicators, one-page layouts, and autofill logic to make buying effortless.',
  },
  {
    icon: '🔒',
    name: 'Trust',
    risk: 'High for first-time buyers. Doubt leads directly to abandonment.',
    solution: '"Confidence Anchors" — total brand consistency and dynamic security badges at the point of entry.',
  },
  {
    icon: '😰',
    name: 'Anxiety',
    risk: 'Value-stress peaks right before "Complete Purchase."',
    solution: '"Value Reassurance" — real-time social proof and free shipping thresholds remove last-second buyer\'s remorse.',
  },
  {
    icon: '⏰',
    name: 'FOMO',
    risk: 'Without a reason to act now, they\'ll "think about it" and never return.',
    solution: '"Strategic Urgency" — inventory alerts and countdowns that feel like helpful info, not pushy sales.',
  },
]

const mobileFixes = [
  { title: 'Thumb-Friendly UI',           desc: 'Oversized buttons and touch-optimized form fields.' },
  { title: 'Minimal Form Fields',          desc: 'Only ask for essentials to reduce friction and drop-off.' },
  { title: 'Digital Wallet Integration',   desc: 'One-click Apple Pay, Google Pay, and Shop Pay.' },
  { title: 'Performance Engineering',      desc: 'Strip heavy scripts that slow down mobile load times.' },
]

export default function Checkout() {
  const ref = useFadeUp()

  return (
    <section id="checkout" className={styles.section} ref={ref}>
      <div className="sectionInner">
        <span className="sectionTag fadeUp">Page 5 — Checkout</span>
        <h2 className="sectionTitle fadeUp">
          Checkout Flow:<br />Protect The Conversion
        </h2>
        <p className="sectionDesc fadeUp">
          Getting a visitor to checkout is the most expensive part of your marketing.
          Losing them at the finish line isn't just a missed sale — it's a wasted investment.
        </p>

        <div className={styles.emotionsGrid}>
          {emotions.map((e) => (
            <div key={e.name} className={`${styles.emotionCard} fadeUp`}>
              <div className={styles.emotionHeader}>
                <span className={styles.emotionIcon}>{e.icon}</span>
                <span className={styles.emotionName}>{e.name}</span>
              </div>
              <div className={styles.risk}>{e.risk}</div>
              <div className={styles.solution}>
                <strong>BrandsBro Solution: </strong>{e.solution}
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.mobileStats} fadeUp`}>
          <div className={styles.bigStat}>
            <div className={styles.bigNum}>73%</div>
            <div className={styles.bigLabel}>of post-purchase conversions happen on mobile</div>
          </div>
          <ul className={styles.fixList}>
            {mobileFixes.map((f) => (
              <li key={f.title} className={styles.fixItem}>
                <span className={styles.fixDot} />
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
