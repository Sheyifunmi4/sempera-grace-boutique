import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const footerLinks = {
  Shop: [
    { label: 'All Products', to: '/#collection' },
    { label: 'BELLE Collection', to: '/collection/belle' },
    { label: 'EASE Collection', to: '/collection/ease' },
    { label: 'ELÁN Collection', to: '/collection/elan' },
  ],
  Collections: [
    { label: 'All Collections', to: '/collections' },
    { label: 'BELLE', to: '/collections' },
    { label: 'ELÁN', to: '/collections' },
    { label: 'EASE', to: '/collections' },
  ],
  Help: [
    { label: 'Size Guide', to: '/size-guide' },
    { label: 'Care Guide', to: '/care-guide' },
    { label: 'Contact', to: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/policies?tab=privacy' },
    { label: 'Cookies Policy', to: '/policies?tab=cookies' },
    { label: 'Refund Policy', to: '/policies?tab=refund' },
    { label: 'Delivery Policy', to: '/policies?tab=delivery' },
  ],
};

const LINK_STYLE: CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '13px',
  fontWeight: 300,
  color: '#C4B49A',
  textDecoration: 'none',
  lineHeight: 1.6,
  transition: 'color 0.25s ease',
};

const HEADING_STYLE: CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '10px',
  fontWeight: 400,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#8A7F6E',
  marginBottom: '20px',
};

export default function SemperaFooter() {
  return (
    <>
      {/* Email capture strip — sits above the dark footer */}
      <div style={{ backgroundColor: '#1A1814', padding: '56px 24px' }}>
        <div className="max-w-7xl mx-auto" style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#F5F0E8',
              marginBottom: '28px',
            }}
          >
            Join the Sempéra edit — be the first to know.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'flex', justifyContent: 'center', gap: '0', maxWidth: '440px', margin: '0 auto' }}
          >
            <input
              type="email"
              placeholder="Your email address"
              style={{
                flex: 1,
                padding: '13px 18px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 300,
                background: 'rgba(245,240,232,0.07)',
                border: '1px solid rgba(196,180,154,0.4)',
                borderRight: 'none',
                color: '#F5F0E8',
                outline: 'none',
                borderRadius: '4px 0 0 4px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '13px 22px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: '#C4B49A',
                color: '#1A1814',
                border: 'none',
                borderRadius: '0 4px 4px 0',
                cursor: 'pointer',
              }}
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <footer style={{ backgroundColor: '#1A1814', borderTop: '0.5px solid rgba(196,180,154,0.2)', paddingTop: '64px', paddingBottom: '48px' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '48px',
              marginBottom: '56px',
            }}
          >
            {/* Shop column */}
            <div>
              <p style={HEADING_STYLE}>Shop</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {footerLinks.Shop.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} style={LINK_STYLE} onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F0E8')} onMouseLeave={(e) => (e.currentTarget.style.color = '#C4B49A')}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collections column */}
            <div>
              <p style={HEADING_STYLE}>Collections</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {footerLinks.Collections.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} style={LINK_STYLE} onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F0E8')} onMouseLeave={(e) => (e.currentTarget.style.color = '#C4B49A')}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help column */}
            <div>
              <p style={HEADING_STYLE}>Help</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {footerLinks.Help.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} style={LINK_STYLE} onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F0E8')} onMouseLeave={(e) => (e.currentTarget.style.color = '#C4B49A')}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal column */}
            <div>
              <p style={HEADING_STYLE}>Legal</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {footerLinks.Legal.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} style={LINK_STYLE} onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F0E8')} onMouseLeave={(e) => (e.currentTarget.style.color = '#C4B49A')}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow column */}
            <div>
              <p style={HEADING_STYLE}>Follow Us</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <a href="https://instagram.com/sempera_fashion" target="_blank" rel="noopener noreferrer" style={LINK_STYLE} onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F0E8')} onMouseLeave={(e) => (e.currentTarget.style.color = '#C4B49A')}>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/2348027825606" target="_blank" rel="noopener noreferrer" style={LINK_STYLE} onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F0E8')} onMouseLeave={(e) => (e.currentTarget.style.color = '#C4B49A')}>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@semperafashion.com" style={LINK_STYLE} onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F0E8')} onMouseLeave={(e) => (e.currentTarget.style.color = '#C4B49A')}>
                    Email Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar + brand signature */}
          <div style={{ borderTop: '0.5px solid rgba(196,180,154,0.2)', paddingTop: '32px', textAlign: 'center' }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '1.1rem',
                color: '#C4B49A',
                marginBottom: '12px',
              }}
            >
              Sempéra. Designed with grace.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 300,
                color: '#8A7F6E',
                letterSpacing: '0.05em',
              }}
            >
              © {new Date().getFullYear()} Sempéra Fashion. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
