'use client'

import { useState, useEffect, useRef } from 'react'
import { useFadeUp } from '@/hooks/useFadeUp'
import styles from '@/styles/CartSection.module.css'

function TierBar({ label, reward, targetWidth, delay }) {
  const [width, setWidth] = useState('0%')
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(targetWidth), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [targetWidth, delay])

  return (
    <div className={styles.tierBar} ref={ref}>
      <div className={styles.tierProgress} style={{ width, transition: 'width 1.4s cubic-bezier(0.4,0,0.2,1)' }} />
      <div className={styles.tierInfo}>
        <span className={styles.tierName}>{label}</span>
        <span className={styles.tierReward}>{reward}</span>
      </div>
    </div>
  )
}

export default function CartSection() {
  const ref = useFadeUp()
  const [orders, setOrders] = useState(5000)
  const aov     = 7
  const monthly = orders * aov
  const yearly  = monthly * 12

  const fmt = (n) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`

  return (
    <section id="cart" className={styles.section} ref={ref}>
      <div className="sectionInner">
        <span className="sectionTag fadeUp">Page 4 — Cart</span>
        <h2 className="sectionTitle fadeUp">
          Cart Optimization:<br />Maximizing AOV Before Checkout
        </h2>

        <div className={styles.layout}>
          {/* ── Left: tier bars ── */}
          <div>
            <p className="sectionDesc fadeUp">
              Most brands treat the cart as a static container. BrandsBro turns it into an active profit engine with gamified motivator bars.
            </p>

            <div className={`${styles.tiersWrap} fadeUp`}>
              <p className={styles.tiersLabel}>Motivator Bar — Tiered Rewards</p>
              <TierBar label="🚚 Tier 1 — Free Shipping"        reward="$0 threshold"      targetWidth="45%" delay={0} />
              <TierBar label="🎁 Tier 2 — Free Gift w/ Purchase" reward="Strategic price"   targetWidth="72%" delay={300} />
              <TierBar label="👑 Tier 3 — VIP Bundle Access"     reward="Priority processing" targetWidth="90%" delay={600} />
            </div>
          </div>

          {/* ── Right: calculator ── */}
          <div className={`${styles.calc} fadeUp`}>
            <h3 className={styles.calcTitle}>📊 AOV Revenue Calculator</h3>

            <div className={styles.calcRow}>
              <span>BrandsBro AOV Boost</span>
              <strong>+$7 / order</strong>
            </div>
            <div className={styles.calcRow}>
              <span>Monthly Extra Revenue</span>
              <strong className={styles.green}>{fmt(monthly)}</strong>
            </div>
            <div className={styles.calcRow}>
              <span>Yearly Extra Revenue</span>
              <strong className={styles.gold}>{fmt(yearly)}</strong>
            </div>

            <div className={styles.sliderWrap}>
              <label>
                Monthly Orders
                <span>{orders.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={orders}
                onChange={(e) => setOrders(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
