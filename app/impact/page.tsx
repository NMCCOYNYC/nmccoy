import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { GradientFill } from "@/components/GradientFill";
import { RevealParallax } from "@/components/RevealParallax";
import { CtaSection } from "@/components/StatsBand";
import { PageHeroDark } from "@/components/PageHeroDark";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Impact",
  description:
    "NMCCOY gives back to the communities and landscapes that inspire each collection. Learn about our impact with Desert Illusions.",
  path: "/impact",
});

export default function ImpactPage() {
  return (
    <>
      <PageHeroDark
        eyebrow="Impact"
        title="Impact"
        description="Every collection should leave something meaningful behind."
        style={{
          background: "linear-gradient(160deg,#74701E 0%,#38271E 100%)",
        }}
      />

      <FadeIn variant="fade">
        <section className="editorial-block">
          <div className="editorial-block__inner editorial-block__inner--narrow">
            <p className="editorial-block__lead editorial-block__lead--center">
              Every NMCCOY collection begins with a place, a story, and a
              perspective. The landscapes, communities, and cultural traditions that
              inspire the work are an essential part of each collection&apos;s journey.
            </p>
          </div>
        </section>
      </FadeIn>

      <section className="story-band">
        <FadeIn variant="reveal" className="story-band__text">
          <p className="eyebrow">Desert Illusions</p>
          <h2 className="story-band__title">
            Giving Back
            <br />
            to the Southwest
          </h2>
          <p className="story-band__body">
            For Desert Illusions, our focus is on supporting initiatives that
            preserve and celebrate the spirit of the American Southwest through
            arts education, cultural preservation, and conservation efforts.
          </p>
          <p className="story-band__body">
            This includes organizations dedicated to empowering Native youth through
            creative expression, preserving Indigenous artistic traditions, and
            protecting the desert landscapes that continue to inspire generations
            of artists.
          </p>
        </FadeIn>
        <RevealParallax className="story-band__img">
          <GradientFill
            gradient="linear-gradient(160deg,#74701E 0%,#8C603A 40%,#38271E 100%)"
            className="story-band__img-fill"
            aria-hidden={true}
          />
        </RevealParallax>
      </section>

      <FadeIn variant="reveal">
        <section className="impact-pillars">
          <div className="impact-pillars__inner">
            <div className="impact-pillar">
              <p className="impact-pillar__label">01</p>
              <h3 className="impact-pillar__title">Arts Education</h3>
              <p className="impact-pillar__body">
                Supporting creative programs that empower young artists and keep
                cultural expression alive across the Southwest.
              </p>
            </div>
            <div className="impact-pillar">
              <p className="impact-pillar__label">02</p>
              <h3 className="impact-pillar__title">Cultural Preservation</h3>
              <p className="impact-pillar__body">
                Honoring Indigenous artistic traditions and the communities whose
                stories and craft continue to shape the region.
              </p>
            </div>
            <div className="impact-pillar">
              <p className="impact-pillar__label">03</p>
              <h3 className="impact-pillar__title">Conservation</h3>
              <p className="impact-pillar__body">
                Protecting the desert landscapes that inspire each collection and
                the ecosystems that sustain them.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn variant="fade">
        <section className="editorial-block editorial-block--quote">
          <div className="editorial-block__inner editorial-block__inner--narrow">
            <p className="editorial-pullquote">
              As NMCCOY grows, a portion of proceeds from each collection will
              support organizations connected to the places and communities that
              helped shape its story.
            </p>
            <p className="editorial-block__body editorial-block__body--center">
              While the organizations we support may evolve from collection to
              collection, our intention remains the same: to give back to the
              people, places, and stories that inspire the work.
            </p>
          </div>
        </section>
      </FadeIn>

      <CtaSection eyebrow="Collection No. 1" />
      <Footer />
    </>
  );
}
