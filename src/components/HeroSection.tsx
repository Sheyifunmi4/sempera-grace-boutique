interface HeroSectionProps {
  onExplore: () => void;
  onRequest: () => void;
}

export default function HeroSection({ onExplore, onRequest }: HeroSectionProps) {
  return (
    <section className="relative h-screen min-h-[680px] flex items-end overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-top"
          poster=""
        >
          <source src="/hero-video.mov" type="video/quicktime" />
          <source src="/hero-video.mov" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.60) 100%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="max-w-2xl animate-fade-in-up">
          <p className="section-eyebrow text-white/80 mb-4 delay-100" style={{ fontFamily: "'Playfair Display', serif" }}>
            The ELÁN Collection
          </p>
          <h1
            className="text-white mb-6"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              lineHeight: 1.0,
              fontWeight: 300,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Designed<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>with Grace.</em>
          </h1>
          <p
            className="text-white/80 font-sans mb-10 delay-200 animate-fade-in-up"
            style={{ fontSize: '1.05rem', fontWeight: 300, letterSpacing: '0.02em', lineHeight: 1.7 }}
          >
            Luxury Ready-to-Wear for the Modern Woman.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
            <button onClick={onExplore} className="btn-gold">
              Explore Collection
            </button>
            <button onClick={onRequest} className="btn-outline-white">
              Request a Piece
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 lg:right-12 flex flex-col items-center gap-2 animate-fade-in delay-600">
        <span className="section-eyebrow text-white/60" style={{ fontSize: '0.6rem' }}>Scroll</span>
        <div className="w-px h-10 bg-white/40" />
      </div>
    </section>
  );
}
