import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';
import { useProducts, type Product } from '@/components/FeaturedCollection';

const ELAN_ORDER = [
  'SP-EL-1234', 'SP-EL-1235', 'SP-EL-1237', 'SP-EL-1239',
  'SP-EL-1236', 'SP-EL-1238', 'SP-EL-50',
];

function applyElanOrder(products: Product[]): Product[] {
  const priority = new Map(ELAN_ORDER.map((code, i) => [code, i]));
  return [...products].sort((a, b) => {
    const ia = priority.has(a.code) ? priority.get(a.code)! : 999;
    const ib = priority.has(b.code) ? priority.get(b.code)! : 999;
    return ia - ib;
  });
}

const PAGE_SIZE = 9;

const COLLECTION_LABELS: Record<string, string> = {
  belle: 'BELLE',
  elan: 'ELÁN',
  ease: 'EASE',
};

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const img1 = product.images[0];
  const img2 = product.images[1];
  const outOfStock = product.stockQuantity === 0;

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', backgroundColor: '#EDE5D8' }}>
        <img
          src={img1}
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            opacity: outOfStock ? 0.65 : hovered && img2 ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        />
        {img2 && !outOfStock && (
          <img
            src={img2}
            alt={product.name}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        )}
        {/* Collection badge */}
        {product.collection && COLLECTION_LABELS[product.collection] && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 500,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            background: '#1A1814', color: '#C4B49A',
            padding: '3px 10px',
          }}>
            {COLLECTION_LABELS[product.collection]}
          </span>
        )}
        {/* Out of Stock overlay */}
        {outOfStock && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(26,24,20,0.38)',
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 500,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#F5F0E8', padding: '5px 12px',
              border: '1px solid rgba(245,240,232,0.55)',
            }}>
              Out of Stock
            </span>
          </div>
        )}
      </div>
      {/* Info */}
      <div style={{ paddingTop: '14px' }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 400,
          color: '#3D3A34', marginBottom: '6px', lineHeight: 1.4,
        }}>
          {product.name}
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 500,
          color: outOfStock ? '#8A7F6E' : '#1A1814', letterSpacing: '0.01em',
        }}>
          {product.price}
        </p>
      </div>
    </Link>
  );
}

export default function CollectionsAll() {
  const { data: allProducts, isLoading, isError } = useProducts();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered = (() => {
    const list = activeFilter === 'all'
      ? (allProducts ?? [])
      : (allProducts ?? []).filter((p) => p.collection === activeFilter);
    return activeFilter === 'elan' ? applyElanOrder(list) : list;
  })();

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'belle', label: 'BELLE' },
    { key: 'elan', label: 'ELÁN' },
    { key: 'ease', label: 'EASE' },
  ];

  return (
    <div style={{ backgroundColor: '#F5F0E8', minHeight: '100vh' }}>
      <SemperaNav />

      {/* Header */}
      <div style={{
        backgroundColor: '#1A1814',
        paddingTop: '140px', paddingBottom: '64px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '16px',
        }}>
          Sempéra Fashion
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
          fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
          color: '#F5F0E8', lineHeight: 1.05, marginBottom: '0',
        }}>
          All Collections
        </h1>
      </div>

      {/* Filter bar */}
      <div style={{
        backgroundColor: '#F5F0E8',
        borderBottom: '0.5px solid rgba(196,180,154,0.35)',
        padding: '0 24px',
        display: 'flex', justifyContent: 'center',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', gap: '0' }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setVisibleCount(PAGE_SIZE); }}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: activeFilter === f.key ? '#1A1814' : '#8A7F6E',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '18px 24px',
                borderBottom: activeFilter === f.key ? '1.5px solid #1A1814' : '1.5px solid transparent',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 100px' }}>
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Loader2 size={28} style={{ color: '#C4B49A', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          </div>
        )}

        {isError && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#8A7F6E' }}>
              Could not load products. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#8A7F6E' }}>
              No products found.
            </p>
          </div>
        )}

        {!isLoading && !isError && visible.length > 0 && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px 28px',
            }}
              className="collections-grid"
            >
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '64px' }}>
                <button
                  onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    background: 'transparent', color: '#1A1814',
                    border: '1px solid #C4B49A',
                    padding: '14px 40px', cursor: 'pointer',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#EDE5D8')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  Load More
                </button>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300,
                  color: '#8A7F6E', marginTop: '12px',
                }}>
                  Showing {visible.length} of {filtered.length}
                </p>
              </div>
            )}

            {!hasMore && filtered.length > PAGE_SIZE && (
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
                fontWeight: 300, fontSize: '1rem', color: '#8A7F6E',
                textAlign: 'center', marginTop: '56px',
              }}>
                You've seen everything.
              </p>
            )}
          </>
        )}
      </div>

      <SemperaFooter />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .collections-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .collections-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px 12px !important; }
        }
      `}</style>
    </div>
  );
}
