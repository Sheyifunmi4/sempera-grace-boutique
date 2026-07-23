interface HeroSectionProps {
  onExplore: () => void;
  onRequest: () => void;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', backgroundColor: '#1A1814' }}
    >
      {/* Full-bleed image */}
      <div className="absolute inset-0">
        <img
          src="/founder-hero.jpg"
          alt="Sempéra — Designed with Grace"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            display: 'block',
            transform: 'scale(1.12)',
            transformOrigin: 'center top',
          }}
        />
        {/* Overlay — uniform dark scrim so every text element pops */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, rgba(26,24,20,0.70) 0%, rgba(26,24,20,0.52) 30%, rgba(26,24,20,0.58) 65%, rgba(26,24,20,0.80) 100%),
              linear-gradient(to right, rgba(26,24,20,0.10) 0%, rgba(26,24,20,0.0) 50%, rgba(26,24,20,0.40) 100%)
            `,
          }}
        />
      </div>

      {/* Content — centered */}
      <div
        className="relative z-10 flex flex-col justify-center items-center w-full"
        style={{ minHeight: '100vh' }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-in-up" style={{ textAlign: 'left' }}>

            {/* Caramel rule + eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '14px', marginBottom: '22px' }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(245,240,232,0.5)' }} />
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                margin: 0,
                textShadow: '0 1px 8px rgba(0,0,0,0.6)',
              }}>
                Luxury Ready-to-Wear · New Season
              </p>
            </div>

            {/* Headline — "Designed with" plain, "Grace." in caramel */}
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: 'clamp(3.6rem, 7vw, 76px)',
              lineHeight: 1.0,
              marginBottom: '24px',
              letterSpacing: '-0.01em',
              textShadow: '0 2px 24px rgba(26,24,20,0.45)',
            }}>
              <span style={{ color: '#FFFFFF' }}>Designed with </span>
              <span style={{ color: '#FFFFFF' }}>Grace.</span>
            </h1>

            {/* Tagline */}
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.1rem, 2.2vw, 20px)',
              color: '#FFFFFF',
              letterSpacing: '0.01em',
              lineHeight: 1.65,
              margin: '0 0 14px',
              maxWidth: '520px',
              textShadow: '0 2px 16px rgba(0,0,0,0.7)',
            }}>
              For women who want to get dressed<br />and feel exactly like themselves.
            </p>

            {/* Supporting body */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.90)',
              letterSpacing: '0.04em',
              lineHeight: 1.8,
              margin: '0 0 2.8rem',
              maxWidth: '400px',
              textTransform: 'uppercase',
              textShadow: '0 1px 10px rgba(0,0,0,0.65)',
            }}>
              Feminine · Put-together · At ease
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              <button
                onClick={onExplore}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  background: '#F5F0E8',
                  color: '#1A1814',
                  padding: '16px 40px',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                Shop the Collection
              </button>
              <button
                onClick={onExplore}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  background: 'transparent',
                  color: '#F5F0E8',
                  padding: '16px 32px',
                  border: '1px solid rgba(245,240,232,0.45)',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                Our Story
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
