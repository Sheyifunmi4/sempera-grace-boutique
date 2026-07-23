import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';

const tabs = [
  { id: 'privacy', label: 'Privacy Policy', num: '01' },
  { id: 'cookies', label: 'Cookies Policy', num: '02' },
  { id: 'refund', label: 'Refund Policy', num: '03' },
  { id: 'delivery', label: 'Delivery Policy', num: '04' },
];

function Highlight({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: '#EDE5D8', borderLeft: '3px solid #C4B49A',
      padding: '16px 20px', margin: '20px 0', fontSize: '14px',
    }}>
      <strong style={{
        display: 'block', fontSize: '10px', letterSpacing: '0.2em',
        textTransform: 'uppercase', color: '#C4B49A', fontWeight: 500, marginBottom: '6px',
        fontFamily: "'DM Sans', sans-serif",
      }}>{title}</strong>
      {children}
    </div>
  );
}

function ContactBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#1A1814', padding: '24px 28px', marginTop: '28px' }}>
      <p style={{
        fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
        color: '#C4B49A', fontWeight: 400, marginBottom: '12px',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        Get in touch
      </p>
      {children}
    </div>
  );
}

function ContactLink({ href, children }: { href?: string; children: React.ReactNode }) {
  return (
    <a href={href} style={{
      display: 'block', fontSize: '14px', color: '#F5F0E8',
      textDecoration: 'none', marginBottom: '6px', fontWeight: 300,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {children}
    </a>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
      letterSpacing: '0.18em', textTransform: 'uppercase',
      color: '#1A1814', fontWeight: 500, margin: '32px 0 10px',
    }}>
      {children}
    </h3>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li style={{
      padding: '5px 0 5px 18px', position: 'relative',
      fontSize: '14px', fontWeight: 300, color: '#3D3A34',
      fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8,
    }}>
      <span style={{ position: 'absolute', left: 0, color: '#C4B49A' }}>–</span>
      {children}
    </li>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
      fontWeight: 300, color: '#3D3A34', lineHeight: 1.9, marginBottom: '14px',
    }}>
      {children}
    </p>
  );
}

const policyContent: Record<string, React.ReactNode> = {
  privacy: (
    <>
      <Body>Sempéra Fashion ("Sempéra", "we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and what rights you have over it.</Body>
      <Body>By using our website at <strong>www.sempera.co</strong> or purchasing from us, you agree to the terms of this policy.</Body>

      <SectionHeading>1. Information We Collect</SectionHeading>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 14px' }}>
        <Bullet><strong>Identity data:</strong> your name</Bullet>
        <Bullet><strong>Contact data:</strong> email address, phone number, WhatsApp number</Bullet>
        <Bullet><strong>Transaction data:</strong> details of products you purchased, order value, payment confirmation</Bullet>
        <Bullet><strong>Technical data:</strong> IP address, browser type, device type, pages visited (collected automatically)</Bullet>
        <Bullet><strong>Communication data:</strong> messages you send via WhatsApp, email, or our contact form</Bullet>
      </ul>

      <SectionHeading>2. How We Use Your Information</SectionHeading>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 14px' }}>
        <Bullet>Process and fulfil your orders</Bullet>
        <Bullet>Communicate with you about your order status</Bullet>
        <Bullet>Send you an invoice or payment request</Bullet>
        <Bullet>Respond to your enquiries</Bullet>
        <Bullet>Send you updates about new collections or offers (only if you opt in)</Bullet>
        <Bullet>Improve our website experience</Bullet>
        <Bullet>Comply with legal obligations</Bullet>
      </ul>

      <SectionHeading>3. Payment Data</SectionHeading>
      <Body>Payments are processed by <strong>Paystack</strong>, a licensed payment processor regulated by the Central Bank of Nigeria. We do not store your card details. All payment data is handled securely by Paystack in accordance with PCI-DSS standards.</Body>

      <SectionHeading>4. How We Share Your Information</SectionHeading>
      <Body>We do not sell your personal data. We may share your information with:</Body>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 14px' }}>
        <Bullet><strong>Paystack</strong> — to process payments</Bullet>
        <Bullet><strong>Delivery partners</strong> — to fulfil and track your order</Bullet>
        <Bullet><strong>Legal authorities</strong> — where required by Nigerian law</Bullet>
      </ul>

      <SectionHeading>5. Data Storage & Security</SectionHeading>
      <Body>Your data is stored securely using Supabase (hosted on AWS infrastructure). We use industry-standard encryption and access controls.</Body>

      <SectionHeading>6. How Long We Keep Your Data</SectionHeading>
      <Body>We retain your order and contact data for a minimum of 6 years in line with Nigerian financial record-keeping requirements. You may request earlier deletion of marketing-related data at any time.</Body>

      <SectionHeading>7. Your Rights</SectionHeading>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 14px' }}>
        <Bullet>Access the personal data we hold about you</Bullet>
        <Bullet>Request correction of inaccurate data</Bullet>
        <Bullet>Request deletion of your data (subject to legal obligations)</Bullet>
        <Bullet>Withdraw consent to marketing communications at any time</Bullet>
        <Bullet>Lodge a complaint with the Nigeria Data Protection Commission (NDPC)</Bullet>
      </ul>

      <SectionHeading>8. Children's Privacy</SectionHeading>
      <Body>Our website is not directed at children under 18. We do not knowingly collect personal data from minors.</Body>

      <SectionHeading>9. Changes to This Policy</SectionHeading>
      <Body>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website or emailing you directly.</Body>

      <ContactBox>
        <ContactLink href="mailto:hello@sempera.co">hello@sempera.co</ContactLink>
        <ContactLink href="https://wa.me/2348027825606">WhatsApp: +234 802 782 5606</ContactLink>
        <ContactLink>29 Okunola Aina Street, Mende, Maryland, Lagos, Nigeria</ContactLink>
      </ContactBox>
    </>
  ),

  cookies: (
    <>
      <Body>This Cookies Policy explains what cookies are, which ones Sempéra uses, and how you can control them.</Body>

      <SectionHeading>1. What Are Cookies?</SectionHeading>
      <Body>Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit — such as your preferences, your shopping cart, or whether you've visited before.</Body>

      <SectionHeading>2. Cookies We Use</SectionHeading>
      <Highlight title="Essential Cookies">
        <Body>These are necessary for the website to function and cannot be switched off. They include session management, security tokens, and payment processing cookies set by Paystack.</Body>
      </Highlight>
      <Highlight title="Analytics Cookies">
        <Body>We use basic analytics to understand how visitors interact with our website — which pages are most visited, how long people stay, and where they come from. This data is aggregated and anonymous.</Body>
      </Highlight>
      <Highlight title="Preference Cookies">
        <Body>These remember your settings so you don't have to re-enter them on future visits.</Body>
      </Highlight>
      <Highlight title="Third-Party Cookies">
        <Body>Our payment provider Paystack may set cookies during checkout, governed by Paystack's own cookie and privacy policy.</Body>
      </Highlight>

      <SectionHeading>3. What We Do Not Do</SectionHeading>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 14px' }}>
        <Bullet>We do not use cookies to build advertising profiles</Bullet>
        <Bullet>We do not share cookie data with advertising networks</Bullet>
        <Bullet>We do not use cross-site tracking cookies</Bullet>
      </ul>

      <SectionHeading>4. Managing Cookies</SectionHeading>
      <Body>You can control and delete cookies through your browser settings at any time. Disabling cookies may affect the functionality of certain parts of our website, including checkout.</Body>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 14px' }}>
        <Bullet>See what cookies are stored and delete them individually</Bullet>
        <Bullet>Block all cookies from specific websites</Bullet>
        <Bullet>Block all third-party cookies</Bullet>
        <Bullet>Clear all cookies when you close your browser</Bullet>
      </ul>

      <SectionHeading>5. Updates to This Policy</SectionHeading>
      <Body>We may update this Cookies Policy as our website evolves. Check this page periodically for any changes.</Body>

      <ContactBox>
        <ContactLink href="mailto:hello@sempera.co">hello@sempera.co</ContactLink>
        <ContactLink href="https://wa.me/2348027825606">WhatsApp: +234 802 782 5606</ContactLink>
      </ContactBox>
    </>
  ),

  refund: (
    <>
      <Body>At Sempéra, every piece is made with care and attention to quality. We want you to love what you receive. This policy outlines your options if something isn't right.</Body>

      <Highlight title="Our Commitment to You">
        <Body>If your order arrives damaged, defective, or significantly different from what was described, we will make it right — no questions asked.</Body>
      </Highlight>

      <SectionHeading>1. Eligibility for Refund or Exchange</SectionHeading>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 14px' }}>
        <Bullet>The item arrived damaged or with a manufacturing defect</Bullet>
        <Bullet>The wrong item was delivered</Bullet>
        <Bullet>The item is significantly different from its description on our website</Bullet>
      </ul>
      <Body>Requests must be made within <strong>7 days</strong> of receiving your order.</Body>

      <SectionHeading>2. How to Request a Refund or Exchange</SectionHeading>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 14px' }}>
        <Bullet>Contact us within 7 days of delivery via WhatsApp or email</Bullet>
        <Bullet>Include your order reference number and clear photographs of the issue</Bullet>
        <Bullet>We will respond within 2 business days with next steps</Bullet>
      </ul>

      <SectionHeading>3. Conditions for Returned Items</SectionHeading>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 14px' }}>
        <Bullet>Unworn, unwashed, and in their original condition</Bullet>
        <Bullet>Returned with all original packaging and tags intact</Bullet>
        <Bullet>Free from perfume, makeup, or any staining</Bullet>
      </ul>

      <SectionHeading>4. Non-Refundable Items</SectionHeading>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 14px' }}>
        <Bullet>Items purchased during sale or promotional events (unless defective)</Bullet>
        <Bullet>Custom or made-to-measure pieces</Bullet>
        <Bullet>Items returned after the 7-day window</Bullet>
        <Bullet>Items showing signs of wear, alteration, or damage caused by the customer</Bullet>
      </ul>

      <SectionHeading>5. Change of Mind</SectionHeading>
      <Body>We currently do not offer refunds or exchanges for change of mind, wrong size selection, or ordering in error. We encourage customers to review size guides carefully and contact us before placing an order if you have any questions.</Body>

      <SectionHeading>6. Refund Processing</SectionHeading>
      <Body>Once your return is received and inspected, we will notify you within 3 business days. Approved refunds are processed back to your original payment method within <strong>5–10 business days</strong>, depending on your bank.</Body>

      <SectionHeading>7. Return Shipping</SectionHeading>
      <Body>If the return is due to a defect or our error, Sempéra will cover the return shipping cost. Otherwise, the customer is responsible for return shipping.</Body>

      <ContactBox>
        <ContactLink href="mailto:hello@sempera.co">hello@sempera.co</ContactLink>
        <ContactLink href="https://wa.me/2348027825606">WhatsApp: +234 802 782 5606</ContactLink>
      </ContactBox>
    </>
  ),

  delivery: (
    <>
      <Body>We want your Sempéra pieces to reach you beautifully and on time. Here is everything you need to know about how we deliver.</Body>

      <SectionHeading>1. Order Processing</SectionHeading>
      <Body>All orders are processed within <strong>1–2 business days</strong> of payment confirmation. Orders placed on weekends or public holidays will be processed the next business day. You will receive a confirmation via WhatsApp or email once your order is confirmed.</Body>

      <SectionHeading>2. Delivery Timelines</SectionHeading>
      <Highlight title="Lagos (All Areas)">
        <Body>3–5 working days from dispatch.</Body>
      </Highlight>
      <Highlight title="Outside Lagos (Nigeria)">
        <Body>5–7 working days from dispatch. Delivery times may vary by state and courier availability.</Body>
      </Highlight>
      <Highlight title="International Delivery">
        <Body>Timeline is advised individually at the time of order. Please contact us via WhatsApp before placing an international order so we can confirm availability, costs, and timelines for your country.</Body>
      </Highlight>

      <SectionHeading>3. Delivery Costs</SectionHeading>
      <Body>Delivery fees are calculated at checkout based on your location. For international orders, shipping costs will be communicated to you before payment is confirmed.</Body>

      <SectionHeading>4. Delivery Partners</SectionHeading>
      <Body>We work with trusted courier partners to deliver your order. Once dispatched, you will receive tracking information where available. Sempéra is not responsible for delays caused by the courier after dispatch, but we will do everything we can to assist you.</Body>

      <SectionHeading>5. Failed Deliveries</SectionHeading>
      <Body>If a delivery attempt is unsuccessful, the courier will make a second attempt or hold the item at a collection point. If a package is returned to us due to an incorrect address, re-delivery costs will be borne by the customer.</Body>

      <SectionHeading>6. Damaged in Transit</SectionHeading>
      <Body>If your order arrives damaged, please photograph the packaging and the item immediately and contact us within 48 hours of receipt. We will arrange a replacement or refund in line with our Refund Policy.</Body>

      <SectionHeading>7. Delays</SectionHeading>
      <Body>While we aim to meet all delivery timelines, delays may occasionally occur due to high order volumes, public holidays, or courier disruptions. We will notify you proactively if we anticipate a delay on your order.</Body>

      <SectionHeading>8. Order Tracking</SectionHeading>
      <Body>Tracking is provided where available. You may also contact us at any time via WhatsApp to request a status update on your order.</Body>

      <ContactBox>
        <ContactLink href="mailto:hello@sempera.co">hello@sempera.co</ContactLink>
        <ContactLink href="https://wa.me/2348027825606">WhatsApp: +234 802 782 5606</ContactLink>
        <ContactLink>29 Okunola Aina Street, Mende, Maryland, Lagos, Nigeria</ContactLink>
      </ContactBox>
    </>
  ),
};

export default function Policies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') || 'privacy') as keyof typeof policyContent;
  const activeTabData = tabs.find((t) => t.id === activeTab) || tabs[0];

  const setTab = (id: string) => {
    setSearchParams({ tab: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div style={{ backgroundColor: '#F5F0E8', minHeight: '100vh' }}>
      <SemperaNav />

      {/* Hero */}
      <div style={{
        backgroundColor: '#1A1814', paddingTop: '140px', paddingBottom: '64px',
        textAlign: 'center', borderBottom: '1px solid rgba(196,180,154,0.2)',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
          letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '16px',
        }}>
          Sempéra Fashion · Legal
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
          fontWeight: 300, fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          color: '#F5F0E8', lineHeight: 1.1, marginBottom: '16px',
        }}>
          Our Policies
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300,
          color: 'rgba(245,240,232,0.55)', maxWidth: '440px', margin: '0 auto 28px', lineHeight: 1.8,
        }}>
          Everything you need to know about how we handle your data, your orders, and your peace of mind.
        </p>
        <div style={{ width: '40px', height: '1px', background: '#C4B49A', margin: '0 auto' }} />
      </div>

      {/* Sticky tab bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 40,
        backgroundColor: '#EDE5D8',
        borderBottom: '1px solid rgba(196,180,154,0.4)',
        padding: '0 24px',
      }}>
        <div style={{
          maxWidth: '780px', margin: '0 auto',
          display: 'flex', gap: '0', overflowX: 'auto',
        }}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px', fontWeight: isActive ? 500 : 400,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: isActive ? '#1A1814' : '#8A7F6E',
                  background: 'none', border: 'none',
                  borderBottom: isActive ? '2px solid #1A1814' : '2px solid transparent',
                  padding: '18px 24px', cursor: 'pointer',
                  transition: 'all 0.25s ease', whiteSpace: 'nowrap',
                }}
              >
                <span style={{ color: '#C4B49A', marginRight: '6px', fontSize: '10px' }}>{tab.num}</span>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '64px 24px 100px' }}>

        {/* Section header */}
        <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #EDE5D8' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 400,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '8px',
          }}>
            {activeTabData.num} of 04
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
            fontWeight: 300, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: '#1A1814', lineHeight: 1.1, marginBottom: '8px',
          }}>
            {activeTabData.label}
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
            color: '#8A7F6E', fontWeight: 300,
          }}>
            Effective date: 1 July 2025 · Last updated: July 2026
          </p>
        </div>

        {/* Policy body */}
        <div key={activeTab} style={{ animation: 'fadeIn 0.3s ease' }}>
          {policyContent[activeTab]}
        </div>

        {/* Next policy nav */}
        {(() => {
          const currentIdx = tabs.findIndex((t) => t.id === activeTab);
          const next = tabs[currentIdx + 1];
          const prev = tabs[currentIdx - 1];
          return (
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: '64px', paddingTop: '32px', borderTop: '1px solid #EDE5D8',
            }}>
              {prev ? (
                <button onClick={() => setTab(prev.id)} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 400,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: '#8A7F6E', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  ← {prev.label}
                </button>
              ) : <span />}
              {next && (
                <button onClick={() => setTab(next.id)} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: '#1A1814', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  {next.label} →
                </button>
              )}
            </div>
          );
        })()}
      </div>

      <SemperaFooter />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
