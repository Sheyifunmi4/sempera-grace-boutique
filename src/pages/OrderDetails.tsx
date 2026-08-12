import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';
import { useAuth } from '@/contexts/AuthContext';
import { useOrderByRef } from '@/lib/orders';
import { formatNaira } from '@/components/FeaturedCollection';
import { ORDER_FLOW, STATUS_LABEL, statusStep, isCancelled } from '@/lib/orderStatus';

const WHATSAPP_NUMBER = '2348027825606';

export default function OrderDetails() {
  const { reference } = useParams<{ reference: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: order, isLoading, isError } = useOrderByRef(reference);

  useEffect(() => {
    if (!loading && !user) navigate('/auth?redirect=/order/' + reference, { replace: true });
  }, [loading, user, navigate, reference]);

  if (loading || !user) return null;

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <SemperaNav />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin text-primary" size={28} />
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="bg-background min-h-screen">
        <SemperaNav />
        <section className="max-w-2xl mx-auto px-6 pt-40 pb-24 text-center">
          <p className="font-sans text-muted-foreground mb-6">Order not found.</p>
          <Link to="/account" className="btn-gold inline-block">My Orders</Link>
        </section>
        <SemperaFooter />
      </div>
    );
  }

  const cancelled = isCancelled(order.status);
  const date = new Date(order.created_at).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
  const time = new Date(order.created_at).toLocaleTimeString('en-NG', {
    hour: '2-digit', minute: '2-digit',
  });

  const waMessage = encodeURIComponent(
    `Hi Sempéra, I'd like to follow up on my order ${order.reference}. Can you give me an update please?`
  );

  return (
    <div className="bg-background min-h-screen">
      <SemperaNav />

      <section className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-24">

        {/* Back */}
        <Link
          to="/account"
          className="inline-flex items-center gap-2 font-sans text-muted-foreground hover:text-foreground transition-colors mb-8"
          style={{ fontSize: '0.82rem' }}
        >
          <ArrowLeft size={14} /> Back to My Orders
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '8px' }}>
          <p className="section-eyebrow mb-2">Order Details</p>
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h1 className="font-serif text-foreground" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 300 }}>
                {order.reference}
              </h1>
              <p className="font-sans text-muted-foreground mt-1" style={{ fontSize: '0.82rem' }}>
                Placed {date} at {time}
              </p>
            </div>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '5px 14px',
              backgroundColor: cancelled ? '#fdecec' : order.payment_status === 'paid' ? '#edf7f0' : '#faf4e8',
              color: cancelled ? '#c0392b' : order.payment_status === 'paid' ? '#1a7f47' : '#92611a',
              border: `1px solid ${cancelled ? '#f5c6cb' : order.payment_status === 'paid' ? '#b7e4c7' : '#f0d9a8'}`,
              alignSelf: 'flex-start',
            }}>
              {order.payment_status === 'paid' ? 'Paid' : 'Payment Pending'}
            </span>
          </div>
        </div>
        <span className="gold-divider mb-8" />

        {/* ── Order Tracking ── */}
        {!cancelled && (
          <div style={{ marginBottom: '40px' }}>
            <p className="section-eyebrow mb-5">Order Progress</p>
            <div style={{
              backgroundColor: '#F5F0E8',
              border: '0.5px solid rgba(196,180,154,0.4)',
              padding: '28px 24px',
            }}>
              <StatusTracker status={order.status} />
            </div>
          </div>
        )}

        {/* ── Items ── */}
        <div style={{ marginBottom: '32px' }}>
          <p className="section-eyebrow mb-4">Items Ordered</p>
          <div style={{ border: '0.5px solid rgba(196,180,154,0.4)' }}>
            {order.items.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '16px 20px',
                  borderBottom: i < order.items.length - 1 ? '0.5px solid rgba(196,180,154,0.25)' : 'none',
                }}
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    style={{ width: '56px', height: '68px', objectFit: 'cover', flexShrink: 0 }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {item.product_code && (
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C4B49A', marginBottom: '3px' }}>
                      {item.product_code}
                    </p>
                  )}
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem', color: '#1A1814' }}>
                    {item.product_name}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300, color: '#8A7F6E', marginTop: '3px' }}>
                    Size UK {item.size} · Qty {item.quantity}
                  </p>
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: '#1A1814', flexShrink: 0 }}>
                  {formatNaira(item.line_total_ngn)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Two-column: Payment + Delivery ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }} className="order-details-cols">

          {/* Payment Summary */}
          <div style={{ border: '0.5px solid rgba(196,180,154,0.4)', padding: '20px 22px' }}>
            <p className="section-eyebrow mb-4">Payment</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8A7F6E' }}>Subtotal</span>
                <span style={{ color: '#3D3A34' }}>{formatNaira(order.subtotal_ngn)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8A7F6E' }}>Delivery</span>
                <span style={{ color: '#3D3A34' }}>{formatNaira(order.delivery_ngn)}</span>
              </div>
              {order.processing_fee_ngn > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#8A7F6E' }}>Processing fee</span>
                  <span style={{ color: '#3D3A34' }}>{formatNaira(order.processing_fee_ngn)}</span>
                </div>
              )}
              <div style={{ borderTop: '0.5px solid rgba(196,180,154,0.35)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#1A1814', fontWeight: 500 }}>Total</span>
                <span style={{ color: '#1A1814', fontWeight: 600, fontSize: '15px' }}>{formatNaira(order.total_ngn)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8A7F6E' }}>Method</span>
                <span style={{ color: '#3D3A34', textTransform: 'capitalize' }}>
                  {order.payment_method === 'card' ? 'Card (Paystack)' : 'WhatsApp'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8A7F6E' }}>Status</span>
                <span style={{
                  fontSize: '11px', fontWeight: 500, padding: '2px 10px',
                  backgroundColor: order.payment_status === 'paid' ? '#edf7f0' : '#faf4e8',
                  color: order.payment_status === 'paid' ? '#1a7f47' : '#92611a',
                }}>
                  {order.payment_status === 'paid' ? 'Paid' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div style={{ border: '0.5px solid rgba(196,180,154,0.4)', padding: '20px 22px' }}>
            <p className="section-eyebrow mb-4">Delivery</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' }}>
              <div>
                <p style={{ color: '#8A7F6E', marginBottom: '2px' }}>Name</p>
                <p style={{ color: '#3D3A34' }}>{order.customer_name}</p>
              </div>
              {order.customer_phone && (
                <div>
                  <p style={{ color: '#8A7F6E', marginBottom: '2px' }}>Phone</p>
                  <p style={{ color: '#3D3A34' }}>{order.customer_phone}</p>
                </div>
              )}
              <div>
                <p style={{ color: '#8A7F6E', marginBottom: '2px' }}>Address</p>
                <p style={{ color: '#3D3A34' }}>
                  {order.delivery_address}{order.delivery_city ? `, ${order.delivery_city}` : ''}
                </p>
              </div>
              <div>
                <p style={{ color: '#8A7F6E', marginBottom: '2px' }}>Zone</p>
                <p style={{ color: '#3D3A34', textTransform: 'capitalize' }}>{order.delivery_zone}</p>
              </div>
              {order.notes && (
                <div>
                  <p style={{ color: '#8A7F6E', marginBottom: '2px' }}>Notes</p>
                  <p style={{ color: '#3D3A34' }}>{order.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2"
            style={{ fontSize: '11px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.117 1.528 5.847L.057 23.882l6.196-1.624A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.68-.487-5.23-1.342l-.374-.222-3.88 1.018 1.034-3.775-.244-.389A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Message on WhatsApp
          </a>
          <Link to="/account" className="btn-outline-gold inline-block" style={{ fontSize: '11px' }}>
            All Orders
          </Link>
        </div>
      </section>

      <SemperaFooter />

      <style>{`
        @media (max-width: 560px) {
          .order-details-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function StatusTracker({ status }: { status: string }) {
  const current = statusStep(status);

  return (
    <>
      {/* Mobile: vertical */}
      <ol className="sm:hidden" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {ORDER_FLOW.map((stage, i) => {
          const done = i <= current;
          const isLast = i === ORDER_FLOW.length - 1;
          return (
            <li key={stage} style={{ display: 'flex', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  backgroundColor: done ? '#1A1814' : 'transparent',
                  border: `1.5px solid ${done ? '#1A1814' : '#C4B49A'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {done
                    ? <Check size={12} color="#F5F0E8" />
                    : <span style={{ fontSize: '9px', color: '#C4B49A' }}>{i + 1}</span>
                  }
                </div>
                {!isLast && (
                  <div style={{ width: 1.5, flex: 1, minHeight: 16, backgroundColor: i < current ? '#1A1814' : 'rgba(196,180,154,0.4)', margin: '4px 0' }} />
                )}
              </div>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px', fontWeight: done ? 500 : 300,
                color: done ? '#1A1814' : '#8A7F6E',
                lineHeight: '24px',
                paddingBottom: isLast ? 0 : 14,
              }}>
                {STATUS_LABEL[stage]}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Desktop: horizontal */}
      <div className="hidden sm:flex" style={{ alignItems: 'flex-start' }}>
        {ORDER_FLOW.map((stage, i) => {
          const done = i <= current;
          const isLast = i === ORDER_FLOW.length - 1;
          return (
            <div key={stage} style={{ display: 'flex', alignItems: 'flex-start', flex: isLast ? 'none' : 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  backgroundColor: done ? '#1A1814' : 'transparent',
                  border: `1.5px solid ${done ? '#1A1814' : '#C4B49A'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {done
                    ? <Check size={13} color="#F5F0E8" />
                    : <span style={{ fontSize: '9px', color: '#C4B49A' }}>{i + 1}</span>
                  }
                </div>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10px', fontWeight: done ? 500 : 300,
                  letterSpacing: '0.04em',
                  color: done ? '#1A1814' : '#8A7F6E',
                  textAlign: 'center', maxWidth: 72, marginTop: 8,
                }}>
                  {STATUS_LABEL[stage]}
                </span>
              </div>
              {!isLast && (
                <div style={{
                  flex: 1, height: 1.5, marginTop: 14,
                  backgroundColor: i < current ? '#1A1814' : 'rgba(196,180,154,0.4)',
                  minWidth: 12,
                }} />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
