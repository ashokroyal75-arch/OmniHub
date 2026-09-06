"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import { Button } from "./ui/button";

const LANGUAGES = [
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "ja", label: "Japanese" },
  { code: "hi", label: "Hindi" },
];

export function TranslateWidget() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("es");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);

  async function translate() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang: lang }),
      });
      const data = await res.json();
      setTranslated(data.translatedText ?? "");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-slate">
        <Languages className="h-4 w-4" />
        <span className="text-sm">Translate to</span>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="focus-ring rounded-md border border-slate-light/50 bg-paper px-2 py-1 text-sm"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text to translate…"
        rows={3}
        className="focus-ring w-full rounded-md border border-slate-light/50 bg-paper px-3 py-2 text-sm"
      />
      <Button onClick={translate} disabled={loading} variant="secondary" className="mt-2">
        {loading ? "Translating…" : "Translate"}
      </Button>
      {translated && (
        <p className="mt-3 rounded-md bg-cloud/60 px-3 py-2 text-sm text-ink">{translated}</p>
      )}
    </div>
  );
}
