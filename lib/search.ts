import { categories, type Category } from "./data";
import { categoryKeywords } from "./categoryMeta";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export type SearchResult = {
  slug: string;
  label: string;
  cover: string;
  count: number;
};

/** Filter categories by localized label + English title + keywords. */
export function searchCategories(query: string, locale: Locale): SearchResult[] {
  const dict = getDictionary(locale);
  const q = query.trim().toLowerCase();

  const toResult = (c: Category): SearchResult => ({
    slug: c.slug,
    label: dict.categories[c.slug] ?? c.title,
    cover: c.cover,
    count: c.images.length,
  });

  if (!q) return categories.map(toResult);

  return categories
    .filter((c) => {
      const haystack = [
        dict.categories[c.slug] ?? "",
        c.title,
        c.nav,
        ...(categoryKeywords[c.slug] ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    })
    .map(toResult);
}
