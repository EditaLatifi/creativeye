import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/data";
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
    path: "/contact",
    title: dict.contact.title,
    description: dict.seo.contact,
    image: "/images/contact/portrait.jpg",
  });
}

const portrait = "/images/contact/portrait.jpg";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = getDictionary(isLocale(locale) ? locale : "en").contact;
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
      <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-16">
        {/* Portrait */}
        <div className="relative order-last aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 md:order-first">
          <Image
            src={portrait}
            alt={site.owner}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Form + details */}
        <div>
          <h1 className="text-2xl font-semibold tracking-[0.3em] text-black dark:text-white sm:text-3xl">
            {c.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            {c.intro}
          </p>

          <div className="mt-8">
            <ContactForm
              t={{
                name: c.name,
                email: c.email,
                phone: c.phone,
                message: c.message,
                send: c.send,
                sentNote: c.sentNote,
              }}
            />
          </div>

          <div className="mt-10 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <a
              href={`mailto:${site.email}`}
              className="block transition-colors hover:text-black dark:hover:text-white"
            >
              {site.email}
            </a>
            <span className="block">{site.phone}</span>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors hover:text-black dark:hover:text-white"
            >
              Instagram {site.instagramHandle}
            </a>
            <span className="block">{site.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
