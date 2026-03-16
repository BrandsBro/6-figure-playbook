'use client'

import { useEffect, useRef, useState } from 'react'
import s from './page.module.css'

/* ── Fade-up hook ── */
function useFade() {
  const ref = useRef(null)
  useEffect(() => {
    const section = ref.current
    if (!section) return

    // Fade the section itself in
    section.style.opacity = '0'
    section.style.transform = 'translateY(48px)'
    section.style.transition = 'opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)'

    const sectionObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        section.style.opacity = '1'
        section.style.transform = 'translateY(0)'
        sectionObs.disconnect()
      }
    }, { threshold: 0.08 })
    sectionObs.observe(section)

    // Also fade children with .fu class
    const els = section.querySelectorAll(`.${s.fu}`) || []
    const childObs = new IntersectionObserver(
      entries => entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add(s.vis), i * 90)
          childObs.unobserve(e.target)
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    els.forEach(el => childObs.observe(el))

    return () => { sectionObs.disconnect(); childObs.disconnect() }
  }, [])
  return ref
}

/* ══════════════════════════════════════
   NAVBAR
══════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    ['#problem',    'Problem'],
    ['#cart',       'Cart'],
    ['#checkout',   'Checkout'],
    ['#yes-ladder', 'Upsells'],
    ['#testing',    'Testing'],
  ]

  return (
    <nav className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}>
      <a href="#hero" className={s.navLogo}>Brands<span>Bro</span></a>
      <div className={s.navLinks}>
        {links.map(([href, label]) => (
          <a key={href} href={href} className={s.navLink}>{label}</a>
        ))}
        <a href="#cta" className={s.navCta}>Book a Call</a>
      </div>
    </nav>
  )
}

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
function Hero() {
  const [counts, setCounts] = useState([0, 0, 0])

  useEffect(() => {
    [150, 350, 250].forEach((target, i) => {
      let v = 0
      const id = setInterval(() => {
        v = Math.min(v + target / 60, target)
        setCounts(c => { const n = [...c]; n[i] = Math.floor(v); return n })
        if (v >= target) clearInterval(id)
      }, 30)
    })
  }, [])

  const stats = [
    { val: `$${counts[0]}M+`, label: 'Revenue generated for partners' },
    { val: `${counts[1]}+`,   label: 'Brands scaled worldwide' },
    { val: `${counts[2]}%↑`,  label: 'Sales explosion — Tigrett Outdoors' },
  ]

  return (
    <section id="hero" className={s.hero}>
      <div className={s.heroBg} />
      <div className={s.heroGrid} />
      <div className={s.heroContent}>

        <div>
          <div className={s.heroPill}>
            <span className={s.heroPillDot} />
            Powered by BrandsBro
          </div>
          <h1 className={s.heroTitle}>
            The <em>6-Figure</em><br />Profit Engine
          </h1>
          <p className={s.heroSub}>
            Turn your existing checkout into a high-yield revenue machine.
            Scale AOV without spending a cent more on ads.
          </p>
          <div className={s.heroCtas}>
            <a href="#cta"     className={s.btnGreen}>Unlock My Profit Strategy</a>
            <a href="#problem" className={s.btnOutline}>See How It Works</a>
          </div>
        </div>

        <div className={s.heroStats}>
          {stats.map((st, i) => (
            <div key={i} className={s.statCard}>
              <div className={s.statNum}>{st.val}</div>
              <div className={s.statLabel}>{st.label}</div>
            </div>
          ))}
        </div>
        </div>

    </section>
  )
}

/* ══════════════════════════════════════
   PROBLEM
══════════════════════════════════════ */
function Problem() {
  const ref = useFade()

  const leaks = [
    { icon: '🛒', title: 'The Cart Page',         desc: 'Transform intent into immediate AOV growth.' },
    { icon: '⚡', title: 'The Checkout Flow',      desc: 'Eliminate friction points killing your ROI.' },
    { icon: '💰', title: 'The Confirmation Page',  desc: 'Capture pure profit while wallets are wide open.' },
  ]

  return (
    <section id="problem" className={s.sectionAlt} ref={ref}>
      <div className={s.divider} />
      <div className={s.wrap}>
        <span className={`${s.tag} ${s.fu}`}>The New Reality of DTC</span>
        <h2 className={`${s.h2} ${s.fu}`}>Why Just Getting the Click Isn't Enough</h2>

        <div className={s.grid2}>
          <div>
            <p className={`${s.desc} ${s.fu}`} style={{ marginBottom: 28 }}>
              CAC is at an all-time high. Ad platforms are black boxes. The old "spend more to make more" playbook
              is broken. BrandsBro has generated <strong style={{ color: 'var(--green-bright)' }}>$150M+ for 350+ brands</strong> by fixing what most brands ignore.
            </p>
            {leaks.map(l => (
              <div key={l.title} className={`${s.leakItem} ${s.fu}`}>
                <div className={s.leakIcon}>{l.icon}</div>
                <div>
                  <div className={s.leakTitle}>{l.title}</div>
                  <div className={s.leakDesc}>{l.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={`${s.quoteBox} ${s.fu}`}>
            <blockquote className={s.quote}>
              "Revenue Per Visitor matters more than conversion rate.{' '}
              <span>Profit Per Visitor matters more than both.</span>"
            </blockquote>
            <div className={s.metricsRow}>
              {[['Most Agencies','CR',false],['BrandsBro','RPV',true],['BrandsBro','PPV',true]].map(([l,v,a]) => (
                <div key={v+l} className={`${s.chip} ${a ? s.chipActive : ''}`}>
                  <div className={s.chipLabel}>{l}</div>
                  <div className={s.chipVal}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   5-PART PATH
══════════════════════════════════════ */
function ProfitPath() {
  const ref = useFade()

  const cards = [
    { n: '01', icon: '🛒', title: 'Cart Optimization',  desc: 'Dynamic triggers that capture $4–$12 in extra AOV before checkout.' },
    { n: '02', icon: '🛡️', title: 'Checkout Defense',   desc: 'Neutralizing the 4 emotional friction points behind 70% of abandonment.' },
    { n: '03', icon: '🎯', title: 'Thank You Page',      desc: 'Custom, high-margin upsell flows built on your best-selling SKUs.' },
    { n: '04', icon: '💎', title: 'Incremental Layer',   desc: 'Instant, zero-COGS profit via brand-safe partner offers.' },
    { n: '05', icon: '🔬', title: 'Continuous Testing',  desc: 'Relentless A/B testing that compounds marginal gains into massive ROI.' },
  ]

  return (
    <section id="path" className={s.section} ref={ref}>
      <div className={s.wrap}>
        <span className={`${s.tag} ${s.fu}`}>Our Service</span>
        <h2 className={`${s.h2} ${s.fu}`}>The BrandsBro 5-Part Profit Path</h2>
        <p className={`${s.desc} ${s.fu}`}>We don't just give you the roadmap — we drive the car.</p>
        <div className={s.pathGrid}>
          {cards.map(c => (
            <div key={c.n} className={`${s.pathCard} ${s.fu}`}>
              <div className={s.pathNum}>{c.n}</div>
              <div className={s.pathIcon}>{c.icon}</div>
              <div className={s.pathTitle}>{c.title}</div>
              <p className={s.pathDesc}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   TIER BAR (Cart sub-component)
══════════════════════════════════════ */
function TierBar({ label, reward, targetW, delay }) {
  const [w, setW] = useState('0%')
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setW(targetW), delay); obs.disconnect() }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [targetW, delay])

  return (
    <div className={s.tierBar} ref={ref}>
      <div className={s.tierFill} style={{ width: w }} />
      <div className={s.tierInfo}>
        <span className={s.tierName}>{label}</span>
        <span className={s.tierReward}>{reward}</span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   CART
══════════════════════════════════════ */
function CartSection() {
  const ref = useFade()
  const [orders, setOrders] = useState(5000)
  const monthly = orders * 7
  const yearly  = monthly * 12
  const fmt = n => n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`

  return (
    <section id="cart" className={s.sectionAlt} ref={ref}>
      <div className={s.divider} />
      <div className={s.wrap}>
        <span className={`${s.tag} ${s.fu}`}>Cart Optimization</span>
        <h2 className={`${s.h2} ${s.fu}`}>Maximizing AOV Before Checkout</h2>

        <div className={s.grid2}>
          <div>
            <p className={`${s.desc} ${s.fu}`} style={{ marginBottom: 28 }}>
              Most brands treat the cart as a static container. BrandsBro turns it into an active profit engine with gamified motivator bars.
            </p>
            <div className={s.fu}>
              <TierBar label="🚚 Tier 1 — Free Shipping"         reward="$0 threshold"        targetW="55%" delay={0}   />
              <TierBar label="🎁 Tier 2 — Free Gift w/ Purchase" reward="Strategic price point" targetW="75%" delay={300} />
              <TierBar label="👑 Tier 3 — VIP Bundle Access"     reward="Priority processing"  targetW="92%" delay={600} />
            </div>
          </div>

          <div className={`${s.calcCard} ${s.fu}`}>
            <div className={s.calcTitle}>📊 AOV Revenue Calculator</div>
            <div className={s.calcRow}>
              <span>BrandsBro AOV Boost</span>
              <strong className={s.calcVal}>+$7 / order</strong>
            </div>
            <div className={s.calcRow}>
              <span>Monthly Extra Revenue</span>
              <strong className={`${s.calcVal} ${s.calcGreen}`}>{fmt(monthly)}</strong>
            </div>
            <div className={s.calcRow}>
              <span>Yearly Extra Revenue</span>
              <strong className={`${s.calcVal} ${s.calcGold}`}>{fmt(yearly)}</strong>
            </div>
            <div className={s.sliderWrap}>
              <label className={s.sliderLabel}>
                Monthly Orders <span>{orders.toLocaleString()}</span>
              </label>
              <input type="range" className={s.slider} min={1000} max={50000} step={500}
                value={orders} onChange={e => setOrders(+e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   CHECKOUT
══════════════════════════════════════ */
function Checkout() {
  const ref = useFade()

  const emotions = [
    { icon: '😕', name: 'Confusion', risk: 'Kills momentum — unclear paths make users bail.',           fix: '"Frictionless Pathing" — progress indicators, one-page layouts, and autofill.' },
    { icon: '🔒', name: 'Trust',     risk: 'High for first-time buyers. Doubt leads to abandonment.',    fix: '"Confidence Anchors" — brand consistency and security badges at point of entry.' },
    { icon: '😰', name: 'Anxiety',   risk: 'Value-stress peaks right before "Complete Purchase."',       fix: '"Value Reassurance" — social proof and free shipping thresholds remove remorse.' },
    { icon: '⏰', name: 'FOMO',      risk: 'Without urgency they\'ll "think about it" and never return.',fix: '"Strategic Urgency" — inventory alerts that feel helpful, not pushy.' },
  ]

  const mobileFixes = [
    ['👍 Thumb-Friendly UI', 'Oversized buttons, touch-optimized fields'],
    ['📱 Minimal Forms',     'Only essentials to reduce friction'],
    ['💳 Digital Wallets',   'Apple Pay, Google Pay, Shop Pay'],
    ['⚡ Performance',       'Strip heavy scripts on mobile'],
  ]

  return (
    <section id="checkout" className={s.section} ref={ref}>
      <div className={s.wrap}>
        <span className={`${s.tag} ${s.fu}`}>Checkout Flow</span>
        <h2 className={`${s.h2} ${s.fu}`}>Protect The Conversion</h2>
        <p className={`${s.desc} ${s.fu}`} style={{ marginBottom: 44 }}>
          Getting a visitor to checkout is the most expensive part of your marketing. Losing them at the finish line is a wasted investment.
        </p>

        <div className={s.emotionsGrid}>
          {emotions.map(e => (
            <div key={e.name} className={`${s.emotionCard} ${s.fu}`}>
              <div className={s.emotionHeader}>
                <span className={s.emotionIcon}>{e.icon}</span>
                <span className={s.emotionName}>{e.name}</span>
              </div>
              <div className={s.emotionRisk}>{e.risk}</div>
              <div className={s.emotionFix}><strong>Solution: </strong>{e.fix}</div>
            </div>
          ))}
        </div>

        <div className={`${s.mobileBar} ${s.fu}`}>
          <div>
            <div className={s.mobileBigNum}>73%</div>
            <div className={s.mobileBigLabel}>of conversions happen on mobile</div>
          </div>
          <div className={s.mobileGrid}>
            {mobileFixes.map(([title, desc]) => (
              <div key={title} className={s.mobileItem}>
                <div className={s.mobileItemTitle}>{title}</div>
                <div className={s.mobileItemDesc}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   YES LADDER
══════════════════════════════════════ */
function YesLadder() {
  const ref = useFade()

  const steps = [
    ['Start with Your Winners',     'Pull top 5 best-sellers: high margin (60%+), high repeat purchase rates.'],
    ['Protect Your Bottom Line',    'No offers under 50% net margin. Revenue is vanity; profit is sanity.'],
    ['Reframe the Value',           '$30 sounds like a lot. $1/day sounds like nothing. We test the right hook.'],
    ['Mirror the Front-End Hook',   'If your ad sells confidence, your upsell sells more confidence.'],
    ['Full-Overlay Design',         'Full-overlay placements generate 2× the profit of embedded boxes.'],
    ['High-IQ Segmentation',        'New vs. returning, single-SKU vs. bundlers — custom paths for every buyer.'],
  ]

  return (
    <section id="yes-ladder" className={s.sectionAlt} ref={ref}>
      <div className={s.divider} />
      <div className={s.wrap}>
        <span className={`${s.tag} ${s.fu}`}>Post-Purchase Upsells</span>
        <h2 className={`${s.h2} ${s.fu}`}>Scaling AOV with "The Yes Ladder"</h2>
        <p className={`${s.desc} ${s.fu}`}>Each offer builds on the last. Every "Yes" makes the next one easier.</p>

        <div className={s.grid2}>
          <ol className={s.stepList}>
            {steps.map(([title, desc], i) => (
              <li key={i} className={`${s.stepItem} ${s.fu}`}>
                <div className={s.stepNum}>{i + 1}</div>
                <div>
                  <div className={s.stepTitle}>{title}</div>
                  <div className={s.stepDesc}>{desc}</div>
                </div>
              </li>
            ))}
          </ol>

          <div className={`${s.flowCard} ${s.fu}`}>
            <div className={s.flowTitle}>The Momentum Flow</div>
            <div className={`${s.flowBox} ${s.flowBoxHi}`}>
              <div className={s.flowBoxTitle}>⚡ Peak Intent</div>
              <div className={s.flowBoxSub}>Customer completes checkout</div>
            </div>
            <div className={s.flowArrow}>↓</div>
            <div className={s.flowBox}>
              <div className={s.flowBoxTitle}>🎯 Logical Upsell</div>
              <div className={s.flowBoxSub}>High-margin winner based on cart</div>
            </div>
            <div className={s.flowArrow}>↓</div>
            <div className={s.flowBox}>
              <div className={s.flowBoxTitle}>🔀 The Split</div>
              <div className={s.flowBoxSub}>Customer decides</div>
            </div>
            <div className={s.flowSplit}>
              <div className={s.flowSplitBox}>
                <div className={`${s.flowSplitLabel} ${s.flowSplitYes}`}>✅ Yes</div>
                <div className={s.flowSplitDesc}>Higher bundle offer</div>
              </div>
              <div className={s.flowSplitBox}>
                <div className={`${s.flowSplitLabel} ${s.flowSplitNo}`}>↩ No</div>
                <div className={s.flowSplitDesc}>Irresistible downsell</div>
              </div>
            </div>
            <div className={s.flowArrow}>↓</div>
            <div className={`${s.flowBox} ${s.flowBoxHi}`}>
              <div className={s.flowBoxTitle}>🎉 Thank You Page</div>
              <div className={s.flowBoxSub}>Higher order value, zero friction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   PURE PROFIT
══════════════════════════════════════ */
function PureProfit() {
  const ref = useFade()

  const zeros = [
    { icon: '📦', title: 'Zero COGS',        desc: "You aren't selling inventory" },
    { icon: '🚚', title: 'Zero Fulfillment', desc: "You don't ship anything" },
    { icon: '📞', title: 'Zero Support',     desc: "You don't handle service" },
    { icon: '⚠️', title: 'Zero Risk',        desc: 'Appears only after payment' },
  ]

  const results = [
    { brand: 'Mirxen',     amount: '$10K/mo', detail: 'Monthly pure profit, zero retention impact' },
    { brand: 'Srijax',     amount: '$130K',   detail: 'Pure profit in just 3 months' },
    { brand: 'Drivesight', amount: '$628K',   detail: 'Incremental profit from this single strategy' },
  ]

  return (
    <section id="pure-profit" className={s.section} ref={ref}>
      <div className={s.wrap}>
        <span className={`${s.tag} ${s.fu}`}>Pure Profit Layer</span>
        <h2 className={`${s.h2} ${s.fu}`}>Monetizing the "Thank You" Page</h2>

        <div className={s.grid2}>
          <div>
            <p className={`${s.desc} ${s.fu}`} style={{ marginBottom: 0 }}>
              We place vetted brand-safe offers (Disney+, HelloFresh, Nike) on your confirmation page.
              Earn $0.30–$0.50 pure profit per order — zero COGS, zero fulfillment, zero risk.
            </p>
            <div className={s.zeroGrid}>
              {zeros.map(z => (
                <div key={z.title} className={`${s.zeroCard} ${s.fu}`}>
                  <div className={s.zeroIcon}>{z.icon}</div>
                  <div className={s.zeroTitle}>{z.title}</div>
                  <div className={s.zeroDesc}>{z.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${s.resultsBox} ${s.fu}`}>
            <div className={s.resultsTitle}>Real Results</div>
            {results.map(r => (
              <div key={r.brand} className={s.resultRow}>
                <div>
                  <div className={s.resultBrand}>{r.brand}</div>
                  <div className={s.resultDetail}>{r.detail}</div>
                </div>
                <div className={s.resultAmt}>{r.amount}</div>
              </div>
            ))}
            <div className={s.perOrderBox}>
              <div className={s.perOrderLabel}>Pure profit per order</div>
              <div className={s.perOrderVal}>$0.30–$0.50</div>
              <div className={s.perOrderSub}>AI trained on 200M transactions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   TESTING
══════════════════════════════════════ */
function Testing() {
  const ref = useFade()

  const tests = [
    { icon: '🔢', title: 'Offer Sequence',  desc: 'Find the perfect product order to double revenue.' },
    { icon: '💲', title: 'Price Framing',   desc: 'Test "$1/day" vs "20% off" for higher uptake.' },
    { icon: '🔗', title: 'Product Synergy', desc: 'Pair best-sellers with perfect high-margin add-ons.' },
    { icon: '✍️', title: 'Copy Hooks',      desc: 'Test "Save Time" vs "Feel Better" to spark emotion.' },
    { icon: '🖥️', title: 'UI Layout',       desc: 'Full overlays vs embedded boxes for max attention.' },
  ]

  const protocol = [
    { n: '01', title: 'Isolate Variables', desc: 'One change at a time — the only way to get clean data.' },
    { n: '02', title: 'Statistical Power', desc: 'Wait for 2,000 visitors to ensure growth is real.' },
    { n: '03', title: 'Profit Metrics',    desc: 'Ignore vanity numbers. Focus on Profit Per Visitor.' },
    { n: '04', title: 'Growth Blueprints', desc: 'Document every win. Build the roadmap to scale.' },
  ]

  return (
    <section id="testing" className={s.sectionAlt} ref={ref}>
      <div className={s.divider} />
      <div className={s.wrap}>
        <span className={`${s.tag} ${s.fu}`}>Testing & Optimization</span>
        <h2 className={`${s.h2} ${s.fu}`}>Data-Driven Dominance</h2>
        <p className={`${s.desc} ${s.fu}`} style={{ marginBottom: 44 }}>
          Testing turns small gains into massive ROI. We don't just launch — we optimize relentlessly.
        </p>

        <div className={s.testGrid}>
          {tests.map(t => (
            <div key={t.title} className={`${s.testCard} ${s.fu}`}>
              <div className={s.testIcon}>{t.icon}</div>
              <div className={s.testTitle}>{t.title}</div>
              <div className={s.testDesc}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div className={s.protocolGrid}>
          {protocol.map(p => (
            <div key={p.n} className={`${s.protocolCard} ${s.fu}`}>
              <div className={s.protocolNum}>{p.n}</div>
              <div className={s.protocolTitle}>{p.title}</div>
              <div className={s.protocolDesc}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   TIMELINE
══════════════════════════════════════ */
function Timeline() {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(false)

  const phases = [
    { badge: 'Week 1',   title: 'Quick Wins',            items: ['Activate post-purchase system', 'Add rewards bar to cart', 'Inject trust badges'] },
    { badge: 'Week 2–3', title: 'Cart Optimization',     items: ['AI-powered recommendations', 'Social proof & reviews', 'Tiered rewards gamification'] },
    { badge: 'Week 3–4', title: 'Yes Ladder Foundation', items: ['Identify top 5 high-margin SKUs', 'Build first one-click upsell', 'Set up buyer segments'] },
    { badge: 'Ongoing',  title: 'Test & Optimize',       items: ['A/B test offer sequencing', 'Expand segmentation rules', 'Monitor performance weekly'] },
  ]

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTriggered(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="timeline" className={s.section} style={{ opacity: 0, transform: 'translateY(48px)', transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)' }}
      ref={el => {
        if (!el) return
        const obs = new IntersectionObserver(([e]) => {
          if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect() }
        }, { threshold: 0.08 })
        obs.observe(el)
      }}
    >
      <div className={s.wrap}>
        <span className={`${s.tag} ${s.fu}`}>4-Week Roadmap</span>
        <h2 className={`${s.h2} ${s.fu}`}>How To Get Started</h2>
        <p className={`${s.desc} ${s.fu}`}>We don't just give you a tool — we manage your entire journey to higher profits.</p>

        <div ref={ref} style={{ position: 'relative' }}>
          {/* Animated line from first dot to last dot */}
          <div style={{
            position: 'absolute',
            top: 9,
            left: 9,
            right: 'calc(25% + 9px)',
            height: 1,
            background: 'rgba(62,207,142,0.12)',
            overflow: 'hidden',
            zIndex: 0,
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--em), rgba(62,207,142,0.35))',
              width: triggered ? '100%' : '0%',
              transition: 'width 1.4s cubic-bezier(0.4,0,0.2,1) 0.1s',
            }} />
          </div>
        <div className={s.phasesRow}>
          {phases.map((p, i) => (
            <div key={i} className={s.phaseCol} style={{
              opacity: triggered ? 1 : 0,
              transform: triggered ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.5s ease ${0.1 + i * 0.15}s, transform 0.5s ease ${0.1 + i * 0.15}s`,
            }}>
              {/* Dot above badge */}
              <div className={s.dot} style={{
                transform: triggered ? 'scale(1)' : 'scale(0)',
                transition: `transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${0.1 + i * 0.15}s`,
              }} />
              <div className={s.phaseBadge}>{p.badge}</div>
              <div className={s.phaseTitle}>{p.title}</div>
              <ul className={s.phaseList}>
                {p.items.map(item => (
                  <li key={item} className={s.phaseItem}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </div>

      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SUMMARY
══════════════════════════════════════ */
function Summary() {
  const ref = useFade()

  const cards = [
    { icon: '🛒', title: 'Cart Optimization',   gain: '+$4–$12 AOV',       desc: 'Extra AOV captured before they leave the cart.' },
    { icon: '🛡️', title: 'Checkout Protection', gain: 'Less abandonment',   desc: 'Remove the 4 emotions causing drop-off at the finish line.' },
    { icon: '🪜', title: 'The Yes Ladder',       gain: '+$7.50+ per order',  desc: 'High-margin revenue through logic and buyer momentum.' },
    { icon: '💎', title: 'Pure Profit Layer',    gain: '+$0.50 pure profit', desc: 'Zero-COGS income active from your very first order.' },
  ]

  return (
    <section id="summary" className={s.sectionAlt} ref={ref}>
      <div className={s.divider} />
      <div className={s.wrap}>
        <span className={`${s.tag} ${s.fu}`}>The Bottom Line</span>
        <h2 className={`${s.h2} ${s.fu}`}>The Profit Breakdown</h2>
        <p className={`${s.desc} ${s.fu}`} style={{ marginBottom: 44 }}>
          All from traffic you already have. We optimize the moments every buyer experiences.
        </p>

        <div className={s.summaryGrid}>
          {cards.map(c => (
            <div key={c.title} className={`${s.summaryCard} ${s.fu}`}>
              <div className={s.summaryCardHead}>
                <span className={s.summaryCardIcon}>{c.icon}</span>
                <span className={s.summaryCardTitle}>{c.title}</span>
              </div>
              <div className={s.summaryGain}>{c.gain}</div>
              <div className={s.summaryDesc}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div className={`${s.closingBox} ${s.fu}`}>
          <p className={s.closingQuote}>
            "The money is already sitting there on your site.{' '}
            <span>How much longer are you going to leave it on the table?</span>"
          </p>
          <a href="#cta" className={s.btnGreen}>I'm Ready — Let's Go</a>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   CTA
══════════════════════════════════════ */
function CTA() {
  const ref = useFade()
  return (
    <section id="cta" className={s.ctaSection} ref={ref}>
      <div className={s.ctaBg} />
      <div className={s.ctaInner}>
        <span className={`${s.tag} ${s.fu}`}>Take Action</span>
        <h2 className={`${s.h2} ${s.fu}`} style={{ textAlign: 'center' }}>
          Unlock the Hidden Revenue<br />Inside Your Post-Purchase Funnel
        </h2>
        <p className={`${s.desc} ${s.fu}`} style={{ textAlign: 'center', margin: '0 auto 48px' }}>
          Ready to scale alongside 350+ of the world's fastest growing brands?
        </p>
        <div className={`${s.ctaBox} ${s.fu}`}>
          <h3 className={s.ctaBoxTitle}>Book Your Free Strategy Call</h3>
          <p className={s.ctaBoxDesc}>
            We'll map out how to optimize your Shopify post-purchase upsell funnel and skyrocket your revenue — no fluff, just a concrete profit plan.
          </p>
          <a href="#" className={s.ctaBtnBig}>Unlock My Profit Strategy →</a>
          <div className={s.ctaTrust}>
            Trusted by <strong>350+ brands</strong> · <strong>$150M+</strong> in revenue generated
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerLogo}>Brands<span>Bro</span></div>
      <div className={s.footerCopy}>© {new Date().getFullYear()} BrandsBro. All rights reserved.</div>
    </footer>
  )
}

/* ══════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <ProfitPath />
        <CartSection />
        <Checkout />
        <YesLadder />
        <PureProfit />
        <Testing />
        <Timeline />
        <Summary />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
