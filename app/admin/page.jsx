'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const SECRET = process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'brandsbro2024'

function AdminContent() {
  const [leads, setLeads]       = useState([])
  const [events, setEvents]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [tab, setTab]           = useState('leads')
  const [allowed, setAllowed]   = useState(false)
  const params = useSearchParams()

  useEffect(() => {
    const token = params.get('token')
    if (token === SECRET) {
      setAllowed(true)
    }
  }, [params])

  // Block access if no valid token
  if (!allowed) {
    return (
      <div style={{ minHeight: '100vh', background: '#09090B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '4rem', color: '#ffffff', marginBottom: 16 }}>403</div>
          <div style={{ color: '#52525B', fontSize: '1rem' }}>Access denied.</div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token') || ''
    const headers = { 'x-admin-token': token }
    Promise.all([
      fetch('/api/leads',    { headers }).then(r => r.json()),
      fetch('/api/analytics', { headers }).then(r => r.json()),
    ]).then(([l, a]) => {
      setLeads(l.leads || [])
      setEvents(a.events || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

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

  const fmt = (iso) => iso
    ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '—'

  const thStyle = {
    padding: '12px 20px', textAlign: 'left',
    fontFamily: "'Syne', sans-serif", fontWeight: 700,
    fontSize: '0.7rem', letterSpacing: '0.15em',
    textTransform: 'uppercase', color: '#ffffff',
    whiteSpace: 'nowrap', borderBottom: '1px solid rgba(255,255,255,0.1)',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09090B', fontFamily: "'DM Sans', sans-serif", color: '#ffffff' }}>

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '18px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#fff', letterSpacing: '-0.02em' }}>
            Brands<span style={{ color: em }}>Bro</span>
          </span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: em, background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.25)', borderRadius: 100, padding: '4px 12px' }}>
            Admin
          </span>
        </div>
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', textDecoration: 'none', opacity: 0.6, transition: 'opacity 0.2s' }}>
          ← Back to Site
        </Link>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px' }}>

        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Leads',  value: loading ? '...' : totalLeads,  color: em },
            { label: 'Page Views',   value: loading ? '...' : pageViews,   color: '#ffffff' },
            { label: 'CTA Clicks',   value: loading ? '...' : ctaClicks,   color: '#ffffff' },
            { label: 'Conv. Rate',   value: loading ? '...' : convRate,    color: '#F0C060' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '24px 26px' }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ffffff', opacity: 0.5, marginBottom: 12 }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '2.4rem', color: stat.color, lineHeight: 1 }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* REVENUE BREAKDOWN */}
        <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: em, marginBottom: 24 }}>
            Revenue Breakdown
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {revenueBreakdown.map(r => (
              <div key={r.range} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.82rem', color: '#ffffff', marginBottom: 12 }}>
                  {r.range}
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, marginBottom: 12, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${r.pct}%`, background: em, borderRadius: 3, transition: 'width 0.8s ease' }} />
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '1.6rem', color: '#ffffff' }}>
                  {r.count}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#ffffff', opacity: 0.45, marginTop: 2 }}>{r.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#111113', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
          {['leads', 'analytics'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? em : 'transparent',
              color: tab === t ? '#000' : '#ffffff',
              border: 'none', borderRadius: 7, padding: '8px 22px',
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: '0.78rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
            }}>{t}</button>
          ))}
        </div>

        {/* LEADS TABLE */}
        {tab === 'leads' && (
          <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: '#ffffff' }}>All Leads</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.78rem', color: '#ffffff', opacity: 0.4 }}>{totalLeads} total</span>
            </div>
            {loading ? (
              <div style={{ padding: 48, textAlign: 'center', color: '#ffffff', opacity: 0.4 }}>Loading...</div>
            ) : leads.length === 0 ? (
              <div style={{ padding: 48, textAlign: 'center', color: '#ffffff', opacity: 0.4, fontSize: '0.9rem' }}>No leads yet — submit a test form at /lead</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Name', 'Email', 'Website', 'Revenue Range', 'Date'].map(h => (
                        <th key={h} style={thStyle}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, i) => (
                      <tr key={lead.id || i}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '15px 20px', color: '#ffffff', fontSize: '0.9rem', fontWeight: 500, whiteSpace: 'nowrap' }}>
                          {lead.first_name} {lead.last_name}
                        </td>
                        <td style={{ padding: '15px 20px', color: em, fontSize: '0.88rem' }}>{lead.email}</td>
                        <td style={{ padding: '15px 20px', color: '#ffffff', opacity: 0.6, fontSize: '0.85rem' }}>
                          {lead.website
                            ? <a href={lead.website} target="_blank" style={{ color: '#ffffff', opacity: 0.6, textDecoration: 'none' }}>{lead.website.replace(/https?:\/\//, '')}</a>
                            : <span style={{ opacity: 0.3 }}>—</span>}
                        </td>
                        <td style={{ padding: '15px 20px' }}>
                          {lead.revenue_range
                            ? <span style={{ background: 'rgba(62,207,142,0.12)', border: '1px solid rgba(62,207,142,0.3)', color: em, borderRadius: 100, padding: '4px 14px', fontSize: '0.78rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, whiteSpace: 'nowrap' }}>{lead.revenue_range}</span>
                            : <span style={{ color: '#ffffff', opacity: 0.25 }}>—</span>}
                        </td>
                        <td style={{ padding: '15px 20px', color: '#ffffff', opacity: 0.45, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{fmt(lead.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ANALYTICS TABLE */}
        {tab === 'analytics' && (
          <div style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: '#ffffff' }}>Analytics Events</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.78rem', color: '#ffffff', opacity: 0.4 }}>{events.length} events</span>
            </div>
            {loading ? (
              <div style={{ padding: 48, textAlign: 'center', color: '#ffffff', opacity: 0.4 }}>Loading...</div>
            ) : events.length === 0 ? (
              <div style={{ padding: 48, textAlign: 'center', color: '#ffffff', opacity: 0.4, fontSize: '0.9rem' }}>No events yet — visit /lead to trigger the first event</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Event', 'Page', 'Metadata', 'Date'].map(h => (
                        <th key={h} style={thStyle}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev, i) => {
                      const tagColor = ev.event === 'cta_click' ? { bg: 'rgba(240,192,96,0.12)', border: 'rgba(240,192,96,0.3)', text: '#F0C060' }
                        : ev.event === 'page_view' ? { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)', text: '#ffffff' }
                        : { bg: 'rgba(62,207,142,0.12)', border: 'rgba(62,207,142,0.3)', text: em }
                      return (
                        <tr key={ev.id || i}
                          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <td style={{ padding: '14px 20px' }}>
                            <span style={{ background: tagColor.bg, border: `1px solid ${tagColor.border}`, color: tagColor.text, borderRadius: 100, padding: '4px 14px', fontSize: '0.78rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, whiteSpace: 'nowrap' }}>
                              {ev.event}
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px', color: '#ffffff', opacity: 0.7, fontSize: '0.85rem' }}>{ev.page || '/'}</td>
                          <td style={{ padding: '14px 20px', color: '#ffffff', opacity: 0.45, fontSize: '0.8rem', fontFamily: 'monospace' }}>
                            {ev.metadata && Object.keys(ev.metadata).length > 0 ? JSON.stringify(ev.metadata) : <span style={{ opacity: 0.3 }}>—</span>}
                          </td>
                          <td style={{ padding: '14px 20px', color: '#ffffff', opacity: 0.45, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{fmt(ev.created_at)}</td>
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
