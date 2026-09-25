"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-app text-text-primary">
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/dashboard";
          }}
          className="space-y-3"
        >
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-secondary">Work email</label>
            <input
              type="email"
              defaultValue="consultant@company.com"
              required
              className="w-full px-3 py-2 bg-surface-elevated border border-border-muted rounded-md text-xs text-text-primary focus:outline-none focus:border-accent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-3 rounded-md bg-accent hover:bg-accent-hover text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Continue to dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-2 border-t border-border-subtle text-center">
          <p className="text-xs text-text-muted">
            Don't have an account?{" "}
            <Link href="/signup" className="text-text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
