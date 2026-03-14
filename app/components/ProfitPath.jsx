'use client'

import { useFadeUp } from '@/hooks/useFadeUp'
import styles from '@/styles/ProfitPath.module.css'

const cards = [
  { num: '01', icon: '🛒', title: 'Cart Optimization',  desc: 'Dynamic triggers that capture $4–$12 in extra AOV before checkout.' },
  { num: '02', icon: '🛡️', title: 'Checkout Defense',   desc: 'Neutralizing the 4 emotional friction points behind 70% of abandonment.' },
  { num: '03', icon: '🎯', title: 'Thank You Page',      desc: 'Custom, high-margin upsell flows built on your best-selling SKUs.' },
  { num: '04', icon: '💎', title: 'Incremental Layer',   desc: 'Instant, zero-COGS profit via brand-safe thank-you page offers.' },
  { num: '05', icon: '🔬', title: 'Continuous Testing',  desc: 'Relentless A/B testing that compounds marginal gains into serious ROI.' },
]

export default function ProfitPath() {
  const ref = useFadeUp()

  return (
    <section id="path" className={styles.section} ref={ref}>
      <div className="sectionInner">
        <span className="sectionTag fadeUp">Our Service</span>
        <h2 className="sectionTitle fadeUp">
          The BrandsBro 5-Part<br />Profit Path
        </h2>
        <p className="sectionDesc fadeUp">
          We don't just give you the roadmap — we drive the car. Our service manages all of this for you.
        </p>

        <div className={styles.cards}>
          {cards.map((c) => (
            <div key={c.num} className={`${styles.card} fadeUp`}>
              <div className={styles.num}>{c.num}</div>
              <div className={styles.icon}>{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
