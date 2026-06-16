import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';
import { useAuth } from '@/contexts/AuthContext';
import { useMyOrders, type ShopOrder } from '@/lib/orders';
import { formatNaira } from '@/components/FeaturedCollection';
import { ORDER_FLOW, STATUS_LABEL, statusStep, isDelivered, isCancelled } from '@/lib/orderStatus';

export default function Account() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: orders, isLoading, isError, refetch } = useMyOrders(!!user);

  useEffect(() => {
    if (!loading && !user) navigate('/auth?redirect=/account', { replace: true });
  }, [loading, user, navigate]);

  if (loading || !user) return null;

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split('@')[0] ||
    'there';

  return (
    <div className="bg-background min-h-screen">
      <SemperaNav />

      <section className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-24">
        <p className="section-eyebrow mb-3">My Orders</p>
        <h1 className="font-serif text-foreground mb-3" style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontWeight: 300 }}>
          Hello, {fullName}
        </h1>
        <span className="gold-divider mb-3" />
        <p className="font-sans text-muted-foreground mb-10 break-words" style={{ fontWeight: 300 }}>
          Signed in as <span className="text-foreground">{user.email}</span>
        </p>

        {isLoading && (
          <div className="text-center py-16">
            <Loader2 className="animate-spin mx-auto mb-3 text-primary" size={26} />
            <p className="font-sans text-muted-foreground" style={{ fontSize: '0.85rem' }}>Loading your orders…</p>
          </div>
        )}

        {!isLoading && isError && (
          <div className="text-center py-16">
            <p className="font-sans text-muted-foreground mb-4">Could not load your orders.</p>
            <button onClick={() => refetch()} className="btn-gold" style={{ fontSize: '0.75rem' }}>Try Again</button>
          </div>
        )}

        {!isLoading && !isError && orders && orders.length === 0 && (
          <div className="text-center py-16 bg-cream">
            <p className="font-serif text-primary text-2xl mb-2">✦</p>
            <p className="font-sans text-muted-foreground mb-6" style={{ fontWeight: 300 }}>You haven't placed any orders yet.</p>
            <Link to="/" className="btn-gold inline-block">Start Shopping</Link>
          </div>
        )}

        {!isLoading && !isError && orders && orders.length > 0 && (
          <div className="space-y-8">
            {orders.map((order) => <OrderCard key={order.id} order={order} />)}
          </div>
        )}

        <button
          onClick={() => signOut()}
          className="mt-12 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Log Out
        </button>
      </section>

      <SemperaFooter />
    </div>
  );
}

function OrderCard({ order }: { order: ShopOrder }) {
  const delivered = isDelivered(order.status);
  const cancelled = isCancelled(order.status);
  const date = new Date(order.created_at).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="border border-border/60">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-5 sm:px-6 py-4 bg-cream">
        <div className="min-w-0">
          <p className="section-eyebrow text-muted-foreground">Order · {date}</p>
          <p className="font-sans text-foreground break-all" style={{ fontSize: '0.78rem' }}>{order.reference}</p>
        </div>
        <span
          className="font-sans px-3 py-1 rounded-full"
          style={{
            fontSize: '0.66rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            backgroundColor: cancelled ? '#fdecec' : '#b8965a',
            color: cancelled ? '#c0392b' : '#ffffff',
          }}
        >
          {STATUS_LABEL[order.status]}
        </span>
      </div>

      {/* Tracker */}
      {!cancelled && <StatusTracker status={order.status} />}

      {/* Delivered thank-you */}
      {delivered && (
        <div className="mx-5 sm:mx-6 mb-2 p-4 text-center" style={{ background: '#faf4e8', border: '1px solid #ecdcc0' }}>
          <p className="font-serif text-primary text-xl mb-1">✦</p>
          <p className="font-serif text-foreground" style={{ fontSize: '1.05rem' }}>Thank you for your patronage</p>
          <p className="font-sans text-muted-foreground" style={{ fontSize: '0.82rem', fontWeight: 300 }}>
            We hope you adore your Sempéra pieces. We'd love to dress you again.
          </p>
        </div>
      )}

      {/* Items */}
      <div className="px-5 sm:px-6 py-5 space-y-4">
        {order.items.map((it) => (
          <div key={it.id} className="flex items-center gap-4">
            {it.image_url && <img src={it.image_url} alt={it.product_name} className="w-14 h-16 object-cover bg-cream" />}
            <div className="flex-1 min-w-0">
              <p className="font-serif text-foreground" style={{ fontSize: '0.95rem' }}>{it.product_name}</p>
              <p className="font-sans text-muted-foreground" style={{ fontSize: '0.78rem' }}>
                Size UK {it.size || '—'} · Qty {it.quantity}
              </p>
            </div>
            <span className="font-sans" style={{ fontSize: '0.85rem', color: '#b8965a' }}>{formatNaira(it.line_total_ngn)}</span>
          </div>
        ))}
      </div>

      {/* Totals + delivery */}
      <div className="px-5 sm:px-6 py-4 border-t border-border/40 text-sm font-sans">
        <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatNaira(order.subtotal_ngn)}</span></div>
        <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>{formatNaira(order.delivery_ngn)}</span></div>
        <div className="flex justify-between text-foreground mt-1" style={{ fontWeight: 500 }}><span>Total</span><span>{formatNaira(order.total_ngn)}</span></div>
        <p className="text-muted-foreground mt-3 break-words" style={{ fontSize: '0.78rem' }}>
          Delivering to: {order.delivery_address}{order.delivery_city ? `, ${order.delivery_city}` : ''}
        </p>
      </div>
    </div>
  );
}

function StatusTracker({ status }: { status: string }) {
  const current = statusStep(status);
  const dot = (done: boolean, i: number, size: number) => (
    <div
      className="flex items-center justify-center rounded-full flex-shrink-0"
      style={{
        width: size, height: size,
        backgroundColor: done ? '#b8965a' : 'transparent',
        border: `1.5px solid ${done ? '#b8965a' : 'hsl(var(--border))'}`,
        color: done ? '#fff' : 'hsl(var(--muted-foreground))',
      }}
    >
      {done ? <Check size={size === 24 ? 13 : 14} /> : <span style={{ fontSize: '0.6rem' }}>{i + 1}</span>}
    </div>
  );

  return (
    <div className="px-5 sm:px-6 py-5">
      {/* Mobile: vertical stepper — never overflows */}
      <ol className="sm:hidden">
        {ORDER_FLOW.map((stage, i) => {
          const done = i <= current;
          const isLast = i === ORDER_FLOW.length - 1;
          return (
            <li key={stage} className="flex gap-3">
              <div className="flex flex-col items-center">
                {dot(done, i, 24)}
                {!isLast && (
                  <div style={{ width: 1.5, flex: 1, minHeight: 16, backgroundColor: i < current ? '#b8965a' : 'hsl(var(--border))' }} />
                )}
              </div>
              <span
                className="font-sans"
                style={{ fontSize: '0.82rem', lineHeight: '24px', paddingBottom: isLast ? 0 : 14, color: done ? '#b8965a' : 'hsl(var(--muted-foreground))' }}
              >
                {STATUS_LABEL[stage]}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Desktop: horizontal stepper */}
      <div className="hidden sm:flex items-start">
        {ORDER_FLOW.map((stage, i) => {
          const done = i <= current;
          const isLast = i === ORDER_FLOW.length - 1;
          return (
            <div key={stage} className="flex items-start flex-1 last:flex-none">
              <div className="flex flex-col items-center" style={{ minWidth: 0 }}>
                {dot(done, i, 26)}
                <span
                  className="font-sans mt-2 text-center"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.04em', color: done ? '#b8965a' : 'hsl(var(--muted-foreground))', maxWidth: 64 }}
                >
                  {STATUS_LABEL[stage]}
                </span>
              </div>
              {!isLast && (
                <div className="flex-1 h-px mx-1" style={{ backgroundColor: i < current ? '#b8965a' : 'hsl(var(--border))', minWidth: 12, marginTop: 13 }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
