import type { Metadata } from "next";
import { site } from "@/lib/data";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { reels, toEmbed } from "@/lib/videos";
import { films } from "@/lib/films";
import FilmGallery from "@/components/FilmGallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);
  return pageMetadata({
    locale: loc,
    path: "/videos",
    title: dict.videos.title,
    description: dict.seo.videos,
    image: "/images/videos/hero.jpg",
  });
}

const hero = "/images/videos/hero.jpg";

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const v = getDictionary(isLocale(locale) ? locale : "en").videos;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
      <header className="mb-10 text-center">
        <h1 className="text-2xl font-semibold tracking-[0.3em] text-black dark:text-white sm:text-3xl">
          {v.title}
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-black/20 dark:bg-white/20" />
      </header>

      {/* Featured showreel + self-hosted films (plays on the site) */}
      <FilmGallery films={films} hero={hero} featuredSlug="ermi" labels={{ work: v.work, watch: v.watch }} />

      <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        {v.description}
      </p>

      {/* Reels */}
      {reels.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-center text-xs font-semibold tracking-[0.35em] text-black dark:text-white">
            {v.onInstagram}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reels.map((url) => (
              <div
                key={url}
                className="relative h-[640px] w-full overflow-hidden border border-black/10 bg-neutral-100 dark:border-white/10 dark:bg-neutral-900"
              >
                <iframe
                  src={toEmbed(url)}
                  title="Instagram reel"
                  loading="lazy"
                  scrolling="no"
                  allowFullScreen
                  className="h-full w-full"
                  style={{ border: 0 }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Instagram connection */}
      <div className="mt-14 text-center">
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-black px-8 py-3 text-xs font-medium tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          {v.watch}
        </a>
        <p className="mt-3 text-xs tracking-wide text-neutral-500 dark:text-neutral-400">
          {site.instagramHandle}
        </p>
      </div>
    </div>
  );
}
