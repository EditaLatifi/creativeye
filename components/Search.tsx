"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/dictionaries";
import { searchCategories } from "@/lib/search";

export default function Search({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => searchCategories(query, locale),
    [query, locale]
  );

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/${locale}/${slug}`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results[0]) go(results[0].slug);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={dict.search.open}
        className="flex h-9 w-9 items-center justify-center text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="mt-[10vh] h-fit w-[92vw] max-w-xl bg-white shadow-2xl dark:bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-3 border-b border-black/10 px-5 dark:border-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-neutral-400">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={dict.search.placeholder}
                className="flex-1 bg-transparent py-4 text-sm text-black placeholder-neutral-400 outline-none dark:text-white dark:placeholder-neutral-500"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-neutral-400 transition-colors hover:text-black"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </form>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-neutral-500">
                  {fmt(dict.search.empty, { query })}
                </p>
              ) : (
                <ul>
                  {results.map((r) => (
                    <li key={r.slug}>
                      <button
                        onClick={() => go(r.slug)}
                        className="flex w-full items-center gap-4 rounded px-3 py-2 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
                      >
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                          <Image
                            src={r.cover}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </span>
                        <span className="flex-1">
                          <span className="block text-xs font-medium tracking-[0.15em] text-black dark:text-white">
                            {r.label}
                          </span>
                          <span className="block text-[11px] text-neutral-400">
                            {r.count}
                          </span>
                        </span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-neutral-300">
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="px-3 pb-2 pt-1 text-[11px] text-neutral-400">
                {dict.search.hint}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
