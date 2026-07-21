# CREATIVEYE — Next.js portfolio

A Next.js (App Router) rebuild of the CREATIVEYE photography portfolio
(originally on Wix). Photographer, videographer & creative director
**Massiah Zavahir**, Basel, Switzerland.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS 3**
- `next/image` for optimized, responsive images
- Custom i18n (4 languages) with locale-prefixed routes + middleware

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /en)
```

Build for production:

```bash
npm run build
npm run start
```

## Languages

Four locales, each with fully prerendered pages:

| URL    | Language                          |
|--------|-----------------------------------|
| `/en`  | English (default)                 |
| `/de`  | **Deutsch** (Swiss accent, `lang=de-CH`) |
| `/fr`  | Français                          |
| `/it`  | Italiano                          |

- `middleware.ts` redirects `/` → the visitor's language (cookie →
  `Accept-Language` → English) and prefixes any un-prefixed path.
- The language switcher is in the header; choice is stored in the
  `NEXT_LOCALE` cookie.
- All copy lives in [i18n/dictionaries.ts](i18n/dictionaries.ts). The `de`
  locale is written in German with a Swiss accent (Swiss Standard German,
  no ß), tagged `de-CH`.

## SEO

Built for search and social from the ground up:

- **Per-locale metadata** (title + description) on every page.
- **Canonical URLs** and **hreflang** alternates (`en`, `de-CH`, `fr`, `it`,
  `x-default`) so Google serves the right language per market.
- **Open Graph + Twitter cards** with per-page images.
- **JSON-LD structured data**: `Person`, `ProfessionalService`
  (photographer in Basel), `WebSite` with a `SearchAction`, plus
  `BreadcrumbList` and `ImageGallery` on each gallery — image structured
  data most photographer sites skip, which helps in Google Images.
- **`sitemap.xml`** (all locales, with hreflang) and **`robots.txt`**,
  generated from [app/sitemap.ts](app/sitemap.ts) / [app/robots.ts](app/robots.ts).
- Descriptive, localized `alt` text on gallery images.

Set your domain in `.env` before deploying:

```bash
cp .env.example .env
# NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Search

A search icon in the header opens an instant overlay that filters the
galleries as you type (matching localized names + keywords in several
languages, see [lib/categoryMeta.ts](lib/categoryMeta.ts)). There is also a
standalone `/{locale}/search?q=` page, which is what the JSON-LD
`SearchAction` points at.

## Features

- **Dark / light mode** with a header toggle. The choice is stored in
  `localStorage` and applied before paint (no flash); it falls back to the
  visitor's system preference. Tailwind `darkMode: "class"`.
- **Services page** (`/services`, "What I shoot") with a card per shoot
  type and a booking call to action.
- **FAQ** on the services page, backed by `FAQPage` JSON-LD for rich
  results in Google.
- **Booking page** (`/book`) with a date picker, shoot-type select and a
  `mailto:` submission (swap in a backend when ready).
- **Per-gallery filter bar** to jump between galleries without the menu.
- **Instagram teaser strip** on the home page linking to the profile.
- **Back-to-top** button that appears once you scroll.

## Photos — 360 images, all local

Every gallery photo was rendered from the live site and downloaded into
`public/images/` (~98 MB, 369 files), so the site no longer depends on Wix:

| Gallery          | Photos |
|------------------|-------:|
| Concert & Events |    183 |
| Wedding / Events |     61 |
| Fashion          |     48 |
| Portrait         |     35 |
| Creative         |     31 |
| Cover Shoot      |      2 |

To refresh the images from the live Wix site:

```bash
node scripts/scrape.mjs     # headless-render galleries → scripts/images.json
node scripts/download.mjs   # download all images + regenerate lib/data.ts
```

(Playwright + Chromium are installed as dev dependencies for the scrape.)

## Structure

```
app/
  [locale]/
    layout.tsx           Root layout (per-locale <html lang>, header, footer, JSON-LD)
    page.tsx             Home, category grid
    [category]/page.tsx  Gallery pages (concert-events, creative, fashion,
                         portrait, wedding-events, cover-shoot)
    videos/page.tsx      Videos
    about/page.tsx       About Me
    services/page.tsx    What I shoot + FAQ (FAQPage JSON-LD)
    contact/page.tsx     Contact (form to mailto)
    book/page.tsx        Booking form
    search/              Search results page (?q=)
    not-found.tsx
  globals.css
  sitemap.ts             sitemap.xml (all locales + hreflang)
  robots.ts              robots.txt
components/
  Header.tsx             Sticky nav + search + theme + language + book
  Footer.tsx
  Gallery.tsx            Grid + keyboard-navigable lightbox
  CategoryFilter.tsx     Filter bar between galleries
  Search.tsx             Header search overlay
  ContactForm.tsx
  BookingForm.tsx
  InstagramStrip.tsx     Home Instagram teaser
  ThemeToggle.tsx        Light / dark switch
  BackToTop.tsx
  LanguageSwitcher.tsx
  JsonLd.tsx             Structured-data injector
i18n/
  config.ts              Locales, labels, cookie name
  dictionaries.ts        All translations + SEO copy
lib/
  data.ts                Categories + local image paths (generated)
  categoryMeta.ts        Search keywords per category
  search.ts              Shared search filter
  seo.ts                 Metadata + JSON-LD builders, SITE_URL
middleware.ts            Locale detection / redirect
scripts/
  scrape.mjs             Playwright gallery scraper
  download.mjs           Image downloader + data.ts generator
```

## Notes

- The **Contact** form has no backend; it composes a `mailto:` to
  `massiah.zavahir@outlook.com`. Wire it to a form service (Formspree,
  Resend, a route handler, etc.) for real submissions.
- The **Videos** page links out to Instagram — the original Wix video
  embeds weren't exposed in the page source. Drop in real video URLs
  (YouTube/Vimeo embeds) when available.
