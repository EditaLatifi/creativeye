import Link from "next/link";
import { categories } from "@/lib/data";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function CategoryFilter({
  locale,
  dict,
  active,
}: {
  locale: Locale;
  dict: Dictionary;
  active: string;
}) {
  const chip =
    "whitespace-nowrap border px-4 py-2 text-[11px] font-medium tracking-[0.12em] transition-colors";
  const on =
    "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black";
  const off =
    "border-black/15 text-neutral-500 hover:border-black hover:text-black dark:border-white/15 dark:text-neutral-400 dark:hover:border-white dark:hover:text-white";

  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2">
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/${locale}/${c.slug}`}
          className={`${chip} ${c.slug === active ? on : off}`}
          aria-current={c.slug === active ? "page" : undefined}
        >
          {dict.categories[c.slug] ?? c.nav}
        </Link>
      ))}
    </div>
  );
}
