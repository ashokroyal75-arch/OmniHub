"use client";

import { useEffect, useState } from "react";
import { CloudSun } from "lucide-react";

type Weather = {
  location: string;
  current: { temp: number; condition: string; aqi: number | null };
  forecast: { day: string; high: number; low: number; condition: string }[];
};

export function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    let lat = "37.77";
    let lon = "-122.42";

    function load(latitude: string, longitude: string) {
      fetch(`/api/weather?lat=${latitude}&lon=${longitude}`)
        .then((res) => res.json())
        .then(setWeather)
        .catch(() => setWeather(null));
    }

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => load(String(pos.coords.latitude), String(pos.coords.longitude)),
        () => load(lat, lon),
        { timeout: 3000 }
      );
    } else {
      load(lat, lon);
    }
  }, []);

  if (!weather) {
    return <div className="animate-pulse text-sm text-slate-light">Loading weather…</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <CloudSun className="h-8 w-8 text-teal" />
        <div>
          <p className="text-3xl font-display">{weather.current.temp}°</p>
          <p className="text-sm text-slate">
            {weather.current.condition} · {weather.location}
          </p>
        </div>
        {weather.current.aqi != null && (
          <span className="ml-auto rounded-full bg-cloud px-2 py-1 text-xs text-slate">
            AQI {weather.current.aqi}
          </span>
        )}
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
        {weather.forecast.map((d) => (
          <div key={d.day} className="rounded-md bg-cloud/60 py-2">
            <p className="font-medium text-ink">{d.day}</p>
            <p className="mt-1 text-slate">{d.high}°</p>
            <p className="text-slate-light">{d.low}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
