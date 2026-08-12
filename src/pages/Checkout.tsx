import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingCart, Loader2, CreditCard } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart, SIZES } from '@/contexts/CartContext';
import { formatNaira } from '@/components/FeaturedCollection';
import { DELIVERY_OPTIONS, deliveryFee, type DeliveryZone } from '@/lib/delivery';

declare const PaystackPop: {
  setup(opts: {
    key: string;
    email: string;
    amount: number; // kobo
    currency: string;
    ref: string;
    metadata?: Record<string, unknown>;
    onClose(): void;
    callback(response: { reference: string }): void;
  }): { openIframe(): void };
};

const EMAILJS_SERVICE_ID           = 'service_hvb7ck2';
const EMAILJS_ADMIN_TEMPLATE_ID    = 'template_rfca346';
const EMAILJS_CUSTOMER_TEMPLATE_ID = 'template_xr9txax';
const EMAILJS_PUBLIC_KEY           = '441l47N72miy9mYmB';
const WHATSAPP_NUMBER              = '2348027825606';
const PAYSTACK_PUBLIC_KEY          = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;

// Gross-up so Sempéra receives the exact order amount.
// Paystack local fee: 1.5% + ₦100 flat (for amounts > ₦2,500), capped at ₦2,000.
function grossUp(ngn: number): { charge: number; fee: number } {
  const RATE = 0.015;
  const FLAT = ngn > 2500 ? 100 : 0;
  const CAP  = 2000;
  const raw  = (ngn + FLAT) / (1 - RATE);
  const fee  = Math.min(raw - ngn, CAP);
  const charge = ngn + fee;
  return { charge: Math.ceil(charge), fee: Math.ceil(fee) };
}

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
  const [error, setError]   = useState('');
  const [placedRef, setPlacedRef] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate('/auth?redirect=/checkout', { replace: true });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        name: f.name || (user.user_metadata?.full_name as string) || '',
      }));
    }
  }, [user]);

  if (loading || !user) return null;

  const delivery   = deliveryFee(form.zone);
  const orderTotal = subtotal + delivery;
  const { charge, fee } = grossUp(orderTotal);
  const missingSize = items.some((it) => !it.size);
  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError('');
  };

  const validate = (): string => {
    if (items.length === 0)  return 'Your cart is empty.';
    if (missingSize)          return 'Please choose a size for every item.';
    if (!form.name.trim())    return 'Please enter your full name.';
    if (!form.phone.trim())   return 'Please enter a phone number.';
    if (!form.address.trim()) return 'Please enter a delivery address.';
    return '';
  };

  const sendNotifications = async (orderRef: string, paidViaCard: boolean) => {
    const itemLines = items
      .map((it) => `• ${it.product.name} (${it.product.code}) — Size UK ${it.size} × ${it.quantity} — ${formatNaira(it.product.priceNgn * it.quantity)}`)
      .join('\n');
    const deliveryLabel = DELIVERY_OPTIONS.find((o) => o.zone === form.zone)?.label || form.zone;
    const orderSummary = [
      `*Sempéra Order — ${orderRef}*`,
      paidViaCard ? `*Payment: PAID via card ✓*` : `*Payment: Pending (WhatsApp request)*`,
      ``,
      `*Customer:* ${form.name.trim()}`,
      `*Phone:* ${form.phone.trim()}`,
      `*Email:* ${user.email}`,
      `*Address:* ${form.address.trim()}${form.city.trim() ? ', ' + form.city.trim() : ''}`,
      `*Delivery:* ${deliveryLabel}`,
      form.notes.trim() ? `*Notes:* ${form.notes.trim()}` : '',
      ``,
      `*Items:*`,
      itemLines,
      ``,
      `*Subtotal:* ${formatNaira(subtotal)}`,
      `*Delivery:* ${formatNaira(delivery)}`,
      paidViaCard ? `*Processing fee:* ${formatNaira(fee)}` : '',
      `*Total charged:* ${formatNaira(paidViaCard ? charge : orderTotal)}`,
    ].filter(Boolean).join('\n');

    try {
      const templateParams = {
        customer_name:  form.name.trim(),
        customer_email: user.email,
        customer_phone: form.phone.trim(),
        product_name:   items.map((it) => it.product.name).join(', '),
        product_code:   items.map((it) => it.product.code).join(', '),
        product_price:  formatNaira(paidViaCard ? charge : orderTotal),
        size:           items.map((it) => `UK ${it.size}`).join(', '),
        quantity:       items.reduce((s, it) => s + it.quantity, 0),
        notes: `[${paidViaCard ? 'PAID via Paystack' : 'WhatsApp Request'} — ${orderRef}]\nDelivery: ${deliveryLabel}\nAddress: ${form.address.trim()}, ${form.city.trim()}\n\n${form.notes.trim()}`,
        to_email:  user.email,
        reply_to:  user.email,
      };
      await Promise.allSettled([
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID,    templateParams, EMAILJS_PUBLIC_KEY),
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY),
      ]);
    } catch { /* email failure is non-blocking */ }

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderSummary)}`;
    window.open(waUrl, '_blank');
  };

  const handlePayWithCard = () => {
    const v = validate();
    if (v) return setError(v);
    setError('');

    const orderRef = `SP-${Date.now().toString(36).toUpperCase()}`;

    const handler = PaystackPop.setup({
      key:      PAYSTACK_PUBLIC_KEY,
      email:    user.email!,
      amount:   charge * 100, // kobo
      currency: 'NGN',
      ref:      orderRef,
      metadata: {
        custom_fields: [
          { display_name: 'Customer Name',  variable_name: 'customer_name',  value: form.name.trim() },
          { display_name: 'Phone',          variable_name: 'phone',          value: form.phone.trim() },
          { display_name: 'Address',        variable_name: 'address',        value: `${form.address.trim()}, ${form.city.trim()}` },
          { display_name: 'Delivery Zone',  variable_name: 'delivery_zone',  value: form.zone },
          { display_name: 'Items',          variable_name: 'items',          value: items.map((it) => `${it.product.code} ×${it.quantity}`).join(', ') },
        ],
      },
      onClose() {
        setPaying(false);
      },
      async callback(response) {
        setPaying(true);
        await sendNotifications(response.reference, true);
        clear();
        setPlacedRef(response.reference);
        setPaying(false);
      },
    });

    handler.openIframe();
  };

  const handleWhatsApp = async () => {
    const v = validate();
    if (v) return setError(v);
    setError('');
    setPaying(true);
    const orderRef = `REQ-${Date.now().toString(36).toUpperCase()}`;
    await sendNotifications(orderRef, false);
    clear();
    setPlacedRef(orderRef);
    setPaying(false);
  };

  // ── Success ──
  if (placedRef) {
    return (
      <div className="bg-background min-h-screen">
        <SemperaNav />
        <section className="max-w-xl mx-auto px-6 pt-40 pb-28 text-center">
          <div className="font-serif text-primary text-5xl mb-4">✦</div>
          <h1 className="font-serif text-foreground mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 300 }}>
            Order Confirmed
          </h1>
          <span className="gold-divider mx-auto mb-6" />
          <p className="font-sans text-muted-foreground mb-2" style={{ fontWeight: 300, lineHeight: 1.8 }}>
            Your order has been confirmed and our team has been notified on WhatsApp.
          </p>
          <p className="font-sans text-muted-foreground mb-2" style={{ fontWeight: 300, lineHeight: 1.8 }}>
            A confirmation email has also been sent to your inbox.
          </p>
          <p className="font-sans text-muted-foreground mb-8" style={{ fontSize: '0.8rem' }}>
            Reference: <span className="text-foreground">{placedRef}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Open WhatsApp
            </a>
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
            {/* ── Left: items + delivery ── */}
            <div>
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
                <Row label="Processing fee (1.5%)" value={formatNaira(fee)} muted />
                <div className="h-px bg-border my-3" />
                <div className="flex items-center justify-between">
                  <span className="font-serif text-foreground" style={{ fontSize: '1.05rem' }}>Total</span>
                  <span className="font-serif text-foreground" style={{ fontSize: '1.4rem' }}>{formatNaira(charge)}</span>
                </div>
              </div>

              {error && <p className="text-sm text-destructive mt-4">{error}</p>}

              {/* Primary: pay by card */}
              <button
                onClick={handlePayWithCard}
                disabled={paying || missingSize}
                className="btn-gold w-full mt-6 flex items-center justify-center gap-2"
                style={{ opacity: paying || missingSize ? 0.6 : 1, cursor: paying ? 'wait' : 'pointer', fontSize: '11px', letterSpacing: '0.14em', padding: '16px 24px' }}
              >
                {paying
                  ? <><Loader2 size={16} className="animate-spin" /> Processing…</>
                  : <><CreditCard size={16} /> Pay with Card</>
                }
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="h-px flex-1 bg-border" />
                <span className="font-sans text-muted-foreground" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>OR</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Secondary: WhatsApp request */}
              <button
                onClick={handleWhatsApp}
                disabled={paying || missingSize}
                className="w-full flex items-center justify-center gap-2"
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 400,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  background: 'transparent', color: '#3D3A34',
                  border: '1px solid #C4B49A', padding: '13px 24px',
                  cursor: paying ? 'wait' : 'pointer',
                  opacity: paying || missingSize ? 0.6 : 1,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.117 1.528 5.847L.057 23.882l6.196-1.624A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.68-.487-5.23-1.342l-.374-.222-3.88 1.018 1.034-3.775-.244-.389A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Request via WhatsApp
              </button>

              <p className="text-center font-sans text-muted-foreground mt-4" style={{ fontSize: '0.72rem', lineHeight: 1.6 }}>
                Card payments are secured by Paystack.<br />Processing fee is covered by the customer.
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

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? 'text-muted-foreground' : 'text-muted-foreground'}>{label}</span>
      <span className={muted ? 'text-muted-foreground' : 'text-foreground'}>{value}</span>
    </div>
  );
}
