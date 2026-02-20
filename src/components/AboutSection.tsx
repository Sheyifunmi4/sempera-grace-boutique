import aboutImage from '@/assets/about-image.jpg';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Editorial Image */}
          <div className="reveal order-2 lg:order-1">
            <div className="relative">
              <div
                className="absolute -top-5 -left-5 w-full h-full border border-primary/20 rounded-none"
                style={{ zIndex: 0 }}
              />
              <img
                src={aboutImage}
                alt="The Sempera Woman"
                className="relative z-10 w-full object-cover"
                style={{ maxHeight: '680px', objectPosition: 'top' }}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 reveal delay-200">
            <p className="section-eyebrow mb-5">Our Story</p>
            <h2
              className="font-serif text-foreground mb-6"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', fontWeight: 300, lineHeight: 1.1 }}
            >
              The Sempera<br />
              <em style={{ fontStyle: 'italic' }}>Woman</em>
            </h2>
            <span className="gold-divider mb-8" />
            <div
              className="font-sans text-muted-foreground space-y-5"
              style={{ fontSize: '1rem', lineHeight: 1.9, fontWeight: 300 }}
            >
              <p>
                At Sempera Fashion, we design with intention and grace. Every piece is crafted to celebrate
                femininity, confidence, and effortless sophistication.
              </p>
              <p>
                We believe fashion is not just clothing — it is presence. It is how you enter a room. It is
                how you carry yourself. It is quiet confidence stitched into every seam.
              </p>
              <p>
                Sempera is for the woman who values elegance, embraces refinement, and dresses with purpose.
              </p>
            </div>
            <div className="mt-10">
              <p className="font-serif text-primary" style={{ fontSize: '1.4rem', fontStyle: 'italic', fontWeight: 300 }}>
                Designed with Grace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
