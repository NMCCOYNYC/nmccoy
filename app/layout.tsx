import type { Metadata } from "next";
import { Marcellus, Gowun_Batang, Jost } from "next/font/google";
import { cookies, headers } from "next/headers";
import { CartProvider } from "@/components/CartProvider";
import { Nav } from "@/components/Nav";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { canViewFullSite } from "@/lib/coming-soon";
import { EARLY_ACCESS_COOKIE } from "@/lib/preview-access";
import { JsonLd } from "@/components/JsonLd";
import { defaultMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

const jost = Jost({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-util",
});

export const metadata: Metadata = defaultMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const requestHeaders = await headers();
  const showNav = canViewFullSite(
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
        <CartProvider>
          {showNav ? <Nav /> : null}
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
