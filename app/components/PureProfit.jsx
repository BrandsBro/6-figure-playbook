'use client'

import { useFadeUp } from '@/hooks/useFadeUp'
import styles from '@/styles/PureProfit.module.css'

const zeros = [
  { icon: '📦', title: 'Zero COGS',        desc: "You aren't selling your own inventory" },
  { icon: '🚚', title: 'Zero Fulfillment', desc: "You don't ship anything" },
  { icon: '📞', title: 'Zero Support',     desc: "You don't handle customer service" },
  { icon: '⚠️', title: 'Zero Risk',        desc: 'Offers appear only after payment' },
]

const results = [
  { brand: 'Mirxen',    amount: '$10K/mo', detail: 'Monthly pure profit, zero retention impact' },
  { brand: 'Srijax',    amount: '$130K',   detail: 'Pure profit in just 3 months' },
  { brand: 'Drivesight', amount: '$628K',  detail: 'Incremental profit from this single strategy' },
]

export default function PureProfit() {
  const ref = useFadeUp()

  return (
    <section id="pure-profit" className={styles.section} ref={ref}>
      <div className="sectionInner">
        <span className="sectionTag fadeUp">Page 7 — Pure Profit Layer</span>
        <h2 className="sectionTitle fadeUp">
          Monetizing the<br />"Thank You" Page
        </h2>

        <div className={styles.grid}>
          {/* ── Left ── */}
          <div>
            <p className="sectionDesc fadeUp">
              We place vetted, brand-safe offers from premium partners (Disney+,
              HelloFresh, Nike) on your order confirmation page. You earn a
              commission on every order — usually $0.30–$0.50 in pure profit.
            </p>

            <div className={styles.zeroGrid}>
              {zeros.map((z) => (
                <div key={z.title} className={`${styles.zeroCard} fadeUp`}>
                  <div className={styles.zeroIcon}>{z.icon}</div>
                  <h4>{z.title}</h4>
                  <p>{z.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right ── */}
          <div className={`${styles.resultsBox} fadeUp`}>
            <h3 className={styles.resultsTitle}>Real Results with BrandsBro</h3>

            {results.map((r) => (
              <div key={r.brand} className={styles.resultRow}>
                <div>
                  <div className={styles.brand}>{r.brand}</div>
                  <div className={styles.detail}>{r.detail}</div>
                </div>
                <div className={styles.amount}>{r.amount}</div>
              </div>
            ))}

            <div className={styles.perOrder}>
              <div className={styles.perOrderLabel}>Pure profit per order</div>
              <div className={styles.perOrderValue}>$0.30–$0.50</div>
              <div className={styles.perOrderSub}>AI trained on 200M transactions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
