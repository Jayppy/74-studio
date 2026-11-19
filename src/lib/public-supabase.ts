import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/**
 * Read-only client for public server reads (blog, sitemap).
 * Falls back to the build-time VITE_ values because the site is also served from hosting
 * outside Lovable, where the SUPABASE_* server variables are not set.
 */
type PublicEnv = { VITE_SUPABASE_URL?: string; VITE_SUPABASE_PUBLISHABLE_KEY?: string };

export function publicSupabase() {
  const viteEnv = import.meta.env as PublicEnv;
  const url = process.env["SUPABASE_URL"] || viteEnv.VITE_SUPABASE_URL;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] || viteEnv.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Blog storage is not configured on this host.");
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        // Opaque sb_ keys are not JWTs; send apikey without the default bearer.
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}
