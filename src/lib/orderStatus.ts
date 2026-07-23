// Order lifecycle. The admin moves an order along this flow; the customer
// sees it on their "My Orders" page.
export const ORDER_FLOW = ['paid', 'confirmed', 'packaging', 'in_transit', 'delivered'] as const;

export type OrderStatus = (typeof ORDER_FLOW)[number] | 'cancelled';

export const STATUS_LABEL: Record<OrderStatus, string> = {
  paid: 'Payment Received',
  confirmed: 'Order Confirmed',
  packaging: 'In Packaging',
  in_transit: 'In Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

// 0-based position in the flow (-1 for cancelled / unknown).
export function statusStep(status: string): number {
  return (ORDER_FLOW as readonly string[]).indexOf(status);
}

export function isDelivered(status: string): boolean {
  return status === 'delivered';
}

export function isCancelled(status: string): boolean {
  return status === 'cancelled';
}
