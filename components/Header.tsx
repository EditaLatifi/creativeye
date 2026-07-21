"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories, site } from "@/lib/data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

  const p = (href: string) => `/${locale}${href === "/" ? "" : href}`;

  const pages = [
    { href: "/projects", label: dict.nav.projects },
    { href: "/videos", label: dict.nav.videos },
    { href: "/services", label: dict.nav.services },
    { href: "/about", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  const isActive = (href: string) => {
    const full = p(href);
    return href === "/" ? pathname === full : pathname.startsWith(full);
  };
  const onCategory = categories.some((c) => isActive(`/${c.slug}`));

  const navBase =
    "whitespace-nowrap text-[11px] font-medium tracking-[0.1em] transition-colors hover:text-black dark:hover:text-white";
  const activeCls = "text-black dark:text-white";
  const idleCls = "text-neutral-500 dark:text-neutral-400";

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/90">
      <div className="mx-auto flex max-w-[1600px] items-center gap-5 px-5 py-4 lg:px-8">
        <Link
          href={p("/")}
          className="shrink-0 text-lg font-semibold tracking-[0.3em] text-black dark:text-white"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-x-6 xl:flex">
          {/* WORK dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setWorkOpen(true)}
            onMouseLeave={() => setWorkOpen(false)}
          >
            <button
              onClick={() => setWorkOpen((v) => !v)}
              className={`flex items-center gap-1 ${navBase} ${
                onCategory ? activeCls : idleCls
              }`}
              aria-haspopup="true"
              aria-expanded={workOpen}
            >
              {dict.nav.work}
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`transition-transform duration-200 ${
                  workOpen ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* top-full + pt-3 keeps a continuous hover area (no dead gap) */}
            <div
              className={`absolute left-1/2 top-full z-30 -translate-x-1/2 pt-3 transition-opacity duration-150 ${
                workOpen
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
            >
              <div className="min-w-[220px] border border-black/10 bg-white py-1 shadow-xl dark:border-white/10 dark:bg-neutral-900">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={p(`/${c.slug}`)}
                    onClick={() => setWorkOpen(false)}
                    className={`block px-4 py-2.5 text-[11px] font-medium tracking-[0.12em] transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 ${
                      isActive(`/${c.slug}`) ? activeCls : idleCls
                    }`}
                  >
                    {dict.categories[c.slug] ?? c.nav}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {pages.map((link) => (
            <Link
              key={link.href}
              href={p(link.href)}
              className={`${navBase} ${isActive(link.href) ? activeCls : idleCls}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-1 xl:ml-0">
          <Link
            href={p("/book")}
            className="mr-1 hidden whitespace-nowrap border border-black px-4 py-2 text-[11px] font-medium tracking-[0.12em] text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black sm:inline-block"
          >
            {dict.nav.book}
          </Link>
          <Search locale={locale} dict={dict} />
          <ThemeToggle label={dict.ui.toggleTheme} />
          <LanguageSwitcher current={locale} />
          <button
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center xl:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="space-y-1.5">
              <span className={`block h-px w-6 bg-black transition-transform dark:bg-white ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-black transition-opacity dark:bg-white ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 bg-black transition-transform dark:bg-white ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      {open && (
        <nav className="border-t border-black/5 bg-white dark:border-white/10 dark:bg-neutral-950 xl:hidden">
          <div className="mx-auto flex max-w-[1600px] flex-col px-5 py-2 lg:px-8">
            <span className="pt-3 text-[10px] font-semibold tracking-[0.25em] text-neutral-400">
              {dict.nav.work}
            </span>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={p(`/${c.slug}`)}
                onClick={() => setOpen(false)}
                className={`border-b border-black/5 py-2.5 pl-3 text-xs font-medium tracking-[0.12em] dark:border-white/10 ${
                  isActive(`/${c.slug}`) ? activeCls : idleCls
                }`}
              >
                {dict.categories[c.slug] ?? c.nav}
              </Link>
            ))}
            {[...pages, { href: "/book", label: dict.nav.book }].map((link) => (
              <Link
                key={link.href}
                href={p(link.href)}
                onClick={() => setOpen(false)}
                className={`border-b border-black/5 py-3 text-xs font-medium tracking-[0.15em] dark:border-white/10 ${
                  isActive(link.href) ? activeCls : idleCls
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
