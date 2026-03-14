'use client'

import { useFadeUp } from '@/hooks/useFadeUp'
import styles from '@/styles/CTA.module.css'

export default function CTA() {
  const ref = useFadeUp()

  return (
    <section id="cta" className={styles.section} ref={ref}>
      <div className={styles.bg} />

      <div className={styles.inner}>
        <span className="sectionTag fadeUp" style={{ textAlign: 'center', display: 'block' }}>
          Page 11 — Take Action
        </span>
        <h2 className={`sectionTitle fadeUp ${styles.centeredTitle}`}>
          Unlock the Hidden Revenue<br />Inside Your Post-Purchase Funnel
        </h2>
        <p className={`sectionDesc fadeUp ${styles.centeredDesc}`}>
          Ready to scale alongside 350+ of the world's fastest growing brands?
          Book your growth strategy call with the BrandsBro experts today.
        </p>

        <div className={`${styles.box} fadeUp`}>
          <h3>Book Your Free Strategy Call</h3>
          <p>
            We'll map out how to optimize your Shopify post-purchase upsell funnel
            and skyrocket your revenue — no fluff, just a concrete profit plan.
          </p>
          <a href="#" className={styles.ctaBtn}>
            Unlock My Profit Strategy →
          </a>
          <div className={styles.trust}>
            Trusted by <strong>350+ brands</strong> who've collectively generated{' '}
            <strong>$150M+</strong> in revenue
          </div>
        </div>
      </div>
    </section>
  )
}
