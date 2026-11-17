// components/LegalLayout.tsx
// Shared black glass layout for Terms and Privacy pages

import Link from "next/link";
import type { ReactNode } from "react";

export type LegalSection = {
  heading: string;
  body: ReactNode;
};

export default function LegalLayout({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0c0c0e] px-4 py-10 text-white">
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

      <div className="relative z-10 mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition hover:text-white"
        >
          ← Back to home
        </Link>

        <article className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_8px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:p-12">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <header className="mb-8 border-b border-white/10 pb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-amber-400 to-orange-500 text-xl">
              🎬
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-1.5 text-xs uppercase tracking-wider text-white/40">
              Last updated: {updated}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{intro}</p>
          </header>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <section key={s.heading}>
                <h2 className="mb-2.5 text-lg font-medium tracking-tight text-white">
                  {i + 1}. {s.heading}
                </h2>
                <div className="space-y-3 text-sm leading-relaxed text-white/60">{s.body}</div>
              </section>
            ))}
          </div>

          <footer className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-6 text-xs text-white/40">
            <Link href="/terms" className="transition hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/login" className="transition hover:text-white">
              Sign in
            </Link>
          </footer>
        </article>
      </div>
    </main>
  );
}
