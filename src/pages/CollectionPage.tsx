import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';
import RequestModal from '@/components/RequestModal';
import FeaturedCollection, {
  COLLECTIONS,
  type CollectionSlug,
  type Product,
} from '@/components/FeaturedCollection';
import NotFound from './NotFound';

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const config = slug && (slug in COLLECTIONS) ? COLLECTIONS[slug as CollectionSlug] : null;
  if (!config) return <NotFound />;

  const openRequestModal = (product?: Product) => {
    if (product) {
      setModalProduct(product);
    } else {
      setModalProduct({
        id: 'general',
        code: 'SP-GEN',
        name: 'Enquire About a Piece',
        description: '',
        price: '',
        images: [],
        fabric: '',
        sizes: '6–22',
      } as Product);
    }
  };

  return (
    <div className="bg-background">
      <SemperaNav onRequestPiece={() => openRequestModal()} />

      <FeaturedCollection
        onRequest={openRequestModal}
        collection={config.slug}
        title={config.title}
        tagline={config.tagline}
        isNew={config.slug === 'belle'}
      />

      <SemperaFooter />

      {modalProduct && (
        <RequestModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}
    </div>
  );
}
