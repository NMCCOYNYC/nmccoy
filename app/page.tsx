import type { Metadata } from "next";
import { cookies } from "next/headers";

import { ComingSoonLanding } from "@/components/ComingSoonLanding";
import { HomePageContent } from "@/components/HomePageContent";
import { hasSiteAccess, isComingSoonEnabled } from "@/lib/coming-soon";
import { EARLY_ACCESS_COOKIE } from "@/lib/preview-access";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const allowed = hasSiteAccess(cookieStore.get(EARLY_ACCESS_COOKIE)?.value);

  if (isComingSoonEnabled() && !allowed) {
    return pageMetadata({
      title: "Coming Soon",
      description:
        "Desert Illusions is coming soon. Original artworks translated into limited-edition Italian silk.",
      path: "/",
    });
  }

  return pageMetadata({
    title: "Desert Illusions",
    description:
      "NMCCOY Desert Illusions — original ink paintings translated into limited-edition Italian silk collectible objects. Designed in New York, inspired by the American Southwest.",
    path: "/",
  });
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const allowed = hasSiteAccess(cookieStore.get(EARLY_ACCESS_COOKIE)?.value);

  if (isComingSoonEnabled() && !allowed) {
    return <ComingSoonLanding />;
  }

  return <HomePageContent />;
}
