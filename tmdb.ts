import { MOCK_CELEBRITIES, findCelebrity } from "./mockData";
import type { Celebrity } from "./types";

const TMDB_BASE = "https://api.themoviedb.org/3";

function hasTmdbKey() {
  return Boolean(process.env.TMDB_API_KEY);
}

/**
 * Returns the full celebrity directory. Once TMDB_API_KEY + Supabase caching
 * are wired up, replace this with a query against the `celebrities` table
 * (populated by a scheduled job that pulls TMDB "popular people" + Wikipedia
 * summaries), falling back to a live TMDB call on cache miss.
 */
export async function getCelebrityDirectory(): Promise<Celebrity[]> {
  if (!hasTmdbKey()) {
    return MOCK_CELEBRITIES;
  }

  try {
    const res = await fetch(
      `${TMDB_BASE}/person/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`TMDB responded ${res.status}`);
    const data = await res.json();
    // Map TMDB's shape onto our Celebrity type; real implementation should
    // enrich with Wikipedia bio + persist into Supabase for SEO-stable slugs.
    return data.results.map((p: any) => ({
      slug: slugify(p.name),
      name: p.name,
      category: "actor",
      bio: "",
      birthDate: "",
      profileImageUrl: p.profile_path ? `https://image.tmdb.org/t/p/w500${p.profile_path}` : "",
      trendingScore: Math.round(p.popularity),
      socialLinks: [],
      recentWorks: (p.known_for ?? []).map((k: any) => ({
        title: k.title ?? k.name,
        year: Number((k.release_date ?? k.first_air_date ?? "").slice(0, 4)) || 0,
        type: k.media_type === "movie" ? "Film" : "Series",
      })),
      news: [],
      affiliateProducts: [],
    }));
  } catch (err) {
    console.error("TMDB fetch failed, falling back to mock data:", err);
    return MOCK_CELEBRITIES;
  }
}

export async function getCelebrityBySlug(slug: string): Promise<Celebrity | undefined> {
  if (!hasTmdbKey()) {
    return findCelebrity(slug);
  }
  const all = await getCelebrityDirectory();
  return all.find((c) => c.slug === slug) ?? findCelebrity(slug);
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
