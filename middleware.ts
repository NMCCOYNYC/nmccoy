import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  hasSiteAccess,
  isComingSoonEnabled,
} from "@/lib/coming-soon";
import { isIndexingCrawler } from "@/lib/crawlers";
import {
  EARLY_ACCESS_COOKIE,
  EARLY_ACCESS_PATH,
  PATHNAME_HEADER,
  isValidEarlyAccessKey,
} from "@/lib/preview-access";

function setAccessCookie(response: NextResponse) {
  response.cookies.set(EARLY_ACCESS_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

function next(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(PATHNAME_HEADER, request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const key = searchParams.get("key");

  if (isValidEarlyAccessKey(key)) {
    const response = NextResponse.redirect(new URL("/", request.url));
    setAccessCookie(response);
    return response;
  }

  if (!isComingSoonEnabled()) {
    return next(request);
  }

  const cookieValue = request.cookies.get(EARLY_ACCESS_COOKIE)?.value;

  if (hasSiteAccess(cookieValue)) {
    return next(request);
  }

  if (isIndexingCrawler(request.headers.get("user-agent"))) {
    return next(request);
  }

  if (
    pathname.startsWith("/api/") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return next(request);
  }

  if (pathname === EARLY_ACCESS_PATH) {
    return next(request);
  }

  if (pathname === "/") {
    return next(request);
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|mp4|webm|mov|ico)$).*)",
  ],
};
