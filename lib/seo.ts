import type { Metadata } from "next";

import { scarves, type Scarf } from "@/lib/products";
import { siteSettings } from "@/lib/site-settings";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.nmccoynyc.com"
).replace(/\/$/, "");

export const DEFAULT_OG_IMAGE = "/home/desert-illusions-hero-desktop.jpg";

const defaultDescription =
  "NMCCOY is an art-led fashion house in New York. Original ink paintings are translated into limited-edition Italian silk collectible objects. Explore Desert Illusions.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NMCCOY — Desert Illusions | Limited-Edition Italian Silk",
    template: "%s | NMCCOY",
  },
  description: defaultDescription,
  applicationName: "NMCCOY",
  authors: [{ name: "NMCCOY", url: SITE_URL }],
  creator: "NMCCOY",
  publisher: "NMCCOY",
  category: "fashion",
  keywords: [
    "NMCCOY",
    "Desert Illusions",
    "Italian silk scarf",
    "limited edition silk",
    "art-led fashion",
    "New York fashion",
    "hand-painted silk",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NMCCOY",
    title: "NMCCOY — Desert Illusions | Limited-Edition Italian Silk",
    description:
      "Original ink paintings translated into limited-edition Italian silk scarves. Designed in New York, made in Italy.",
    url: SITE_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "NMCCOY Desert Illusions silk",
        width: 2880,
        height: 1620,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NMCCOY — Desert Illusions | Limited-Edition Italian Silk",
    description:
      "Original ink paintings translated into limited-edition Italian silk scarves.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export function absoluteUrl(path = "") {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path = "",
  image,
  imageAlt,
  robots,
  absolute = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  robots?: Metadata["robots"];
  absolute?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image || DEFAULT_OG_IMAGE;
  const ogTitle = absolute ? title : `${title} | NMCCOY`;

  return {
    title: absolute ? { absolute: title } : title,
    description,
    robots,
    alternates: { canonical: path || "/" },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "NMCCOY",
      title: ogTitle,
      description,
      url,
      images: [{ url: ogImage, alt: imageAlt || title }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NMCCOY",
    legalName: "NMCCOY",
    url: SITE_URL,
    email: siteSettings.contactEmail,
    logo: absoluteUrl("/logos/nmccoy-wordmark-brown.svg"),
    image: absoluteUrl("/logos/nmccoy-mark-circle.png"),
    sameAs: [siteSettings.instagramUrl],
    foundingLocation: {
      "@type": "Place",
      name: "New York, USA",
    },
    brand: {
      "@type": "Brand",
      name: "NMCCOY",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NMCCOY",
    url: SITE_URL,
    description: defaultDescription,
    publisher: {
      "@type": "Organization",
      name: "NMCCOY",
      url: SITE_URL,
    },
  };
}

export function collectionJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Desert Illusions",
    url: absoluteUrl("/collection"),
    description:
      "Six original ink paintings translated into limited-edition Italian silk collectible objects.",
    isPartOf: {
      "@type": "WebSite",
      name: "NMCCOY",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: scarves.map((scarf, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/scarves/${scarf.slug}`),
        name: scarf.name,
      })),
    },
  };
}

export function productJsonLd(scarf: Scarf) {
  const image = scarf.images?.[0];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${scarf.name} silk scarf`,
    description: scarf.desc1,
    image: image ? [absoluteUrl(image)] : undefined,
    sku: `nmccoy-${scarf.slug}`,
    brand: {
      "@type": "Brand",
      name: "NMCCOY",
    },
    category: "Silk scarf",
    material: "100% Italian silk twill",
    url: absoluteUrl(`/scarves/${scarf.slug}`),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/scarves/${scarf.slug}`),
      priceCurrency: "USD",
      price: String(siteSettings.fullPrice),
      availability: "https://schema.org/PreOrder",
      availabilityStarts: new Date(siteSettings.launchDate).toISOString(),
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
