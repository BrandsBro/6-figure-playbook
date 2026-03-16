'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function AdminContent() {
  const params       = useSearchParams()
  const [auth, setAuth]       = useState(false)
  const [checked, setChecked] = useState(false)
  const [leads, setLeads]     = useState([])
  const [events, setEvents]   = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab]         = useState('leads')

  useEffect(() => {
    const token   = params.get('token') || ''
    const secret  = process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'brandsbro2024'
    if (token === secret) {
      setAuth(true)
      // Store in sessionStorage so refresh keeps you in
      sessionStorage.setItem('admin_token', token)
    } else {
      // Check sessionStorage
      const stored = sessionStorage.getItem('admin_token')
      if (stored === secret) setAuth(true)
    }
    setChecked(true)
  }, [params])

  useEffect(() => {
    if (!auth) return
    Promise.all([
      fetch('/api/leads').then(r => r.json()),
      fetch('/api/analytics').then(r => r.json()),
    ]).then(([l, a]) => {
      setLeads(l.leads || [])
      setEvents(a.events || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [auth])

  // Still checking
  if (!checked) return (
    <div style={{ minHeight: '100vh', background: '#09090B' }} />
  )

  // Not authorized
  if (!auth) return (
    <div style={{ minHeight: '100vh', background: '#09090B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '5rem', color: '#fff', lineHeight: 1 }}>403</div>
        <div style={{ color: '#52525B', fontSize: '1rem', marginTop: 12 }}>Access denied.</div>
      </div>
    </div>
  )

  const em         = '#3ECF8E'
  const totalLeads = leads.length
  const pageViews  = events.filter(e => e.event === 'page_view').length
  const ctaClicks  = events.filter(e => e.event === 'cta_click').length
  const convRate   = pageViews > 0 ? `${((totalLeads / pageViews) * 100).toFixed(1)}%` : '—'

  const revenueBreakdown = ['Under $1M', '$1M – $3M', '$3M – $5M', 'Above $5M'].map(r => ({
    range: r,
    count: leads.filter(l => l.revenue_range === r).length,
    pct: totalLeads > 0 ? ((leads.filter(l => l.revenue_range === r).length / totalLeads) * 100).toFixed(0) : 0,
  }))

  const fmt = (iso) => iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'

  const thStyle = { padding: '12px 20px', textAlign: 'left', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ffffff', whiteSpace: 'nowrap', borderBottom: '1px solid rgba(255,255,255,0.1)' }

  return (
    <div style={{ minHeight: '100vh', background: '#09090B', fontFamily: "'DM Sans', sans-serif", color: '#ffffff' }}>
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '18px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#fff', letterSpacing: '-0.02em' }}>Brands<span style={{ color: em }}>Bro</span></span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: em, background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.25)', borderRadius: 100, padding: '4px 12px' }}>Admin</span>
        </div>
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', textDecoration: 'none', opacity: 0.6 }}>← Back to Site</Link>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Leads',  value: loading ? '...' : totalLeads,  color: em },
            { label: 'Page Views',   value: loading ? '...' : pageViews,   color: '#fff' },
            { label: 'CTA Clicks',   value: loading ? '...' : ctaClicks,   color: '#fff' },
            { label: 'Conv. Rate',   value: loading ? '...' : convRate,    color: '#F0C060' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '24px 26px' }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ffffff', opacity: 0.5, marginBottom: 12 }}>{stat.label}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '2.4rem', color: stat.color, lineHeight: 1 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Revenue Breakdown */}
        <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: em, marginBottom: 24 }}>Revenue Breakdown</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {revenueBreakdown.map(r => (
              <div key={r.range} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.82rem', color: '#ffffff', marginBottom: 12 }}>{r.range}</div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, marginBottom: 12, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${r.pct}%`, background: em, borderRadius: 3 }} />
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '1.6rem', color: '#fff' }}>{r.count}</div>
                <div style={{ fontSize: '0.78rem', color: '#ffffff', opacity: 0.45 }}>{r.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#111113', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
          {['leads', 'analytics'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? em : 'transparent', color: tab === t ? '#000' : '#fff', border: 'none', borderRadius: 7, padding: '8px 22px', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}>{t}</button>
          ))}
        </div>

        {/* Leads Table */}
        {tab === 'leads' && (
          <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: '#fff' }}>All Leads</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.78rem', color: '#fff', opacity: 0.4 }}>{totalLeads} total</span>
            </div>
            {loading ? (
              <div style={{ padding: 48, textAlign: 'center', color: '#fff', opacity: 0.4 }}>Loading...</div>
            ) : leads.length === 0 ? (
              <div style={{ padding: 48, textAlign: 'center', color: '#fff', opacity: 0.4 }}>No leads yet — submit a test form at /lead</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>{['Name','Email','Website','Revenue Range','Date'].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, i) => (
                      <tr key={lead.id || i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '15px 20px', color: '#fff', fontSize: '0.9rem', fontWeight: 500, whiteSpace: 'nowrap' }}>{lead.first_name} {lead.last_name}</td>
                        <td style={{ padding: '15px 20px', color: em, fontSize: '0.88rem' }}>{lead.email}</td>
                        <td style={{ padding: '15px 20px', color: '#fff', opacity: 0.6, fontSize: '0.85rem' }}>
                          {lead.website ? <a href={lead.website} target="_blank" style={{ color: '#fff', opacity: 0.6, textDecoration: 'none' }}>{lead.website.replace(/https?:\/\//, '')}</a> : <span style={{ opacity: 0.3 }}>—</span>}
                        </td>
                        <td style={{ padding: '15px 20px' }}>
                          {lead.revenue_range
                            ? <span style={{ background: 'rgba(62,207,142,0.12)', border: '1px solid rgba(62,207,142,0.3)', color: em, borderRadius: 100, padding: '4px 14px', fontSize: '0.78rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, whiteSpace: 'nowrap' }}>{lead.revenue_range}</span>
                            : <span style={{ opacity: 0.3 }}>—</span>}
                        </td>
                        <td style={{ padding: '15px 20px', color: '#fff', opacity: 0.45, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{fmt(lead.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Analytics Table */}
        {tab === 'analytics' && (
          <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: '#fff' }}>Analytics Events</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.78rem', color: '#fff', opacity: 0.4 }}>{events.length} events</span>
            </div>
            {loading ? (
              <div style={{ padding: 48, textAlign: 'center', color: '#fff', opacity: 0.4 }}>Loading...</div>
            ) : events.length === 0 ? (
              <div style={{ padding: 48, textAlign: 'center', color: '#fff', opacity: 0.4 }}>No events yet</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>{['Event','Page','Metadata','Date'].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {events.map((ev, i) => {
                      const c = ev.event === 'cta_click' ? '#F0C060' : ev.event === 'page_view' ? '#fff' : em
                      const bg = ev.event === 'cta_click' ? 'rgba(240,192,96,0.12)' : ev.event === 'page_view' ? 'rgba(255,255,255,0.05)' : 'rgba(62,207,142,0.12)'
                      return (
                        <tr key={ev.id || i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <td style={{ padding: '14px 20px' }}>
                            <span style={{ background: bg, border: `1px solid ${c}30`, color: c, borderRadius: 100, padding: '4px 14px', fontSize: '0.78rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, whiteSpace: 'nowrap' }}>{ev.event}</span>
                          </td>
                          <td style={{ padding: '14px 20px', color: '#fff', opacity: 0.7, fontSize: '0.85rem' }}>{ev.page || '/'}</td>
                          <td style={{ padding: '14px 20px', color: '#fff', opacity: 0.45, fontSize: '0.8rem', fontFamily: 'monospace' }}>
                            {ev.metadata && Object.keys(ev.metadata).length > 0 ? JSON.stringify(ev.metadata) : <span style={{ opacity: 0.3 }}>—</span>}
                          </td>
                          <td style={{ padding: '14px 20px', color: '#fff', opacity: 0.45, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{fmt(ev.created_at)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function AdminPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#09090B' }} />}>
      <AdminContent />
    </Suspense>
  )
}

export default AdminPage
