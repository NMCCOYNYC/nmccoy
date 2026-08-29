import type { Metadata } from "next";
import { cookies, headers } from "next/headers";

import { ComingSoonLanding } from "@/components/ComingSoonLanding";
import { HomePageContent } from "@/components/HomePageContent";
import { canViewFullSite } from "@/lib/coming-soon";
import { EARLY_ACCESS_COOKIE } from "@/lib/preview-access";
import { pageMetadata } from "@/lib/seo";

const fullHomeMetadata = pageMetadata({
  title: "NMCCOY — Desert Illusions | Limited-Edition Italian Silk",
  description:
    "NMCCOY Desert Illusions — original ink paintings translated into limited-edition Italian silk collectible objects. Designed in New York, inspired by the American Southwest.",
  path: "/",
  image: "/home/desert-illusions-hero-desktop.jpg",
  imageAlt: "Desert Illusions silk scarf",
  absolute: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const requestHeaders = await headers();
  const allowed = canViewFullSite(
    cookieStore.get(EARLY_ACCESS_COOKIE)?.value,
    requestHeaders.get("user-agent"),
  );

  if (!allowed) {
    return pageMetadata({
      title: "NMCCOY — Desert Illusions is Coming Soon",
      description:
        "NMCCOY Desert Illusions is coming soon. Original ink paintings translated into limited-edition Italian silk collectible objects. Designed in New York, made in Italy.",
      path: "/",
      absolute: true,
    });
  }

  return fullHomeMetadata;
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const requestHeaders = await headers();
  const allowed = canViewFullSite(
    cookieStore.get(EARLY_ACCESS_COOKIE)?.value,
    requestHeaders.get("user-agent"),
  );

  if (!allowed) {
    return <ComingSoonLanding />;
  }

  return <HomePageContent />;
}
