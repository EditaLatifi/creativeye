import type { MetadataRoute } from "next";
import { categories } from "@/lib/data";
import { htmlLang, locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/services",
    "/projects",
    "/videos",
    "/contact",
    "/book",
    ...categories.map((c) => `/${c.slug}`),
  ];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[htmlLang[l]] = `${SITE_URL}/${l}${path}`;
    languages["x-default"] = `${SITE_URL}/en${path}`;

    for (const l of locales) {
      entries.push({
        url: `${SITE_URL}/${l}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
