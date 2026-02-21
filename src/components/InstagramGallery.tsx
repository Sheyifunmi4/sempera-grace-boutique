export default function InstagramGallery() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <p className="section-eyebrow mb-4">@sempera_fashion</p>
          <h2
            className="font-serif text-foreground mb-6"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300 }}
          >
            Follow Our World
          </h2>
          <p
            className="font-sans text-muted-foreground max-w-md mx-auto mb-10"
            style={{ fontSize: '1rem', lineHeight: 1.8, fontWeight: 300 }}
          >
            Stay connected with the latest from Sempera Fashion.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 reveal">
          <a
            href="https://instagram.com/sempera_fashion"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold min-w-[220px] text-center"
          >
            Follow on Instagram
          </a>
          <a
            href="https://tiktok.com/@sempera_fashion"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold min-w-[220px] text-center"
          >
            Follow on TikTok
          </a>
          <a
            href="https://wa.me/2347032715508"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold min-w-[220px] text-center"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
