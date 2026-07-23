import { useEffect, useRef, useState } from 'react';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';
import semperaWoman from '@/assets/sempera-woman.jpg';

const chapters = [
  {
    year: '2018',
    label: 'The Beginning',
    title: 'A sketchpad and a dream.',
    body: 'It started in a small Lagos apartment — a founder tired of fashion that didn\'t feel like her. Too stiff. Too Western. Too much. She picked up a pencil and started drawing what she actually wanted to wear: clothes that felt like a second skin, that moved when she moved.',
    side: 'left',
  },
  {
    year: '2019',
    label: 'The Name',
    title: 'Sempéra was born.',
    body: '"Sempiternal" — eternal — and "era." A name that holds both permanence and time. Not trend-driven. Not disposable. Every piece made to outlast the season it was born in. The brand filed its name on a Tuesday; by Friday, the first samples were being cut.',
    side: 'right',
  },
  {
    year: '2020',
    label: 'First Collection',
    title: 'ÉLÁN — eight pieces. Zero left.',
    body: 'The first collection launched quietly — no PR campaign, no influencer seeding. Eight pieces posted to a WhatsApp group and an Instagram story. Sold out in 48 hours. Women were writing in asking when the next drop was. The answer: we\'re already working on it.',
    side: 'left',
  },
  {
    year: '2021',
    label: 'The Showroom',
    title: 'A space where women could feel.',
    body: 'A small Lagos showroom opened — by appointment only. Women came not just to buy, but to try, to breathe, to ask questions. Many left without purchasing anything. They always came back. The showroom taught us: luxury is not in the price tag. It\'s in how the experience makes you feel.',
    side: 'right',
  },
  {
    year: '2022',
    label: 'BELLE Collection',
    title: 'For women who refuse to be subtle.',
    body: 'BELLE was our boldest bet — fuller silhouettes, richer fabrications, statement embroidery. Some said it was too much. It became our best-selling collection. Women wrote to say it was the first time they\'d worn something and felt both dressed up and completely themselves.',
    side: 'left',
  },
  {
    year: '2023',
    label: 'Going Global',
    title: 'From Lagos to the world.',
    body: 'Orders arrived from London, Houston, Toronto, Accra. The diaspora had found us — women who grew up between two worlds and struggled to find clothes that honoured both. We began shipping internationally. Our packaging changed. Our values didn\'t.',
    side: 'right',
  },
  {
    year: 'Now',
    label: 'Designed with Grace',
    title: 'Still handcrafted. Still her.',
    body: 'Every piece is still reviewed by the founder before it ships. The team has grown but the standard hasn\'t moved. A woman who gets dressed and feels exactly like herself — feminine, put-together, at ease — is a woman who can do anything. That\'s what Sempéra is for.',
    side: 'left',
  },
];

function useTimelineScroll(length: number) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fillPct, setFillPct] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const total = wrapperRef.current.offsetHeight;
      const scrolled = Math.max(0, -rect.top + window.innerHeight * 0.5);
      const pct = Math.min(1, scrolled / total);
      setFillPct(pct);
      setActiveIndex(Math.min(length - 1, Math.floor(pct * length)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [length]);

  return { wrapperRef, fillPct, activeIndex };
}

function CardContent({
  chapter,
  align,
  active,
}: {
  chapter: typeof chapters[0];
  align: 'left' | 'right';
  active: boolean;
}) {
  return (
    <div style={{
      opacity: active ? 1 : 0.38,
      transform: active ? 'translateY(0)' : 'translateY(6px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        marginBottom: '14px',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: active ? '#F5F0E8' : '#8A7F6E',
          background: active ? '#1A1814' : '#EDE5D8',
          padding: '4px 12px', borderRadius: '2px',
          transition: 'all 0.5s ease',
        }}>
          {chapter.year}
        </span>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 400,
          letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C4B49A',
        }}>
          {chapter.label}
        </span>
      </div>

      <h3 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontStyle: 'italic', fontWeight: 400,
        fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
        color: '#1A1814', lineHeight: 1.15, marginBottom: '14px',
        textAlign: align,
      }}>
        {chapter.title}
      </h3>

      <div style={{
        width: active ? '48px' : '24px', height: '1px', background: '#C4B49A',
        marginBottom: '14px',
        marginLeft: align === 'right' ? 'auto' : '0',
        transition: 'width 0.4s ease',
      }} />

      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300,
        color: '#5A5550', lineHeight: 1.9, textAlign: align,
        maxWidth: '360px',
        marginLeft: align === 'right' ? 'auto' : '0',
      }}>
        {chapter.body}
      </p>
    </div>
  );
}

export default function OurStory() {
  const { wrapperRef, fillPct, activeIndex } = useTimelineScroll(chapters.length);

  return (
    <div style={{ backgroundColor: '#F5F0E8', minHeight: '100vh' }}>
      <SemperaNav />

      {/* ── Dark hero ── */}
      <div style={{
        backgroundColor: '#1A1814',
        paddingTop: '160px', paddingBottom: '100px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {[480, 680, 880].map((size) => (
          <div key={size} style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size, height: size, borderRadius: '50%',
            border: '1px solid rgba(196,180,154,0.08)', pointerEvents: 'none',
          }} />
        ))}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
            letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '20px',
          }}>
            Our Story
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
            fontWeight: 300, fontSize: 'clamp(2.8rem, 6vw, 68px)',
            color: '#F5F0E8', lineHeight: 1.05, marginBottom: '24px',
          }}>
            Designed with intention.<br />Worn with grace.
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300,
            color: 'rgba(245,240,232,0.60)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.9,
          }}>
            Sempéra was not built overnight. It was built in the quiet hours — through
            many collections, many women, and an unwavering belief that how you dress
            shapes how you move through the world.
          </p>
        </div>
      </div>

      {/* ── Founder bio card ── */}
      <div style={{ backgroundColor: '#EDE5D8', padding: '80px 24px' }}>
        <div style={{
          maxWidth: '820px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '300px 1fr',
          gap: '56px', alignItems: 'center',
        }}>
          {/* Portrait */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '300px', height: '300px',
              overflow: 'hidden', borderRadius: '2px',
              boxShadow: '8px 8px 0 #C4B49A',
            }}>
              <img
                src={semperaWoman}
                alt="Sempéra Founder"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: '50% 15%',
                  display: 'block',
                }}
              />
            </div>
            {/* Caramel accent line */}
            <div style={{
              position: 'absolute', bottom: '-20px', left: '12px',
              width: '60px', height: '1px', background: '#C4B49A',
            }} />
          </div>

          {/* Bio */}
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#C4B49A', marginBottom: '12px',
            }}>
              The Founder
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
              fontWeight: 300, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              color: '#1A1814', lineHeight: 1.1, marginBottom: '8px',
            }}>
              Sheyifunmi Olalekan
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 400,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#8A7F6E', marginBottom: '20px',
            }}>
              Creative Director &amp; Founder
            </p>
            <div style={{ width: '36px', height: '1px', background: '#C4B49A', marginBottom: '20px' }} />
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300,
              color: '#5A5550', lineHeight: 1.95, marginBottom: '16px',
            }}>
              Grace started Sempéra after years of struggling to find clothes that felt
              like herself — a Nigerian woman who wanted to be both feminine and powerful,
              both put-together and at ease. She had no fashion school background.
              What she had was taste, conviction, and a very clear picture of the woman she was designing for.
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
              fontWeight: 300, fontSize: '1.1rem', color: '#8A7F6E', lineHeight: 1.6,
            }}>
              "Every collection is a letter to a woman I've met, imagined, or been."
            </p>
          </div>
        </div>
      </div>

      {/* ── Roadmap timeline ── */}
      <div style={{ padding: '100px 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '12px',
            }}>
              The Journey
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
              fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#1A1814',
            }}>
              From a sketchpad to your wardrobe.
            </h2>
          </div>

          {/* Timeline wrapper — scroll progress tracked here */}
          <div ref={wrapperRef} style={{ position: 'relative' }}>

            {/* Top fade-in cap */}
            <div style={{
              width: '1px', height: '40px',
              background: 'linear-gradient(to bottom, transparent, #C4B49A)',
              margin: '0 auto',
            }} />

            {/* Rows */}
            {chapters.map((chapter, i) => {
              const isLeft = chapter.side === 'left';
              const isDone = i <= activeIndex;
              const isActive = i === activeIndex;

              return (
                <div
                  key={chapter.year}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 56px 1fr',
                    alignItems: 'start',
                  }}
                >
                  {/* Left card */}
                  <div style={{ paddingRight: '40px', paddingBottom: '72px', textAlign: 'right' }}>
                    {isLeft && <CardContent chapter={chapter} align="right" active={isActive} />}
                  </div>

                  {/* Center spine column */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Dot */}
                    <div style={{
                      width: isActive ? '18px' : '12px',
                      height: isActive ? '18px' : '12px',
                      borderRadius: '50%',
                      background: isDone ? '#1A1814' : '#EDE5D8',
                      border: `2px solid ${isDone ? '#1A1814' : '#C4B49A'}`,
                      boxShadow: isActive ? '0 0 0 4px rgba(196,180,154,0.3)' : 'none',
                      flexShrink: 0,
                      marginTop: '6px',
                      zIndex: 2,
                      transition: 'all 0.4s ease',
                    }} />

                    {/* Line segment */}
                    {i < chapters.length - 1 && (
                      <div style={{ position: 'relative', flex: 1, width: '1px', minHeight: '100px' }}>
                        {/* Background track */}
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'rgba(196,180,154,0.25)',
                        }} />
                        {/* Fill */}
                        <div style={{
                          position: 'absolute', top: 0, left: 0, right: 0,
                          background: '#1A1814',
                          height: i < activeIndex ? '100%' : i === activeIndex ? '50%' : '0%',
                          transition: 'height 0.4s ease',
                        }} />
                      </div>
                    )}
                  </div>

                  {/* Right card */}
                  <div style={{ paddingLeft: '40px', paddingBottom: '72px' }}>
                    {!isLeft && <CardContent chapter={chapter} align="left" active={isActive} />}
                  </div>
                </div>
              );
            })}

            {/* End marker */}
            <div style={{ textAlign: 'center', marginTop: '-32px' }}>
              <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: activeIndex >= chapters.length - 1 ? '#1A1814' : '#EDE5D8',
                  border: `3px solid ${activeIndex >= chapters.length - 1 ? '#1A1814' : '#C4B49A'}`,
                  boxShadow: activeIndex >= chapters.length - 1 ? '0 0 0 5px rgba(196,180,154,0.25)' : 'none',
                  transition: 'all 0.4s ease',
                }} />
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
                  fontWeight: 300, fontSize: '1.1rem', color: '#8A7F6E',
                }}>
                  The story continues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div style={{ backgroundColor: '#1A1814', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: '#C4B49A', textAlign: 'center', marginBottom: '56px',
          }}>
            What We Stand For
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', textAlign: 'center' }}>
            {[
              { word: 'Intentional', desc: 'Every design decision is deliberate. Nothing is accidental. Nothing is filler.' },
              { word: 'Feminine', desc: 'Not soft for softness\'s sake — feminine because that is a form of power.' },
              { word: 'Enduring', desc: 'We do not chase trends. We build pieces that outlast them.' },
              { word: 'Honest', desc: 'We say what a garment is, what it\'s made of, and who made it.' },
            ].map((v) => (
              <div key={v.word}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
                  fontWeight: 300, fontSize: '1.6rem', color: '#F5F0E8', marginBottom: '12px',
                }}>
                  {v.word}
                </h3>
                <div style={{ width: '28px', height: '1px', background: '#C4B49A', margin: '0 auto 14px' }} />
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300,
                  color: 'rgba(245,240,232,0.55)', lineHeight: 1.8,
                }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: '100px 24px', textAlign: 'center', backgroundColor: '#F5F0E8' }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '16px',
        }}>
          Ready to wear the story?
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
          fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#1A1814', marginBottom: '32px',
        }}>
          Explore the collection.
        </h2>
        <a href="/#collection" style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          background: '#1A1814', color: '#F5F0E8',
          padding: '16px 40px', borderRadius: '3px', textDecoration: 'none', display: 'inline-block',
        }}>
          Shop Sempéra
        </a>
      </div>

      <SemperaFooter />
    </div>
  );
}
