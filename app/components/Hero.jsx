'use client'

import { useEffect, useRef } from 'react'
import styles from '@/styles/Hero.module.css'

function AnimatedStat({ prefix = '', target, suffix = '', label }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start = null
    const duration = 1800
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const val = Math.floor(progress * target)
      el.querySelector('strong').textContent = prefix + val.toLocaleString() + suffix
      if (progress < 1) requestAnimationFrame(step)
    }
    const timer = setTimeout(() => requestAnimationFrame(step), 600)
    return () => clearTimeout(timer)
  }, [target, prefix, suffix])

  return (
    <div className={styles.statCard} ref={ref}>
      <div className={styles.statNumber}>
        <strong>{prefix}0{suffix}</strong>
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroGrid} />

      <div className={styles.content}>
        {/* ── Left ── */}
        <div className={styles.text}>
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            Powered by BrandsBro
          </div>

          <h1 className={styles.title}>
            The <em>6-Figure</em><br />Profit Engine
          </h1>

          <p className={styles.sub}>
            Turn your existing checkout into a high-yield revenue machine.
            The data-backed blueprint to scaling AOV — without spending a
            cent more on ads.
          </p>

          <div className={styles.ctaGroup}>
            <a href="#cta" className="btnPrimary">Unlock My Profit Strategy</a>
            <a href="#problem" className="btnOutline">See How It Works</a>
          </div>
        </div>

        {/* ── Right: stats ── */}
        <div className={styles.stats}>
          <AnimatedStat prefix="$" target={150} suffix="M+" label="Revenue generated for partners" />
          <AnimatedStat target={350} suffix="+" label="Brands scaled worldwide" />
          <AnimatedStat target={250} suffix="% ↑" label="Sales explosion — Tigrett Outdoors, 1 month" />
        </div>
      </div>
    </section>
  )
}
