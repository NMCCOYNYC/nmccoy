import Link from "next/link";
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
    "The NMCCOY story — collectible silk objects born from original ink paintings, designed in New York and produced in Italy.",
  path: "/about",
});

export default function AboutPage() {
  const foundationHero = getFoundationHero();
  const foundationCarousel = getFoundationCarousel();

  return (
    <>
      <FadeIn variant="fade">
        <section className="editorial-page-hero">
          <p className="eyebrow">Our Story</p>
          <h1>Our Story</h1>
          <p className="editorial-page-hero__lead">
            NMCCOY began with a simple belief: the things we choose to keep should
            feel personal.
          </p>
        </section>
      </FadeIn>

      <section className="story-band story-band--bleed">
        <FadeIn variant="reveal" className="story-band__text">
          <p className="eyebrow">The Foundation</p>
          <h2 className="story-band__title">
            Connection,
            <br />
            Craft &amp; Care
          </h2>
          <p className="story-band__body">
            In an increasingly digital world, we often find ourselves seeking
            connection in new ways. The objects we hold onto tend to carry greater
            meaning—not only because of what they are, but because of the
            perspective, craftsmanship, and care behind them.
          </p>
          <p className="story-band__body">
            The subtle nuances that emerge through a hand-painted process are part
            of what give each artwork its character, creating pieces that feel
            distinctly human. That belief became the foundation for NMCCOY.
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

      <section className="story-band story-band--bleed story-band--reverse">
        <FadeIn variant="reveal" className="story-band__text">
          <p className="eyebrow">From Ink to Silk</p>
          <h2 className="story-band__title">Where It Begins</h2>
          <p className="story-band__body">
            Each NMCCOY collection begins in ink. Through a process of painting,
            layering, and exploration, original artworks emerge before being
            translated into silk in Italy. Inspired by landscapes, memory, and a
            sense of place, each piece carries the story of its origin from
            artwork to collectible object.
          </p>
          <p className="story-band__body">
            The inaugural collection, Desert Illusions, draws inspiration from the
            American Southwest—the shifting light, distant horizons, and mirages
            that blur the boundary between memory and reality. Rather than
            documenting a place exactly as it appears, the collection explores
            how a place is remembered.
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

      <section className="story-band story-band--bleed">
        <FadeIn variant="reveal" className="story-band__text">
          <p className="eyebrow">The Founder</p>
          <h2 className="story-band__title">
            Landscape,
            <br />
            Memory &amp; Craft
          </h2>
          <p className="story-band__body">
            Raised in the Arizona desert and shaped by more than a decade in New
            York, founder Nichole McCoy draws inspiration from the intersection of
            landscape, memory, and craft.
          </p>
          <p className="story-band__body">
            After years working in luxury fashion, including time at Hermès, and
            creating bespoke artwork for leading brands, she developed a deep
            appreciation for storytelling, craftsmanship, and the objects we choose
            to keep. Through NMCCOY, those influences converge into collectible
            pieces where art, fashion, and storytelling meet.
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

      <FadeIn variant="reveal">
        <section className="editorial-block editorial-block--dark">
          <div className="editorial-block__inner">
            <p className="eyebrow eyebrow--light">Intention</p>
            <h2 className="editorial-block__title">Made to Last</h2>
            <p className="editorial-block__lead">
              Produced in small, intentional batches, each object is created with a
              focus on craftsmanship, permanence, and thoughtful production.
            </p>
            <p className="editorial-block__body">
              Limited quantities allow us to preserve the integrity of the artwork
              behind each design while avoiding unnecessary overproduction. At its
              heart, NMCCOY is an invitation to slow down, look closer, and
              reconnect with the stories woven into the things we choose to keep.
            </p>
            <Link href="/collection" className="btn--underline btn--underline-light">
              Enter the Collection
            </Link>
          </div>
        </section>
      </FadeIn>

      <CtaSection eyebrow="Collection No. 1" />
      <Footer />
    </>
  );
}
