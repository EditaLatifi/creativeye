"use client";

import { useEffect, useState } from "react";

export default function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
      title={label}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center border border-black/15 bg-white text-black shadow-lg transition-all duration-300 hover:bg-black hover:text-white dark:border-white/20 dark:bg-neutral-900 dark:text-white dark:hover:bg-white dark:hover:text-black ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m6 15 6-6 6 6" />
      </svg>
    </button>
  );
}
