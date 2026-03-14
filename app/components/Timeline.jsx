'use client'

import { useFadeUp } from '@/hooks/useFadeUp'
import styles from '@/styles/Timeline.module.css'

const phases = [
  {
    badge: 'Week 1',
    title: 'Quick Wins',
    items: [
      'Activate BrandsBro post-purchase system',
      'Add rewards bar to your cart',
      'Inject trust badges into checkout',
    ],
  },
  {
    badge: 'Week 2–3',
    title: 'Cart Optimization',
    items: [
      'Implement AI-powered product recommendations',
      'Add social proof and review scores',
      'Set up tiered rewards gamification',
    ],
  },
  {
    badge: 'Week 3–4',
    title: 'Yes Ladder Foundation',
    items: [
      'Identify top 5 high-margin SKUs',
      'Build your first one-click upsell',
      'Set up new vs. returning segments',
    ],
  },
  {
    badge: 'Ongoing',
    title: 'Test & Optimize',
    items: [
      'Run A/B tests on offer sequencing',
      'Expand segmentation rules',
      'Monitor performance weekly',
    ],
  },
]

export default function Timeline() {
  const ref = useFadeUp()

  return (
    <section id="timeline" className={styles.section} ref={ref}>
      <div className="sectionInner">
        <span className="sectionTag fadeUp">Page 9 — Roadmap</span>
        <h2 className="sectionTitle fadeUp">
          How To Get Started:<br />Your 4-Week Roadmap
        </h2>
        <p className="sectionDesc fadeUp">
          Growth doesn't happen by accident. It's built through strategy. We don't
          just give you a tool — we manage your entire journey to higher profits.
        </p>

        <div className={styles.phases}>
          {phases.map((phase, i) => (
            <div key={i} className={`${styles.phase} fadeUp`}>
              <div className={styles.dot} />
              <div className={styles.badge}>{phase.badge}</div>
              <h3>{phase.title}</h3>
              <ul>
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
