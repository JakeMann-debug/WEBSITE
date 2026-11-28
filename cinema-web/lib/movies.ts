// lib/movies.ts
// Shared mock data for movie pages. Replace with your API / database later.
// Put images in /public/posters/<slug>.jpg and /public/backdrops/<slug>.jpg

export type Format = "2D" | "3D";

export type Movie = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  synopsis: string;
  genres: string[];
  score: number; // out of 10
  duration: string;
  ageRating: string;
  language: string;
  subtitles: string;
  release: string;
  studio: string;
  director: string;
  cast: string[];
  status: "now" | "soon";
  trailer: string; // YouTube embed URL, e.g. "https://www.youtube.com/embed/VIDEO_ID". Empty = no trailer yet.
};

export type ShowGroup = { cinema: string; format: Format; times: string[] };

export const CINEMAS = ["Nitehawk Cinema", "Riverside Cinema", "Central Mall Cinema"];

export const PRICE: Record<Format, number> = { "2D": 6, "3D": 8 };

export const posterOf = (m: Pick<Movie, "slug">) => `/posters/${m.slug}.jpg`;
export const backdropOf = (m: Pick<Movie, "slug">) => `/backdrops/${m.slug}.jpg`;

export const MOVIES: Movie[] = [
  {
    id: 1,
    slug: "midnight-circuit",
    title: "Someone Special",
    tagline: "Love is the ultimate race.",
    synopsis:
      "Someone Special is a heartwarming romantic comedy that follows the journey of two individuals who find love in the most unexpected places. As they navigate through life's challenges, they discover that love is not just about finding the right person, but also about being the right person.",
    genres: ["Action", "Thriller"],
    score: 8.4,
    duration: "2h 08m",
    ageRating: "PG-13",
    language: "English",
    subtitles: "Khmer",
    release: "24 Oct 2026",
    studio: "Sithy Studios",
    director: "Sithy",
    cast: ["Sithy"],
    status: "now",
    trailer: "https://www.youtube.com/watch?v=CwGbMYLjIpQ",
  },
  {
    id: 2,
    slug: "the-quiet-orbit",
    title: "The Most Beautiful Woman in the World",
    tagline: "Unrequired love is the loudest signal.",
    synopsis:
      "When you love someone who doesn't love you back, the universe can feel like a very quiet place. But when a lonely astronomer discovers a mysterious signal from deep space, she finds herself on a journey that will change her life forever.",
    genres: ["Sci-Fi", "Drama"],
    score: 10,
    duration: "2h 31m",
    ageRating: "PG-13",
    language: "English",
    subtitles: "Khmer",
    release: "17 Oct 2026",
    studio: "Sithy Studios",
    director: "Sithy",
    cast: ["Sithy"],
    status: "now",
    trailer: "",
  },
  {
    id: 3,
    slug: "lanterns-of-kampot",
    title: "Lanterns of Kampot",
    tagline: "Home is where the light is kept.",
    synopsis:
      "A young woman returns to her family's riverside guesthouse in Kampot to sell it, but the town's lantern festival, and the neighbors who refuse to let it fade, make her question what home really means.",
    genres: ["Drama", "Family"],
    score: 8.1,
    duration: "1h 54m",
    ageRating: "G",
    language: "Khmer",
    subtitles: "English",
    release: "31 Oct 2026",
    studio: "Mekong Films",
    director: "Sophea Chan",
    cast: ["Vanna Rith", "Mony Keo", "Chenda Pich", "Bora Sim"],
    status: "now",
    trailer: "",
  },
  {
    id: 4,
    slug: "cold-ledger",
    title: "Cold Ledger",
    tagline: "Every debt gets collected.",
    synopsis:
      "A quiet accountant discovers that the books of a respected firm hide a decade of laundered money. As the people behind it close in, he has 48 hours to get the truth out, and stay alive long enough to testify.",
    genres: ["Thriller", "Crime"],
    score: 8.2,
    duration: "2h 05m",
    ageRating: "R",
    language: "English",
    subtitles: "Khmer",
    release: "07 Nov 2026",
    studio: "Gray Harbor",
    director: "Marcus Reyes",
    cast: ["Daniel Frost", "Alicia Wen", "Ravi Nair", "Pheakdey Lim"],
    status: "now",
    trailer: "",
  },
  {
    id: 5,
    slug: "paper-skies",
    title: "Paper Skies",
    tagline: "Fold your way home.",
    synopsis:
      "A lost paper crane and a curious girl set off across a world made of folded maps, tracing creases into skies to find the way back to her village before the last monsoon wind.",
    genres: ["Animation", "Family"],
    score: 8.6,
    duration: "1h 42m",
    ageRating: "G",
    language: "English",
    subtitles: "Khmer",
    release: "10 Oct 2026",
    studio: "Origami Animation",
    director: "Yuki Tanabe",
    cast: ["Mia Torres (voice)", "Sokun Heng (voice)", "Ben Archer (voice)"],
    status: "now",
    trailer: "",
  },
  {
    id: 6,
    slug: "laugh-track",
    title: "Laugh Track",
    tagline: "The worst day ever. Again.",
    synopsis:
      "A struggling stand-up comedian relives the same disastrous Saturday on loop, and the only way out is to finally land one joke that makes the whole room laugh, including the person he wronged.",
    genres: ["Comedy"],
    score: 7.8,
    duration: "1h 39m",
    ageRating: "PG-13",
    language: "English",
    subtitles: "Khmer",
    release: "03 Oct 2026",
    studio: "Backlot Comedy",
    director: "Chris Ambrose",
    cast: ["Jamie Cole", "Rathana Ouk", "Priya Shah", "Leo Tran"],
    status: "now",
    trailer: "",
  },
  {
    id: 7,
    slug: "haunt-season",
    title: "Haunt Season",
    tagline: "Don't answer the door.",
    synopsis:
      "Every autumn the same house gets a new family, and every autumn the same knock comes at 3 a.m. This year, someone finally decides to open the door.",
    genres: ["Horror"],
    score: 7.6,
    duration: "1h 47m",
    ageRating: "R",
    language: "English",
    subtitles: "Khmer",
    release: "31 Oct 2026",
    studio: "Dark Porch",
    director: "Nia Okoye",
    cast: ["Tessa Wright", "Samnang Roth", "Owen Pike", "Dalin Mao"],
    status: "now",
    trailer: "",
  },
  {
    id: 8,
    slug: "last-train-to-siem-reap",
    title: "Last Train to Siem Reap",
    tagline: "Two strangers. One long ride.",
    synopsis:
      "Two strangers share a delayed overnight journey and a single seat. By sunrise, a chance conversation has changed what both of them thought they wanted.",
    genres: ["Romance", "Drama"],
    score: 7.9,
    duration: "1h 58m",
    ageRating: "PG",
    language: "Khmer",
    subtitles: "English",
    release: "14 Nov 2026",
    studio: "Mekong Films",
    director: "Sophea Chan",
    cast: ["Kolab Seng", "Anna Meyer", "Vireak Tith"],
    status: "now",
    trailer: "",
  },
  {
    id: 9,
    slug: "reth-sopheavotey",
    title: "Reth Sopheavotey",
    tagline: "Love Story",
    synopsis:
      "When you love someone so much everying you do is remind you of them, they have been become your motivation to do everything for them, and you will never forget them, even if they are gone. This is the story of a nation, and the people who love it.",
    genres: ["Drama"],
    score: 8.1,
    duration: "2h 15m",
    ageRating: "PG-13",
    language: "English",
    subtitles: "English",
    release: "28 Nov 2026",
    studio: "John Sithy",
    director: "John Sithy",
    cast: ["JohnSithy"],
    status: "now",
    trailer: "",
  },
  // ---- Coming soon ----
  {
    id: 21,
    slug: "ember-kingdom",
    title: "Ember Kingdom",
    tagline: "Every fire starts with a spark.",
    synopsis:
      "In a kingdom that runs on fire, a young ember-keeper discovers her flame is the last one that cannot be put out.",
    genres: ["Animation", "Fantasy"],
    score: 0,
    duration: "1h 50m",
    ageRating: "PG",
    language: "English",
    subtitles: "Khmer",
    release: "12 Dec 2026",
    studio: "Origami Animation",
    director: "Yuki Tanabe",
    cast: ["Mia Torres (voice)", "Ben Archer (voice)"],
    status: "soon",
    trailer: "",
  },
  {
    id: 22,
    slug: "night-shift",
    title: "Night Shift",
    tagline: "Someone is always watching.",
    synopsis:
      "A hospital security guard notices the same patient on the cameras every night, in a room that has been empty for years.",
    genres: ["Horror", "Mystery"],
    score: 0,
    duration: "1h 44m",
    ageRating: "R",
    language: "English",
    subtitles: "Khmer",
    release: "19 Dec 2026",
    studio: "Gray Harbor",
    director: "Nia Okoye",
    cast: ["Owen Pike", "Tessa Wright"],
    status: "soon",
    trailer: "",
  },
  {
    id: 23,
    slug: "tuk-tuk-rally",
    title: "Tuk Tuk Rally",
    tagline: "Slow wheels. Big stakes.",
    synopsis:
      "Five mismatched drivers enter a cross-country tuk tuk race, each with a very different reason to win.",
    genres: ["Comedy", "Adventure"],
    score: 0,
    duration: "1h 56m",
    ageRating: "PG",
    language: "Khmer",
    subtitles: "English",
    release: "26 Dec 2026",
    studio: "Backlot Comedy",
    director: "Chris Ambrose",
    cast: ["Rathana Ouk", "Leo Tran", "Priya Shah"],
    status: "soon",
    trailer: "",
  },
  {
    id: 24,
    slug: "silent-harbor",
    title: "Silent Harbor",
    tagline: "The tide keeps every secret.",
    synopsis:
      "A fishing village's oldest secret washes ashore the night before the annual boat blessing.",
    genres: ["Drama", "Mystery"],
    score: 0,
    duration: "2h 02m",
    ageRating: "PG-13",
    language: "Khmer",
    subtitles: "English",
    release: "02 Jan 2027",
    studio: "Mekong Films",
    director: "Sophea Chan",
    cast: ["Vanna Rith", "Mony Keo"],
    status: "soon",
    trailer: "",
  },
];

const SHOWTIMES: Record<number, ShowGroup[]> = {
  1: [
    { cinema: "Nitehawk Cinema", format: "2D", times: ["10:30 AM", "01:15 PM", "04:00 PM", "07:30 PM"] },
    { cinema: "Riverside Cinema", format: "2D", times: ["11:00 AM", "02:00 PM", "08:15 PM"] },
  ],
  2: [
    { cinema: "Nitehawk Cinema", format: "3D", times: ["12:00 PM", "03:30 PM", "07:15 PM"] },
    { cinema: "Central Mall Cinema", format: "2D", times: ["01:00 PM", "06:30 PM", "09:45 PM"] },
  ],
  3: [
    { cinema: "Central Mall Cinema", format: "2D", times: ["02:00 PM", "05:00 PM", "08:30 PM"] },
    { cinema: "Riverside Cinema", format: "2D", times: ["10:00 AM", "01:30 PM"] },
  ],
  4: [
    { cinema: "Riverside Cinema", format: "3D", times: ["04:00 PM", "07:00 PM", "10:00 PM"] },
    { cinema: "Nitehawk Cinema", format: "2D", times: ["05:15 PM", "09:00 PM"] },
  ],
  5: [
    { cinema: "Central Mall Cinema", format: "2D", times: ["10:30 AM", "01:00 PM", "03:45 PM"] },
    { cinema: "Nitehawk Cinema", format: "3D", times: ["11:30 AM", "02:15 PM"] },
  ],
  9: [
    { cinema: "Nitehawk Cinema", format: "2D", times: ["9:30 PM", "11:30 PM"] },
    { cinema: "Riverside Cinema", format: "2D", times: ["9:30 PM", "11:30 PM"] },
  ],
};

export function getMovie(id: number): Movie | undefined {
  return MOVIES.find((m) => m.id === id);
}

export function getShowtimes(id: number): ShowGroup[] {
  return (
    SHOWTIMES[id] ?? [
      { cinema: CINEMAS[0], format: "2D", times: ["12:00 PM", "03:00 PM", "06:30 PM", "09:00 PM"] },
      { cinema: CINEMAS[1], format: "2D", times: ["01:00 PM", "04:30 PM", "08:00 PM"] },
    ]
  );
}
