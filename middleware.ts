import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  hasSiteAccess,
  isComingSoonEnabled,
} from "@/lib/coming-soon";
import {
  EARLY_ACCESS_COOKIE,
  EARLY_ACCESS_PATH,
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

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const key = searchParams.get("key");

  if (isValidEarlyAccessKey(key)) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("key");
    const response = NextResponse.redirect(cleanUrl);
    setAccessCookie(response);
    return response;
  }

  if (!isComingSoonEnabled()) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(EARLY_ACCESS_COOKIE)?.value;

  if (hasSiteAccess(cookieValue)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (pathname === EARLY_ACCESS_PATH) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
