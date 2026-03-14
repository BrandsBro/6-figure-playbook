'use client'

import { useFadeUp } from '@/hooks/useFadeUp'
import styles from '@/styles/Testing.module.css'

const tests = [
  { icon: '🔢', title: 'Offer Sequence',  desc: 'We find the perfect product order to double your revenue.' },
  { icon: '💲', title: 'Price Framing',   desc: 'We test "$1 a day" against "20% off" for higher uptake.' },
  { icon: '🔗', title: 'Product Synergy', desc: 'We pair your best sellers with perfect high-margin add-ons.' },
  { icon: '✍️', title: 'Copy Hooks',      desc: 'We test "Save Time" against "Feel Better" to spark emotions.' },
  { icon: '🖥️', title: 'UI Layout',       desc: 'We compare full overlays against embedded boxes for max attention.' },
]

const protocol = [
  { num: '01', title: 'Isolate Variables',  desc: 'We test one change at a time — the only way to ensure clean, reliable data.' },
  { num: '02', title: 'Statistical Power',  desc: 'We never guess. We wait for 2,000 visitors to ensure your growth is real and sustainable.' },
  { num: '03', title: 'Profit Metrics',     desc: 'We ignore vanity numbers. Our team focuses entirely on increasing your Profit Per Visitor.' },
  { num: '04', title: 'Growth Blueprints',  desc: 'We document every win — building a custom roadmap to scale your brand to the next level.' },
]

export default function Testing() {
  const ref = useFadeUp()

  return (
    <section id="testing" className={styles.section} ref={ref}>
      <div className="sectionInner">
        <span className="sectionTag fadeUp">Page 8 — Testing</span>
        <h2 className="sectionTitle fadeUp">
          Data-Driven Dominance:<br />How We Compound Your Profits
        </h2>
        <p className="sectionDesc fadeUp">
          Testing turns small gains into massive ROI. We don't just launch — we optimize.
          Our team manages the entire process so you don't have to.
        </p>

        {/* ── What we test ── */}
        <div className={styles.testsGrid}>
          {tests.map((t) => (
            <div key={t.title} className={`${styles.testCard} fadeUp`}>
              <div className={styles.testIcon}>{t.icon}</div>
              <h4>{t.title}</h4>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Protocol ── */}
        <h3 className={`${styles.protocolHeading} fadeUp`}>The BrandsBro Protocol</h3>
        <div className={styles.protocolGrid}>
          {protocol.map((p) => (
            <div key={p.num} className={`${styles.protocolCard} fadeUp`}>
              <div className={styles.protocolNum}>{p.num}</div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
