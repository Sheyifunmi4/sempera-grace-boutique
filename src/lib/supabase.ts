import { createClient } from '@supabase/supabase-js';

// ─── Supabase project ──────────────────────────────────────────────
// Same project the rest of the site already uses. The anon key is safe
// to ship in the browser — row-level security (RLS) is what protects data.
const SUPABASE_URL = 'https://sieqvcjiqdjhjnxaslrd.supabase.co';
const SUPABASE_ANON_KEY = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpZXF2Y2ppcWRqaGpueGFzbHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4Nzk4NjIsImV4cCI6MjA4NzQ1NTg2Mn0',
  'E1VkbPUJ9_u_pyhIXMZb5WWrXYQvIdEY-z3dIqZp7Mc',
].join('.');

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true, // keep the customer logged in across visits
    autoRefreshToken: true, // silently refresh the session token
    detectSessionInUrl: true, // needed for the Google OAuth redirect callback
  },
});
