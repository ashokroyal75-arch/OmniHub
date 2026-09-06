import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { CelebrityProfile } from "@/components/CelebrityProfile";
import { getCelebrityBySlug, getCelebrityDirectory } from "@/lib/tmdb";

type Props = { params: { slug: string } };

export const revalidate = 3600;

export async function generateStaticParams() {
  const celebrities = await getCelebrityDirectory();
  return celebrities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const celebrity = await getCelebrityBySlug(params.slug);
  if (!celebrity) return { title: "Profile not found" };

  const description = celebrity.bio || `${celebrity.name} — bio, age, recent work, and news on OmniHub.`;
  return {
    title: celebrity.name,
    description,
    openGraph: {
      title: celebrity.name,
      description,
      images: celebrity.profileImageUrl ? [celebrity.profileImageUrl] : [],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: celebrity.name,
      description,
    },
  };
}

export default async function CelebrityPage({ params }: Props) {
  const celebrity = await getCelebrityBySlug(params.slug);
  if (!celebrity) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: celebrity.name,
    description: celebrity.bio,
    image: celebrity.profileImageUrl || undefined,
    sameAs: celebrity.socialLinks.map((s) => s.url),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="mx-auto max-w-content px-4 py-8 sm:px-6">
        <CelebrityProfile celebrity={celebrity} />
      </main>
    </>
  );
}
