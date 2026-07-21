import Image from "next/image";
import Link from "next/link";
import { categories, site } from "@/lib/data";
import { isLocale } from "@/i18n/config";
import { fmt, getDictionary } from "@/i18n/dictionaries";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import InstagramStrip from "@/components/InstagramStrip";

const heroImages = [
  "/images/hero/01.jpg",
  "/images/hero/02.jpg",
  "/images/hero/03.jpg",
  "/images/hero/04.jpg",
  "/images/hero/05.jpg",
];

// Curated strips leading with the surreal, showstopping composites.
const marqueeA = [
  "/images/creative/008.jpg",
  "/images/creative/006.jpg",
  "/images/creative/003.jpg",
  "/images/creative/004.jpg",
  "/images/creative/007.jpg",
  "/images/creative/005.jpg",
  "/images/fashion/001.jpg",
  "/images/portrait/002.jpg",
  "/images/cover-shoot/001.jpg",
  "/images/cover-shoot/002.jpg",
];
const marqueeB = [
  "/images/concert-events/005.jpg",
  "/images/concert-events/060.jpg",
  "/images/wedding-events/003.jpg",
  "/images/wedding-events/012.jpg",
  "/images/fashion/015.jpg",
  "/images/fashion/030.jpg",
  "/images/portrait/010.jpg",
  "/images/portrait/020.jpg",
  "/images/creative/010.jpg",
  "/images/concert-events/100.jpg",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");
  const L = `/${locale}`;

  return (
    <div>
      <Hero
        images={heroImages}
        name={site.name}
        tagline={fmt(dict.home.tagline, { name: site.owner })}
        viewWork={dict.home.viewWork}
        book={dict.nav.book}
        workHref={`${L}#work`}
        bookHref={`${L}/book`}
      />

      {/* Featured galleries */}
      <section id="work" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 lg:px-8">
        <Reveal className="mb-10 text-center">
          <h2 className="text-xs font-semibold tracking-[0.35em] text-black dark:text-white">
            {dict.about.selectedWork}
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-black/20 dark:bg-white/20" />
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={(i % 4) * 0.06}>
              <Link
                href={`${L}/${cat.slug}`}
                className="group relative block aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900"
              >
                <Image
                  src={cat.cover}
                  alt={dict.categories[cat.slug] ?? cat.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/45" />
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <span className="text-center text-xs font-medium tracking-[0.2em] text-white sm:text-sm">
                    {dict.categories[cat.slug] ?? cat.title}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* Videos tile */}
          <Reveal delay={(categories.length % 4) * 0.06}>
            <Link
              href={`${L}/videos`}
              className="group relative flex aspect-square items-center justify-center overflow-hidden bg-black"
            >
              <Image
                src="/images/videos/hero.jpg"
                alt={dict.nav.videos}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <span className="absolute bottom-4 left-0 right-0 text-center text-xs font-medium tracking-[0.2em] text-white">
                {dict.nav.videos}
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Moving showcase */}
      <section className="space-y-3 border-y border-black/10 py-6 dark:border-white/10">
        <Marquee images={marqueeA} />
        <Marquee images={marqueeB} reverse />
      </section>

      <InstagramStrip dict={dict} />
    </div>
  );
}
