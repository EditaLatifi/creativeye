import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import CategoryFilter from "@/components/CategoryFilter";
import { categories, getCategory } from "@/lib/data";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { fmt, getDictionary } from "@/i18n/dictionaries";
import {
  SITE_URL,
  breadcrumbJsonLd,
  imageGalleryJsonLd,
  pageMetadata,
} from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    categories.map((c) => ({ locale, category: c.slug }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);
  const label = dict.categories[cat.slug] ?? cat.title;
  return pageMetadata({
    locale: loc,
    path: `/${cat.slug}`,
    title: label,
    description: fmt(dict.seo.category, { category: label }),
    image: cat.cover,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);
  const label = dict.categories[cat.slug] ?? cat.title;
  const url = `${SITE_URL}/${loc}/${cat.slug}`;

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: dict.nav.home, url: `${SITE_URL}/${loc}` },
            { name: label, url },
          ]),
          imageGalleryJsonLd({
            name: label,
            description: fmt(dict.seo.category, { category: label }),
            url,
            images: cat.images.map((i) => i.src),
          }),
        ]}
      />
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-[0.3em] text-black dark:text-white sm:text-3xl">
          {label}
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-black/20 dark:bg-white/20" />
      </header>

      <CategoryFilter locale={loc} dict={dict} active={cat.slug} />

      <Gallery images={cat.images} alt={label} />
    </div>
  );
}
