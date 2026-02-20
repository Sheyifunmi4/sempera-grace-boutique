import insta2 from '@/assets/insta-2.jpg';
import insta3 from '@/assets/insta-3.jpg';
import insta4 from '@/assets/insta-4.jpg';
import insta6 from '@/assets/insta-6.jpg';
import insta8 from '@/assets/insta-8.jpg';
import product1 from '@/assets/product-1-front.jpg';
import product2 from '@/assets/product-2-front.jpg';
import product3 from '@/assets/product-3-front.jpg';

const images = [
  { src: insta2, alt: 'Sempera street style' },
  { src: product1, alt: 'The Champagne Power Suit' },
  { src: insta4, alt: 'Sage Collection' },
  { src: insta6, alt: 'Occasion Wear' },
  { src: product2, alt: 'Ivory Draped Midi Dress' },
  { src: insta3, alt: 'Accessories detail' },
  { src: product3, alt: 'Two-Piece Set' },
  { src: insta8, alt: 'Sempera editorial' },
];

export default function InstagramGallery() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <p className="section-eyebrow mb-4">@semperafashion</p>
          <h2
            className="font-serif text-foreground"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300 }}
          >
            Follow Our World
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 reveal">
          {images.map((img, i) => (
            <div key={i} className="insta-grid-item aspect-square cursor-pointer">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <div className="overlay">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ transition: 'opacity 0.3s ease' }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <a
            href="https://instagram.com/semperafashion"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold inline-flex"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
