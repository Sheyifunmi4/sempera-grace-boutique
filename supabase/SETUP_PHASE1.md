# Phase 1 Setup — Customer Accounts

Do these **4 steps** in your Supabase dashboard, then we test login together.
Project: `sieqvcjiqdjhjnxaslrd`

---

## Step 1 — Create the profiles table + security

1. Supabase Dashboard → **SQL Editor** → **New query**
2. Paste the contents of [`supabase/sql/phase1_auth.sql`](./sql/phase1_auth.sql)
3. Click **Run**. You should see "Success."

This creates the `profiles` table, turns on Row Level Security (so customers only see their own data), and auto-creates a profile whenever someone signs up.

---

## Step 2 — Turn on Email sign-up

1. Dashboard → **Authentication** → **Providers** → **Email**
2. Make sure **Email** is **enabled**.
3. **"Confirm email"** setting — your choice:
   - **ON** (recommended for live): users must click a link in their email before they can log in. More secure, blocks fake emails.
   - **OFF**: instant login after signup. Easier for testing.
   - Tell me which you pick — the app already handles both.

---

## Step 3 — Turn on "Continue with Google"

1. You need a Google OAuth client. In **Google Cloud Console** → APIs & Services → **Credentials** → Create **OAuth client ID** → type **Web application**.
2. Under **Authorized redirect URIs**, add this (from your Supabase Auth settings, it's shown there too):
   ```
   https://sieqvcjiqdjhjnxaslrd.supabase.co/auth/v1/callback
   ```
3. Copy the **Client ID** and **Client secret**.
4. Supabase Dashboard → **Authentication** → **Providers** → **Google** → enable, paste Client ID + Secret → **Save**.

> If Google setup is fiddly, we can ship email/password first and add Google after — the button will just show an error until it's configured.

---

## Step 4 — Allow the app's URLs

Dashboard → **Authentication** → **URL Configuration**:

- **Site URL:** your live site URL (e.g. `https://sempera-grace-boutique.lovable.app` or your domain)
- **Redirect URLs:** add both your live URL and `http://localhost:8080` (so login works while we test locally)

---

## Then tell me

Reply when steps are done (and which "Confirm email" option you chose). I'll spin up the dev server and we'll test: sign up → log in → see your name in the nav → Google sign-in. Once that's solid, we move to **Phase 2 (the persistent cart).**
