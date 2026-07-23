import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart, SIZES } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatNaira } from '@/components/FeaturedCollection';

export default function CartDrawer() {
  const { items, count, subtotal, open, setOpen, setQuantity, setSize, removeItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Every line must have a size before checkout.
  const missingSize = items.some((it) => !it.size);

  const handleCheckout = () => {
    if (missingSize) return;
    setOpen(false);
    // Gate: account is required to pay (guests can build a cart freely).
    navigate(user ? '/checkout' : '/auth?redirect=/checkout');
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-[90] bg-foreground/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        aria-hidden={!open}
      />

      {/* Panel */}
      <aside
        className="fixed top-0 right-0 z-[91] h-full w-full max-w-md bg-background shadow-2xl flex flex-col"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
          <h2 className="font-serif text-foreground flex items-center gap-2" style={{ fontSize: '1.4rem', fontWeight: 400 }}>
            <ShoppingCart size={18} style={{ color: '#b8965a' }} />
            Your Cart {count > 0 && <span className="text-muted-foreground text-base">({count})</span>}
          </h2>
          <button onClick={() => setOpen(false)} className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <div className="font-serif text-primary text-4xl mb-3">✦</div>
            <p className="font-sans text-muted-foreground mb-6" style={{ fontWeight: 300 }}>
              Your cart is empty.
            </p>
            <button onClick={() => setOpen(false)} className="btn-outline-gold">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {items.map((it) => (
              <div key={`${it.productId}|${it.size}`} className="flex gap-4">
                <img
                  src={it.product.images[0]}
                  alt={it.product.name}
                  className="w-20 h-24 object-cover flex-shrink-0 bg-cream"
                />
                <div className="flex-1 min-w-0">
                  <p className="section-eyebrow text-muted-foreground mb-0.5">{it.product.code}</p>
                  <h3 className="font-serif text-foreground truncate" style={{ fontSize: '1rem', fontWeight: 400 }}>
                    {it.product.name}
                  </h3>
                  <p className="font-sans mb-2" style={{ fontSize: '0.9rem', color: '#b8965a' }}>
                    {formatNaira(it.product.priceNgn)}
                  </p>

                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Size */}
                    <select
                      value={it.size}
                      onChange={(e) => setSize(it.productId, it.size, e.target.value)}
                      className="px-2 py-1 border font-sans text-xs outline-none focus:border-primary bg-background text-foreground cursor-pointer"
                      style={{ borderColor: it.size ? 'hsl(var(--border))' : 'hsl(0 84% 60%)' }}
                    >
                      <option value="">Size?</option>
                      {SIZES.map((s) => (
                        <option key={s} value={s}>UK {s}</option>
                      ))}
                    </select>

                    {/* Quantity stepper */}
                    <div className="flex items-center border" style={{ borderColor: 'hsl(var(--border))' }}>
                      <button
                        onClick={() => setQuantity(it.productId, it.size, it.quantity - 1)}
                        className="px-2 py-1 text-muted-foreground hover:text-foreground"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-2 font-sans text-sm" style={{ minWidth: 24, textAlign: 'center' }}>
                        {it.quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(it.productId, it.size, it.quantity + 1)}
                        className="px-2 py-1 text-muted-foreground hover:text-foreground"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(it.productId, it.size)}
                      className="text-muted-foreground hover:text-destructive transition-colors ml-auto"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border/50 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-muted-foreground" style={{ fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                Subtotal
              </span>
              <span className="font-serif text-foreground" style={{ fontSize: '1.3rem' }}>
                {formatNaira(subtotal)}
              </span>
            </div>
            <p className="font-sans text-muted-foreground" style={{ fontSize: '0.72rem' }}>
              Delivery calculated at checkout.
            </p>
            {missingSize && (
              <p className="font-sans text-destructive" style={{ fontSize: '0.78rem' }}>
                Please choose a size for every item to continue.
              </p>
            )}
            <button
              onClick={handleCheckout}
              disabled={missingSize}
              className="btn-gold w-full"
              style={{ opacity: missingSize ? 0.5 : 1, cursor: missingSize ? 'not-allowed' : 'pointer' }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
