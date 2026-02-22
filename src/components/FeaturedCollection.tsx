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
import elanOliveGreen2 from '@/assets/elan-olive-green-2.jpg';
import elanOliveGreen3 from '@/assets/elan-olive-green-3.jpg';
import elanOliveGreen4 from '@/assets/elan-olive-green-4.jpg';
import elanOliveGreen5 from '@/assets/elan-olive-green-5.jpg';
import elanBatikLace1 from '@/assets/elan-batik-lace-1.jpg';
import elanBatikLace2 from '@/assets/elan-batik-lace-2.jpg';
import elanMagentaSequin1 from '@/assets/elan-magenta-sequin-1.jpg';
import elanMagentaSequin2 from '@/assets/elan-magenta-sequin-2.jpg';
import elanMagentaSequin3 from '@/assets/elan-magenta-sequin-3.jpg';
import elanRedTribal1 from '@/assets/elan-red-tribal-1.jpg';
import elanRedTribal2 from '@/assets/elan-red-tribal-2.jpg';
import elanRedTribal3 from '@/assets/elan-red-tribal-3.jpg';
import elanPurpleRhinestone1 from '@/assets/elan-purple-rhinestone-1.jpg';
import elanPurpleRhinestone2 from '@/assets/elan-purple-rhinestone-2.jpg';
import elanPlaidBurgundy1 from '@/assets/elan-plaid-burgundy-1.jpg';
import elanPlaidBurgundy2 from '@/assets/elan-plaid-burgundy-2.jpg';
import elanPlaidBurgundy3 from '@/assets/elan-plaid-burgundy-3.jpg';
import elanPlaidBurgundy4 from '@/assets/elan-plaid-burgundy-4.jpg';
import elanPlaidBurgundy5 from '@/assets/elan-plaid-burgundy-5.jpg';
import elanMulticolourAnkara1 from '@/assets/elan-multicolour-ankara-1.jpg';
import elanMulticolourAnkara2 from '@/assets/elan-multicolour-ankara-2.jpg';
import elanMulticolourAnkara3 from '@/assets/elan-multicolour-ankara-3.jpg';
import elanGracefulShort1 from '@/assets/elan-graceful-short-1.jpg';
import elanGracefulShort2 from '@/assets/elan-graceful-short-2.jpg';
import elanGracefulShort3 from '@/assets/elan-graceful-short-3.jpg';
import elanGracefulShort4 from '@/assets/elan-graceful-short-4.jpg';
import elanAnkaraPatch1 from '@/assets/elan-ankara-patch-1.jpg';
import elanAnkaraPatch2 from '@/assets/elan-ankara-patch-2.jpg';
import elanAnkaraPatch3 from '@/assets/elan-ankara-patch-3.jpg';
import elanCrystalBlue1 from '@/assets/elan-crystal-blue-1.jpg';
import elanCrystalBlue2 from '@/assets/elan-crystal-blue-2.jpg';
import elanCrystalBlue3 from '@/assets/elan-crystal-blue-3.jpg';
import elanCrystalBlue4 from '@/assets/elan-crystal-blue-4.jpg';

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
    price: '₦34,999',
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
    images: [elanOliveGreen2, elanOliveGreen3, elanOliveGreen4, elanOliveGreen5, elanOliveGreen1],
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
    price: '₦24,999',
    images: [elanMagentaSequin3, elanMagentaSequin1, elanMagentaSequin2],
    fabric: 'Premium fabric with Sequin & Fringe Embellishment',
    sizes: '6–22',
  },
  {
    id: '7',
    code: 'SP-EL-007',
    name: 'Red & Navy Tribal Print Dress',
    description: 'Red & Navy tribal print rich aunty everyday outfit. Available in different prints.',
    price: '₦14,999',
    images: [elanRedTribal1, elanRedTribal2, elanRedTribal3],
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
    images: [elanPlaidBurgundy1, elanPlaidBurgundy2, elanPlaidBurgundy3, elanPlaidBurgundy4, elanPlaidBurgundy5],
    fabric: 'Aso-Oke, Satin and Rhinestone Detail',
    sizes: '6–22',
  },
  {
    id: '10',
    code: 'SP-EL-010',
    name: 'Elegant Multicoloured Ankara',
    description: 'Elegant outfit for weekend with silver embroidery. Available in different prints.',
    price: '₦14,999',
    images: [elanMulticolourAnkara1, elanMulticolourAnkara2, elanMulticolourAnkara3],
    fabric: 'High Quality Ankara',
    sizes: '6–22',
  },
  {
    id: '11',
    code: 'SP-EL-011',
    name: 'The Graceful Short Dress',
    description: 'Beautiful Outfit with butterfly back details. Available in different prints.',
    price: '₦17,999',
    images: [elanGracefulShort1, elanGracefulShort2, elanGracefulShort3, elanGracefulShort4],
    fabric: '100% Cotton Ankara',
    sizes: '6–22',
  },
  {
    id: '12',
    code: 'SP-EL-012',
    name: 'Creative Ankara Patch Design',
    description: 'Elegant Classy Outfit for every wear. Available in different prints.',
    price: '₦24,999',
    images: [elanAnkaraPatch1, elanAnkaraPatch2, elanAnkaraPatch3],
    fabric: 'Premium Texture Ankara',
    sizes: '6–22',
  },
  {
    id: '13',
    code: 'SP-EL-013',
    name: 'Luxury Crystal Blue Dress',
    description: 'Elegant luxury ware with rhinestones and stylish arm. Available in different prints.',
    price: '₦26,999',
    images: [elanCrystalBlue1, elanCrystalBlue2, elanCrystalBlue3, elanCrystalBlue4],
    fabric: 'Premium Texture with Rhinestones',
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
