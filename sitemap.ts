import type { MetadataRoute } from "next";
import { getCelebrityDirectory } from "@/lib/tmdb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://omnihub.example.com";
  const celebrities = await getCelebrityDirectory();

  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/celebrities`, changeFrequency: "daily", priority: 0.9 },
    ...celebrities.map((c) => ({
      url: `${base}/celebrity/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
