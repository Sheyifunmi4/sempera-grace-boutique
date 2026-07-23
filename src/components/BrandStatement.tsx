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
          Designed for the woman who knows who she is.
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
          At Sempéra, we create ready-to-wear pieces for women who want to get dressed
          and feel exactly like themselves — feminine, put-together, and at ease.
        </p>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          fontWeight: 300,
          color: '#3D3A34',
          lineHeight: 1.85,
          marginBottom: '48px',
        }}>
          Every piece begins with one question: does this feel as good as it looks?
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
