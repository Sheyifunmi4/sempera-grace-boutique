import categoryDresses from '@/assets/category-dresses.jpg';
import categorySets from '@/assets/category-sets.jpg';
import categoryOccasion from '@/assets/category-occasion.jpg';
import categoryEveryday from '@/assets/category-everyday.jpg';

const categories = [
  { title: 'Dresses', img: categoryDresses, description: 'Flowing & Feminine' },
  { title: 'Two-Piece Sets', img: categorySets, description: 'Tailored & Refined' },
  { title: 'Occasion Wear', img: categoryOccasion, description: 'Glamorous & Timeless' },
  { title: 'Everyday Elegance', img: categoryEveryday, description: 'Effortless & Polished' },
];

export default function CategorySection() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <p className="section-eyebrow mb-4">Shop by Style</p>
          <h2
            className="font-serif text-foreground"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 300 }}
          >
            Explore the Edit
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`category-tile cursor-pointer group reveal delay-${(i + 1) * 100}`}
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(20,16,12,0.65) 0%, rgba(0,0,0,0.1) 60%)' }}
                />
                {/* Text */}
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
