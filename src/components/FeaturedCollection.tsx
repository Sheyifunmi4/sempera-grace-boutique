import { Link } from 'react-router-dom';
import p1Front from '@/assets/product-1-front.jpg';
import p1Back from '@/assets/product-1-back.jpg';
import p2Front from '@/assets/product-2-front.jpg';
import p2Back from '@/assets/product-2-back.jpg';
import p3Front from '@/assets/product-3-front.jpg';
import p3Back from '@/assets/product-3-back.jpg';

export interface Product {
  id: string;
  code: string;
  name: string;
  price: string;
  frontImg: string;
  backImg: string;
  fabric: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    code: 'SP-GC-001',
    name: 'The Champagne Power Suit',
    price: '£485',
    frontImg: p1Front,
    backImg: p1Back,
    fabric: '82% Wool, 18% Elastane',
  },
  {
    id: '2',
    code: 'SP-GC-002',
    name: 'Ivory Draped Midi Dress',
    price: '£320',
    frontImg: p2Front,
    backImg: p2Back,
    fabric: '100% Silk Charmeuse',
  },
  {
    id: '3',
    code: 'SP-GC-003',
    name: 'Sage Grace Two-Piece Set',
    price: '£395',
    frontImg: p3Front,
    backImg: p3Back,
    fabric: '95% Linen, 5% Elastane',
  },
];

interface ProductCardProps {
  product: Product;
  onRequest: (product: Product) => void;
}

export function ProductCard({ product, onRequest }: ProductCardProps) {
  return (
    <div className="product-card group">
      {/* Image Container */}
      <div className="product-card-img aspect-[3/4] bg-cream relative overflow-hidden mb-5">
        <img
          src={product.frontImg}
          alt={product.name}
          className="front w-full h-full object-cover"
        />
        <img
          src={product.backImg}
          alt={`${product.name} — back view`}
          className="back w-full h-full object-cover"
        />
        {/* Hover label */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="section-eyebrow bg-background/90 backdrop-blur-sm px-4 py-2 text-muted-foreground">
            Back View
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <p className="section-eyebrow text-muted-foreground">{product.code}</p>
        <Link to={`/product/${product.id}`}>
          <h3
            className="font-serif text-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
            style={{ fontSize: '1.35rem', fontWeight: 400 }}
          >
            {product.name}
          </h3>
        </Link>
        <p
          className="font-sans text-foreground"
          style={{ fontSize: '1rem', fontWeight: 400, letterSpacing: '0.04em' }}
        >
          {product.price}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
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

interface FeaturedCollectionProps {
  onRequest: (product: Product) => void;
}

export default function FeaturedCollection({ onRequest }: FeaturedCollectionProps) {
  return (
    <section id="collection" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-eyebrow mb-4">Sempera Fashion</p>
          <h2
            className="font-serif text-foreground mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300 }}
          >
            The Grace Collection
          </h2>
          <span className="gold-divider mx-auto mb-5" />
          <p
            className="font-sans text-muted-foreground max-w-lg mx-auto"
            style={{ fontSize: '1rem', lineHeight: 1.8, fontWeight: 300 }}
          >
            Timeless silhouettes. Refined tailoring. Effortless elegance.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {PRODUCTS.map((product, i) => (
            <div key={product.id} className={`reveal delay-${(i + 1) * 100}`}>
              <ProductCard product={product} onRequest={onRequest} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
