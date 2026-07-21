import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { categories } from "@/lib/data";
import { servicesImage } from "@/lib/categoryMeta";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

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
    path: "/services",
    title: dict.services.title,
    description: dict.seo.services,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
      <JsonLd data={faqJsonLd(dict.faq.items)} />

      {/* What I shoot */}
      <header className="mb-12 text-center">
        <h1 className="text-2xl font-semibold tracking-[0.3em] text-black dark:text-white sm:text-3xl">
          {dict.services.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {dict.services.intro}
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/${loc}/${c.slug}`}
            className="group overflow-hidden border border-black/10 dark:border-white/10"
          >
            <span className="relative block aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={servicesImage[c.slug] ?? c.cover}
                alt={dict.categories[c.slug] ?? c.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </span>
            <span className="block p-5">
              <span className="block text-xs font-semibold tracking-[0.18em] text-black dark:text-white">
                {dict.categories[c.slug] ?? c.title}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {dict.services.items[c.slug]}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href={`/${loc}/book`}
          className="inline-block border border-black px-8 py-3 text-xs font-medium tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          {dict.services.cta}
        </Link>
      </div>

      {/* FAQ */}
      <section className="mx-auto mt-24 max-w-2xl">
        <h2 className="mb-8 text-center text-xl font-semibold tracking-[0.25em] text-black dark:text-white">
          {dict.faq.title}
        </h2>
        <div className="divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
          {dict.faq.items.map((item, i) => (
            <details key={i} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-black dark:text-white">
                {item.q}
                <span className="text-neutral-400 transition-transform duration-200 group-open:rotate-45">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
