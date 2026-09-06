import Link from "next/link";
import type { Celebrity } from "@/lib/types";

const CATEGORY_LABELS: Record<Celebrity["category"], string> = {
  actor: "Actors",
  athlete: "Athletes",
  musician: "Musicians",
  creator: "Creators",
};

export function CelebrityDirectory({ celebrities }: { celebrities: Celebrity[] }) {
  const byCategory = celebrities.reduce<Record<string, Celebrity[]>>((acc, c) => {
    acc[c.category] = acc[c.category] ?? [];
    acc[c.category].push(c);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(byCategory).map(([category, list]) => (
        <section key={category}>
          <h2 className="font-display text-xl">{CATEGORY_LABELS[category as Celebrity["category"]]}</h2>
          <ul className="mt-3 divide-y divide-cloud border-t border-cloud">
            {list
              .sort((a, b) => b.trendingScore - a.trendingScore)
              .map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/celebrity/${c.slug}`}
                    className="focus-ring flex items-center justify-between gap-4 py-3 hover:bg-cloud/40"
                  >
                    <span>
                      <span className="font-medium text-ink">{c.name}</span>
                      <span className="ml-2 text-sm text-slate-light">
                        {new Date().getFullYear() - new Date(c.birthDate).getFullYear()} yrs
                      </span>
                    </span>
                    <span className="text-xs text-marigold-dim">trending {c.trendingScore}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
