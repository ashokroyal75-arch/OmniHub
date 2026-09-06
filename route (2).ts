import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text, targetLang } = await req.json();

  if (!text || !targetLang) {
    return NextResponse.json({ error: "text and targetLang are required" }, { status: 400 });
  }

  const libreUrl = process.env.LIBRETRANSLATE_URL; // e.g. self-hosted or LibreTranslate.com instance
  const libreKey = process.env.LIBRETRANSLATE_API_KEY;

  if (!libreUrl) {
    // No translation backend configured yet — echo back so the widget UI is testable.
    return NextResponse.json({
      source: "mock",
      translatedText: `[${targetLang}] ${text}`,
    });
  }

  try {
    const res = await fetch(`${libreUrl}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetLang,
        format: "text",
        api_key: libreKey,
      }),
    });
    if (!res.ok) throw new Error(`Translate service responded ${res.status}`);
    const data = await res.json();
    return NextResponse.json({ source: "live", translatedText: data.translatedText });
  } catch (err) {
    console.error("Translate failed:", err);
    return NextResponse.json({ source: "mock-fallback", translatedText: `[${targetLang}] ${text}` });
  }
}
