import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import elanBlueRhinestone1 from '@/assets/elan-blue-rhinestone-1.jpg';
import elanBlueRhinestone2 from '@/assets/elan-blue-rhinestone-2.jpg';
import elanBlueRhinestone3 from '@/assets/elan-blue-rhinestone-3.jpg';
import elanBlueRhinestone4 from '@/assets/elan-blue-rhinestone-4.jpg';
import elanBlueRhinestone5 from '@/assets/elan-blue-rhinestone-5.jpg';
import elanBlueRhinestone6 from '@/assets/elan-blue-rhinestone-6.jpg';
import elanBrownKaftan1 from '@/assets/elan-brown-kaftan-1.jpg';
import elanBrownKaftan2 from '@/assets/elan-brown-kaftan-2.jpg';
import elanRoyalBlue1 from '@/assets/elan-royal-blue-1.jpg';
import elanRoyalBlue2 from '@/assets/elan-royal-blue-2.jpg';
import elanRoyalBlue3 from '@/assets/elan-royal-blue-3.jpg';
import elanRoyalBlue4 from '@/assets/elan-royal-blue-4.jpg';
import elanOliveGreen1 from '@/assets/elan-olive-green-1.jpg';
import elanBatikLace1 from '@/assets/elan-batik-lace-1.jpg';
import elanBatikLace2 from '@/assets/elan-batik-lace-2.jpg';
import elanMagentaSequin1 from '@/assets/elan-magenta-sequin-1.jpg';
import elanMagentaSequin2 from '@/assets/elan-magenta-sequin-2.jpg';
import elanRedTribal1 from '@/assets/elan-red-tribal-1.jpg';
import elanRedTribal2 from '@/assets/elan-red-tribal-2.jpg';
import elanRedTribal3 from '@/assets/elan-red-tribal-3.jpg';
import elanPurpleRhinestone1 from '@/assets/elan-purple-rhinestone-1.jpg';
import elanPurpleRhinestone2 from '@/assets/elan-purple-rhinestone-2.jpg';
import elanPlaidBurgundy1 from '@/assets/elan-plaid-burgundy-1.jpg';

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
    name: 'Metallic Blue Rhinestone Dress',
    description: 'Metallic Blue premium woman outfit. Available in different colours.',
    price: '₦29,999',
    images: [elanBlueRhinestone1, elanBlueRhinestone2, elanBlueRhinestone3, elanBlueRhinestone4, elanBlueRhinestone5, elanBlueRhinestone6],
    fabric: 'Premium Embellished Fabric',
    sizes: '6–22',
  },
  {
    id: '2',
    code: 'SP-EL-002',
    name: 'Chocolate Sequin-Neck Dress with Aso-Oke sleeves',
    description: 'Chocolate Brown rich aunty outfit. Available in different colours.',
    price: '₦34,999',
    images: [elanBrownKaftan1, elanBrownKaftan2],
    fabric: 'Premium Satin with Sequin Embellishment',
    sizes: '6–22',
  },
  {
    id: '3',
    code: 'SP-EL-003',
    name: 'The Royal Blue Aso-Oke Dress (Limited)',
    description: 'Royal Blue rich aunty outfit with headwrap. Available in different colours.',
    price: '₦59,999',
    images: [elanRoyalBlue1, elanRoyalBlue2, elanRoyalBlue3, elanRoyalBlue4],
    fabric: 'Premium Aso-Oke with Rhinestones',
    sizes: '6–22',
  },
  {
    id: '4',
    code: 'SP-EL-004',
    name: 'Olive Green Crystal Dress',
    description: 'Olive Green graced aunty outfit. Available in different colours.',
    price: '₦24,999',
    images: [elanOliveGreen1],
    fabric: 'Premium Satin with Crystal Detailing',
    sizes: '6–22',
  },
  {
    id: '5',
    code: 'SP-EL-005',
    name: 'Luxury Ankara mixed with Lace',
    description: 'Blue & Pink Batik rich aunty outfit with lace trim. Available in different colours.',
    price: '₦24,999',
    images: [elanBatikLace1, elanBatikLace2],
    fabric: '100% Cotton with Crochet Lace',
    sizes: '6–22',
  },
  {
    id: '6',
    code: 'SP-EL-006',
    name: 'Deep Magenta Sequin Fringe Dress',
    description: 'Deep Magenta rich aunty outfit with sequin fringe detail. Available in different colours.',
    price: '₦19,999',
    images: [elanMagentaSequin1, elanMagentaSequin2],
    fabric: 'Premium fabric with Sequin & Fringe Embellishment',
    sizes: '6–22',
  },
  {
    id: '7',
    code: 'SP-EL-007',
    name: 'Red & Navy Tribal Print Dress',
    description: 'Red & Navy tribal print rich aunty everyday outfit with. Available in different prints.',
    price: '₦14,999',
    images: [elanRedTribal1, elanRedTribal2],
    fabric: 'Tribal Print with Crochet Lace Trim',
    sizes: '6–22',
  },
  {
    id: '8',
    code: 'SP-EL-008',
    name: 'Purple & Black Rhinestone Kaftan',
    description: 'Purple & Black rich aunty outfit with rhinestone detailing. Available in different colours.',
    price: '₦34,999',
    images: [elanPurpleRhinestone1, elanPurpleRhinestone2],
    fabric: 'Premium Fabric with Rhinestone Embellishment',
    sizes: '6–22',
  },
  {
    id: '9',
    code: 'SP-EL-009',
    name: 'Premium Aso-Oke mixed with Satin & Rhinestone',
    description: 'Plaid & Burgundy rich aunty outfit with rhinestone accents. Available in different colours.',
    price: '₦62,999',
    images: [elanPlaidBurgundy1],
    fabric: 'Aso-Oke, Satin and Rhinestone Detail',
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
      <div className="aspect-[3/4] bg-cream relative overflow-hidden mb-5">
        <img
          src={product.images[currentImg]}
          alt={`${product.name} — view ${currentImg + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
