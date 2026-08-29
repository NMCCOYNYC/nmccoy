import { FavoritesPageClient } from "@/components/FavoritesPageClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Favorites",
  description: "Pieces you have saved from the NMCCOY Desert Illusions collection.",
  path: "/favorites",
  robots: { index: false, follow: false },
});

export default function FavoritesPage() {
  return <FavoritesPageClient />;
}
