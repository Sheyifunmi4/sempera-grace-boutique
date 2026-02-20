import { useState, useRef } from 'react';
import SemperaNav from '@/components/SemperaNav';
import HeroSection from '@/components/HeroSection';
import FeaturedCollection from '@/components/FeaturedCollection';
import CategorySection from '@/components/CategorySection';
import AboutSection from '@/components/AboutSection';
import WhySection from '@/components/WhySection';
import InstagramGallery from '@/components/InstagramGallery';
import Newsletter from '@/components/Newsletter';
import SemperaFooter from '@/components/SemperaFooter';
import RequestModal from '@/components/RequestModal';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import type { Product } from '@/components/FeaturedCollection';

const Index = () => {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const collectionRef = useRef<HTMLElement>(null);
  const pageRef = useScrollReveal();

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const openRequestModal = (product?: Product) => {
    if (product) {
      setModalProduct(product);
    } else {
      // Generic request — use first product as placeholder
      setModalProduct({
        id: 'general',
        code: 'SP-GEN',
        name: 'Enquire About a Piece',
        price: '',
        frontImg: '',
        backImg: '',
        fabric: '',
      });
    }
  };

  return (
    <div ref={pageRef} className="bg-background">
      {/* Navigation */}
      <SemperaNav onRequestPiece={() => openRequestModal()} />

      {/* Hero */}
      <HeroSection
        onExplore={scrollToCollection}
        onRequest={() => openRequestModal()}
      />

      {/* Featured Collection */}
      <FeaturedCollection onRequest={openRequestModal} />

      {/* Shop by Category */}
      <CategorySection />

      {/* About */}
      <AboutSection />

      {/* Why Sempera */}
      <WhySection />

      {/* Instagram Gallery */}
      <InstagramGallery />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <SemperaFooter />

      {/* Request Modal */}
      {modalProduct && (
        <RequestModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}
    </div>
  );
};

export default Index;
