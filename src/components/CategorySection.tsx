import { useNavigate } from 'react-router-dom';
import elanOliveGreen1 from '@/assets/elan-olive-green-1.jpg';
import elanPurpleRhinestone1 from '@/assets/elan-purple-rhinestone-1.jpg';
import elanGracefulShort1 from '@/assets/elan-graceful-short-1.jpg';
import elanRedTribal1 from '@/assets/elan-red-tribal-1.jpg';

// Product UUIDs from Supabase
const categories = [
  {
    title: 'Dresses',
    description: 'Flowing & Feminine',
    img: elanOliveGreen1,
    productId: 'dea5bc2b-ba27-4a03-aafd-ef7e73f0b737', // SP-EL-004 Olive Green Crystal Dress
  },
  {
    title: 'Two-Piece Sets',
    description: 'Tailored & Refined',
    img: elanRedTribal1,
    productId: 'c5fb332b-8fef-431f-8b02-caf884b901e5', // SP-EL-38 The Cherry Belle
  },
  {
    title: 'Occasion Wear',
    description: 'Glamorous & Timeless',
    img: elanPurpleRhinestone1,
    productId: '1929f5d2-d4b3-4049-8efd-f4e866d0c152', // SP-EL-008 Purple & Black Rhinestone Kaftan
  },
  {
    title: 'Everyday Elegance',
    description: 'Effortless & Polished',
    img: elanGracefulShort1,
    productId: 'e7372696-3de4-4f70-b538-d7139eae72d5', // SP-EL-36 The Sunshine Belle
  },
];

export default function CategorySection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <p className="section-eyebrow mb-4">Shop by Style</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              onClick={() => navigate(`/product/${cat.productId}`)}
              className={`category-tile cursor-pointer group reveal delay-${(i + 1) * 100}`}
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(20,16,12,0.65) 0%, rgba(0,0,0,0.1) 60%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <h3
                    className="font-serif mb-1"
                    style={{
                      color: 'hsl(0 0% 100%)',
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                      fontWeight: 300,
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="section-eyebrow opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ color: 'hsl(38 40% 72%)' }}
                  >
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
