"use client";

import { FormEvent, useState } from "react";

const ROLES = ["Viewer", "Critic", "Studio"] as const;
type Role = (typeof ROLES)[number];

type Errors = { email?: string; password?: string };

/* Repeated class lists live in constants so the JSX stays readable. */
const labelClass =
  "mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-400";

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-black/35 px-[18px] py-[15px] text-stone-100 outline-none transition " +
  "placeholder:text-slate-600 " +
  "focus:border-amber-neon focus:bg-black/50 focus:shadow-[0_0_0_3px_rgb(255_176_32/0.14),0_0_24px_rgb(255_176_32/0.45)] " +
  "aria-invalid:border-crimson-neon aria-invalid:shadow-[0_0_0_3px_rgb(255_45_85/0.14)]";

const errorClass = "mt-2 text-sm text-crimson-neon";

const socialClass =
  "rounded-full border border-white/10 bg-white/[0.03] py-3 text-sm font-semibold tracking-wide transition " +
  "hover:border-amber-neon/50 hover:bg-amber-neon/5 active:scale-95";

export default function LoginForm() {
  const [role, setRole] = useState<Role>("Viewer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Password must be at least 8 characters.";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    try {
      // TODO: replace with your real Laravel call, e.g.
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, { method: "POST", ... })
      await new Promise((r) => setTimeout(r, 1200));
      setMessage(`Welcome back. The ${role.toLowerCase()} lounge is open.`);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="w-full max-w-[440px] animate-rise rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgb(0_0_0/0.55),inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-xl backdrop-saturate-150 motion-reduce:animate-none sm:p-10"
    >
      <h1 className="font-display text-5xl uppercase leading-none tracking-wide">
        Sign in
      </h1>
      <p className="mb-6 mt-2 text-sm text-slate-400">
        Step back into your private screening room.
      </p>

      {/* Pill selector */}
      <div
        role="radiogroup"
        aria-label="Account type"
        className="mb-5 grid grid-cols-3 gap-1.5 rounded-full border border-white/10 bg-black/35 p-1.5"
      >
        {ROLES.map((r) => (
          <button
            key={r}
            type="button"
            role="radio"
            aria-checked={role === r}
            onClick={() => setRole(r)}
            className="rounded-full py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 transition hover:text-stone-100 active:scale-95 aria-checked:bg-linear-to-br aria-checked:from-amber-neon aria-checked:to-orange-500 aria-checked:text-[#1a1208] aria-checked:shadow-glow-amber"
          >
            {r}
          </button>
        ))}
      </div>

      {message && (
        <div
          role="status"
          className="mb-4 animate-rise rounded-2xl border border-amber-neon/40 bg-amber-neon/10 px-4 py-3 text-sm text-amber-neon"
        >
          {message}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-err" : undefined}
          className={inputClass}
        />
        {errors.email && (
          <p id="email-err" className={errorClass}>
            {errors.email}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "pw-err" : undefined}
            className={`${inputClass} pr-[72px]`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-pressed={showPassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-widest text-slate-400 transition hover:text-amber-neon"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && (
          <p id="pw-err" className={errorClass}>
            {errors.password}
          </p>
        )}
      </div>

      <div className="mb-5 mt-1 flex items-center justify-between text-sm text-slate-400">
        <label className="inline-flex cursor-pointer select-none items-center gap-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-[18px] cursor-pointer accent-amber-neon"
          />
          Keep me signed in
        </label>
        <a
          href="#"
          className="text-amber-neon transition hover:[text-shadow:0_0_24px_rgb(255_176_32/0.45)]"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group relative w-full overflow-hidden rounded-full bg-linear-to-r from-crimson-neon via-orange-500 to-amber-neon py-4 text-sm font-bold uppercase tracking-[0.22em] text-white shadow-glow-crimson transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgb(255_45_85/0.6)] active:scale-[0.98] disabled:cursor-progress disabled:opacity-60"
      >
        <span className="relative z-10">{loading ? "Rolling…" : "Take your seat"}</span>
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full group-disabled:hidden"
        />
      </button>

      <div className="my-6 flex items-center gap-3.5 text-[0.7rem] uppercase tracking-[0.2em] text-slate-600 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
        or continue with
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" className={socialClass}>
          Google
        </button>
        <button type="button" className={socialClass}>
          Apple
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-slate-400">
        New to the cinema?{" "}
        <a href="#" className="text-amber-neon hover:underline">
          Create an account
        </a>
      </p>
    </form>
  );
}
