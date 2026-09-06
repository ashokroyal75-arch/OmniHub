import type { Celebrity, TrendingVideo, WeatherData } from "./types";

export const MOCK_CELEBRITIES: Celebrity[] = [
  {
    slug: "jordan-vale",
    name: "Jordan Vale",
    category: "actor",
    bio: "Jordan Vale is a film and television actor known for lead roles in genre-bending drama series and a rapid rise following a breakout festival premiere.",
    birthDate: "1994-03-12",
    profileImageUrl: "https://image.tmdb.org/t/p/w500/placeholder-jordan-vale.jpg",
    trendingScore: 98,
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/" },
      { platform: "X", url: "https://x.com/" },
    ],
    recentWorks: [
      { title: "Low Tide", year: 2025, type: "Film" },
      { title: "Nine Rivers", year: 2024, type: "Series" },
    ],
    news: [
      { headline: "Jordan Vale confirmed for festival premiere", source: "Daily Reel", url: "#" },
    ],
    affiliateProducts: [
      { title: "Low Tide — Official Poster Print", amazonUrl: "#", imageUrl: "", price: "$18.99" },
    ],
  },
  {
    slug: "amara-osei",
    name: "Amara Osei",
    category: "musician",
    bio: "Amara Osei is a singer-songwriter whose second studio album blended Afrobeat rhythms with orchestral production, earning widespread critical acclaim.",
    birthDate: "1998-07-22",
    profileImageUrl: "https://image.tmdb.org/t/p/w500/placeholder-amara-osei.jpg",
    trendingScore: 95,
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/" },
      { platform: "YouTube", url: "https://youtube.com/" },
    ],
    recentWorks: [{ title: "Harmattan", year: 2025, type: "Album" }],
    news: [{ headline: "Amara Osei announces world tour dates", source: "Sound Weekly", url: "#" }],
    affiliateProducts: [
      { title: "Harmattan — Vinyl Edition", amazonUrl: "#", imageUrl: "", price: "$27.50" },
    ],
  },
  {
    slug: "deshawn-price",
    name: "DeShawn Price",
    category: "athlete",
    bio: "DeShawn Price is a professional point guard recognized for his playmaking and a career-high assists season that reshaped his team's offense.",
    birthDate: "1996-11-02",
    profileImageUrl: "https://image.tmdb.org/t/p/w500/placeholder-deshawn-price.jpg",
    trendingScore: 91,
    socialLinks: [{ platform: "Instagram", url: "https://instagram.com/" }],
    recentWorks: [{ title: "Season MVP Finalist", year: 2025, type: "Award" }],
    news: [{ headline: "DeShawn Price signs multi-year extension", source: "Court Report", url: "#" }],
    affiliateProducts: [
      { title: "Official Player Jersey", amazonUrl: "#", imageUrl: "", price: "$89.00" },
    ],
  },
  {
    slug: "lena-marsh",
    name: "Lena Marsh",
    category: "creator",
    bio: "Lena Marsh is a video creator and essayist whose long-form documentaries on internet culture have crossed into mainstream media coverage.",
    birthDate: "2000-01-30",
    profileImageUrl: "https://image.tmdb.org/t/p/w500/placeholder-lena-marsh.jpg",
    trendingScore: 88,
    socialLinks: [{ platform: "YouTube", url: "https://youtube.com/" }],
    recentWorks: [{ title: "The Algorithm Ate My Childhood", year: 2025, type: "Documentary" }],
    news: [{ headline: "Lena Marsh's latest doc hits 10M views", source: "Creator Digest", url: "#" }],
    affiliateProducts: [],
  },
];

// Alias export — some code/examples refer to the directory as `celebrities`.
export const celebrities = MOCK_CELEBRITIES;

export const MOCK_TRENDING_VIDEOS: TrendingVideo[] = [
  { id: "v1", title: "Behind the scenes: Low Tide premiere", channel: "Daily Reel", thumbnail: "" },
  { id: "v2", title: "Amara Osei — Harmattan (Live Session)", channel: "Sound Weekly", thumbnail: "" },
  { id: "v3", title: "DeShawn Price's top 10 assists this season", channel: "Court Report", thumbnail: "" },
  { id: "v4", title: "Lena Marsh explains the algorithm", channel: "Creator Digest", thumbnail: "" },
];

export const MOCK_WEATHER: WeatherData = {
  location: "San Francisco, CA",
  unit: "F",
  current: { temp: 64, condition: "Partly Cloudy", aqi: 42 },
  forecast: [
    { day: "Mon", high: 66, low: 54, condition: "Sunny" },
    { day: "Tue", high: 63, low: 53, condition: "Fog" },
    { day: "Wed", high: 65, low: 55, condition: "Partly Cloudy" },
    { day: "Thu", high: 68, low: 56, condition: "Sunny" },
    { day: "Fri", high: 61, low: 52, condition: "Rain" },
  ],
};

export function findCelebrity(slug: string): Celebrity | undefined {
  return MOCK_CELEBRITIES.find((c) => c.slug === slug);
}
