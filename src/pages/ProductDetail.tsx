import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';
import RequestModal from '@/components/RequestModal';
import { PRODUCTS, type Product } from '@/components/FeaturedCollection';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl mb-4">Product not found</h2>
          <Link to="/" className="btn-gold">Return Home</Link>
        </div>
      </div>
    );
  }

  const images = product.images.map((src, i) => ({
    src,
    label: i === 0 ? 'Front View' : `View ${i + 1}`,
  }));

  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in: ${product.name} (${product.code}) — ${product.price}`
  );

  const nextImg = () => setActiveImg((prev) => (prev + 1) % images.length);
  const prevImg = () => setActiveImg((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-background">
      <SemperaNav onRequestPiece={() => setModalOpen(true)} />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-sans text-muted-foreground hover:text-primary transition-colors duration-300"
            style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            <ChevronLeft size={14} />
            Back to Collection
          </Link>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image with Arrows */}
              <div className="aspect-[3/4] overflow-hidden bg-cream relative group">
                <img
                  src={images[activeImg].src}
                  alt={images[activeImg].label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImg}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImg}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="w-20 aspect-square overflow-hidden border-2 transition-all duration-300 flex-shrink-0"
                    style={{
                      borderColor: activeImg === i ? 'hsl(var(--primary))' : 'transparent',
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:pt-4 space-y-7">
              <div>
                <p className="section-eyebrow text-muted-foreground mb-2">{product.code}</p>
                <h1
                  className="font-serif text-foreground mb-3"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, lineHeight: 1.1 }}
                >
                  {product.name}
                </h1>
                <p
                  className="font-sans text-muted-foreground mb-3"
                  style={{ fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 300 }}
                >
                  {product.description}
                </p>
                <p
                  className="font-sans text-foreground"
                  style={{ fontSize: '1.3rem', fontWeight: 400, letterSpacing: '0.03em' }}
                >
                  {product.price}
                </p>
              </div>

              <span className="gold-divider" />

              {/* Sizes */}
              <div>
                <h3
                  className="font-sans text-foreground mb-3"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400 }}
                >
                  Available Sizes
                </h3>
                <p className="font-sans text-muted-foreground" style={{ fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 }}>
                  {product.sizes}
                </p>
              </div>

              {/* Fabric Details */}
              <div>
                <h3
                  className="font-sans text-foreground mb-3"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400 }}
                >
                  Fabric Details
                </h3>
                <p className="font-sans text-muted-foreground" style={{ fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 }}>
                  {product.fabric}
                </p>
              </div>

              {/* Care Instructions */}
              <div>
                <h3
                  className="font-sans text-foreground mb-3"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400 }}
                >
                  Care Instructions
                </h3>
                <ul
                  className="font-sans text-muted-foreground space-y-1"
                  style={{ fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300 }}
                >
                  <li>— Dry clean recommended</li>
                  <li>— Hand wash cold if applicable</li>
                  <li>— Do not tumble dry</li>
                  <li>— Iron on low heat with care</li>
                </ul>
              </div>

              <span className="gold-divider" />

              {/* CTA */}
              <div className="space-y-4 pt-2">
                <button onClick={() => setModalOpen(true)} className="btn-gold w-full">
                  Request This Piece
                </button>
                <a
                  href={`https://wa.me/447000000000?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold w-full"
                  style={{ textDecoration: 'none' }}
                >
                  Enquire via WhatsApp
                </a>
                <p
                  className="text-center font-sans text-muted-foreground"
                  style={{ fontSize: '0.78rem', letterSpacing: '0.05em', fontWeight: 300 }}
                >
                  Our stylist will respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SemperaFooter />

      {modalOpen && (
        <RequestModal product={product} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
