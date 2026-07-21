import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import BackToTop from "@/components/BackToTop";
import { site } from "@/lib/data";
import { htmlLang, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  SITE_URL,
  pageMetadata,
  personJsonLd,
  proServiceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "en";
  const dict = getDictionary(loc);
  const base = pageMetadata({
    locale: loc,
    path: "",
    title: `${site.name} · ${site.owner}`,
    description: dict.seo.siteDescription,
  });
  return {
    ...base,
    metadataBase: new URL(SITE_URL),
    applicationName: site.name,
    // Home uses the full title; inner pages fill the %s template.
    title: {
      default: `${site.name} · ${site.owner}`,
      template: `%s | ${site.name}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={htmlLang[locale]} className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          // Apply the saved theme before paint to avoid a flash.
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark')}}catch(e){}})();",
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-black dark:bg-neutral-950 dark:text-neutral-100">
        <JsonLd
          data={[
            websiteJsonLd(locale),
            personJsonLd(),
            proServiceJsonLd(locale),
          ]}
        />
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
        <BackToTop label={dict.ui.backToTop} />
      </body>
    </html>
  );
}
