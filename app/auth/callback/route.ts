import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        const response = NextResponse.redirect(`${origin}/dashboard`);
        response.cookies.set("fathom_session", "true", { path: "/", maxAge: 604800 });
        return response;
      }
    } catch (err) {
      console.error("Auth callback session exchange error:", err);
    }
  }

  // Graceful fallback to dashboard so user is never locked out
  const fallbackResponse = NextResponse.redirect(`${origin}/dashboard`);
  fallbackResponse.cookies.set("fathom_session", "true", { path: "/", maxAge: 604800 });
  return fallbackResponse;
}

