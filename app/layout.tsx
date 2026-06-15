import type { Metadata } from "next";
import { Marcellus, Gowun_Batang, Jost } from "next/font/google";
import { Nav } from "@/components/Nav";
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

export const metadata: Metadata = {
  title: "NMCCOY — Desert Illusions",
  description:
    "NMCCOY is an art-led fashion house where hand-painted artworks are translated to limited-edition Italian silk scarves.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${gowunBatang.variable} ${jost.variable}`}
    >
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
