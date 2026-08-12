import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ChevronRight } from 'lucide-react';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';
import { useAuth } from '@/contexts/AuthContext';
import { useMyOrders, type ShopOrder } from '@/lib/orders';
import { formatNaira } from '@/components/FeaturedCollection';
import { STATUS_LABEL, isCancelled } from '@/lib/orderStatus';

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

      <section className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-24">
        <p className="section-eyebrow mb-3">My Account</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '4px' }}>
          <h1 className="font-serif text-foreground" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 300 }}>
            Hello, {fullName}
          </h1>
          <button
            onClick={() => signOut()}
            className="font-sans text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: '0.8rem' }}
          >
            Log Out
          </button>
        </div>
        <span className="gold-divider mb-2" />
        <p className="font-sans text-muted-foreground mb-10 break-words" style={{ fontWeight: 300, fontSize: '0.9rem' }}>
          {user.email}
        </p>

        <p className="section-eyebrow mb-5">Order History</p>

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
          <div className="text-center py-16" style={{ background: '#F5F0E8', border: '0.5px solid rgba(196,180,154,0.35)' }}>
            <p className="font-serif text-primary text-2xl mb-2">✦</p>
            <p className="font-sans text-muted-foreground mb-6" style={{ fontWeight: 300 }}>No orders yet.</p>
            <Link to="/" className="btn-gold inline-block">Start Shopping</Link>
          </div>
        )}

        {!isLoading && !isError && orders && orders.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1A1814' }}>
                  {['Order ID', 'Date', 'Items', 'Amount', 'Payment', 'Status', ''].map((h) => (
                    <th key={h} style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '9px', fontWeight: 500,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: '#C4B49A', padding: '13px 16px',
                      textAlign: h === '' ? 'center' : 'left',
                      whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <OrderRow key={order.id} order={order} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <SemperaFooter />
    </div>
  );
}

function OrderRow({ order, index }: { order: ShopOrder; index: number }) {
  const cancelled = isCancelled(order.status);
  const paid = order.payment_status === 'paid';
  const date = new Date(order.created_at).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  const itemSummary = order.items.length === 1
    ? order.items[0].product_name
    : `${order.items[0].product_name} +${order.items.length - 1} more`;

  const TD: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '13px', fontWeight: 300,
    color: '#3D3A34',
    padding: '14px 16px',
    borderBottom: '0.5px solid rgba(196,180,154,0.2)',
    verticalAlign: 'middle',
  };

  return (
    <tr style={{ backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(196,180,154,0.05)' }}>
      {/* Order ID */}
      <td style={{ ...TD, fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#8A7F6E', maxWidth: '140px' }}>
        <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {order.reference}
        </span>
      </td>

      {/* Date */}
      <td style={{ ...TD, whiteSpace: 'nowrap' }}>{date}</td>

      {/* Items */}
      <td style={{ ...TD, maxWidth: '180px' }}>
        <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {itemSummary}
        </span>
      </td>

      {/* Amount */}
      <td style={{ ...TD, fontWeight: 500, color: '#1A1814', whiteSpace: 'nowrap' }}>
        {formatNaira(order.total_ngn)}
      </td>

      {/* Payment */}
      <td style={TD}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em',
          padding: '3px 10px',
          backgroundColor: paid ? '#edf7f0' : '#faf4e8',
          color: paid ? '#1a7f47' : '#92611a',
        }}>
          {paid ? 'Paid' : 'Pending'}
        </span>
      </td>

      {/* Order Status */}
      <td style={TD}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em',
          padding: '3px 10px',
          backgroundColor: cancelled ? '#fdecec' : 'rgba(196,180,154,0.15)',
          color: cancelled ? '#c0392b' : '#5A5550',
        }}>
          {STATUS_LABEL[order.status]}
        </span>
      </td>

      {/* Action */}
      <td style={{ ...TD, textAlign: 'center' }}>
        <Link
          to={`/order/${order.reference}`}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px', fontWeight: 400,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#1A1814', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          View <ChevronRight size={13} />
        </Link>
      </td>
    </tr>
  );
}
