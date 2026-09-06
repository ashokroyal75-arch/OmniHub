"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "model"; text: string };

export function AIChatDrawer() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Ask me anything — weather, a celebrity, or a quick fact." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    const message = input.trim();
    if (!message) return;
    setInput("");
    const nextMessages: Message[] = [...messages, { role: "user", text: message }];
    setMessages(nextMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: nextMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="focus-ring fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-marigold text-ink shadow-lg hover:bg-marigold-dim"
        aria-label="Open AI assistant"
      >
        <MessageCircle className="h-5 w-5" />
      </button>

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-cloud bg-paper shadow-2xl transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-cloud px-4 py-3">
          <p className="font-display text-lg">Assistant</p>
          <button onClick={() => setOpen(false)} className="focus-ring rounded-md p-1 hover:bg-cloud" aria-label="Close assistant">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                m.role === "user" ? "ml-auto bg-ink text-paper" : "bg-cloud text-ink"
              )}
            >
              {m.text}
            </div>
          ))}
          {loading && <div className="text-xs text-slate-light">Thinking…</div>}
        </div>
        <div className="flex gap-2 border-t border-cloud p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask something…"
            className="focus-ring flex-1 rounded-md border border-slate-light/50 px-3 py-2 text-sm"
          />
          <button
            onClick={send}
            className="focus-ring rounded-md bg-teal px-3 py-2 text-paper hover:bg-teal-dim"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
