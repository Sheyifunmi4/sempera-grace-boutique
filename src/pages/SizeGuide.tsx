import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';

const SIZE_DATA = [
  { uk: '6',  eu: '34', us: '2',  bust: '81–83',  waist: '61–63',  hips: '86–88'  },
  { uk: '8',  eu: '36', us: '4',  bust: '84–87',  waist: '64–67',  hips: '89–92'  },
  { uk: '10', eu: '38', us: '6',  bust: '88–91',  waist: '68–71',  hips: '93–96'  },
  { uk: '12', eu: '40', us: '8',  bust: '92–95',  waist: '72–75',  hips: '97–100' },
  { uk: '14', eu: '42', us: '10', bust: '96–99',  waist: '76–79',  hips: '101–104'},
  { uk: '16', eu: '44', us: '12', bust: '100–104', waist: '80–84', hips: '105–109'},
  { uk: '18', eu: '46', us: '14', bust: '105–109', waist: '85–89', hips: '110–114'},
  { uk: '20', eu: '48', us: '16', bust: '110–114', waist: '90–94', hips: '115–119'},
  { uk: '22', eu: '50', us: '18', bust: '115–119', waist: '95–99', hips: '120–124'},
];

const COLS = [
  { key: 'uk', label: 'UK' },
  { key: 'eu', label: 'EU' },
  { key: 'us', label: 'US' },
  { key: 'bust', label: 'Bust (cm)' },
  { key: 'waist', label: 'Waist (cm)' },
  { key: 'hips', label: 'Hips (cm)' },
];

export default function SizeGuide() {
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
          Sizing
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
          fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
          color: '#F5F0E8', lineHeight: 1.1,
        }}>
          Find Your Fit
        </h1>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '80px 24px 100px' }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 300,
          color: '#3D3A34', lineHeight: 1.85, marginBottom: '48px', textAlign: 'center',
          maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto',
        }}>
          All Sempéra pieces are designed with a considered fit — feminine without being restrictive.
          Use this guide to find your size. If you're between sizes, we recommend sizing up.
          For specific pieces, feel free to reach out on WhatsApp.
        </p>

        {/* How to measure */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '20px',
        }}>
          How to Measure
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px',
          marginBottom: '56px',
        }}
          className="measure-grid"
        >
          {[
            { label: 'Bust', desc: 'Measure around the fullest part of your chest, keeping the tape parallel to the ground.' },
            { label: 'Waist', desc: 'Measure around your natural waistline — the narrowest part of your torso.' },
            { label: 'Hips', desc: 'Measure around the fullest part of your hips and seat, about 20cm below the waist.' },
          ].map((m) => (
            <div key={m.label} style={{
              borderLeft: '1.5px solid #C4B49A', paddingLeft: '16px',
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
                fontWeight: 300, fontSize: '1.1rem', color: '#1A1814', marginBottom: '8px',
              }}>
                {m.label}
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300,
                color: '#5A5550', lineHeight: 1.8,
              }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '20px',
        }}>
          Size Chart
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #C4B49A' }}>
                {COLS.map((col) => (
                  <th key={col.key} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
                    letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7F6E',
                    textAlign: 'left', padding: '12px 16px 12px 0',
                  }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZE_DATA.map((row, i) => (
                <tr key={row.uk} style={{
                  borderBottom: '0.5px solid rgba(196,180,154,0.3)',
                  backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(237,229,216,0.4)',
                }}>
                  {COLS.map((col) => (
                    <td key={col.key} style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                      fontWeight: col.key === 'uk' ? 500 : 300,
                      color: col.key === 'uk' ? '#1A1814' : '#3D3A34',
                      padding: '14px 16px 14px 0',
                    }}>
                      {(row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ height: '1px', background: 'rgba(196,180,154,0.35)', margin: '56px 0 40px' }} />

        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
          fontWeight: 300, fontSize: '1.1rem', color: '#8A7F6E',
          textAlign: 'center', lineHeight: 1.7,
        }}>
          Still unsure? Send us a message on{' '}
          <a href="https://wa.me/2348027825606" target="_blank" rel="noopener noreferrer"
            style={{ color: '#C4B49A', textDecoration: 'none' }}>
            WhatsApp
          </a>
          {' '}and we'll help you find the perfect fit.
        </p>
      </div>

      <SemperaFooter />

      <style>{`
        @media (max-width: 600px) {
          .measure-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
