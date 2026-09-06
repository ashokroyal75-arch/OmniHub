import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CelebrityDirectory } from "@/components/CelebrityDirectory";
import { getCelebrityDirectory } from "@/lib/tmdb";

export const metadata: Metadata = {
  title: "Celebrity Directory",
  description: "Browse thousands of actor, athlete, musician, and creator profiles with bios, news, and social links.",
};

export const revalidate = 3600;

export default async function CelebritiesPage() {
  const celebrities = await getCelebrityDirectory();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl">Celebrity Directory</h1>
        <p className="mt-2 max-w-[60ch] text-slate">
          Profiles refresh from TMDB and Wikipedia so bios, filmographies, and trending scores stay current.
        </p>
        <div className="mt-8">
          <CelebrityDirectory celebrities={celebrities} />
        </div>
      </main>
    </>
  );
}
