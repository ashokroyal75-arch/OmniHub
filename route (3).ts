import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!message) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({
      source: "mock",
      reply:
        "This is a placeholder reply — connect GEMINI_API_KEY in your environment to enable real answers.",
    });
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            ...(history ?? []).map((h: any) => ({
              role: h.role,
              parts: [{ text: h.text }],
            })),
            { role: "user", parts: [{ text: message }] },
          ],
        }),
      }
    );
    if (!res.ok) throw new Error(`Gemini responded ${res.status}`);
    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response generated.";
    return NextResponse.json({ source: "live", reply });
  } catch (err) {
    console.error("Chat request failed:", err);
    return NextResponse.json({
      source: "mock-fallback",
      reply: "The assistant is temporarily unavailable — please try again shortly.",
    });
  }
}
