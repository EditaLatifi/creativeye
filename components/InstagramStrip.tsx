import Image from "next/image";
import { categories, site } from "@/lib/data";
import type { Dictionary } from "@/i18n/dictionaries";

// Teaser strip (not a live feed). Uses one image from each gallery and
// links out to the Instagram profile.
const tiles = categories
  .map((c) => c.images[0]?.src)
  .filter(Boolean)
  .slice(0, 6);

export default function InstagramStrip({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-t border-black/10 pb-10 pt-14 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-xs font-semibold tracking-[0.3em] text-black dark:text-white">
            {dict.instagram.title}
          </h2>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            {site.instagramHandle}
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
          {tiles.map((src, i) => (
            <a
              key={src + i}
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900"
              aria-label={dict.instagram.cta}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-black px-8 py-3 text-xs font-medium tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
          >
            {dict.instagram.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
