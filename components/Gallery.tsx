"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/data";

export default function Gallery({
  images,
  alt = "Photograph",
}: {
  images: GalleryImage[];
  alt?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    setZoom(false);
  }, []);
  const prev = useCallback(() => {
    setZoom(false);
    setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const next = useCallback(() => {
    setZoom(false);
    setIndex((i) => (i === null ? i : (i + 1) % images.length));
  }, [images.length]);

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

  const current = index === null ? null : images[index];

  return (
    <>
      {/* Masonry (native aspect ratios preserved) */}
      <div className="gap-3 [column-fill:_balance] sm:columns-2 sm:gap-4 lg:columns-3 xl:columns-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setIndex(i)}
            className="group relative mb-3 block w-full overflow-hidden bg-neutral-100 sm:mb-4 dark:bg-neutral-900"
            aria-label={`Open image ${i + 1}`}
          >
            <Image
              src={img.src}
              alt={`${alt} ${i + 1}`}
              width={img.w}
              height={img.h}
              placeholder="blur"
              blurDataURL={img.blur}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && index !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          onClick={close}
        >
          {/* Close */}
          <button
            aria-label="Close"
            onClick={close}
            className="absolute right-5 top-5 z-20 text-white/70 transition-colors hover:text-white"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Stage */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden">
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 z-20 flex h-12 w-12 items-center justify-center text-white/70 transition-colors hover:text-white sm:left-5"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div
              className="relative mx-14 flex h-full w-[86vw] max-w-6xl items-center justify-center py-6"
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
              <Image
                key={current.src}
                src={current.src}
                alt={`${alt} ${index + 1}`}
                width={current.w}
                height={current.h}
                placeholder="blur"
                blurDataURL={current.blur}
                sizes="86vw"
                priority
                onClick={() => setZoom((z) => !z)}
                className={`max-h-full w-auto object-contain transition-transform duration-300 ${
                  zoom ? "scale-[1.8] cursor-zoom-out" : "cursor-zoom-in"
                }`}
              />
            </div>

            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 z-20 flex h-12 w-12 items-center justify-center text-white/70 transition-colors hover:text-white sm:right-5"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Thumbnails */}
          <div
            className="relative z-20 flex items-center gap-2 overflow-x-auto px-4 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => {
                  setZoom(false);
                  setIndex(i);
                }}
                aria-label={`Go to image ${i + 1}`}
                className={`relative h-14 w-14 shrink-0 overflow-hidden transition-opacity ${
                  i === index
                    ? "opacity-100 ring-1 ring-white"
                    : "opacity-40 hover:opacity-80"
                }`}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <span className="absolute bottom-[76px] left-0 right-0 text-center text-xs tracking-widest text-white/60">
            {index + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
