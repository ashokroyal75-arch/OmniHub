# OmniHub Portal

A daily-use dashboard (weather, translate, AI assistant, trending video, unified search) built on top of a
programmatic SEO celebrity directory, per the OmniHub spec.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase**.

## What's included

- **Dashboard homepage** (`app/page.tsx`) — search bar, weather widget, translate widget, trending videos,
  trending people, social quick-launch shortcuts, AI assistant drawer.
- **Celebrity directory** (`app/celebrities/page.tsx`) — grouped by category, sorted by trending score.
- **Celebrity profile pages** (`app/celebrity/[slug]/page.tsx`) — SSR'd with `generateMetadata` (OpenGraph +
  Twitter cards) and JSON-LD `Person` structured data for Google indexing.
- **`sitemap.ts` / `robots.ts`** — dynamic sitemap enumerating every celebrity slug.
- **API routes** under `app/api/*` — thin server-side wrappers around OpenWeatherMap, LibreTranslate/Google
  Translate, Gemini, YouTube Data API, and Google Programmable Search, each with a **mock-data fallback** so
  the app runs immediately even before you add API keys.
- **Supabase schema** (`supabase/schema.sql`) — `celebrities`, `affiliate_products`, `bookmarks`,
  `sponsored_spotlights` tables with row-level security policies.

## Running it locally

```bash
npm install
cp .env.example .env.local   # fill in the keys you have; leave the rest blank
npm run dev
```

The app is fully clickable with **zero API keys configured** — every widget falls back to realistic mock
data (clearly marked `source: "mock"` in the API responses) so you can review the UI/UX before wiring up
billing on external services.

## Wiring up real data (in order of impact)

1. **Supabase** — create a project, run `supabase/schema.sql` in the SQL editor, then set
   `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`. This is the foundation for caching celebrity
   metadata (so you're not hammering TMDB on every request) and for bookmarks/affiliate tracking.
2. **TMDB_API_KEY** — powers `lib/tmdb.ts`. In production, run a scheduled job (Vercel Cron or Supabase Edge
   Function) that pulls TMDB "popular people," enriches with a Wikipedia summary, and upserts into the
   `celebrities` table — don't call TMDB live on every page load.
3. **OPENWEATHER_API_KEY** — powers `/api/weather`.
4. **YOUTUBE_API_KEY** — powers `/api/trending` and video search mode.
5. **GEMINI_API_KEY** — powers the AI assistant drawer.
6. **GOOGLE_CSE_API_KEY + GOOGLE_CSE_ID** — powers web search mode (Google Programmable Search Engine).
7. **AMAZON_AFFILIATE_TAG** — your Amazon Associates tracking ID. Product search currently deep-links to a
   tagged Amazon search URL; upgrading to the Product Advertising API (PA-API 5.0) requires an approved
   Associates account with qualifying sales history.

## SEO notes

- Celebrity pages are the core organic-traffic surface. Keep slugs stable once published — changing a slug
  drops its indexed URL. `generateStaticParams` pre-renders known profiles at build time; new ones fall back
  to on-demand SSR via `revalidate = 3600`.
- Update `metadataBase` in `app/layout.tsx` and the hard-coded domain in `sitemap.ts` / `robots.ts` to your
  real production domain before launch.
- Add AdSense/Ezoic script tags once your ad account is approved — Google's policies require a working,
  content-complete site to be live first.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel, add the environment variables from `.env.example`.
3. Connect the production domain, then update `metadataBase`/`sitemap.ts` accordingly.
4. Enable Vercel Cron (or Supabase Edge Functions) for the TMDB/Wikipedia refresh job described above.

## Not included (needs your business setup, not just code)

- Amazon Associates + PA-API approval.
- Google AdSense/Ezoic account approval and ad slot placement.
- Sponsored-spotlight sales/booking flow (the `sponsored_spotlights` table is ready for it).
