import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
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
    path: "/projects",
    title: dict.projects.title,
    description: dict.seo.projects,
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
      <header className="mb-16 text-center">
        <h1 className="text-2xl font-semibold tracking-[0.3em] text-black dark:text-white sm:text-3xl">
          {dict.projects.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {dict.projects.intro}
        </p>
      </header>

      <div className="space-y-16 lg:space-y-24">
        {projects.map((pr, i) => {
          const t = dict.projects.items[pr.slug];
          const reversed = i % 2 === 1;
          return (
            <Reveal key={pr.slug}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div
                  className={`relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 ${
                    reversed ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={pr.image}
                    alt={pr.client}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                    {t?.role}
                  </span>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[0.12em] text-black dark:text-white sm:text-3xl">
                    {pr.client}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {t?.blurb}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-20 text-center">
        <Link
          href={`/${loc}/book`}
          className="inline-block border border-black px-8 py-3 text-xs font-medium tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          {dict.services.cta}
        </Link>
      </div>
    </div>
  );
}
