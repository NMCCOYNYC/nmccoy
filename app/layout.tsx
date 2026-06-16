import type { Metadata } from "next";
import { Marcellus, Gowun_Batang, Jost } from "next/font/google";
import { cookies } from "next/headers";
import { Nav } from "@/components/Nav";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { hasSiteAccess, isComingSoonEnabled } from "@/lib/coming-soon";
import { EARLY_ACCESS_COOKIE } from "@/lib/preview-access";
import { defaultMetadata } from "@/lib/seo";
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nmccoy.com";
  const cookieStore = await cookies();
  const showNav =
    !isComingSoonEnabled() ||
    hasSiteAccess(cookieStore.get(EARLY_ACCESS_COOKIE)?.value);

  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${gowunBatang.variable} ${jost.variable}`}
    >
      <body>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NMCCOY",
              url: siteUrl,
              email: "hello@nmccoynyc.com",
              sameAs: ["https://www.instagram.com/nmccoynyc"],
            }),
          }}
        />
        {showNav ? <Nav /> : null}
        <main>{children}</main>
      </body>
    </html>
  );
}
