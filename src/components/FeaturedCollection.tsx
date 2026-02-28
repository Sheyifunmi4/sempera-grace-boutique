import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Supabase Config ───────────────────────────────────────────────
const SUPABASE_URL: string = 'https://sieqvcjiqdjhjnxaslrd.supabase.co';
const SUPABASE_KEY: string = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpZXF2Y2ppcWRqaGpueGFzbHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4Nzk4NjIsImV4cCI6MjA4NzQ1NTg2Mn0',
  'E1VkbPUJ9_u_pyhIXMZb5WWrXYQvIdEY-z3dIqZp7Mc'
].join('.');

function getHeaders(): Record<string, string> {
  return {
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
    'Content-Type': 'application/json',
  };
}
// ───────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  images: string[];
  fabric: string;
  care: string;
  sizes: string;
  status: string;
}

function mapRow(row: any): Product {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    description: row.description || '',
    price: row.price || '',
    originalPrice: row.original_price || '',
    images: Array.isArray(row.image_urls) && row.image_urls.length > 0
      ? row.image_urls
      : ['https://placehold.co/400x500/f5ead8/b8965a?text=No+Image'],
    fabric: row.fabric || '',
    care: row.care || '',
    sizes: row.sizes || '6–22',
    status: row.status || 'active',
  };
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/products?status=neq.hidden&order=code.asc&select=*`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );
    if (!res.ok) {
      const err = await res.text();
      console.error('Supabase fetch error:', res.status, err);
      throw new Error(`Failed to fetch products: ${res.status}`);
    }
    const data = await res.json();
    console.log('✓ Products loaded from Supabase:', data.length);
    return data.map(mapRow);
  } catch (err) {
    console.error('fetchProducts error:', err);
    throw err;
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/products?id=eq.${id}&select=*`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] ? mapRow(data[0]) : null;
  } catch (err) {
    console.error('fetchProductById error:', err);
    return null;
  }
}

// ─── Product Card ─────────────────────────────────────────────────
interface ProductCardProps {
  product: Product;
  onRequest: (product: Product) => void;
}

export function ProductCard({ product, onRequest }: ProductCardProps) {
  const [currentImg, setCurrentImg] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % product.images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="product-card group h-full flex flex-col">
      <div className="aspect-[3/4] bg-cream relative overflow-hidden mb-5 flex-shrink-0">
        <img
          src={product.images[currentImg]}
          alt={`${product.name} — view ${currentImg + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = 'https://placehold.co/400x500/f5ead8/b8965a?text=Image+Unavailable';
          }}
        />
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImg(i); }}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === currentImg ? 'hsl(var(--primary))' : 'hsla(var(--background) / 0.7)',
                  transform: i === currentImg ? 'scale(1.3)' : 'scale(1)',
                }}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 space-y-2">
        <p className="section-eyebrow text-muted-foreground">{product.code}</p>

        <Link to={`/product/${product.id}`}>
          <h3
            className="font-serif text-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
            style={{
              fontSize: '1.35rem', fontWeight: 400,
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.8rem',
            }}
          >
            {product.name}
          </h3>
        </Link>

        <p
          className="font-sans text-muted-foreground"
          style={{
            fontSize: '0.85rem', lineHeight: 1.6, fontWeight: 300,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.72rem',
          }}
        >
          {product.description}
        </p>

        <p className="font-sans text-muted-foreground" style={{ fontSize: '0.78rem', letterSpacing: '0.08em' }}>
          Sizes: {product.sizes}
        </p>

        <div className="flex items-center gap-3 pt-1">
          <span className="font-sans text-muted-foreground line-through" style={{ fontSize: '0.88rem', fontWeight: 300 }}>
            {product.originalPrice}
          </span>
          <span className="font-sans" style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '0.04em', color: '#b8965a' }}>
            {product.price}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 mt-auto">
          <Link to={`/product/${product.id}`} className="btn-outline-gold flex-1 text-center">
            View Details
          </Link>
          <button onClick={() => onRequest(product)} className="btn-gold flex-1">
            Request This Piece
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Featured Collection ──────────────────────────────────────────
interface FeaturedCollectionProps {
  onRequest: (product: Product) => void;
}

export default function FeaturedCollection({ onRequest }: FeaturedCollectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setError('');
      })
      .catch((err) => {
        console.error('Collection load failed:', err);
        setError('Could not load collection. Please refresh.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="collection" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10 reveal">
          <p className="section-eyebrow mb-4">Sempera Fashion</p>
          <h2 className="font-serif text-foreground mb-5" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300 }}>
            The ELÁN Collection
          </h2>
          <span className="gold-divider mx-auto mb-5" />
          <p className="font-sans text-muted-foreground max-w-lg mx-auto" style={{ fontSize: '1rem', lineHeight: 1.8, fontWeight: 300 }}>
            Timeless silhouettes. Refined tailoring. Effortless elegance.
          </p>
        </div>

        {/* Launch Discount Banner */}
        <div className="reveal mb-14" style={{
          background: 'linear-gradient(135deg, #1a1208 0%, #2d1f0a 50%, #1a1208 100%)',
          border: '1px solid #b8965a', borderRadius: '2px',
          padding: '20px 32px', display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center', gap: '12px', textAlign: 'center',
        }}>
          <span style={{ fontSize: '1.1rem' }}>🎉</span>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 500, color: '#b8965a', letterSpacing: '0.04em', margin: 0 }}>
            Launch Discount — Now Live
          </p>
          <span style={{ width: '1px', height: '18px', background: '#b8965a', opacity: 0.5, display: 'inline-block' }} />
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', fontWeight: 300, color: '#e8d5b0', letterSpacing: '0.06em', margin: 0 }}>
            Enjoy introductory pricing on every piece in the ELÁN Collection.
            <span style={{ color: '#b8965a', fontWeight: 400 }}> Limited time only.</span>
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-24">
            <div className="font-serif text-primary text-3xl mb-4 animate-pulse">✦</div>
            <p className="font-sans text-muted-foreground" style={{ fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Loading Collection...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-24">
            <p className="font-sans text-muted-foreground mb-4">{error}</p>
            <button
              onClick={() => { setError(''); setLoading(true); fetchProducts().then(setProducts).catch(() => setError('Could not load collection.')).finally(() => setLoading(false)); }}
              className="btn-gold"
              style={{ fontSize: '0.75rem' }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-14 items-stretch">
            {products.map((product, i) => (
              <div key={product.id} className="flex" style={{ opacity: 1, transform: 'none' }}>
                <ProductCard product={product} onRequest={onRequest} />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-24">
            <p className="font-sans text-muted-foreground">No products available.</p>
          </div>
        )}

      </div>
    </section>
  );
}