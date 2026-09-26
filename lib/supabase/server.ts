import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && url.startsWith("http"));
}

export async function createClient() {
  const cookieStore = await cookies();
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "placeholder-anon-key";

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

export interface AuthenticatedUser {
  name: string;
  email: string;
  avatarUrl?: string;
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const cookieStore = await cookies();
  const hasDemoCookie =
    cookieStore.get("fathom_session")?.value === "true" ||
    cookieStore.get("fathom_demo_session")?.value === "true";

  // Try real Supabase auth if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        const u = data.user;
        const meta = u.user_metadata || {};
        return {
          name:
            meta.full_name ||
            meta.name ||
            u.email?.split("@")[0] ||
            "Haseeb Ahmad",
          email: u.email || "haseeb@fanthom.ai",
          avatarUrl: meta.avatar_url || meta.picture || "",
        };
      }
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "digest" in err &&
        (err as { digest: string }).digest === "DYNAMIC_SERVER_USAGE"
      ) {
        throw err;
      }
      console.warn("Supabase user fetch fallback:", err);
    }
  }

  // If user signed in via demo session cookie OR if on a live host without Supabase credentials:
  if (hasDemoCookie || !isSupabaseConfigured()) {
    return {
      name: "Haseeb Ahmad",
      email: "haseeb@fanthom.ai",
      avatarUrl: "",
    };
  }

  return null;
}
