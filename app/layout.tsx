import type { Metadata } from "next";
import { Marcellus, Gowun_Batang, Jost } from "next/font/google";
import { cookies, headers } from "next/headers";
import { AccountProvider } from "@/components/AccountProvider";
import { CartProvider } from "@/components/CartProvider";
import { DrawerProvider } from "@/components/DrawerProvider";
import { Nav } from "@/components/Nav";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { canViewFullSite } from "@/lib/coming-soon";
import {
  EARLY_ACCESS_COOKIE,
  EARLY_ACCESS_PATH,
  PATHNAME_HEADER,
} from "@/lib/preview-access";
import { JsonLd } from "@/components/JsonLd";
import { defaultMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const gowunBatang = Gowun_Batang({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jost = Jost({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-util",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = defaultMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const requestHeaders = await headers();
  const onEarlyAccess =
    requestHeaders.get(PATHNAME_HEADER) === EARLY_ACCESS_PATH;
  const showNav =
    !onEarlyAccess &&
    canViewFullSite(
      cookieStore.get(EARLY_ACCESS_COOKIE)?.value,
      requestHeaders.get("user-agent"),
    );

  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${gowunBatang.variable} ${jost.variable}`}
    >
      <body>
        <GoogleAnalytics />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <DrawerProvider>
          <AccountProvider>
            <CartProvider>
              {showNav ? <Nav /> : null}
              <main>{children}</main>
            </CartProvider>
          </AccountProvider>
        </DrawerProvider>
      </body>
    </html>
  );
}
