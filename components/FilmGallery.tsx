"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Film } from "@/lib/films";

const PlayIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white" aria-hidden>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function FilmGallery({
  films,
  hero,
  featuredSlug,
  labels,
}: {
  films: Film[];
  hero: string;
  featuredSlug?: string;
  labels: { work: string; watch: string };
}) {
  // Ordered list = featured first, then the rest. The player scrolls this
  // whole list; the grid shows everything after the featured one.
  const featured = films.find((f) => f.slug === featuredSlug) ?? films[0] ?? null;
  const ordered = featured ? [featured, ...films.filter((f) => f !== featured)] : films;
  const rest = ordered.slice(1);

  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + ordered.length) % ordered.length)),
    [ordered.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % ordered.length)),
    [ordered.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  const active = index === null ? null : ordered[index];

  return (
    <>
      {/* Featured — muted autoplay loop, click to open with sound */}
      {featured ? (
        <div className="group relative aspect-video w-full overflow-hidden bg-black">
          <video
            src={featured.src}
            poster={featured.poster}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-70"
          />
          <button
            type="button"
            onClick={() => setIndex(0)}
            aria-label={`${labels.watch}: ${featured.title}`}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-black/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <PlayIcon size={30} />
            </span>
          </button>
          <div className="pointer-events-none absolute bottom-4 left-5">
            <span className="block text-sm font-semibold tracking-[0.15em] text-white">
              {featured.title}
            </span>
            <span className="block text-[11px] tracking-[0.2em] text-white/70">
              {featured.client}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <Image src={hero} alt="Showreel" fill sizes="100vw" className="object-cover opacity-80" priority />
        </div>
      )}

      {/* Masonry grid (native aspect ratios preserved) */}
      {rest.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-center text-xs font-semibold tracking-[0.35em] text-black dark:text-white">
            {labels.work}
          </h2>
          <div className="gap-3 [column-fill:_balance] columns-2 sm:gap-4 lg:columns-3">
            {rest.map((f) => {
              const idx = ordered.indexOf(f);
              return (
                <button
                  key={f.slug}
                  type="button"
                  onClick={() => setIndex(idx)}
                  className="group relative mb-3 block w-full overflow-hidden bg-neutral-100 sm:mb-4 dark:bg-neutral-900"
                  aria-label={`${f.title} — ${f.client}`}
                >
                  <Image
                    src={f.poster}
                    alt={f.title}
                    width={f.w}
                    height={f.h}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-colors duration-300 group-hover:from-black/80" />
                  <span className="absolute inset-0 flex items-center justify-center opacity-90 transition-transform duration-300 group-hover:scale-110">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/20 backdrop-blur-sm">
                      <PlayIcon />
                    </span>
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-3 text-left">
                    <span className="block truncate text-xs font-semibold tracking-[0.12em] text-white">
                      {f.title}
                    </span>
                    <span className="block truncate text-[10px] tracking-[0.18em] text-white/70">
                      {f.client}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Player — scrolls through every film */}
      {active && index !== null && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black/95" onClick={close} role="dialog" aria-modal="true" aria-label={active.title}>
          <button
            aria-label="Close"
            onClick={close}
            className="absolute right-5 top-5 z-20 text-white/70 transition-colors hover:text-white"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden">
            <button
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 z-20 flex h-12 w-12 items-center justify-center text-white/70 transition-colors hover:text-white sm:left-5"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div
              className="flex max-h-full w-full max-w-3xl flex-col items-center px-10 py-6 sm:px-14"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (dx > 50) prev();
                else if (dx < -50) next();
                touchX.current = null;
              }}
            >
              <video
                key={active.slug}
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                playsInline
                className="max-h-[78vh] w-auto max-w-full bg-black"
              />
              <div className="mt-3 text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-white">{active.title}</p>
                <p className="text-[11px] tracking-[0.2em] text-white/60">{active.client}</p>
              </div>
            </div>

            <button
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 z-20 flex h-12 w-12 items-center justify-center text-white/70 transition-colors hover:text-white sm:right-5"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <span className="relative z-20 pb-5 text-center text-xs tracking-widest text-white/60">
            {index + 1} / {ordered.length}
          </span>
        </div>
      )}
    </>
  );
}
