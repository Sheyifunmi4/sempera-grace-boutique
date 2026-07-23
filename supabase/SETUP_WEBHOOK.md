# Paystack Webhook — reliability backstop

This makes sure an order is **always** recorded once payment succeeds, even if the
customer's browser closes before returning to the site. It runs alongside the
browser verification — no duplicate orders (idempotent on the Paystack reference).

## Already done (by me)
- ✅ Built & deployed the `paystack-webhook` Edge Function (with `--no-verify-jwt`).
- ✅ Checkout now attaches the full order to the Paystack transaction metadata.
- ✅ Uses your existing `PAYSTACK_SECRET_KEY` secret (verifies Paystack's signature).

## You do — ONE step: register the URL in Paystack
1. Paystack Dashboard → **Settings → API Keys & Webhooks**
2. In **Webhook URL** (use the TEST section while testing, LIVE later), paste:
   ```
   https://sieqvcjiqdjhjnxaslrd.supabase.co/functions/v1/paystack-webhook
   ```
3. **Save**.

That's it.

## How it works
```
Customer pays
 ├─ Browser returns  → verify-order  → creates the order
 └─ Browser DIES     → Paystack calls paystack-webhook → creates the order
```
Whichever fires first wins; the other sees the order already exists and stops.
Both recompute the total from your DB prices and confirm the Paystack amount, so
neither can be tricked into a wrong price.

## Test it
- Do a test payment as normal — the order appears (as before).
- To prove the webhook path: in Paystack Dashboard → API Keys & Webhooks there's a
  **"Send test webhook"** / you can also re-trigger from a transaction's page.
- Check it ran: Supabase → Edge Functions → **paystack-webhook → Logs** (look for `ok`).

## Note
For the metadata to reach Paystack in production, **deploy the site** after this
change (the checkout code that attaches the order metadata must be live).
