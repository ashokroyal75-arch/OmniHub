export type CelebrityCategory = "actor" | "athlete" | "musician" | "creator";

export interface SocialLink {
  platform: string;
  url: string;
}

export interface RecentWork {
  title: string;
  year: number;
  type: string;
}

export interface NewsItem {
  headline: string;
  source: string;
  url: string;
}

export interface AffiliateProduct {
  title: string;
  amazonUrl: string;
  imageUrl: string;
  price: string;
}

export interface Celebrity {
  slug: string;
  name: string;
  category: CelebrityCategory;
  bio: string;
  birthDate: string;
  profileImageUrl: string;
  trendingScore: number;
  socialLinks: SocialLink[];
  recentWorks: RecentWork[];
  news: NewsItem[];
  affiliateProducts: AffiliateProduct[];
}

export interface WeatherForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
}

export interface WeatherData {
  location: string;
  unit: "F" | "C";
  current: { temp: number; condition: string; aqi: number | null };
  forecast: WeatherForecastDay[];
}

export interface TrendingVideo {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
}
