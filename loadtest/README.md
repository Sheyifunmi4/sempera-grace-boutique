# Load testing

Safe concurrency tests for the Sempéra storefront. These exercise the **static
app shell** (the part a CDN/host serves) — they do **not** hammer the live
Supabase database, so they are safe to run.

## 1. App-shell throughput (autocannon)

Tests how many concurrent visitors the built site can serve.

```bash
npm run build
npm run preview -- --port 4173   # in one terminal
npx autocannon -c 1000 -d 15 http://127.0.0.1:4173/   # in another
```

- `-c 1000` = 1,000 concurrent connections
- `-d 15`   = for 15 seconds

Look for: **non-2xx = 0** and a low/stable latency. That proves the shell holds
up under 1,000 concurrent users.

## 2. What this does NOT test

Each real visitor's browser fetches product data directly from Supabase. We
deliberately do not load-test production Supabase (that would recreate an
outage). The code changes that protect Supabase under load are:

- **React Query caching** (`staleTime`) — repeat views & navigation hit cache,
  not the network.
- **Single shared catalog request** — the 3 homepage collection sections now
  share ONE Supabase request instead of 3.
- **Auto-retry with exponential backoff + jitter** — transient 429/timeout
  errors self-heal instead of showing "please try again".

To safely test the data path at scale, point a load test at a **separate
staging Supabase project**, never production.
```
