import type { Metadata } from "next";
import { htmlLang, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "./data";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://creativeye.ch"
).replace(/\/$/, "");

export const DEFAULT_OG = "/images/about/portrait.jpg";

export function pageMetadata(opts: {
  locale: Locale;
  path: string; // "" for home, "/about", "/concerts", ...
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const { locale, path, title, description } = opts;
  const url = `${SITE_URL}/${locale}${path}`;
  const image = opts.image ?? DEFAULT_OG;

  const languages: Record<string, string> = {};
  for (const l of locales) languages[htmlLang[l]] = `${SITE_URL}/${l}${path}`;
  languages["x-default"] = `${SITE_URL}/en${path}`;

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: htmlLang[locale].replace("-", "_"),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// ---------- JSON-LD ----------

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.owner,
    jobTitle: "Photographer, Videographer & Creative Director",
    url: SITE_URL,
    image: `${SITE_URL}${DEFAULT_OG}`,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Basel",
      addressCountry: "CH",
    },
    sameAs: [site.instagram],
  };
}

export function proServiceJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: `${site.name} · ${site.owner}`,
    description: dict.seo.siteDescription,
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}${DEFAULT_OG}`,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    priceRange: "$$",
    areaServed: ["Basel", "Switzerland", "Worldwide"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Basel",
      addressCountry: "CH",
    },
    founder: personJsonLd(),
    sameAs: [site.instagram],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: site.name,
    url: SITE_URL,
    inLanguage: htmlLang[locale],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function imageGalleryJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  images: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    author: personJsonLd(),
    image: opts.images.slice(0, 30).map((src) => ({
      "@type": "ImageObject",
      contentUrl: `${SITE_URL}${src}`,
      creator: { "@type": "Person", name: site.owner },
    })),
  };
}
