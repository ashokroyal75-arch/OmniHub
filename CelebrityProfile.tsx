import type { Celebrity } from "@/lib/types";

export function CelebrityProfile({ celebrity }: { celebrity: Celebrity }) {
  const age = new Date().getFullYear() - new Date(celebrity.birthDate).getFullYear();

  return (
    <article>
      <header className="border-b border-cloud pb-6">
        <p className="text-xs uppercase tracking-wide text-marigold-dim">{celebrity.category}</p>
        <h1 className="mt-1 font-display text-4xl">{celebrity.name}</h1>
        <p className="mt-2 text-sm text-slate">
          Age {age} · Born {new Date(celebrity.birthDate).toLocaleDateString()}
        </p>
        <div className="mt-3 flex gap-3">
          {celebrity.socialLinks.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-teal hover:underline"
            >
              {s.platform}
            </a>
          ))}
        </div>
      </header>

      <section className="mt-6">
        <p className="max-w-[70ch] leading-relaxed text-ink">{celebrity.bio}</p>
      </section>

      {celebrity.recentWorks.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl">Recent work</h2>
          <ul className="mt-3 divide-y divide-cloud border-t border-cloud">
            {celebrity.recentWorks.map((w) => (
              <li key={w.title} className="flex justify-between py-2 text-sm">
                <span>{w.title}</span>
                <span className="text-slate-light">
                  {w.type} · {w.year}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {celebrity.news.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl">In the news</h2>
          <ul className="mt-3 space-y-3">
            {celebrity.news.map((n) => (
              <li key={n.headline} className="text-sm">
                <a href={n.url} className="font-medium text-ink hover:text-teal">
                  {n.headline}
                </a>
                <span className="ml-2 text-slate-light">{n.source}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {celebrity.affiliateProducts.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl">Related picks</h2>
          <p className="mt-1 text-xs text-slate-light">
            As an Amazon Associate, OmniHub earns from qualifying purchases.
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {celebrity.affiliateProducts.map((p) => (
              <li key={p.title}>
                <a
                  href={p.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="focus-ring block rounded-md border border-cloud p-3 text-sm hover:bg-cloud/40"
                >
                  <span className="font-medium text-ink">{p.title}</span>
                  <span className="mt-1 block text-slate-light">{p.price}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
