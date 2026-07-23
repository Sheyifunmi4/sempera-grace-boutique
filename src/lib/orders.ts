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
  total_ngn: number;
  delivery_zone: string;
  customer_name: string;
  delivery_address: string;
  delivery_city: string | null;
  created_at: string;
  items: OrderItem[];
}

// Fetch the signed-in customer's orders (RLS ensures they only get their own).
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
