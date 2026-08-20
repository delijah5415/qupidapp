import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment');
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
