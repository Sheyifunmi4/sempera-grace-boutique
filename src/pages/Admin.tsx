import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Save } from 'lucide-react';
import SemperaNav from '@/components/SemperaNav';
import SemperaFooter from '@/components/SemperaFooter';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { fetchProducts, formatNaira, type Product } from '@/components/FeaturedCollection';

interface StockRow {
  product: Product;
  draft: number;
  saving: boolean;
  saved: boolean;
}

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows]       = useState<StockRow[]>([]);
  const [fetching, setFetching] = useState(true);
  const [globalError, setGlobalError] = useState('');

  // Auth + admin check
  useEffect(() => {
    if (loading) return;
    if (!user) { navigate('/auth?redirect=/admin', { replace: true }); return; }

    supabase.rpc('is_admin').then(({ data, error }) => {
      if (error || !data) {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
        loadProducts();
      }
    });
  }, [loading, user]);

  const loadProducts = async () => {
    setFetching(true);
    try {
      const products = await fetchProducts();
      // Sort: collection asc, then code asc
      products.sort((a, b) =>
        a.collection.localeCompare(b.collection) || a.code.localeCompare(b.code)
      );
      setRows(products.map((p) => ({ product: p, draft: p.stockQuantity, saving: false, saved: false })));
    } catch {
      setGlobalError('Could not load products.');
    } finally {
      setFetching(false);
    }
  };

  const updateDraft = (productId: string, value: string) => {
    const qty = Math.max(0, parseInt(value, 10) || 0);
    setRows((prev) => prev.map((r) => r.product.id === productId ? { ...r, draft: qty, saved: false } : r));
  };

  const saveRow = async (productId: string) => {
    const row = rows.find((r) => r.product.id === productId);
    if (!row) return;

    setRows((prev) => prev.map((r) => r.product.id === productId ? { ...r, saving: true } : r));

    const { error } = await supabase
      .from('products')
      .update({ stock_quantity: row.draft })
      .eq('id', productId);

    setRows((prev) => prev.map((r) =>
      r.product.id === productId
        ? { ...r, saving: false, saved: !error, product: error ? r.product : { ...r.product, stockQuantity: row.draft } }
        : r
    ));

    if (error) setGlobalError(`Save failed: ${error.message}`);
  };

  if (loading || isAdmin === null) return null;

  if (!isAdmin) {
    return (
      <div className="bg-background min-h-screen">
        <SemperaNav />
        <div className="max-w-xl mx-auto px-6 pt-48 pb-24 text-center">
          <p className="font-serif text-foreground text-2xl mb-3">Access Denied</p>
          <p className="font-sans text-muted-foreground" style={{ fontSize: '0.9rem' }}>
            This area is restricted to administrators.
          </p>
        </div>
        <SemperaFooter />
      </div>
    );
  }

  const COLLECTION_LABEL: Record<string, string> = { belle: 'BELLE', elan: 'ELÁN', ease: 'EASE' };

  return (
    <div className="bg-background min-h-screen">
      <SemperaNav />

      <section className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-24">
        <p className="section-eyebrow mb-3">Admin</p>
        <h1 className="font-serif text-foreground mb-1" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 300 }}>
          Inventory Management
        </h1>
        <span className="gold-divider mb-8" />

        {globalError && (
          <p className="font-sans text-destructive mb-6" style={{ fontSize: '0.85rem' }}>{globalError}</p>
        )}

        {fetching ? (
          <div className="text-center py-20">
            <Loader2 className="animate-spin mx-auto mb-3 text-primary" size={26} />
            <p className="font-sans text-muted-foreground" style={{ fontSize: '0.85rem' }}>Loading products…</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1A1814' }}>
                  {['Code', 'Product', 'Collection', 'Price', 'Stock', ''].map((h) => (
                    <th key={h} style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '9px', fontWeight: 500,
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: '#C4B49A', padding: '13px 16px',
                      textAlign: h === 'Stock' || h === '' ? 'center' : 'left',
                      whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const oos = row.product.stockQuantity === 0;
                  const TD: React.CSSProperties = {
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px', fontWeight: 300, color: '#3D3A34',
                    padding: '13px 16px',
                    borderBottom: '0.5px solid rgba(196,180,154,0.2)',
                    verticalAlign: 'middle',
                  };
                  return (
                    <tr key={row.product.id} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(196,180,154,0.05)' }}>
                      {/* Code */}
                      <td style={{ ...TD, fontSize: '11px', color: '#8A7F6E', whiteSpace: 'nowrap' }}>
                        {row.product.code}
                      </td>

                      {/* Name */}
                      <td style={{ ...TD, maxWidth: '200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {row.product.name}
                          </span>
                          {oos && (
                            <span style={{
                              fontFamily: "'DM Sans', sans-serif", fontSize: '8px', fontWeight: 500,
                              letterSpacing: '0.15em', textTransform: 'uppercase',
                              color: '#F5F0E8', background: '#8A7F6E',
                              padding: '2px 7px', flexShrink: 0,
                            }}>
                              OOS
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Collection */}
                      <td style={{ ...TD, whiteSpace: 'nowrap' }}>
                        {COLLECTION_LABEL[row.product.collection] || row.product.collection}
                      </td>

                      {/* Price */}
                      <td style={{ ...TD, fontWeight: 500, color: '#1A1814', whiteSpace: 'nowrap' }}>
                        {formatNaira(row.product.priceNgn)}
                      </td>

                      {/* Stock input */}
                      <td style={{ ...TD, textAlign: 'center' }}>
                        <input
                          type="number"
                          min={0}
                          value={row.draft}
                          onChange={(e) => updateDraft(row.product.id, e.target.value)}
                          style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500,
                            color: '#1A1814', textAlign: 'center',
                            width: '64px', padding: '5px 8px',
                            border: '1px solid rgba(196,180,154,0.5)',
                            background: 'transparent', outline: 'none',
                            borderColor: row.draft !== row.product.stockQuantity ? '#b8965a' : 'rgba(196,180,154,0.5)',
                          }}
                        />
                      </td>

                      {/* Save button */}
                      <td style={{ ...TD, textAlign: 'center' }}>
                        {row.saved ? (
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#1a7f47' }}>
                            Saved
                          </span>
                        ) : (
                          <button
                            onClick={() => saveRow(row.product.id)}
                            disabled={row.saving || row.draft === row.product.stockQuantity}
                            style={{
                              fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
                              letterSpacing: '0.12em', textTransform: 'uppercase',
                              background: row.draft === row.product.stockQuantity ? 'transparent' : '#1A1814',
                              color: row.draft === row.product.stockQuantity ? '#8A7F6E' : '#F5F0E8',
                              border: '1px solid',
                              borderColor: row.draft === row.product.stockQuantity ? 'rgba(196,180,154,0.3)' : '#1A1814',
                              padding: '6px 14px', cursor: row.saving ? 'wait' : row.draft === row.product.stockQuantity ? 'default' : 'pointer',
                              display: 'inline-flex', alignItems: 'center', gap: '5px',
                              transition: 'background 0.15s ease',
                              opacity: row.draft === row.product.stockQuantity ? 0.5 : 1,
                            }}
                          >
                            {row.saving
                              ? <Loader2 size={12} className="animate-spin" />
                              : <Save size={12} />
                            }
                            {row.saving ? 'Saving' : 'Save'}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="font-sans text-muted-foreground mt-8" style={{ fontSize: '0.78rem', fontWeight: 300 }}>
          Stock reduces automatically when a customer completes a card payment. Update quantities here when new stock arrives.
        </p>
      </section>

      <SemperaFooter />
    </div>
  );
}
