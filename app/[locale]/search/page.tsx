import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "./SearchResults";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);
  return {
    title: dict.search.open,
    description: dict.search.hint,
    robots: { index: false, follow: true },
    alternates: { canonical: `${SITE_URL}/${loc}/search` },
  };
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-[0.3em] text-black dark:text-white sm:text-3xl">
          {dict.search.open.toUpperCase()}
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-black/20 dark:bg-white/20" />
      </header>
      <Suspense>
        <SearchResults locale={loc} dict={dict} />
      </Suspense>
    </div>
  );
}
