import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Add PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY to .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (for API routes only)
export function getServiceClient() {
  const serviceKey = import.meta.env.SUPABASE_SERVICE_KEY;
  if (!serviceKey) throw new Error("Missing SUPABASE_SERVICE_KEY");
  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}
