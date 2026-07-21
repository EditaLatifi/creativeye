"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero({
  images,
  name,
  tagline,
  viewWork,
  book,
  workHref,
  bookHref,
}: {
  images: string[];
  name: string;
  tagline: string;
  viewWork: string;
  book: string;
  workHref: string;
  bookHref: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-black">
      {/* Slideshow */}
      <AnimatePresence>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.4, ease: "easeInOut" },
            scale: { duration: 6, ease: "linear" },
          }}
        >
          <Image
            src={images[i]}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/80" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-full px-6 text-center text-white"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
        }}
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7 }}
          className="mb-5 text-[10px] font-medium uppercase tracking-[0.4em] text-white/70"
        >
          Basel · Switzerland
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="break-words text-[10vw] font-semibold tracking-[0.12em] sm:text-6xl sm:tracking-[0.25em] lg:text-8xl lg:tracking-[0.28em]"
        >
          {name}
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed tracking-wide text-white/80"
        >
          {tagline}
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={workHref}
            className="border border-white bg-white px-8 py-3 text-xs font-medium tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-white"
          >
            {viewWork.toUpperCase()}
          </Link>
          <Link
            href={bookHref}
            className="border border-white/70 px-8 py-3 text-xs font-medium tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
          >
            {book}
          </Link>
        </motion.div>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === i ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
