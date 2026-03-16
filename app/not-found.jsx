import Link from 'next/link'

export const metadata = {
  title: '404 — Page Not Found | BrandsBro',
}

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', background: '#09090B',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative', overflow: 'hidden',
      padding: '24px',
    }}>
      {/* Glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(62,207,142,0.07) 0%, transparent 65%)' }} />

      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(62,207,142,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(62,207,142,0.025) 1px, transparent 1px)',
        backgroundSize: '72px 72px' }} />

      {/* Noise overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 560 }}>

        {/* Logo */}
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.3rem', color: '#fff', letterSpacing: '-0.02em', textDecoration: 'none', display: 'inline-block', marginBottom: 64 }}>
          Brands<span style={{ color: '#3ECF8E' }}>Bro</span>
        </Link>

        {/* Big 404 */}
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: 'clamp(7rem, 22vw, 14rem)', color: 'transparent',
            lineHeight: 0.9, letterSpacing: '-0.05em',
            WebkitTextStroke: '2px rgba(62,207,142,0.25)',
            userSelect: 'none', pointerEvents: 'none',
          }}>404</div>
          {/* Solid number on top */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: 'clamp(7rem, 22vw, 14rem)', color: '#ffffff',
            lineHeight: 0.9, letterSpacing: '-0.05em',
            background: 'linear-gradient(135deg, #ffffff 30%, rgba(62,207,142,0.6) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>404</div>
        </div>

        {/* Tag */}
        <div style={{
          display: 'inline-block', fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#3ECF8E', background: 'rgba(62,207,142,0.08)',
          border: '1px solid rgba(62,207,142,0.22)', borderRadius: 100,
          padding: '6px 16px', marginBottom: 20,
        }}>Page Not Found</div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 900,
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff',
          lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16,
        }}>
          Looks like this page<br />
          <em style={{ color: '#3ECF8E', fontStyle: 'italic' }}>doesn't exist</em>
        </h1>

        <p style={{ fontSize: '0.97rem', color: '#71717A', lineHeight: 1.8, marginBottom: 44, maxWidth: 400, margin: '0 auto 44px' }}>
          The page you're looking for has moved, been deleted, or never existed. Let's get you back on track.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{
            display: 'inline-block', background: '#3ECF8E', color: '#000',
            padding: '14px 32px', borderRadius: 8,
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem',
            letterSpacing: '0.05em', textDecoration: 'none',
            transition: 'all 0.25s',
          }}>
            ← Back to Home
          </Link>
          <Link href="/lead" style={{
            display: 'inline-block', background: 'transparent', color: '#A1A1AA',
            padding: '14px 32px', borderRadius: 8,
            fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.88rem',
            border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none',
            transition: 'all 0.25s',
          }}>
            Get the Playbook
          </Link>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, transparent, rgba(62,207,142,0.3), transparent)', margin: '48px auto 0' }} />

        {/* Footer note */}
        <p style={{ fontSize: '0.78rem', color: '#3F3F46', marginTop: 20 }}>
          © {new Date().getFullYear()} BrandsBro. All rights reserved.
        </p>

      </div>
    </div>
  )
}
