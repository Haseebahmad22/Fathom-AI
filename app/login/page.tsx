"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const searchParams = useSearchParams();
  const authError = searchParams.get("error");

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
      }
    } catch {
      setErrorMsg("An unexpected error occurred during Google sign in.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-lg bg-surface border border-border-muted p-6 space-y-5">
      <div className="space-y-1">
        <Link href="/" className="inline-flex items-center gap-2 mb-2">
          <span className="text-base font-bold tracking-tight text-text-primary">
            FATHOM
          </span>
          <span className="w-1.5 h-3 bg-accent rounded-xs" />
        </Link>
        <h1 className="text-lg font-semibold text-text-primary">Log in to Fathom</h1>
        <p className="text-xs text-text-secondary">
          Access your meeting transcripts and AI recaps.
        </p>
      </div>

      {(authError || errorMsg) && (
        <div className="p-2.5 rounded-md bg-surface-elevated border border-border-strong text-xs text-text-secondary">
          {errorMsg || (authError === "auth_callback_failed" ? "Authentication callback failed. Please try again." : authError)}
        </div>
      )}

      <div className="space-y-3">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2.5 px-3 rounded-md bg-accent hover:bg-accent-hover disabled:opacity-50 text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          <span>{loading ? "Connecting to Google..." : "Continue with Google"}</span>
        </button>
      </div>

      <div className="pt-2 border-t border-border-subtle text-center">
        <p className="text-xs text-text-muted">
          Don't have an account?{" "}
          <Link href="/signup" className="text-text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-app text-text-primary">
      <Suspense fallback={<div className="text-xs text-text-muted">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
