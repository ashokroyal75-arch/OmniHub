import { NextRequest, NextResponse } from "next/server";
import { MOCK_TRENDING_VIDEOS } from "@/lib/mockData";

export async function GET(req: NextRequest) {
  const region = req.nextUrl.searchParams.get("region") ?? "US";
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ source: "mock", videos: MOCK_TRENDING_VIDEOS });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${region}&maxResults=12&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error(`YouTube responded ${res.status}`);
    const data = await res.json();
    const videos = data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails?.medium?.url ?? "",
    }));
    return NextResponse.json({ source: "live", videos });
  } catch (err) {
    console.error("Trending fetch failed:", err);
    return NextResponse.json({ source: "mock-fallback", videos: MOCK_TRENDING_VIDEOS });
  }
}
