import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nmccoy.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NMCCOY — Desert Illusions",
    template: "%s | NMCCOY",
  },
  description:
    "NMCCOY is an art-led fashion house where original ink paintings are translated into limited-edition Italian silk collectible objects. Explore the Desert Illusions collection.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NMCCOY",
    title: "NMCCOY — Desert Illusions",
    description:
      "Original ink paintings translated into limited-edition Italian silk scarves.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NMCCOY — Desert Illusions",
    description:
      "Original ink paintings translated into limited-edition Italian silk scarves.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function pageMetadata({
  title,
  description,
  path = "",
  robots,
}: {
  title: string;
  description: string;
  path?: string;
  robots?: Metadata["robots"];
}): Metadata {
  return {
    title,
    description,
    robots,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      title: `${title} | NMCCOY`,
      description,
      url: path ? `${siteUrl}${path}` : siteUrl,
    },
  };
}
