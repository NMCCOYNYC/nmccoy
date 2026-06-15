import Link from "next/link";
import { scarves } from "@/lib/products";
import { siteSettings } from "@/lib/site-settings";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { MarqueeBand } from "@/components/MarqueeBand";
import { ScarfCarousel } from "@/components/ScarfCarousel";
import { StatsBand } from "@/components/StatsBand";
import { EmailCapture } from "@/components/EmailCapture";
import { GradientFill } from "@/components/GradientFill";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <GradientFill
          gradient="linear-gradient(160deg,#3D2B1F 0%,#6B4C34 30%,#8C603A 55%,#5C4A38 75%,#2A1A10 100%)"
          className="hero__media"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <div className="hero__overlay" />
        <div
          className="hero__content"
          style={{
            textAlign: "var(--hero-text-align)",
            alignItems: "var(--hero-content-justify)",
          }}
        >
          <p className="hero__kicker">Debut Collection · 2026</p>
          <h1 className="hero__title">
            Art, Meant
            <br />
            to be Worn.
          </h1>
          <p className="hero__sub">
            NMCCOY is an art-led fashion house where paintings wander onto silk.
            Born from original works and issued sparingly, each heirloom piece is
            shaped by craft, care, and story.
          </p>
          <div className="hero__actions">
            <Link href="/collection" className="btn btn--ghost">
              Explore Collection
            </Link>
            <Link
              href="/about"
              className="btn--underline"
              style={{ color: "rgba(237,235,233,0.7)" }}
            >
              Our Story
            </Link>
          </div>
        </div>
        <div className="hero__scroll">
          <div className="hero__scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      <StatsBand />
      <MarqueeBand />

      <div className="coll-intro fade-in visible">
        <FadeIn>
          <div>
            <p className="eyebrow coll-intro__eyebrow">
              {siteSettings.collectionName} — Collection 1
            </p>
            <h2 className="coll-intro__title">
              A few pieces,
              <br />
              caught in the light.
            </h2>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="coll-intro__right">
            <p className="coll-intro__body">
              Silk works from Desert Illusions. Each piece translated from
              original paintings into limited-edition silk. Selected pieces are
              available by early reservation.
            </p>
          </div>
        </FadeIn>
      </div>

      <ScarfCarousel scarves={scarves} />

      <section className="process-band">
        <div className="process-band__img">
          <GradientFill
            gradient="linear-gradient(160deg,#8C603A 0%,#5C3A22 40%,#38271E 100%)"
            className="process-band__img-fill"
          />
        </div>
        <div className="process-band__text">
          <p className="eyebrow process-band__eyebrow">The Process</p>
          <h2 className="process-band__title">
            From Painting
            <br />
            to Silk.
          </h2>
          <p className="process-band__italic">
            Brushstrokes become pattern. Texture becomes memory.
            <br />
            Silk becomes a canvas meant to move with you.
          </p>
          <p className="process-band__body">
            Each NMCCOY piece begins not as a product, but as a moment. Painted
            by hand, guided by intuition, and shaped by time. What you wear is
            not replicated — it is translated. From artwork to object. From hand
            to heirloom.
          </p>
          <Link
            href="/process"
            className="btn--underline"
            style={{
              color: "rgba(237,235,233,0.65)",
              borderColor: "rgba(237,235,233,0.35)",
            }}
          >
            Discover the Process
          </Link>
        </div>
      </section>

      <section className="story-band">
        <FadeIn className="story-band__text">
          <p className="eyebrow">Our Story</p>
          <h2 className="story-band__title">
            Art is the product.
            <br />
            Always has been.
          </h2>
          <p className="story-band__body">
            NMCCOY is not a fashion brand that commissions art. It is an art
            practice that makes objects — scarves that carry original paintings
            into the world, onto bodies, into daily life.
          </p>
          <p className="story-band__body" style={{ marginBottom: "2.5rem" }}>
            Founded by Nichole McCoy in the Arizona desert, where the light itself
            is an event worth painting.
          </p>
          <Link href="/about" className="btn btn--outline">
            Our Story
          </Link>
        </FadeIn>
        <div className="story-band__img">
          <GradientFill
            gradient="linear-gradient(145deg,#C4A882 0%,#8C603A 50%,#38271E 100%)"
            className="story-band__img-fill"
          />
        </div>
      </section>

      <EmailCapture />
      <Footer />
    </>
  );
}
