"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/dictionaries";
import { searchCategories } from "@/lib/search";

export default function SearchResults({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  const results = searchCategories(query, locale);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.replace(`/${locale}/search${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="mx-auto mb-10 flex max-w-md items-center gap-3 border-b border-black/20 focus-within:border-black dark:border-white/20 dark:focus-within:border-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-neutral-400">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.search.placeholder}
          className="flex-1 bg-transparent py-3 text-sm text-black placeholder-neutral-400 outline-none dark:text-white dark:placeholder-neutral-500"
        />
      </form>

      {results.length === 0 ? (
        <p className="py-16 text-center text-sm text-neutral-500">
          {fmt(dict.search.empty, { query })}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {results.map((r) => (
            <Link
              key={r.slug}
              href={`/${locale}/${r.slug}`}
              className="group relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900"
            >
              <Image
                src={r.cover}
                alt={r.label}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/40" />
              <span className="absolute inset-0 flex items-center justify-center px-3 text-center text-xs font-medium tracking-[0.2em] text-white sm:text-sm">
                {r.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
