import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingCart, Loader2, Lock } from 'lucide-react';
import PaystackPop from '@paystack/inline-js';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart, SIZES } from '@/contexts/CartContext';
import { formatNaira } from '@/components/FeaturedCollection';
import { DELIVERY_OPTIONS, deliveryFee, type DeliveryZone } from '@/lib/delivery';
import { supabase } from '@/lib/supabase';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string | undefined;
const keyReady = !!PAYSTACK_PUBLIC_KEY && PAYSTACK_PUBLIC_KEY.startsWith('pk_');

export default function Checkout() {
  const { user, loading } = useAuth();
  const { items, subtotal, setQuantity, setSize, removeItem, setOpen, clear } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
    zone: 'lagos' as DeliveryZone,
  });
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');
  const [placedRef, setPlacedRef] = useState<string | null>(null);

  // Account required to check out.
  useEffect(() => {
    if (!loading && !user) navigate('/auth?redirect=/checkout', { replace: true });
  }, [loading, user, navigate]);

  // Prefill name from the account.
  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        name: f.name || (user.user_metadata?.full_name as string) || '',
      }));
    }
  }, [user]);

  if (loading || !user) return null;

  const delivery = deliveryFee(form.zone);
  const total = subtotal + delivery;
  const missingSize = items.some((it) => !it.size);
  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError('');
  };

  const validate = (): string => {
    if (items.length === 0) return 'Your cart is empty.';
    if (missingSize) return 'Please choose a size for every item.';
    if (!form.name.trim()) return 'Please enter your full name.';
    if (!form.phone.trim()) return 'Please enter a phone number.';
    if (!form.address.trim()) return 'Please enter a delivery address.';
    return '';
  };

  const handlePay = () => {
    const v = validate();
    if (v) return setError(v);
    if (!keyReady) return setError('Payments are not configured yet. Please try again shortly.');

    setError('');
    setPaying(true);

    const reference = `sempera_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    const popup = new PaystackPop();
    popup.newTransaction({
      key: PAYSTACK_PUBLIC_KEY as string,
      email: user.email as string,
      amount: total * 100, // kobo
      currency: 'NGN',
      reference,
      metadata: {
        // Full order context so the server-side WEBHOOK can record the order
        // even if the browser never returns to call verify-order.
        sempera_order: {
          user_id: user.id,
          zone: form.zone,
          items: items.map((it) => ({ productId: it.productId, size: it.size, quantity: it.quantity })),
          customer: {
            name: form.name.trim(),
            email: user.email,
            phone: form.phone.trim(),
            address: form.address.trim(),
            city: form.city.trim(),
            notes: form.notes.trim(),
          },
        },
        custom_fields: [
          { display_name: 'Customer', variable_name: 'customer_name', value: form.name },
          { display_name: 'Phone', variable_name: 'phone', value: form.phone },
        ],
      },
      onSuccess: () => verifyAndPlace(reference),
      onCancel: () => setPaying(false),
    });
  };

  const verifyAndPlace = async (reference: string) => {
    try {
      const body = {
        reference,
        zone: form.zone,
        items: items.map((it) => ({ productId: it.productId, size: it.size, quantity: it.quantity })),
        customer: {
          name: form.name.trim(),
          email: user.email,
          phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          notes: form.notes.trim(),
        },
      };

      const { data, error: fnError } = await supabase.functions.invoke('verify-order', { body });

      if (fnError) {
        let msg = 'We could not confirm your payment. If you were charged, please contact us with your reference.';
        // Surface the server's specific message when available.
        const ctx = (fnError as { context?: Response }).context;
        if (ctx && typeof ctx.json === 'function') {
          try {
            const j = await ctx.json();
            if (j?.error) msg = j.error;
          } catch {
            /* keep default */
          }
        }
        throw new Error(msg);
      }

      if (!data?.ok) throw new Error(data?.error || 'Could not place order.');

      clear();
      setPlacedRef(reference);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setPaying(false);
    }
  };

  // ── Success state ──
  if (placedRef) {
    return (
      <div className="bg-background min-h-screen">
        <SemperaNav />
        <section className="max-w-xl mx-auto px-6 pt-40 pb-28 text-center">
          <div className="font-serif text-primary text-5xl mb-4">✦</div>
          <h1 className="font-serif text-foreground mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 300 }}>
            Thank You
          </h1>
          <span className="gold-divider mx-auto mb-6" />
          <p className="font-sans text-muted-foreground mb-2" style={{ fontWeight: 300, lineHeight: 1.8 }}>
            Your order has been placed and payment confirmed. Our team will begin preparing it right away.
          </p>
          <p className="font-sans text-muted-foreground mb-8" style={{ fontSize: '0.8rem' }}>
            Reference: <span className="text-foreground">{placedRef}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/account" className="btn-gold">View My Orders</Link>
            <Link to="/" className="btn-outline-gold">Continue Shopping</Link>
          </div>
        </section>
        <SemperaFooter />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <SemperaNav />

      <section className="max-w-5xl mx-auto px-6 lg:px-8 pt-40 pb-24">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div>
            <p className="section-eyebrow mb-3">Checkout</p>
            <h1 className="font-serif text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}>
              Secure Checkout
            </h1>
          </div>
          {items.length > 0 && (
            <button onClick={() => setOpen(true)} className="btn-outline-gold inline-flex items-center gap-2" style={{ fontSize: '0.75rem' }}>
              <ShoppingCart size={15} /> Edit in Cart
            </button>
          )}
        </div>
        <span className="gold-divider mb-10" />

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-sans text-muted-foreground mb-6" style={{ fontWeight: 300 }}>Your cart is empty.</p>
            <Link to="/" className="btn-gold inline-block">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">
            {/* ── Left: items + delivery details ── */}
            <div>
              {/* Items */}
              <div className="space-y-6 mb-12">
                {items.map((it) => (
                  <div key={`${it.productId}|${it.size}`} className="flex gap-4 border-b border-border/40 pb-6">
                    <img src={it.product.images[0]} alt={it.product.name} className="w-20 h-24 object-cover bg-cream flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="section-eyebrow text-muted-foreground mb-0.5">{it.product.code}</p>
                      <h3 className="font-serif text-foreground" style={{ fontSize: '1.05rem' }}>{it.product.name}</h3>
                      <p className="font-sans mb-2" style={{ fontSize: '0.85rem', color: '#b8965a' }}>{formatNaira(it.product.priceNgn)} each</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <select
                          value={it.size}
                          onChange={(e) => setSize(it.productId, it.size, e.target.value)}
                          className="px-2 py-1 border font-sans text-xs outline-none focus:border-primary bg-background text-foreground cursor-pointer"
                          style={{ borderColor: it.size ? 'hsl(var(--border))' : 'hsl(0 84% 60%)' }}
                        >
                          <option value="">Size?</option>
                          {SIZES.map((s) => <option key={s} value={s}>UK {s}</option>)}
                        </select>
                        <div className="flex items-center border" style={{ borderColor: 'hsl(var(--border))' }}>
                          <button onClick={() => setQuantity(it.productId, it.size, it.quantity - 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground" aria-label="Decrease"><Minus size={13} /></button>
                          <span className="px-2 font-sans text-sm" style={{ minWidth: 24, textAlign: 'center' }}>{it.quantity}</span>
                          <button onClick={() => setQuantity(it.productId, it.size, it.quantity + 1)} className="px-2 py-1 text-muted-foreground hover:text-foreground" aria-label="Increase"><Plus size={13} /></button>
                        </div>
                        <button onClick={() => removeItem(it.productId, it.size)} className="text-muted-foreground hover:text-destructive transition-colors inline-flex items-center gap-1" aria-label="Remove">
                          <Trash2 size={15} /><span className="font-sans" style={{ fontSize: '0.75rem' }}>Remove</span>
                        </button>
                      </div>
                    </div>
                    <span className="font-serif text-foreground self-center" style={{ fontSize: '1.05rem' }}>{formatNaira(it.product.priceNgn * it.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Delivery details */}
              <h2 className="font-serif text-foreground mb-5" style={{ fontSize: '1.4rem', fontWeight: 400 }}>Delivery Details</h2>
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name *" value={form.name} onChange={(v) => update('name', v)} placeholder="Your full name" />
                  <Field label="Phone Number *" value={form.phone} onChange={(v) => update('phone', v)} placeholder="+234 000 000 0000" />
                </div>
                <Field label="Delivery Address *" value={form.address} onChange={(v) => update('address', v)} placeholder="House no, street, area" />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="City / Town" value={form.city} onChange={(v) => update('city', v)} placeholder="e.g. Lekki" />
                  <div>
                    <label className="block section-eyebrow text-foreground mb-2">Delivery Zone *</label>
                    <select
                      value={form.zone}
                      onChange={(e) => { setForm((f) => ({ ...f, zone: e.target.value as DeliveryZone })); setError(''); }}
                      className="w-full px-4 py-3 border font-sans text-sm outline-none focus:border-primary bg-background text-foreground cursor-pointer"
                      style={{ borderColor: 'hsl(var(--border))' }}
                    >
                      {DELIVERY_OPTIONS.map((o) => (
                        <option key={o.zone} value={o.zone}>{o.label} — {formatNaira(o.fee)} ({o.note})</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block section-eyebrow text-foreground mb-2">Order Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    rows={2}
                    maxLength={500}
                    className="w-full px-4 py-3 border font-sans text-sm outline-none focus:border-primary bg-background text-foreground resize-none"
                    style={{ borderColor: 'hsl(var(--border))' }}
                    placeholder="Any special instructions…"
                  />
                </div>
              </div>
            </div>

            {/* ── Right: summary + pay ── */}
            <aside className="lg:sticky lg:top-32 h-fit bg-cream p-7">
              <h2 className="font-serif text-foreground mb-5" style={{ fontSize: '1.3rem', fontWeight: 400 }}>Order Total</h2>
              <div className="space-y-3 font-sans" style={{ fontSize: '0.92rem' }}>
                <Row label="Subtotal" value={formatNaira(subtotal)} />
                <Row label={`Delivery — ${DELIVERY_OPTIONS.find((o) => o.zone === form.zone)?.label}`} value={formatNaira(delivery)} />
                <div className="h-px bg-border my-3" />
                <div className="flex items-center justify-between">
                  <span className="font-serif text-foreground" style={{ fontSize: '1.05rem' }}>Total</span>
                  <span className="font-serif text-foreground" style={{ fontSize: '1.4rem' }}>{formatNaira(total)}</span>
                </div>
              </div>

              {error && <p className="text-sm text-destructive mt-5">{error}</p>}
              {!keyReady && (
                <p className="text-xs text-muted-foreground mt-5">
                  Paystack key not set yet — payment is disabled until <code>VITE_PAYSTACK_PUBLIC_KEY</code> is configured.
                </p>
              )}

              <button
                onClick={handlePay}
                disabled={paying || missingSize || !keyReady}
                className="btn-gold w-full mt-6 flex items-center justify-center gap-2"
                style={{ opacity: paying || missingSize || !keyReady ? 0.6 : 1, cursor: paying ? 'wait' : 'pointer' }}
              >
                {paying ? <><Loader2 size={16} className="animate-spin" /> Processing…</> : <><Lock size={15} /> Pay {formatNaira(total)}</>}
              </button>
              <p className="text-center font-sans text-muted-foreground mt-3" style={{ fontSize: '0.72rem' }}>
                Secured by Paystack · Card, Bank Transfer, USSD
              </p>
              <Link to="/" className="block text-center mt-4 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">← Continue shopping</Link>
            </aside>
          </div>
        )}
      </section>

      <SemperaFooter />
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block section-eyebrow text-foreground mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={200}
        className="w-full px-4 py-3 border font-sans text-sm outline-none focus:border-primary bg-background text-foreground"
        style={{ borderColor: 'hsl(var(--border))' }}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
