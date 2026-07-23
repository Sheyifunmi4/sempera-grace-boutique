import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';

const FABRIC_SECTIONS = [
  {
    fabric: 'Lace & Embroidered Fabrics',
    desc: 'Used in occasion wear, statement pieces, and embellished collections.',
    instructions: [
      'Hand wash only in cool water (30°C max) using a gentle detergent.',
      'Do not wring or twist — gently press out excess water.',
      'Lay flat on a clean towel to dry away from direct sunlight.',
      'Iron on the reverse side with a cool setting, or use a pressing cloth.',
      'Store folded in tissue paper to protect embellishments.',
    ],
  },
  {
    fabric: 'Chiffon & Georgette',
    desc: 'Lightweight and fluid fabrics used in dresses, blouses, and layered pieces.',
    instructions: [
      'Hand wash or use a delicate machine cycle (30°C max) in a mesh laundry bag.',
      'Use a mild detergent — no bleach, no fabric softener.',
      'Hang to dry away from direct heat and sunlight.',
      'Iron on the lowest setting while slightly damp, or steam from a distance.',
      'Store hanging to prevent creasing.',
    ],
  },
  {
    fabric: 'Ankara & Printed Cotton',
    desc: 'Bold, structured fabrics used in tailored and two-piece sets.',
    instructions: [
      'Machine wash on a gentle cycle at 30°C.',
      'Wash dark prints separately on first wash to prevent bleeding.',
      'Turn inside out before washing to preserve print vibrancy.',
      'Tumble dry on low, or air dry for best results.',
      'Iron on medium heat while slightly damp.',
    ],
  },
  {
    fabric: 'Satin & Silk-Blend Fabrics',
    desc: 'Luxurious, smooth fabrics used in evening wear and special occasion pieces.',
    instructions: [
      'Dry clean recommended for heavily structured or lined pieces.',
      'For lighter pieces: hand wash in cool water with a silk-specific detergent.',
      'Never wring. Roll gently in a towel to remove excess water.',
      'Dry flat or hang away from direct sunlight.',
      'Iron on the lowest heat setting on the reverse side only.',
    ],
  },
  {
    fabric: 'Jersey & Stretch Fabrics',
    desc: 'Used in everyday pieces and relaxed silhouettes.',
    instructions: [
      'Machine wash on a gentle cycle at 30°C.',
      'Wash with similar colours.',
      'Avoid tumble drying — air dry flat to maintain shape.',
      'Do not iron directly on prints or embellishments.',
      'Store folded, not hanging, to avoid stretching.',
    ],
  },
];

export default function CareGuide() {
  return (
    <div style={{ backgroundColor: '#F5F0E8', minHeight: '100vh' }}>
      <SemperaNav />

      {/* Header */}
      <div style={{
        backgroundColor: '#1A1814',
        paddingTop: '140px', paddingBottom: '72px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '16px',
        }}>
          Garment Care
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
          fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
          color: '#F5F0E8', lineHeight: 1.1,
        }}>
          Caring for Your Sempéra
        </h1>
      </div>

      {/* Intro */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 24px 48px', textAlign: 'center' }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 300,
          color: '#3D3A34', lineHeight: 1.85,
        }}>
          Every Sempéra piece is made to last. With the right care, your garments
          will hold their shape, colour, and feel for years to come. Please follow
          the instructions below for each fabric type.
        </p>
        <div style={{ width: '40px', height: '1px', background: '#C4B49A', margin: '32px auto 0' }} />
      </div>

      {/* Fabric sections */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 100px' }}>
        {FABRIC_SECTIONS.map((section, i) => (
          <div key={section.fabric}>
            {i > 0 && (
              <div style={{ height: '0.5px', background: 'rgba(196,180,154,0.35)', margin: '56px 0' }} />
            )}
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '10px',
            }}>
              Fabric Type
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
              fontWeight: 300, fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
              color: '#1A1814', lineHeight: 1.1, marginBottom: '10px',
            }}>
              {section.fabric}
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300,
              color: '#8A7F6E', marginBottom: '24px', lineHeight: 1.7,
            }}>
              {section.desc}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {section.instructions.map((step) => (
                <li key={step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: '#C4B49A', flexShrink: 0, marginTop: '8px',
                  }} />
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300,
                    color: '#3D3A34', lineHeight: 1.8, margin: 0,
                  }}>
                    {step}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div style={{ height: '0.5px', background: 'rgba(196,180,154,0.35)', margin: '64px 0 48px' }} />

        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
            fontWeight: 300, fontSize: '1.1rem', color: '#8A7F6E',
            lineHeight: 1.7, marginBottom: '8px',
          }}>
            When in doubt, always err on the side of gentleness.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300,
            color: '#8A7F6E',
          }}>
            Questions? Reach us on{' '}
            <a href="https://wa.me/2348027825606" target="_blank" rel="noopener noreferrer"
              style={{ color: '#C4B49A', textDecoration: 'none' }}>
              WhatsApp
            </a>.
          </p>
        </div>
      </div>

      <SemperaFooter />
    </div>
  );
}
