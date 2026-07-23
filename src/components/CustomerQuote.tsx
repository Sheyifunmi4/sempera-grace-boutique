export default function CustomerQuote() {
  return (
    <section style={{
      backgroundColor: '#EDE5D8',
      padding: '100px 24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C4B49A',
          marginBottom: '40px',
        }}>
          ✦
        </p>

        <blockquote style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
          color: '#1A1814',
          lineHeight: 1.65,
          margin: '0 0 40px',
          padding: 0,
          border: 'none',
        }}>
          "I put on my Sempéra dress and for the first time in a long time,
          I felt like the most beautiful version of myself — not dressed up,
          just completely, quietly myself."
        </blockquote>

        <div style={{ width: '36px', height: '1px', background: '#C4B49A', margin: '0 auto' }} />

      </div>
    </section>
  );
}
