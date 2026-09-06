"use client";

import { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";

type Video = { id: string; title: string; channel: string; thumbnail: string };

export function TrendingVideos() {
  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => setVideos(data.videos ?? []))
      .catch(() => setVideos([]));
  }, []);

  if (!videos) {
    return <div className="animate-pulse text-sm text-slate-light">Loading trending videos…</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {videos.map((v) => (
        <div key={v.id} className="group cursor-pointer">
          <div className="flex aspect-video items-center justify-center overflow-hidden rounded-md bg-cloud">
            {v.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={v.thumbnail} alt={v.title} className="h-full w-full object-cover" />
            ) : (
              <PlayCircle className="h-8 w-8 text-slate-light" />
            )}
          </div>
          <p className="mt-1.5 line-clamp-2 text-xs font-medium text-ink">{v.title}</p>
          <p className="text-xs text-slate-light">{v.channel}</p>
        </div>
      ))}
    </div>
  );
}
