'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LeadPage() {
  const router = useRouter()
  const [step, setStep]       = useState(1)
  const [form, setForm]       = useState({ firstName: '', lastName: '', email: '', website: '', privacy: false })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [leadData, setLeadData] = useState(null)

  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'page_view', page: '/lead' }),
    }).catch(() => {})
  }, [])

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.privacy) e.privacy = 'Please accept the privacy policy'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'lead_form_submit', page: '/lead', metadata: { email: form.email } }),
    }).catch(() => {})
    setLeadData(form)
    setLoading(false)
    setStep(2)
  }

  const handleRevenue = async (range) => {
    setStep(3)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leadData, revenueRange: range }),
      })
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'revenue_selected', page: '/lead', metadata: { range } }),
      }).catch(() => {})
    } catch (err) {
      console.error(err)
    }
    setTimeout(() => router.push('/'), 900)
  }

  const em = '#3ECF8E', surface = '#111113', border = 'rgba(255,255,255,0.08)', white = '#FFFFFF', muted = '#A1A1AA'

  return (
    <div style={{ minHeight: '100vh', background: '#09090B', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", padding: '40px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(62,207,142,0.07) 0%, transparent 65%)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(62,207,142,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(62,207,142,0.025) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

      <div style={{ position: 'relative', marginBottom: 40 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.4rem', color: white, letterSpacing: '-0.02em' }}>
          Brands<span style={{ color: em }}>Bro</span>
        </span>
      </div>

      {step === 1 && (
        <div style={{ position: 'relative', background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: '48px 44px', width: '100%', maxWidth: 500, boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 2, background: `linear-gradient(90deg, transparent, ${em}, transparent)`, borderRadius: 2 }} />
          <div style={{ display: 'inline-block', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: em, background: 'rgba(62,207,142,0.08)', border: '1px solid rgba(62,207,142,0.22)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
            Free Resource
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(1.6rem,3vw,2.1rem)', color: white, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 10 }}>
            The Hidden Profit<br /><em style={{ color: em, fontStyle: 'italic' }}>Playbook</em>
          </h1>
          <p style={{ fontSize: '0.95rem', color: muted, marginBottom: 32, lineHeight: 1.7 }}>
            How to unlock 6 figures from your existing traffic — free.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <input type="text" placeholder="First name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} style={{ ...iS(errors.firstName), width: '100%' }} onFocus={e => e.target.style.borderColor = em} onBlur={e => e.target.style.borderColor = errors.firstName ? '#FCA5A5' : border} />
                {errors.firstName && <p style={eS}>{errors.firstName}</p>}
              </div>
              <div>
                <input type="text" placeholder="Last name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} style={{ ...iS(errors.lastName), width: '100%' }} onFocus={e => e.target.style.borderColor = em} onBlur={e => e.target.style.borderColor = errors.lastName ? '#FCA5A5' : border} />
                {errors.lastName && <p style={eS}>{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <input type="email" placeholder="Work email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ ...iS(errors.email), width: '100%' }} onFocus={e => e.target.style.borderColor = em} onBlur={e => e.target.style.borderColor = errors.email ? '#FCA5A5' : border} />
              {errors.email && <p style={eS}>{errors.email}</p>}
            </div>
            <input type="url" placeholder="Company website (optional)" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} style={{ ...iS(false), width: '100%' }} onFocus={e => e.target.style.borderColor = em} onBlur={e => e.target.style.borderColor = border} />

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 4 }}>
              <div onClick={() => setForm({ ...form, privacy: !form.privacy })} style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 2, cursor: 'pointer', background: form.privacy ? em : 'transparent', border: `2px solid ${form.privacy ? em : errors.privacy ? '#FCA5A5' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                {form.privacy && <span style={{ color: '#000', fontSize: 12, fontWeight: 800, lineHeight: 1 }}>✓</span>}
              </div>
              <p style={{ fontSize: '0.82rem', color: muted, lineHeight: 1.6 }}>
                I accept the{' '}
                <Link href="/privacy" target="_blank" style={{ color: em, textDecoration: 'underline', textUnderlineOffset: 3 }}>privacy policy</Link>
              </p>
            </div>
            {errors.privacy && <p style={{ ...eS, marginTop: -8 }}>{errors.privacy}</p>}

            <button type="submit" disabled={loading} style={{ marginTop: 8, background: loading ? '#29A373' : em, color: '#000', padding: '16px', borderRadius: 9, fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.06em', textTransform: 'uppercase', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', width: '100%', transition: 'all 0.25s', boxShadow: '0 4px 24px rgba(62,207,142,0.2)' }}>
              {loading ? 'Saving...' : 'Download Now — 100% Free'}
            </button>
          </form>

          <div style={{ marginTop: 32, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.72rem', fontFamily: "'Syne', sans-serif", fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#52525B', marginBottom: 16 }}>Trusted by 350+ brands</p>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Magniche', 'Tigrett', 'Mirxen', 'Srijax', 'Drivesight'].map(b => (
                <span key={b} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.78rem', color: '#3F3F46' }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ position: 'relative', textAlign: 'center', width: '100%', maxWidth: 680 }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginBottom: 16 }}>Last question...</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: white, letterSpacing: '-0.025em', marginBottom: 44, lineHeight: 1.1 }}>
            What is your <em style={{ color: em, fontStyle: 'italic' }}>annual revenue?</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {['Under $1M', '$1M – $3M', '$3M – $5M', 'Above $5M'].map(range => (
              <button key={range} onClick={() => handleRevenue(range)} style={{ background: surface, border: '1px solid rgba(62,207,142,0.22)', borderRadius: 14, padding: '28px 24px', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: white, cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)' }}
                onMouseEnter={e => { e.currentTarget.style.background = em; e.currentTarget.style.color = '#000'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(62,207,142,0.25)' }}
                onMouseLeave={e => { e.currentTarget.style.background = surface; e.currentTarget.style.color = white; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                {range}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', border: '3px solid rgba(62,207,142,0.15)', borderTop: `3px solid ${em}`, animation: 'spin 0.8s linear infinite', margin: '0 auto 24px' }} />
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: white }}>Unlocking your playbook...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      <div style={{ position: 'relative', marginTop: 40, display: 'flex', gap: 24 }}>
        <Link href="/privacy" style={{ fontSize: '0.78rem', color: '#52525B', textDecoration: 'none' }}>Privacy Policy</Link>
        <span style={{ fontSize: '0.78rem', color: '#3F3F46' }}>·</span>
        <span style={{ fontSize: '0.78rem', color: '#52525B' }}>© {new Date().getFullYear()} BrandsBro</span>
      </div>
    </div>
  )
}

const iS = (err) => ({ background: '#0A0A0C', border: `1px solid ${err ? '#FCA5A5' : 'rgba(255,255,255,0.08)'}`, borderRadius: 9, padding: '13px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: '#F4F4F5', outline: 'none', transition: 'border-color 0.2s', display: 'block' })
const eS = { fontSize: '0.75rem', color: '#FCA5A5', marginTop: 4 }
