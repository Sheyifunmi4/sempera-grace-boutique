import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-foreground">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center reveal">
        <p className="section-eyebrow mb-5" style={{ color: 'hsl(38 38% 62%)' }}>
          Join the Community
        </p>
        <h2
          className="font-serif mb-5"
          style={{
            color: 'hsl(38 25% 96%)',
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            fontWeight: 300,
          }}
        >
          Join the Sempera Woman
        </h2>
        <span className="gold-divider mx-auto mb-7" />
        <p
          className="font-sans mb-10"
          style={{
            color: 'hsl(38 15% 72%)',
            fontSize: '1rem',
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          Be the first to experience new collections, exclusive pieces, and timeless elegance.
        </p>

        {submitted ? (
          <div
            className="font-serif"
            style={{ color: 'hsl(38 38% 62%)', fontSize: '1.3rem', fontStyle: 'italic' }}
          >
            Thank you for joining the Sempera Woman.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-5 py-3 bg-transparent border font-sans text-sm outline-none transition-colors duration-300 focus:border-primary"
              style={{
                borderColor: 'hsl(38 15% 35%)',
                color: 'hsl(38 25% 92%)',
                fontWeight: 300,
                letterSpacing: '0.03em',
              }}
            />
            <button type="submit" className="btn-gold whitespace-nowrap">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
