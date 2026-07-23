const PILLARS = [
  {
    title: 'Intentional',
    body: 'Every design decision is deliberate. Nothing is accidental. Nothing is filler.',
  },
  {
    title: 'Feminine',
    body: "Not soft for softness’s sake — feminine because that is a form of power.",
  },
  {
    title: 'Enduring',
    body: 'We do not chase trends. We build pieces that outlast them.',
  },
  {
    title: 'Honest',
    body: "We say what a garment is, what it's made of, and who made it.",
  },
];

export default function ManifestoBand() {
  return (
    <section
      style={{
        backgroundColor: '#1A1814',
        borderTop: '1px solid rgba(196,180,154,0.15)',
        borderBottom: '1px solid rgba(196,180,154,0.15)',
      }}
    >
      <div
        className="manifesto-grid"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {PILLARS.map((p, i) => (
          <div
            key={p.title}
            style={{
              padding: '52px 32px',
              borderLeft: i > 0 ? '1px solid rgba(196,180,154,0.15)' : 'none',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1.4rem, 2vw, 1.75rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '14px',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              {p.title}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.62)',
                lineHeight: 1.75,
              }}
            >
              {p.body}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .manifesto-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .manifesto-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
