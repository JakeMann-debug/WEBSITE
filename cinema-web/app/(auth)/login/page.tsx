"use client";

// app/login/page.tsx
// Next.js (App Router) + Tailwind CSS — black glass login page

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAction } from '@/app/action/auth';

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

type Errors = Partial<Record<keyof FormState | "form", string>>;

const initialForm: FormState = {
  email: "",
  password: "",
  remember: false,
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, form: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (form.password.length < 1) e.password = "Enter your password";
    return e;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    try {
      // TODO: replace with your real API route, e.g. /api/auth/login
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Invalid email or password");
      await new Promise((r) => setTimeout(r, 1200));

      router.push("/"); // redirect after login
    } catch (err) {
      setErrors({
        form: err instanceof Error ? err.message : "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-10">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

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
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] shadow-inner backdrop-blur-md">
            <span className="text-2xl">🎬</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Welcome back</h1>
          <p className="mt-1.5 text-sm text-white/50">
            Sign in to book your next movie night.
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {errors.form && (
            <div
              role="alert"
              className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
            >
              {errors.form}
            </div>
          )}

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

          <Field label="Password" error={errors.password}>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
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
          </Field>

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/60">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => update("remember", e.target.checked)}
                className="h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 accent-red-500"
              />
              Remember me
            </label>
            <Link
              href="/forgot"
              className="text-sm text-white/60 transition hover:text-white hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative mt-2 w-full overflow-hidden rounded-xl bg-gradient-to-b from-white to-neutral-300 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] transition hover:shadow-[0_0_40px_rgba(255,255,255,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                Signing in…
              </span>
            ) : (
              "Sign in"
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
            New here?{" "}
            <Link href="/register" className="font-medium text-white hover:underline">
              Create an account
            </Link>
          </p>
        </form>
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
      : "border-white/10 focus:border-white/30 focus:ring-white/10",
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
