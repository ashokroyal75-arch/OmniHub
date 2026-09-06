import { NextRequest, NextResponse } from "next/server";
import { MOCK_WEATHER } from "@/lib/mockData";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lon");
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey || !lat || !lon) {
    return NextResponse.json({ source: "mock", ...MOCK_WEATHER });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) throw new Error(`OpenWeather responded ${res.status}`);
    const data = await res.json();

    return NextResponse.json({
      source: "live",
      location: data.timezone,
      unit: "F",
      current: {
        temp: Math.round(data.current.temp),
        condition: data.current.weather?.[0]?.main ?? "",
        aqi: null,
      },
      forecast: data.daily.slice(0, 5).map((d: any) => ({
        day: new Date(d.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
        high: Math.round(d.temp.max),
        low: Math.round(d.temp.min),
        condition: d.weather?.[0]?.main ?? "",
      })),
    });
  } catch (err) {
    console.error("Weather fetch failed:", err);
    return NextResponse.json({ source: "mock-fallback", ...MOCK_WEATHER });
  }
}
