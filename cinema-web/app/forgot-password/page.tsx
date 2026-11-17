"use client";

// app/forgot-password/page.tsx
// Next.js (App Router) + Tailwind CSS — black glass forgot password page

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");

    setLoading(true);
    try {
      // TODO: replace with your real API route, e.g. /api/auth/forgot-password
      // await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      await new Promise((r) => setTimeout(r, 1200));
      setSent(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const resend = () => {
    setSent(false);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0c0c0e] px-4 py-10">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-600/10 blur-[120px]" />

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glass card */}
      <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_8px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:p-10">
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-amber-400 to-orange-500 shadow-[0_4px_20px_rgba(249,115,22,0.35)]">
            <span className="text-2xl">{sent ? "📬" : "🔑"}</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {sent ? "Check your inbox" : "Forgot your password?"}
          </h1>
          <p className="mt-1.5 text-sm text-white/50">
            {sent
              ? "If an account exists for that email, a reset link is on its way."
              : "Enter your email and we'll send you a link to reset it."}
          </p>
        </header>

        {sent ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-center">
              <p className="text-sm text-white/70">
                We sent a link to <span className="font-medium text-white">{email}</span>. It may
                take a minute, and check your spam folder too.
              </p>
            </div>

            <Link
              href="/login"
              className="block w-full rounded-xl bg-gradient-to-b from-amber-400 to-orange-500 py-3 text-center text-sm font-semibold text-black shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition hover:brightness-110"
            >
              Back to sign in
            </Link>

            <p className="text-center text-sm text-white/50">
              Didn&apos;t get it?{" "}
              <button
                type="button"
                onClick={resend}
                className="font-medium text-orange-400 hover:text-orange-300 hover:underline"
              >
                Try again
              </button>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={[
                  "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25",
                  "outline-none backdrop-blur-md transition",
                  "focus:bg-white/[0.07] focus:ring-2",
                  error
                    ? "border-red-400/50 focus:border-red-400/70 focus:ring-red-400/20"
                    : "border-white/10 focus:border-orange-400/60 focus:ring-orange-400/20",
                ].join(" ")}
              />
              {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 w-full overflow-hidden rounded-xl bg-gradient-to-b from-amber-400 to-orange-500 py-3 text-sm font-semibold text-black shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Sending link…
                </span>
              ) : (
                "Send reset link"
              )}
            </button>

            <p className="pt-2 text-center text-sm text-white/50">
              Remembered it?{" "}
              <Link href="/login" className="font-medium text-orange-400 hover:text-orange-300 hover:underline">
                Back to sign in
              </Link>
            </p>
          </form>
        )}
      </section>
    </main>
  );
}
