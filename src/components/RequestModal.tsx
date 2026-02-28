import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import type { Product } from './FeaturedCollection';

// ─── EmailJS Config ────────────────────────────────────────────────
const EMAILJS_SERVICE_ID           = 'service_hvb7ck2';
const EMAILJS_ADMIN_TEMPLATE_ID    = 'template_rfca346';
const EMAILJS_CUSTOMER_TEMPLATE_ID = 'template_xr9txax';
const EMAILJS_PUBLIC_KEY           = '441l47N72miy9mYmB';

// ─── Supabase Config ───────────────────────────────────────────────
const SUPABASE_URL: string = 'https://sieqvcjiqdjhjnxaslrd.supabase.co';
const SUPABASE_KEY: string = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpZXF2Y2ppcWRqaGpueGFzbHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4Nzk4NjIsImV4cCI6MjA4NzQ1NTg2Mn0',
  'E1VkbPUJ9_u_pyhIXMZb5WWrXYQvIdEY-z3dIqZp7Mc'
].join('.');
// ───────────────────────────────────────────────────────────────────

interface RequestModalProps {
  product: Product | null;
  onClose: () => void;
}

const SIZES = ['6', '8', '10', '12', '14', '16', '18', '20', '22'];

// ─── Save order to Supabase ────────────────────────────────────────
async function saveOrderToSupabase(orderData: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_name: string;
  product_code: string;
  product_price: string;
  size: string;
  quantity: number;
  notes: string;
}) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ ...orderData, status: 'new' }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Supabase save failed:', err);
    }
  } catch (err) {
    // Supabase failure is silent — email still went through
    console.error('Supabase error:', err);
  }
}

// ─── Update product request count ─────────────────────────────────
async function incrementProductRequests(productCode: string) {
  try {
    // First get current count
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/products?code=eq.${productCode}&select=id,total_requests`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    const data = await res.json();
    if (!data || !data[0]) return;

    const { id, total_requests } = data[0];

    // Increment
    await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ total_requests: (total_requests || 0) + 1 }),
    });
  } catch (err) {
    console.error('Failed to increment product requests:', err);
  }
}

export default function RequestModal({ product, onClose }: RequestModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 1,
    size: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!product) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Valid email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.size) newErrors.size = 'Please select a size';
    if (form.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSending(true);
    setSendError('');

    const adminParams = {
      to_email:      'olalekanoluwaseyifunmi17@gmail.com',
      from_name:     form.name,
      from_email:    form.email,
      phone:         form.phone,
      product_name:  product.name,
      product_code:  product.code,
      product_price: product.price,
      size:          form.size,
      quantity:      form.quantity,
      notes:         form.notes || 'None',
    };

    const customerParams = {
      from_name:     form.name,
      from_email:    form.email,
      phone:         form.phone,
      product_name:  product.name,
      product_code:  product.code,
      product_price: product.price,
      size:          form.size,
      quantity:      form.quantity,
      notes:         form.notes || 'None',
    };

    try {
      // 1. Send order details to admin via email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        adminParams,
        EMAILJS_PUBLIC_KEY
      );

      // 2. Send confirmation to customer via email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CUSTOMER_TEMPLATE_ID,
        customerParams,
        EMAILJS_PUBLIC_KEY
      );

      // 3. Save order to Supabase (admin dashboard)
      await saveOrderToSupabase({
        customer_name:  form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        product_name:   product.name,
        product_code:   product.code,
        product_price:  product.price,
        size:           form.size,
        quantity:       form.quantity,
        notes:          form.notes || '',
      });

      // 4. Increment product request count
      incrementProductRequests(product.code);

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setSendError('Something went wrong. Please try again or contact us via WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setSendError('');
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div className="relative bg-background w-full max-w-lg max-h-[92vh] overflow-y-auto animate-scale-in shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8 lg:p-10">
          {submitted ? (
            /* ── Success State ── */
            <div className="text-center py-10">
              <div className="font-serif text-primary text-4xl mb-3">✦</div>
              <h3
                className="font-serif text-foreground mb-5"
                style={{ fontSize: '1.8rem', fontWeight: 300 }}
              >
                Thank You
              </h3>
              <span className="gold-divider mx-auto mb-5" />
              <p
                className="font-sans text-muted-foreground"
                style={{ fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 }}
              >
                Thank you for choosing Sempéra. Our stylist will contact you shortly.
                <br />
                <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                  A confirmation has been sent to {form.email}
                </span>
              </p>
            </div>
          ) : (
            <>
              {/* Product Preview */}
              <div className="flex gap-4 mb-8">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-24 object-cover flex-shrink-0"
                />
                <div>
                  <p className="section-eyebrow text-muted-foreground mb-1">{product.code}</p>
                  <h3
                    className="font-serif text-foreground mb-1"
                    style={{ fontSize: '1.25rem', fontWeight: 400 }}
                  >
                    {product.name}
                  </h3>
                  <p className="font-sans text-primary" style={{ fontSize: '1rem', fontWeight: 400 }}>
                    {product.price}
                  </p>
                </div>
              </div>

              <h2
                className="font-serif text-foreground mb-6"
                style={{ fontSize: '1.8rem', fontWeight: 300 }}
              >
                Request This Piece
              </h2>
              <span className="gold-divider mb-8" />

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block section-eyebrow text-foreground mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    maxLength={100}
                    className="w-full px-4 py-3 border font-sans text-sm outline-none transition-colors duration-300 focus:border-primary bg-background text-foreground"
                    style={{ borderColor: errors.name ? 'hsl(0 84% 60%)' : 'hsl(var(--border))' }}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block section-eyebrow text-foreground mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    maxLength={255}
                    className="w-full px-4 py-3 border font-sans text-sm outline-none transition-colors duration-300 focus:border-primary bg-background text-foreground"
                    style={{ borderColor: errors.email ? 'hsl(0 84% 60%)' : 'hsl(var(--border))' }}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block section-eyebrow text-foreground mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    maxLength={30}
                    className="w-full px-4 py-3 border font-sans text-sm outline-none transition-colors duration-300 focus:border-primary bg-background text-foreground"
                    style={{ borderColor: errors.phone ? 'hsl(0 84% 60%)' : 'hsl(var(--border))' }}
                    placeholder="+234 000 000 0000"
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>

                {/* Quantity + Size */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block section-eyebrow text-foreground mb-2">Quantity *</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={form.quantity}
                      onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-3 border font-sans text-sm outline-none transition-colors duration-300 focus:border-primary bg-background text-foreground"
                      style={{ borderColor: errors.quantity ? 'hsl(0 84% 60%)' : 'hsl(var(--border))' }}
                    />
                  </div>
                  <div>
                    <label className="block section-eyebrow text-foreground mb-2">Size *</label>
                    <select
                      value={form.size}
                      onChange={(e) => handleChange('size', e.target.value)}
                      className="w-full px-4 py-3 border font-sans text-sm outline-none transition-colors duration-300 focus:border-primary bg-background text-foreground appearance-none cursor-pointer"
                      style={{ borderColor: errors.size ? 'hsl(0 84% 60%)' : 'hsl(var(--border))' }}
                    >
                      <option value="">Select size</option>
                      {SIZES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.size && <p className="text-xs text-destructive mt-1">{errors.size}</p>}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block section-eyebrow text-foreground mb-2">Additional Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    maxLength={500}
                    rows={3}
                    className="w-full px-4 py-3 border font-sans text-sm outline-none transition-colors duration-300 focus:border-primary bg-background text-foreground resize-none"
                    style={{ borderColor: 'hsl(var(--border))' }}
                    placeholder="Any special requests or customisations..."
                  />
                </div>

                {/* Send Error */}
                {sendError && (
                  <p className="text-sm text-destructive text-center">{sendError}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-gold w-full mt-2 flex items-center justify-center gap-2"
                  disabled={sending}
                  style={{ opacity: sending ? 0.7 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}