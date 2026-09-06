"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Mode = "web" | "video" | "product";

const MODES: { key: Mode; label: string }[] = [
  { key: "web", label: "Web" },
  { key: "video", label: "Video" },
  { key: "product", label: "Products" },
];

export function SearchBar() {
  const [mode, setMode] = useState<Mode>("web");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  async function runSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResults(null);
    setRedirectUrl(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&mode=${mode}`);
      const data = await res.json();
      if (data.url) {
        setRedirectUrl(data.url);
      } else {
        setResults(data.results ?? []);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-2 flex gap-1">
        {MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={cn(
              "focus-ring rounded-full px-3 py-1 text-xs font-medium transition-colors",
              mode === m.key ? "bg-ink text-paper" : "bg-cloud text-slate hover:bg-cloud/70"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      <form onSubmit={runSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-light" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              mode === "web"
                ? "Search the web…"
                : mode === "video"
                ? "Search videos…"
                : "Search products…"
            }
            className="pl-9"
          />
        </div>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Searching…" : "Search"}
        </Button>
      </form>

      {redirectUrl && (
        <p className="mt-3 text-sm text-slate">
          Opens on Amazon (affiliate link):{" "}
          <a href={redirectUrl} target="_blank" rel="noopener noreferrer" className="text-teal underline">
            View results
          </a>
        </p>
      )}

      {results && results.length > 0 && (
        <ul className="mt-3 space-y-2 text-sm">
          {results.map((r, i) => (
            <li key={i} className="border-b border-cloud pb-2">
              {r.link ? (
                <a href={r.link} target="_blank" rel="noopener noreferrer" className="font-medium text-teal hover:underline">
                  {r.title}
                </a>
              ) : (
                <span className="font-medium">{r.title}</span>
              )}
              {r.snippet && <p className="text-slate">{r.snippet}</p>}
              {r.channel && <p className="text-slate">{r.channel}</p>}
            </li>
          ))}
        </ul>
      )}
      {results && results.length === 0 && (
        <p className="mt-3 text-sm text-slate-light">No results yet — connect the search API keys.</p>
      )}
    </div>
  );
}
