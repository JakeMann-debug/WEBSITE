"use client";

// app/page.tsx
// Next.js (App Router) + Tailwind CSS — dark + orange dashboard home page
// Sidebar, search + categories, hero, popular movies, continue watching,
// interactive seat picker and running shows.

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/* Mock data — replace with your API / database later                  */
/* Put images in /public/posters/ and /public/backdrops/               */
/* ------------------------------------------------------------------ */

type Category = "Movie" | "Series" | "Drama" | "Animation" | "Comedy";

type Movie = {
  id: number;
  title: string;
  studio: string;
  rating: number; // 1-5
  category: Category;
  poster: string;
  status?: "now" | "soon"; // defaults to "now"
  release?: string; // shown for "soon" movies
};

const CATEGORIES: Category[] = ["Movie", "Series", "Drama", "Animation", "Comedy"];

const HERO = {
  id: 2,
  title: "The Quiet Orbit",
  tagline: "Some silences are signals.",
  image: "/backdrops/the-quiet-orbit.jpg",
};

const POPULAR: Movie[] = [
  { id: 1, title: "Midnight Circuit", studio: "Neon Reel Studios", rating: 5, category: "Movie", poster: "/posters/midnight-circuit.jpg" },
  { id: 2, title: "The Quiet Orbit", studio: "Starfield Pictures", rating: 4, category: "Movie", poster: "/posters/the-quiet-orbit.jpg" },
  { id: 3, title: "Lanterns of Kampot", studio: "Mekong Films", rating: 4, category: "Drama", poster: "/posters/lanterns-of-kampot.jpg" },
  { id: 4, title: "Cold Ledger", studio: "Gray Harbor", rating: 4, category: "Movie", poster: "/posters/cold-ledger.jpg" },
  { id: 5, title: "Paper Skies", studio: "Origami Animation", rating: 5, category: "Animation", poster: "/posters/paper-skies.jpg" },
  { id: 6, title: "Laugh Track", studio: "Backlot Comedy", rating: 3, category: "Comedy", poster: "/posters/laugh-track.jpg" },
  { id: 7, title: "Haunt Season", studio: "Dark Porch", rating: 3, category: "Series", poster: "/posters/haunt-season.jpg" },
  { id: 8, title: "Last Train to Siem Reap", studio: "Mekong Films", rating: 4, category: "Drama", poster: "/posters/last-train-to-siem-reap.jpg" },
  { id: 9, title: "Reth Sopheavotey", studio: "John Sithy", rating: 5, category: "Drama", poster: "/posters/photo_2026-11-15_00-13-29.jpg" }
];

const COMING_SOON: Movie[] = [
  { id: 21, title: "Ember Kingdom", studio: "Origami Animation", rating: 0, category: "Animation", poster: "/posters/ember-kingdom.jpg", status: "soon", release: "12 Dec" },
  { id: 22, title: "Night Shift", studio: "Gray Harbor", rating: 0, category: "Movie", poster: "/posters/night-shift.jpg", status: "soon", release: "19 Dec" },
  { id: 23, title: "Tuk Tuk Rally", studio: "Backlot Comedy", rating: 0, category: "Comedy", poster: "/posters/tuk-tuk-rally.jpg", status: "soon", release: "26 Dec" },
  { id: 24, title: "Silent Harbor", studio: "Mekong Films", rating: 0, category: "Drama", poster: "/posters/silent-harbor.jpg", status: "soon", release: "02 Jan" },
];

const OFFERS = [
  { id: 1, tag: "Every Tuesday", title: "Student Tuesday", desc: "Show your student ID and save on every ticket.", gradient: "from-orange-500/40 to-rose-600/30" },
  { id: 2, tag: "Bank deal", title: "Pay by card, get $2 off", desc: "Book online with a partner bank card at checkout.", gradient: "from-indigo-500/40 to-sky-600/30" },
  { id: 3, tag: "Combo", title: "Ticket + Popcorn Combo", desc: "Add a combo when you book and skip the snack line.", gradient: "from-amber-400/40 to-orange-600/30" },
];

const CINEMAS = ["All Cinemas", "Nitehawk Cinema", "Riverside Cinema", "Central Mall Cinema"];

const SHOWTIMES = [
  { movieId: 1, title: "Midnight Circuit", format: "2D", cinema: "Nitehawk Cinema", poster: "/posters/midnight-circuit.jpg", times: ["10:30 AM", "01:15 PM", "04:00 PM", "07:30 PM"] },
  { movieId: 1, title: "Midnight Circuit", format: "2D", cinema: "Riverside Cinema", poster: "/posters/midnight-circuit.jpg", times: ["11:00 AM", "02:00 PM", "08:15 PM"] },
  { movieId: 2, title: "The Quiet Orbit", format: "3D", cinema: "Nitehawk Cinema", poster: "/posters/the-quiet-orbit.jpg", times: ["12:00 PM", "03:30 PM", "07:15 PM"] },
  { movieId: 5, title: "Paper Skies", format: "2D", cinema: "Central Mall Cinema", poster: "/posters/paper-skies.jpg", times: ["10:30 AM", "01:00 PM", "03:45 PM"] },
  { movieId: 4, title: "Cold Ledger", format: "3D", cinema: "Riverside Cinema", poster: "/posters/cold-ledger.jpg", times: ["04:00 PM", "07:00 PM", "10:00 PM"] },
  { movieId: 3, title: "Lanterns of Kampot", format: "2D", cinema: "Central Mall Cinema", poster: "/posters/lanterns-of-kampot.jpg", times: ["02:00 PM", "05:00 PM", "08:30 PM"] },
];

const NAV = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Cinemas", href: "/cinemas", icon: "pin" },
  { label: "Offers", href: "/offers", icon: "tag" },
  { label: "Food & Drinks", href: "/food", icon: "coffee" },
  { label: "My Tickets", href: "/my-tickets", icon: "ticket" },
  { label: "Favourite", href: "/favourites", icon: "heart" },
  { label: "Notification", href: "/notifications", icon: "bell" },
  { label: "Setting", href: "/settings", icon: "sliders" },
  { label: "Logout", href: "/login", icon: "logout" },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("Movie");
  const [showAll, setShowAll] = useState(false);
  const [favHero, setFavHero] = useState(false);
  const [formatFilter, setFormatFilter] = useState("All");
  const [tab, setTab] = useState<"now" | "soon">("now");
  const [cinemaFilter, setCinemaFilter] = useState(CINEMAS[0]);
  const [lang, setLang] = useState<"EN" | "KH">("EN");
  // TODO: replace with the logged-in user from your auth (null = signed out)
  const [user] = useState<{ name: string; email: string } | null>(null);

  const todaysShowtimes = SHOWTIMES.filter(
    (s) =>
      (cinemaFilter === CINEMAS[0] || s.cinema === cinemaFilter) &&
      (formatFilter === "All" || s.format === formatFilter)
  );

  const movies = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source = tab === "now" ? POPULAR : COMING_SOON;
    return source.filter(
      (m) =>
        (category === "Movie" || m.category === category) &&
        (m.title.toLowerCase().includes(q) || m.studio.toLowerCase().includes(q))
    );
  }, [query, category, tab]);

  const visibleMovies = showAll ? movies : movies.slice(0, 4);

  return (
    <div className="relative min-h-screen bg-[#0c0c0e] text-white">
      {/* Ambient orange glow */}
      <div className="pointer-events-none fixed -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-orange-500/10 blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-[140px]" />

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ---------------- Sidebar ---------------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 border-r border-white/5 bg-[#101013] p-5 transition-transform duration-300 lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/" className="mb-8 flex items-center gap-2.5 px-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-amber-400 to-orange-500 text-black">
            <Icon name="film" className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-wide">MOVIEBOOK</span>
        </Link>

        <nav className="space-y-1.5">
          {NAV.map((item) => {
            const active = item.label === "Home";
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-[0_4px_20px_rgba(249,115,22,0.35)]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon name={item.icon} className="h-[18px] w-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ---------------- Main ---------------- */}
      <div className="relative z-10 pb-20 lg:pb-0 lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0c0c0e]/80 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-lg border border-white/10 bg-white/5 p-2.5 lg:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>

            <div className="relative min-w-0 flex-1 basis-48 lg:max-w-md">
              <Icon
                name="search"
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
              />
              <input
                type="search"
                placeholder="Type to Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-orange-400/60 focus:ring-2 focus:ring-orange-400/20"
              />
            </div>

            <div className="order-last flex w-full gap-2 overflow-x-auto pb-1 lg:order-none lg:w-auto lg:pb-0">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`shrink-0 rounded-lg border px-5 py-2.5 text-xs font-medium transition ${
                    category === c
                      ? "border-transparent bg-gradient-to-b from-amber-400 to-orange-500 text-black"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
            {/* Language switch */}
            <div
              className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1"
              role="group"
              aria-label="Language"
            >
              <Icon name="globe" className="ml-1.5 h-3.5 w-3.5 text-white/40" />
              {(["EN", "KH"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                    lang === l ? "bg-white/15 text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {l === "EN" ? "EN" : "ខ្មែរ"}
                </button>
              ))}
            </div>

            {user ? (
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 text-sm font-semibold">
                  {user.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </span>
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-medium">{user.name}</p>
                  <p className="text-[11px] text-white/40">{user.email}</p>
                </div>
                <Icon name="chevron" className="h-4 w-4 text-white/40" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
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
            )}
            </div>
          </div>
        </header>

        <div className="grid gap-6 px-4 py-6 sm:px-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          {/* ---------- Left column ---------- */}
          <div className="min-w-0 space-y-8">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141418]">
              <div className="relative h-60 sm:h-72 lg:h-80">
                <PosterImage
                  src={HERO.image}
                  alt={HERO.title}
                  sizes="(min-width: 1280px) 60vw, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

                <button
                  type="button"
                  onClick={() => setFavHero((f) => !f)}
                  aria-label="Add to favourites"
                  className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg border backdrop-blur-md transition ${
                    favHero
                      ? "border-orange-400/50 bg-orange-500/30 text-orange-400"
                      : "border-white/15 bg-black/40 text-white/80 hover:text-orange-400"
                  }`}
                >
                  <Icon name="heart" className="h-5 w-5" fill={favHero} />
                </button>

                <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-5 sm:p-6">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{HERO.title}</h1>
                    <p className="mt-1 text-sm text-white/60">{HERO.tagline}</p>
                  </div>
                  <div className="flex gap-2.5">
                    <Link
                      href={`/movies/${HERO.id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_4px_20px_rgba(249,115,22,0.4)] transition hover:brightness-110"
                    >
                      Book Tickets
                      <Icon name="ticket" className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-md transition hover:border-orange-400/50 hover:text-orange-300"
                    >
                      <Icon name="play" className="h-3.5 w-3.5" fill />
                      Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Popular */}
            <section>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
                  {(["now", "soon"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setTab(t);
                        setShowAll(false);
                      }}
                      className={`rounded-md px-4 py-1.5 text-xs font-medium transition ${
                        tab === t
                          ? "bg-gradient-to-b from-amber-400 to-orange-500 text-black"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {t === "now" ? "Now Showing" : "Coming Soon"}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Icon
                      name="pin"
                      className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-orange-400"
                    />
                    <select
                      value={cinemaFilter}
                      onChange={(e) => {
                        setCinemaFilter(e.target.value);
                      }}
                      aria-label="Choose cinema"
                      className="rounded-lg border border-white/10 bg-white/5 py-2 pl-8 pr-3 text-xs text-white/80 outline-none transition focus:border-orange-400/60"
                    >
                      {CINEMAS.map((c) => (
                        <option key={c} value={c} className="bg-[#141418]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAll((s) => !s)}
                    className="text-xs font-medium text-orange-400 transition hover:text-orange-300"
                  >
                    {showAll ? "Show Less" : "Show All"}
                  </button>
                </div>
              </div>

              {visibleMovies.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-white/50">
                  No movies found. Try a different search or category.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {visibleMovies.map((m) => (
                    <MovieCard key={m.id} movie={m} />
                  ))}
                </div>
              )}
            </section>

          </div>

          {/* ---------- Right column ---------- */}
          <div className="min-w-0 space-y-6">
            {/* Today's showtimes */}
            <section className="rounded-2xl border border-white/10 bg-[#141418] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">Today&apos;s Showtimes</h3>
                  <p className="mt-0.5 text-xs text-white/40">
                    {cinemaFilter === CINEMAS[0] ? "All cinemas" : cinemaFilter} · pick a time to choose seats
                  </p>
                </div>
                <select
                  value={formatFilter}
                  onChange={(e) => setFormatFilter(e.target.value)}
                  aria-label="Filter by format"
                  className="shrink-0 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70 outline-none"
                >
                  <option value="All" className="bg-[#141418]">All</option>
                  <option value="2D" className="bg-[#141418]">2D</option>
                  <option value="3D" className="bg-[#141418]">3D</option>
                </select>
              </div>

              {todaysShowtimes.length === 0 ? (
                <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/50">
                  No showtimes match your filters today.
                </p>
              ) : (
                <ul className="mt-5 space-y-4">
                  {todaysShowtimes.map((s) => (
                    <li key={`${s.movieId}-${s.cinema}`} className="flex gap-3">
                      <Link
                        href={`/movies/${s.movieId}`}
                        className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg"
                      >
                        <PosterImage src={s.poster} alt={s.title} sizes="56px" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/movies/${s.movieId}`}
                            className="truncate text-sm font-medium hover:text-orange-300"
                          >
                            {s.title}
                          </Link>
                          <span className="shrink-0 rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-white/60">
                            {s.format}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-[11px] text-white/40">{s.cinema}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {s.times.map((t) => (
                            <Link
                              key={t}
                              href={`/booking/${s.movieId}?cinema=${encodeURIComponent(
                                s.cinema
                              )}&time=${encodeURIComponent(t)}`}
                              className="rounded-md border border-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70 transition hover:border-orange-400 hover:bg-orange-500/15 hover:text-orange-300"
                            >
                              {t}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

          </div>
        </div>

        {/* Offers */}
        <section className="px-4 pb-10 sm:px-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Offers &amp; Promotions</h2>
            <Link href="/offers" className="text-xs font-medium text-orange-400 transition hover:text-orange-300">
              See All Offers
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERS.map((o) => (
              <Link
                key={o.id}
                href={`/offers/${o.id}`}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${o.gradient} p-5 transition hover:border-orange-400/40`}
              >
                <span className="rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-orange-300">
                  {o.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{o.title}</h3>
                <p className="mt-1 text-sm text-white/60">{o.desc}</p>
                <span className="mt-4 inline-block text-xs font-semibold text-orange-300 transition group-hover:translate-x-1">
                  Get this offer →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <Footer />
      </div>

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-[#101013]/95 backdrop-blur-xl lg:hidden">
        {[
          { label: "Home", href: "/", icon: "home" },
          { label: "Offers", href: "/offers", icon: "tag" },
          { label: "Cinemas", href: "/cinemas", icon: "pin" },
          { label: "F&B", href: "/food", icon: "coffee" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] ${
              item.label === "Home" ? "text-orange-400" : "text-white/50"
            }`}
          >
            <Icon name={item.icon} className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] text-white/50"
        >
          <Icon name="menu" className="h-5 w-5" />
          More
        </button>
      </nav>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-10 sm:px-6">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-xs text-white/50">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link href="/cinemas" className="hover:text-white">Cinemas</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">More</h4>
          <ul className="space-y-2 text-xs text-white/50">
            <li><Link href="/offers" className="hover:text-white">Promotions</Link></li>
            <li><Link href="/news" className="hover:text-white">News &amp; Activity</Link></li>
            <li><Link href="/my-tickets" className="hover:text-white">My Tickets</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Follow Us</h4>
          <div className="flex flex-wrap gap-2 text-xs text-white/50">
            {/* TODO: replace "#" with your real page links */}
            {[
              { name: "Facebook", href: "#" },
              { name: "Instagram", href: "#" },
              { name: "Telegram", href: "#" },
            ].map((l) => (
              <a key={l.name} href={l.href} className="hover:text-white">
                {l.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Payment Methods</h4>
          <div className="flex flex-wrap gap-2">
            {["ABA PayWay", "KHQR", "Visa", "Mastercard"].map((p) => (
              <span
                key={p}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-white/60"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-[11px] text-white/30">
        © {new Date().getFullYear()} MOVIEBOOK. All rights reserved.
      </p>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Components                                                          */
/* ------------------------------------------------------------------ */

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <article className="flex flex-col rounded-xl border border-white/10 bg-[#141418] p-2.5 transition hover:border-orange-400/40">
      <Link href={`/movies/${movie.id}`} className="relative block aspect-[4/3] overflow-hidden rounded-lg">
        <PosterImage src={movie.poster} alt={movie.title} sizes="(min-width: 1024px) 15vw, 45vw" />
      </Link>
      <div className="px-1 pb-1 pt-3">
        <h3 className="truncate text-sm font-medium">{movie.title}</h3>
        <p className="truncate text-[11px] text-white/40">{movie.studio}</p>
        {movie.status === "soon" ? (
          <p className="mt-1.5 text-xs font-medium text-orange-400">Opens {movie.release}</p>
        ) : (
          <div className="mt-1.5 flex gap-0.5 text-sm" aria-label={`${movie.rating} out of 5`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={n <= movie.rating ? "text-amber-400" : "text-white/15"}>
                ★
              </span>
            ))}
          </div>
        )}
      </div>
      {movie.status === "soon" ? (
        <button
          type="button"
          className="mt-auto rounded-md border border-orange-400/60 py-2 text-center text-xs font-semibold text-orange-300 transition hover:bg-orange-500/10"
        >
          Remind Me
        </button>
      ) : (
        <Link
          href={`/movies/${movie.id}`}
          className="mt-auto rounded-md bg-gradient-to-b from-amber-400 to-orange-500 py-2 text-center text-xs font-semibold text-black transition hover:brightness-110"
        >
          Book Now
        </Link>
      )}
    </article>
  );
}

// Shows a gradient behind the image, so the layout still looks fine
// before you add your real files to /public.
function PosterImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  // If the file is missing, hide the broken-image icon and keep the gradient.
  const [failed, setFailed] = useState(false);
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-[#1c1c22] to-indigo-900/40" />
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className="object-cover"
        />
      )}
    </>
  );
}

const ICONS: Record<string, string> = {
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  heart:
    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  ticket:
    "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z M13 5v2 M13 17v2 M13 11v2",
  coffee: "M18 8h1a4 4 0 0 1 0 8h-1 M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z M6 1v3 M10 1v3 M14 1v3",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  sliders: "M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  search: "M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z M21 21l-4.35-4.35",
  calendar: "M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18",
  play: "M6 3l14 9-14 9z",
  plus: "M12 5v14 M5 12h14",
  chevron: "M6 9l6 6 6-6",
  menu: "M3 12h18 M3 6h18 M3 18h18",
  film: "M4 4h16v16H4z M8 4v16 M16 4v16 M4 9h4 M4 15h4 M16 9h4 M16 15h4",
  pin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z",
  seat: "M5 10a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1z",
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
