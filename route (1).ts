import { NextRequest, NextResponse } from "next/server";

type SearchMode = "web" | "video" | "product";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  const mode = (req.nextUrl.searchParams.get("mode") as SearchMode) ?? "web";

  if (!q) {
    return NextResponse.json({ error: "q is required" }, { status: 400 });
  }

  if (mode === "product") {
    // Amazon's Product Advertising API requires an approved affiliate account
    // and signed requests; until that's set up, deep-link to an Amazon search
    // tagged with the affiliate ID so clicks still earn commission.
    const tag = process.env.AMAZON_AFFILIATE_TAG ?? "omnihub-20";
    return NextResponse.json({
      source: "affiliate-link",
      url: `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${tag}`,
    });
  }

  if (mode === "video") {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        source: "mock",
        results: [{ title: `Sample result for "${q}"`, channel: "Demo Channel", videoId: "" }],
      });
    }
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
        q
      )}&key=${apiKey}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`YouTube search responded ${res.status}`);
      const data = await res.json();
      return NextResponse.json({
        source: "live",
        results: data.items.map((item: any) => ({
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
          videoId: item.id.videoId,
        })),
      });
    } catch (err) {
      console.error("Video search failed:", err);
      return NextResponse.json({ source: "mock-fallback", results: [] });
    }
  }

  // mode === "web"
  const cseKey = process.env.GOOGLE_CSE_API_KEY;
  const cseId = process.env.GOOGLE_CSE_ID;
  if (!cseKey || !cseId) {
    return NextResponse.json({
      source: "mock",
      results: [{ title: `Web results for "${q}"`, link: "#", snippet: "Connect GOOGLE_CSE_API_KEY to enable live web search." }],
    });
  }
  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${cseKey}&cx=${cseId}&q=${encodeURIComponent(q)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Google CSE responded ${res.status}`);
    const data = await res.json();
    return NextResponse.json({
      source: "live",
      results: (data.items ?? []).map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
      })),
    });
  } catch (err) {
    console.error("Web search failed:", err);
    return NextResponse.json({ source: "mock-fallback", results: [] });
  }
}
