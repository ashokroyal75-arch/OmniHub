import Link from "next/link";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { WeatherWidget } from "@/components/WeatherWidget";
import { TranslateWidget } from "@/components/TranslateWidget";
import { TrendingVideos } from "@/components/TrendingVideos";
import { SocialShortcuts } from "@/components/SocialShortcuts";
import { AIChatDrawer } from "@/components/AIChatDrawer";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import { getCelebrityDirectory } from "@/lib/tmdb";

export default async function HomePage() {
  const celebrities = (await getCelebrityDirectory())
    .slice()
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, 6);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6">
        <section className="border-b border-cloud pb-8">
          <h1 className="font-display text-3xl leading-tight sm:text-4xl">
            Your day, one dashboard.
          </h1>
          <p className="mt-2 max-w-[60ch] text-slate">
            Search the web, check the weather, translate on the fly, and catch up on who&rsquo;s trending —
            without opening ten tabs.
          </p>
          <div className="mt-5 max-w-2xl">
            <SearchBar />
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="font-display text-lg">Trending now</h2>
              </CardHeader>
              <CardBody>
                <TrendingVideos />
              </CardBody>
            </Card>

            <Card>
              <CardHeader className="flex items-center justify-between">
                <h2 className="font-display text-lg">Trending people</h2>
                <Link href="/celebrities" className="text-sm text-teal hover:underline">
                  View full directory
                </Link>
              </CardHeader>
              <CardBody>
                <ul className="divide-y divide-cloud">
                  {celebrities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/celebrity/${c.slug}`}
                        className="focus-ring flex items-center justify-between py-2.5 hover:bg-cloud/40"
                      >
                        <span className="font-medium">{c.name}</span>
                        <span className="text-xs capitalize text-slate-light">{c.category}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="font-display text-lg">Weather</h2>
              </CardHeader>
              <CardBody>
                <WeatherWidget />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-display text-lg">Quick translate</h2>
              </CardHeader>
              <CardBody>
                <TranslateWidget />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-display text-lg">Quick launch</h2>
              </CardHeader>
              <CardBody>
                <SocialShortcuts />
              </CardBody>
            </Card>
          </aside>
        </div>
      </main>
      <AIChatDrawer />
    </>
  );
}
