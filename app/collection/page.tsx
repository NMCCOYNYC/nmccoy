import { scarves } from "@/lib/products";
import { siteSettings } from "@/lib/site-settings";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { HeroLoopVideo } from "@/components/HeroLoopVideo";
import { ScarfCard } from "@/components/ScarfCard";
import { SpotifySection } from "@/components/SpotifySection";
import { CtaSection } from "@/components/StatsBand";
import { CollectionTracker } from "@/components/AnalyticsHelpers";
import { JsonLd } from "@/components/JsonLd";
import { collectionJsonLd, pageMetadata } from "@/lib/seo";

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
      <JsonLd data={collectionJsonLd()} />
      <CollectionTracker />

      <section
        className="feature-video feature-video--light feature-video--collection"
        aria-label="Desert Illusions"
      >
        <div className="feature-video__inner">
          <div className="feature-video__frame">
            <HeroLoopVideo
              src="/collection/collection-hero.mp4"
              className="feature-video__video"
            />
          </div>
        </div>
      </section>

      <FadeIn variant="reveal" className="coll-hero">
        <p className="eyebrow">Collection No. 1</p>
        <h1>Desert Illusions</h1>
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
