const pillars = [
  {
    icon: '✦',
    title: 'Premium Fabrics',
    description: 'Only the finest materials — silk charmeuse, Italian wool, and premium linen — grace every Sempera design.',
  },
  {
    icon: '◈',
    title: 'Intentional Design',
    description: 'Every cut, seam, and silhouette is considered with purpose. Nothing is accidental. Everything is graceful.',
  },
  {
    icon: '◇',
    title: 'Elegant Tailoring',
    description: 'Precision in every stitch. Our garments are tailored to move with you, celebrating the feminine form.',
  },
  {
    icon: '◉',
    title: 'Timeless Silhouettes',
    description: 'Beyond trend. Sempera pieces are crafted to be worn season after season, year after year.',
  },
];

export default function WhySection() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <p className="section-eyebrow mb-4">The Sempera Promise</p>
          <h2
            className="font-serif text-foreground"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300 }}
          >
            Why Choose Sempera
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`text-center reveal delay-${(i + 1) * 100}`}
            >
              <div
                className="font-serif text-primary mx-auto mb-6 w-14 h-14 flex items-center justify-center border border-primary/30 rounded-none"
                style={{ fontSize: '1.5rem' }}
              >
                {pillar.icon}
              </div>
              <h3
                className="font-serif text-foreground mb-3"
                style={{ fontSize: '1.25rem', fontWeight: 400 }}
              >
                {pillar.title}
              </h3>
              <span className="gold-divider mx-auto mb-4" />
              <p
                className="font-sans text-muted-foreground"
                style={{ fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300 }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
