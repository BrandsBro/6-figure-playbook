import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — BrandsBro',
  description: 'Privacy Policy for BrandsBro resources and webinars.',
}

const sections = [
  {
    num: '01',
    title: 'Introduction',
    body: 'We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you attend our webinar or download a resource.',
  },
  {
    num: '02',
    title: 'Information We Collect',
    body: 'We may collect the following types of information:',
    bullets: [
      'Personal Information: Name, email address, job title, company name, and any other information you voluntarily provide during registration or the webinar.',
      'Usage Data: Information about your interactions with the webinar, such as attendance, participation in polls or Q&A sessions, and any messages or questions you submit.',
      'Technical Data: IP address, browser type, device information, and other technical data collected via cookies and similar technologies.',
    ],
  },
  {
    num: '03',
    title: 'How We Use Your Information',
    body: 'We use the collected information to:',
    bullets: [
      'Register and manage your participation in the webinar or resource.',
      'Communicate with you about the content, including sending reminders and follow-up materials.',
      'Improve the content and delivery of our content.',
      'Respond to your inquiries and provide support.',
      'Analyze attendance and participation to enhance future webinars.',
      'Comply with legal obligations and protect our legal rights.',
      'Marketing communications from Chew on This or its sponsors.',
    ],
  },
  {
    num: '04',
    title: 'Sharing Your Information',
    body: 'We do not sell or rent your personal information. We may share your information with:',
    bullets: [
      'Service Providers: Third-party vendors who assist us in organizing and delivering the webinar.',
      'Communications: Chew on This or its affiliated sponsors may provide marketing communications to you.',
      'Affiliates: Our affiliated companies for purposes consistent with this Privacy Policy.',
      'Legal Requirements: If required by law or to protect our rights, we may disclose your information to authorities.',
    ],
  },
  {
    num: '05',
    title: 'Data Security',
    body: 'We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet transmission is completely secure, and we cannot guarantee absolute security.',
  },
  {
    num: '06',
    title: 'Your Rights',
    body: 'You have the right to:',
    bullets: [
      'Access, update, or delete your personal information.',
      'Withdraw your consent at any time where we rely on your consent to process your information.',
      'Object to or restrict the processing of your personal information.',
    ],
    after: 'To exercise these rights, please contact us at hello@chewonthis.io.',
  },
  {
    num: '07',
    title: 'Retention of Information',
    body: 'We retain your personal information only as long as necessary for the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.',
  },
  {
    num: '08',
    title: 'Third-Party Links',
    body: 'Our webinar may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties. We encourage you to read their privacy policies.',
  },
  {
    num: '09',
    title: 'Changes to This Privacy Policy',
    body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically.',
  },
  {
    num: '10',
    title: 'Contact Us',
    body: 'If you have any questions about this Privacy Policy or our data practices, please contact us:',
    contact: true,
  },
]

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#09090B', fontFamily: "'DM Sans', sans-serif", color: '#C4C4C8' }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#fff', textDecoration: 'none', letterSpacing: '-0.02em' }}>
          Brands<span style={{ color: '#3ECF8E' }}>Bro</span>
        </Link>
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#71717A', textDecoration: 'none', transition: 'color 0.25s' }}>
          ← Back to Home
        </Link>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '72px 40px 48px' }}>
        <div style={{ display: 'inline-block', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3ECF8E', background: 'rgba(62,207,142,0.08)', border: '1px solid rgba(62,207,142,0.22)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
          Legal
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F4F4F5', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 16 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#52525B' }}>
          Effective date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(62,207,142,0.3), transparent)' }} />
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '56px 40px 100px' }}>
        {sections.map((sec, i) => (
          <div key={sec.num} style={{ marginBottom: 52, paddingBottom: 52, borderBottom: i < sections.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

              {/* Number */}
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '2rem', color: '#ffffff', lineHeight: 1, flexShrink: 0, minWidth: 44, paddingTop: 4 }}>
                {sec.num}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: '#F4F4F5', marginBottom: 14, letterSpacing: '-0.01em' }}>
                  {sec.title}
                </h2>
                <p style={{ fontSize: '0.95rem', color: '#A1A1AA', lineHeight: 1.8, marginBottom: sec.bullets ? 16 : 0 }}>
                  {sec.body}
                </p>

                {sec.bullets && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: sec.after ? 16 : 0 }}>
                    {sec.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.9rem', color: '#A1A1AA', lineHeight: 1.7 }}>
                        <span style={{ color: '#3ECF8E', fontSize: '0.75rem', marginTop: 5, flexShrink: 0 }}>→</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {sec.after && (
                  <p style={{ fontSize: '0.95rem', color: '#A1A1AA', lineHeight: 1.8 }}>{sec.after}</p>
                )}

                {sec.contact && (
                  <div style={{ marginTop: 8, background: '#111113', border: '1px solid rgba(62,207,142,0.18)', borderRadius: 12, padding: '24px 28px' }}>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#F4F4F5', marginBottom: 8 }}>Chew On This</p>
                    <p style={{ fontSize: '0.9rem', color: '#A1A1AA', lineHeight: 1.7 }}>
                      <a href="mailto:Hello@chewonthis.io" style={{ color: '#3ECF8E', textDecoration: 'none' }}>Hello@chewonthis.io</a>
                      <br />78 John Miller Way, Kearny, NJ 07032
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
          Brands<span style={{ color: '#3ECF8E' }}>Bro</span>
        </span>
        <span style={{ fontSize: '0.8rem', color: '#52525B' }}>© {new Date().getFullYear()} BrandsBro. All rights reserved.</span>
      </div>
    </div>
  )
}
