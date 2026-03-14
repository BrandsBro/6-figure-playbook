'use client'

import { useFadeUp } from '@/hooks/useFadeUp'
import styles from '@/styles/Summary.module.css'

const cards = [
  {
    icon: '🛒',
    title: 'Cart Optimization',
    gain: '+$4 to $12 AOV',
    desc: 'We capture extra AOV before they even leave the cart, using motivator bars and intelligent add-ons.',
  },
  {
    icon: '🛡️',
    title: 'Checkout Protection',
    gain: '70% less abandonment',
    desc: 'We secure your revenue by removing the four emotions that cause abandonment at the finish line.',
  },
  {
    icon: '🪜',
    title: 'The Yes Ladder',
    gain: '+$7.50+ per order',
    desc: 'High-margin revenue through logic and buyer momentum. Every "Yes" makes the next one easier.',
  },
  {
    icon: '💎',
    title: 'Pure Profit Layer',
    gain: '+$0.50 pure profit',
    desc: 'Zero-COGS, zero-fulfillment income activated from your very first order after going live.',
  },
]

export default function Summary() {
  const ref = useFadeUp()

  return (
    <section id="summary" className={styles.section} ref={ref}>
      <div className="sectionInner">
        <span className="sectionTag fadeUp">Page 10 — The Bottom Line</span>
        <h2 className="sectionTitle fadeUp">The Profit Breakdown</h2>
        <p className="sectionDesc fadeUp">
          All from the traffic you already have. We optimize the moments that every single buyer experiences.
        </p>

        <div className={styles.grid}>
          {cards.map((c) => (
            <div key={c.title} className={`${styles.card} fadeUp`}>
              <h3>
                <span>{c.icon}</span> {c.title}
              </h3>
              <div className={styles.gain}>{c.gain}</div>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.closing} fadeUp`}>
          <p>
            "The money is already sitting there on your site.{' '}
            <span>How much longer are you going to leave your best profit on the table?</span>"
          </p>
          <a href="#cta" className="btnPrimary">
            I'm Ready — Let's Go
          </a>
        </div>
      </div>
    </section>
  )
}
