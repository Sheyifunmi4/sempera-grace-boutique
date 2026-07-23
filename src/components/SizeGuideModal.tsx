import { useEffect } from 'react';
import { X } from 'lucide-react';

const SIZE_ROWS = [
  { label: 'XS', uk: 'UK 4',  us: 'US 0',  bustIn: '30', bustCm: '76',  waistIn: '24', waistCm: '61', hipsIn: '34', hipsCm: '87'  },
  { label: 'XS', uk: 'UK 6',  us: 'US 2',  bustIn: '32', bustCm: '81',  waistIn: '26', waistCm: '66', hipsIn: '36', hipsCm: '92'  },
  { label: 'S',  uk: 'UK 8',  us: 'US 4',  bustIn: '34', bustCm: '87',  waistIn: '28', waistCm: '71', hipsIn: '38', hipsCm: '97'  },
  { label: 'S',  uk: 'UK 10', us: 'US 6',  bustIn: '36', bustCm: '92',  waistIn: '30', waistCm: '77', hipsIn: '40', hipsCm: '102' },
  { label: 'M',  uk: 'UK 12', us: 'US 8',  bustIn: '38', bustCm: '97',  waistIn: '32', waistCm: '82', hipsIn: '42', hipsCm: '107' },
  { label: 'M',  uk: 'UK 14', us: 'US 10', bustIn: '40', bustCm: '102', waistIn: '34', waistCm: '87', hipsIn: '44', hipsCm: '112' },
  { label: 'L',  uk: 'UK 16', us: 'US 12', bustIn: '42', bustCm: '107', waistIn: '36', waistCm: '92', hipsIn: '46', hipsCm: '117' },
  { label: 'L',  uk: 'UK 18', us: 'US 14', bustIn: '44', bustCm: '112', waistIn: '38', waistCm: '97', hipsIn: '48', hipsCm: '122' },
  { label: 'XL', uk: 'UK 20', us: 'US 16', bustIn: '46', bustCm: '117', waistIn: '40', waistCm: '102', hipsIn: '50', hipsCm: '127' },
  { label: 'XL', uk: 'UK 22', us: 'US 18', bustIn: '48', bustCm: '122', waistIn: '42', waistCm: '107', hipsIn: '52', hipsCm: '132' },
];

const TH: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: '#8A7F6E',
  padding: '12px 16px',
  textAlign: 'center',
  borderBottom: '1px solid rgba(196,180,154,0.4)',
  whiteSpace: 'nowrap',
};

const TD: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '13px',
  fontWeight: 300,
  color: '#3D3A34',
  padding: '13px 16px',
  textAlign: 'center',
  borderBottom: '0.5px solid rgba(196,180,154,0.2)',
};

interface Props {
  onClose: () => void;
}

export default function SizeGuideModal({ onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(26,24,20,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#F5F0E8',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '88vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '28px 32px 24px',
          borderBottom: '0.5px solid rgba(196,180,154,0.4)',
          position: 'sticky', top: 0, backgroundColor: '#F5F0E8', zIndex: 1,
        }}>
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '6px',
            }}>
              Sizing
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
              fontWeight: 300, fontSize: '1.7rem', color: '#1A1814', margin: 0,
            }}>
              Find Your Fit
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#8A7F6E', padding: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Intro */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300,
          color: '#5A5550', lineHeight: 1.8, padding: '20px 32px 4px',
        }}>
          All measurements are in inches and centimetres. If you're between sizes, size up for comfort.
        </p>

        {/* Table */}
        <div style={{ overflowX: 'auto', padding: '16px 32px 32px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '580px' }}>
            <thead>
              <tr style={{ backgroundColor: '#1A1814' }}>
                <th style={{ ...TH, color: '#C4B49A', textAlign: 'left', borderBottom: 'none' }}>Size</th>
                <th style={{ ...TH, color: '#C4B49A', borderBottom: 'none' }}>UK</th>
                <th style={{ ...TH, color: '#C4B49A', borderBottom: 'none' }}>US</th>
                <th style={{ ...TH, color: '#C4B49A', borderBottom: 'none' }} colSpan={2}>Bust</th>
                <th style={{ ...TH, color: '#C4B49A', borderBottom: 'none' }} colSpan={2}>Waist</th>
                <th style={{ ...TH, color: '#C4B49A', borderBottom: 'none' }} colSpan={2}>Hips</th>
              </tr>
              <tr style={{ backgroundColor: '#2A2620' }}>
                <th style={{ ...TH, color: '#8A7F6E', textAlign: 'left', borderBottom: 'none' }} />
                <th style={{ ...TH, color: '#8A7F6E', borderBottom: 'none' }} />
                <th style={{ ...TH, color: '#8A7F6E', borderBottom: 'none' }} />
                {['IN', 'CM', 'IN', 'CM', 'IN', 'CM'].map((u, i) => (
                  <th key={i} style={{ ...TH, color: '#8A7F6E', fontSize: '9px', borderBottom: 'none' }}>{u}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZE_ROWS.map((row, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(196,180,154,0.08)' }}>
                  <td style={{ ...TD, textAlign: 'left', fontWeight: 600, color: '#1A1814', letterSpacing: '0.05em' }}>
                    {row.label}
                  </td>
                  <td style={TD}>{row.uk}</td>
                  <td style={TD}>{row.us}</td>
                  <td style={TD}>{row.bustIn}</td>
                  <td style={TD}>{row.bustCm}</td>
                  <td style={TD}>{row.waistIn}</td>
                  <td style={TD}>{row.waistCm}</td>
                  <td style={TD}>{row.hipsIn}</td>
                  <td style={TD}>{row.hipsCm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to measure */}
        <div style={{
          borderTop: '0.5px solid rgba(196,180,154,0.35)',
          padding: '24px 32px 32px',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px',
        }}
          className="size-modal-measure"
        >
          {[
            { label: 'Bust', desc: 'Measure around the fullest part of your chest, tape parallel to the ground.' },
            { label: 'Waist', desc: 'Measure around your natural waistline — the narrowest part of your torso.' },
            { label: 'Hips', desc: 'Measure around the fullest part of your hips, about 20cm below the waist.' },
          ].map((m) => (
            <div key={m.label} style={{ borderLeft: '1.5px solid #C4B49A', paddingLeft: '14px' }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
                fontWeight: 300, fontSize: '1rem', color: '#1A1814', marginBottom: '6px',
              }}>{m.label}</p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300,
                color: '#5A5550', lineHeight: 1.75,
              }}>{m.desc}</p>
            </div>
          ))}
        </div>

        <style>{`
          .size-modal-measure { grid-template-columns: repeat(3,1fr); }
          @media (max-width: 560px) { .size-modal-measure { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </div>
  );
}
