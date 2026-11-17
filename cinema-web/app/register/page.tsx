"use client";

// app/register/page.tsx
// Next.js (App Router) + Tailwind CSS — black glass register page

import { useState, type FormEvent } from "react";
import Link from "next/link";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.fullName.trim().length < 2) e.fullName = "Please enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!/^[+\d][\d\s-]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (form.password.length < 8) e.password = "At least 8 characters";
    if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords do not match";
    if (!form.agree) e.agree = "You must accept the terms";
    return e;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    try {
      // TODO: replace with your real API route, e.g. /api/auth/register
      await new Promise((r) => setTimeout(r, 1200));
      setSuccess(true);
    } finally {
      setLoading(false);
    }
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
        {/* Top highlight line */}
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Brand */}
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-amber-400 to-orange-500 shadow-[0_4px_20px_rgba(249,115,22,0.35)]">
            <span className="text-2xl">🎬</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Create your account</h1>
          <p className="mt-1.5 text-sm text-white/50">
            Book seats, skip the queue, never miss a premiere.
          </p>
        </header>

        {success ? (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-center">
            <div className="mb-2 text-3xl">🍿</div>
            <h2 className="text-lg font-medium text-white">You&apos;re all set!</h2>
            <p className="mt-1 text-sm text-white/60">
              Welcome, {form.fullName.split(" ")[0]}. Your account has been created.
            </p>
            <Link
              href="/login"
              className="mt-5 inline-block rounded-xl bg-gradient-to-b from-amber-400 to-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-110"
            >
              Continue to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Field label="Full name" error={errors.fullName}>
              <input
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className={inputClass(!!errors.fullName)}
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass(!!errors.email)}
              />
            </Field>

            <Field label="Phone" error={errors.phone}>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="+855 12 345 678"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass(!!errors.phone)}
              />
            </Field>

            <Field label="Password" error={errors.password}>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className={inputClass(!!errors.password) + " pr-16"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-white/50 transition hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <StrengthBar password={form.password} />
            </Field>

            <Field label="Confirm password" error={errors.confirmPassword}>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                className={inputClass(!!errors.confirmPassword)}
              />
            </Field>

            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-white/60">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => update("agree", e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 accent-orange-500"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="text-white underline-offset-2 hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-white underline-offset-2 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agree && <p className="mt-1.5 text-xs text-red-400">{errors.agree}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 w-full overflow-hidden rounded-xl bg-gradient-to-b from-amber-400 to-orange-500 py-3 text-sm font-semibold text-black shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Creating account…
                </span>
              ) : (
                "Create account"
              )}
            </button>

            <div className="flex items-center gap-3 py-1">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-white/30">or</span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <button
              type="button"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-white/80 backdrop-blur-md transition hover:bg-white/[0.08]"
            >
              Continue with Google
            </button>

            <p className="pt-2 text-center text-sm text-white/50">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-orange-400 hover:text-orange-300 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </section>
    </main>
  );
}

/* ---------- helpers ---------- */

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25",
    "outline-none backdrop-blur-md transition",
    "focus:bg-white/[0.07] focus:ring-2",
    hasError
      ? "border-red-400/50 focus:border-red-400/70 focus:ring-red-400/20"
      : "border-white/10 focus:border-orange-400/60 focus:ring-orange-400/20",
  ].join(" ");
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function StrengthBar({ password }: { password: string }) {
  if (!password) return null;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-400", "bg-emerald-400"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const idx = Math.max(score - 1, 0);

  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex flex-1 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < score ? colors[idx] : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <span className="text-[11px] text-white/40">{labels[idx]}</span>
    </div>
  );
}
