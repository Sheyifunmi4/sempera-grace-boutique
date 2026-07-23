import { useState } from 'react';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const whatsappText = encodeURIComponent(
    `Hello Sempéra, my name is ${form.name.trim() || '…'}. ${form.message.trim()}`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    window.open(`https://wa.me/2348027825606?text=${whatsappText}`, '_blank');
    setSent(true);
  };

  return (
    <div style={{ backgroundColor: '#F5F0E8', minHeight: '100vh' }}>
      <SemperaNav />

      {/* Hero */}
      <div style={{
        backgroundColor: '#1A1814', paddingTop: '140px', paddingBottom: '72px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '16px',
        }}>
          Get in Touch
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
          fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
          color: '#F5F0E8', lineHeight: 1.1, marginBottom: '16px',
        }}>
          We'd love to hear from you.
        </h1>
        <div style={{ width: '40px', height: '1px', background: '#C4B49A', margin: '0 auto' }} />
      </div>

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>

          {/* Left — contact details */}
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '28px',
            }}>
              Contact Details
            </p>

            {[
              {
                label: 'WhatsApp',
                value: '+234 802 782 5606',
                href: 'https://wa.me/2348027825606',
                note: 'Fastest response — usually within the hour',
              },
              {
                label: 'Email',
                value: 'hello@sempera.co',
                href: 'mailto:hello@sempera.co',
                note: 'For detailed enquiries and order follow-ups',
              },
              {
                label: 'Address',
                value: '29 Okunola Aina Street\nMende, Maryland\nLagos, Nigeria',
                href: undefined,
                note: 'Showroom visits are by appointment only',
              },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: '36px' }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
                  letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A7F6E', marginBottom: '6px',
                }}>
                  {item.label}
                </p>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer" style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
                      fontWeight: 300, fontSize: '1.2rem', color: '#1A1814', textDecoration: 'none',
                      display: 'block', marginBottom: '4px',
                    }}>
                    {item.value}
                  </a>
                ) : (
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
                    fontWeight: 300, fontSize: '1.1rem', color: '#1A1814',
                    whiteSpace: 'pre-line', marginBottom: '4px',
                  }}>
                    {item.value}
                  </p>
                )}
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300,
                  color: '#8A7F6E',
                }}>
                  {item.note}
                </p>
              </div>
            ))}

            <div style={{ height: '1px', background: '#C4B49A', marginBottom: '28px' }} />

            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A7F6E', marginBottom: '8px',
            }}>
              Hours
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300,
              color: '#5A5550', lineHeight: 1.85,
            }}>
              Monday – Friday: 9am – 6pm WAT<br />
              Saturday: 10am – 4pm WAT<br />
              Sunday: Closed
            </p>
          </div>

          {/* Right — message form */}
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '28px',
            }}>
              Send a Message
            </p>

            {sent ? (
              <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
                  fontWeight: 300, fontSize: '1.4rem', color: '#1A1814', marginBottom: '12px',
                }}>
                  Message sent.
                </p>
                <div style={{ width: '36px', height: '1px', background: '#C4B49A', margin: '0 auto 16px' }} />
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 300,
                  color: '#8A7F6E', lineHeight: 1.8,
                }}>
                  WhatsApp has opened with your message pre-filled.<br />
                  We'll get back to you shortly.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  style={{
                    marginTop: '24px', fontFamily: "'DM Sans', sans-serif",
                    fontSize: '11px', fontWeight: 400, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: '#8A7F6E',
                    background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline',
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { id: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your name', key: 'name' as const },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', key: 'email' as const },
                ].map((f) => (
                  <div key={f.id}>
                    <label style={{
                      display: 'block', fontFamily: "'DM Sans', sans-serif",
                      fontSize: '10px', fontWeight: 500, letterSpacing: '0.18em',
                      textTransform: 'uppercase', color: '#5A5550', marginBottom: '8px',
                    }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      style={{
                        width: '100%', padding: '12px 16px',
                        fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300,
                        backgroundColor: '#FFFFFF', color: '#1A1814',
                        border: '1px solid #C4B49A', outline: 'none',
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label style={{
                    display: 'block', fontFamily: "'DM Sans', sans-serif",
                    fontSize: '10px', fontWeight: 500, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: '#5A5550', marginBottom: '8px',
                  }}>
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="How can we help you?"
                    rows={5}
                    style={{
                      width: '100%', padding: '12px 16px',
                      fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300,
                      backgroundColor: '#FFFFFF', color: '#1A1814',
                      border: '1px solid #C4B49A', outline: 'none', resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    background: '#1A1814', color: '#F5F0E8',
                    padding: '15px 32px', border: 'none', borderRadius: '3px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.117 1.528 5.847L.057 23.882l6.196-1.624A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.68-.487-5.23-1.342l-.374-.222-3.88 1.018 1.034-3.775-.244-.389A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Send via WhatsApp
                </button>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300,
                  color: '#8A7F6E',
                }}>
                  Your message will open in WhatsApp, pre-filled and ready to send.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <SemperaFooter />
    </div>
  );
}
