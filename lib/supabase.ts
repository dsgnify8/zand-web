import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase Storage base URL for business photos
export const STORAGE_URL = `${supabaseUrl}/storage/v1/object/public`;

export function businessPhotoUrl(photoKey: string): string | null {
  if (!photoKey || photoKey.startsWith("demo:")) {
    // Demo photos not yet migrated to Supabase — return null for placeholder
    return null;
  }
  return `${STORAGE_URL}/business-photos/${photoKey}`;
}
