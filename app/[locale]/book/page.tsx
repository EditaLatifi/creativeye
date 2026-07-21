import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { categories, site } from "@/lib/data";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);
  return pageMetadata({
    locale: loc,
    path: "/book",
    title: dict.booking.title,
    description: dict.seo.booking,
  });
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);
  const b = dict.booking;

  const services = categories.map((c) => ({
    value: c.slug,
    label: dict.categories[c.slug] ?? c.title,
  }));

  return (
    <div className="mx-auto max-w-xl px-5 py-14 lg:px-8 lg:py-20">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-[0.3em] text-black dark:text-white sm:text-3xl">
          {b.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {b.intro}
        </p>
      </header>

      <BookingForm
        t={{
          name: b.name,
          email: b.email,
          phone: b.phone,
          date: b.date,
          service: b.service,
          serviceDefault: b.serviceDefault,
          message: b.message,
          send: b.send,
          sentNote: b.sentNote,
        }}
        services={services}
      />

      <div className="mt-10 space-y-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
        <a
          href={`mailto:${site.email}`}
          className="block transition-colors hover:text-black dark:hover:text-white"
        >
          {site.email}
        </a>
        <span className="block">{site.phone}</span>
      </div>
    </div>
  );
}
