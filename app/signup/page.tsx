"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ShieldCheck, Lock } from "lucide-react";

function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const searchParams = useSearchParams();
  const authError = searchParams.get("error");

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: "select_account",
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
      }
    } catch {
      setErrorMsg("An unexpected error occurred during Google sign up.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white flex flex-col relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,229,255,0.06),transparent_70%)]" />

      {/* Top Logo */}
      <div className="pt-10 pb-6 flex justify-center relative z-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-2xl font-black tracking-tight text-white font-sans">
            FATHOM
          </span>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="mt-0.5">
            <path d="M2 12C4 4 8 2 11 8C14 14 18 12 20 4" stroke="#00B8D4" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M6 14C8 6 12 4 15 10C18 16 20 10 22 6" stroke="#00B8D4" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </svg>
        </Link>
      </div>

      {/* Main Content: Two-column layout */}
      <div className="flex-1 flex items-center justify-center px-6 pb-8 relative z-10">
        <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column: Auth Card */}
          <div className="w-full max-w-[380px] mx-auto md:mx-0">
            <div className="rounded-2xl bg-[#111318] border border-[#1E2030] p-8 space-y-6 shadow-2xl shadow-black/40">
              <div className="space-y-1">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Sign up for Fathom
                </h1>
                <p className="text-xs text-[#9EA1B2]">
                  Free forever for individuals &amp; small teams.
                </p>
              </div>

              {(authError || errorMsg) && (
                <div className="p-3 rounded-lg bg-[#1A1B22] border border-[#2A2D3E] text-xs text-[#FB7185]">
                  {errorMsg || (authError === "auth_callback_failed" ? "Authentication callback failed. Please try again." : authError)}
                </div>
              )}

              <div className="space-y-3">
                {/* Google Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 text-[#1A1A1A] text-sm font-medium flex items-center justify-center gap-3 transition-colors cursor-pointer border border-[#E0E0E0]"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  <span>{loading ? "Connecting..." : "Sign up with Google"}</span>
                </button>
              </div>

              {/* Login link */}
              <div className="text-center pt-1">
                <p className="text-sm text-[#9EA1B2]">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#00E5FF] hover:underline font-semibold">
                    Log in
                  </Link>
                </p>
              </div>

              {/* Legal */}
              <div className="text-center">
                <p className="text-[11px] text-[#5D6071] leading-relaxed">
                  By using Fathom, you agree to the{" "}
                  <a href="#" className="underline hover:text-[#9EA1B2] transition-colors">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="underline hover:text-[#9EA1B2] transition-colors">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Testimonial Quote */}
          <div className="hidden md:flex flex-col justify-center">
            <div className="max-w-[420px] space-y-5 pl-4 lg:pl-8">
              {/* Elegant SVG Quote Mark aligned with text */}
              <svg className="w-8 h-8 text-[#00E5FF] opacity-70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="text-xl lg:text-2xl font-normal text-white leading-relaxed">
                &ldquo;Fathom saves our entire team 20+ hours a month.{" "}
                <span className="text-[#00E5FF] font-medium">It&rsquo;s an absolute game-changer.</span>&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00E5FF]/20 to-[#00A3FF]/20 border border-[#00E5FF]/40 flex items-center justify-center font-bold text-xs text-[#00E5FF]">
                  DM
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">David Miller</div>
                  <div className="text-xs text-[#8E92A6]">VP of Product &amp; Operations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust & Security Bar (Clean, dark glass aesthetic) */}
      <div className="border-t border-[#151722]/80 py-5 px-6 mt-auto relative z-10 bg-[#07080D]/50 backdrop-blur-sm">
        <div className="max-w-[960px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs text-[#8E92A6]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-[#C5C8D8] font-medium">SOC 2 Type II</span>
              <span className="text-[#555869]">Certified</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-[#242738]" />
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span className="text-[#C5C8D8] font-medium">256-bit AES</span>
              <span className="text-[#555869]">Encrypted</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-[#242738]" />
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[#C5C8D8] font-medium">99.99%</span>
              <span className="text-[#555869]">Uptime</span>
            </div>
          </div>

          {/* Minimal Links & Copyright */}
          <div className="flex items-center gap-3.5 text-xs text-[#6B6F82]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <span>·</span>
            <span>&copy; {new Date().getFullYear()} Fathom</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050608] flex items-center justify-center text-xs text-[#5D6071]">Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
