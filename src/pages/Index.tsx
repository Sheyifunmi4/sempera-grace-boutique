import { useState, useRef } from 'react';
import SemperaNav from '@/components/SemperaNav';
import HeroSection from '@/components/HeroSection';
import FeaturedCollection from '@/components/FeaturedCollection';
import { COLLECTIONS } from '@/components/FeaturedCollection';
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
        description: '',
        price: '',
        images: [],
        fabric: '',
        sizes: '6–22',
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

      {/* BELLE Collection — newest, teaser */}
      <FeaturedCollection
        onRequest={openRequestModal}
        collection={COLLECTIONS.belle.slug}
        title={COLLECTIONS.belle.title}
        tagline={COLLECTIONS.belle.tagline}
        limit={4}
        viewAllHref={`/collection/${COLLECTIONS.belle.slug}`}
        sectionId="collection"
        isNew
      />

      {/* EASE Collection — teaser */}
      <FeaturedCollection
        onRequest={openRequestModal}
        collection={COLLECTIONS.ease.slug}
        title={COLLECTIONS.ease.title}
        tagline={COLLECTIONS.ease.tagline}
        limit={4}
        viewAllHref={`/collection/${COLLECTIONS.ease.slug}`}
        sectionId="collection-ease"
      />

      {/* ELÁN Collection — teaser */}
      <FeaturedCollection
        onRequest={openRequestModal}
        collection={COLLECTIONS.elan.slug}
        title={COLLECTIONS.elan.title}
        tagline={COLLECTIONS.elan.tagline}
        limit={4}
        viewAllHref={`/collection/${COLLECTIONS.elan.slug}`}
        sectionId="collection-elan"
      />

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
