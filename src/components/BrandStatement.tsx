import { Link } from 'react-router-dom';

export default function BrandStatement() {
  return (
    <section style={{
      backgroundColor: '#F5F0E8',
      padding: '120px 24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          color: '#1A1814',
          lineHeight: 1.25,
          marginBottom: '36px',
        }}>
          Beautiful clothing. Ready when you are.
        </h2>

        <div style={{ width: '40px', height: '1px', background: '#C4B49A', margin: '0 auto 36px' }} />

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          fontWeight: 300,
          color: '#3D3A34',
          lineHeight: 1.85,
          marginBottom: '20px',
        }}>
          At Sempéra, we believe beautiful clothing should be ready when life happens.
        </p>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          fontWeight: 300,
          color: '#3D3A34',
          lineHeight: 1.85,
          marginBottom: '20px',
        }}>
          Thoughtfully designed pieces for everyday life and the occasions that matter most.
          So getting dressed feels effortless.
        </p>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          fontWeight: 300,
          color: '#3D3A34',
          lineHeight: 1.85,
          marginBottom: '48px',
        }}>
          Because the best clothes don't just look beautiful. They make getting dressed
          the easiest part of your day.
        </p>

        <Link
          to="/our-story"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#1A1814',
            textDecoration: 'none',
            display: 'inline-block',
            padding: '14px 36px',
            border: '1px solid #C4B49A',
          }}
        >
          Our Story
        </Link>

      </div>
    </section>
  );
}
