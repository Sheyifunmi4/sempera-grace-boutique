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

      {/* Content — bottom-left per brief */}
      <div
        className="relative z-10 flex flex-col justify-end w-full"
        style={{ minHeight: '100vh', paddingBottom: '72px' }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12">
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(3.2rem, 6.5vw, 72px)',
              lineHeight: 1.0,
              color: '#F5F0E8',
              marginBottom: '32px',
              letterSpacing: '-0.01em',
              textShadow: '0 2px 24px rgba(26,24,20,0.5)',
            }}>
              Designed with Grace.
            </h1>
            <button
              onClick={onExplore}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                background: '#1A1814',
                color: '#F5F0E8',
                padding: '16px 40px',
                border: 'none',
                borderRadius: '0',
                cursor: 'pointer',
              }}
            >
              Shop the Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
