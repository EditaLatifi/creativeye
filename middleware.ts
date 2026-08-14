import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, defaultLocale, locales } from "@/i18n/config";

function detectLocale(req: NextRequest): string {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) return cookie;

  const accept = req.headers.get("accept-language");
  if (accept) {
    for (const part of accept.split(",")) {
      const code = part.split(";")[0].trim().slice(0, 2).toLowerCase();
      if ((locales as readonly string[]).includes(code)) return code;
    }
  }
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // API routes are locale-agnostic — never prefix them.
  if (pathname.startsWith("/api/")) return NextResponse.next();

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except Next internals, static assets, and files with an extension.
  matcher: ["/((?!api|_next|images|favicon|.*\\..*).*)"],
};
