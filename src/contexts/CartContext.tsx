import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
  type ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useProducts, type Product } from '@/components/FeaturedCollection';

// Size options offered in the cart / product page (matches the request form).
export const SIZES = ['6', '8', '10', '12', '14', '16', '18', '20', '22'];

const STORAGE_KEY = 'sempera_cart_v1';

// A cart line is just an id + size + quantity. Product details (name, price,
// image) are looked up from the cached catalog at render time.
export interface CartLine {
  productId: string;
  size: string;
  quantity: number;
}

export interface CartItem extends CartLine {
  product: Product;
}

interface CartContextValue {
  items: CartItem[]; // enriched lines that resolved to a real product
  count: number; // total quantity across all lines
  subtotal: number; // ₦, numeric
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (productId: string, size?: string, qty?: number) => void;
  setQuantity: (productId: string, size: string, qty: number) => void;
  setSize: (productId: string, fromSize: string, toSize: string) => void;
  removeItem: (productId: string, size: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

// ─── localStorage helpers (guest cart) ─────────────────────────────
function readGuest(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}
function writeGuest(lines: CartLine[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

// ─── Supabase helpers (logged-in cart) ─────────────────────────────
async function loadDbCart(userId: string): Promise<CartLine[]> {
  const { data, error } = await supabase
    .from('cart_items')
    .select('product_id,size,quantity')
    .eq('user_id', userId);
  if (error) {
    console.error('Cart load failed:', error.message);
    return [];
  }
  return (data || []).map((r) => ({
    productId: r.product_id as string,
    size: (r.size as string) || '',
    quantity: r.quantity as number,
  }));
}

// Small carts → simplest correct sync is replace-all (delete then insert).
async function replaceDbCart(userId: string, lines: CartLine[]) {
  const { error: delErr } = await supabase.from('cart_items').delete().eq('user_id', userId);
  if (delErr) return console.error('Cart clear failed:', delErr.message);
  if (lines.length === 0) return;
  const { error: insErr } = await supabase.from('cart_items').insert(
    lines.map((l) => ({
      user_id: userId,
      product_id: l.productId,
      size: l.size,
      quantity: l.quantity,
    }))
  );
  if (insErr) console.error('Cart save failed:', insErr.message);
}

function mergeLines(a: CartLine[], b: CartLine[]): CartLine[] {
  const map = new Map<string, CartLine>();
  for (const l of [...a, ...b]) {
    const key = `${l.productId}|${l.size}`;
    const cur = map.get(key);
    if (cur) cur.quantity += l.quantity;
    else map.set(key, { ...l });
  }
  return [...map.values()];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { data: products = [] } = useProducts();
  const userId = user?.id ?? null;

  const [lines, setLines] = useState<CartLine[]>(() => readGuest());
  const [open, setOpen] = useState(false);

  // When auth state changes: merge the guest cart into the DB on login,
  // then make the DB the source of truth. On logout, fall back to guest.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (userId) {
        const guest = readGuest();
        const dbLines = await loadDbCart(userId);
        const merged = guest.length ? mergeLines(dbLines, guest) : dbLines;
        if (guest.length) {
          await replaceDbCart(userId, merged);
          writeGuest([]);
        }
        if (!cancelled) setLines(merged);
      } else {
        if (!cancelled) setLines(readGuest());
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Persist to the right store on every change.
  const userIdRef = useRef(userId);
  userIdRef.current = userId;
  const persist = useCallback((next: CartLine[]) => {
    const uid = userIdRef.current;
    if (uid) replaceDbCart(uid, next);
    else writeGuest(next);
  }, []);

  const mutate = useCallback(
    (updater: (prev: CartLine[]) => CartLine[]) => {
      setLines((prev) => {
        const next = updater(prev);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const addItem = useCallback(
    (productId: string, size = '', qty = 1) => {
      mutate((prev) => {
        const i = prev.findIndex((l) => l.productId === productId && l.size === size);
        if (i >= 0) {
          const copy = [...prev];
          copy[i] = { ...copy[i], quantity: copy[i].quantity + qty };
          return copy;
        }
        return [...prev, { productId, size, quantity: qty }];
      });
      setOpen(true);
    },
    [mutate]
  );

  const setQuantity = useCallback(
    (productId: string, size: string, qty: number) => {
      mutate((prev) => {
        if (qty <= 0) return prev.filter((l) => !(l.productId === productId && l.size === size));
        return prev.map((l) =>
          l.productId === productId && l.size === size ? { ...l, quantity: qty } : l
        );
      });
    },
    [mutate]
  );

  const setSize = useCallback(
    (productId: string, fromSize: string, toSize: string) => {
      mutate((prev) => {
        const target = prev.find((l) => l.productId === productId && l.size === fromSize);
        if (!target) return prev;
        const rest = prev.filter((l) => !(l.productId === productId && l.size === fromSize));
        const collision = rest.find((l) => l.productId === productId && l.size === toSize);
        if (collision) {
          return rest.map((l) =>
            l === collision ? { ...l, quantity: l.quantity + target.quantity } : l
          );
        }
        return [...rest, { ...target, size: toSize }];
      });
    },
    [mutate]
  );

  const removeItem = useCallback(
    (productId: string, size: string) => {
      mutate((prev) => prev.filter((l) => !(l.productId === productId && l.size === size)));
    },
    [mutate]
  );

  const clear = useCallback(() => mutate(() => []), [mutate]);

  // Enrich lines with product data from the cached catalog.
  const items = useMemo<CartItem[]>(() => {
    return lines
      .map((l) => {
        const product = products.find((p) => p.id === l.productId);
        return product ? { ...l, product } : null;
      })
      .filter((x): x is CartItem => x !== null);
  }, [lines, products]);

  const count = useMemo(() => lines.reduce((n, l) => n + l.quantity, 0), [lines]);
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.product.priceNgn * it.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, open, setOpen, addItem, setQuantity, setSize, removeItem, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
