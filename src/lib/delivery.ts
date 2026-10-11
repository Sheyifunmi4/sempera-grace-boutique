// Flat delivery fees by zone, in whole Naira.
//
// ⚠️ These amounts are ALSO hard-coded in the `verify-order` Edge Function
// (supabase/functions/verify-order/index.ts). If you change a fee here,
// change it there too — the server recomputes the total and will reject a
// payment whose amount doesn't match.
// Checkout fee switches. Flip either to true to bring that charge back.
// CHARGE_DELIVERY:     add the zone's delivery fee to the amount paid.
// PASS_PAYSTACK_FEE:   gross up the charge so Sempéra receives the full amount.
export const CHARGE_DELIVERY = false;
export const PASS_PAYSTACK_FEE = false;

export type DeliveryZone = 'lagos' | 'outside' | 'international';

export interface DeliveryOption {
  zone: DeliveryZone;
  label: string;
  note: string;
  fee: number; // ₦
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  { zone: 'lagos', label: 'Lagos', note: '3–5 working days', fee: 5000 },
  { zone: 'outside', label: 'Outside Lagos (Nigeria)', note: '5–7 working days', fee: 7500 },
  { zone: 'international', label: 'International', note: 'Timeline advised after order', fee: 50000 },
];

export function deliveryFee(zone: DeliveryZone): number {
  return DELIVERY_OPTIONS.find((o) => o.zone === zone)?.fee ?? 0;
}
