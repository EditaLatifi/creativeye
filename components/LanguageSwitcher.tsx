"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  COOKIE_NAME,
  isLocale,
  localeLabels,
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function pick(locale: Locale) {
    document.cookie = `${COOKIE_NAME}=${locale};path=/;max-age=31536000;samesite=lax`;
    setOpen(false);

    const segs = pathname.split("/");
    if (isLocale(segs[1])) segs[1] = locale;
    else segs.splice(1, 0, locale);
    router.push(segs.join("/") || "/");
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[11px] font-medium tracking-[0.15em] text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {localeLabels[current]}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul
            role="listbox"
            className="absolute right-0 top-7 z-20 min-w-[150px] border border-black/10 bg-white py-1 shadow-lg dark:border-white/10 dark:bg-neutral-900"
          >
            {locales.map((l) => (
              <li key={l}>
                <button
                  role="option"
                  aria-selected={l === current}
                  onClick={() => pick(l)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-xs tracking-wide transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 ${
                    l === current
                      ? "text-black dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400"
                  }`}
                >
                  <span>{localeNames[l]}</span>
                  <span className="text-[10px] tracking-[0.15em] text-neutral-400">
                    {localeLabels[l]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
