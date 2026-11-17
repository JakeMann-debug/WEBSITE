"use client";

// app/movies/[id]/page.tsx
// Movie details: hero, synopsis, cast, trailer pop-up, and the
// date / cinema / showtime picker that leads to the seat page.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PosterImage from "@/components/PosterImage";
import {
  CINEMAS,
  MOVIES,
  PRICE,
  backdropOf,
  getMovie,
  getShowtimes,
  posterOf,
} from "@/lib/movies";

/* ------------------------------------------------------------------ */
/* Date helpers                                                        */
/* ------------------------------------------------------------------ */

type Day = { iso: string; weekday: string; day: number; month: string; label: string };

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildDays(from: Date, count = 7): Day[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
    return {
      iso,
      weekday: WEEKDAYS[d.getDay()],
      day: d.getDate(),
      month: MONTHS[d.getMonth()],
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : WEEKDAYS[d.getDay()],
    };
  });
}

// Accepts any YouTube link (watch, youtu.be, shorts or embed) and returns the embed URL.
// A normal watch link can't be shown in an iframe, which is why YouTube "refuses to connect".
function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    let id = "";
    if (u.hostname.includes("youtu.be")) id = u.pathname.slice(1);
    else if (u.pathname.startsWith("/embed/") || u.pathname.startsWith("/shorts/"))
      id = u.pathname.split("/")[2] ?? "";
    else id = u.searchParams.get("v") ?? "";
    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
}

function toMinutes(t: string) {
  const m = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return 0;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return h * 60 + Number(m[2]);
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function MovieDetailsPage() {
  const params = useParams<{ id: string }>();
  const movie = getMovie(Number(params.id));

  // Dates are built after mount so server and browser never disagree about "today"
  const [days, setDays] = useState<Day[]>([]);
  const [now, setNow] = useState<Date | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [cinema, setCinema] = useState("All");
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [fav, setFav] = useState(false);
  const [reminded, setReminded] = useState(false);

  useEffect(() => {
    const d = new Date();
    setNow(d);
    setDays(buildDays(d));
  }, []);

  useEffect(() => {
    if (!trailerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTrailerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [trailerOpen]);

  if (!movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0c0c0e] px-4 text-center text-white">
        <div className="mb-3 text-5xl">🎞️</div>
        <h1 className="text-2xl font-semibold">Movie not found</h1>
        <p className="mt-2 text-sm text-white/50">This movie doesn&apos;t exist or is no longer showing.</p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-gradient-to-b from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
        >
          Back to movies
        </Link>
      </div>
    );
  }

  const isSoon = movie.status === "soon";
  const groups = getShowtimes(movie.id).filter((g) => cinema === "All" || g.cinema === cinema);
  const selectedDay = days[dayIdx];
  const nowMinutes = now ? now.getHours() * 60 + now.getMinutes() : 0;
  const fromPrice = Math.min(...getShowtimes(movie.id).map((g) => PRICE[g.format]));
  const more = MOVIES.filter((m) => m.status === "now" && m.id !== movie.id).slice(0, 4);

  return (
    <div className="relative min-h-screen bg-[#0c0c0e] text-white">
      <div className="pointer-events-none fixed -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-orange-500/10 blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-[140px]" />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0c0c0e]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-amber-400 to-orange-500 text-black">
              <Icon name="film" className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-wide">MOVIEBOOK</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white/60 transition hover:text-white sm:inline-flex"
            >
              <Icon name="arrowLeft" className="h-3.5 w-3.5" />
              All movies
            </Link>
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-xs font-medium text-white/80 transition hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-gradient-to-b from-amber-400 to-orange-500 px-4 py-2 text-xs font-semibold text-black transition hover:brightness-110"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0">
            <PosterImage src={backdropOf(movie)} alt="" sizes="100vw" priority />
            <div className="absolute inset-0 bg-[#0c0c0e]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e] via-transparent to-transparent" />
          </div>

          <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-12 pt-8 sm:px-6 md:flex-row md:items-end md:pt-14">
            <div className="relative aspect-[2/3] w-44 shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.7)] sm:w-56">
              <PosterImage src={posterOf(movie)} alt={movie.title} sizes="224px" priority />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded border border-white/25 px-2 py-0.5 text-[11px] font-semibold text-white/80">
                  {movie.ageRating}
                </span>
                {movie.genres.map((g) => (
                  <span key={g} className="rounded-full bg-white/10 px-3 py-0.5 text-[11px] text-white/70">
                    {g}
                  </span>
                ))}
                {isSoon && (
                  <span className="rounded-full bg-orange-500/20 px-3 py-0.5 text-[11px] font-medium text-orange-300">
                    Coming soon
                  </span>
                )}
              </div>

              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{movie.title}</h1>
              <p className="mt-2 text-sm italic text-white/60">{movie.tagline}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
                {!isSoon && (
                  <span className="flex items-center gap-1.5 font-semibold text-amber-400">
                    ★ {movie.score.toFixed(1)}
                    <span className="text-xs font-normal text-white/40">/ 10</span>
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Icon name="clock" className="h-4 w-4 text-white/40" />
                  {movie.duration}
                </span>
                <span>{movie.language}</span>
                <span className="text-white/40">Subtitles: {movie.subtitles}</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {isSoon ? (
                  <button
                    type="button"
                    onClick={() => setReminded((r) => !r)}
                    className={`rounded-lg px-6 py-3 text-sm font-semibold transition ${
                      reminded
                        ? "border border-orange-400/60 bg-orange-500/15 text-orange-300"
                        : "bg-gradient-to-b from-amber-400 to-orange-500 text-black shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:brightness-110"
                    }`}
                  >
                    {reminded ? "✓ We'll remind you" : `Remind me · opens ${movie.release}`}
                  </button>
                ) : (
                  <a
                    href="#showtimes"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition hover:brightness-110"
                  >
                    <Icon name="ticket" className="h-4 w-4" />
                    Book Tickets
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setTrailerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-md transition hover:border-orange-400/50 hover:text-orange-300"
                >
                  <Icon name="play" className="h-3.5 w-3.5" fill />
                  Watch Trailer
                </button>
                <button
                  type="button"
                  onClick={() => setFav((f) => !f)}
                  aria-label={fav ? "Remove from favourites" : "Add to favourites"}
                  aria-pressed={fav}
                  className={`flex h-12 w-12 items-center justify-center rounded-lg border backdrop-blur-md transition ${
                    fav
                      ? "border-orange-400/50 bg-orange-500/30 text-orange-400"
                      : "border-white/15 bg-black/40 text-white/80 hover:text-orange-400"
                  }`}
                >
                  <Icon name="heart" className="h-5 w-5" fill={fav} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
          {/* Synopsis + details */}
          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <h2 className="text-lg font-semibold">Synopsis</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{movie.synopsis}</p>

              <h3 className="mt-8 text-sm font-semibold text-white/80">Director</h3>
              <p className="mt-2 text-sm text-white/60">{movie.director}</p>

              <h3 className="mt-6 text-sm font-semibold text-white/80">Cast</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {movie.cast.map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-rose-500 text-[11px] font-semibold">
                      {name
                        .replace(/\(.*?\)/g, "")
                        .trim()
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <span className="text-xs text-white/75">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-white/10 bg-[#141418] p-5">
              <h2 className="mb-4 text-lg font-semibold">Details</h2>
              <dl className="space-y-3 text-sm">
                {[
                  ["Release", movie.release],
                  ["Duration", movie.duration],
                  ["Language", movie.language],
                  ["Subtitles", movie.subtitles],
                  ["Age rating", movie.ageRating],
                  ["Studio", movie.studio],
                  ...(isSoon ? [] : [["Tickets from", `$${fromPrice}`]]),
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <dt className="text-white/40">{k}</dt>
                    <dd className="text-right font-medium text-white/80">{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </section>

          {/* Showtimes */}
          <section id="showtimes" className="scroll-mt-24">
            <h2 className="text-lg font-semibold">Showtimes</h2>

            {isSoon ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-[#141418] p-8 text-center">
                <div className="mb-2 text-3xl">📅</div>
                <p className="font-medium">Tickets open soon</p>
                <p className="mt-1 text-sm text-white/50">
                  {movie.title} arrives on {movie.release}. Tap &quot;Remind me&quot; above and we&apos;ll let you know.
                </p>
              </div>
            ) : (
              <>
                {/* Date strip */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Choose a date">
                  {days.length === 0
                    ? Array.from({ length: 7 }, (_, i) => (
                        <div key={i} className="h-[74px] w-[72px] shrink-0 animate-pulse rounded-xl bg-white/5" />
                      ))
                    : days.map((d, i) => (
                        <button
                          key={d.iso}
                          type="button"
                          role="tab"
                          aria-selected={dayIdx === i}
                          onClick={() => setDayIdx(i)}
                          className={`w-[72px] shrink-0 rounded-xl border px-2 py-3 text-center transition ${
                            dayIdx === i
                              ? "border-transparent bg-gradient-to-b from-amber-400 to-orange-500 text-black"
                              : "border-white/10 bg-white/5 text-white/70 hover:border-white/25"
                          }`}
                        >
                          <p className="text-[11px] font-medium">{d.label}</p>
                          <p className="text-xl font-bold leading-tight">{d.day}</p>
                          <p className="text-[11px] opacity-70">{d.month}</p>
                        </button>
                      ))}
                </div>

                {/* Cinema filter */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {["All", ...CINEMAS].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCinema(c)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                        cinema === c
                          ? "border-orange-400 bg-orange-500/15 text-orange-300"
                          : "border-white/10 text-white/60 hover:border-white/25"
                      }`}
                    >
                      {c === "All" ? "All cinemas" : c}
                    </button>
                  ))}
                </div>

                {/* Showtime groups */}
                <div className="mt-5 space-y-4">
                  {groups.length === 0 ? (
                    <p className="rounded-2xl border border-white/10 bg-[#141418] p-8 text-center text-sm text-white/50">
                      No showtimes at this cinema on this day.
                    </p>
                  ) : (
                    groups.map((g) => (
                      <div key={`${g.cinema}-${g.format}`} className="rounded-2xl border border-white/10 bg-[#141418] p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <Icon name="pin" className="h-4 w-4 text-orange-400" />
                            <h3 className="text-sm font-semibold">{g.cinema}</h3>
                            <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/70">{g.format}</span>
                          </div>
                          <span className="text-xs text-white/40">${PRICE[g.format]} per seat</span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2.5">
                          {g.times.map((t) => {
                            const past = dayIdx === 0 && now !== null && toMinutes(t) <= nowMinutes;
                            if (past || !selectedDay) {
                              return (
                                <span
                                  key={t}
                                  aria-disabled="true"
                                  className="cursor-not-allowed rounded-lg border border-white/5 px-4 py-2 text-xs font-medium text-white/20 line-through"
                                >
                                  {t}
                                </span>
                              );
                            }
                            return (
                              <Link
                                key={t}
                                href={`/booking/${movie.id}?cinema=${encodeURIComponent(g.cinema)}&date=${
                                  selectedDay.iso
                                }&time=${encodeURIComponent(t)}&format=${g.format}`}
                                className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-white/85 transition hover:border-orange-400 hover:bg-orange-500/15 hover:text-orange-300"
                              >
                                {t}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </section>

          {/* More movies */}
          {more.length > 0 && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">More movies</h2>
                <Link href="/" className="text-xs font-medium text-orange-400 transition hover:text-orange-300">
                  See all
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {more.map((m) => (
                  <Link
                    key={m.id}
                    href={`/movies/${m.id}`}
                    className="group overflow-hidden rounded-xl border border-white/10 bg-[#141418] p-2.5 transition hover:border-orange-400/40"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                      <PosterImage src={posterOf(m)} alt={m.title} sizes="(min-width: 640px) 20vw, 45vw" />
                    </div>
                    <p className="mt-3 truncate px-1 text-sm font-medium">{m.title}</p>
                    <p className="truncate px-1 pb-1 text-[11px] text-white/40">{m.genres.join(" · ")}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 px-4 py-8 text-center text-[11px] text-white/30">
        © {new Date().getFullYear()} MOVIEBOOK. All rights reserved. ·{" "}
        <Link href="/terms" className="hover:text-white">
          Terms
        </Link>{" "}
        ·{" "}
        <Link href="/privacy" className="hover:text-white">
          Privacy
        </Link>
      </footer>

      {/* Trailer pop-up */}
      {trailerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${movie.title} trailer`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setTrailerOpen(false)}
        >
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setTrailerOpen(false)}
              aria-label="Close trailer"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/80 transition hover:bg-white/20"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#141418]">
              {movie.trailer ? (
                <iframe
                  src={`${toEmbedUrl(movie.trailer)}?autoplay=1&rel=0`}
                  title={`${movie.title} trailer`}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <div className="mb-2 text-4xl">🎬</div>
                  <p className="font-medium">Trailer coming soon</p>
                  <p className="mt-1 text-xs text-white/40">
                    Paste a YouTube link in lib/movies.ts (the trailer field) to play it here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const ICONS: Record<string, string> = {
  film: "M4 4h16v16H4z M8 4v16 M16 4v16 M4 9h4 M4 15h4 M16 9h4 M16 15h4",
  play: "M6 3l14 9-14 9z",
  heart:
    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  ticket:
    "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z M13 5v2 M13 17v2 M13 11v2",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2",
  pin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  close: "M6 6l12 12 M18 6L6 18",
  arrowLeft: "M19 12H5 M12 19l-7-7 7-7",
};

function Icon({
  name,
  className,
  fill = false,
}: {
  name: string;
  className?: string;
  fill?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={fill ? 1.5 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={ICONS[name]} />
    </svg>
  );
}
