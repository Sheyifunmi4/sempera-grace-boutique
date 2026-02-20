import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import elanBlueRhinestone1 from '@/assets/elan-blue-rhinestone-1.jpg';
import elanBlueRhinestone2 from '@/assets/elan-blue-rhinestone-2.jpg';
import elanBlueRhinestone3 from '@/assets/elan-blue-rhinestone-3.jpg';
import elanBrownKaftan1 from '@/assets/elan-brown-kaftan-1.jpg';
import elanBrownKaftan2 from '@/assets/elan-brown-kaftan-2.jpg';
import elanRoyalBlue1 from '@/assets/elan-royal-blue-1.jpg';
import elanRoyalBlue2 from '@/assets/elan-royal-blue-2.jpg';
import elanRoyalBlue3 from '@/assets/elan-royal-blue-3.jpg';
import elanRoyalBlue4 from '@/assets/elan-royal-blue-4.jpg';
import elanOliveGreen1 from '@/assets/elan-olive-green-1.jpg';

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  fabric: string;
  sizes: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    code: 'SP-EL-001',
    name: 'Metallic Blue Rhinestone Kaftan',
    description: 'Metallic Blue rich aunty outfit. Available in different colours.',
    price: '₦34,999',
    images: [elanBlueRhinestone1, elanBlueRhinestone2, elanBlueRhinestone3],
    fabric: 'Premium Embellished Fabric',
    sizes: '6–22',
  },
  {
    id: '2',
    code: 'SP-EL-002',
    name: 'Chocolate Sequin-Neck Kaftan',
    description: 'Chocolate Brown rich aunty outfit. Available in different colours.',
    price: '₦34,999',
    images: [elanBrownKaftan1, elanBrownKaftan2],
    fabric: 'Premium Satin with Sequin Embellishment',
    sizes: '6–22',
  },
  {
    id: '3',
    code: 'SP-EL-003',
    name: 'Royal Blue Brocade Set',
    description: 'Royal Blue rich aunty outfit with headwrap. Available in different colours.',
    price: '₦34,999',
    images: [elanRoyalBlue1, elanRoyalBlue2, elanRoyalBlue3, elanRoyalBlue4],
    fabric: 'Brocade & Satin Blend',
    sizes: '6–22',
  },
  {
    id: '4',
    code: 'SP-EL-004',
    name: 'Olive Green Crystal Kaftan',
    description: 'Olive Green rich aunty outfit. Available in different colours.',
    price: '₦34,999',
    images: [elanOliveGreen1],
    fabric: 'Premium Satin with Crystal Detailing',
    sizes: '6–22',
  },
];

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
    <div className="product-card group">
      {/* Image Container with Slideshow */}
      <div className="aspect-[3/4] bg-cream relative overflow-hidden mb-5">
        <img
          src={product.images[currentImg]}
          alt={`${product.name} — view ${currentImg + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Navigation Arrows */}
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

        {/* Dot Indicators */}
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
          className="font-sans text-muted-foreground"
          style={{ fontSize: '0.85rem', lineHeight: 1.6, fontWeight: 300 }}
        >
          {product.description}
        </p>
        <p className="font-sans text-muted-foreground" style={{ fontSize: '0.78rem', letterSpacing: '0.08em' }}>
          Sizes: {product.sizes}
        </p>
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
            The ELÁN Collection
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-14">
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
