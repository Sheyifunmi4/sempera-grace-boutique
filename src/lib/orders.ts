import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { OrderStatus } from '@/lib/orderStatus';

export interface OrderItem {
  id: string;
  product_id: string;
  product_code: string | null;
  product_name: string;
  image_url: string | null;
  size: string;
  quantity: number;
  unit_price_ngn: number;
  line_total_ngn: number;
}

export interface ShopOrder {
  id: string;
  reference: string;
  status: OrderStatus;
  subtotal_ngn: number;
  delivery_ngn: number;
  processing_fee_ngn: number;
  total_ngn: number;
  delivery_zone: string;
  customer_name: string;
  customer_phone: string | null;
  customer_email: string | null;
  delivery_address: string;
  delivery_city: string | null;
  notes: string | null;
  payment_method: 'card' | 'whatsapp';
  payment_status: 'paid' | 'pending';
  created_at: string;
  items: OrderItem[];
}

export interface SaveOrderPayload {
  reference: string;
  user_id: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  delivery_city: string;
  delivery_zone: string;
  notes: string;
  subtotal_ngn: number;
  delivery_ngn: number;
  processing_fee_ngn: number;
  total_ngn: number;
  payment_method: 'card' | 'whatsapp';
  payment_status: 'paid' | 'pending';
  status: OrderStatus;
  items: Array<{
    product_id: string;
    product_code: string;
    product_name: string;
    image_url: string | null;
    size: string;
    quantity: number;
    unit_price_ngn: number;
    line_total_ngn: number;
  }>;
}

export async function saveOrder(payload: SaveOrderPayload): Promise<string | null> {
  const { items, ...orderFields } = payload;

  const { data: order, error: orderErr } = await supabase
    .from('shop_orders')
    .insert(orderFields)
    .select('id')
    .single();

  if (orderErr) {
    console.error('saveOrder error:', orderErr.message);
    return null;
  }

  const lineItems = items.map((it) => ({ ...it, order_id: order.id }));
  const { error: itemsErr } = await supabase.from('shop_order_items').insert(lineItems);
  if (itemsErr) console.error('saveOrderItems error:', itemsErr.message);

  return order.id;
}

// Fetch all orders for the signed-in customer (RLS enforces ownership).
async function fetchMyOrders(): Promise<ShopOrder[]> {
  const { data, error } = await supabase
    .from('shop_orders')
    .select('*, items:shop_order_items(*)')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data || []) as ShopOrder[];
}

export function useMyOrders(enabled: boolean) {
  return useQuery({
    queryKey: ['my-orders'],
    queryFn: fetchMyOrders,
    enabled,
    staleTime: 60 * 1000,
  });
}

// Fetch a single order by reference.
async function fetchOrderByRef(reference: string): Promise<ShopOrder | null> {
  const { data, error } = await supabase
    .from('shop_orders')
    .select('*, items:shop_order_items(*)')
    .eq('reference', reference)
    .single();
  if (error) return null;
  return data as ShopOrder;
}

export function useOrderByRef(reference: string | undefined) {
  return useQuery({
    queryKey: ['order', reference],
    queryFn: () => fetchOrderByRef(reference!),
    enabled: !!reference,
    staleTime: 30 * 1000,
  });
}
