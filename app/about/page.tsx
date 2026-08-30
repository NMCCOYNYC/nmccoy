import Image from "next/image";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { FadeCarousel } from "@/components/FadeCarousel";
import { CtaSection } from "@/components/StatsBand";
import {
  getFoundationCarousel,
  getFoundationHero,
  founderImage,
} from "@/lib/story";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Story",
  description:
    "NMCCOY began with a belief that the things we choose to keep should feel personal. The story behind the house, Desert Illusions, and founder Nichole McCoy.",
  path: "/about",
});

export default function AboutPage() {
  const foundationHero = getFoundationHero();
  const foundationCarousel = getFoundationCarousel();

  return (
    <>
      <FadeIn variant="fade">
        <section className="editorial-page-hero editorial-page-hero--story">
          <p className="eyebrow">Our Story</p>
          <h1>Our Story</h1>
          <p className="editorial-page-hero__lead">
            <span className="editorial-page-hero__lead-line">
              NMCCOY began with a simple belief: the{" "}
            </span>
            <span className="editorial-page-hero__lead-line">
              things we choose to keep should feel personal.
            </span>
          </p>
        </section>
      </FadeIn>

      <section className="story-band story-band--bleed story-band--foundation">
        <FadeIn variant="reveal" className="story-band__text">
          <p className="eyebrow">The Foundation</p>
          <h2 className="story-band__title">
            <span className="story-band__line">Made to mean</span>
            <span className="story-band__line">something</span>
          </h2>
          <p className="story-band__body">
            In an increasingly digital world, the objects we hold onto can carry
            something more human: the trace of a hand, a perspective, a memory.
          </p>
          <p className="story-band__body">
            NMCCOY was created from a desire to make pieces that carry that
            feeling forward. Pieces shaped by an artist&apos;s hand and made to
            become part of the lives of those who wear them.
          </p>
        </FadeIn>
        <div className="story-band__img">
          {foundationHero ? (
            <Image
              src={foundationHero.src}
              alt={foundationHero.alt}
              fill
              className="story-band__img-fill"
              style={{ objectFit: "cover", objectPosition: "center center" }}
              sizes="(max-width: 960px) 100vw, 50vw"
              priority
            />
          ) : null}
        </div>
      </section>

      <section className="story-band story-band--bleed story-band--reverse story-band--place">
        <FadeIn variant="reveal" className="story-band__text">
          <p className="eyebrow">From Ink to Silk</p>
          <h2 className="story-band__title">
            <span className="story-band__line">A place,</span>
            <span className="story-band__line">remembered</span>
          </h2>
          <p className="story-band__body">
            Each collection begins with original artwork, shaped by landscape,
            memory, and a sense of place before being translated into silk in
            Italy.
          </p>
          <p className="story-band__body">
            The first collection, <em>Desert Illusions</em>, looks back to the
            American Southwest: its shifting light, distant horizons, and
            landscapes that have a way of staying with you. Rather than capturing
            the desert exactly as it was, the collection explores the way we
            remember where we&apos;ve been.
          </p>
        </FadeIn>
        <div className="story-band__img">
          <FadeCarousel
            images={foundationCarousel}
            sizes="(max-width: 960px) 100vw, 50vw"
            ariaLabel="Foundation images"
          />
        </div>
      </section>

      <section className="story-band story-band--bleed story-band--founder">
        <FadeIn variant="reveal" className="story-band__text">
          <p className="eyebrow">The Founder</p>
          <h2 className="story-band__title">
            <span className="story-band__line">Landscape,</span>
            <span className="story-band__line">memory &amp; craft</span>
          </h2>
          <p className="story-band__body">
            Raised in the Arizona desert and shaped by more than a decade in New
            York, founder Nichole McCoy draws from the landscapes, memories, and
            contrasts that have shaped her own perspective.
          </p>
          <p className="story-band__body">
            After years working in luxury fashion, including time at Hermès, and
            creating bespoke artwork for leading brands, she developed a deep
            appreciation for the relationship between art, craftsmanship, and the
            objects we choose to live with.
          </p>
          <p className="story-band__body">
            NMCCOY brings those worlds together, translating a lifelong practice
            of painting into pieces that move between art and fashion, while
            remaining deeply personal.
          </p>
        </FadeIn>
        <div className="story-band__img">
          <Image
            src={founderImage.src}
            alt={founderImage.alt}
            fill
            className="story-band__img-fill"
            style={{ objectFit: "cover", objectPosition: "center top" }}
            sizes="(max-width: 960px) 100vw, 50vw"
          />
        </div>
      </section>

      <CtaSection eyebrow="Collection No. 1" />
      <Footer />
    </>
  );
}
