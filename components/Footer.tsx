import Link from "next/link";
import { site } from "@/lib/data";
import type { Locale } from "@/i18n/config";

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-black/10 bg-white dark:border-white/10 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-10 text-center lg:px-8">
        <p className="text-sm font-semibold tracking-[0.35em] text-black dark:text-white">
          {site.name}
        </p>

        <div className="flex items-center gap-5">
          {/* Email */}
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 6 10 7L22 6" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
          <a
            href={`mailto:${site.email}`}
            className="hover:text-black dark:hover:text-white"
          >
            {site.email}
          </a>
          <Link
            href={`/${locale}/contact`}
            className="hover:text-black dark:hover:text-white"
          >
            {site.phone}
          </Link>
          <span>{site.location}</span>
        </div>

        <p className="text-[11px] tracking-wide text-neutral-400 dark:text-neutral-500">
          © {new Date().getFullYear()} {site.owner} · {site.name}
        </p>
      </div>
    </footer>
  );
}
