import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  EARLY_ACCESS_COOKIE,
  EARLY_ACCESS_PATH,
  isValidEarlyAccessKey,
} from "@/lib/preview-access";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (
    pathname !== EARLY_ACCESS_PATH &&
    !pathname.startsWith(`${EARLY_ACCESS_PATH}/`)
  ) {
    return NextResponse.next();
  }

  const key = searchParams.get("key");

  if (!isValidEarlyAccessKey(key)) {
    return NextResponse.next();
  }

  const cleanUrl = request.nextUrl.clone();
  cleanUrl.searchParams.delete("key");

  const response = NextResponse.redirect(cleanUrl);
  response.cookies.set(EARLY_ACCESS_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/early-access", "/early-access/:path*"],
};
