import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/data";
import { isLocale, type Locale } from "@/i18n/config";
import { fmt, getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

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
    path: "/about",
    title: dict.about.title,
    description: dict.seo.about,
  });
}

const clients = [
  "Rolling Loud",
  "Kanye West",
  "Mercedes Benz Vision AVTR",
  "MCM",
  "Nike",
  "Logitech",
  "Paco Rabanne",
  "Swatch",
  "Urban Outfitters",
];

const portrait = "/images/about/portrait.jpg";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  const a = dict.about;
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
      <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-16">
        {/* Portrait */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={portrait}
            alt={site.owner}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Text */}
        <div>
          <h1 className="text-2xl font-semibold tracking-[0.3em] text-black dark:text-white sm:text-3xl">
            {a.title}
          </h1>
          <div className="mt-5 space-y-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            <p>{fmt(a.bio1, { name: site.owner })}</p>
            <p>{a.bio2}</p>
            <p>{a.bio3}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xs font-semibold tracking-[0.25em] text-black dark:text-white">
              {a.selectedWork}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {clients.map((c) => (
                <li
                  key={c}
                  className="border border-black/15 px-3 py-1.5 text-xs tracking-wide text-neutral-600 transition-colors hover:border-black hover:text-black dark:border-white/15 dark:text-neutral-400 dark:hover:border-white dark:hover:text-white"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <a
              href={`mailto:${site.email}`}
              className="block transition-colors hover:text-black dark:hover:text-white"
            >
              {site.email}
            </a>
            <span className="block">{site.phone}</span>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors hover:text-black dark:hover:text-white"
            >
              Instagram {site.instagramHandle}
            </a>
          </div>

          <Link
            href={`/${locale}/contact`}
            className="mt-10 inline-block border border-black px-8 py-3 text-xs font-medium tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
          >
            {a.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
