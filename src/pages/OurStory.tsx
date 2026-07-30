import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';
import semperaWoman from '@/assets/sempera-woman.jpg';

const chapters = [
  {
    year: '2018',
    label: 'The Beginning',
    title: 'A sketchpad and a dream.',
    body: 'It started in a small Lagos apartment. A founder, tired of fashion that didn\'t feel like her. Too stiff. Too Western. Too much. She picked up a pencil and started drawing what she actually wanted to wear: clothes that felt like a second skin, that moved when she moved.',
    side: 'left',
  },
  {
    year: '2019',
    label: 'The Name',
    title: 'Sempéra was born.',
    body: '"Sempiternal", eternal, and "era." A name that holds both permanence and time. Not trend-driven. Not disposable. Every piece made to outlast the season it was born in.',
    side: 'right',
  },
  {
    year: '2020',
    label: 'First Collection',
    title: 'ÉLÁN: eight pieces. Zero left.',
    body: 'The first collection launched quietly, with no PR campaign, no influencer seeding. Eight pieces posted to a WhatsApp group and an Instagram story. Sold out in 48 hours.',
    side: 'left',
  },
  {
    year: '2021',
    label: 'The Showroom',
    title: 'A space where women could feel.',
    body: 'A small Lagos showroom opened, by appointment only. Women came not just to buy, but to try, to breathe, to ask questions. The showroom taught us: luxury is not in the price tag. It\'s in how the experience makes you feel.',
    side: 'right',
  },
  {
    year: '2022',
    label: 'BELLE Collection',
    title: 'For women who refuse to be subtle.',
    body: 'BELLE was our boldest bet, with fuller silhouettes, richer fabrications, and statement embroidery. Women wrote to say it was the first time they\'d worn something and felt both dressed up and completely themselves.',
    side: 'left',
  },
  {
    year: 'Now',
    label: 'Designed with Grace',
    title: 'Still handcrafted. Still her.',
    body: 'Every piece is still reviewed by the founder before it ships. The team has grown but the standard hasn\'t moved. A woman who gets dressed and feels exactly like herself, feminine, put-together and at ease, is a woman who can do anything.',
    side: 'right',
  },
];

const BELIEFS = [
  { keyword: 'Comfort',     full: 'Comfort should never cancel beauty.' },
  { keyword: 'Femininity',  full: 'Femininity is a language and it deserves to be spoken well.' },
  { keyword: 'Movement',    full: 'Clothes should move with a woman, not against her.' },
  { keyword: 'Pleasure',    full: 'Getting dressed should feel like a quiet pleasure, not a problem to solve.' },
  { keyword: 'Effortless',  full: 'Style is most powerful when it feels effortless.' },
  { keyword: 'Herself',     full: 'Every woman deserves to feel beautifully herself.' },
];

const PROMISES = [
  { label: 'One thing',     full: 'When you wear Sempéra, we want one thing for you:' },
  { label: 'Feel yourself', full: 'Not to feel dressed up, but to feel like yourself, only more so.' },
  { label: 'Never choose',  full: 'Because you should never have to choose between the woman you are and the way you want to dress.' },
];

function BeliefCard({ item, index, dark }: { item: { keyword: string; full: string }; index: number; dark: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        border: `1px solid ${hovered ? '#C4B49A' : dark ? 'rgba(196,180,154,0.20)' : 'rgba(196,180,154,0.45)'}`,
        padding: '36px 32px 40px',
        cursor: 'default',
        transition: 'border-color 0.3s ease, background-color 0.3s ease',
        backgroundColor: hovered
          ? (dark ? 'rgba(196,180,154,0.08)' : '#EDE5D8')
          : 'transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
        letterSpacing: '0.22em', color: '#C4B49A',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Keyword — always visible */}
      <p style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontStyle: 'italic', fontWeight: 700,
        fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
        color: hovered ? '#C4B49A' : (dark ? '#F5F0E8' : '#1A1814'),
        lineHeight: 1.05,
        margin: 0,
        transition: 'color 0.3s ease',
      }}>
        {item.keyword}
      </p>

      {/* Divider */}
      <div style={{
        width: hovered ? '48px' : '28px', height: '1px',
        background: '#C4B49A',
        transition: 'width 0.3s ease',
      }} />

      {/* Full text — always visible, more prominent on hover */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
        color: dark
          ? (hovered ? 'rgba(245,240,232,0.95)' : 'rgba(245,240,232,0.55)')
          : (hovered ? '#1A1814' : '#8A7F6E'),
        lineHeight: 1.75, margin: 0,
        transition: 'color 0.3s ease',
      }}>
        {item.full}
      </p>
    </div>
  );
}

function BeliefsSection() {
  return (
    <div style={{ backgroundColor: '#1A1814', padding: '100px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: '#C4B49A', marginBottom: '56px', textAlign: 'center',
        }}>
          What We Believe
        </p>
        <div className="beliefs-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          border: '1px solid rgba(196,180,154,0.18)',
        }}>
          {BELIEFS.map((b, i) => (
            <BeliefCard key={b.keyword} item={b} index={i} dark={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PromiseSection() {
  return (
    <div style={{ backgroundColor: '#F5F0E8', padding: '100px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: '#C4B49A', marginBottom: '56px', textAlign: 'center',
        }}>
          Our Promise
        </p>
        <div className="promise-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          {PROMISES.map((p, i) => (
            <BeliefCard key={p.label} item={p} index={i} dark={false} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <div style={{ width: '40px', height: '1px', background: '#C4B49A', margin: '0 auto 24px' }} />
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8A7F6E',
          }}>
            Sempéra. Designed with grace.
          </p>
        </div>
      </div>
    </div>
  );
}

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
        fontStyle: 'italic', fontWeight: 300,
        fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
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
        fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 300,
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
  const { wrapperRef, activeIndex } = useTimelineScroll(chapters.length);

  return (
    <div style={{ backgroundColor: '#F5F0E8', minHeight: '100vh' }}>
      <SemperaNav />

      {/* ── SECTION 1: Hero ── */}
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
        </div>
      </div>

      {/* ── SECTION 2: Who We Are ── */}
      <div style={{
        backgroundColor: '#F5F0E8',
        padding: '120px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '28px',
          }}>
            Who We Are
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '17px', fontWeight: 300,
            color: '#3D3A34', lineHeight: 1.85,
          }}>
            Sempéra is a ready-to-wear brand for women who want to get dressed and
            feel exactly like themselves; feminine, put-together, and at ease.
          </p>
          <div style={{ width: '40px', height: '1px', background: '#C4B49A', margin: '32px auto' }} />
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '17px', fontWeight: 300,
            color: '#3D3A34', lineHeight: 1.85,
          }}>
            We create thoughtful pieces that are not only beautiful to look at,
            but beautiful to live in.
          </p>
        </div>
      </div>

      {/* ── SECTION 3: Founder + Why Sempéra Exists ── */}
      <div style={{ backgroundColor: '#EDE5D8', padding: '100px 24px' }}>
        <div style={{
          maxWidth: '960px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '45% 1fr',
          gap: '64px', alignItems: 'center',
        }}
          className="founder-grid"
        >
          {/* Portrait */}
          <div>
            <div style={{
              position: 'relative',
              overflow: 'hidden', borderRadius: '2px',
              aspectRatio: '3/4',
            }}>
              <img
                src={semperaWoman}
                alt="Sheyifunmi Olalekan, Sempéra Founder"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: '50% 15%',
                  display: 'block',
                }}
              />
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
              fontWeight: 700, fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)', color: '#1A1814',
              marginTop: '20px', paddingLeft: '4px', lineHeight: 1.2,
            }}>
              Sheyifunmi Olalekan<br />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: 'normal', fontWeight: 500, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A7F6E' }}>Creative Director &amp; Founder</span>
            </p>
          </div>

          {/* Why Sempéra Exists */}
          <div style={{
            borderLeft: '1.5px solid #C4B49A',
            paddingLeft: '32px',
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#C4B49A', marginBottom: '28px',
            }}>
              Why Sempéra Exists
            </p>
            {[
              'For a long time, getting dressed felt like a compromise.',
              'Sempéra began from a quiet refusal to accept that.',
              'We believe women deserve clothing that holds all of who they are, through every season, every version, and every moment.',
              'Every piece begins with one question.',
              <em key="q" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', fontStyle: 'italic', fontWeight: 300 }}>Does this feel as good as it looks?</em>,
            ].map((para, i) => (
              <p key={i} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '17px', fontWeight: 300,
                color: '#3D3A34', lineHeight: 1.85, marginBottom: '20px',
              }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
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

          <div ref={wrapperRef} style={{ position: 'relative' }}>
            <div style={{
              width: '1px', height: '40px',
              background: 'linear-gradient(to bottom, transparent, #C4B49A)',
              margin: '0 auto',
            }} />

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
                  <div style={{ paddingRight: '40px', paddingBottom: '72px', textAlign: 'right' }}>
                    {isLeft && <CardContent chapter={chapter} align="right" active={isActive} />}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    {i < chapters.length - 1 && (
                      <div style={{ position: 'relative', flex: 1, width: '1px', minHeight: '100px' }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(196,180,154,0.25)' }} />
                        <div style={{
                          position: 'absolute', top: 0, left: 0, right: 0,
                          background: '#1A1814',
                          height: i < activeIndex ? '100%' : i === activeIndex ? '50%' : '0%',
                          transition: 'height 0.4s ease',
                        }} />
                      </div>
                    )}
                  </div>
                  <div style={{ paddingLeft: '40px', paddingBottom: '72px' }}>
                    {!isLeft && <CardContent chapter={chapter} align="left" active={isActive} />}
                  </div>
                </div>
              );
            })}

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

      {/* ── SECTION 4: What We Believe ── */}
      <BeliefsSection />

      {/* ── SECTION 5: Our Promise ── */}
      <PromiseSection />

      {/* ── SECTION 6: CTA ── */}
      <div style={{ padding: '100px 24px', textAlign: 'center', backgroundColor: '#EDE5D8' }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
          fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#1A1814', marginBottom: '36px',
        }}>
          Explore the collection.
        </h2>
        <Link to="/collections" style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          background: '#1A1814', color: '#F5F0E8',
          padding: '16px 40px', textDecoration: 'none', display: 'inline-block',
          borderRadius: '0',
        }}>
          Shop Now
        </Link>
      </div>

      <SemperaFooter />

      <style>{`
        @media (max-width: 768px) {
          .founder-grid { grid-template-columns: 1fr !important; }
          .beliefs-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .promise-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .beliefs-grid { grid-template-columns: 1fr !important; }
          .promise-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
