import { scarves } from "@/lib/products";
import { siteSettings } from "@/lib/site-settings";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { ScarfCard } from "@/components/ScarfCard";
import { SpotifySection } from "@/components/SpotifySection";
import { CtaSection } from "@/components/StatsBand";
import { CollectionTracker } from "@/components/AnalyticsHelpers";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Desert Illusions Collection",
  description:
    "Explore the NMCCOY Desert Illusions collection — six original ink paintings translated into limited-edition Italian silk collectible objects.",
  path: "/collection",
});

export default function CollectionPage() {
  const delays = [0, 0.08, 0.16, 0.04, 0.12, 0.2];

  return (
    <>
      <CollectionTracker />
      <FadeIn variant="reveal" className="coll-hero">
        <p className="eyebrow">Collection No. 1 — New York</p>
        <h1>
          Desert
          <br />
          Illusions
        </h1>
        <p>
          Six original ink paintings translated into Italian silk. Produced in
          limited editions of {siteSettings.editionSize} per design — collectible
          objects shaped by art, memory, and craft.
        </p>
      </FadeIn>

      <div className="scarves-grid">
        {scarves.map((scarf, i) => (
          <ScarfCard key={scarf.slug} scarf={scarf} delay={delays[i]} />
        ))}
      </div>

      <FadeIn variant="fade">
        <SpotifySection />
      </FadeIn>
      <CtaSection eyebrow="Collection No. 1" />
      <Footer />
    </>
  );
}
