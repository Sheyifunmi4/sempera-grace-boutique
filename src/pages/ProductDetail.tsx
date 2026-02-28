import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';
import RequestModal from '@/components/RequestModal';
import { fetchProductById, type Product } from '@/components/FeaturedCollection';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setActiveImg(0);
    fetchProductById(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SemperaNav />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="font-serif text-primary text-3xl mb-4 animate-pulse">✦</div>
            <p className="font-sans text-muted-foreground" style={{ fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Loading...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <SemperaNav />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-serif text-2xl mb-4">Product not found</h2>
            <Link to="/" className="btn-gold">Return Home</Link>
          </div>
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

      <main className="pt-32">
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
                    style={{ borderColor: activeImg === i ? 'hsl(var(--primary))' : 'transparent' }}
                  >
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
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
                  className="font-sans text-muted-foreground mb-4"
                  style={{ fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 300 }}
                >
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="font-sans text-muted-foreground line-through" style={{ fontSize: '1rem', fontWeight: 300 }}>
                    {product.originalPrice}
                  </span>
                  <span className="font-sans" style={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '0.03em', color: '#b8965a' }}>
                    {product.price}
                  </span>
                </div>

                {/* Delivery Info */}
                <div style={{ marginTop: '16px', padding: '14px 18px', background: 'hsl(var(--muted)/0.4)', borderLeft: '3px solid #b8965a' }}>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b8965a', marginBottom: '10px', fontWeight: 400 }}>
                    Delivery
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'hsl(var(--muted-foreground))', fontWeight: 300 }}>
                      📍 <strong style={{ fontWeight: 400, color: 'hsl(var(--foreground))' }}>Lagos:</strong> 3–5 working days
                    </p>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'hsl(var(--muted-foreground))', fontWeight: 300 }}>
                      🇳🇬 <strong style={{ fontWeight: 400, color: 'hsl(var(--foreground))' }}>Outside Lagos:</strong> 5–7 working days
                    </p>
                    <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.82rem', color: 'hsl(var(--muted-foreground))', fontWeight: 300 }}>
                      🌍 <strong style={{ fontWeight: 400, color: 'hsl(var(--foreground))' }}>International:</strong> timeline advised on request
                    </p>
                  </div>
                </div>
              </div>

              <span className="gold-divider" />

              {/* Sizes */}
              <div>
                <h3 className="font-sans text-foreground mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400 }}>
                  Available Sizes
                </h3>
                <p className="font-sans text-muted-foreground" style={{ fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 }}>
                  {product.sizes}
                </p>
              </div>

              {/* Fabric Details */}
              {product.fabric && (
                <div>
                  <h3 className="font-sans text-foreground mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400 }}>
                    Fabric Details
                  </h3>
                  <p className="font-sans text-muted-foreground" style={{ fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 }}>
                    {product.fabric}
                  </p>
                </div>
              )}

              {/* Care Instructions */}
              {product.care && (
                <div>
                  <h3 className="font-sans text-foreground mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400 }}>
                    Care Instructions
                  </h3>
                  <p className="font-sans text-muted-foreground" style={{ fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 }}>
                    {product.care}
                  </p>
                </div>
              )}

              <span className="gold-divider" />

              {/* CTA */}
              <div className="space-y-4 pt-2">
                <button onClick={() => setModalOpen(true)} className="btn-gold w-full">
                  Request This Piece
                </button>
                <a
                  href={`https://wa.me/2348027825606?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold w-full"
                  style={{ textDecoration: 'none' }}
                >
                  Enquire via WhatsApp
                </a>
                <p className="text-center font-sans text-muted-foreground" style={{ fontSize: '0.78rem', letterSpacing: '0.05em', fontWeight: 300 }}>
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